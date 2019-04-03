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
  Select,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Brand.less';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


/* eslint react/no-multi-comp:0 */
@connect(({ carBrand, loading }) => ({
  carBrand,
  loading: loading.models.carBrand,
}))
@Form.create()
class CarBrand extends PureComponent {
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
      title: '品牌名称',
      dataIndex: 'name',
    },
    {
      title: '品牌代码',
      dataIndex: 'code',
    },
    {
      title: '操作',
      render: data => (
        <Fragment>
          <a>权重</a>
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
      type: 'carBrand/fetch',
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
      type: 'carBrand/fetch',
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
  //     type: 'carBrand/fetch',
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
        type: 'carBrand/fetch',
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

  handleAdd = fields => {
    const { dispatch } = this.props;

    dispatch({
      type: 'carBrand/' + fields.id ? 'update' : 'add',
      payload: {
        ...fields,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="品牌名称">
              {getFieldDecorator('brandName')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="品牌代码">
              {getFieldDecorator('brandCode')(
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
      carBrand: { carBrandList },
    } = this.props;
    const { selectedRows, modalVisible, updateValue } = this.state;

    return (
      <PageHeaderWrapper title="品牌维护">
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
              data={carBrandList}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          visible={modalVisible}
        >

        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default CarBrand;
