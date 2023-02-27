import { OpenRiceRestaurant, parseOpenRiceRestaurantHTML } from '../../src';
import {
  openRiceRestaurant_r525476,
  openRiceRestaurant_r782345,
  openRiceRestaurant_r786863,
} from '../sample';

import { readFile } from 'fs/promises';

describe('parse OpenRice Restaurant HTML', () => {
  it.each([
    ["normal page",'./test/sample/restaurant-r525476.html', openRiceRestaurant_r525476],
    ["photo-less page",'./test/sample/restaurant-r782345.html', openRiceRestaurant_r782345],
    ["opening-hours-less page",'./test/sample/restaurant-r786863.html', openRiceRestaurant_r786863],
  ])("correctly parse %p(%p) expecting %p", async (desc: string, htmlFilePath: string, data :OpenRiceRestaurant)=>{
    const rawHTML = await readFile(htmlFilePath);
    const actual = parseOpenRiceRestaurantHTML(rawHTML.toString());
    expect(actual).toStrictEqual(data);
  })
});
