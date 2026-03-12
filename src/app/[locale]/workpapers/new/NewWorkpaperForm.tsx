'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import WorkpaperQcTool, { type WorkpaperQcToolMessages } from '@/components/WorkpaperQcTool';
import type { Locale } from '@/i18n/config';

interface NewWorkpaperFormProps {
  locale: Locale;
  messages: {
    workpapers: {
      newWorkpaper: string;
      backToList: string;
    };
    workpaperTool: WorkpaperQcToolMessages;
  };
}

export default function NewWorkpaperForm({ locale, messages }: NewWorkpaperFormProps) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Get or create demo user for saving workpapers
  useEffect(() => {
    const initUser = async () => {
      try {
        // Check if demo user exists, create if not
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'demo@example.com',
            name: 'Demo Auditor',
            role: 'senior_auditor',
          }),
        });

        if (res.ok) {
          const { data } = await res.json();
          setUserId(data.id);
        }
      } catch (error) {
        console.error('Error initializing user:', error);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  const handleSaveSuccess = (workpaperId: string) => {
    // Navigate to the workpaper detail page after saving
    router.push(`/${locale}/workpapers/${workpaperId}`);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href={`/${locale}/workpapers`}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          ← {messages.workpapers.backToList}
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {messages.workpapers.newWorkpaper}
      </h1>

      <WorkpaperQcTool
        messages={messages.workpaperTool}
        enableSave={true}
        userId={userId || undefined}
        onSaveSuccess={handleSaveSuccess}
      />
    </div>
  );
}
