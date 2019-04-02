
// 归属公司
function getBelongCompany(){
  return [
    {code: '33010000', name: '杭州市支公司'},
    {code: '33010100', name: '宁波市支公司'},
    {code: '33010200', name: '温州市支公司'},
    {code: '33010300', name: '绍兴市支公司'},
    {code: '33010400', name: '湖州市支公司'},
    {code: '33010500', name: '嘉兴市支公司'},
    {code: '33010600', name: '衢州市支公司'},
    {code: '33010700', name: '金华市支公司'},
    {code: '33010800', name: '台州市支公司'},
    {code: '33010900', name: '丽水市支公司'},
    {code: '33011000', name: '舟山市支公司'},
  ];
}

// 修理厂
function getRepairCompany(){
  return [
    {code: '33010000', name: '杭州行立江'},
    {code: '33010100', name: '杭州百瑞'},
    {code: '33010200', name: '杭州腾飞'},
    {code: '33010300', name: '浙江迪信'},
    {code: '33010400', name: '杭州驰奥'},
    {code: '33010500', name: '杭州元麦'},
    {code: '33010600', name: '元通西现'},
    {code: '33010700', name: '元通风行'},
    {code: '33010800', name: '杭州九和'},
    {code: '33010900', name: '浙江康源'},
    {code: '33011000', name: '杭州路之捷汽修'},
  ];
}

// 车商集团
function getRepairCompanyGroup(){
  return [
    {code: '33010000', name: '金昌集团'},
    {code: '33010100', name: '桐庐风之行'},
    {code: '33010200', name: '中德集团'},
    {code: '33010300', name: '浙江星奥汽修'},
  ];
}

// 送修品牌
function getRepairBrand(){
  return [
    {code: '33010000', name: '奥迪'},
    {code: '33010100', name: '雪佛兰'},
    {code: '33010200', name: '凯迪拉克'},
    {code: '33010300', name: '保时捷'},
    {code: '33010400', name: '吉利'},
    {code: '33010500', name: '现代'},
    {code: '33010600', name: '长城'},
    {code: '33010700', name: '宾利'},
    {code: '33010800', name: '雷克萨斯'},
    {code: '33010900', name: '迈巴赫'},
    {code: '33011000', name: '劳斯莱斯'},
  ];
}

// 授权公司
function getAuthorizeCompany(){
  return [

  ];
}

function getRepairNumInitData(req, res){
  const result = {
    belongCompanyList: getBelongCompany(),
    surveyPossessionList: getBelongCompany(),
    repairCompanyList: getRepairCompany(),
    policyBelongList: getBelongCompany(),
    sendRepairBrand: getRepairBrand(),
  };
  return res.json(result);
}

function getReportSuccessInitData(req, res){
  const result = {
    belongCompanyList: getBelongCompany(),
    surveyPossessionList: getBelongCompany(),
    repairCompanyList: getRepairCompany(),
    policyBelongList: getBelongCompany(),
    sendRepairBrand: getRepairBrand(),
  };
  return res.json(result);
}

function getMonitorRemedyInitData(req, res){
  const result = {
    belongCompanyList: getBelongCompany(),
  };
  return res.json(result);
}

function getClientFeedbackInit(req, res){
  const result = {
    belongCompanyList: getBelongCompany(),
    authorizeCompanyList: getAuthorizeCompany(),
    repairCompanyList: getRepairCompany(),
    repairCompanyGroupList: getRepairCompanyGroup(),
  };
  return res.json(result);
}

function getSendRepairProcessInit(req, res){
  const result = {
    belongCompanyList: getBelongCompany(),
    authorizeCompanyList: getAuthorizeCompany(),
    repairCompanyList: getRepairCompany(),
    repairCompanyGroupList: getRepairCompanyGroup(),
  };
  return res.json(result);
}

function getRepairStrategyInit(req, res){
  const result = {
    belongCompanyList: getBelongCompany(),
    authorizeCompanyList: getAuthorizeCompany(),
    repairCompanyList: getRepairCompany(),
  };
  return res.json(result);
}

function getOrganizationCoverInit(req, res){
  const result = {
    belongCompanyList: getBelongCompany(),
    authorizeCompanyList: getAuthorizeCompany(),
    repairCompanyList: getRepairCompany(),
    repairCompanyGroupList: getRepairCompanyGroup(),
    repairBrandList: getRepairBrand(),
  };
  return res.json(result);
}

function getRepairCompanyCoverInit(req, res){
  const result = {
    belongCompanyList: getBelongCompany(),
    authorizeCompanyList: getAuthorizeCompany(),
    repairCompanyList: getRepairCompany(),
    repairCompanyGroupList: getRepairCompanyGroup(),
    repairBrandList: getRepairBrand(),
  };
  return res.json(result);
}

