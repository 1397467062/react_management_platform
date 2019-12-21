import React,{Component} from "react"
import {Tree, Table, Divider, Tag, Row, Col, Breadcrumb, Icon, Button,Spin } from 'antd';
import http from "../../server"
import "../../assets/css/regionManage.css"
import  Treetable  from "../communal/treeTable/treeTable"
import storage from "../../assets/js/storage";

//表单内容

class regionManage extends Component{
    constructor(props){
        super(props);
        this.state={
            addressData:[],//地理数据
            notShow:false,//
            show:false,
        }
    }
    // 在渲染前调用

    componentDidMount(){
        this.getdata()
    }
    componentWillUnmount(){
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return;
        }
    }
    async getdata(){
        let data={

        }
        this.setState({
            show:true,
        })
        const res=await http.get("area/mFindAreaAll",data)
        if(res.data.status==200){
            this.setState({
                addressData:res.data.data,
                notShow:true,
                show:false,
            })
            console.log(this.state. addressData)
        }

    }
    render() {
        return (
               <div>
                   {/*头部*/}
                   <Row>
                       <Col span={8}><strong>地区管理</strong></Col>
                       <Col span={4} offset={12}>
                           <Breadcrumb >
                               <Breadcrumb.Item>{this.state.newvisible}系统管理</Breadcrumb.Item>
                               <Breadcrumb.Item>地区管理</Breadcrumb.Item>
                           </Breadcrumb>
                       </Col>
                   </Row>
                   <br/>
                   {/*表格头部*/}
                   <div className="tree-table">
                       <div className="tree-head">
                           <table >
                               <tbody>
                                  <tr>
                                      <td className="td1">地区</td>
                                      <td className="td4">等级</td>
                                      <td className="td5">子菜单数量</td>
                                      <td className="td6">操作</td>
                                  </tr>
                               </tbody>

                           </table>
                       </div>
                   </div>
                {/*   表格内容 */}
                   <div  className="treetable">
                       {/*加载*/}
                       <div  style={{"textAlign": "center","display":this.state.show?"block":"none"}}><Spin size="large" /></div>

                       {/*内容*/}
                       {this.state.addressData.map((comment) => (
                           <Treetable    arr={comment} key={comment.areaId}></Treetable>
                       ))}

                   </div>

               </div>
        )
    }

}
export default regionManage;
