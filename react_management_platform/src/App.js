import './assets/css/App.css';
import React ,{Component}from 'react';
import home from "./components/home";
import register from "./components/register";
import zhCN from 'antd/es/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import {HashRouter as Router,Route} from "react-router-dom"
//111
class App extends  Component{
  render() {
    return (
        <LocaleProvider locale={zhCN}>
            <div className="App">
                <Router>
                    <Route   exact path="/" component={register} />
                    <Route   path="/home" component={home} />
                </Router>
            </div>
        </LocaleProvider>

    );
  }
}

export default App;
