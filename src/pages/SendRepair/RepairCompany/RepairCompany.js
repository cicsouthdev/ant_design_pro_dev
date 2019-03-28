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
  AutoComplete, Switch,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './RepairCompany.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const {
    modalVisible, form, handleAdd, handleModalVisible,
    defaultValue: {id, companyCode, companyName, repairCompanyCode, companyAddress, longitude, latitude, belongCompany, giveUo, valid,  }
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
      title="新增维修单位"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={cancelHandle }
    >
      <FormItem style={{display: 'none'}} label="id">
        {form.getFieldDecorator('id', {initialValue: id})(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="单位代码">
        {form.getFieldDecorator('companyCode', {
          rules: [{ required: true }],
          initialValue: companyCode
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="单位名称">
        {form.getFieldDecorator('companyName', {
          rules: [{ required: true }],
          initialValue: companyName,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="修理厂代码">
        {form.getFieldDecorator('repairCompanyCode', {
          rules: [{ required: true }],
          initialValue: repairCompanyCode
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="归属公司">
        {form.getFieldDecorator('belongCompany', {
          rules: [{ required: true }],
          initialValue: belongCompany,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="地址">
        {form.getFieldDecorator('companyAddress', {
          rules: [{ required: true }],
          initialValue: companyAddress,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="经度">
        {form.getFieldDecorator('longitude', {
          rules: [{ required: true }],
          initialValue: longitude,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="纬度">
        {form.getFieldDecorator('latitude', {
          rules: [{ required: true }],
          initialValue: latitude,
        })(<Input placeholder="请输入" />)}
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
class TableList extends PureComponent {
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
      title: '单位代码',
      dataIndex: 'companyCode',
    },
    {
      title: '单位名称',
      dataIndex: 'companyName',
    },
    {
      title: '修理厂代码',
      dataIndex: 'repairCompanyCode',
    },
    {
      title: '地址',
      dataIndex: 'companyAddress',
    },
    {
      title: '经度',
      dataIndex: 'longitude',
    },
    {
      title: '纬度',
      dataIndex: 'latitude',
    },
    {
      title: '归属公司',
      dataIndex: 'belongCompany',
    },
    {
      title: '可放弃',
      dataIndex: 'giveUp',
      render: (d)=><Switch defaultChecked={d==="1"} />
    },
    {
      title: '有效',
      dataIndex: 'valid',
      render: (d)=><Switch defaultChecked={d==="1"} />
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
      type: 'repairCompany/fetch',
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
      type: 'repairCompany/fetch',
      payload: params,
    });
  };

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
        type: 'repairCompany/fetch',
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
      type: 'repairCompany/searchBrand',
      payload: {
        query: value,
      }
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
      repairCompany: { brandAutoCompleteData=[] },
    } = this.props;

    const Option = AutoComplete.Option;
    const children = brandAutoCompleteData.map(d=><Option key={d.code}>{`${d.name} (${d.number})`}</Option>);

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="归属公司">
              {getFieldDecorator('company')(<Input placeholder="请输入(前N位)" />)}
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
      repairCompany: {repairCompanyList},
    } = this.props;
    const { selectedRows, modalVisible, updateValue } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="维修单位设置">
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
              royKey='id'
              size="middle"
              selectedRows={selectedRows}
              data={repairCompanyList}
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

export default TableList;
