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

  '/process/belongCompany': [
    {code: '33010000', name: '杭州市分公司'},
    {code: '33010100', name: '宁波市分公司'},
    {code: '33010200', name: '温州市分公司'},
    {code: '33010300', name: '绍兴市分公司'},
    {code: '33010400', name: '湖州市分公司'},
    {code: '33010500', name: '嘉兴市分公司'},
    {code: '33010600', name: '衢州市分公司'},
    {code: '33010700', name: '金华市分公司'},
    {code: '33010700', name: '台州市分公司'},
    {code: '33010800', name: '丽水市分公司'},
    {code: '33010900', name: '舟山市分公司'},
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
        isParent: true,
        children: [
          {
            id: '143212341',
            code: '3301721001293',
            name: '金昌一宝',
            generalManagerCode: '3301721001244',
            generalManagerName: '王三狗',
            generalManagerPhone: '119.999999',
            belongCompanyCode: '1232133',
            belongCompany: '武林支公司',
          },{
            id: '143212344',
            code: '3301721001291',
            name: '金昌二宝',
            generalManagerCode: '33017210032',
            generalManagerName: '王小狗',
            generalManagerPhone: '119.999999',
            belongCompanyCode: '1232133',
            belongCompany: '武林支公司',
          },
        ],
      },{
        id: '1432122234',
        groupCode: '330172102201294',
        groupName: '桐庐风之行',
        generalManagerCode: '330172111001294',
        generalManagerName: '赵铁柱',
        generalManagerPhone: '18812345678',
        belongCompanyCode: '1232133',
        belongCompany: '武林支公司',
        isParent: true,
      },{
        id: '1432221234',
        groupCode: '3301721001294',
        groupName: '中德集团',
        generalManagerCode: '330172155001294',
        generalManagerName: '李铁根',
        generalManagerPhone: '18699999999',
        belongCompanyCode: '1232133',
        belongCompany: '武林支公司',
        isParent: true,
      },{
        id: '1431121234',
        groupCode: '33017221001294',
        groupName: '浙江星奥汽修',
        generalManagerCode: '330172103301294',
        generalManagerName: '陈二壮',
        generalManagerPhone: '13588888888',
        belongCompanyCode: '1232133',
        belongCompany: '武林支公司',
        isParent: true,
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

  'GET /process/unSelectedCompany': [
    {
      id: '1433212341',
      code: '3301721001293',
      name: '金昌三宝',
      generalManagerCode: '3301721001244',
      generalManagerName: '王三狗',
      generalManagerPhone: '119.999999',
      belongCompanyCode: '1232133',
      belongCompany: '武林支公司',
    },{
      id: '14321444',
      code: '3301721001291',
      name: '金昌四宝',
      generalManagerCode: '33017210032',
      generalManagerName: '王小狗',
      generalManagerPhone: '119.999999',
      belongCompanyCode: '1232133',
      belongCompany: '武林支公司',
    },{
      id: '143214441',
      code: '3301721001291',
      name: '中德一宝',
      generalManagerCode: '33017210032',
      generalManagerName: '王小狗',
      generalManagerPhone: '119.999999',
      belongCompanyCode: '1232133',
      belongCompany: '武林支公司',
    },{
      id: '1432144431',
      code: '3301721001291',
      name: '中德二宝',
      generalManagerCode: '33017210032',
      generalManagerName: '王小狗',
      generalManagerPhone: '119.999999',
      belongCompanyCode: '1232133',
      belongCompany: '武林支公司',
    },
  ],

  'GET /process/processEngine': (req, res)=>{
    const { type='systemEvent' } = req.query||{};

    let dataSource = [];
    switch (type){
      case 'systemEvent':
        dataSource = [
          {
            id: '123123',
            eventTime: '2019-02-03 23:00:00',
            event: '查勘完成',
            msg: 'RDAA2019330100000111 王凯',
          },{
            id: '1231223',
            eventTime: '2019-02-03 21:10:00',
            event: '调度任务',
            msg: 'RDAA2019330100000102 车(浙AE864) 孙XX 杭州市余杭区闲林镇 初次调度',
          },{
            id: '1231233',
            eventTime: '2019-02-02 23:00:00',
            event: '发现报案',
            msg: 'RDAA2019330100000100 浙AE4438 何某',
          },{
            id: '1231235',
            eventTime: '2019-02-01 03:02:00',
            event: '理算核赔',
            msg: 'RDAA2019330100000028 CDAA201933010215321533 3 18266275',
          },{
            id: '1231237',
            eventTime: '2019-01-01 04:12:33',
            event: '信息发送失败',
            msg: 'RDZA2019330100000000 用户无效或未关注: aaa bbb 微信推送',
            status: 1
          }
        ];
        break;
      case 'msgSend':
        dataSource = [
          {
            id: '12121234',
            reportNo: 'RDAA201933010000031770',
            msgType: '查勘调度',
            operator: '电信短信',
            receiverName: '王二',
            receiverPhone: '18888888888',
            sendTime: '02-17 21:18:30',
            theme: '[消息推送]',
            status: 0,
          },{
            id: '12121235',
            reportNo: 'RDAA201933010000031770',
            msgType: '任务派发',
            operator: '移动短信',
            receiverName: '张三',
            receiverPhone: '13788888888',
            sendTime: '02-17 21:18:00',
            theme: '[任务派发]',
            status: 1,
          },{
            id: '12121236',
            reportNo: 'RDAA201933010000031770',
            msgType: '送修告诉客户',
            operator: '联通短信',
            receiverName: '辛八',
            receiverPhone: '13505188888',
            sendTime: '02-17 21:17:00',
            theme: '',
            status: 1,
          },{
            id: '12121237',
            reportNo: 'RDAA201933010000031770',
            msgType: '核损通过通知',
            operator: '某某推送',
            receiverName: '方四',
            receiverPhone: '1a23d4ae213af456',
            sendTime: '02-17 21:16:45',
            theme: '消息推送',
            status: 0,
          },
        ];
        break;
      case 'msgReceive':
        dataSource = [
          {
            id: '3333123',
            reportNo: 'RDAA2019330100000123',
            smsType: '客户赔款支付回复',
            operator: '移动短信',
            replyPhone: '18288888888',
            replyTime: '01-28 13:17:22',
            replyMsg: '1',
            status: 1,
          },{
            id: '3333124',
            reportNo: 'RDAA2019330100000123',
            smsType: '客户赔款支付回复',
            operator: '移动短信',
            replyPhone: '1888888888',
            replyTime: '01-28 13:16:22',
            replyMsg: '1',
            status: 1,
          },{
            id: '3333125',
            reportNo: 'RDAA2019330100000123',
            smsType: '客户赔款支付回复',
            operator: '移动短信',
            replyPhone: '18811111111',
            replyTime: '01-28 13:15:22',
            replyMsg: '1',
            status: 1,
          },{
            id: '3333126',
            reportNo: 'RDAA2019330100000123',
            smsType: '客户赔款支付回复',
            operator: '移动短信',
            replyPhone: '18933333333',
            replyTime: '01-28 13:14:22',
            replyMsg: '1',
            status: 1,
          },
        ];
        break;
      case 'taskSendDistribution':
        dataSource = [
          {
            id: '12312',
            reportNo: 'RDAA2019330100000123',
            taskType: '接洽',
            taskName: '接洽: 浙AGR000-杨羊',
            taskReceiver: 'A125864 韩含',
            taskTime: '02-15 13：22：31',
            taskDesc: '联系客户商定定损与维修事宜, 车牌号: 浙AGR000',
            status: 1,
          },{
            id: '12313',
            reportNo: 'RDAA2019330100000124',
            taskType: '引导',
            taskName: '引导: 浙AGR002-孙隼',
            taskReceiver: '1023858432 郭国',
            taskTime: '02-15 13:22:01',
            taskDesc: '引导客户到指定定损点进行专业定损, 定损点: 萧山圈圈叉叉, 车牌号: 浙AGR000',
            status: 1,
          },{
            id: '12314',
            reportNo: 'RDAA2019330100000125',
            taskType: '审批',
            taskName: '审批: 浙AGR000-胡湖',
            taskReceiver: '45435452 周粥',
            taskTime: '02-15 13:21:31',
            taskDesc: '接修专员接洽维修失败，需要审批，接修员: 毛茂, 车牌号: 浙AGR000',
            status: 1,
          },{
            id: '12315',
            reportNo: 'RDAA201933010000016',
            taskType: '推荐',
            taskName: '推荐: 浙AGR000-舒树',
            taskReceiver: 'A144465 陆碌',
            taskTime: '02-15 13:22:20',
            taskDesc: '一次送修失败,推荐客户到其他的定损点进行定损, 车牌号: 浙AGR000',
            status: 1,
          },
        ];
        break;
      case 'msgQueue':
        dataSource = [
          {
            id: '555813',
            msgTime: '02-13 18:35:22',
            sender: 'BPMobile',
            businessType: '回复送修结果',
            businessCode: '1194560',
            businessContent: '5582480',
            status: 1,
          },{
            id: '555814',
            msgTime: '02-13 18:34:22',
            sender: 'BPMobile',
            businessType: '回复送修结果',
            businessCode: '1194561',
            businessContent: '5582416',
            status: 1,
          },{
            id: '555815',
            msgTime: '02-13 18:33:22',
            sender: 'BPMobile',
            businessType: '回复送修结果',
            businessCode: '1194565',
            businessContent: '5582482',
            status: 1,
          },{
            id: '555812',
            msgTime: '02-13 18:31:22',
            sender: 'BPMobile',
            businessType: '回复送修结果',
            businessCode: '1194537',
            businessContent: '5582481',
            status: 1,
          },
        ];
        break;
      default:
        dataSource = [];
    }
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
}
