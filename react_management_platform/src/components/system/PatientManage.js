import React,{Component} from "react"
import { Row, Col, Breadcrumb ,Input,Button, Table, Divider, Tag ,Modal,Icon,Pagination, message} from 'antd';
import "../../assets/css/PatientManage.css"
import http from "../../server"







class PatientManage extends Component{



    constructor(props){
        super(props);

        this.state={
             data:[],//表格数据
             page:1,//当前显示页
             number:0,//总页数
             deleteId:"",//删除id
             userName:"",//登录姓名
            //表单标题
             columns:[
                {
                    title: '登录',
                    dataIndex: 'name',
                    width: 300,
                },
                {
                    title: '性别',
                    dataIndex: 'age',
                    key: 'age',
                    width: 150,
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.age - b.age,
                },
                {
                    title: '昵称',
                    dataIndex: 'nickname',
                    key: 'nickname',
                    width: 150,
                },
                {
                    title: '诊所名称',
                    dataIndex: 'address',
                    key: 'address',
                    width: 150,
                },
                {
                    title: '个人档案',
                    dataIndex: 'isNullMedicalRecord',
                    key: 'aisNullMedicalRecord',
                    width: 150,
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    render: (text, record) => (
                        <span><Button type="danger" size="small"  onClick={ ()=>{ this.showModal(text) } }>删除</Button></span>
                    ),
                },
            ],
             visible: false,//弹出框
             loading:false,//加载中
        }
    }

    //显示删除弹框
    showModal = (e) => {

        this.setState({
            visible: true,
            deleteId:e.key
        },() => {
            console.log(this.state. deleteId)
        });

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
            userId:this.state.deleteId
        }
        const  res =await http.post("userManager/delUser",data)

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
        });
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    componentWillUnmount(){
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return;
        }
    }
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
    //搜索框赋值
    seek=(e)=>{
           this.setState({
               userName:e.target.value
           })
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
        const  res =await http.get("userManager/findUser",data)
        if(res.data.status=="200"){
               var  listData=[];
               for (var i=0;i<res.data.data.datas.length;i++) {
                    listData.push({
                        key: res.data.data.datas[i].userId,
                        name: res.data.data.datas[i].loginName,
                        age: res.data.data.datas[i].gender==1?"男":res.data.data.datas[i].gender=="2"?"女":"保密",
                        nickname: res.data.data.datas[i].nickName,
                        isNullMedicalRecord:res.data.data.datas[i].isNullMedicalRecord==1?"存在":"不存在",
                        tags: [],
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



    render() {


        return (
             <div>
                 {/*     头部*/}
                 <Row>
                     <Col span={8}><strong>患者管理</strong></Col>
                     <Col span={4} offset={12}>
                         <Breadcrumb >
                             <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                             <Breadcrumb.Item>患者管理</Breadcrumb.Item>
                         </Breadcrumb>
                     </Col>
                 </Row>
                 <br/>
                 <Row gutter={16}>
                     <Col span={4}><Input onChange={this.seek} placeholder="请输入登录名" className="searchInput" />  </Col>
                     <Col span={2}> <Button type="primary" onClick={this.getdata.bind(this)}>查询</Button></Col>
                 </Row>
                {/*  表格  */}
                 <Table     pagination={false} loading={ this.state.loading } style={{ wordBreak: 'break-all' }} className="table" columns={this.state.columns} dataSource={this.state.data}   />
                 <div className="paging">
                     <Pagination showQuickJumper defaultCurrent={1} total={this.state.number} onChange={this.onChange}/>
                 </div>

               {/*  弹出框   */}
                 <Modal title="提示" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                     <div className="madelText"><Icon style={{  }} type="exclamation-circle" /> 确定要删除此条数据?</div>
                 </Modal>

            </div>
        )
    }

}
export default PatientManage;
