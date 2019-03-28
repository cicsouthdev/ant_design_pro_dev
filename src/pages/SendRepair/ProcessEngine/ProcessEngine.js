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
  Menu, Table,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ProcessEngine.less';

@connect(({ processEngine, loading }) => ({
  processEngine,
  loading: loading.models.processEngine,
}))
class ProcessEngine extends PureComponent {
  state = {
    current: 'systemEvent'
  };

  columns={
    systemEvent: [
      {
        title: '时间',
        dataIndex: 'eventTime',
      },{
        title: '事件',
        dataIndex: 'event',
      },{
        title: '消息',
        dataIndex: 'msg',
      },
    ],
    msgSend: [
      {
        title: '信息ID',
        dataIndex: 'id',
      },{
        title: '报案号',
        dataIndex: 'reportNo',
      },{
        title: '信息类别',
        dataIndex: 'msgType',
      },{
        title: '运营商',
        dataIndex: 'operator',
      },{
        title: '接收者名称',
        dataIndex: 'receiverName',
      },{
        title: '接受者号码',
        dataIndex: 'receiverPhone',
      },{
        title: '发送时间',
        dataIndex: 'sendTime',
      },{
        title: '主题',
        dataIndex: 'theme',
      },
    ],
    msgReceive: [
      {
        title: '短信ID',
        dataIndex: 'id',
      },{
        title: '报案号',
        dataIndex: 'reportNo',
      },{
        title: '短信类别',
        dataIndex: 'smsType',
      },{
        title: '运营商',
        dataIndex: 'operator',
      },{
        title: '回复号码',
        dataIndex: 'replyPhone',
      },{
        title: '回复时间',
        dataIndex: 'replyTime',
      },{
        title: '回复内容',
        dataIndex: 'replyMsg',
      },
    ],
    taskSendDistribution: [
      {
        title: '任务ID',
        dataIndex: 'id',
      },{
        title: '报案号',
        dataIndex: '',
      },{
        title: '任务类别',
        dataIndex: '',
      },{
        title: '任务名称',
        dataIndex: '',
      },{
        title: '任务执行人',
        dataIndex: '',
      },{
        title: '任务时间',
        dataIndex: '',
      },{
        title: '任务描述',
        dataIndex: '',
      },
    ],
    msgQueue: [
      {
        title: '消息时间',
        dataIndex: '',
      },{
        title: '发送者',
        dataIndex: '',
      },{
        title: '业务类型',
        dataIndex: '',
      },{
        title: '业务代码',
        dataIndex: '',
      },{
        title: '消息内容',
        dataIndex: '',
      },
    ],
  };

  handleMenuClick = (e)=>{
    this.setState({
      current: e.key,
    });
  };

  render(){

    const {
      processEngine,loading
    } = this.props;
    const { current } = this.state;
    const MenuItem = Menu.Item;
    const { list = [], pagination } = processEngine[current];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    return <PageHeaderWrapper title="车型与品牌的关系">
      <Card bordered={false}>
        <Menu
          mode="horizontal"
          onClick={this.handleMenuClick}
          selectedKeys={[current]}
        >
          <MenuItem key='systemEvent'>系统事件</MenuItem>
          <MenuItem key='msgSend'>信息发送</MenuItem>
          <MenuItem key='msgReceive'>信息接收</MenuItem>
          <MenuItem key='taskSendDistribution'>任务派发</MenuItem>
          <MenuItem key='msgQueue'>消息队列</MenuItem>
        </Menu>

        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              查询开始
            </Button>
          </div>
          <Table
            rowKey='id'
            loading={loading}
            dataSource={list}
            pagination={paginationProps}
            columns={this.columns[current]}
          />
        </div>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default ProcessEngine;
