

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
  '/demo/reportInit': {
    residences: [{
      value: '浙江',
      label: '浙江',
      children: [{
        value: '杭州',
        label: '杭州',
        children: [{
          value: '西湖',
          label: '西湖',
        },{
          value: '下城',
          label: '下城',
        },{
          value: '上城',
          label: '上城',
        },{
          value: '拱墅',
          label: '拱墅',
        }],
      }],
    }, {
      value: '江苏',
      label: '江苏',
      children: [{
        value: '南京',
        label: '南京',
        children: [{
          value: '中华门',
          label: '中华门',
        }],
      }],
    }],
    reasons: [
      {
        value: '碰撞',
        label: '碰撞',
        children: [
          {
            value: '追尾',
            label: '追尾',
          }, {
            value: '停放被撞',
            label: '停放被撞',
          }, {
            value: '碰撞行人',
            label: '碰撞行人',
          }, {
            value: '碰撞动物',
            label: '碰撞动物',
          }
        ],
      }, {
        value: '外物倒塌、空坠',
        label: '外物倒塌、空坠',
        children: [
          {
            value: '外物倒塌',
            label: '外物倒塌',
          },{
            value: '空中坠物',
            label: '空中坠物',
          }
        ]
      }, {
        value: '油污',
        label: '油污',
      },{
        value: '其他',
        label: '其他',
      },
    ],
  },


}
