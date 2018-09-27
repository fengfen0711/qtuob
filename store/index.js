import Vue from 'vue';
import Vuex from 'vuex';
import vuexAlong from 'vuex-along'
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
//		"link5": 'http://192.168.171.12:9002',
//		"link": 'http://192.168.171.16:9002', //UAT
//		'link2': 'http://192.168.171.16:9019',
//		'link3': 'http://192.168.171.16:10009',
//		"wx_share": "http://test.outer.qtoubao.cn/wx/wxShare",
//		'imgUrl': 'http://192.168.171.16:9900/group1/M00/00/15/wKirC1rho1iAN5lqAACnKMbZhdk730.png',
//		'MDimgUrl': 'http://192.168.171.16:9900/group1/M00/00/29/rBUADVthhTeAZsWSAAAlbKuBRh8684.png',
//		'echoImgUrl': 'http://192.168.171.16:9900/',
//		"shareLink": "http://test.outer.qtoubao.cn",
//		"shareLink1": "http://test.outer.qtoubao.cn",
		

//		"link7": 'http://192.168.171.12:9005',
//		"link6": 'http://192.168.171.12:9009',
//		"link5": 'http://192.168.171.16:9002',
//		//"link5": 'http://192.144.139.88:9002',
//		"link": 'http://192.144.139.88:9002', //UAT
//		'link2': 'http://192.144.139.88:9019',
//		'link3': 'http://192.144.139.88:10009',
//		"link4": 'http://192.144.139.88:9010',
//		"wx_share": "http://outer.qtoubao.cn/wx/wxShare",
//		'imgUrl': 'http://192.144.139.88:9900/group1/M00/00/15/wKirC1rho1iAN5lqAACnKMbZhdk730.png',
//		'MDimgUrl': 'http://192.144.139.88:9900/group1/M00/00/29/rBUADVthhTeAZsWSAAAlbKuBRh8684.png',
//		'echoImgUrl': 'http://192.144.139.88:9900/',
//		"shareLink": "http://outer.qtoubao.cn",
//		"shareLink1": "http://outer.qtoubao.cn",

						"link":'http://140.143.32.49:9002',//生产
						'link2':'http://h5.qtoubao.cn:9019',//上传图片
						"link4": 'http://140.143.32.49:9010',
						"wx_share":	'http://mp.qtoubao.cn/wx/wxShare',
						'imgUrl': 'http://h5.qtoubao.cn:9900/group1/M00/00/5C/rBUQCFtQHCiAMN3IAABo_GXPjgk101.jpg',
						'MDimgUrl': 'http://h5.qtoubao.cn:9900/group1/M00/00/73/rBUQCFthhb-AWoQ5AAAlbKuBRh8107.png',
						'echoImgUrl': "http://h5.qtoubao.cn:9900/",
						"shareLink":"http://mp.qtoubao.cn",
						"shareLink1":"http://h5.qtoubao.cn",

		"token": "",
		'userId': '',
		'brokerInfo':'',
		'userInfo':'',
		'loginId': '0',
		'serchInfo':'',
		"insrntReqInfo": "", //上海人寿
		"invitecode": "", //邀请码
		"sign": "", //代理人上岗签字数据
		"card": "", //代理人上岗客户数据
		"record": "", //代理人学历
		"bank": "", //代理人上岗银行数据
		"mobile": "", //代理人手机号
		"yearF": "", //
		"information": "", //代理信息数据
		"HUS": 'HUS', // 人核预审
		"AUS": "AUS", //该订单已核保成功
		"PAY_OUT": "PAY_OUT", //人核预审
		"ISSP": "ISSP", //承保中
		"AUC_TWO":"AUC_TWO", //核保成功
		"orderState": {
			"AUC": "AUC", //自核成功  20
			"AUF": "AUF", //自核失败  02
			"AWL": "AWL", //已撤单  30  
			"DEL": "DEL", //已删除  17
			"PAY": "PAY", //收费成功  09
			"PAY_FAL": "PAY_FAL", //收费失败  11
			"UDR": "UDR", //  承保成功  40
			"UDR_FAL": "UDR_FAL", //承保失败  13
			"PLY_CAL": "PLY_CAL", //退保  16
			"HPUC": "HPUC", //人工核保中  03
			"INPAY": "INPAY", //收费中  08
			"HUFN": "HUFN", //人核失败并发送通知书  07
			"PLY_ER": "PLY_ER", //保单生效已回执状态  15
			"OTHER": "OTHER", //其他  21
			"HUC": "HUC", //人工核保成功  04
			"HPRO": "HPRO", //人核未进核心  05
			"UDR_PAY": "UDR_PAY", //收费承保  40
			"COPC": "COPC", //犹豫期退保  60
			"CONO": "CONO", //暂存单  10
			"AUT": "AUT", //自核交易失败  01
			"HUF": "HUF", //人核失败  06
			"PAYT": "PAYT", //收费交易失败  12
			"UDRT": "UDRT", //承保交易失败  14
			"UCS": "UCS", //承保收费成功  18
			"DECL": "DECL", //拒保  19
			"PREP": "PREP", //待支付  22
		},
		"zhOrderState": {
			
			"CONO": "CONO", //暂存单  
			"AUC": "AUC", //自核成功  
			"AWL": "AWL", //已撤单    
			"UDR": "UDR", //承保成功  
			"COPC": "COPC", //犹豫期退保  
			"AUT": "AUT", //自核交易失败  
			"AUF": "AUF", //  自核不通过  
			"HPUC": "HPUC", //人工核保中  
			"HUC": "HUC", //人工核保成功  
			"HPRO": "HPRO", //人核未进核心  
			"HUF": "HUF", //人核失败  
			"HUFN": "HUFN", //人核失败并发送通知书  
			"UDR_FAL": "UDR_FAL", //承保失败  
			"INPAY": "INPAY", //收费中  
			"PAY": "PAY", //收费成功  
			"PAY_FAL": "PAY_FAL", //收费失败  
			"PAYT": "PAYT", //收费交易失败  
			"UDRT": "UDRT", //承保交易失败  
			"PLY_ER": "PLY_ER", //保单生效已回执状态  
			"PLY_CAL": "PLY_CAL", //退保  
			"DEL": "DEL", //已删除  
			"UCS": "UCS", //承保收费成功  
			"DECL": "DECL", //拒保  
			"OTHER": "OTHER", //其他  
			"PREP": "PREP", //可支付  
			"PAY_OUT": "PAY_OUT", //支付超时  
			"AUS": "AUS", //该订单已核保成功或进入人工核保中  
			"HUS": "HUS", //人核预审 
			"CAL_ACCEPT": "CAL_ACCEPT", //退保受理  
			"CAL_FAL": "CAL_FAL", //退保失败
			"ISSP": "ISSP", //承保已提交
		},
		"tCoding": "",
		"sCoding": "",
		'loginData':'',
	},
	mutations: {
		changeLoginId: function(state, payload) {
			state.loginId = payload;
		},
		changeSerchInfo: function(state, payload) {
			state.serchInfo = payload;
		},
		changeToken: function(state, payload) {
			state.token = payload;
		},
		changeUserId: function(state, payload) {
			state.userId = payload;
		},
		changeLoginData: function(state, payload) {
			state.loginData = payload;
		},
		changeUserInfoData: function(state, payload) {
			state.userInfo = payload;
		},
		changeBrokerInfoData: function(state, payload) {
			state.brokerInfo = payload;
		},
		changeInsrntReqInfo: function(state, payload) {
			state.insrntReqInfo = payload;
		},
		changeSign: function(state, payload) {
			state.sign = payload;
		},
		changeinviteCode: function(state, payload) {
			state.invitecode = payload;
		},
		changeMobile: function(state, payload) {
			state.mobile = payload;
		},
		changeCard: function(state, payload) {
			state.card = payload;
		},
		changeRecord: function(state, payload) {
			state.record = payload;
		},
		changeBank: function(state, payload) {
			state.bank = payload;
		},
		changeInformation: function(state, payload) {
			state.information = payload;
		},
		changeTCoding: function(state, payload) {
			state.tCoding = payload;
		},
		changeSCoding: function(state, payload) {
			state.sCoding = payload;
		},
		changeYearF: function(state, payload) {
			state.yearF = payload;
		}

	},
	actions: {
		changeLoginId({
			commit
		}, payload) {
			commit("changeLoginId", payload)
		},
		changeSerchInfo({
			commit
		}, payload) {
			commit("changeSerchInfo", payload)
		},
		changeToken({
			commit
		}, payload) {
			commit("changeToken", payload)
		},
		changeUserId({
			commit
		}, payload) {
			commit("changeUserId", payload)
		},
		changeLoginData({
			commit
		}, payload) {
			commit("changeLoginData", payload)
		},
		changeUserInfoData({
			commit
		}, payload) {
			commit("changeUserInfoData", payload)
		},
		changeBrokerInfoData({
			commit
		}, payload) {
			commit("changeBrokerInfoData", payload)
		},
		changeInsrntReqInfo({
			commit
		}, payload) {
			commit("changeInsrntReqInfo", payload)
		},
		changeSign({
			commit
		}, payload) {
			commit("changeSign", payload)
		},

		changeBank({
			commit
		}, payload) {
			commit("changeBank", payload)
		},
		changeinviteCode({
			commit
		}, payload) {
			commit("changeinviteCode", payload)
		},
		changeMobile({
			commit
		}, payload) {
			commit("changeMobile", payload)
		},
		changeCard({
			commit
		}, payload) {
			commit("changeCard", payload)
		},
		changeRecord({
			commit
		}, payload) {
			commit("changeRecord", payload)
		},
		changeInformation({
			commit
		}, payload) {
			commit("changeInformation", payload)
		},
		changeTCoding({
			commit
		}, payload) {
			commit("changeTCoding", payload)
		},
		changeSCoding({
			commit
		}, payload) {
			commit("changeSCoding", payload)
		},
		changeYearF({
			commit
		}, payload) {
			commit("changeYearF", payload)
		}
	},
	getters: {
		"perfectCity": function(state) {
			return state.card + "^<>^"
		}

	},
	plugins: [vuexAlong]
})