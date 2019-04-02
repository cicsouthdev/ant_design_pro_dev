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
const { RangePicker } = DatePicker;

@connect(({ sendRepairProcess, loading }) => ({
  sendRepairProcess,
  loading: loading.models.sendRepairProcess,
}))
@Form.create()
class MonitorRemedy extends PureComponent {
  state = {};

  columns = [
    {
      title: '发送人',
      dataIndex: 'sender',
    },
    {
      title: '总送修量',
      dataIndex: 'sendRepairNum',
    },
    {
      title: '回复回意数',
      dataIndex: 'replyNum',
    },
    {
      title: '清单',
      render: data=>(
        <Fragment>
          <a onClick={()=>this.handleExport(data.id)}>导出</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'sendRepairProcess/initMonitorRemedy',
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
        type: 'sendRepairProcess/fetchMonitorRemedy',
        payload: {...fieldsValue},
      });
    });
  };

  renderForm = ()=>{
    const { form:{ getFieldDecorator}, sendRepairProcess:{monitorRemedyInitData} } = this.props;
    const { belongCompanyList } = monitorRemedyInitData;

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
          <FormItem label="查询日期">
            {getFieldDecorator('sendRepairDate')(
              <RangePicker />
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
    </Form>;
  };

  render(){

    const { sendRepairProcess: {monitorRemedyList} } = this.props;

    return <PageHeaderWrapper title="监控补救报表">
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
            dataSource={monitorRemedyList}
          />

        </div>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default MonitorRemedy;
