import { parseOpenRiceRestaurantHTML } from '../../src';
import { readFile } from 'fs/promises';
import { openRiceRestaurant_r525476 } from '../sample';

describe('parse OpenRice Restaurant HTML', () => {
  it('correctly parse', async () => {
    const rawHTML = await readFile('./test/sample/restaurant-r525476.html');
    const actual = parseOpenRiceRestaurantHTML(rawHTML.toString());
    expect(actual).toStrictEqual(openRiceRestaurant_r525476);
  });
});
