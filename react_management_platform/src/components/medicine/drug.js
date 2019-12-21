import React,{Component} from "react"

import { DatePicker,Form, Select,  Row, Col,Breadcrumb,Input,Button, Table ,Upload ,Modal,Icon,Pagination,Option, message} from 'antd';

import "../../assets/css/App.css"
import http from "../../server"
import storage from "../../assets/js/storage"
import {baseUrl}from "../../server"

import picture from "../../assets/js/picture"
import {get} from "../../assets/js/picture"



class drug extends Component{
    constructor(props){
        super(props);

        this.state={
            // 新增
            loginName:"",//新增通用名
            firstDeptlist:[],//新增一级科室
            secondDeptlist:[],//新增二级科室
            secondDeptid:"",//新增二级科室id
            classifylist:[],//新增药品分类
            classifyid:"",//新增药品分类id
            userPhotoUrl:"",//新增上传图片
            packaging:"",//新增包装

            // 搜索
            medicineIdlist2:[],//搜索二级药理分类
            medicineIdlist:[],//搜索一级药理分类
            medicineCategoryId2:"",//搜索二级药理id
            medicineCategoryId1:1,//搜索一级药理id
            userType:"",//搜索药理一级分类
            medicinePrice:"",//药品价格
            medicineName:"",//药品名称
            medicineCategoryId:"",//药品分类主键
            rows:10,//每页行数
            page:1,//当前显示页
            data:[],//表格数据
            columns:[
                {
                    title: '通用名',
                    dataIndex: 'medicineName',
                    key:'medicineName',
                    width: 50,
                },
                {
                    title: '商品名',
                    dataIndex: 'commonName',
                    key: 'commonName',
                    width: 50,
                },
                {
                    title: '用药禁忌',
                    dataIndex: 'taboo',
                    key: 'taboo',
                    width: 50,
                },
                {
                    title: '用法用量',
                    dataIndex: 'dosage',
                    key: 'dosage',
                    width: 50,
                },
                {
                    title: '规格',
                    dataIndex: 'specification',
                    key: 'specification',
                    width: 50,
                },
                {
                    title: '厂家',
                    dataIndex: 'vender',
                    key: 'vender',
                    width: 50,
                },
                {
                    title: '单位',
                    dataIndex: 'unit',
                    key: 'unit',
                    width: 50,
                },
                {
                    title: '价格(元)',
                    dataIndex: 'price',
                    key: 'price',
                    width: 50,
                },
                {
                    title: '状态',
                    dataIndex: 'putaway',
                    key: 'putaway',
                    width: 50,
                },
                {
                    title: '操作',
                    key: 'rowKey',
                    width: 50,
                    render: (text, record) => (
                        <span>
                            <Button type="danger" size="small" >删除</Button>
                            <Button size="small" type="primary" >编辑</Button>
                        </span>

                    ),
                },
            ],

        }
    }


