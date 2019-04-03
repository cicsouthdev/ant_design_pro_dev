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
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '机构出险率',
      dataIndex: 'riskRate',
    },
    {
      title: '有车损报案件数',
      dataIndex: 'carLossReportNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '车损定损金额',
      dataIndex: 'carLossNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '车损定损金额',
      dataIndex: 'carLossAmount',
    },
    {
      title: '规则理论产生送修数量',
      dataIndex: 'theoreticalSendRepairNum',
    },
    {
      title: '实际送修件数',
      dataIndex: 'sendRepairNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '送修回复成功件数',
      dataIndex: 'successReplyNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '送修成功匹配件数',
      dataIndex: 'successMatchNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '送修成功匹配金额',
      dataIndex: 'successMatchAmount',
    },
    {
      title: '非送修厂定损',
      dataIndex: 'notRepairCompanyAmount',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
  ];

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'sendRepairAnalysis/initResourceUtilizationRate',
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
        type: 'sendRepairAnalysis/fetchResourceUtilizationRate',
        payload: {...fieldsValue},
      });
    });
  };

  renderForm = ()=>{
    const { form:{ getFieldDecorator}, sendRepairAnalysis:{resourceUtilizationRateInitData} } = this.props;
    const { belongCompanyList, authorizeCompanyList, repairCompanyList, repairCompanyGroupList, repairBrandList } = resourceUtilizationRateInitData;

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
          <FormItem label="车商集团">
            {getFieldDecorator('repairCompanyGroup')(
              <Select placeholder='请选择' >
                {repairCompanyGroupList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="查询日期">
            {getFieldDecorator('sendRepairDate')(
              <RangePicker />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="送修品牌">
            {getFieldDecorator('sendRepairBrand')(
              <Select placeholder='请选择'>
                {repairBrandList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={0} />
        <Col md={8} sm={0} />
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

    const { sendRepairAnalysis:{ resourceUtilizationRateList } } = this.props;

    return <PageHeaderWrapper title="维修资源利用率分析">
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
            dataSource={resourceUtilizationRateList}
          />

        </div>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default RepairCompanyCover;
