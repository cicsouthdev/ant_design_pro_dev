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
  AutoComplete, Select, DatePicker,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './RepairCompany.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const {
    modalVisible, form, handleAdd, handleModalVisible,
    defaultValue: {id, sendRepairCode, sendRepairCodeType, startDate, endDate, companyName }
  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  const cancelHandle = () =>{
    form.resetFields();
    handleModalVisible()
  };

  return (

    <Modal
      destroyOnClose
      title="新增送修码"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={cancelHandle }
    >
      <FormItem style={{display: 'none'}} label="id">
        {form.getFieldDecorator('id', {initialValue: id})(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="维修单位">
        {form.getFieldDecorator('companyName', {
          rules: [{ required: true }],
          initialValue: companyName
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="送修码类型">
        {form.getFieldDecorator('sendRepairCodeType', {
          rules: [{ required: true }],
          initialValue: sendRepairCodeType,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="送修码">
        {form.getFieldDecorator('sendRepairCode', {
          rules: [{ required: true }],
          initialValue: sendRepairCode
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="起保日期开始">
        {form.getFieldDecorator('startDate', {
          rules: [{ required: true }],
          initialValue: moment(startDate, 'YYYY-MM-DD'),
        })(<DatePicker style={{width: '100%'}} />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="起保日期结束">
        {form.getFieldDecorator('endDate', {
          rules: [{ required: true }],
          initialValue: moment(endDate, 'YYYY-MM-DD'),
        })(<DatePicker style={{width: '100%'}} />)}
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ repairCompany, loading }) => ({
  repairCompany,
  loading: loading.models.repairCompany,
}))
@Form.create()
class SendRepairCode extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    updateValue: {},
  };

  columns = [
    {
      title: '维修单位',
      dataIndex: 'companyName',
    },
    {
      title: '送修码类型',
      dataIndex: 'sendRepairCodeType',
    },
    {
      title: '送修码',
      dataIndex: 'sendRepairCode',
    },
    {
      title: '起保日期开始',
      dataIndex: 'startDate',
    },
    {
      title: '起保日期结束',
      dataIndex: 'endDate',
    },
    {
      title: '操作',
      render: (data) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, data)}>修改</a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'repairCompany/fetchSendRepairCode',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'repairCompany/fetchSendRepairCode',
      payload: params,
    });
  };

  // handleFormReset = () => {
  //   const { form, dispatch } = this.props;
  //   form.resetFields();
  //   this.setState({
  //     formValues: {},
  //   });
  //   dispatch({
  //     type: 'repairCompany/fetchSendRepairCode',
  //     payload: {},
  //   });
  // };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'repairCompany/fetchSendRepairCode',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
      updateValue: {}
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.handleModalVisible(flag);
    this.setState({updateValue: {...record}})
  };

  handleAdd = fields => {
    const { dispatch } = this.props;

    dispatch({
      type: 'repairCompany/'+fields.id?'update':'add',
      payload: {
        ...fields,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleAutoSearch = (value)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'repairCompany/searchRepairCompany',
      payload: {
        query: value,
      }
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
      repairCompany: { autoSearchCompanyList=[] },
    } = this.props;

    const Option = AutoComplete.Option;
    const children = autoSearchCompanyList.map(d=><Option key={d.code}>{d.name}</Option>);

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="归属公司">
              {getFieldDecorator('belongCompany')(
                <Input />
              )}
                {/*<Select ></Select>*/}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="维修单位">
              {getFieldDecorator('repairCompany')(
                <AutoComplete onSearch={this.handleAutoSearch} dataSource={children}>
                </AutoComplete>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="送修码类型">
              {getFieldDecorator('sendRepairCodeType')(
                <Select>
                  <Select.Option value='all'>全部</Select.Option>
                  <Select.Option value='recommendCode'>推荐送修码</Select.Option>
                  <Select.Option value='channelCode'>渠道码</Select.Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="送修码">
              {getFieldDecorator('sendRepairCode')(
                <Input />
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
      </Form>
    );
  }

  render() {
    const {
      repairCompany: {sendRepairCodeList},
    } = this.props;
    const { selectedRows, modalVisible, updateValue } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="维修单位送修码设置">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新增
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>删除</Button>
                </span>
              )}
            </div>
            <StandardTable
              size="middle"
              selectedRows={selectedRows}
              data={sendRepairCodeList}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} defaultValue={updateValue}/>
      </PageHeaderWrapper>
    );
  }
}

export default SendRepairCode;
