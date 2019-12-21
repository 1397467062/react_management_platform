import "../assets/css/register.css"
import React,{Component} from "react"
import http from "../server"
import {Form, Icon, Input, Button, Checkbox, Row, Link, Col,message } from 'antd';
//引入自定义模块
import storage from "../assets/js/storage"
class register extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"张三",
            username:"",
            collapsed: false,
            mode: 'inline',
            theme: 'light',
        }
    }
    //验证
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(err)
            console.log(values)
            if (!err) {
                console.log('Received values of form: ', values);
                this.register(values)
            }
        });
    }
    //登录1
    async register(value){
        console.log(value)
        let data={
            loginName:value.username,
            password: value.password

        }
        const  res =await  http.post("/login",data)
        console.log(res.data.status)
        if(res.data.status=="200"){
            console.log(res.data)
            let token = res.data.data.token
            let userId = res.data.data.userId
            let userName = res.data.data.userName
            let loginName = res.data.data.loginName
            let role = res.data.data.roleId.role;
            let roleCode = [];
            let roleId = []
            for (let i = 0; i < role.length; i++) {
            roleCode.push(role[i].roleCode);
            }
            for (let i = 0; i < role.length; i++) {
            roleId.push(role[i].roleId);
            }
            // console.log(roleCode)
            // console.log(roleCode.join(","));
            roleCode = roleCode.join(",")
            // console.log(roleId)
            roleId = roleId.join(",")
            storage.set("menu",1)

            storage.set("token",token)
            storage.set("userId",userId)
            storage.set("userName",userName)
            storage.set("loginName",loginName)
            storage.set("roleCode",roleCode)
            storage.set("roleId",roleId)
            this.props.history.push({pathname:"/home/patientManage",query:{}})
        }else{
                message.error('请输入正确的用户名和密码');
        }

        // this.props.history.push({pathname:"/home",query:{}})
    }

    componentDidMount() {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="logBox">
                <Row>
                    <Col span={24} className="title">系统登录</Col>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入账号!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住密码</Checkbox>)}
                            {/*onClick={this.register}*/}
                            <Button block  type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </div>
        )



    }

}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(register)
export default WrappedNormalLoginForm;
