'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';

type Messages = {
  contact: {
    title: string;
    subtitle: string;
    email: string;
    linkedin: string;
    github: string;
    phone: string;
    formTitle: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formSubmit: string;
    location: string;
    locationValue: string;
  };
};

export default function ContactPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [messages, setMessages] = useState<Messages | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (isValidLocale(locale)) {
      import(`@/i18n/messages/${locale}.json`).then((m) => setMessages(m.default));
    }
  }, [locale]);

  if (!messages || !isValidLocale(locale)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:longyu.xu@edhec.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="animate-fade-in relative overflow-hidden py-24 sm:py-32">
      {/* Ambient gradient orbs */}
      <div className="ambient-orb -left-40 -top-40 h-[500px] w-[500px] bg-primary-500/[0.04] animate-float" />
      <div className="ambient-orb -right-32 top-20 h-[400px] w-[400px] bg-primary-500/[0.03] animate-float" style={{ animationDelay: '2s' }} />
      <div className="ambient-orb bottom-0 left-1/3 h-[300px] w-[300px] bg-primary-500/[0.03] animate-float" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
            <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
            {messages.contact.title}
            <span className="h-px w-10 bg-gradient-to-l from-primary-500 to-transparent" />
          </div>
          <h1 className="gradient-text mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {messages.contact.title}
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
            {messages.contact.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Info - Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Contact Details Card */}
            <div className="gradient-border rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900/60">
              <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100">
                Contact Information
              </h2>

              <div className="space-y-2">
                {/* Email */}
                <a
                  href="mailto:longyu.xu@edhec.com"
                  className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-light dark:hover:bg-surface-dark"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-500/10 text-primary-500 transition-transform duration-300 group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{messages.contact.email}</p>
                    <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">longyu.xu@edhec.com</p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+8618821271689"
                  className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-light dark:hover:bg-surface-dark"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-500/10 text-primary-500 transition-transform duration-300 group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{messages.contact.phone}</p>
                    <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">+86 188 2127 1689</p>
                  </div>
                </a>

                {/* Location */}
                <div className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-500/10 text-primary-500 transition-transform duration-300 group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{messages.contact.location}</p>
                    <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">{messages.contact.locationValue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="gradient-border rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900/60">
              <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100">
                Social
              </h2>

              <div className="flex gap-3">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/longyu-xu-550b68250/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-500/10 text-primary-500 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  title={messages.contact.linkedin}
                >
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/shuaigexly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-500/10 text-primary-500 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  title={messages.contact.github}
                >
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>

              <div className="mt-5 space-y-2">
                <a
                  href="https://www.linkedin.com/in/longyu-xu-550b68250/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-gray-400 transition-colors hover:text-primary-500"
                >
                  {messages.contact.linkedin} &mdash; LinkedIn Profile
                </a>
                <a
                  href="https://github.com/shuaigexly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-gray-400 transition-colors hover:text-primary-500"
                >
                  {messages.contact.github} &mdash; github.com/shuaigexly
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-3">
            <div className="gradient-border rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900/60 sm:p-8">
              <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100">
                {messages.contact.formTitle}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {messages.contact.formName}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm transition-all duration-300 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700/50 dark:bg-gray-800/50 dark:focus:border-primary-500 dark:focus:bg-gray-800"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {messages.contact.formEmail}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm transition-all duration-300 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700/50 dark:bg-gray-800/50 dark:focus:border-primary-500 dark:focus:bg-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {messages.contact.formSubject}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm transition-all duration-300 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700/50 dark:bg-gray-800/50 dark:focus:border-primary-500 dark:focus:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {messages.contact.formMessage}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm leading-relaxed transition-all duration-300 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700/50 dark:bg-gray-800/50 dark:focus:border-primary-500 dark:focus:bg-gray-800"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-glow group relative z-10 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30"
                >
                  {messages.contact.formSubmit}
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
