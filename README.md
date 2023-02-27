# openrice-data

This package helps parse openrice html page to json format. It is intented to parse the html text response from an http client, therefore it only accept html text as input.

## Feature

- [x] parse restaurant info from `zh` version website
- [ ] parse restaurant info from all lang version website

### Types
#### OpenRiceRestaurant
- nameZh: `string`
- nameEn: `string`
- addressZh: `string`
- addressEn: `string`
- district: `string`
- smile: `number`
- ok: `number`
- cry: `number`
- openingHours: {
date: `string`
time: `string[]`
} [] | `null`
- categories: `string[]`
- photoUrl: `string` | `null`

example
```
{
  nameZh: '秘 (享成街)',
  nameEn: 'secret chefs (Heung Shing Street)',
  addressZh: '荃灣享成街22號地舖',
  addressEn: 'G/F, 22 Heung Shing Street, Tsuen Wan',
  district: '荃灣',
  smile: 345,
  ok: 77,
  cry: 16,
  openingHours: [
    {
      date: '星期一至日',
      time: ['12:00 - 15:00', '17:30 - 22:00'],
    },
    {
      date: '公眾假期',
      time: ['12:00 - 15:00', '17:30 - 22:00'],
    },
    {
      date: '公眾假期前夕',
      time: ['12:00 - 15:00', '17:30 - 22:00'],
    },
  ],
  categories: ['日本菜', '烤肉'],
  photoUrl: 'https://static5.orstatic.com/userphoto2/photo/1B/1185/07CQ1O8CD07A7D3DDF964Alv.jpg'
}
```

