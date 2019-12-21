import axios from "axios"
import qs from "qs"
import storage from "./assets/js/storage"
const  url="https://test.medkazo.com/ylmallManager"   //测试环境
//  const  url="http://192.168.0.118/medkazo/"
//http://192.168.0.118:8080/manager/user/login?loginName=admin&password=test.123456
export const baseUrl = {
    url:url
}
let http={
    post:"",
    get:""
}
http.post=function (api,data) {
      data.token = storage.get("token") //localStorage.getItem("token")
    let params=qs.stringify(data)
    return new Promise((resolve ,reject)=>{
        axios.post(url+api,params).then((res)=>{
            resolve(res)
        })
    })
}

http.get=function (api,data) {
    console.log(data)
    let datas
    if(data!=undefined){
        data.token = storage.get("token")
        datas= data
        console.log(datas)
        console.log(data)
    }else{
        datas ={token:storage.get("token")}
        console.log(datas)
    }
    // let token=storage.get("token")
    // console.log(token)
    // data.token = storage.get("token")
    // console.log(storage.get("token"))
    let params=datas
    console.log(params)

    return new Promise((resolve ,reject)=>{
        axios.get(url+api,{params}).then((res)=>{
            resolve(res)
        })
    })
}
export  default http
