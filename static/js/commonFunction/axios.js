import axios from 'axios'
import vuex from 'vuex'
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
 
// http request 拦截器
axios.interceptors.request.use(
    config => {
    	if(config.url.substr(config.url.length-10)=="applytoken"){
    		return config;
    	}else{
    		config.url=config.url+"?token="+localStorage.token
    		return config;
    	}
        
        
    },
    err => {
        return Promise.reject(err);
    });
 
// http response 拦截器
axios.interceptors.response.use(
    response => {
    	if(response.data.code=="SSO_W_002"){
    		window.localStorage.removeItem("token");
//  		window.location.href="http://outer.qtoubao.cn/#/home";
    		window.location.href="http://mp.qtoubao.cn/#/home";
    	}
    	else if(response.data.code=="SSO_W_001"){
    		window.localStorage.removeItem("token");
//  		window.location.href="http://outer.qtoubao.cn/#/home";
    		window.location.href="http://mp.qtoubao.cn/#/home";
    	}
    	else if(response.data.code=="SSO_W_003"){
    		Toast(response.data.desc)
    		console.log(response.data.desc)
    	}
    	else if(response.data.code=="SSO_W_004"){
    		window.localStorage.removeItem("token");
//  		window.location.href="http://outer.qtoubao.cn/#/home";
    		window.location.href="http://mp.qtoubao.cn/#/home";
    	}
        return response;
    },
    error => {
    	
    });
export default axios
