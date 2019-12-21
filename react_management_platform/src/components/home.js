import React,{Component} from "react"

import {HashRouter as Router,Route,Link} from "react-router-dom"
import getdata from "./../assets/js/route"
//引入自定义模块
import storage from "../assets/js/storage"
import  patientManage from "./system/PatientManage"//患者管理
import userManage from "./system/userManage"//用户管理
import regionManage from "./system/regionManage"//运营管理
import role from  "./system/role"
import  journal from "./system/journal"
import brokerManage from "./system/brokerManage"
// 医药管理
import drug from "./medicine/drug"//药品管理
import clinic from "./medicine/clinic"


import {Menu, Icon, Switch, Layout,  Dropdown, Button, Form,} from 'antd';
import "../assets/css/home.css"
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"张三",
            username:"",
            collapsed: false,
            mode: 'inline',
            theme: 'light',
            menu:"1"

        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    changeMode = value => {
        this.setState({
            mode: value ? 'vertical' : 'inline',
        });
    };
    change=(e)=>{
        console.log(e.key)
        storage.set("menu",e.key)

    }
    componentWillMount(){
         console.log(getdata.get())
        this.setState({
            menu: storage.get("menu").toString()
        },function () {

        })

    }
    componentDidMount() {

    }
    login=()=>{
        storage.remove("token")
        storage.remove("userId")
        storage.remove("userName")
        storage.remove("loginName")
        storage.remove("roleCode")
        storage.remove("roleId")
        this.props.history.push({pathname:"/",query:{}})
    }



       render() {
           const listItems = getdata.get().map((item,index) =>
                   <SubMenu key={index}  onClick={this.change} title={<span><Icon type="setting" /><span>{item.name}</span></span>}>
                       {
                           item.children.map((it,indexs) =>

                               <Menu.Item key={index+""+indexs}>
                                   <Link to={it.path}>{it.name}</Link>
                               </Menu.Item>
                           )
                       }
                   </SubMenu>
           );

        const menu = (
            <Menu>
              <Menu.Item>
                  <div onClick={this.login}>退出登录</div>
              {/* <Link to="/">111111</Link> */}
                {/* <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                  1st menu item
                </a> */}
              </Menu.Item>
            </Menu>
          );
        return (
            <Router>
            <Layout>
                <Sider className="menus" trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" >
                        <img src={require('./../assets/images/logo.png')} />
                        医 联 康 众
                    </div>
                    <Menu   defaultSelectedKeys={[this.state.menu]} defaultOpenKeys={['sub0']} mode={this.state.mode} theme={this.state.theme}>
                        {listItems}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{  padding: 0 }}>
                        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/>
                         <Dropdown overlay={menu}>
                            {/* <a className="ant-dropdown-link" href="#">
                            Hover me <Icon type="down" />
                            </a> */}
                            <p className="login">
                                <img className="login_img" src= {require('../assets/images/mr_header.png')} />
                            </p>
                        </Dropdown>

                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,}}>
                            <Route strict   path="/home/patientManage" component={patientManage} />
                            <Route  path="/home/userManage" component={userManage} />
                            <Route  path="/home/regionManage" component={regionManage} />
                            <Route  path="/home/brokerManage" component={brokerManage} />
                            <Route  path="/home/role" component={role} />
                            <Route  path="/home/journal" component={journal} />
                            <Route  path="/home/drug" component={drug}/>
                            <Route  path="/home/clinic" component={clinic}/>

                    </Content>
                </Layout>
            </Layout>
            </Router>
    )


    }

}
export default Home;