export default {

  'GET /report/sendRepairNum': (req, res)=>{
    // const {} = req.body;

    const result = [
      {
        id: '000001',
        repairCompany: '杭州德奥',
        sendRepairNum: '183',
        contactNum: '142',
        processRate: '77.6%',
        tenMinsProcessRate: '66.6%',
        repairAcceptNum: '100',
        repairRefuseNum: '42',
        repairAcceptRate: '70.4%',
        guideNum: '120',
        guideDealRate: '65.6%',
        guideAcceptNum: '110',
        guideAcceptRate: '91.7%',
      },
    ];
    return res.json(result);
  },
  'GET /report/sendRepairNumInit': getRepairNumInitData,

  'GET /report/sendRepairSuccess': (req, res)=>{
    // const {} = req.body;

    const result = [
      {
        id: '000001',
        repairCompany: '杭州德奥',
        sendRepairNum: '183',
        arriveNum: '100',
        arriveRate: '54.6%',
        determineLossNum: '99',
        arriveDetermineLossNum: '75',
        arriveDetermineLossRate: '75.7%',
        determineLossAmount: '453218',
        arriveAmountDetermineLossRate: '40%',

      },
    ];

    return res.json(result);
  },
  'GET /report/sendRepairSuccessInit': getReportSuccessInitData,

  'GET /report/monitorRemedy': (req, res)=>{
    const result = [
      {
        id: '000001',
        sender: '王六',
        sendRepairNum: '183',
        replyNum: '123',
      },
    ];

    return res.json(result);
  },
  'GET /report/monitorRemedyInit': getMonitorRemedyInitData,

  'GET /report/clientFeedback': (req, res)=>{
    const result = [
      {
        id: '000001',
        repairCompany: '杭州德奥',
        sendRepairNum: '183',
        sendRepairFailNum: '57',
        fieldRepair: '10%',
        rapidProcessing: '20%',
        fixedRepairCompany: '5%',
        farAway: '10%',
        brandNotMatch: '15%',
        qualityNotGood: '10%',
        serviceNotGood: '20%',
        priceExpensive: '10%',
      },
    ];

    return res.json(result);
  },
  'GET /report/clientFeedbackInit': getClientFeedbackInit,

  'GET /report/sendRepairProcess': (req, res)=>{
    const result = [
      {
        id: '000001',
        repairCompany: '杭州德奥',
        sendRepairNum: '183',
        sendRepairFailNum: '57',
        notContact: '20%',
        notContactInTime: '10%',
        guideFail: '20%',
        receiveRepairFail: '20%',
        unprocessed: '30%',
      },
    ];

    return res.json(result);
  },
  'GET /report/sendRepairProcessInit': getSendRepairProcessInit,

  'GET /report/sendRepairStrategy': (req, res)=>{
    const result = [
      {
        id: '000001',
        repairCompany: '杭州德奥',
        sendRepairNum: '183',
        acceptInsuranceMatch: '50%',
        carModelMatch: '30%',
        laborRemedy: '20%',
        sendRepairSuccessNum: '120',
        successAcceptInsuranceMatch: '60%',
        successCarModelMatch: '25%',
        successLaborRemedy: '15%',
      },
    ];

    return res.json(result);
  },
  'GET /report/sendRepairStrategyInit': getRepairStrategyInit,

  'GET /report/sendOrganizationCover': (req, res)=>{
    const result = [
      {
        id: '000001',
        acceptInsuranceCompany: '杭州市支公司',
        openingNum: '325',
        cooperationNum: '116',
        brandCoverNum: '35',
        cooperationBrandCoverNum: '20',
        productionCapacityNum: '95',
        premiumCount: '135465435',
        cooperationSetSendRepair: '116',
        cooperationSendRepair: '95',
      },
    ];

    return res.json(result);
  },
  'GET /report/sendOrganizationCoverInit': getOrganizationCoverInit,

  'GET /report/repairCompanyCover': (req, res)=>{
    const result = [
      {
        id: '000001',
        acceptInsuranceCompany: '杭州市支公司',
        repairCompanyNum: '325',
        cooperationNum: '116',
        brandCoverNum: '35',
        areaCooperationNum: '20',
        productionCapacityNum: '95',
        premiumCount: '135465435',
        setSendRepair: '116',
        sendRepairNum: '95',
      },
    ];

    return res.json(result);
  },
  'GET /report/repairCompanyCoverInit': getRepairCompanyCoverInit,
}
