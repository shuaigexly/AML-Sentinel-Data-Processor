'use client';

import { useState, useEffect } from 'react';

const ROLES = {
  en: ['Risk Analyst', 'Finance Student', 'FinTech Enthusiast', 'Audit Automation'],
  zh: ['风险分析师', '金融系学生', '金融科技爱好者', '审计自动化'],
};

export default function TypewriterRoles({ isZh }: { isZh: boolean }) {
  const roles = isZh ? ROLES.zh : ROLES.en;
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const full = roles[roleIdx];

    // Finished typing — wait then start deleting
    if (!isDeleting && text === full) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }

    // Finished deleting — advance to next role
    if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
      return;
    }

    const delay = isDeleting ? 38 : 88;
    const t = setTimeout(() => {
      setText(isDeleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, isDeleting, roleIdx, roles]);

  return (
    <>
      <style>{`
        @keyframes twblink { 0%,100%{opacity:1} 50%{opacity:0} }
        .tw-cursor { animation: twblink 1.1s step-end infinite; }
      `}</style>
      <span className="gradient-text font-extrabold">{text}</span>
      <span className="tw-cursor ml-[2px] inline-block h-[0.85em] w-[2.5px] translate-y-[1px] rounded-sm bg-primary-500 align-middle" />
    </>
  );
}
