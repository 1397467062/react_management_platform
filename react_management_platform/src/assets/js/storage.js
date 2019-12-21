/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-07-09 15:26:41 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-24 16:42:52
 */
var storage={
    set(key,value){//设置
        localStorage.setItem(key,JSON.stringify(value))
    },
    get(key){//获取
        return JSON.parse(localStorage.getItem(key))
    },
    remove(key){//移除
        localStorage.removeItem(key)
    }
}
export default storage;