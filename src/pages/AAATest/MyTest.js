import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

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
        <Button onClick={this.handleClick} data-btn-id={btnId}>{submitting?'button':nTestList[0]+'nope'}</Button>
      </div>
    );
  }
}

export default MyTest;
