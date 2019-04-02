import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
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
class SendRepairStrategy extends PureComponent {
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
      title: '承保匹配',
      dataIndex: 'acceptInsuranceMatch',
    },
    {
      title: '车型匹配',
      dataIndex: 'carModelMatch',
    },
    {
      title: '人工补救',
      dataIndex: 'laborRemedy',
    },
    {
      title: '送修成功数',
      dataIndex: 'sendRepairSuccessNum',
    },
    {
      title: '送修成功承保匹配',
      dataIndex: 'successAcceptInsuranceMatch',
    },
    {
      title: '送修成功车型匹配',
      dataIndex: 'successCarModelMatch',
    },
    {
      title: '送修成功人工补救',
      dataIndex: 'successLaborRemedy',
    },
  ];

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'sendRepairAnalysis/initSendRepairStrategy',
      payload: {},
    });
  }

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      dispatch({
        type: 'sendRepairAnalysis/fetchSendRepairStrategy',
        payload: {...fieldsValue},
      });
    });
  };

  renderForm = ()=>{
    const { form:{ getFieldDecorator}, sendRepairAnalysis:{sendRepairStrategyInitData} } = this.props;
    const { belongCompanyList, authorizeCompanyList, repairCompanyList } = sendRepairStrategyInitData;


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

    const { sendRepairAnalysis:{ sendRepairStrategyList } } = this.props;

    return <PageHeaderWrapper title="送修策略统计">
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
            dataSource={sendRepairStrategyList}
          />

        </div>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default SendRepairStrategy;
