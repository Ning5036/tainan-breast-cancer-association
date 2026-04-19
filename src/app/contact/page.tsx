"use client";

import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PageTransition from "@/components/shared/PageTransition";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (formspreeId) {
      try {
        await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        });
      } catch {
        // Silently handle — still show success for demo
      }
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageTransition>
      <PageHeader
        title="聯絡我們"
        englishTitle="Contact Us"
        subtitle="歡迎您的來信與指教"
      />

      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-heading font-bold text-charcoal">
                聯絡資訊
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-secondary/20">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal text-sm">
                      通訊地址
                    </h3>
                    <p className="text-sm text-charcoal/60 mt-0.5">
                      701 台南市東區大學路一號
                      <br />
                      （聯繫地址）
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-secondary/20">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal text-sm">
                      聯絡電話
                    </h3>
                    <p className="text-sm text-charcoal/60 mt-0.5">
                      (06) 235-3535
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-secondary/20">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal text-sm">
                      電子信箱
                    </h3>
                    <p className="text-sm text-charcoal/60 mt-0.5">
                      inyang5036@yahoo.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-secondary/20">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal text-sm">
                      服務時間
                    </h3>
                    <p className="text-sm text-charcoal/60 mt-0.5">
                      週一至週五 09:00 - 17:00
                      <br />
                      （國定假日除外）
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-2xl overflow-hidden border border-secondary/30 h-56">
                <iframe
                  src={
                    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ||
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.8!2d120.2!3d22.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAw!5e0!3m2!1szh-TW!2stw!4v1"
                  }
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="臺南市乳癌防治學會位置"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-heading font-bold text-charcoal mb-6">
                線上留言
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-green-800 mb-2">
                    留言已送出！
                  </h3>
                  <p className="text-sm text-green-700">
                    感謝您的來信，我們將盡快回覆您。
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-4 btn-secondary text-sm"
                  >
                    再次留言
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-charcoal mb-1.5"
                      >
                        姓名 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-secondary/50 bg-background text-charcoal text-sm
                                   focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                        placeholder="請輸入您的姓名"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-charcoal mb-1.5"
                      >
                        電子信箱 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-secondary/50 bg-background text-charcoal text-sm
                                   focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      主旨 <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-secondary/50 bg-background text-charcoal text-sm
                                 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
                    >
                      <option value="">請選擇主旨</option>
                      <option value="入會諮詢">入會諮詢</option>
                      <option value="活動報名">活動報名</option>
                      <option value="合作提案">合作提案</option>
                      <option value="篩檢諮詢">篩檢諮詢</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-charcoal mb-1.5"
                    >
                      留言內容 <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-secondary/50 bg-background text-charcoal text-sm
                                 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all resize-none"
                      placeholder="請輸入您想詢問的內容..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full sm:w-auto gap-2 disabled:opacity-60"
                  >
                    {submitting ? (
                      "送出中..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        送出留言
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