    componentDidMount() {
        this.getdata()
        this.medicineCategoryId()
    }
    async getdata(){
        let data={
            page:this.state.page,//页数
            rows:this.state.rows,//行数
            medicineCategoryId:this.state.medicineCategoryId,//药品分类主键
            medicineName:this.state.medicineName,//药品名称
            medicinePrice:this.state.medicinePrice,//药品价格
        }
        console.log(data)
        const  res =await http.get("medicineInfo/findMedicineInfo",data)
        console.log(res.data)
        let list = res.data.data.datas
        if(res.data.status==200){
            console.log(list)
            list.forEach((item,key)=>{
                console.log(item)
                let medicinePrice = item.medicinePrice/100
                list[key].price=medicinePrice
                // delFlag  1 上架  2下架
                let putaway = item.delFlag==1?"上架":"下架"
                list[key].putaway = putaway
                list[key].key = key
            })
            console.log(list)
            this.setState({
                data:list,
                number:res.data.data.totalRecord
            })
        }
    }
    // ----------------------------搜索-------------------------------
    async medicineCategoryId(){//搜索一级分类下拉菜单
        let data ={
            medicineCategoryId:this.state.medicineCategoryId1
        }
        const  res =await http.get("medicinecology/findMedicineCategoryByParentId",data)
        console.log(res.data.data)
        let list = res.data.data
        this.setState({
            medicineIdlist:list
        })
    }
    // 获取搜索药品名称
    nameChange=(e)=>{
        this.setState({
            medicineName:e.target.value
        })
        console.log(this.state.medicineName)

    }
    componentWillUnmount(){
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return;
        }
    }
    // 搜索药理一级分类下拉菜单
    firstclassify=(value)=> {//点击下拉菜单中的某个值触发  返回值是value属性中的值
        console.log(`111111: ${value}`);//往后台传序号
        this.setState({
            //userType:value
            medicineCategoryId1:value
        })
        console.log(this.state.medicineCategoryId1)//药理一级分类
        let id = value
        this.medicineCategoryId2(id)
    }
    async medicineCategoryId2(id){//搜索二级分类下拉菜单

        console.log(id)
        let data ={
            medicineCategoryId:id
        }
        const  res =await http.get("medicinecology/findMedicineCategoryByParentId",data)
        console.log(res.data.data)
        let list = res.data.data
        this.setState({
            medicineIdlist2:list
        })
    }
    // 搜索药理二级分类下拉菜单
    secondclassify=(value)=> {//点击下拉菜单中的某个值触发  返回值是value属性中的值
        console.log(`222222: ${value}`);//往后台传序号
        this.setState({
            //userType:value
            medicineCategoryId1:value
        })
        console.log(this.state.medicineCategoryId1)//药理一级分类
    }

    // onBlur=()=> {//失去焦点时的回调
    //     console.log('blur');
    // }

    // onFocus=()=> {//点击下拉菜单触发
    //     console.log('focus');
    // }

    // onSearch(val) {//输入筛选
    //     console.log('search:', val);
    // }

    //分页显示
    onChange=(pageNumber) =>{
        this.setState({
            page:pageNumber
        },() => {
            this.getdata()
            console.log(this.state.page);
        })
    }
    // 点击查询按钮
    inquire=()=>{
        console.log(this.state.medicineName)
        console.log(this.state.medicineCategoryId1)
        let medicineName =this.state.medicineName
        let medicineCategoryId = this.state.medicineCategoryId1
        this.setState({
            medicineName,
            medicineCategoryId
        })
        this.getdata()
    }
    // ------------------------------新增-----------------------------
    //点击新增按钮
    newappend=()=>{
        console.log("点击新增")
        this.setState({
            newvisible: true,
        });
        console.log(this.state.newvisible)
        this.DeptAllfirst()
        this.yaoclassify()

    }
    handleSubmit =(e) => {//新增确定
        e.preventDefault();
        console.log(e)
        console.log(this.state.secondDeptid)//新增二级科室id
        console.log(this.state.classifyid)//新增药品分类id
        console.log(this.state.userPhotoUrl)//新增上传图片
        console.log(this.state.packaging)//新增包装
        this.props.form.validateFields((err, values) => {
            console.log(err)
            console.log(values)


        });
        // medicineInfo/addMedicineInfo
        this.setState({
            newvisible: false,
        });
    }
    //点击X取消新增弹框
    newhandleCancel = e => {
        console.log(e);
        this.setState({
            newvisible: false,
        });
    };
    //新增通用名
    logininput=(e)=>{
        console.log("11111111")
        console.log(e)
        console.log(e.target.value)
        this.setState({
            loginName:e.target.value
        })
    }
    // 新增科室一级名称
    async DeptAllfirst(){//搜索一级分类下拉菜单
        let data ={
            hospitalDeptId:1
        }
        const  res =await http.get("hospitalDept/findHospitalDeptNewByParentId",data)
        // const  res =await http.get("hospitalDept/findHosptitalDeptAll")
        console.log(res.data.data)
        let list = res.data.data
        this.setState({
            firstDeptlist:list
        })
    }
    // 新增一级分类下拉菜单
    firstDept=(value)=> {//点击下拉菜单中的某个值触发  返回值是value属性中的值
        console.log(`111111: ${value}`);//往后台传序号
        // this.setState({
        //     //userType:value
        //     medicineCategoryId1:value
        // })
        // console.log(this.state.medicineCategoryId1)//药理一级分类
        let id = value
        this.DeptAllsecond(id)
    }
    // 新增科室二级名称
    async DeptAllsecond(id){//搜索一级分类下拉菜单
        let data ={
            hospitalDeptId:id
        }
        const  res =await http.get("hospitalDept/findHospitalDeptNewByParentId",data)
        // const  res =await http.get("hospitalDept/findHosptitalDeptAll")
        console.log(res.data.data)
        let list = res.data.data
        this.setState({
            secondDeptlist:list
        })
    }

    // 新增二级分类下拉菜单
    secondDept=(value)=> {//点击下拉菜单中的某个值触发  返回值是value属性中的值
        console.log(`111111: ${value}`);//往后台传序号
        this.setState({
            secondDeptid:value
        })
    }
    // 新增药品分类
    classify=(value)=>{
        console.log("分类id："+value)
        this.setState({
            classifyid:value
        })
    }
    // 新增药品分类
    async yaoclassify(){//搜索分类下拉菜单
        const  res =await http.get("medicinecology/findMedicineCategoryToList")
        // const  res =await http.get("hospitalDept/findHosptitalDeptAll")
        console.log(res.data.data)
        let list = res.data.data
        let lists = list.slice(1);
        this.setState({
            classifylist:lists
        })
    }
    // 新增上传图片
    uploadImg1() {
        let token = storage.get("token")//localStorage.getItem("token");
        console.log(token)
        var reg = new RegExp('"',"g");
        var str = token.replace(reg, "");  
        console.log(str)
        let url =
        baseUrl.url+"fileupload/singleFileUpload/user?token=" + str;
        // "http://192.168.0.118:8080/manager/fileupload/singleFileUpload/user?token=" + str;
        console.log(url)
        return url;
    }
    // beforeUpload(file) {
    //     console.log(file)
    //     const isJPG = file.type === 'image/jpeg';
    //     if (!isJPG) {
    //         message.error('请上传JPG格式的图片!');
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //         message.error('上传图片大小不能超过2MB!');
    //     }
    //     return isJPG && isLt2M;
    // }
    UploadhandleChange = info => {
        console.log(info)
        console.log(info.file.response)
        if(info.file.response != undefined){
            console.log(info.file.response.data)
            this.setState({
                userPhotoUrl:info.file.response.data
            })
        }
        if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        get.getBase.getBase64(info.file.originFileObj, imageUrl =>
        //this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
            imageUrl,
            loading: false,
            }),

        );
        }
    };
    // getBase64(img, callback) {
    //     // console.log(img)
    //     // console.log(callback)
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }
    // 新增包装
    packaging=(value)=>{
        console.log("新增包装"+value)
        let name =""
        if(value==1){
            name ="袋"
        }else if(value==2){
            name = "瓶"
        }else{
            name = "盒"
        }
        this.setState({
            packaging:name
        })
    }
    render() {

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div type="secondary" className="ant-upload-text">点击上传图片</div>
            </div>
        );
        const { imageUrl } = this.state;//新上传照片
        const { Option } = Select;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                {/*     头部*/}
                <Row>
                    <Col span={8}><strong>药品管理</strong></Col>
                    <Col span={4} offset={12}>
                        <Breadcrumb>
                            <Breadcrumb.Item>医药管理</Breadcrumb.Item>
                            <Breadcrumb.Item>药品管理</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <br/>
                <Row gutter={16}>
                    <Col span={3}><Input placeholder="药品名称" allowClear onChange={this.nameChange} /></Col>
                    <Col span={3} className="classify">
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="药理分类一级"
                            optionFilterProp="children"
                            onChange={this.firstclassify}
                            // onFocus={this.onFocus}
                            // onBlur={this.onBlur}
                            // onSearch={this.onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                this.state.medicineIdlist.map((item,key)=>
                                    <Option key={key} value={item.medicineCategoryId}>{item.medicineCategoryName}</Option>
                                )
                            }
                        </Select>
                    </Col>
                    <Col span={3} className="classify">
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="药理分类二级"
                            optionFilterProp="children"
                            onChange={this.secondclassify}
                            // onFocus={this.onFocus}
                            // onBlur={this.onBlur}
                            // onSearch={this.onSearch}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                this.state.medicineIdlist2.map((item,key)=>
                                    <Option key={key} value={item.medicineCategoryId}>{item.medicineCategoryName}</Option>
                                )
                            }
                        </Select>
                    </Col>
                    <Col span={2}> <Button type="primary" onClick={this.inquire}>查询</Button></Col>
                    <Col span={2} className="button">
                         <Button type="primary" onClick={this.newappend}>新增</Button>
                    </Col>
                </Row>
                {/*  表格  */}
                <Table     pagination={false}
                // loading={ this.state.loading }
                 style={{ wordBreak: 'break-all' }}
                 className="table"
                 columns={this.state.columns}
                 dataSource={this.state.data}
                 bordered
                    />
                {/* 新增弹出框 */}
                <Modal
                    title="新增"
                    visible={this.state.newvisible}
                    onOk={this.handleSubmit}
                    onCancel={this.newhandleCancel}
                    width="800px"
                    >
                    <Form onSubmit={this.handleSubmit} labelCol={{ span: 6}} wrapperCol={{ span: 17 }}>
                        <Form.Item label="通用名">
                        {getFieldDecorator('loginname', {
                            rules: [

                            {
                                required: true,
                                message: '请输入通用名',
                            },
                            ],
                        })(<Input  onChange={this.logininput} />)}
                        </Form.Item>
                        <Form.Item label="商品名">
                        {getFieldDecorator('commodityname', {
                            rules: [

                            {
                                required: true,
                                message: '请输入商品名',
                            },
                            ],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="科室名称">
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="一级科室"
                                optionFilterProp="children"
                                onChange={this.firstDept}
                                // onFocus={this.onFocus}
                                // onBlur={this.onBlur}
                                // onSearch={this.onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    this.state.firstDeptlist.map((item,key)=>
                                        <Option key={key} value={item.hospitalDeptId}>{item.hospitalDeptName}</Option>
                                    )
                                }
                            </Select>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="二级科室"
                                optionFilterProp="children"
                                onChange={this.secondDept}
                                // onFocus={this.onFocus}
                                // onBlur={this.onBlur}
                                // onSearch={this.onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    this.state.secondDeptlist.map((item,key)=>
                                        <Option key={key} value={item.hospitalDeptId}>{item.hospitalDeptName}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="药品分类">
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="药品分类"
                                optionFilterProp="children"
                                onChange={this.classify}
                                // onFocus={this.onFocus}
                                // onBlur={this.onBlur}
                                // onSearch={this.onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    this.state.classifylist.map((item,key)=>
                                        <Option key={key} value={item.medicineCategoryId}>{item.medicineCategoryName}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="药品成分">
                        {getFieldDecorator('ingredient', {
                            rules: [

                            {
                                required: true,
                                message: '请输入药品成分',
                            },
                            ],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="用药禁忌">
                        {getFieldDecorator('taboo', {
                            rules: [

                            {
                                required: true,
                                message: '请输入用药禁忌',
                            },
                            ],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="上传图片">
                            <div className="clearfix">
                            <Upload
                                name="files"
                                listType="picture-card"
                                className="avatar-uploader uploadimg"
                                showUploadList={false}
                                action={this.uploadImg1}
                                beforeUpload={picture.beforeUpload}//{this.beforeUpload}
                                onChange={this.UploadhandleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                            </div>
                        </Form.Item>
                        <Form.Item label="主治功能">
                        {getFieldDecorator('Indications', {
                            rules: [

                            {
                                required: true,
                                message: '请输入主治功能',
                            },
                            ],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="用法用量">
                        {getFieldDecorator('dosage', {
                            rules: [

                            {
                                required: true,
                                message: '请输入用法用量',
                            },
                            ],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="药品性状">
                        {getFieldDecorator('TypeStatus', {
                            rules: [

                            {
                                required: true,
                                message: '请输入药品性状',
                            },
                            ],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="不良反应">
                        {getFieldDecorator('untoward', {
                            rules: [

                            {
                                required: true,
                                message: '请输入不良反应',
                            },
                            ],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="相互作用">
                        {getFieldDecorator('interaction', {
                            rules: [

                            {
                                required: true,
                                message: '请输入相互作用',
                            },
                            ],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="贮藏条件">
                        {getFieldDecorator('conditions', {
                            rules: [

                            {
                                required: true,
                                message: '请输入贮藏条件',
                            },
                            ],
                        })(<Input />)}
                        </Form.Item>
                        <Form.Item label="包装">
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="包装"
                                optionFilterProp="children"
                                onChange={this.packaging}
                                // onFocus={this.onFocus}
                                // onBlur={this.onBlur}
                                // onSearch={this.onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="1">袋</Option>
                                <Option value="2">瓶</Option>
                                <Option value="3">盒</Option>
                                {/* {
                                    this.state.classifylist.map((item,key)=>
                                        <Option key={key} value={item.medicineCategoryId}>{item.medicineCategoryName}</Option>
                                    )
                                } */}
                            </Select>
                        </Form.Item>

                    </Form>
                </Modal>
                {/* 分页显示 */}
                <div className="paging">
                    <Pagination showQuickJumper defaultCurrent={1} total={this.state.number} onChange={this.onChange} />
                </div>
            </div>
        )
    }

}
const WrappedNormalLoginForm = Form.create({ name: 'journal' })(drug)
export default WrappedNormalLoginForm;
