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
class OrganizationCover extends PureComponent {
  state = {};

  columns = [
    {
      title: '承保机构',
      dataIndex: 'acceptInsuranceCompany',
    },
    {
      title: '开业4S店数量',
      dataIndex: 'openingNum',
    },
    {
      title: '合作4S店数',
      dataIndex: 'cooperationNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '区域内4S店覆盖品牌',
      dataIndex: 'brandCoverNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '区域内4S合作品牌',
      dataIndex: 'cooperationBrandCoverNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '合作4S店有产能数',
      dataIndex: 'productionCapacityNum',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '合作4S店保费累计',
      dataIndex: 'premiumCount',
    },
    {
      title: '合作4S店设置送修家数',
      dataIndex: 'cooperationSetSendRepair',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },
    {
      title: '合作4S店实际送修家数',
      dataIndex: 'cooperationSendRepair',
      render: (d, data)=> <Fragment>
        <a onClick={()=>this.handleExport(data.id)}>{d}</a>
      </Fragment>,
    },

  ];

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'sendRepairAnalysis/initOrganizationCover',
      payload: {},
    });
  }

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      dispatch({
        type: 'sendRepairAnalysis/fetchOrganizationCover',
        payload: {...fieldsValue},
      });
    });
  };

  renderForm = ()=>{
    const { form:{ getFieldDecorator}, sendRepairAnalysis:{organizationCoverInitData} } = this.props;
    const { belongCompanyList, authorizeCompanyList, repairCompanyList, repairCompanyGroupList, repairBrandList } = organizationCoverInitData;

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
          <FormItem label="车商集团">
            {getFieldDecorator('repairCompanyGroup')(
              <Select placeholder='请选择' >
                {repairCompanyGroupList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="送修品牌">
            {getFieldDecorator('sendRepairBrand')(
              <Select placeholder='请选择'>
                {repairBrandList.map(d=><Select.Option key={d.code}>{d.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24} />
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

    const { sendRepairAnalysis:{ organizationCoverList } } = this.props;

    return <PageHeaderWrapper title="机构车商/品牌覆盖度分析">
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
            dataSource={organizationCoverList}
          />

        </div>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default OrganizationCover;
