import { createClient } from '@sanity/client';
import { pages, type ImageField } from '../data/defaults';

export type Text = { v: string; ph: boolean };
export type Img = { slot: string; alt: string; url?: string; ph: boolean };
export type Page = { text: Record<string, Text>; images: Record<string, Img> };

const projectId = process.env.SANITY_PROJECT_ID;
const client = projectId
  ? createClient({ projectId, dataset: process.env.SANITY_DATASET || 'production', apiVersion: '2024-01-01', useCdn: true })
  : null;

export async function getPage(key: keyof typeof pages): Promise<Page> {
  const def = pages[key];
  let remote: Record<string, any> | null = null;
  if (client) {
    const imgProj = Object.keys(def.images).map((k) => `"${k}Url": ${k}.asset->url`).join(', ');
    try {
      remote = await client.fetch(`*[_type == $t][0]{ ..., ${imgProj || '_id'} }`, { t: def.sanityType });
    } catch (e) {
      console.warn(`[sanity] fetch failed for ${key}; using defaults.`, (e as Error).message);
    }
  }
  const text: Page['text'] = {};
  for (const [k, d] of Object.entries(def.text)) {
    const r = remote?.[k];
    text[k] = typeof r === 'string' && r.trim() ? { v: r, ph: false } : { ...d };
  }
  const images: Page['images'] = {};
  for (const [k, d] of Object.entries<ImageField>(def.images)) {
    const url = remote?.[`${k}Url`];
    const alt = remote?.[`${k}Alt`];
    images[k] = url ? { slot: d.slot, url, alt: alt || '', ph: false } : { slot: d.slot, alt: d.alt, ph: true };
  }
  return { text, images };
}
