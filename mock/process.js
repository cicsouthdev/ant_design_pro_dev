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
        id: '123123123',
        surveyPossession: '杭州市分公司',
        sendRepairBrand: '奥迪B',
        repairCompany: '远通和晟',
        sendRepairWeight: '100',
        weightProportion: '100%',
        sendRepairProportion: '',
        nearbyCoefficient: '1.5',
        farAwayCoefficient: '',
        nearbyDistance: '5.0',
        farAwayDistance: '',
        nearbyKeyWord: '',
        farAwayKeyWord: '',
      },{
        id: '321321123',
        surveyPossession: '杭州市分公司',
        sendRepairBrand: '宝马定点',
        repairCompany: '杭州宝荣',
        sendRepairWeight: '4',
        weightProportion: '15.4%',
        sendRepairProportion: '15.3%',
        nearbyCoefficient: '1.5',
        farAwayCoefficient: '0.7',
        nearbyDistance: '5.0',
        farAwayDistance: '',
        nearbyKeyWord: '拱墅,余杭,江干,下城,上城',
        farAwayKeyWord: '萧山,滨江',
      },{
        id: '321124132',
        surveyPossession: '杭州市分公司',
        sendRepairBrand: '宝马定点',
        repairCompany: '运通详宝',
        sendRepairWeight: '10',
        weightProportion: '38.5%',
        sendRepairProportion: '38.4%',
        nearbyCoefficient: '1.5',
        farAwayCoefficient: '0.7',
        nearbyDistance: '5.0',
        farAwayDistance: '',
        nearbyKeyWord: '',
        farAwayKeyWord: '',
      },{
        id: '4312541',
        surveyPossession: '杭州市分公司',
        sendRepairBrand: '宝马定点',
        repairCompany: '杭州恒信德悦汽修',
        sendRepairWeight: '5',
        weightProportion: '19.2%',
        sendRepairProportion: '19.2%',
        nearbyCoefficient: '1.5',
        farAwayCoefficient: '0.7',
        nearbyDistance: '5.0',
        farAwayDistance: '',
        nearbyKeyWord: '西湖区',
        farAwayKeyWord: '',
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

  'GET /process/repairCompany': (req, res)=>{
    const dataSource = [
      {
        id: '14321234',
        companyCode: '3301721001294',
        companyName: '杭州随风汽修',
        repairCompanyCode: '3301721001294',
        companyAddress: '杭州市余杭区余杭街111号',
        longitude: '119.999999',
        latitude: '30.222222',
        belongCompany: '武林支公司',
        giveUp: '0',
        valid: '1',
      },{
        id: '123413234',
        companyCode: '33003H100054',
        companyName: '杭州汇迪',
        repairCompanyCode: '3301031000005',
        companyAddress: '石祥路536号',
        longitude: '119.123456',
        latitude: '30.123456',
        belongCompany: '武林支公司',
        giveUp: '0',
        valid: '1',
      },{
        id: '125341234',
        companyCode: '3301001000016',
        companyName: '建德元麦',
        repairCompanyCode: '3301001000016',
        companyAddress: '建德市新衢路269号',
        longitude: '120.546687',
        latitude: '30.546546',
        belongCompany: '建德支公司',
        giveUp: '1',
        valid: '1',
      },{
        id: '123432134',
        companyCode: '33003H100240',
        companyName: '杭州九和',
        repairCompanyCode: '3301533000001',
        companyAddress: '绍兴路424号',
        longitude: '120.789630',
        latitude: '19.998742',
        belongCompany: '武林支公司',
        giveUp: '0',
        valid: '0',
      },
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
  'POST /process/repairCompany': {msg:'success'},
  'PUT /process/repairCompany': {msg:'success'},
  'DELETE /process/repairCompany': {msg:'success'},

  'GET /process/repairCompanyGroup': (req, res)=>{
    const dataSource = [
      {
        id: '14321234',
        groupCode: '3301721001294',
        groupName: '金昌集团',
        generalManagerCode: '3301721001294',
        generalManagerName: '王二狗',
        generalManagerPhone: '119.999999',
        belongCompanyCode: '1232133',
        belongCompany: '武林支公司',
      },{
        id: '1432122234',
        groupCode: '330172102201294',
        groupName: '桐庐风之行',
        generalManagerCode: '330172111001294',
        generalManagerName: '赵铁柱',
        generalManagerPhone: '18812345678',
        belongCompanyCode: '1232133',
        belongCompany: '武林支公司',
      },{
        id: '1432221234',
        groupCode: '3301721001294',
        groupName: '中德集团',
        generalManagerCode: '330172155001294',
        generalManagerName: '李铁根',
        generalManagerPhone: '18699999999',
        belongCompanyCode: '1232133',
        belongCompany: '武林支公司',
      },{
        id: '1431121234',
        groupCode: '33017221001294',
        groupName: '浙江星奥汽修',
        generalManagerCode: '330172103301294',
        generalManagerName: '陈二壮',
        generalManagerPhone: '13588888888',
        belongCompanyCode: '1232133',
        belongCompany: '武林支公司',
      },
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
  'POST /process/repairCompanyGroup': {msg:'success'},
  'PUT /process/repairCompanyGroup': {msg:'success'},
  'DELETE /process/repairCompanyGroup': {msg:'success'},
}
