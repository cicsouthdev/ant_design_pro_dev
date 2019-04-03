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
  Switch,
  Select,
  Icon,
  TreeSelect, Table, Slider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './RepairCompany.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ repairCompany, loading }) => ({
  repairCompany,
  loading: loading.models.repairCompany,
}))
@Form.create()
class RepairCompany extends PureComponent {
  state = {
    modalVisible: false,
    weightsVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    updateValue: {},
    treeData:[{
      title: '修理',
      value: '01',
      key: '01',
      children: [
        {
          title: '代索赔',
          value: '101',
          key: '101',
        },
        {
          title: '单证收集',
          value: '102',
          key: '102',
        },
        {
          title: '变速箱',
          value: '103',
          key: '103',
        },
        {
          title: '快速定损',
          value: '104',
          key: '104',
        },
        {
          title: '接送车',
          value: '105',
          key: '105',
        },
        {
          title: '玻璃',
          value: '106',
          key: '106',
        },
        {
          title: '车身',
          value: '107',
          key: '107',
        },
        {
          title: '零配件维修',
          value: '108',
          key: '108',
        },
      ],
    },
      {
        title: '救援',
        value: '02',
        key: '02',
        children:[
          {
            title: '事故救援',
            value: '0201',
            key: '0201',
            children: [{
              title: '其他事故救援',
              value: '020101',
              key: '020101',
            }, {
              title: '事故拖车',
              value: '020102',
              key: '020102',
            }],
          },
          {
            title: '非事故救援',
            value: '0202',
            key: '0202',
            children: [
              {
                title: '其他非事故救援',
                value: '020201',
                key: '020201',
              },
              {
                title: '非事故拖车',
                value: '020202',
                key: '020202',
              },
              {
                title: '搭电',
                value: '020203',
                key: '020203',
              },
              {
                title: '送油',
                value: '020204',
                key: '020204',
              },
            ]
          }
        ]
      },
      {
        title: '鉴定',
        value: '03',
        key: '03',
        children: [
          {
            title: '人伤鉴定',
            value: '0301',
            key: '0301',
          },
          {
            title: '物损鉴定',
            value: '0302',
            key: '0302',
          },
          {
            title: '车损鉴定',
            value: '0303',
            key: '0303',
          },
        ],
      }
    ],
    companyWeights: [
      {
        name: '杭州汇迪',
        code: 'hzhd',
        weight: 30,
      },
      {
        name: '杭州九和',
        code: 'hzjh',
        weight: 40,
      },
      {
        name: '杭州随风汽修',
        code: 'hzsf',
        weight: 30,
      }
    ],
    distanceWeightRate: 20,
    brandPlusCount: 0,
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
      render: d => <Switch defaultChecked={d === '1'} />,
    },
    {
      title: '有效',
      dataIndex: 'valid',
      render: d => <Switch defaultChecked={d === '1'} />,
    },
    {
      title: '操作',
      render: data => (
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
    dispatch({
      type: 'repairCompany/getBelongCompanyList',
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
      updateValue: {},
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.handleModalVisible(flag);
    this.setState({ updateValue: { ...record } });
  };

  handleWeightsVisible = flag => {
    this.setState({
      weightsVisible: !!flag,
    })
  };

  handleAdd = () => {
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      dispatch({
        type: 'repairCompany/' + fieldsValue.id ? 'update' : 'add',
        payload: {
          ...fieldsValue,
        },
      });

      message.success('添加成功');
      this.handleModalVisible();
    });
  };

  cancelHandle = () => {
    this.setState({brandPlusCount: 0});
    this.props.form.resetFields();
    this.handleModalVisible(false);
  };

  handleAutoSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'repairCompany/searchRepairCompany',
      payload: {
        query: value,
      },
    });
  };

  searchBrandHandle = value =>{
    this.props.dispatch({
      type: 'repairCompany/searchAutoBrand',
      payload: {
        query: value,
      },
    });
  };

  handleWeightSave = ()=>{
    const { form:{getFieldsValue, resetFields} } = this.props;
    const { companyWeights } = this.state;
    const fields = companyWeights.map(d=>d.code);
    const values = getFieldsValue(['distanceWeightRate',...fields]);
    let count = 0;
    fields.forEach(d=>{
      count += values[d]||0;
    });
    if(count!==100){
      message.error("修理厂权重相加不为100%");
      return;
    }
    resetFields(['distanceWeightRate',...fields]);
    this.handleWeightsVisible(false);
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
      repairCompany: { autoSearchCompanyList = [], belongCompanyList = [] },
    } = this.props;

    const Option = AutoComplete.Option;
    const children = autoSearchCompanyList.map(d => (
      <Option key={d.code}>{d.name}</Option>
    ));
    const belongCompanyChildren = belongCompanyList.map(d => (
      <Select.Option key={d.code}>{d.name}</Select.Option>
    ));

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="归属公司">
              {getFieldDecorator('company')(<Select>{belongCompanyChildren}</Select>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="维修单位">
              {getFieldDecorator('repairCompany')(
                <AutoComplete onSearch={this.handleAutoSearch} dataSource={children} />
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
      repairCompany: { repairCompanyList, belongCompanyList, autoBrandList  },
      form,
    } = this.props;
    const { selectedRows, modalVisible, updateValue, treeData, weightsVisible, companyWeights, distanceWeightRate, brandPlusCount } = this.state;

    const { id, companyCode, companyName, repairCompanyCode, companyAddress,
      longitude, latitude, belongCompany, giveUp, valid, }
      = updateValue;

    const Option = Select.Option;

    const belongCompanyChildren = belongCompanyList.map(d => <Option key={d.code}>{d.name}</Option>);
    const autoChildren = autoBrandList.map(d=><AutoComplete.Option key={d.code}>{d.name}</AutoComplete.Option>);

    const brandPlusChildren = [];
    for (let i = 0; i < brandPlusCount; i++) {
      brandPlusChildren.push(
        <FormItem key={i} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label=" ">
          {form.getFieldDecorator('sendRepairBrand'+(i+1), {
            // initialValue:,
          })(
            <AutoComplete
              placeholder="请输入"
              onSearch={this.searchBrandHandle}
              style={{width: '100%'}}
              dataSource={autoChildren}
            ><Input
              suffix={(
                <span>
                    <Button size='small' style={{marginRight: 5}} onClick={e=>{e.stopPropagation();this.handleWeightsVisible(true)}}>权重</Button>
                  {i===brandPlusCount-1?
                    <Button size='small' onClick={e=>{e.stopPropagation();this.setState({brandPlusCount: this.state.brandPlusCount+1})}}><Icon type="plus-circle" /></Button>
                    : <Button size='small' onClick={e=>{e.stopPropagation();this.setState({brandPlusCount: this.state.brandPlusCount-1})}}><Icon type="minus-circle" /></Button>}
                  </span>
              )}
            /></AutoComplete>)}
        </FormItem>
      );
    }

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
              rowKey="id"
              size="middle"
              selectedRows={selectedRows}
              data={repairCompanyList}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          destroyOnClose
          title="维修单位"
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={this.cancelHandle}
        >
          <FormItem style={{ display: 'none' }} label="id">
            {form.getFieldDecorator('id', { initialValue: id })(<Input />)}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="单位代码">
            {form.getFieldDecorator('companyCode', {
              rules: [{ required: true }],
              initialValue: companyCode,
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
              initialValue: repairCompanyCode,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="归属公司">
            {form.getFieldDecorator('belongCompany', {
              rules: [{ required: true }],
              initialValue: belongCompany,
            })(<Select style={{ width: '100%' }}>{belongCompanyChildren}</Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="地址">
            {form.getFieldDecorator('companyAddress', {
              rules: [{ required: true }],
              initialValue: companyAddress,
            })(<Input placeholder="请输入" addonAfter={<Icon type="pushpin" />} />)}
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
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="服务类型">
            {form.getFieldDecorator('serviceType', {
              rules: [{ required: true }],
              // initialValue: ,
            })(<TreeSelect
              treeData={treeData}
              searchPlaceholder="选择"
              style={{width:'100%'}}
              treeCheckable={true}
            />)}
          </FormItem>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="送修品牌">
            {form.getFieldDecorator('sendRepairBrand0', {
              rules: [{ required: true }],
              // initialValue:,
            })(
              <AutoComplete
                placeholder="请输入"
                onSearch={this.searchBrandHandle}
                style={{width: '100%'}}
                dataSource={autoChildren}
              ><Input
                suffix={(
                  <span>
                    <Button size='small' style={{marginRight: 5}} onClick={e=>{e.stopPropagation();this.handleWeightsVisible(true)}}>权重</Button>
                    {brandPlusCount===0?
                      <Button size='small' onClick={e=>{e.stopPropagation();this.setState({brandPlusCount: this.state.brandPlusCount+1})}}><Icon type="plus-circle" /></Button>
                      : <Button size='small' onClick={e=>{e.stopPropagation();this.setState({brandPlusCount: this.state.brandPlusCount-1})}}><Icon type="minus-circle" /></Button>}
                  </span>
                )}
              /></AutoComplete>)}
          </FormItem>
          {brandPlusChildren}
        </Modal>
        <Modal
          destroyOnClose
          title="权重配置"
          visible={weightsVisible}
          onOk={this.handleWeightSave}
          onCancel={()=>{this.handleWeightsVisible(false)}}
        >
          {companyWeights.map(d=>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label={d.name} key={d.code}>
              {form.getFieldDecorator(d.code,{initialValue: d.weight})(<Input  addonAfter='%' />)}
            </FormItem>
          )}
          <Row gutter={{ md: 2 }}>
            <Col md={6} >送修权重占比{form.getFieldValue('distanceWeightRate')+"%"}</Col>
            <Col md={12} >
              <FormItem wrapperCol={{ span: 24 }}>
                {form.getFieldDecorator('distanceWeightRate',{initialValue: distanceWeightRate||50})(
                  <Slider />
                )}
              </FormItem>
            </Col>
            <Col md={6}>距离权重占比{(100-form.getFieldValue('distanceWeightRate'))+"%"}</Col>
          </Row>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default RepairCompany;
/*
{/!*<FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="杭州汇迪">
            {form.getFieldDecorator('hzhd',{
              initialValue: 20
            })(
              <Input addonAfter='%' />
            )}
          </FormItem>*!/}*/
