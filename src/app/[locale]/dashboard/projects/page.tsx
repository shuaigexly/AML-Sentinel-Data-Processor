import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';
import ProjectsKanban from './ProjectsKanban';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface ProjectsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return <ProjectsKanban locale={locale} messages={messages} />;
}
