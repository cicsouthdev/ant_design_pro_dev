

export default {
  '/demo/report': (req, res)=>{
    const { carNo="浙A12345" } = req.query||{};
    res.send({
      list: [
        {
          policyType: '商业险',
          policyNo: '0118339732000360004614',
          insured: '段光华',
          carNo,
          engineNo: '27682630574193',
          vinNo: 'WDCCB6DE6HE018124',
          brand: '梅赛德斯-奔驰WDCCB6DE',
          policyStartTime: '2018-07-03 00:00:00',
          policyStopTime: '2019-07-02 23:59:59',
          policyStatus: '有效',
        },
        {
          policyType: '交强险',
          policyNo: '0118339732000332004623',
          insured: '段光华',
          carNo,
          engineNo: '27682630574193',
          vinNo: 'WDCCB6DE6HE018124',
          brand: '梅赛德斯-奔驰WDCCB6DE',
          policyStartTime: '2018-07-02 15:00:00',
          policyStopTime: '2019-07-02 14:59:59',
          policyStatus: '有效',
        },
      ],
      warningMsg: '本车做为主车/三者车历史出险1次',
    });
  },
  '/demo/reportInit': [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }],


}
