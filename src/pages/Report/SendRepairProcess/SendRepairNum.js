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
class SendRepairNum extends PureComponent {
  state = {};

  columns = [
    {
      title: '送修厂',
      dataIndex: 'repairCompany',
      fixed: 'left',
      width: 100,
    },
    {
      title: '送修件数',
      dataIndex: 'sendRepairNum',
    },
    {
      title: '接修员接洽数',
      dataIndex: 'contactNum',
    },
    {
      title: '接修处理率',
      dataIndex: 'processRate',
    },
    {
      title: '接修10分钟处理率',
      dataIndex: 'tenMinsProcessRate',
    },
    {
      title: '接修同意数',
      dataIndex: 'repairAcceptNum',
    },
    {
      title: '接修拒绝数',
      dataIndex: 'repairRefuseNum',
    },
    {
      title: '接修成功率',
      dataIndex: 'repairAcceptRate',
    },
    {
      title: '查勘引导数',
      dataIndex: 'guideNum',
    },
    {
      title: '引导处理率',
      dataIndex: 'guideDealRate',
    },
    {
      title: '引导同意数',
      dataIndex: 'guideAcceptNum',
    },
    {
      title: '引导成功率',
      dataIndex: 'guideAcceptRate',
    },
    {
      title: '清单',
      render: data=>(
        <Fragment>
          <a onClick={()=>this.handleExport(data.id)}>导出</a>
        </Fragment>
      ),
    }
  ];

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'sendRepairProcess/initSendRepairNum',
      payload: {},
    });
  }

  handleExport = id =>{

  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      dispatch({
        type: 'sendRepairProcess/fetchSendRepairNum',
        payload: {...fieldsValue},
      });
    });
  };

  renderForm = ()=>{
    const { form:{ getFieldDecorator}, sendRepairProcess:{sendRepairNumInitData} } = this.props;

    const {
      belongCompanyList, surveyPossessionList,
      repairCompanyList, policyBelongList, sendRepairBrand
    } = sendRepairNumInitData||{};

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

    const { sendRepairProcess:{sendRepairNumList=[]} } = this.props;

    return <PageHeaderWrapper title="送修量统计表">
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
            scroll={{ x: 1400 }}
            columns={this.columns}
            dataSource={sendRepairNumList}
            pagination={false}
          />

        </div>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default SendRepairNum;
