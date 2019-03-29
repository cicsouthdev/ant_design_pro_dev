import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Button,
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
    current: 'systemEvent',
    searchStatus: false,
    processStatus: true,
    rollStatus: true,
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
        title: '接收者号码',
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
        dataIndex: 'reportNo',
      },{
        title: '任务类别',
        dataIndex: 'taskType',
      },{
        title: '任务名称',
        dataIndex: 'taskName',
      },{
        title: '任务执行人',
        dataIndex: 'taskReceiver',
      },{
        title: '任务时间',
        dataIndex: 'taskTime',
      },{
        title: '任务描述',
        dataIndex: 'taskDesc',
      },
    ],
    msgQueue: [
      {
        title: '消息时间',
        dataIndex: 'msgTime',
      },{
        title: '发送者',
        dataIndex: 'sender',
      },{
        title: '业务类型',
        dataIndex: 'businessType',
      },{
        title: '业务代码',
        dataIndex: 'businessCode',
      },{
        title: '消息内容',
        dataIndex: 'businessContent',
      },
    ],
  };

  handleMenuClick = (e)=>{
    this.setState({
      current: e.key,
    });
    if(this.state.searchStatus) this.searchList(e.key);
  };

  handleSearch = ()=>{
    const key = this.state.current;
    this.searchList(key);
    this.setState({
      searchStatus: true,
    });
  };

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { formValues, current } = this.state;

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

    // dispatch({
    //   type: 'carBrandRel/fetch',
    //   payload: params,
    // });
    this.searchList(current, params);

  };

  searchList(key='systemEvent', params={}){
    const { dispatch } = this.props;
    switch (key) {
      case 'systemEvent':
        dispatch({
          type: 'processEngine/fetchSystemEvent',
          payload: params,
        });
        break;
      case 'msgSend':
        dispatch({
          type: 'processEngine/fetchMsgSend',
          payload: params,
        });
        break;
      case 'msgReceive':
        dispatch({
          type: 'processEngine/fetchMsgReceive',
          payload: params,
        });
        break;
      case 'taskSendDistribution':
        dispatch({
          type: 'processEngine/fetchTaskSendDistribution',
          payload: params,
        });
        break;
      case 'msgQueue':
        dispatch({
          type: 'processEngine/fetchMsgQueue',
          payload: params,
        });
        break;
    }
  }

  handleStopRollClick= ()=>{
    this.setState({rollStatus: !this.state.rollStatus});
  };

  handleSearchStopClick = ()=>{
    this.setState({
      searchStatus: false,
    })
  };

  handleProcessStartClick = ()=>{
    this.setState({
      processStatus: true,
    });
  };

  handleProcessStopClick= ()=>{
    this.setState({
      processStatus: false,
    })
  };

  render(){

    const {
      processEngine,loading
    } = this.props;
    const { current, searchStatus, processStatus, rollStatus } = this.state;
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
            <Button icon="caret-right" type="primary" disabled={searchStatus} onClick={this.handleSearch}>
              查询开始
            </Button>
            <Button icon="pause" type="primary" disabled={!searchStatus} onClick={this.handleSearchStopClick}>
              查询停止
            </Button>
            <Divider type="vertical" />
            <Button icon="caret-right" type="primary" disabled={processStatus} onClick={this.handleProcessStartClick} >
              流程开始
            </Button>
            <Button icon="stop" type="primary" disabled={!processStatus} onClick={this.handleProcessStopClick} >
              流程停止
            </Button>
            <Divider type="vertical" />
            <Button icon="pushpin" type={rollStatus?'primary':''} onClick={this.handleStopRollClick} >
              停止滚动
            </Button>
          </div>
          <Table
            size='middle'
            rowKey='id'
            loading={loading}
            dataSource={list}
            pagination={paginationProps}
            columns={this.columns[current]}
            onchange={this.handleTableChange}
          />
        </div>
      </Card>
    </PageHeaderWrapper>;
  }
}

export default ProcessEngine;
