import React,{Component} from "react"


import http from "../../server"


class brokerManage extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };



    render() {
        return (<div>经纪人管理</div>)
    }

}
export default brokerManage;
