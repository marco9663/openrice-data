import { Lang, Region } from './../constants/openrice';

export abstract class OpenRiceUrl {
  baseUrl: string;
  lang: Lang;
  region: Region;

  constructor(baseUrl: string, lang: Lang, region: Region) {
    this.baseUrl = baseUrl;
    this.lang = lang;
    this.region = region;
  }
}

export class OpenRiceRestaurantUrl extends OpenRiceUrl {
  restaurantId: string;

  constructor(
    baseUrl: string,
    lang: Lang,
    region: Region,
    restaurantId: string
  ) {
    super(baseUrl, lang, region);
    this.restaurantId = restaurantId;
  }

  // static fromUrl(url: string): OpenRiceRestaurantUrl {

  // }
}
