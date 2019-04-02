import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Modal,
  message,
  Divider,
  Radio,
  Table,
  DatePicker,
  Select,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../report.less';

const FormItem = Form.Item;
const {RangePicker} = DatePicker;

@connect(({ sendRepairAnalysis, loading }) => ({
  sendRepairAnalysis,
  loading: loading.models.sendRepairAnalysis,
}))
@Form.create()
class RepairCompanyCover extends PureComponent {
  state = {};

  columns = [
    {
      title: '承保机构',
      dataIndex: 'acceptInsuranceCompany',
    },
    {
      title: '综合修理厂数量',
      dataIndex: 'repairCompanyNum',
    },
    {
      title: '合作综修厂数',
      dataIndex: 'cooperationNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '其中专修厂覆盖品牌',
      dataIndex: 'brandCoverNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '区域内合作专修厂',
      dataIndex: 'areaCooperationNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '合作综修厂有产能数',
      dataIndex: 'productionCapacityNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '综修厂保费累计',
      dataIndex: 'premiumCount',
    },
    {
      title: '综修厂设置送修家数',
      dataIndex: 'setSendRepair',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '综修厂实际送修家数',
      dataIndex: 'sendRepairNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
  ];

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'sendRepairAnalysis/initRepairCompanyCover',
      payload: {},
    });
  }

  handleExport = id=>{

  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      dispatch({
        type: 'sendRepairAnalysis/fetchRepairCompanyCover',
        payload: {...fieldsValue},
      });
    });
  };

  renderForm = ()=>{
    const { form:{ getFieldDecorator}, sendRepairAnalysis:{repairCompanyCoverInitData} } = this.props;
    const { belongCompanyList, authorizeCompanyList, repairCompanyList, repairCompanyGroupList, repairBrandList } = repairCompanyCoverInitData;

    return <Form onSubmit={this.handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="归属机构">
            {getFieldDecorator('belongCompany')(
              <Select placeholder='请选择' >
                {belongCompanyList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="授权公司">
            {getFieldDecorator('authorizeCompany')(
              <Select placeholder='请选择' >
                {authorizeCompanyList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="送修厂">
            {getFieldDecorator('repairCompany')(
              <Select placeholder='请选择' >
                {repairCompanyList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="反馈方">
            {getFieldDecorator('feedbackSide')(
              <Select placeholder='请选择' >
                <Select.Option key='1'>查勘员</Select.Option>
                <Select.Option key='2'>接修员</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="送修日期">
            {getFieldDecorator('sendRepairDate')(
              <RangePicker />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="车商集团">
            {getFieldDecorator('repairCompanyGroup')(
              <Select placeholder='请选择' >
                {repairCompanyGroupList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="送修品牌">
            {getFieldDecorator('sendRepairBrand')(
              <Select placeholder='请选择'>
                {repairBrandList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24} />
        <Col md={8} sm={24}>
          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </span>
        </Col>
      </Row>
    </Form>;
  };

  render(){

    const { sendRepairAnalysis:{ repairCompanyCoverList } } = this.props;

    return <PageHeaderWrapper title="综合修理厂覆盖度分析">
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            {/*<Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新增
            </Button>*/}
          </div>

          <Table
            rowKey='id'
            size="middle"
            columns={this.columns}
            pagination={false}
            dataSource={repairCompanyCoverList}
          />

        </div>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default RepairCompanyCover;
