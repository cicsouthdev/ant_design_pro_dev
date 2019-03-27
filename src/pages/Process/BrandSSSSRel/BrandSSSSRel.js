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
  AutoComplete,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './BrandSSSSRel.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const {
    modalVisible, form, handleAdd, handleModalVisible,
    defaultValue: {id, carModel, carModelName, brandName, remark,}
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
      title="新增车型与品牌的关系"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={cancelHandle }
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} style={{display: 'none'}} label="id">
        {form.getFieldDecorator('id', {initialValue: id})(<Input />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="车型代码">
        {form.getFieldDecorator('carModel', {
          rules: [{ required: true }],
          initialValue: carModel
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="车型名称">
        {form.getFieldDecorator('carModelName', {
          rules: [{ required: true }],
          initialValue: carModelName,
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="品牌名称">
        {form.getFieldDecorator('brandName', {
          rules: [{ required: true }],
          initialValue: brandName
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
        {form.getFieldDecorator('remark', {
          rules: [{ required: true }],
          initialValue: remark,
        })(<Input placeholder="请输入" />)}
      </FormItem>

    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ brandSSSSRel, loading }) => ({
  brandSSSSRel,
  loading: loading.models.brandSSSSRel,
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
      title: '车型代码',
      dataIndex: 'carModel',
    },
    {
      title: '车型名称',
      dataIndex: 'carModelName',
    },
    {
      title: '品牌名称',
      dataIndex: 'brandName',
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
      type: 'brandSSSSRel/fetch',
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
      type: 'brandSSSSRel/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'brandSSSSRel/fetch',
      payload: {},
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
        type: 'brandSSSSRel/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.handleModalVisible(flag);
    this.setState({updateValue: {...record}})
  };

  handleAdd = fields => {
    const { dispatch } = this.props;

    dispatch({
      type: 'brandSSSSRel/'+fields.id?'update':'add',
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
      type: 'brandSSSSRel/searchBrand',
      payload: {
        query: value,
      }
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
      brandSSSSRel: { brandAutoCompleteData=[] },
    } = this.props;

    const Option = AutoComplete.Option;
    const children = brandAutoCompleteData.map(d=><Option key={d.code}>{`${d.name} (${d.number})`}</Option>);

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="车型代码">
              {getFieldDecorator('carModel')(<Input placeholder="请输入(前N位)" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="品牌名称">
              {getFieldDecorator('brandName')(
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
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      brandSSSSRel: {brandSSSSRelList},
    } = this.props;
    const { selectedRows, modalVisible, updateValue } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="品牌与维修单位的关系">
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
              selectedRows={selectedRows}
              data={brandSSSSRelList}
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
