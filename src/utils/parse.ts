import { parse } from 'node-html-parser';

export interface OpenRiceRestaurant {
  nameZh: string;
  nameEn: string;
  addressZh: string;
  addressEn: string;
  district: string;
  smile: number;
  ok: number;
  cry: number;
  open: {
    day: string;
    period: string[];
  }[];
  categories: string[];
}
export const parseOpenRiceRestaurantHTML = (rawHTML: string) => {
  const root = parse(rawHTML);
  const nameZh = root.querySelector('span.name')?.text;
  const nameEn = root.querySelector('div.smaller-font-name')?.text.trim();
  const addressZh = root.querySelector('a[data-href=#map]')?.text.trim();
  const addressEn = root.querySelectorAll('a[data-href=#map]')[1].text.trim();
  const district = root.querySelector('.header-poi-district')?.text.trim();
  const scoreDivs = root.querySelectorAll('.score-div');
  const smile = parseInt(scoreDivs[0].text.trim());
  const ok = parseInt(scoreDivs[1].text.trim());
  const cry = parseInt(scoreDivs[2].text.trim());
  const open = root
    .querySelectorAll('.opening-hours-day')
    .filter((v) => !v.text.includes('今日營業'))
    .map((op) => {
      const parsedOpen: string[] = op.text
        .trim()
        .replaceAll('\t', '')
        .replaceAll('\r', '')
        .split('\n')
        .filter((v) => v.trim()).map(v=>v.trim());
      return {
        day: parsedOpen[0],
        period: parsedOpen.slice(1),
      };
    });
  const categories = root
    .querySelectorAll('.header-poi-categories a')
    .map((v) => v.text);
  const result = {
    nameZh: nameZh || 'null',
    nameEn: nameEn || 'null',
    addressZh: addressZh || 'null',
    addressEn,
    district: district || 'null',
    smile,
    ok,
    cry,
    open,
    categories,
  } satisfies OpenRiceRestaurant;
  return result;
};
