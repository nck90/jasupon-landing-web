"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("submitting");
    setMessage("");

    const payload = {
      academyName: String(formData.get("academyName") || "").trim(),
      contactName: String(formData.get("contactName") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      studentCount: String(formData.get("studentCount") || "").trim(),
      memo: String(formData.get("memo") || "").trim(),
      pageUrl: window.location.href.replace(window.location.hash, ""),
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("request failed");
      }

      form.reset();
      setState("success");
      setMessage("문의가 접수되었습니다. 확인 후 연락드리겠습니다.");
    } catch {
      setState("error");
      setMessage("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  return (
    <section className="contact-modal" id="contact-form" aria-label="자습ON 도입 문의">
      <a className="contact-backdrop" href="#" aria-label="문의 폼 닫기" />
      <div className="contact-panel" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <a className="contact-close" href="#" aria-label="닫기">×</a>
        <span>도입 문의</span>
        <h2 id="contact-title">자습ON 상담 신청</h2>
        <p>학원 규모와 운영 방식을 남겨주시면 자습실 관리 자동화 기준으로 안내드립니다.</p>
        <form onSubmit={handleSubmit}>
          <label>
            학원명
            <input name="academyName" type="text" placeholder="예: 진수학" required />
          </label>
          <label>
            담당자명
            <input name="contactName" type="text" placeholder="예: 김원장" />
          </label>
          <label>
            연락처
            <input name="phone" type="tel" placeholder="010-0000-0000" required />
          </label>
          <label>
            예상 학생 수
            <input name="studentCount" type="text" placeholder="예: 50명" />
          </label>
          <label className="contact-wide">
            문의 내용
            <textarea name="memo" rows={4} placeholder="현재 자습실 운영 방식, 필요한 기능, 데모 희망 일정 등을 적어주세요." />
          </label>
          <button type="submit" disabled={state === "submitting"}>
            {state === "submitting" ? "접수 중..." : "문의 제출하기"}
          </button>
          {message ? <strong className={`contact-status ${state}`}>{message}</strong> : null}
        </form>
      </div>
    </section>
  );
}
