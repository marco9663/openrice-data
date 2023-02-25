import { DOMNotFoundError } from '../error';
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
  openingHours: {
    date: string;
    time: string[];
  }[];
  categories: string[];
  photoUrl: string | null;
}
export const parseOpenRiceRestaurantHTML = (
  rawHTML: string
): OpenRiceRestaurant => {
  const root = parse(rawHTML);

  const nameZhElement = root.querySelector('span.name');
  if (!nameZhElement) {
    throw new Error('cannot find nameZh');
  }
  const nameZh = nameZhElement.text.trim();
  const nameEnElement = root.querySelector('div.smaller-font-name');
  if (!nameEnElement) {
    throw new Error('cannot find nameEn');
  }
  const nameEn = nameEnElement.text.trim();

  const addressElements = root.querySelectorAll('a[data-href=#map]');
  if (addressElements.length !== 2) {
    throw new DOMNotFoundError('cannot find addressZh and addressEn');
  }
  const addressZh = addressElements[0].text.trim();
  const addressEn = addressElements[1].text.trim();

  const districtElement = root.querySelector('.header-poi-district');
  if (!districtElement) {
    throw new DOMNotFoundError('cannot find district');
  }
  const district = districtElement.text.trim();

  const scoreDivs = root.querySelectorAll('.score-div');
  if (addressElements.length !== 2) {
    throw new DOMNotFoundError('cannot find score');
  }
  const smile = parseInt(scoreDivs[0].text.trim());
  const ok = parseInt(scoreDivs[1].text.trim());
  const cry = parseInt(scoreDivs[2].text.trim());

  const openElement = root.querySelectorAll('.opening-hours-day');
  if (openElement.length < 1) {
    throw new DOMNotFoundError('cannot find opening hours');
  }
  const openingHours = openElement
    .map((v) => ({
      date: v.querySelector('.opening-hours-date')?.text.trim(),
      time: v.querySelector('.opening-hours-time')?.text.trim(),
    }))
    .filter((v) => v.time && v.date && !['今日營業'].includes(v.date))
    .map((v) => ({
      date: v.date!,
      time: v.time!.split(/[\t\n]/).filter((v) => v),
    }));

  const categories = root
    .querySelectorAll('.header-poi-categories a')
    .map((v) => v.text);

  const photoElement = root.querySelector('.photo');
  let photoUrl: string | null = null;
  if (
    !photoElement ||
    !photoElement.getAttribute('style') ||
    !photoElement!.getAttribute('style')!.match(/url\((.*)\)/) ||
    !Array.isArray(photoElement!.getAttribute('style')!.match(/url\((.*)\)/)) ||
    photoElement!.getAttribute('style')!.match(/url\((.*)\)/)!.length < 2
  ) {
  } else {
    photoUrl = photoElement!
      .getAttribute('style')!
      .match(/url\((.*)\)/)![1]
      .replaceAll('"', '');
  }

  return {
    nameZh: nameZh,
    nameEn: nameEn,
    addressZh: addressZh,
    addressEn,
    district: district,
    smile,
    ok,
    cry,
    openingHours,
    categories,
    photoUrl,
  };
};

const extractLatLong = (
  text: string
): { latitude: number; longitude: number } | null => {
  const regex =
    /(\d+)\s*°\s*(\d+)\s*'\s*(\d+(\.\d+)?)\s*"\s*[EN],\s*(\d+)\s*°\s*(\d+)\s*'\s*(\d+(\.\d+)?)\s*"\s*[EN]/;
  const match = text.match(regex);
  if (match) {
    let latitude =
      parseInt(match[1]) +
      parseInt(match[2]) / 60 +
      parseFloat(match[3]) / 3600;
    let longitude =
      parseInt(match[5]) +
      parseInt(match[6]) / 60 +
      parseFloat(match[7]) / 3600;
    if (match[4].endsWith('S')) {
      latitude = -latitude;
    }
    if (match[8].endsWith('W')) {
      longitude = -longitude;
    }
    return { latitude, longitude };
  } else {
    return null;
  }
};
