import React,{Component} from "react"

import { DatePicker,Form, Select,  Row, Col,Breadcrumb,Input,Button, Table ,Modal,Icon,Pagination, message} from 'antd';
import "../../assets/css/journal.css"
import http from "../../server"
import moment from 'moment';
import 'moment/locale/zh-cn';
import {Resizable} from "react-resizable"
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'YYYY-MM-D';
moment.locale('zh-cn');

const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
        </Resizable>
    );
};


class journal extends Component{

    constructor(props){
        super(props);
        this.state={
            data:[],//表格数据
            page:1,//当前显示页
            number:0,//总页数
            roleId:"",//删除id
            userName:"",//登录姓名
            Date:[],//时间
            logName:"",//操作名
            //表单标题
            loading:false,//加载中
            columns:[
                {
                    title: '操作人',
                    dataIndex: 'name',
                    width: 150,
                },
                {
                    title: '操作日志',
                    dataIndex: 'journal',
                    key: 'journal',
                    width: 250,
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.age - b.age,
                },
                {
                    title: '操作功能类型',
                    dataIndex: 'type',
                    key: 'type',
                    width: 50,
                },
                {
                    title: '操作内容',
                    dataIndex: 'content',
                    key: 'content',
                    width: 150,
                },
                {
                    title: '修改时间',
                    dataIndex: 'amendTime',
                    key: 'amendTime',
                    width: 150,
                },
            ],

        }
    }

    //日期选择
    Change=(date, dateString)=> {
        this.setState({
            Date: dateString
        })
    }
    //查询
    inquire=()=>{
         this.state.page=1
         this.getdata()
    }
    //时间
    formatTime(row, column) {
        let date = new Date(parseInt(row) );
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D +h + m + s;
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



    //获取列表
    async getdata(){
        this.setState({
            loading:true,
        })
        let data={
            pageNum:this.state.page,
            pageSize:10,
            startDate:this.state.Date[0],
            endDate:this.state.Date[1],
            loginName:this.state.logName

        }
        const  res =await http.get("operatorlog/findOperatorLog",data)
        if(res.data.status=="200"){
            var  listData=[];
            console.log(res.data.data.datas)
            for (var i=0;i<res.data.data.datas.length;i++) {
                listData.push({
                    key: res.data.data.datas[i].operatorLogId,
                    name: res.data.data.datas[i].loginName,
                    journal:res.data.data.datas[i]. operator,
                    type:res.data.data.datas[i].funType==1?"新增":res.data.data.datas[i].funType==2?"修改":"删除",
                    content:res.data.data.datas[i].content,
                    amendTime:this. formatTime(res.data.data.datas[i].operatorTime)

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
    //获取搜索登录名
    nameChange=(e)=>{
        this.setState({
            logName:e.target.value
        })

    }

    components = {
        header: {
            cell: ResizeableTitle,
        },
    };
    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { columns: nextColumns };
        });
    };
    render() {
        const columns = this.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: this.handleResize(index),
            }),
        }));
        return (
            <div>
                {/*     头部*/}
                <Row>
                    <Col span={8}><strong>操作日志查询</strong></Col>
                    <Col span={4} offset={12}>
                        <Breadcrumb>
                            <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                            <Breadcrumb.Item>操作日志查询</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <br/>
                <Row gutter={16}>
                    <Col span={3}><Input placeholder="请输入操作人" allowClear onChange={this.nameChange} /></Col>
                    <Col span={6}>
                        <RangePicker
                            defaultValue={[moment('2019-01-01', dateFormat), moment('2019-01-01', dateFormat)]}
                            format={dateFormat}
                            onChange={this.Change}
                        />
                    </Col>
                    <Col span={2}> <Button type="primary" onClick={this.inquire}>查询</Button></Col>
                </Row>
                {/*  表格  */}
                <Table     pagination={false} loading={ this.state.loading } style={{ wordBreak: 'break-all' }} className="table" components={this.components}  columns={columns}  dataSource={this.state.data} bordered    />
                <div className="paging">
                    <Pagination showQuickJumper defaultCurrent={1} total={this.state.number} onChange={this.onChange} />
                </div>
            </div>
        )
    }

}
const WrappedNormalLoginForm = Form.create({ name: 'journal' })(journal)
export default WrappedNormalLoginForm;
