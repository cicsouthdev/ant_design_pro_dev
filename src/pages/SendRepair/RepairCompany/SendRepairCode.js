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

import styles from './RepairCompany.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const {
    modalVisible, form, handleAdd, handleModalVisible,
    defaultValue: {id, surveyPossession, sendRepairBrand, repairCompany, sendRepairWeight,
      weightProportion, sendRepairProportion, nearbyCoefficient, farAwayCoefficient, nearbyDistance,
      farAwayDistance, nearbyKeyWord, farAwayKeyWord, }
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
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="查勘属地">
        {form.getFieldDecorator('surveyPossession', {
          rules: [{ required: true }],
          initialValue: surveyPossession
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="送修品牌">
        {form.getFieldDecorator('sendRepairBrand', {
          rules: [{ required: true }],
          initialValue: sendRepairBrand,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="维修单位">
        {form.getFieldDecorator('repairCompany', {
          rules: [{ required: true }],
          initialValue: repairCompany
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="送修权重">
        {form.getFieldDecorator('sendRepairWeight', {
          rules: [{ required: true }],
          initialValue: sendRepairWeight,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="权重占比">
        {form.getFieldDecorator('weightProportion', {
          rules: [{ required: true }],
          initialValue: weightProportion,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="送修占比">
        {form.getFieldDecorator('sendRepairProportion', {
          rules: [{ required: true }],
          initialValue: sendRepairProportion,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="就近系数">
        {form.getFieldDecorator('nearbyCoefficient', {
          rules: [{ required: true }],
          initialValue: nearbyCoefficient,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="远离系数">
        {form.getFieldDecorator('farAwayCoefficient', {
          rules: [{ required: true }],
          initialValue: farAwayCoefficient,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="就近公里">
        {form.getFieldDecorator('nearbyDistance', {
          rules: [{ required: true }],
          initialValue: nearbyDistance,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="远离公里">
        {form.getFieldDecorator('farAwayDistance', {
          rules: [{ required: true }],
          initialValue: farAwayDistance,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="就近地名关键字">
        {form.getFieldDecorator('nearbyKeyWord', {
          rules: [{ required: true }],
          initialValue: nearbyKeyWord,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="远离地名关键字">
        {form.getFieldDecorator('farAwayKeyWord', {
          rules: [{ required: true }],
          initialValue: farAwayKeyWord,
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
      title: '查勘属地',
      dataIndex: 'surveyPossession',
      fixed: 'left',
      width: 100,
    },
    {
      title: '送修品牌',
      dataIndex: 'sendRepairBrand',
      fixed: 'left',
      width: 100,
    },
    {
      title: '维修单位',
      dataIndex: 'repairCompany',
      fixed: 'left',
      width: 100,
    },
    {
      title: '送修权重',
      dataIndex: 'sendRepairWeight',
    },
    {
      title: '权重占比',
      dataIndex: 'weightProportion',
    },
    {
      title: '送修占比',
      dataIndex: 'sendRepairProportion',
    },
    {
      title: '就近系数',
      dataIndex: 'nearbyCoefficient',
    },
    {
      title: '远离系数',
      dataIndex: 'farAwayCoefficient',
    },
    {
      title: '就近公里',
      dataIndex: 'nearbyDistance',
    },
    {
      title: '远离公里',
      dataIndex: 'farAwayDistance',
    },
    {
      title: '就近地名关键字',
      dataIndex: 'nearbyKeyWord',
    },
    {
      title: '远离地名关键字',
      dataIndex: 'farAwayKeyWord',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 100,
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

  // handleFormReset = () => {
  //   const { form, dispatch } = this.props;
  //   form.resetFields();
  //   this.setState({
  //     formValues: {},
  //   });
  //   dispatch({
  //     type: 'brandSSSSRel/fetch',
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
        type: 'brandSSSSRel/fetch',
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
            <FormItem label="归属公司">
              {getFieldDecorator('company')(<Input placeholder="请输入(前N位)" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="查勘属地">
              {getFieldDecorator('brandName')(
                <AutoComplete onSearch={this.handleAutoSearch} dataSource={children}>
                </AutoComplete>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="送修品牌">
              {getFieldDecorator('brandName')(
                <AutoComplete onSearch={this.handleAutoSearch} dataSource={children}>
                </AutoComplete>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="维修单位">
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
              scroll={{ x: 1400 }}
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
