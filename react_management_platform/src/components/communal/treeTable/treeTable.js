import React,{Component} from "react"
import "../../../assets/css/treeTable.css"
import {Icon, Row, Col, Breadcrumb,Button } from 'antd';
import Teetable from "./treeTable"
class treeTable extends Component {
    constructor(props){
        super(props);
        this.state={
            display:"none",
            showId:"0",
            thereId:"0"
        }
    }
    // 在渲染前调用
    componentDidUpdate (){


    }
    //点击显示
    handleClick=()=>{
        this.setState(prevState => ({
            display: this.state.display=="block" ? 'none': 'block'
        }));
        console.log(this.state.display)
    }
    tableShow=(id)=>{
        if(id==this.state. showId){
            this.setState({
                showId:"0"
            })
        }else {
            this.setState({
                showId:id
            })
        }


    }
    componentDidMount() {
        // console.log(this.props.arr)
    }

    render() {
        return (
            <div className="tree-body" >
                {/*加载*/}

                {/*第一级*/}
                <table >
                    <tbody>
                      <tr>
                          <td>
                              <table >
                                  <tbody style={{width:"100%"}}>
                                         <tr >
                                             <td  onClick={this.handleClick}  style={{width:"300px"}}><Icon type="caret-right"  /> {this.props.arr.areaName}</td>
                                             <td > {this.props.arr.areaLevel}</td>
                                             <td >{this.props.arr.childrenNum}</td>
                                             <td style={{width:"250px"}}>
                                                 <Row gutter={16}>
                                                     <Col className="gutter-row" span={6}>
                                                         <Button size="small" type="primary">新增</Button>
                                                     </Col>
                                                     <Col className="gutter-row" span={6}>
                                                         <Button size="small" >编辑</Button>
                                                     </Col>
                                                     <Col className="gutter-row" span={6}>
                                                         <Button size="small" type="danger">删除</Button>
                                                     </Col>
                                                 </Row>
                                             </td>
                                         </tr>
                                  </tbody>
                               </table>
                          </td>
                      </tr>
                    </tbody>
                </table>
                {/*   内容*/}
                {
                    this.props.arr.children.map((comment) => (
                        <table   key={comment.areaId} >
                            <tbody>
                            <tr>
                                <td>
                                    <table >
                                        <tbody style={{width:"100%"}}>

                                        <tr  onClick={e =>this.tableShow(comment.areaId)}>
                                            <td  style={{width:"300px","paddingLeft":"20px"}}><Icon type="caret-right"  /> {comment.areaName}</td>
                                            <td style={{width:"350px"}} > {comment.areaLevel}</td>
                                            <td  style={{width:"350px"}}>{comment.childrenNum}</td>
                                            <td style={{width:"250px"}}>
                                                <Row gutter={16}>
                                                    <Col className="gutter-row" span={6}>
                                                        <Button size="small" type="primary">新增</Button>
                                                    </Col>
                                                    <Col className="gutter-row" span={6}>
                                                        <Button size="small" >编辑</Button>
                                                    </Col>
                                                    <Col className="gutter-row" span={6}>
                                                        <Button size="small" type="danger">删除</Button>
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                        {/*   第三级 */}

                                               {
                                                   comment.children.map((item) => (
                                                       <tr key={item.areaId}  style={{display:this.state. showId==item.areaParent?"table-row":"none"}}>
                                                           <td colSpan="4" >
                                                       <table>
                                                           <tbody>
                                                           <tr>
                                                               <td>
                                                                   <table style={{width:"100%"}}>
                                                                       <tbody style={{width:"100%"}}>
                                                                       <tr  >
                                                                           <td  style={{width:"300px","paddingLeft":"40px"}}><Icon type="caret-right"  /> {item.areaName}</td>
                                                                           <td style={{width:"350px"}} > {item.areaLevel}</td>
                                                                           <td  style={{width:"350px"}}>{item.childrenNum}</td>
                                                                           <td style={{width:"250px"}}>
                                                                               <Row gutter={16}>
                                                                                   <Col className="gutter-row" span={6}>
                                                                                       <Button size="small" type="primary">新增</Button>
                                                                                   </Col>
                                                                                   <Col className="gutter-row" span={6}>
                                                                                       <Button size="small" >编辑</Button>
                                                                                   </Col>
                                                                                   <Col className="gutter-row" span={6}>
                                                                                       <Button size="small" type="danger">
                                                                                           删除
                                                                                       </Button>
                                                                                   </Col>
                                                                               </Row>
                                                                           </td>
                                                                       </tr>
                                                                       {/*第四级*/}

                                                                        {
                                                                            // React.Children.map(item.childrenNum!=0?item.children:[],data=>(
                                                                            //     <div>q</div>
                                                                            // ))
                                                                            (item.childrenNum!=0?item.children:[]).map(item=> (

                                                                                <tr key={item.areaId}  style={{display:this.state. thereId==item.areaParent?"table-row":"none"}}>
                                                                                    <td colSpan="4" >
                                                                                        <table>
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <table style={{width:"100%"}}>
                                                                                                        <tbody style={{width:"100%"}}>
                                                                                                        <tr  >
                                                                                                            <td  style={{width:"300px","paddingLeft":"40px"}}><Icon type="caret-right"  /> {item.areaName}</td>
                                                                                                            <td style={{width:"350px"}} > {item.areaLevel}</td>
                                                                                                            <td  style={{width:"350px"}}>{item.childrenNum}</td>
                                                                                                            <td style={{width:"250px"}}>
                                                                                                                <Row gutter={16}>
                                                                                                                    <Col className="gutter-row" span={6}>
                                                                                                                        <Button size="small" type="primary">新增</Button>
                                                                                                                    </Col>
                                                                                                                    <Col className="gutter-row" span={6}>
                                                                                                                        <Button size="small" >编辑</Button>
                                                                                                                    </Col>
                                                                                                                    <Col className="gutter-row" span={6}>
                                                                                                                        <Button size="small" type="danger">
                                                                                                                            删除
                                                                                                                        </Button>
                                                                                                                    </Col>
                                                                                                                </Row>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>






                                                                                ))
                                                                        }
                                                                       </tbody>
                                                                   </table>
                                                               </td>
                                                           </tr>
                                                           </tbody>
                                                       </table>
                                                           </td>
                                                       </tr>
                                                   ))
                                               }

                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                 ))
                }

            </div>
        )
    }

}
export default treeTable;
