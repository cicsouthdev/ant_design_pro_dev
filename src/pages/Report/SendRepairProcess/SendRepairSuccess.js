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
const { RangePicker } = DatePicker;

@connect(({ sendRepairProcess, loading }) => ({
  sendRepairProcess,
  loading: loading.models.sendRepairProcess,
}))
@Form.create()
class SendRepairSuccess extends PureComponent {
  state = {};

  columns = [
    {
      title: '送修厂',
      dataIndex: 'repairCompany',
    },
    {
      title: '送修件数',
      dataIndex: 'sendRepairNum',
    },
    {
      title: '到店件数',
      dataIndex: 'arriveNum',
    },
    {
      title: '到店率',
      dataIndex: 'arriveRate',
    },
    {
      title: '定损件数',
      dataIndex: 'determineLossNum',
    },
    {
      title: '到店定损件数',
      dataIndex: 'arriveDetermineLossNum',
    },
    {
      title: '到店定损件率',
      dataIndex: 'arriveDetermineLossRate',
    },
    {
      title: '定损金额',
      dataIndex: 'determineLossAmount',
    },
    {
      title: '到店金额定损率',
      dataIndex: 'arriveAmountDetermineLossRate',
    },
    {
      title: '清单',
      render: data=>(
        <Fragment>
          <a onClick={()=>this.handleExport(data.id)}>导出</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'sendRepairProcess/initSendRepairSuccess',
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
        type: 'sendRepairProcess/fetchSendRepairSuccess',
        payload: {...fieldsValue},
      });
    });
  };

  renderForm = ()=>{
    const { form:{ getFieldDecorator}, sendRepairProcess:{sendRepairSuccessInitData} } = this.props;

    const {
      belongCompanyList, surveyPossessionList,
      repairCompanyList, policyBelongList, sendRepairBrand
    } = sendRepairSuccessInitData||{};

    return <Form onSubmit={this.handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="送修归属">
            {getFieldDecorator('belongCompany')(
              <Select placeholder='请选择' >
                {belongCompanyList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
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
          <FormItem label="送修策略">
            {getFieldDecorator('sendRepairStrategy')(
              <Select placeholder='请选择'>
                <Select.Option key='0'>就近原则</Select.Option>
                <Select.Option key='1'>承保原则</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="查勘属地">
            {getFieldDecorator('surveyPossession')(
              <Select placeholder='请选择'>
                {surveyPossessionList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="报案日期">
            {getFieldDecorator('reportDate')(<RangePicker />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="送修厂">
            {getFieldDecorator('repairCompany')(
              <Select placeholder="请输入">
                {repairCompanyList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="保单归属">
            {getFieldDecorator('policyBelong')(
              <Select placeholder='请选择'>
                {policyBelongList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="送修品牌">
            {getFieldDecorator('sendRepairBrand')(
              <Select placeholder='请选择'>
                {sendRepairBrand.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="送修标的">
            {getFieldDecorator('sendSubject')(
              <Radio.Group>
                <Radio value="1">
                  本车
                </Radio>
                <Radio value="2">
                  三者
                </Radio>
              </Radio.Group>
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

    const { sendRepairProcess:{sendRepairSuccessList=[], sendRepairSuccessInitData={}} } = this.props;

    return <PageHeaderWrapper title="送修成功统计表">
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
            dataSource={sendRepairSuccessList}
            pagination={false}
          />

        </div>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default SendRepairSuccess;
