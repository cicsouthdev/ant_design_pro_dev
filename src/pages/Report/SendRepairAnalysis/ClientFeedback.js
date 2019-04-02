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
class ClientFeedback extends PureComponent {
  state = {};

  columns = [
    {
      title: '送修厂',
      dataIndex: 'repairCompany',
    },
    {
      title: '送修数',
      dataIndex: 'sendRepairNum',
    },
    {
      title: '失败件数',
      dataIndex: 'sendRepairFailNum',
    },
    {
      title: '外地出险外地修理',
      dataIndex: 'fieldRepair',
    },
    {
      title: '已在快处中心处理',
      dataIndex: 'rapidProcessing',
    },
    {
      title: '有固定修理厂',
      dataIndex: 'fixedRepairCompany',
    },
    {
      title: '推荐厂太远',
      dataIndex: 'farAway',
    },
    {
      title: '修理品牌不符',
      dataIndex: 'brandNotMatch',
    },
    {
      title: '推荐厂维修质量不佳',
      dataIndex: 'qualityNotGood',
    },
    {
      title: '推荐厂服务不佳',
      dataIndex: 'serviceNotGood',
    },
    {
      title: '推荐厂价格高',
      dataIndex: 'priceExpensive',
    },
  ];

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'sendRepairAnalysis/initClientFeedback',
      payload: {},
    });
  }

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      dispatch({
        type: 'sendRepairAnalysis/fetchClientFeedback',
        payload: {...fieldsValue},
      });
    });
  };

  renderForm = ()=>{
    const { form:{ getFieldDecorator}, sendRepairAnalysis:{clientFeedbackInitData} } = this.props;
    const { belongCompanyList, authorizeCompanyList, repairCompanyList, repairCompanyGroupList } = clientFeedbackInitData;


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

    const { sendRepairAnalysis:{ clientFeedbackList } } = this.props;

    return <PageHeaderWrapper title="客户反馈原因分析">
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
            dataSource={clientFeedbackList}
          />

        </div>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default ClientFeedback;
