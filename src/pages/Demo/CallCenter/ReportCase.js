import React, { Fragment, PureComponent } from 'react';
import { Button, Card, Form, Col, DatePicker, Icon, Input, InputNumber, Row, Select, Badge, Divider, Table } from 'antd';
import { connect } from 'dva';
import tableListStyles from '../../List/TableList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from '../../List/TableList';
import styles from './ReportCase.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ report, loading }) => ({
  report,
  loading: loading.models.report,
}))
@Form.create()
class ReportCase extends PureComponent{

  state = {
    expandForm: false,
    selectedRows: [],
  };

  columns = [
    {
      title: '保单类型',
      dataIndex: 'policyType',
    },
    {
      title: '保单号',
      dataIndex: 'policyNo',
    },
    {
      title: '被保险人',
      dataIndex: 'insured',
    },
    {
      title: '车牌号',
      dataIndex: 'carNo',
    },
    /*{
      title: '发动机号',
      dataIndex: 'engineNo',
    },
    {
      title: '车架号',
      dataIndex: 'vinNo',
    }*/,
    {
      title: '厂牌型号',
      dataIndex: 'brand',
    },
    {
      title: '保单起期',
      dataIndex: 'policyStartTime',
    },
    {
      title: '保单止期',
      dataIndex: 'policyStopTime',
    },
    {
      title: '保单状态',
      dataIndex: 'policyStatus',
    },
  ];

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'report/fetch',
        payload: values,
      });
    });
  };

  handleClickRow = record =>{
    return {
      onClick: e=>{alert('打开保单抄单信息model');}
    }
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="车牌号">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="保单号">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={tableListStyles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="车牌号">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="保单号">
              {getFieldDecorator('code')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="证件号">
              {getFieldDecorator('number')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="发动机号">
              {getFieldDecorator('number1')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="车架号">
              {getFieldDecorator('number3')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="被保险人">
              {getFieldDecorator('number2')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="承保公司">
              {getFieldDecorator('company')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">浙江分公司</Option>
                  <Option value="1">江苏分公司</Option>
                  <Option value="2">北京分公司</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="承保公司">
              {getFieldDecorator('company2')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">杭州中支公司</Option>
                  <Option value="1">台州中支公司</Option>
                  <Option value="2">温州中支公司</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={tableListStyles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render(){
    const {
      report: { data },
      loading,
    } = this.props;

    return (
      <PageHeaderWrapper title="报案">
        <Card bordered={false}>
          <div className={styles.title}>车险保单信息查询</div>
          <div className={tableListStyles.tableList}>
            <div className={tableListStyles.tableListForm}>{this.renderForm()}</div>
            <Table
              columns={this.columns}
              dataSource={data.list}
              loading={loading}
              onRow={this.handleClickRow}
              pagination={false}
              style={{ marginBottom: 6 }}
            />
            <div className={styles.warningMsg}><span>风险提示</span><span>{data.warningMsg}</span></div>
          </div>

          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>案件受理</div>

          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>信息提醒</div>

          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>调度信息</div>

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ReportCase;
