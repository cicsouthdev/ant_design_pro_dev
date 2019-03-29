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
  AutoComplete, Table, Transfer,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './RepairCompanyGroup.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const {
    modalVisible, form, handleAdd, handleModalVisible,
    defaultValue: {id, groupCode, groupName, generalManagerCode, generalManagerName,
      generalManagerPhone, belongCompanyCode, belongCompany, }
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
    handleModalVisible();
  };

  return (

    <Modal
      destroyOnClose
      title="新增维修单位集团"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={cancelHandle }
    >
      <FormItem style={{display: 'none'}} label="id">
        {form.getFieldDecorator('id', {initialValue: id})(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="集团代码">
        {form.getFieldDecorator('groupCode', {
          rules: [{ required: true }],
          initialValue: groupCode
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="集团名称">
        {form.getFieldDecorator('groupName', {
          rules: [{ required: true }],
          initialValue: groupName,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="总经理代码">
        {form.getFieldDecorator('generalManagerCode', {
          rules: [{ required: true }],
          initialValue: generalManagerCode
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="总经理姓名">
        {form.getFieldDecorator('generalManagerName', {
          rules: [{ required: true }],
          initialValue: generalManagerName,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="总经理手机">
        {form.getFieldDecorator('generalManagerPhone', {
          rules: [{ required: true }],
          initialValue: generalManagerPhone,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="归属公司代码">
        {form.getFieldDecorator('belongCompanyCode', {
          rules: [{ required: true }],
          initialValue: belongCompanyCode,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="归属公司">
        {form.getFieldDecorator('belongCompany', {
          rules: [{ required: true }],
          initialValue: belongCompany,
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ repairCompanyGroup, loading }) => ({
  repairCompanyGroup,
  loading: loading.models.repairCompanyGroup,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    settingModalVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    updateValue: {},
    childrenSettingValue: [],
    targetKeys: [],
  };

  columns = [
    {
      title: '集团代码',
      dataIndex: 'groupCode',
    },
    {
      title: '集团名称',
      dataIndex: 'groupName',
    },
    {
      title: '总经理代码',
      dataIndex: 'generalManagerCode',
    },
    {
      title: '总经理姓名',
      dataIndex: 'generalManagerName',
    },
    {
      title: '总经理手机',
      dataIndex: 'generalManagerPhone',
    },
    {
      title: '归属公司代码',
      dataIndex: 'belongCompanyCode',
    },
    {
      title: '归属公司',
      dataIndex: 'belongCompany'
    },
    {
      title: '操作',
      render: (data) => (
        <Fragment>
          {data.isParent?<a onClick={()=>this.handleSettingChildren(data)}>设置下属单位</a>:null}
          {data.isParent?<Divider type="vertical" />:null}
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
      type: 'repairCompanyGroup/fetch',
    });
    dispatch({
      type: 'repairCompanyGroup/unSelectedCompanyFetch',
    });
  }

  handleSettingChildren = ({children=[]})=>{
    const { repairCompanyGroup:{ unSelectedCompany } } = this.props;
    let allChildren = unSelectedCompany;
    let targetKeys = [];
    children.forEach(d=>{
      allChildren.push({id:d.id, name:d.name});
      targetKeys.push(d.id);
    });
    this.setState({
      childrenSettingValue: allChildren,
      targetKeys,
      settingModalVisible: true,
    })
  };

  handleTransferChange = (targetKeys)=>{
    this.setState({targetKeys});
  };

  handleSettingOk = ()=>{
    // TODO 调后台保存，重新加载表格数据，重新加载unSelectedCompany数据，然后关闭modal
    // this.setState({});
  };

  handleSettingCancel = ()=>{
    this.setState({settingModalVisible: false});
  };

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
      type: 'repairCompanyGroup/fetch',
      payload: params,
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
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
        type: 'repairCompanyGroup/fetch',
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
      type: 'repairCompanyGroup/'+fields.id?'update':'add',
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
      type: 'repairCompanyGroup/searchBrand',
      payload: {
        query: value,
      }
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
      repairCompanyGroup: { brandAutoCompleteData=[] },
    } = this.props;

    const Option = AutoComplete.Option;
    const children = brandAutoCompleteData.map(d=><Option key={d.code}>{`${d.name} (${d.number})`}</Option>);

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="归属公司">
              {getFieldDecorator('belongCompany')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="集团代码">
              {getFieldDecorator('groupCode')(
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
      repairCompanyGroup: {repairCompanyGroupList},
    } = this.props;
    const { selectedRows, modalVisible, updateValue, settingModalVisible, childrenSettingValue, targetKeys } = this.state;
    const { list = [], pagination } = repairCompanyGroupList;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="维修单位集团设置">
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
            <Table
              rowKey='id'
              size="middle"
              dataSource={list}
              pagination={paginationProps}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
              childrenColumnName='aaa'
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} defaultValue={updateValue}/>

        <Modal
          destroyOnClose
          title="设置集团子单位"
          visible={settingModalVisible}
          onOk={this.handleSettingOk}
          onCancel={this.handleSettingCancel}
        >
          <Transfer
            rowKey={d=>d.id}
            listStyle={{
              width: 200,
              height: 300,
            }}
            showSearch
            dataSource={childrenSettingValue}
            targetKeys={targetKeys}
            render={item => item.name}
            onChange={this.handleTransferChange}
          />
        </Modal>

      </PageHeaderWrapper>
    );
  }
}

export default TableList;
