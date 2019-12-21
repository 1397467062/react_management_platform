import React,{Component} from "react"
import {Pagination,Transfer,Upload,Radio,Select,Option, Form, Row, Col, Breadcrumb ,Input,Button, Table, Divider, Tag,Modal,Icon,message } from 'antd';

import 'antd/dist/antd.css';
import "../../assets/css/App.css"

import http  from "../../server"
import {baseUrl}from "../../server"
// 上传图片
import picture from "../../assets/js/picture"
import {get} from "../../assets/js/picture"

class userManage extends Component{
    constructor(props){
        super(props);
        this.state={
            userPhotoUrl:"",//上传的头像
            loading: false,//上传图片新
            //穿梭栏
            mockData: [],
            //穿梭栏
            //上传图片
            previewVisible: false,
            previewImage: '',
            fileList: [
            ],
            // loading: false,//上传图片
            gender: "1",//性别
            userType:"",//用户类型
            nickName:"",//昵称
            loginName:"",//登录名称
            newvisible:false,//新增弹框
            visible:false,//删除弹框
            binding:false,//绑定角色弹框
            compile:false,//编辑弹框
            element:{},//编辑传值
            targetKeys:[],//绑定角色弹框之前的数据
            mockData1: [],
            targetKeys1: [],
            appuserId:"",//每一条的id
            page :1,//当前页
            rows:10,//总页数
            number:0,//总页数
            userName:"",
            data:[],//表格数据
            load:false,//加载中
            //表单标题
            columns:[
                {
                    title: '登录名',
                    dataIndex: 'name',
                    width: 150,
                },
                {
                    title: '性别',
                    dataIndex: 'age',
                    key: 'age',
                    width: 150,
                    sorter: (a, b) => a.age - b.age,
                    // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
                },
                {
                    title: '昵称',
                    dataIndex: 'nickName',
                    key: 'nickname',
                    width: 150,
                },
                {
                    title: '诊所名称',
                    dataIndex: 'clinicName',
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
                    title: '角色名称',
                    dataIndex: 'roleName',
                    key: 'roleName',
                    width: 150,
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    render: (text, record) => (
                        <span>
                            <Button type="danger" size="small" onClick={()=>{this.showModal(text)}}>删除</Button>
                            <Button size="small" onClick={()=>{this.binding(text)}}>绑定角色</Button>
                            <Button size="small" type="primary" onClick={()=>{this.compile(text)}}>编辑</Button>
                        </span>

                    ),
                },
            ],

        }
    }
    // 在渲染前调用
    componentDidMount() {
        this.getdata()
        this.getMock();//穿梭栏
        this.role()
    }
    //分页显示
    onChanges=(pageNumber) =>{
        this.setState({
            page:pageNumber
        },() => {
            this.getdata()
            console.log(this.state.page);
        })
    }
    async getdata(){
        this.setState({
            load:true,
        })
        let data={
            page :this.state.page,
            rows:this.state.rows,
            userName:this.state.userName
        }
        const res=await http.get("userManager/findAppUser",data)
        console.log(res.data)
        let listData = res.data.data.datas
        let list = []
        if(res.data.status==200){
            console.log(listData)
            listData.forEach((item,key)=>{
                console.log(item)
                console.log(key)
                // let tjRoles=[]
                // item.tjRoles.forEach((item,keys)=>{
                //     tjRoles[keys]=item.roleName
                // })
                // console.log(tjRoles)
                // let roleName = tjRoles.join(',')
                // console.log(roleName)
                let clinic=[]
                let clinId=[]
                item.userClinics.forEach((items,keys)=>{
                    clinic[keys]=items.clinicName
                    clinId[keys]=items.clinicId
                    // clinic.push({
                    //     clinicName:items.clinicName
                    // })

                })
                console.log(clinic)
                // console.log(clinic.clinicName)
                let clinicName = clinic.join(',');//JSON.stringify(clinic) //JSON.stringify(obj)
                let clinicId = clinId.join(',')
                let role = []
                item.tjRoles.forEach((items,keys)=>{
                    role[keys]=items.roleName
                    // role.push({
                    //     roleName:items.roleName
                    // })
                })
                console.log(role)
                let roleName = role.join(",") //JSON.stringify(role)
                list.push({
                    key,
                    name:item.loginName,
                    age:item.gender==1?"男":item.gender==2?"女":"保密",
                    nickName:item.nickName,
                    clinicName,
                    roleName,
                    isNullMedicalRecord:item.isNullMedicalRecord==0?"不存在":"存在",
                    userId:item.userId,
                    clinicId,
                    userPhotoUrl:item.userPhotoUrl
                    //roleName
                })
                console.log(list)
                this.setState({
                    load:false,
                    data:list,
                    number:res.data.data.totalRecord
                })
            })

        }else{
            message.warning('查询失败')
            this.setState({
                load:false
            })
        }

    }

