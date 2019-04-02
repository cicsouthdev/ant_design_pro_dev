import React, { Fragment, PureComponent } from 'react';
import {
  Button,
  Card,
  Form,
  Col,
  DatePicker,
  Icon,
  Input,
  InputNumber,
  Row,
  Select,
  Badge,
  Divider,
  Table,
  Cascader,
  Radio,
  Tooltip,
  Checkbox,
  Popover,
  Rate,
  AutoComplete,
} from 'antd';
import { connect } from 'dva';
import tableListStyles from '../../List/TableList.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ReportCase.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ report, loading }) => ({
  report,
  loading: loading.models.report,
}))
@Form.create()
class ReportCase extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    onSite: true,
    x: 0,
    y: 0,
    surveyX: 0,
    surveyY: 0,
    showResidenceAdvice: true,
    showSize: 1, // 三者车损展示数量
    carNoResult: {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
    },
    carNoResult1: 0,
    carNoResult2: 0,
    carNoResult3: 0,
    carNoResult4: 0,
    searchSuccess: false,
    searchFailure: false,
  };

  columns = [
    {
      title: '保单类型',
      dataIndex: 'policyType',
    },
    {
      title: '保单号',
      dataIndex: 'policyNo',
    },
    {
      title: '被保险人',
      dataIndex: 'insured',
    },
    {
      title: '车牌号',
      dataIndex: 'carNo',
    },
    ,
    /*{
      title: '发动机号',
      dataIndex: 'engineNo',
    },
    {
      title: '车架号',
      dataIndex: 'vinNo',
    }*/ {
      title: '厂牌型号',
      dataIndex: 'brand',
    },
    {
      title: '保单起期',
      dataIndex: 'policyStartTime',
    },
    {
      title: '保单止期',
      dataIndex: 'policyStopTime',
    },
    {
      title: '保单状态',
      dataIndex: 'policyStatus',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/init',
    });
  }

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
      console.log(fieldsValue);
      console.error(values);
      dispatch({
        type: 'report/fetch',
        payload: values,
      });
    });
  };

  handleClickRow = record => {
    return {
      onClick: e => {
        alert('打开保单抄单信息model');
      },
    };
  };

  handleClickResidencePosition = () => {
    this.setState({
      x: 30.192773,
      y: 120.212958,
    });
  };

  handleCLickScenePosition = () => {
    this.setState({
      surveyX: 30.123456,
      surveyY: 120.65432,
      showResidenceAdvice: false,
    });
  };

  handleResetScenePosition = () => {
    this.setState({
      surveyX: 0,
      surveyY: 0,
      showResidenceAdvice: true,
    });
  };

  handleResetResidencePosition = () => {
    this.setState({
      x: 0,
      y: 0,
    });
  };

  handleThreeCarLossAddClick = () => {
    let { showSize } = this.state;
    showSize < 4 && showSize++;
    this.setState({ showSize });
  };

  handleThreeCarLossDiffClick = () => {
    let { showSize } = this.state;
    showSize > 1 && showSize--;
    this.setState({ showSize });
  };

  handleThreeCarNoBlur = (key, value) => {
    const {
      form: { setFieldsValue },
    } = this.props;
    if (key == 1) {
      setFieldsValue({
        threeCarLossPart1: '车门',
        brand1: '奥迪',
        threeCarOwnerName1: '王二',
        threeCarOwnerPhone1: '18888888888',
        threeCarOwnerSex1: '1',
      });
      this.setState({ carNoResult1: 1 });
    } else if (key == 2) {
      this.setState({ carNoResult2: 2 });
    } else if (key == 3) {
      this.setState({ carNoResult3: 2 });
    } else if (key == 4) {
      this.setState({ carNoResult4: 2 });
    }
  };

  handleAutoSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/searchBrand',
      payload: {
        query: value,
      },
    });
  };

  handleSearchSuccess = () => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      threeCarLossPart2: '车门',
      brand2: '奥迪',
      threeCarOwnerName2: '王三',
      threeCarOwnerPhone2: '18886666666',
      threeCarOwnerSex2: '2',
    });
    this.setState({ searchSuccess: true });
  };

  handleSearchFailure = () => {
    this.setState({ searchFailure: true });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="车牌号">
              {getFieldDecorator('carNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="保单号">
              {getFieldDecorator('policyNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={tableListStyles.submitButtons}>
              <Button type="primary" htmlType="button" onClick={this.handleSearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="车牌号">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="保单号">
              {getFieldDecorator('code')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="证件号">
              {getFieldDecorator('number')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="发动机号">
              {getFieldDecorator('number1')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="车架号">
              {getFieldDecorator('number3')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="被保险人">
              {getFieldDecorator('number2')(<Input style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="承保公司">
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
            <FormItem label="承保公司">
              {getFieldDecorator('company2')(
                <Select placeholder="请选择">
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

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  renderWarningForm() {
    const {
      form: { getFieldDecorator, getFieldValue },
      report: { residences, reasons, brandAutoCompleteData },
    } = this.props;

    const Option = AutoComplete.Option;

    const children = brandAutoCompleteData.map(d => <Option key={d.code}>{d.name}</Option>);

    const {
      x,
      y,
      showResidenceAdvice,
      surveyX,
      surveyY,
      showSize,
      searchFailure,
      searchSuccess,
      carNoResult4,
      carNoResult3,
      carNoResult2,
      carNoResult1,
    } = this.state;

    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="出险地点">
              {getFieldDecorator('residence', {
                initialValue: ['浙江', '杭州'],
                rules: [{ type: 'array', /*required: true,*/ message: '请选择出险地点' }],
              })(<Cascader options={residences} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="详细地点">
              {getFieldDecorator('detailPlace')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <div style={{ float: 'left' }}>
              <Button htmlType="button" type="primary" onClick={this.handleClickResidencePosition}>
                地图定位
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                htmlType="button"
                onClick={this.handleResetResidencePosition}
              >
                重置
              </Button>
            </div>
            <div style={{ float: 'left', fontSize: 13, marginLeft: 7 }}>
              <Row style={{ marginTop: -3 }}>经度:{x}</Row>
              <Row style={{ marginTop: -3 }}>纬度:{y}</Row>
            </div>
          </Col>
        </Row>
        {x && y && showResidenceAdvice ? (
          <Row>
            <Col md={24} sm={24} style={{ marginTop: -20, marginBottom: 10 }}>
              <div>
                推荐送修：
                <Popover
                  placement="top"
                  content={
                    <div>
                      <div>
                        推荐等级：
                        <Rate disabled defaultValue={5} />
                      </div>
                      <div>
                        联系电话：<a>0571-64700000</a>
                      </div>
                      <div>离案发地1.2公里</div>
                    </div>
                  }
                  title="杭州奕星汽车服务有限公司"
                >
                  <span className={styles.warningMsg}>
                    <Badge
                      count={1}
                      style={{
                        backgroundColor: '#fff',
                        color: '#ff4000',
                        boxShadow: '0 0 0 1px #ff4000 inset',
                        marginTop: -3,
                        marginRight: 3,
                      }}
                    />
                    杭州奕星汽车服务有限公司
                  </span>
                  ，
                </Popover>
                <Popover
                  placement="top"
                  content={
                    <div>
                      <div>
                        联系电话：<a>0571-61232220</a>
                      </div>
                      <div>离案发地5公里</div>
                    </div>
                  }
                  title="杭州奕星汽车服务有限公司"
                >
                  <span>
                    <Badge
                      count={2}
                      style={{
                        backgroundColor: '#fff',
                        color: 'black',
                        boxShadow: '0 0 0 1px black inset',
                        marginTop: -3,
                        marginRight: 3,
                      }}
                    />
                    杭州中升星宏汽车服务有限公司
                  </span>
                  ，
                </Popover>
                <Popover
                  placement="top"
                  content={
                    <div>
                      <div>
                        联系电话：<a>0571-64702300</a>
                      </div>
                      <div>离案发地3.4公里</div>
                    </div>
                  }
                  title="杭州中升之星汽车销售服务有限公司"
                >
                  <span>
                    <Badge
                      count={3}
                      style={{
                        backgroundColor: '#fff',
                        color: 'black',
                        boxShadow: '0 0 0 1px black inset',
                        marginTop: -3,
                        marginRight: 3,
                      }}
                    />
                    杭州中升之星汽车销售服务有限公司
                  </span>
                </Popover>
              </div>
            </Col>
          </Row>
        ) : (
          ''
        )}
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="出险原因">
              {getFieldDecorator('riskReason', {
                initialValue: ['碰撞'],
                rules: [{ type: 'array', /*required: true,*/ message: '请选择出险地点' }],
              })(<Cascader options={reasons} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="原因备注">
              {getFieldDecorator('riskRemark')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="现场">
              {getFieldDecorator('isScene', {
                initialValue: '1',
              })(
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="2">否</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row
          gutter={{ md: 8, lg: 24, xl: 48 }}
          style={{ display: getFieldValue('isScene') === '2' ? 'block' : 'none' }}
        >
          <Col md={8} sm={24}>
            <FormItem label="查勘地点">
              {getFieldDecorator('surveyResidence', {
                initialValue: ['浙江', '杭州'],
                rules: [{ type: 'array', message: '请选择出险地点' }],
              })(<Cascader options={residences} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="详细地点">
              {getFieldDecorator('surveyDetailPlace')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <div style={{ float: 'left' }}>
              <Button htmlType="button" type="primary" onClick={this.handleCLickScenePosition}>
                地图定位
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                htmlType="button"
                onClick={this.handleResetScenePosition}
              >
                重置
              </Button>
            </div>
            <div style={{ float: 'left', fontSize: 13, marginLeft: 7 }}>
              <Row style={{ marginTop: -3 }}>经度:{surveyX}</Row>
              <Row style={{ marginTop: -3 }}>纬度:{surveyY}</Row>
            </div>
          </Col>
        </Row>
        {surveyX && surveyY ? (
          <Row>
            <Col md={24} sm={24} style={{ marginTop: -20, marginBottom: 10 }}>
              <div>
                推荐送修：
                <Popover
                  placement="top"
                  content={
                    <div>
                      <div>
                        推荐等级：
                        <Rate disabled defaultValue={5} />
                      </div>
                      <div>
                        联系电话：<a>0571-64700000</a>
                      </div>
                      <div>离查勘地1.2公里</div>
                    </div>
                  }
                  title="杭州奕星汽车服务有限公司"
                >
                  <span className={styles.warningMsg}>
                    <Badge
                      count={1}
                      style={{
                        backgroundColor: '#fff',
                        color: '#ff4000',
                        boxShadow: '0 0 0 1px #ff4000 inset',
                        marginTop: -3,
                        marginRight: 3,
                      }}
                    />
                    杭州奕星汽车服务有限公司
                  </span>
                  ，
                </Popover>
                <Popover
                  placement="top"
                  content={
                    <div>
                      <div>
                        联系电话：<a>0571-61232220</a>
                      </div>
                      <div>离查勘地5公里</div>
                    </div>
                  }
                  title="杭州奕星汽车服务有限公司"
                >
                  <span>
                    <Badge
                      count={2}
                      style={{
                        backgroundColor: '#fff',
                        color: 'black',
                        boxShadow: '0 0 0 1px black inset',
                        marginTop: -3,
                        marginRight: 3,
                      }}
                    />
                    杭州中升星宏汽车服务有限公司
                  </span>
                  ，
                </Popover>
                <Popover
                  placement="top"
                  content={
                    <div>
                      <div>
                        联系电话：<a>0571-64702300</a>
                      </div>
                      <div>离查勘地3.4公里</div>
                    </div>
                  }
                  title="杭州中升之星汽车销售服务有限公司"
                >
                  <span>
                    <Badge
                      count={3}
                      style={{
                        backgroundColor: '#fff',
                        color: 'black',
                        boxShadow: '0 0 0 1px black inset',
                        marginTop: -3,
                        marginRight: 3,
                      }}
                    />
                    杭州中升之星汽车销售服务有限公司
                  </span>
                </Popover>
              </div>
            </Col>
          </Row>
        ) : (
          ''
        )}
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="车损">
              {getFieldDecorator('carLoss', {
                initialValue: '1',
              })(
                <Radio.Group>
                  <Radio value="1">有</Radio>
                  <Radio value="2">无</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>
        <Card style={{ display: getFieldValue('carLoss') === '1' ? 'block' : 'none' }}>
          <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
            <Col md={8} sm={24}>
              <FormItem label="标的车牌">
                {getFieldDecorator('subjectCarNo')(<Input placeholder="标的车车牌" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="损失部位">
                {getFieldDecorator('subjectLossPart')(<Input placeholder="标的车损失" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem
                label={
                  <span>
                    正常行驶&nbsp;
                    <Tooltip title="标的车可正常行驶时，需要继续询问车辆有无裂缝和有无散落物">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('subjectStatus')(
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="2">否</Radio>
                    <Radio value="3">不详</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row
            gutter={{ md: 2, lg: 6, xl: 12 }}
            style={{ display: getFieldValue('subjectStatus') === '1' ? 'block' : 'none' }}
          >
            <Col md={16} sm={0} />
            <Col md={8} sm={24}>
              <FormItem label="裂缝">
                {getFieldDecorator('subjectCrack')(
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="2">否</Radio>
                    <Radio value="3">不详</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
          </Row>
          <Divider style={{ marginTop: 0, marginBottom: 15 }} />
          <div className="threeCarLossDiv">
            <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
              <Col md={8} sm={24}>
                <FormItem label="三者车牌">
                  {getFieldDecorator('threeCarNo1')(
                    <Input
                      placeholder="三者车车牌"
                      onBlur={e => {
                        this.handleThreeCarNoBlur(1, e.target.value);
                      }}
                    />
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="损失部位">
                  {getFieldDecorator('threeCarLossPart1')(<Input placeholder="三者车损失" />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="三者品牌">
                  {getFieldDecorator('brand1')(
                    <AutoComplete placeholder="输入查询" onSearch={this.handleAutoSearch}>
                      {children}
                    </AutoComplete>
                  )}
                </FormItem>
              </Col>
              {/*<Col md={8} sm={24}>
              <FormItem label="车辆种类">
                {getFieldDecorator('threeCarType')(<Input />)}
              </FormItem>
            </Col>*/}
            </Row>
            <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
              <Col md={8} sm={24}>
                <FormItem label="车主姓名">
                  {getFieldDecorator('threeCarOwnerName1')(<Input placeholder="三者车车主姓名" />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="联系方式">
                  {getFieldDecorator('threeCarOwnerPhone1')(
                    <Input placeholder="三者车车主手机号" />
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="性别">
                  {getFieldDecorator('threeCarOwnerSex1')(
                    <Radio.Group>
                      <Radio value="1">男</Radio>
                      <Radio value="2">女</Radio>
                      <Radio value="3">不详</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
              <Col md={8} sm={24}>
                <FormItem label="正常行驶">
                  {getFieldDecorator('threeCarStatus1')(
                    <Radio.Group>
                      <Radio value="1">是</Radio>
                      <Radio value="2">否</Radio>
                      <Radio value="3">不详</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
              </Col>

              <Col md={10} sm={24}>
                <FormItem
                  label={
                    <span>
                      玻璃单独破碎&nbsp;
                      <Tooltip title="若三者车损部位是玻璃，需询问是否仅玻璃单独受损。">
                        <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator('glassBrokenAlone1')(
                    <Radio.Group>
                      <Radio value="1">是</Radio>
                      <Radio value="2">否</Radio>
                      <Radio value="3">不详</Radio>
                    </Radio.Group>
                  )}
                </FormItem>
              </Col>
              <Col md={6} sm={24}>
                <FormItem>
                  {showSize === 1 && (
                    <Button
                      type="dashed"
                      style={{ width: '40%', marginRight: 10 }}
                      onClick={this.handleThreeCarLossAddClick}
                    >
                      <Icon type="plus" /> 添加
                    </Button>
                  )}
                  {showSize > 1 && (
                    <Button
                      type="dashed"
                      style={{ width: '40%' }}
                      onClick={this.handleThreeCarLossDiffClick}
                    >
                      <Icon type="minus" /> 删除
                    </Button>
                  )}
                </FormItem>
              </Col>
            </Row>
            {carNoResult1 > 0 && (
              <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                {carNoResult1 === 1 ? (
                  <Col style={{ marginTop: -30, marginBottom: 10 }} md={24}>
                    该车为我公司承保车辆
                  </Col>
                ) : (
                  <Col style={{ marginTop: -30, marginBottom: 10 }} md={24}>
                    该车非我公司承保车辆, <a>点击查询承保库</a>
                  </Col>
                )}
              </Row>
            )}
          </div>
          {showSize > 1 && <Divider style={{ marginTop: 0, marginBottom: 15 }} />}
          {showSize > 1 && (
            <div className="threeCarLossDiv">
              <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                <Col md={8} sm={24}>
                  <FormItem label="三者车牌">
                    {getFieldDecorator('threeCarNo2')(
                      <Input
                        placeholder="三者车车牌"
                        onBlur={e => {
                          this.handleThreeCarNoBlur(2, e.target.value);
                        }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="损失部位">
                    {getFieldDecorator('threeCarLossPart2')(<Input placeholder="三者车损失" />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="三者品牌">
                    {getFieldDecorator('brand2')(
                      <AutoComplete placeholder="输入查询" onSearch={this.handleAutoSearch}>
                        {children}
                      </AutoComplete>
                    )}
                  </FormItem>
                </Col>
                {/*<Col md={8} sm={24}>
            <FormItem label="车辆种类">
              {getFieldDecorator('threeCarType')(<Input />)}
            </FormItem>
          </Col>*/}
              </Row>
              <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                <Col md={8} sm={24}>
                  <FormItem label="车主姓名">
                    {getFieldDecorator('threeCarOwnerName2')(
                      <Input placeholder="三者车车主姓名" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="联系方式">
                    {getFieldDecorator('threeCarOwnerPhone2')(
                      <Input placeholder="三者车车主手机号" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="性别">
                    {getFieldDecorator('threeCarOwnerSex2')(
                      <Radio.Group>
                        <Radio value="1">男</Radio>
                        <Radio value="2">女</Radio>
                        <Radio value="3">不详</Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                <Col md={8} sm={24}>
                  <FormItem label="正常行驶">
                    {getFieldDecorator('threeCarStatus2')(
                      <Radio.Group>
                        <Radio value="1">是</Radio>
                        <Radio value="2">否</Radio>
                        <Radio value="3">不详</Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>

                <Col md={10} sm={24}>
                  <FormItem
                    label={
                      <span>
                        玻璃单独破碎&nbsp;
                        <Tooltip title="若三者车损部位是玻璃，需询问是否仅玻璃单独受损。">
                          <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('glassBrokenAlone2')(
                      <Radio.Group>
                        <Radio value="1">是</Radio>
                        <Radio value="2">否</Radio>
                        <Radio value="3">不详</Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem>
                    {showSize === 2 && (
                      <Button
                        type="dashed"
                        style={{ width: '40%', marginRight: 10 }}
                        onClick={this.handleThreeCarLossAddClick}
                      >
                        <Icon type="plus" /> 添加
                      </Button>
                    )}
                    {showSize > 1 && (
                      <Button
                        type="dashed"
                        style={{ width: '40%' }}
                        onClick={this.handleThreeCarLossDiffClick}
                      >
                        <Icon type="minus" /> 删除
                      </Button>
                    )}
                  </FormItem>
                </Col>
              </Row>
              {carNoResult2 > 0 && (
                <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                  {carNoResult2 === 1 ? (
                    <Col style={{ marginTop: -30, marginBottom: 10 }} md={24}>
                      该车为我公司承保车辆
                    </Col>
                  ) : (
                    <Col
                      style={{ marginTop: -30, marginBottom: 10 }}
                      className={styles.warningMsg}
                      md={24}
                    >
                      该车非我公司承保车辆,&nbsp;
                      <a onClick={this.handleSearchSuccess}>点击查询电销库</a>,&nbsp;
                      <a onClick={this.handleSearchSuccess}>点击查询第三方接口</a>
                      {searchSuccess ? <span>, 查询成功</span> : ''}
                    </Col>
                  )}
                </Row>
              )}
            </div>
          )}
          {showSize > 2 && <Divider style={{ marginTop: 0, marginBottom: 15 }} />}
          {showSize > 2 && (
            <div className="threeCarLossDiv">
              <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                <Col md={8} sm={24}>
                  <FormItem label="三者车牌">
                    {getFieldDecorator('threeCarNo3')(
                      <Input
                        placeholder="三者车车牌"
                        onBlur={e => {
                          this.handleThreeCarNoBlur(3, e.target.value);
                        }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="损失部位">
                    {getFieldDecorator('threeCarLossPart3')(<Input placeholder="三者车损失" />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="三者品牌">
                    {getFieldDecorator('brand3')(
                      <AutoComplete placeholder="输入查询" onSearch={this.handleAutoSearch}>
                        {children}
                      </AutoComplete>
                    )}
                  </FormItem>
                </Col>
                {/*<Col md={8} sm={24}>
            <FormItem label="车辆种类">
              {getFieldDecorator('threeCarType')(<Input />)}
            </FormItem>
          </Col>*/}
              </Row>
              <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                <Col md={8} sm={24}>
                  <FormItem label="车主姓名">
                    {getFieldDecorator('threeCarOwnerName3')(
                      <Input placeholder="三者车车主姓名" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="联系方式">
                    {getFieldDecorator('threeCarOwnerPhone3')(
                      <Input placeholder="三者车车主手机号" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="性别">
                    {getFieldDecorator('threeCarOwnerSex3')(
                      <Radio.Group>
                        <Radio value="1">男</Radio>
                        <Radio value="2">女</Radio>
                        <Radio value="3">不详</Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                <Col md={8} sm={24}>
                  <FormItem label="正常行驶">
                    {getFieldDecorator('threeCarStatus3')(
                      <Radio.Group>
                        <Radio value="1">是</Radio>
                        <Radio value="2">否</Radio>
                        <Radio value="3">不详</Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>

                <Col md={10} sm={24}>
                  <FormItem
                    label={
                      <span>
                        玻璃单独破碎&nbsp;
                        <Tooltip title="若三者车损部位是玻璃，需询问是否仅玻璃单独受损。">
                          <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('glassBrokenAlone3')(
                      <Radio.Group>
                        <Radio value="1">是</Radio>
                        <Radio value="2">否</Radio>
                        <Radio value="3">不详</Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem>
                    {showSize === 3 && (
                      <Button
                        type="dashed"
                        style={{ width: '40%', marginRight: 10 }}
                        onClick={this.handleThreeCarLossAddClick}
                      >
                        <Icon type="plus" /> 添加
                      </Button>
                    )}
                    {showSize > 1 && (
                      <Button
                        type="dashed"
                        style={{ width: '40%' }}
                        onClick={this.handleThreeCarLossDiffClick}
                      >
                        <Icon type="minus" /> 删除
                      </Button>
                    )}
                  </FormItem>
                </Col>
              </Row>
              {carNoResult3 > 0 && (
                <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                  {carNoResult3 === 1 ? (
                    <Col style={{ marginTop: -30, marginBottom: 10 }} md={24}>
                      该车为我公司承保车辆
                    </Col>
                  ) : (
                    <Col
                      style={{ marginTop: -30, marginBottom: 10 }}
                      className={styles.warningMsg}
                      md={24}
                    >
                      该车非我公司承保车辆,&nbsp;
                      <a onClick={this.handleSearchFailure}>点击查询承保库</a>,&nbsp;
                      <a onClick={this.handleSearchFailure}>点击查询第三方接口</a>
                      {searchFailure ? <span>, 未查询到相关信息</span> : ''}
                    </Col>
                  )}
                </Row>
              )}
            </div>
          )}
          {showSize > 3 && <Divider style={{ marginTop: 0, marginBottom: 15 }} />}
          {showSize > 3 && (
            <div className="threeCarLossDiv">
              <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                <Col md={8} sm={24}>
                  <FormItem label="三者车牌">
                    {getFieldDecorator('threeCarNo4')(
                      <Input
                        placeholder="三者车车牌"
                        onBlur={e => {
                          this.handleThreeCarNoBlur(4, e.target.value);
                        }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="损失部位">
                    {getFieldDecorator('threeCarLossPart4')(<Input placeholder="三者车损失" />)}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="三者品牌">
                    {getFieldDecorator('brand4')(
                      <AutoComplete placeholder="输入查询" onSearch={this.handleAutoSearch}>
                        {children}
                      </AutoComplete>
                    )}
                  </FormItem>
                </Col>
                {/*<Col md={8} sm={24}>
            <FormItem label="车辆种类">
              {getFieldDecorator('threeCarType')(<Input />)}
            </FormItem>
          </Col>*/}
              </Row>
              <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                <Col md={8} sm={24}>
                  <FormItem label="车主姓名">
                    {getFieldDecorator('threeCarOwnerName4')(
                      <Input placeholder="三者车车主姓名" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="联系方式">
                    {getFieldDecorator('threeCarOwnerPhone4')(
                      <Input placeholder="三者车车主手机号" />
                    )}
                  </FormItem>
                </Col>
                <Col md={8} sm={24}>
                  <FormItem label="性别">
                    {getFieldDecorator('threeCarOwnerSex4')(
                      <Radio.Group>
                        <Radio value="1">男</Radio>
                        <Radio value="2">女</Radio>
                        <Radio value="3">不详</Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
                <Col md={8} sm={24}>
                  <FormItem label="正常行驶">
                    {getFieldDecorator('threeCarStatus4')(
                      <Radio.Group>
                        <Radio value="1">是</Radio>
                        <Radio value="2">否</Radio>
                        <Radio value="3">不详</Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>

                <Col md={10} sm={24}>
                  <FormItem
                    label={
                      <span>
                        玻璃单独破碎&nbsp;
                        <Tooltip title="若三者车损部位是玻璃，需询问是否仅玻璃单独受损。">
                          <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('glassBrokenAlone4')(
                      <Radio.Group>
                        <Radio value="1">是</Radio>
                        <Radio value="2">否</Radio>
                        <Radio value="3">不详</Radio>
                      </Radio.Group>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem>
                    {showSize === 4 && (
                      <Button
                        type="dashed"
                        style={{ width: '40%', marginRight: 10 }}
                        onClick={this.handleThreeCarLossAddClick}
                      >
                        <Icon type="plus" /> 添加
                      </Button>
                    )}
                    {showSize > 1 && (
                      <Button
                        type="dashed"
                        style={{ width: '40%' }}
                        onClick={this.handleThreeCarLossDiffClick}
                      >
                        <Icon type="minus" /> 删除
                      </Button>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </div>
          )}
        </Card>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="物损">
              {getFieldDecorator('goodsLoss', {
                initialValue: '2',
              })(
                <Radio.Group>
                  <Radio value="1">有</Radio>
                  <Radio value="2">无</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>
        <Card style={{ display: getFieldValue('goodsLoss') === '1' ? 'block' : 'none' }}>
          <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
            <Col md={8} sm={24}>
              <FormItem label="标的物损">
                {getFieldDecorator('subjectGoodsLoss')(<Input placeholder="标的车物损" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem>
                <Button type="dashed" style={{ width: '40%', marginRight: 10 }}>
                  <Icon type="plus" /> 添加
                </Button>
                <Button type="dashed" style={{ width: '40%' }}>
                  <Icon type="minus" /> 删除
                </Button>
              </FormItem>
            </Col>
          </Row>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
            <Col md={8} sm={24}>
              <FormItem label="三者物损">
                {getFieldDecorator('threeCarGoodsLoss')(<Input placeholder="三者车物损" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem>
                <Button type="dashed" style={{ width: '40%', marginRight: 10 }}>
                  <Icon type="plus" /> 添加
                </Button>
                <Button type="dashed" style={{ width: '40%' }}>
                  <Icon type="minus" /> 删除
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="人伤">
              {getFieldDecorator('humanInjury', {
                initialValue: '2',
              })(
                <Radio.Group>
                  <Radio value="1">有</Radio>
                  <Radio value="2">无</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>
        <Card style={{ display: getFieldValue('humanInjury') === '1' ? 'block' : 'none' }}>
          <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
            <Col md={8} sm={24}>
              <FormItem label="标的车    伤">
                {getFieldDecorator('subjectHumanInjury')(<Input placeholder="标的车受伤人数" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="亡">
                {getFieldDecorator('subjectHumanDead')(<Input placeholder="标的车死亡人数" />)}
              </FormItem>
            </Col>
          </Row>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <Row gutter={{ md: 2, lg: 6, xl: 12 }}>
            <Col md={6} sm={24}>
              <FormItem label="三者    车内人伤">
                {getFieldDecorator('threeHumanInjury')(<Input placeholder="车内受伤人数" />)}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="车内人亡">
                {getFieldDecorator('threeHumanDead')(<Input placeholder="车内死亡人数" />)}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="车外人伤">
                {getFieldDecorator('threeOutHumanInjury')(<Input placeholder="车外受伤人数" />)}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="车外人亡">
                {getFieldDecorator('threeOutHumanDead')(<Input placeholder="车外死亡人数" />)}
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Row gutter={{ md: 2, lg: 6, xl: 12 }} style={{ marginTop: 10 }}>
          <Col md={24} sm={24}>
            <FormItem label="出险经过汇总">
              {getFieldDecorator('riskTotal', {
                initialValue: '现场案件，，导致无车损，无物损，无人伤，提醒及时报警处理。',
              })(<Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} disabled />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }

  renderMsgFrom() {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="驾驶员">
              {getFieldDecorator('driver')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <Button htmlType="button" type="primary" style={{ marginRight: 10 }}>
              同被保险人
            </Button>
            <Button htmlType="button">不详</Button>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="被保险人电话">
              {getFieldDecorator('insuredPhone')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="报案人">
              {getFieldDecorator('reporter')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={3} sm={12}>
            <Button htmlType="button" type="primary" style={{ marginRight: 10 }}>
              同被驾驶员
            </Button>
          </Col>
          <Col md={5} sm={12}>
            <FormItem>
              {getFieldDecorator('sex')(
                <Radio.Group>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="来电号码">
              {getFieldDecorator('reporterPhone')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="联系人">
              {getFieldDecorator('contact')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={12}>
            <Button htmlType="button" type="primary" style={{ marginRight: 10 }}>
              同报案人
            </Button>
            <Button htmlType="button">报案历史</Button>
          </Col>
          <Col md={8} sm={12}>
            <FormItem label="报案人与被保险人关系">
              {getFieldDecorator('relationship')(
                <Select placeholder="请选择">
                  <Option value="0">本人</Option>
                  <Option value="1">亲属</Option>
                  <Option value="2">同事</Option>
                  <Option value="3">朋友</Option>
                  <Option value="4">客户</Option>
                  <Option value="5">老师</Option>
                  <Option value="6">其他</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="联系电话">
              {getFieldDecorator('contactPhone')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={12}>
            <Button htmlType="button" type="primary" style={{ marginRight: 10 }}>
              同来电号码
            </Button>
            <Button htmlType="button">报案历史</Button>
          </Col>
        </Row>

        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <FormItem label="案件备注">
              {getFieldDecorator('caseRemark')(
                <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={10} sm={24}>
            <FormItem label="补报案类型">
              {getFieldDecorator('supplementaryReportType')(
                <Select placeholder="请选择">
                  <Option value="0">非补报案</Option>
                  <Option value="1">客户原因</Option>
                  <Option value="2">承保环节原因</Option>
                  <Option value="3">报案环节原因</Option>
                  <Option value="4">查勘环节原因</Option>
                  <Option value="5">理赔环节原因</Option>
                  <Option value="6">其他</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={14} sm={24}>
            <FormItem label="补报案备注">
              {getFieldDecorator('supplementaryReportRemark')(
                <Input.TextArea placeholder="请输入" autosize={{ minRows: 1, maxRows: 6 }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={10} sm={24}>
            <FormItem
              label={
                <span>
                  是否载货&nbsp;
                  <Tooltip title="重大风险：请询问车辆是否载货。">
                    <Icon type="info-circle-o" style={{ marginRight: 4, color: 'red' }} />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('isCargo', {
                initialValue: '3',
              })(
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="2">否</Radio>
                  <Radio value="3">不详</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
            <FormItem
              label={
                <span>
                  报案人言语不清&nbsp;
                  <Tooltip title="重大风险：请根据客户言语表达情况准确点选。">
                    <Icon type="info-circle-o" style={{ marginRight: 4, color: 'red' }} />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('reporterUnclear', {
                initialValue: '3',
              })(
                <Radio.Group>
                  <Radio value="1">是</Radio>
                  <Radio value="2">否</Radio>
                  <Radio value="3">不详</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }

  renderDispatchForm() {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    return (
      <Form layout="inline">
        <Card>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={6} sm={12}>
              <FormItem label="任务名称">
                {getFieldDecorator('taskName', { initialValue: '现场任务' })(
                  <Input style={{ width: '100%' }} disabled />
                )}
              </FormItem>
            </Col>
            <Col md={6} sm={12}>
              <FormItem label="标的名称">
                {getFieldDecorator('subjectName', { initialValue: '' })(
                  <Input style={{ width: '100%' }} disabled />
                )}
              </FormItem>
            </Col>
            <Col md={6} sm={12}>
              <FormItem label="第一现场查勘">
                {getFieldDecorator('firstScene')(
                  <Select placeholder="请选择">
                    <Option value={1}>是</Option>
                    <Option value={2}>否</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={6} sm={12}>
              <FormItem label="查勘地点">
                {getFieldDecorator('surveyTotalPlace')(
                  <Input.TextArea autosize={{ minRows: 1, maxRows: 6 }} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={6} sm={12}>
              <FormItem label="查勘员工号">{getFieldDecorator('surveyor')(<Input />)}</FormItem>
            </Col>
            <Col md={6} sm={12}>
              <FormItem label="姓名">{getFieldDecorator('surveyorName')(<Input />)}</FormItem>
            </Col>
            <Col md={6} sm={12}>
              <FormItem label="查看员电话">
                {getFieldDecorator('surveyorPhone')(<Input />)}
              </FormItem>
            </Col>
            <Col md={6} sm={12}>
              <Button
                htmlType="button"
                type="primary"
                style={{ paddingLeft: 10, paddingRight: 10, marginRight: 10 }}
              >
                GPS查勘人
              </Button>
              <Button htmlType="button" style={{ paddingLeft: 10, paddingRight: 10 }}>
                查勘员
              </Button>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={18} sm={12} />
            <Col md={4} sm={12}>
              <FormItem>
                {getFieldDecorator('autoScheduling')(<Checkbox>智能调度</Checkbox>)}
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={6} sm={12}>
              <FormItem label="任务名称">
                {getFieldDecorator('taskName1', { initialValue: '现场任务' })(
                  <Input style={{ width: '100%' }} disabled />
                )}
              </FormItem>
            </Col>
            <Col md={6} sm={12}>
              <FormItem label="标的名称">
                {getFieldDecorator('subjectName1', { initialValue: '' })(
                  <Input style={{ width: '100%' }} disabled />
                )}
              </FormItem>
            </Col>
            <Col md={6} sm={12}>
              <FormItem label="车辆号牌种类">
                {getFieldDecorator('carNoType1')(
                  <Select placeholder="请选择">
                    <Option value={1}>小型汽车</Option>
                    <Option value={2}>大型汽车</Option>
                    <Option value={3}>挂车</Option>
                    <Option value={4}>军队</Option>
                    <Option value={5}>轻便摩托车</Option>
                    <Option value={6}>农用摩托车</Option>
                    <Option value={7}>拖拉机</Option>
                    <Option value={8}>教练汽车</Option>
                    <Option value={9}>其他</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={6} sm={12}>
              <FormItem label="查勘地点">
                {getFieldDecorator('surveyTotalPlace1')(
                  <Input.TextArea autosize={{ minRows: 1, maxRows: 6 }} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={6} sm={12}>
              <FormItem label="查勘员工号">{getFieldDecorator('surveyor1')(<Input />)}</FormItem>
            </Col>
            <Col md={6} sm={12}>
              <FormItem label="姓名">{getFieldDecorator('surveyorName1')(<Input />)}</FormItem>
            </Col>
            <Col md={6} sm={12}>
              <FormItem label="查看员电话">
                {getFieldDecorator('surveyorPhone1')(<Input />)}
              </FormItem>
            </Col>
            <Col md={6} sm={12}>
              <Button
                htmlType="button"
                type="primary"
                style={{ paddingLeft: 10, paddingRight: 10, marginRight: 10 }}
              >
                GPS查勘人
              </Button>
              <Button htmlType="button" style={{ paddingLeft: 10, paddingRight: 10 }}>
                查勘员
              </Button>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={18} sm={12} />
            <Col md={4} sm={12}>
              <Button htmlType="button" type="primary">
                定位修理厂
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    );
  }

  render() {
    const {
      report: { data },
      loading,
    } = this.props;

    return (
      <PageHeaderWrapper title="报案">
        <Card bordered={false}>
          <div className={styles.title}>车险保单信息查询</div>
          <div className={tableListStyles.tableList}>
            <div className={tableListStyles.tableListForm}>{this.renderForm()}</div>
            <Table
              columns={this.columns}
              dataSource={data.list}
              loading={loading}
              onRow={this.handleClickRow}
              pagination={false}
              style={{ marginBottom: 6 }}
            />
            <div className={styles.warningMsg}>
              <span>风险提示</span>
              <span>{data.warningMsg}</span>
            </div>
          </div>

          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>案件受理</div>
          <div className={tableListStyles.tableList}>
            <div className={tableListStyles.tableListForm}>{this.renderWarningForm()}</div>
          </div>

          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>信息提醒</div>
          <div className={tableListStyles.tableList}>
            <div className={tableListStyles.tableListForm}>{this.renderMsgFrom()}</div>
          </div>

          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>调度信息</div>
          <div className={tableListStyles.tableList}>
            <div className={tableListStyles.tableListForm}>{this.renderDispatchForm()}</div>
          </div>

          {/*<Divider style={{ marginBottom: 32 }} />*/}
          <Button htmlType="button" type="primary" style={{ marginRight: 15, marginTop: 10 }}>
            提交
          </Button>
          <Button htmlType="button" type="primary" style={{ marginRight: 15, marginTop: 10 }}>
            发送短信
          </Button>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ReportCase;
