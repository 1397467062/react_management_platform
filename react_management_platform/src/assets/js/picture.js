
import {  message} from 'antd';

let picture = {
    beforeUpload(file) {
        console.log(file)
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('请上传JPG格式的图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('上传图片大小不能超过2MB!');
        }
        return isJPG && isLt2M;
    }
}
let getBase = {
    getBase64(img, callback) {
        // console.log(img)
        // console.log(callback)
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
}
export const get = {
    getBase:getBase 
}

export default picture;