    // toggle = () => {
    //     this.setState({
    //         collapsed: !this.state.collapsed,
    //     });
    // };
    //搜索查询
    query=(e)=>{
        console.log(this.refs.title.state.value)
        let userName = this.refs.title.state.value
        this.setState({
            userName:userName
        })
        console.log(this.state.userName)
        this.getdata()
    }
    role=async()=>{
        const  res =await http.get("tjRole/findTjRole")
        console.log(res)
        console.log(res.data.data)
        let allRoles = res.data.data;
       console.log(allRoles)
       for(var i=0;i < allRoles.length ;i++) {
         allRoles[i].key=allRoles[i].roleId
         allRoles[i].label=allRoles[i].roleName
       }
       console.log(allRoles)
       this.setState({
        mockData1:allRoles
       })
    //    this.allRoles = allRoles
    }
    handleChange1 = (targetKeys1, direction, moveKeys) => {//点击转换按钮之后
        console.log(targetKeys1, direction, moveKeys);
        this.setState({ targetKeys1 });
    };
    renderItem1 = item => {
    const customLabel = (
        <span className="custom-item">
        {/* {item.title} - {item.description} */}
        {/* {item.label} */}
        {item.roleName}
        </span>
    );

    return {
        label: customLabel, // for displayed item
        value: item.title, // for title and filter matching
    };
    };
    //编辑
    compile=(e)=>{
        console.log(e)
        let gender
        if(e.age=="男"){
            gender=1
        }else if(e.age=="女"){
            gender=2
        }else{
            gender=3
        }
        console.log(gender)
        this.props.form.setFieldsValue({
            'nickname1': e.nickName,
            "targetKeys1":gender
        })
        this.setState({
            compile:true,
            imageUrl:e.userPhotoUrl,
            element:e
        })
    }
    compilenick=(e)=>{
        // e.target.value="123"
        console.log(e.target.value)
    }
    getdatas=async(data)=>{
        console.log(data)
        const  res =await http.post("userManager/updateUser",data)
        console.log(res)
        if(res.data.status=="200"){
            message.success('修改成功');
        }else{
            message.error('修改失败');
        }
        this.setState({
            compile:false
        })
        this.getdata()
    }
    handleSubmit1 =(e) => {//编辑确定
        e.preventDefault();
        console.log(e)
        console.log(this.state.userPhotoUrl)//图片
        this.props.form.validateFields((err, values) => {
            console.log(err)
            console.log(values)
            console.log(values.nickname1)//自己输入的值
            console.log(values.targetKeys1)//性别
            console.log(this.state.userPhotoUrl)//图片
            console.log(this.state.element)
            let element = this.state.element
            let url = ""
            if(this.state.userPhotoUrl==""){
                url=element.userPhotoUrl
            }else{
                url = this.state.userPhotoUrl
            }
            console.log(url)
            // let nickName=values.nickname1
            // gender:values.targetKeys1
            // clinicId:element.clinicId

            let data={
                nickName:values.nickname1,
                gender:values.targetKeys1,
                clinicId:element.clinicId,
                userId:element.userId,
                userPhotoUrl:url
            }
            console.log(data)
            // const  res =await http.post("userManager/updateUser",data)
            this.getdatas(data)
            // console.log(res)

        });

        // const  res =await http.post("userManager/updateUser",data)
        // console.log(url)
        // let data={
        //     // nickName:values.nickname1,
        //     // gender:values.targetKeys1,
        //     // clinicId:element.clinicId,
        //     // userId:element.userId,
        //     userPhotoUrl:url
        // }
        // console.log(data)
        // const  res =await http.post("userManager/updateUser",data)
        // console.log(res)
    }
    // 编辑上传图片
    uploadImg1() {
        let token = localStorage.getItem("token");
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
    //绑定角色确认
    handleOk2=async()=>{
        console.log("确认绑定角色")
        // console.log(this.state.targetKeys)
        // console.log(this.state.appuserId)
        // console.log(this.state.targetKeys1)
        // // //let targetKeys = this.state.clinicId
        // let roleId = this.state.targetKeys1.join(',');
        // let data={
        //     userId:this.state.appuserId,
        //     roleId
        // }
        // console.log(data)
        // const  res =await http.post("userManager/bindRoles",data)
        // console.log(res)
        this.setState({
            compile: false,
        });
        // this.getdata()
    }
    //点击X取消编辑弹框
    handleCancel2 = e => {
        console.log(e);
        this.setState({
            compile: false,
        });
    };
    //绑定角色
    binding=(e)=>{
        console.log(e)
        let appuserId=e.userId
        console.log(e.clinicId)
        let target = e.clinicId.split(",")
        let targetKeys1 = target.map(Number)
        console.log(targetKeys1)
        this.setState({
            binding:true,
            targetKeys1,
            appuserId
        })
    }
    //绑定角色确认
    handleOk1=async()=>{
        console.log("确认绑定角色")
        // console.log(this.state.targetKeys)
        console.log(this.state.appuserId)
        console.log(this.state.targetKeys1)
        // //let targetKeys = this.state.clinicId
        let roleId = this.state.targetKeys1.join(',');
        let data={
            userId:this.state.appuserId,
            roleId
        }
        console.log(data)
        const  res =await http.post("userManager/bindRoles",data)
        console.log(res)
        this.setState({
            binding: false,
        });
        this.getdata()
    }
    //点击X取消绑定角色弹框
    handleCancel1 = e => {
        console.log(e);
        this.setState({
            binding: false,
        });
    };
    //点击删除
    showModal=(e)=>{
        console.log(e.userId)
        let userId = e.userId
        this.setState({
            visible:true,
            userId
        })
    }
    //删除确认
    handleOk=async()=>{
        console.log(this.state.userId);
        let userId = this.state.userId
        let data={
            userId
        }
        const res=await http.post("userManager/delUser",data)
        console.log(res.data.status)
        if(res.data.status==200){
            message.success('删除成功');
        }else{
            message.error('删除失败');
        }
        this.getdata()
        this.setState({
            visible: false,
        });
    };
    //点击X取消删除弹框
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    //点击新增按钮
    newappend=()=>{
        console.log("点击新增")
        this.setState({
            newvisible: true,
        });
        console.log(this.state.newvisible)

    }
    //确认新增
    newhandleOk=async()=>{


        if (this.state.loginName == "") {
            message.error("请输入登陆名");
            return false;
        } else if (this.state.nickName == "") {
            message.error("请输入昵称");
            return false;
        } else if (this.state.gender == "") {
            message.error("请选择性别");
            return false;
        } else if (this.state.userPhotoUrl == "") {
            message.error("请上传头像");
            return false;
        }else if (this.state.userType == ""){
            message.error("请选择用户类型");
            return false;
        }else if (this.state.targetKeys.length == 0){
            message.error("请选择医院");
            return false;
        }
        console.log("确认新增")
        console.log(this.state.loginName+"登录名称")//登录名称
        console.log(this.state.nickName+"昵称")//昵称
        console.log(this.state.userType+"用户类型")//用户类型
        console.log(this.state.gender+"性别")
        console.log(this.state.userPhotoUrl+"上传图片")
        console.log(this.state.targetKeys+"传过来的医院的key")
        let clinicId = this.state.targetKeys.join(",");
        console.log(clinicId)
        let data={
            loginName:this.state.loginName,
            nickName:this.state.nickName,
            userType:this.state.userType,
            gender:this.state.gender,
            userPhotoUrl:this.state.userPhotoUrl,
            clinicId:clinicId
        }
        console.log(data)
        const  res =await http.post("userManager/addUser",data)
        console.log(res)
        if(res.data.status==-1||res.data.status==-2){
            message.error(res.data.message);
        }else{
            this.query()
            this.setState({
                newvisible: false,
                targetKeys:[],
                imageUrl:""
            });
            this.props.form.resetFields()

        }

    }
    //点击X取消新增弹框
    newhandleCancel = e => {
        console.log(e);
        this.setState({
            newvisible: false,
        });
    };
    //验证
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(err)
            console.log(values)
            // if (!err) {
            //     console.log('Received values of form: ', values);
            //     this.register(values)
            // }
        });
    }
    //新增登录名称
    logininput=(e)=>{
        console.log("11111111")
        console.log(e)
        console.log(e.target.value)
        this.setState({
            loginName:e.target.value
        })
    }
    //新增昵称
    nickinput=(e)=>{
        console.log(e.target.value)
        this.setState({
            nickName:e.target.value
        })
    }
    // 新增用户类型
    onChange=(value)=> {//点击下拉菜单中的某个值触发  返回值是value属性中的值
        console.log(`selected ${value}`);//往后台传序号
        this.setState({
            userType:value
        })
        console.log(this.state.userType)//用户类型
    }

    onBlur=()=> {//失去焦点时的回调
        console.log('blur');
    }

    onFocus=()=> {//点击下拉菜单触发
        console.log('focus');
    }

    onSearch(val) {//输入筛选
        console.log('search:', val);
    }
    componentWillUnmount(){
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return;
        }
    }
    //新增性别单选框
    radioOnChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            gender: e.target.value,
        });
    };
    //新增上传图片
    // getBase64(img, callback) {
    //     // console.log(img)
    //     // console.log(callback)
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }

    // beforeUpload(file) {
    //     console.log(file)
    //     const isJPG = file.type === 'image/jpeg';
    //     if (!isJPG) {
    //         message.error('You can only upload JPG file!');
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //         message.error('Image must smaller than 2MB!');
    //     }
    //     return isJPG && isLt2M;
    // }
    uploadImg() {
        let token = localStorage.getItem("token");
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
    // getBase64=(file)=> {//点击放大2
    //     return new Promise((resolve, reject) => {
    //         console.log(resolve)
    //         console.log(reject)
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onload = () => resolve(reader.result);
    //       reader.onerror = error => reject(error);
    //     });
    // }
    // uploadhandleCancel = () => {//隐藏图片
    //     this.setState({ previewVisible: false })
    // };

    // handlePreview = async file => {//点击放大1
    //     if (!file.url && !file.preview) {
    //     file.preview = await this.getBase64(file.originFileObj);
    //     }

    //     this.setState({
    //     previewImage: file.url || file.preview,
    //     previewVisible: true,
    //     });
    //     console.log(this.state.previewImage)
    //     console.log(this.state.previewVisible)
    // };
    // uploadImg() {
    //     let token = localStorage.getItem("token");
    //     console.log(token)
    //     var reg = new RegExp('"',"g");
    //     var str = token.replace(reg, "");
    //     console.log(str)
    //     let url =
    //     "https://test.medkazo.com/medkazobmgr/fileupload/batchFileUpload/user?token=" + str;
    //     // "http://192.168.0.118:8080/manager/fileupload/singleFileUpload/user?token=" + str;
    //     console.log(url)
    //     return url;
    //   }

    // UploadhandleChange = ({ fileList }) => {
    //     this.setState({ fileList })
    //     console.log(this.state.fileList)
    // };

    //新增中的穿梭框
    getMock =async() => {
        const  res =await http.get("clinic/findClinicAll")
        console.log(res.data)
        const mockData = [];//所有数据
        if (res.status == 200) {
          var data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            mockData.push({
              key: data[i].clinicId,
              label: data[i].clinicName,
              areaFullName: data[i].areaFullName
            });
          }
          this.setState({ mockData});
          console.log(this.state.mockData)
        //   this.mockData = mockData;
        //   console.log(this.mockData)
        }


        // ------------------------------------
        // const targetKeys = [];
        // const mockData = [];//所有数据
        // for (let i = 0; i < 20; i++) {
        //   const data = {
        //     key: i.toString(),
        //     title: `content${i + 1}`,
        //     description: `description of content${i + 1}`,
        //     chosen: Math.random() * 2 > 1,
        //   };
        //   console.log(data)
        //   if (data.chosen) {//false左边true右边
        //     targetKeys.push(data.key);
        //   }
        //   mockData.push(data);
        // }
        // this.setState({ mockData, targetKeys });
        // console.log(this.state.mockData)//所有数据
        // console.log(this.state.targetKeys)
      };

      handleChange = (targetKeys, direction, moveKeys) => {//点击转换按钮之后
        console.log(targetKeys, direction, moveKeys);
        this.setState({ targetKeys });
      };
      renderItem = item => {
        const customLabel = (
          <span className="custom-item">
            {/* {item.title} - {item.description} */}
            {item.label}
          </span>
        );

        return {
          label: customLabel, // for displayed item
          value: item.title, // for title and filter matching
        };
      };


    render=()=> {

        const formItemLayout = {
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
        };

        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            // <div>
            //     <Icon type={this.state.loading ? 'loading' : 'plus'} />
            //     <div className="ant-upload-text">Upload</div>
            // </div>
        <div>
            <Icon type="plus" />
            <div type="secondary" className="ant-upload-text">点击上传图片</div>
        </div>
        );
        const { imageUrl } = this.state;//新头像
        const { Option } = Select;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                {/*     头部*/}
                <Row>
                     <Col span={8}><strong>APP用户管理</strong></Col>
                     <Col span={4} offset={12}>
                         <Breadcrumb >
                             <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                             <Breadcrumb.Item>APP用户管理</Breadcrumb.Item>
                         </Breadcrumb>
                     </Col>
                 </Row>
                  <br/>
                 <Row gutter={8}>
                     <Col span={4}>
                         <Input   placeholder="登录名" ref="title" className="searchInput" />
                    </Col>
                     <Col span={2} className="button">
                         <Button type="primary" onClick={this.query}>查询</Button>

                     </Col>
                     <Col span={2} className="button">
                         <Button type="primary" onClick={this.newappend}>新增</Button>
                    </Col>
                 </Row>
                 {/*  表格  */}
                 <Table pagination={false} loading={ this.state.load }  style={{ wordBreak: 'break-all' }} className="table" columns={this.state.columns} dataSource={this.state.data} />
                 <div className="paging">
                     <Pagination showQuickJumper defaultCurrent={1} total={this.state.number} onChange={this.onChanges}  />
                 </div>
                 {/*  删除弹出框   */}
                 <Modal title="提示" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                     <div className="madelText"><Icon style={{  }} type="exclamation-circle" /> 确定要删除此条数据?</div>
                 </Modal>
                 {/*  绑定角色弹出框   */}
                 <Modal title="绑定角色" visible={this.state.binding} onOk={this.handleOk1} onCancel={this.handleCancel1}>
                    <Transfer
                        dataSource={this.state.mockData1}
                        listStyle={{
                        width: 200,
                        height: 200,
                        }}
                        targetKeys={this.state.targetKeys1}
                        onChange={this.handleChange1}
                        render={this.renderItem1}
                    />
                 </Modal>
                 {/*  编辑弹出框   */}
                 <Modal title="编辑" visible={this.state.compile} onOk={this.handleSubmit1} onCancel={this.handleCancel2}>
                 <Form onSubmit={this.handleSubmit1}>
                        <Form.Item label="昵称">
                        {getFieldDecorator('nickname1', {
                            rules: [
                            {
                                required: true,
                                message: '请输入昵称',
                            },
                            ],
                        })(<Input  onChange={this.compilenick} />)}
                        {/* defaultValue="26888888" */}
                        </Form.Item>
                        <Form.Item label="性别">
                            {getFieldDecorator('targetKeys1', {

                            })(
                                <Radio.Group onChange={this.radioOnChange1} >
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                    <Radio value={3}>保密</Radio>
                                </Radio.Group>
                            )}
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
                 </Form>

                 </Modal>
                 {/* 新增弹出框 */}
                 <Modal
                    title="新增"
                    visible={this.state.newvisible}
                    onOk={this.newhandleOk}
                    onCancel={this.newhandleCancel}
                    width="800px"
                    >
                    <Form onSubmit={this.handleSubmit} labelCol={{ span: 6}} wrapperCol={{ span: 17 }}>
                        <Form.Item label="登录名称">
                        {getFieldDecorator('loginname', {
                            rules: [

                            {
                                required: true,
                                message: '请输入登录名称',
                            },
                            ],
                        })(<Input  onChange={this.logininput} />)}
                        </Form.Item>
                        <Form.Item label="昵称">
                        {getFieldDecorator('nickname', {
                            rules: [
                            {
                                required: true,
                                message: '请输入昵称',
                            },
                            ],
                        })(<Input onChange={this.nickinput} />)}
                        </Form.Item>
                        <Form.Item label="用户类型">
                            {getFieldDecorator('userType', {
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择用户类型"
                                    optionFilterProp="children"
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                    onSearch={this.onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="1">系统</Option>
                                    <Option value="4">媒体</Option>
                                    <Option value="5">诊所</Option>
                                    <Option value="6">运营</Option>
                                    <Option value="7">医药代表</Option>
                                </Select>
                            )}



                        </Form.Item>
                        <Form.Item label="性别">
                            {getFieldDecorator('targetKeys', {

                            })(
                                <Radio.Group onChange={this.radioOnChange} >
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                    <Radio value={3}>保密</Radio>
                                </Radio.Group>
                            )}


                        </Form.Item>
                        <Form.Item label="上传图片">
                            <div className="clearfix">
                            <Upload
                                name="files"
                                listType="picture-card"
                                className="avatar-uploader uploadimg"
                                showUploadList={false}
                                action={this.uploadImg}
                                beforeUpload={this.beforeUpload}
                                onChange={this.UploadhandleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                                {/* <Upload
                                name="files"
                                action={this.uploadImg}
                                listType="picture-card"
                                fileList={fileList}
                                withCredentials={true}
                                onPreview={this.handlePreview}
                                onChange={this.UploadhandleChange}
                                >
                                {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.uploadhandleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal> */}
                            </div>
                        </Form.Item>
                        <Form.Item label="诊所名称">
                            <Transfer
                                dataSource={this.state.mockData}
                                listStyle={{
                                    width: 200,
                                    height: 200,
                                }}
                                targetKeys={this.state.targetKeys}
                                onChange={this.handleChange}
                                render={this.renderItem}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(userManage)
export default WrappedNormalLoginForm;
// export default userManage;
