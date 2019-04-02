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
  Radio,
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
class SendRepairProcess extends PureComponent {
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
      title: '失败件数',
      dataIndex: 'sendRepairFailNum',
    },
    {
      title: '未联系',
      dataIndex: 'notContact',
    },
    {
      title: '未及时联系',
      dataIndex: 'notContactInTime',
    },
    {
      title: '引导不成功',
      dataIndex: 'guideFail',
    },
    {
      title: '接修不成功',
      dataIndex: 'receiveRepairFail',
    },
    {
      title: '跟踪任务未处理',
      dataIndex: 'unprocessed',
    },
    {
      title: '清单',
      render: data=>(
        <Fragment>
          <a onClick={()=>this.handleExport(data.id)}>导出</a>
        </Fragment>
      ),
    }

  ];

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'sendRepairAnalysis/initSendRepairProcess',
      payload: {},
    });
  }

  handleExport = id =>{

  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      dispatch({
        type: 'sendRepairAnalysis/fetchSendRepairProcess',
        payload: {...fieldsValue},
      });
    });
  };

  renderForm = ()=>{
    const { form:{ getFieldDecorator}, sendRepairAnalysis:{sendRepairProcessInitData} } = this.props;
    const { belongCompanyList, authorizeCompanyList, repairCompanyList, repairCompanyGroupList } = sendRepairProcessInitData;


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
          <FormItem label="主流程">
            {getFieldDecorator('mainProcess')(
              <Radio.Group>
                <Radio value="1">
                  报案触
                </Radio>
                <Radio value="2">
                  调度触
                </Radio>
              </Radio.Group>
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

    const { sendRepairAnalysis:{ sendRepairProcessList } } = this.props;

    return <PageHeaderWrapper title="送修流程原因分析">
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
            dataSource={sendRepairProcessList}
          />

        </div>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default SendRepairProcess;
