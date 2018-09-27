/*
 * @Author: aliang
 * @Date: 2018-09-20 19:07:43
 * @LastEditors: aliang
 * @LastEditTime: 2018-09-21 16:24:40
 * @Description: utils工具类
 */
import Vue from "vue";
import utilsPlugin from "../../static/js/utils";
// console.log(utilsPlugin);

const pl = {
  utils: {}
}
Vue.use(utilsPlugin, pl);

//其他可扩展的方法直接在此处往utils对象里面扩充或者直接在其他地方对utils对象进行扩充
const utils = {
  utilsPlugin:Vue.$utils
}
/**
 * 获取字符串中重复最大、最小的值
 * @param {*} type min-最小、max-最大
 * @param {*} param 验证的字符串
 */
utils.getMaxOrMinObj = function(type,param){
  var str = param;
  var obj = {};
  for (var i = 0, l = str.length; i < l; i++) {
    var key = str[i];
    if (!obj[key]) {
      obj[key] = 1;
    } else {
      obj[key]++;
    }
  }
  /*遍历这个hash table，获取value最大的key和value*/
  var max = -1;
  var max_key = "";
  var key;
  if(type=="max"){
    for (key in obj) {
      if (max < obj[key]) {
        max = obj[key];
        max_key = key;
      }
    }
  }else if(type=="min"){
    for (key in obj) {
      max = obj[key]
      max_key = key;
      break
    }
    for (key in obj) {
      if (max > obj[key]) {
      max = obj[key];
      max_key = key;
      }
    }
  }
  return {
    "count":max,
    "key":max_key,
  }
};

/**
 * 将val1对象的移植给val2并返回
 * @param {*} val1
 * @param {*} val2
 */
utils.forKeyValueFun = function(val1,val2){
  for(var key in val1){
  	if(val1.hasOwnProperty(key)===true){
  		val2[key]=val1[key];
  	} 
  }
  return val2;
}

export default utils
