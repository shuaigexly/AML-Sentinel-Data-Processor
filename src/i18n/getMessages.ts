import type { Locale } from './config';

const dictionaries = {
  en: () => import('./messages/en.json').then((module) => module.default),
  zh: () => import('./messages/zh.json').then((module) => module.default),
};

export async function getMessages(locale: Locale) {
  return dictionaries[locale]();
}

export type Messages = Awaited<ReturnType<typeof getMessages>>;
