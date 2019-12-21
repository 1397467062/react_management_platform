import React,{Component} from "react"

import { Form, Select,  Row, Col,Breadcrumb,Input,Button, Table, Divider, Tag ,Modal,Icon,Pagination, message} from 'antd';

import "../../assets/css/PatientManage.css"
import http from "../../server"
const { Option } = Select;
class role extends Component{
    constructor(props){
        super(props);

        this.state={
            data:[],//表格数据
            page:1,//当前显示页
            number:0,//总页数
            roleId:"",//删除id
            userName:"",//登录姓名
            title:"新增",
            newshow:false,//新增弹框显示
            //表单标题
            columns:[
                {
                    title: '角色名',
                    dataIndex: 'name',
                    width: 300,
                },
                {
                    title: '角色英文名',
                    dataIndex: 'Englishname',
                    key: 'age',
                    width: 150,
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.age - b.age,
                },
                {
                    title: '角色权限',
                    dataIndex: 'jurisdiction',
                    key: 'jurisdiction',
                    width: 150,
                },

                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    render: (text, record) => (
                        <span>
                             <Button style={{"marginRight":"10px"}} type="danger" size="small"  onClick={ ()=>{ this.showModal(text,1) } }>删除</Button>

                             <Button  type="primary" size="small"  onClick={ ()=>{ this.showModal(text) } }>编辑</Button>
                        </span>
                    ),
                },
            ],
            visible: false,//弹出框
            loading:false,//加载中
        }
    }

    //显示删除弹框
    showModal = (e,index) => {
        if(index==1){
            this.setState({
                visible: true,
                roleId:e.key
            },() => {
                console.log(this.state.roleId)
            });
        }else {
            console.log(e)
            this.props.form.setFieldsValue({
                'name': e.name,
                "nglishename":e.Englishname,
                "Gender":e.jurisdiction
            })
             this.setState({
                 newshow: true,
                 roleId:e.key,
                 title:"修改"
             })
        }


    };
    //确定
    handleOk = e => {

        this.setState({
            visible: false,
        });
        this.deleteOK()


    };

    //删除请求
    async deleteOK(){
        let data={
            roleId:this.state. roleId
        }
        const  res =await http.post("tjRole/delRole",data)

        if(res.data.status=="200"){
            this.getdata()
            message.success('成功删除数据');
        }else {

        }
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            newshow:false,
        });
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    // // 在渲染前调用12
    componentDidMount() {
        this.getdata()
    }
    //分页显示
    onChange=(pageNumber) =>{
        this.setState({
            page:pageNumber
        },() => {
            this.getdata()
            console.log(this.state.page);
        })
    }
    //新增显示
    addshow=()=>{
          this.setState({
              newshow:true
          })
    }
    //确定新增
    async addOk(item){

        let data={
            roleName:item.name,
            roleType:item.Gender,
            roleCode:item.nglishename,

        }
        const  res =await http.post("tjRole/addRole",data)
        if(res.data.status=="200"){

            this.setState({
                newshow:false
            })
            message.success('成功添加数据');
            this.getdata()
            this.props.form.setFieldsValue({
                'name': "",
                "nglishename":"",
                "Gender":""
            })


        }else {

        }
    }


    async getdata(){
        this.setState({
            loading:true,
        })
        let data={
            page:this.state.page,
            rows:10,

            userName:this.state.userName,

        }
        const  res =await http.get("tjRole/findTjRole",data)
        if(res.data.status=="200"){
            var  listData=[];
            console.log(res.data.data)
            for (var i=0;i<res.data.data.length;i++) {
                listData.push({
                    key: res.data.data[i].roleId,
                    name: res.data.data[i].roleName,
                    Englishname: res.data.data[i].roleCode,
                    nickname: res.data.data[i].nickName,
                    jurisdiction:res.data.data[i].roleType==1?"授权":"操作",
                })
            }
            this.setState({
                loading:false,
                data:listData,
                number:res.data.data.totalRecord
            })
            console.log(this.state.loading)

        }else {

        }
    }

    //表单验证
    handleSubmit = e => {
        e.preventDefault();
                       this.props.form.validateFields((err, values) => {
                    if (!err) {
                        if(this.state.title=="新增"){
                            this.addOk(values)
                        }else {
                            this.compile(values)
                        }

                console.log('Received values of form: ', values);
            }
        });
    };
    //编辑
    async compile(item){
        console.log(item)
        let data={
            roleName:item.name,
            roleType:1,
            roleCode:item.nglishename,
            roleId:this.state. roleId
        }
        const  res =await http.post("tjRole/updateRole",data)
        if(res.data.status=="200"){
            this.setState({
                newshow:false
            })
            message.success('成功修改数据');
            this.getdata()
        }else {

        }
    }
    handleSelectChange = value => {
        console.log(value);

    };
    componentWillUnmount(){
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return;
        }
    }



    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                {/*     头部*/}
                <Row>
                    <Col span={8}><strong>角色管理</strong></Col>
                    <Col span={4} offset={12}>
                        <Breadcrumb>
                            <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                            <Breadcrumb.Item>角色管理</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <br/>
                <Row >
                    <Col span={2}> <Button type="primary" onClick={this.addshow}>新增</Button></Col>
                </Row>
                {/*  表格  */}
                <Table     pagination={false} loading={ this.state.loading } style={{ wordBreak: 'break-all' }} className="table" columns={this.state.columns} dataSource={this.state.data} bordered    />
                <div className="paging">
                    <Pagination showQuickJumper defaultCurrent={1} total={this.state.number} onChange={this.onChange} disabled />
                </div>

                {/*  弹出框   */}
                <Modal title="提示" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div className="madelText"><Icon style={{  }} type="exclamation-circle" /> 确定要删除此条数据?</div>
                </Modal>
                {/*  新增弹出框  */}

                <Modal title={this.state.title} visible={this.state.newshow} onOk={this.handleSubmit} onCancel={this.handleCancel}
                >
                    <Form  onSubmit={this.handleSubmit} labelCol={{ span: 6}} wrapperCol={{ span: 17 }}>
                        <Form.Item label="角色名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入角色名!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="角色英文名称">
                            {getFieldDecorator('nglishename', {
                                rules: [{ required: true, message: '请输入角色英文名！' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="角色权限"  >
                            {getFieldDecorator('Gender', {
                                rules: [{ required: true, message: '请选择角色!' }],
                            })(
                                <Select placeholder="请选择角色" onChange={this.handleSelectChange}>
                                    <Option value="1">仅查看</Option>
                                    <Option value="2">可操作</Option>
                                </Select>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>

            </div>
        )
    }

}
const WrappedNormalLoginForm = Form.create({ name: 'role' })(role)
export default WrappedNormalLoginForm;
