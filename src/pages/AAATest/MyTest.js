import React, { PureComponent } from 'react';
import { Button, Form, Input, Checkbox, Row, Col, Select, Icon } from 'antd';
import { connect } from 'dva';
import tableListStyles from '../List/TableList.less';

// @connect((t) => ({submitting: t.loading.effects['mytest/query']}))
@connect((t)=>{
  console.log(t);
  return {submitting: t.loading.effects['mytest/query']}
})
class MyTest extends PureComponent {
  state = {
    btnId: '',
    testList: [1,2,3,4,5,6],
    nTestList: [],
  };

  componentWillReceiveProps( nextProps, nextContext ) {
    if (this.props.testList !== nextProps.testList) {
      this.setTestList();
    }
  }

  handleClick = (e)=>{
    console.log(this);
    console.log(e.target.dataset.btnId);
  };

  setTestList = ()=>{
    const nTestList = this.state.testList.sort((a,b)=>b-a).slice(0,2);
    this.setState({nTestList});
  };

  render(){
    const { submitting } = this.props;
    const { btnId, nTestList } = this.state;
    // 如非必要 在render中不要生成新的state或object等 放到子组件
    // 就算没有变化也会导致子组件重新渲染
    // testList.sort((a,b)=>b-a).slice(0,2);

    return (
      <div>
        {/*<Button onClick={this.handleClick} data-btn-id={btnId}>{submitting?'button':nTestList[0]+'nope'}</Button>*/}
        <DynamicRule />
      </div>
    );
  }
}

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

@Form.create()
class DynamicRule extends React.Component {
  state = {
    checkNick: false,
  };

  check = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
        }
      },
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={{ md: 0 }}>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="车牌号">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="保单号">
              {getFieldDecorator('code')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="证件号">
              {getFieldDecorator('number')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 0 }}>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="发动机号">
              {getFieldDecorator('number1')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="车架号">
              {getFieldDecorator('number3')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="被保险人">
              {getFieldDecorator('number2')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 0}}>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="承保公司">
              {getFieldDecorator('company')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">浙江分公司</Option>
                  <Option value="1">江苏分公司</Option>
                  <Option value="2">北京分公司</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="承保公司">
              {getFieldDecorator('company2')(
                <Select placeholder="请选择" >
                  <Option value="0">杭州中支公司</Option>
                  <Option value="1">台州中支公司</Option>
                  <Option value="2">温州中支公司</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={tableListStyles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default MyTest;
