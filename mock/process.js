import { parse } from "url";


export default {
  'GET /process/carBrandRel': (req, res)=>{
    const dataSource = [
      {
        carModel: 'BSAAHI0047',
        carModelName: '帕拉梅拉PANAMERA 4 E-HYBRID 2.9T轿跑车',
        brandName: 'AutoInsert',
        remark: '2019/1/4 8:39:37'
      },{
        carModel: 'BTAAKD0078',
        carModelName: '思威DHW64641R1CSE多用途乘用车',
        brandName: 'AutoInsert',
        remark: '2018/12/29 18:39:37'
      },{
        carModel: 'BTAAKD0089',
        carModelName: '思威DHW6464R5HEV混合动力多用途乘用车',
        brandName: 'AutoInsert',
        remark: '2018/12/29 18:39:37'
      },{
        carModel: 'BYAAQD0027',
        carModelName: '比亚迪BYD7152WT3轿车',
        brandName: 'AutoInsert',
        remark: '2018/11/29 18:12:37'
      }
    ];
    const result = {
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize: 20,
        current: 1,
      },
    };

    return res.json(result);
  },
  'POST /process/carBrandRel': {msg:'success'},
  'PUT /process/carBrandRel': {msg:'success'},
  'DELETE /process/carBrandRel': {msg:'success'},

  'PUT /process/carBrandRels': {msg:'success'},

  '/process/brand': [
    {name:'广州丰田', code:'guagnzhoufengtian', number: 351},
    {name:'四川丰田', code:'sichuanfengtian', number: 20},
    {name:'一汽丰田', code:'yqifengtian', number: 869},
  ],

  'GET /process/brandSSSSRel': (req, res)=>{
    const dataSource = [
      {
        id: '111',
        carModel: 'BSAAHI0047',
        carModelName: '帕拉梅拉PANAMERA 4 E-HYBRID 2.9T轿跑车',
        brandName: 'AutoInsert',
        remark: '2019/1/4 8:39:37'
      },{
        id: '11222',
        carModel: 'BTAAKD0078',
        carModelName: '思威DHW64641R1CSE多用途乘用车',
        brandName: 'AutoInsert',
        remark: '2018/12/29 18:39:37'
      },{
        id: '11333',
        carModel: 'BTAAKD0089',
        carModelName: '思威DHW6464R5HEV混合动力多用途乘用车',
        brandName: 'AutoInsert',
        remark: '2018/12/29 18:39:37'
      },{
        id: '11444',
        carModel: 'BYAAQD0027',
        carModelName: '比亚迪BYD7152WT3轿车',
        brandName: 'AutoInsert',
        remark: '2018/11/29 18:12:37'
      }
    ];
    const result = {
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize: 20,
        current: 1,
      },
    };

    return res.json(result);
  },
  'POST /process/brandSSSSRel': {msg:'success'},
  'PUT /process/brandSSSSRel': {msg:'success'},
  'DELETE /process/brandSSSSRel': {msg:'success'},

}
