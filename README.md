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
- open: {
day: `string`
period: `string[]`
} []
- categories: `string[]`

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
  open: [
    {
      day: '星期一至日',
      period: ['12:00 - 15:00', '17:30 - 22:00'],
    },
    {
      day: '公眾假期',
      period: ['12:00 - 15:00', '17:30 - 22:00'],
    },
    {
      day: '公眾假期前夕',
      period: ['12:00 - 15:00', '17:30 - 22:00'],
    },
  ],
  categories: ['日本菜', '烤肉'],
}
```

