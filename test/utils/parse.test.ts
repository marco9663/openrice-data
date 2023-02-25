import { parseOpenRiceRestaurantHTML } from '../../src';
import { readFile } from 'fs/promises';
import {
  openRiceRestaurant_r525476,
  openRiceRestaurant_r782345,
} from '../sample';

describe('parse OpenRice Restaurant HTML', () => {
  it('correctly parse normal page', async () => {
    const rawHTML = await readFile('./test/sample/restaurant-r525476.html');
    const actual = parseOpenRiceRestaurantHTML(rawHTML.toString());
    expect(actual).toStrictEqual(openRiceRestaurant_r525476);
  });

  it('correctly parse photo-less page', async () => {
    const rawHTML = await readFile('./test/sample/restaurant-r782345.html');
    const actual = parseOpenRiceRestaurantHTML(rawHTML.toString());
    expect(actual).toStrictEqual(openRiceRestaurant_r782345);
  });
});
