import { NextRequest, NextResponse } from "next/server";

type InquiryPayload = {
  academyName?: string;
  contactName?: string;
  phone?: string;
  studentCount?: string;
  memo?: string;
  pageUrl?: string;
};

const requiredEnv = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
  fallbackFormId: process.env.SUPABASE_FALLBACK_FORM_ID,
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 1000) : "";
}

export async function POST(request: NextRequest) {
  let payload: InquiryPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const academyName = clean(payload.academyName);
  const contactName = clean(payload.contactName);
  const phone = clean(payload.phone);
  const studentCount = clean(payload.studentCount);
  const memo = clean(payload.memo);
  const pageUrl = clean(payload.pageUrl);

  if (!academyName || !phone) {
    return NextResponse.json({ message: "academyName and phone are required" }, { status: 400 });
  }

  if (!requiredEnv.supabaseUrl || !requiredEnv.supabaseServiceRoleKey) {
    return NextResponse.json({ message: "Supabase environment variables are missing" }, { status: 500 });
  }

  const record = {
    academy_name: academyName,
    contact_name: contactName || null,
    phone,
    student_count: studentCount || null,
    memo: memo || null,
    page_url: pageUrl || null,
    user_agent: request.headers.get("user-agent"),
    source: "tv-display-web",
  };

  const supabaseResponse = await fetch(`${requiredEnv.supabaseUrl}/rest/v1/landing_inquiries`, {
    method: "POST",
    headers: {
      apikey: requiredEnv.supabaseServiceRoleKey,
      Authorization: `Bearer ${requiredEnv.supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(record),
  });

  if (!supabaseResponse.ok) {
    const detail = await supabaseResponse.text();
    const tableMissing = detail.includes("PGRST205") || detail.includes("landing_inquiries");

    if (tableMissing && requiredEnv.fallbackFormId) {
      const fallbackResponse = await fetch(`${requiredEnv.supabaseUrl}/rest/v1/form_responses`, {
        method: "POST",
        headers: {
          apikey: requiredEnv.supabaseServiceRoleKey,
          Authorization: `Bearer ${requiredEnv.supabaseServiceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          form_id: requiredEnv.fallbackFormId,
          respondent_label: academyName,
          answers: {
            academyName,
            contactName,
            phone,
            studentCount,
            memo,
            pageUrl,
            source: "jasupon-landing-web",
          },
          user_agent: request.headers.get("user-agent"),
        }),
      });

      if (fallbackResponse.ok) {
        return NextResponse.json({ ok: true });
      }

      console.error("Supabase fallback inquiry insert failed", await fallbackResponse.text());
    } else {
      console.error("Supabase inquiry insert failed", detail);
    }

    return NextResponse.json({ message: "Failed to save inquiry" }, { status: 502 });
  }

  if (requiredEnv.discordWebhookUrl) {
    const discordResponse = await fetch(requiredEnv.discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "자습ON 문의 알림",
        embeds: [
          {
            title: "새 도입 문의가 접수되었습니다",
            color: 38655,
            fields: [
              { name: "학원명", value: academyName, inline: true },
              { name: "담당자", value: contactName || "-", inline: true },
              { name: "연락처", value: phone, inline: true },
              { name: "예상 학생 수", value: studentCount || "-", inline: true },
              { name: "문의 내용", value: memo || "-", inline: false },
              { name: "유입 페이지", value: pageUrl || "-", inline: false },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!discordResponse.ok) {
      console.error("Discord inquiry notification failed", await discordResponse.text());
    }
  }

  return NextResponse.json({ ok: true });
}
