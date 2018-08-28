import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/index'
import Login from '@/pages/login/index'
import Register from '@/pages/login/register'
import Code from '@/pages/login/code'
import Forget from '@/pages/login/forget'
import Password from '@/pages/login/password'
import Manage from '@/pages/manage/index'
import Brithdayfall from '@/pages/brithday/brithdayfall'
import Preview from '@/pages/brithday/preview'
import MatchReport from '@/pages/brithday/matchReport'
import Labelmanagement from '@/pages/brithday/label_management'
import Workbench from '@/pages/brithday/workbench'
import About_qtb from '@/pages/my/about_qtb'
import Afternoon from '@/pages/index/afternoon'
import Feedback from '@/pages/brithday/feedback'
import Confirmed from '@/pages/my/confirmed'
import Reinforce from '@/pages/brithday/reinforce'
import PreferentialRecommendation from '@/pages/qijianwei/preferentialRecommendation'
import RecommendedDetails from '@/pages/qijianwei/recommendedDetails'
import My from '@/pages/index/index_my'
import Produch from '@/pages/index/produch'
import CustConfirmation from '@/pages/my/custConfirmation'
import Safe from '@/pages/safe/index'
import ResetPassword from '@/pages/safe/resetPassword'
import ResetPhone from '@/pages/safe/resetPhone'
import NewPhone from '@/pages/safe/newPhone'
import Detail from '@/pages/index/detail'
import UserInfo from '@/pages/my/userInfo'
import CustConfirmationdetails from '@/pages/my/custConfirmationdetails'
import All from '@/pages/manage/all'
import Information from '@/pages/manage/information'
import CustSeven from '@/pages/manage/custSeven'
import BirthdayObject from '@/pages/manage/birthdayObject'
import Authorization from '@/pages/index/authorization'
import AauthorizationCallback from '@/pages/index/authorizationCallback'
import ShopLine from '@/pages/index/shopLine'
import ShopLineDe from '@/pages/index/shopLineDe'
import Yin from '@/pages/index/yin'

//、、、、、、、、、天安
import TaInsureNine from '@/pages/tianAn/taInsureNine'
import IntoInfo from '@/pages/tianAn/intoInfo'
import Informationinput from '@/pages/tianAn/informationinput'
import Informationinputinsured from '@/pages/tianAn/informationinputinsured'
import Insuranceadvice from '@/pages/tianAn/insuranceadvice'
import Insuranceadvice1 from '@/pages/tianAn/insuranceadvice1'
import InforUpload from '@/pages/tianAn/inforUpload'
import InforUpload1 from '@/pages/tianAn/inforUpload1'
import Info1 from '@/pages/tianAn/info1'
import Info2 from '@/pages/tianAn/info2'
import Info3 from '@/pages/tianAn/info3'
import Enter from '@/pages/tianAn/enter'
import Customer from '@/pages/tianAn/customer'
import Dianzi from '@/pages/tianAn/list'
import PayInfo_tian from '@/pages/tianAn/payInfo_tian'
import PayInfo_tianError from '@/pages/tianAn/payInfo_tianError'
import Results from '@/pages/tianAn/sucess'
import ArtificialSubmission from '@/pages/tianAn/artificialSubmission'
import Resultf from '@/pages/tianAn/fail'
import Result from '@/pages/tianAn/pay'
import Order from '@/pages/tianAn/order'
import Hbresult from '@/pages/tianAn/hbresult'
import Faresult from '@/pages/tianAn/faresult'
import Faresult1 from '@/pages/tianAn/faresult1'
import Enter1 from '@/pages/tianAn/enter1'
import IssueError from '@/pages/tianAn/issueError.vue'
import SucessIssue from '@/pages/tianAn/sucessIssue.vue'
import PayInfo_tianGai from '@/pages/tianAn/payInfo_tianGai'
import BankCardUpload from '@/pages/tianAn/bankCardUpload.vue'
import BankCardEnter from '@/pages/tianAn/bankCardEnter.vue'
import BankCardsucess from '@/pages/tianAn/bankCardsucess.vue'
import PayResult from '@/pages/tianAn/payResult.vue'

//、、、、、、、、、上海人寿
import PopupInfo1 from '@/insureOnline/popupInfo1'
import Fail from '@/insureOnline/fail'
import UWfail from '@/insureOnline/UWfail'
import PopupInfo2 from '@/insureOnline/popupInfo2'
import PayFail from '@/insureOnline/payFail'
import PaySucess from '@/insureOnline/paySucess'
import PopupInfo3 from '@/insureOnline/popupInfo3'
import PayInfo from '@/insureOnline/payInfo'
import MylifeOrder from '@/insureOnline/mylifeOrder'
import NoPayInfo from '@/insureOnline/noPayInfo'
import CvrgInfo from '@/insureOnline/cvrgInfo'

//、、、、、、、、、上岗
import Guader from '@/pages/sign/index'
import InsuraBroker from '@/pages/sign/insuraBroker'
import Confirmation from '@/pages/sign/confirmation'
import Mast from '@/pages/sign/mast'
import Phone from '@/pages/sign/phone'
import Sign from '@/pages/sign/sign'
import InformaConfirmation from '@/pages/sign/informaConfirmation'
import AddbankCard from '@/pages/sign/addbankCard'
import HandCard from '@/pages/sign/handCard'
import Confirm_message from '@/pages/sign/confirm_message'
import InformaReconfirm from '@/pages/sign/informaReconfirm'
import Failindex from '@/pages/sign/fail'
import Waitindex from '@/pages/sign/wait'
import Hasregistered from '@/pages/sign/hasregistered'
import Step from '@/pages/sign/step'

//、、、、、、、、、君康
import OrderDetails from '@/pages/junkang/orderDetails' //订单详情
import Affirm from '@/pages/junkang/affirm' //身份申明
import TrialCalculation from '@/pages/junkang/trialCalculation' //保费试算
import PolicyHolder from '@/pages/junkang/policyHolder' //投保人
import Recognizee from '@/pages/junkang/recognizee' //被保人
import Beneficiary from '@/pages/junkang/beneficiary' //受益人
import Questionnaire from '@/pages/junkang/questionnaire' //投保人健康告知
import Questionnaire1 from '@/pages/junkang/questionnaire1' //投保人健康告知
import BusinessInform from '@/pages/junkang/businessInform' //业务告知
import BankCard from '@/pages/junkang/bankCard' //银行卡信息
import ArtProtection from '@/pages/junkang/artProtection' //待人核审预
import JkCustomer from '@/pages/junkang/jkCustomer' //单证签字
import PaymentProcessing from '@/pages/junkang/paymentProcessing' //支付处理
import ManualWork from '@/pages/junkang/manualWork' //人工核保
import PaymentSuccess from '@/pages/junkang/paymentSuccess' //支付成功
import PaymentFailed from '@/pages/junkang/paymentFailed' //支付失败
import Declinature from '@/pages/junkang/declinature' //拒保
import DetPolicy from '@/pages/junkang/detPolicy' //保单详情
import ViewVideo from '@/pages/junkang/viewVideo' //影像资料


//。。。。改版App
import NewIndex from '@/pages/newApp/bottom'
import MineSet from '@/pages/newApp/mineSet'
import ArtDetail from '@/pages/newApp/artDetail'
import ArtDetailT from '@/pages/newApp/artDetailT'
import Home from "@/pages/newApp/index.vue"
import Product from "@/pages/newApp/product.vue"
import Descover from "@/pages/newApp/descover.vue"
import Descover1 from "@/pages/newApp/descover1.vue"
import DescoverT from "@/pages/newApp/descoverT.vue"
import Mine from "@/pages/newApp/mine.vue"
import StudyDetail from "@/pages/newApp/descover/studyDetail.vue"
import Tool from "@/pages/newApp/lookAhead/tool.vue"
import Company from "@/pages/newApp/lookAhead/company.vue"
import Rule from "@/pages/newApp/lookAhead/rule.vue"
import RegNew from "@/pages/newApp/login/regNew.vue"
import LogNew from "@/pages/newApp/login/logNew.vue"
import RewNew from "@/pages/newApp/login/rewNew.vue"
import UserNew from "@/pages/newApp/userInfo.vue"

//.......中华
import Resultfeedback from '@/pages/zhonghua/resultfeedback'
import Receipt from '@/pages/zhonghua/receipt'
import Relayfeedback from '@/pages/zhonghua/relayfeedback'
import Feedbackpayment from '@/pages/zhonghua/feedbackpayment'
import Feedsubmit from '@/pages/zhonghua/feedsubmit'
import Facerecognition from '@/pages/zhonghua/facerecognition'
import FaceInsured from '@/pages/zhonghua/faceInsured'
import Epolicy from '@/pages/zhonghua/epolicy'
import Epolicp from '@/pages/zhonghua/epolicp'
import Informationupload from '@/pages/zhonghua/informationupload'
import Fee from '@/pages/zhonghua/fee'
import FeeShow from '@/pages/zhonghua/feeShow'
import Applicant from '@/pages/zhonghua/applicant'
import Insured from '@/pages/zhonghua/insured'
import IdCard from '@/pages/zhonghua/idCard'
import InIdCard from '@/pages/zhonghua/inIdCard'
import Ben from '@/pages/zhonghua/ben'
import HealthTold from '@/pages/zhonghua/healthTold' //投保人健康告知
import HealthTolds from '@/pages/zhonghua/healthTold1' //投保人健康告知
import MsgBook from '@/pages/zhonghua/msgBook' //人身保险投保提示书
import MsgShow from '@/pages/zhonghua/msgShow' //人身保险投保提示书
import AccInformation from '@/pages/zhonghua/accInformation'
import FaceAcc from '@/pages/zhonghua/faceAcc'
import ZhDocumentsSign from '@/pages/zhonghua/zhDocumentsSign'
import InformationCon from '@/pages/zhonghua/informationCon' //信息确认
import PayBank from '@/pages/zhonghua/payBank' //原卡支付
import PayBank_Error from '@/pages/zhonghua/payBank_Error' //新卡支付
import PdfFile from '@/pages/zhonghua/pdfFile' //银行卡信息阅览
Vue.use(Router)

export default new Router({
	routes: [
		//	{
		//    path: '/',
		//    name: 'AauthorizationCallback',
		//    component: AauthorizationCallback,
		//    meta:{
		//    	title:"趣投保"
		//    }
		//  },
		{
			path: '/newIndex',
			name: 'newIndex',
			component: NewIndex,
			children: [{
				path: 'home',
				name: 'home',
				component: Home,
				meta: {
					title: "趣投保"
				},
			}, {
				path: 'product',
				name: 'product',
				component: Product,
				meta: {
					title: "产品"
				},
			}, {
				path: 'descover',
				name: 'descover',
				component: Descover,
				meta: {
					title: "发现"
				}
			}, {
				path: 'descover1',
				name: 'descover1',
				component: Descover1,
				meta: {
					title: "发现"
				}
			},{
				path: 'mine',
				name: 'mine',
				component: Mine,
				meta: {
					title: "个人中心"
				},
			}]
		},
		{
			path: '/studyDetail',
			name: 'studyDetail',
			component: StudyDetail,
			meta: {
				title: "详情信息"
			}
		}, {
				path: '/descoverT',
				name: 'descoverT',
				component: DescoverT,
				meta: {
					title: "发现"
				}
			},
		{
			path: '/mineSet',
			name: 'mineSet',
			component: MineSet,
			meta: {
				title: "个人中心-设置"
			}
		},
		{
			path: '/artDetail',
			name: 'artDetail',
			component: ArtDetail,
			meta: {
				title: "详情"
			}
		},
		{
			path: '/artDetailT',
			name: 'artDetailT',
			component: ArtDetailT,
			meta: {
				title: "详情"
			}
		},
		{
			path: '/tool',
			name: 'tool',
			component: Tool,
			meta: {
				title: "展业辅助"
			}
		},
		{
			path: '/company',
			name: 'company',
			component: Company,
			meta: {
				title: "保险公司"
			}
		},
		{
			path: '/rule',
			name: 'rule',
			component: Rule,
			meta: {
				title: "投保规则"
			}
		},
		{
			path: '/regNew',
			name: 'regNew',
			component: RegNew,
			meta: {
				title: "趣投保-注册"
			}
		},
		{
			path: '/logNew',
			name: 'logNew',
			component: LogNew,
			meta: {
				title: "趣投保-登录"
			}
		},
		{
			path: '/rewNew',
			name: 'rewNew',
			component: RewNew,
			meta: {
				title: "忘记密码"
			}
		},
		{
			path: '/userNew',
			name: 'userNew',
			component: UserNew,
			meta: {
				title: "个人中心"
			}
//		},
//		{
//			path: '/',
//			name: 'index',
//			component: Index,
//			meta: {
//				title: "趣投保"
//			}
//		}, {
//			path: '/login',
//			name: 'login',
//			component: Login,
//			meta: {
//				title: "登录"
//			}
//		}, {
//			path: '/register',
//			name: 'register',
//			component: Register,
//			meta: {
//				title: "注册"
//			}
//		}, {
//			path: '/code',
//			name: 'code',
//			component: Code,
//			meta: {
//				title: "密码"
//			}
//		}, {
//			path: '/forget',
//			name: 'forget',
//			component: Forget,
//			meta: {
//				title: "找回密码"
//			}
//		}, {
//			path: '/password',
//			name: 'password',
//			component: Password,
//			meta: {
//				title: "重置密码"
//			}
		}, {
			path: '/manage',
			name: 'manage',
			component: Manage,
			meta: {
				title: "客户管理"
			}
		}, {
			path: '/brithdayfall',
			name: 'brithdayfall',
			component: Brithdayfall,
			meta: {
				title: "生日名人堂"
			}
		}, {
			path: '/preferentialRecommendation',
			name: 'preferentialRecommendation',
			component: PreferentialRecommendation,
			meta: {
				title: "优惠推荐"
			}
		}, {
			path: '/preview',
			name: 'preview',
			component: Preview,
		}, {
			path: '/labelmanagement',
			name: 'labelmanagement',
			component: Labelmanagement,
			meta: {
				title: "标签管理"
			}
		}, {
			path: '/workbench',
			name: 'workbench',
			component: Workbench,
			meta: {
				title: "关于趣投保"
			}
		}, {
			path: '/about_qtb',
			name: 'about_qtb',
			component: About_qtb,
			meta: {
				title: "关于趣投保"
			}
//		}, {
//			path: '/afternoon',
//			name: 'afternoon',
//			component: Afternoon,
//			meta: {
//				title: "早午晚报"
//			}
		}, {
			path: '/feedback',
			name: 'feedback',
			component: Feedback,
			meta: {
				title: "意见反馈"
			}
		}, {
			path: '/confirmed',
			name: 'confirmed',
			component: Confirmed,
			meta: {
				title: "客户信息录入"
			}
		}, {
			path: '/reinforce',
			name: 'reinforce',
			component: Reinforce,
			meta: {
				title: "招募合伙人"
			}

		}, {
			path: '/recommendedDetails',
			name: 'recommendedDetails',
			component: RecommendedDetails,
			meta: {
				title: "详情预览"
			}
//		}, {
//			path: '/my',
//			name: 'my',
//			component: My,
//			meta: {
//				title: "我的"
//			}
//		}, {
//			path: '/produch',
//			name: 'produch',
//			component: Produch,
//			meta: {
//				title: "产品列表"
//			}
		}, {
			path: '/custConfirmation',
			name: 'custConfirmation',
			component: CustConfirmation,
			meta: {
				title: "客户委托书"
			}
		}, {
			path: '/safe',
			name: 'safe',
			component: Safe,
			meta: {
				title: "账户安全"
			}
		}, {
			path: '/resetPassword',
			name: 'resetPassword',
			component: ResetPassword,
			meta: {
				title: "密码管理"
			}
		}, {
			path: '/resetPhone',
			name: 'resetPhone',
			component: ResetPhone,
			meta: {
				title: "手机号"
			}
		}, {
			path: '/newPhone',
			name: 'newPhone',
			component: NewPhone,
			meta: {
				title: "手机号"
			}
		}, {
			path: '/detail',
			name: 'detail',
			component: Detail,
			meta: {
				title: "产品详情"
			}
//		}, {
//			path: '/userInfo',
//			name: 'userInfo',
//			component: UserInfo,
//			meta: {
//				title: "个人信息"
//			}
		}, {
			path: '/custConfirmationdetails',
			name: 'custConfirmationdetails',
			component: CustConfirmationdetails,
			meta: {
				title: "客户信息确认"
			}
		}, {
			path: '/all',
			name: 'all',
			component: All,
			meta: {
				title: "全部客户"
			}
		}, {
			path: '/information',
			name: 'information',
			component: Information,
			meta: {
				title: "客户详情"
			}
		}, {
			path: '/custSeven',
			name: 'custSeven',
			component: CustSeven,
			meta: {
				title: "客户管理"
			}
		}, {
			path: '/birthdayObject',
			name: 'birthdayObject',
			component: BirthdayObject,
			meta: {
				title: "生日物语"
			}
		}, {
			path: '/authorization',
			name: 'authorization',
			component: Authorization,
			meta: {
				title: "授权页面"
			}
		}, {
			path: '/taInsureNine',
			name: 'taInsureNine',
			component: TaInsureNine,
			meta: {
				title: "投保资料预览"
			}
		}, {
			path: '/intoInfo',
			name: 'IntoInfo',
			component: IntoInfo,
			meta: {
				title: "填写投保信息"
			}
		}, {
			path: '/informationinputinsured',
			name: 'informationinputinsured',
			component: Informationinputinsured,
			meta: {
				title: "被保人个税信息录入"
			}
		},
		{
			path: '/informationinput',
			name: 'informationinput',
			component: Informationinput,
			meta: {
				title: "投保人个税信息录入"
			}
		}, {
			path: '/result',
			name: 'result',
			component: Result,
			meta: {
				title: "支付结果"
			}
		}, {
			path: '/insuranceadvice',
			name: 'insuranceadvice',
			component: Insuranceadvice,
			meta: {
				title: "投保告知事项"
			}
		}, {
			path: '/insuranceadvice1',
			name: 'insuranceadvice1',
			component: Insuranceadvice1,
			meta: {
				title: "投保告知事项"
			}
		}, {
			path: '/inforUpload',
			name: 'inforUpload',
			component: InforUpload,
			meta: {
				title: "投保资料上传"
			}
		}, {
			path: '/inforUpload1',
			name: 'inforUpload1',
			component: InforUpload1,
			meta: {
				title: "受益人资料上传"
			}
		}, {
			path: '/info1',
			name: 'Info1',
			component: Info1,
			meta: {
				title: "完善投保人信息"
			}
		}, {
			path: '/info2',
			name: 'Info2',
			component: Info2,
			meta: {
				title: "完善被保险人信息"
			}
		}, {
			path: '/info3',
			name: 'Info3',
			component: Info3,
			meta: {
				title: "完善受益人信息"
			}
		}, {
			path: '/enter',
			name: 'enter',
			component: Enter,
			meta: {
				title: "单证签字"
			}
		}, {
			path: '/customer',
			name: 'customer',
			component: Customer,
			meta: {
				title: "人身保险投保提示书"
			}
		}, {
			path: '/dianzi',
			name: 'dainzi',
			component: Dianzi,
			meta: {
				title: "人身保险投保提示书"
			}
		}, {
			path: '/payInfo_tian',
			name: 'PayInfo_tian',
			component: PayInfo_tian,
			meta: {
				title: "交费信息"
			}
		}, {
			path: '/payInfo_tianError',
			name: 'payInfo_tianError',
			component: PayInfo_tianError,
			meta: {
				title: "交费信息"
			}
		},
		{
			path: '/payInfo_tianGai',
			name: 'PayInfo_tianGai',
			component: PayInfo_tianGai,
			meta: {
				title: "修改交费信息"
			}
		}, {
			path: '/order',
			name: 'order',
			component: Order,
			meta: {
				title: "我的投保单"
			}
		},
		{
			path: '/cvrgInfo',
			name: 'CvrgInfo',
			component: CvrgInfo,
			meta: {  
				title: '修改投保信息'
			}
		},
		{
			path: '/popupInfo1',
			name: 'PopupInfo1',
			component: PopupInfo1,
			meta: {  
				title: '投保告知'
			}
		},
		{
			path: '/fail',
			name: 'Fail',
			component: Fail,
			meta: {  
				title: '投保失败'
			}
		},
		{
			path: '/UWfail',
			name: 'UWfail',
			component: UWfail,
			meta: {  
				title: '核保失败'
			}
		},
		{
			path: '/popupInfo2',
			name: 'PopupInfo2',
			component: PopupInfo2,
			meta: {  
				title: '填写投保信息'
			}
		},
		{
			path: '/payFail',
			name: 'PayFail',
			component: PayFail,
			meta: {  
				title: '支付失败'
			}
		},
		{
			path: '/paySucess',
			name: 'PaySucess',
			component: PaySucess,
			meta: {  
				title: '支付成功'
			}
		},
		{
			path: '/popupInfo3',
			name: 'PopupInfo3',
			component: PopupInfo3,
			meta: {  
				title: '核对订单'
			}
		},
		{
			path: '/payInfo',
			name: 'PayInfo',
			component: PayInfo,
			meta: {  
				title: '支付订单'
			}
		},
		{
			path: '/mylifeOrder',
			name: 'mylifeOrder',
			component: MylifeOrder,
			meta: {  
				title: '我的投保单'
			}
		},
		{
			path: '/noPayInfo',
			name: 'NoPayInfo',
			component: NoPayInfo,
			meta: {  
				title: '订单详情'
			}
		}, {
			path: '/matchReport',
			name: 'matchReport',
			component: MatchReport,
			meta: {  
				title: '匹配报告'
			}
		}, {
			path: '/results',
			name: 'results',
			component: Results,
			meta: {  
				title: '支付结果'
			}
		},
		{
			path: '/artificialSubmission',
			name: 'artificialSubmission',
			component: ArtificialSubmission,
			meta: {  
				title: '提交成功'
			}
		},
		{
			path: '/resultf',
			name: 'resultf',
			component: Resultf,
			meta: {  
				title: '支付结果'
			}
		}, {
			path: '/hbresult',
			name: 'hbresult',
			component: Hbresult,
			meta: {  
				title: '核保结果_转人工'
			}
		}, {
			path: '/faresult',
			name: 'faresult',
			component: Faresult,
			meta: {  
				title: '核保结果_拒保'
			}
		}, {
			path: '/faresult1',
			name: 'faresult1',
			component: Faresult1,
			meta: {  
				title: '核保结果'
			}
		}, {
			path: '/guader',
			name: 'guader',
			component: Guader,
			meta: {  
				title: '经纪人委托协议'
			}
		}, {
			path: '/mast',
			name: 'mast',
			component: Mast,
			meta: {  
				title: '重要提示'
			}
		}, {
			path: '/phone',
			name: 'phone',
			component: Phone,
			meta: {  
				title: '验证手机号'
			}
		}, {
			path: '/sign',
			name: 'sign',
			component: Sign,
			meta: {  
				title: '经纪人销售委托合同'
			}
		}, {
			path: '/confirmation',
			name: 'confirmation',
			component: Confirmation,
			meta: {  
				title: '信息确认'
			}
		}, {
			path: '/informaConfirmation',
			name: 'informaConfirmation',
			component: InformaConfirmation,
			meta: {  
				title: '学历信息确认'
			}
		}, {
			path: '/addbankCard',
			name: 'addbankCard',
			component: AddbankCard,
			meta: {  
				title: '添加银行卡'
			}
		}, {
			path: '/handCard',
			name: 'handCard',
			component: HandCard,
			meta: {  
				title: '手持身份证'
			}
		}, {
			path: '/confirm_message',
			name: 'confirm_message',
			component: Confirm_message,
			meta: {  
				title: '信息确认'
			}
		}, {
			path: '/informaReconfirm',
			name: 'informaReconfirm',
			component: InformaReconfirm,
			meta: {  
				title: '信息确认'
			}
		}, {
			path: '/insuraBroker',
			name: 'insuraBroker',
			component: InsuraBroker,
			meta: {  
				title: '申请进度'
			}
		}, {
			path: '/enter1',
			name: 'enter1',
			component: Enter1,
			meta: {
				title: "保单送达确认书"
			}
		}, {
			path: '/issueError',
			name: 'issueError',
			component: IssueError,
			meta: {
				title: "出单失败"
			}
		}, {
			path: '/sucessIssue',
			name: 'sucessIssue',
			component: SucessIssue,
			meta: {
				title: "出单成功"
			}
		},
		{
			path: '/bankCardUpload',
			name: 'bankCardUpload',
			component: BankCardUpload,
			meta: {
				title: "银行卡资料上传"
			}
		}, {
			path: '/bankCardEnter',
			name: 'bankCardEnter',
			component: BankCardEnter,
			meta: {
				title: "银行卡修改签字"
			}
		},
		{
			path: '/bankCardsucess',
			name: 'bankCardsucess',
			component: BankCardsucess,
			meta: {
				title: "银行卡信息修改成功"
			}
		},
		{
			path: '/payResult',
			name: 'payResult',
			component: PayResult,
			meta: {
				title: "支付结果"
			}
		},
		{
			path: '/failindex',
			name: 'failindex',
			component: Failindex,
			meta: {
				title: "审批不通过"
			}
		}, {
			path: '/waitindex',
			name: 'waitindex',
			component: Waitindex,
			meta: {
				title: "等待处理"
			}
		}, {
			path: '/hasregistered',
			name: 'hasregistered',
			component: Hasregistered,
			meta: {
				title: "提交申请成功"
			}
		}, {
			path: '/step',
			name: 'step',
			component: Step,
			meta: {
				title: "审批成功"
			}
		}, {
			path: '/shopLine',
			name: 'shopLine',
			component: ShopLine,
			meta: {
				title: "网销产品	"
			}
		}, {
			path: '/shopLineDe',
			name: 'shopLineDe',
			component: ShopLineDe,
			meta: {
				title: "网销产品详情页	"
			}
		}, {
			path: '/yin',
			name: 'yin',
			component: Yin,
			meta: {
				title: "网销产品详情页	"
			}
		}, {
			path: '/orderDetails',
			name: 'orderDetails',
			component: OrderDetails,
			meta: {
				title: "订单详情"
			}
		}, {
			path: '/affirm',
			name: 'affirm',
			component: Affirm,
			meta: {
				title: "身份申明"
			}
		}, {
			path: '/trialCalculation',
			name: 'trialCalculation',
			component: TrialCalculation,
			meta: {
				title: "保费试算"
			}
		}, {
			path: '/policyHolder',
			name: 'policyHolder',
			component: PolicyHolder,
			meta: {
				title: "投保人"
			}
		}, {
			path: '/recognizee',
			name: 'recognizee',
			component: Recognizee,
			meta: {
				title: "被保人"
			}
		}, {
			path: '/beneficiary',
			name: 'beneficiary',
			component: Beneficiary,
			meta: {
				title: "受益人"
			}
		}, {
			path: '/questionnaire',
			name: 'questionnaire',
			component: Questionnaire,
			meta: {
				title: "投保人健康告知"
			}
		}, {
			path: '/questionnaire1',
			name: 'questionnaire1',
			component: Questionnaire1,
			meta: {
				title: "被保险人健康告知"
			}
		}, {
			path: '/businessInform',
			name: 'businessInform',
			component: BusinessInform,
			meta: {
				title: "业务告知"
			}
		}, {
			path: '/bankCard',
			name: 'bankCard',
			component: BankCard,
			meta: {
				title: "银行卡信息"
			}
		}, {
			path: '/artProtection',
			name: 'artProtection',
			component: ArtProtection,
			meta: {
				title: "待人核审预"
			}
		}, {
			path: '/jkCustomer',
			name: 'jkCustomer',
			component: JkCustomer,
			meta: {
				title: "单证签字"
			}
		}, {
			path: '/paymentProcessing',
			name: 'paymentProcessing',
			component: PaymentProcessing,
			meta: {
				title: "支付处理"
			}
		}, {
			path: '/manualWork',
			name: 'manualWork',
			component: ManualWork,
			meta: {
				title: "人工核保"
			}
		}, {
			path: '/paymentSuccess',
			name: 'paymentSuccess',
			component: PaymentSuccess,
			meta: {
				title: "支付成功"
			}
		}, {
			path: '/paymentFailed',
			name: 'paymentFailed',
			component: PaymentFailed,
			meta: {
				title: "支付失败"
			}
		}, {
			path: '/declinature',
			name: 'declinature',
			component: Declinature,
			meta: {
				title: "拒保"
			}
		}, {
			path: '/detPolicy',
			name: 'detPolicy',
			component: DetPolicy,
			meta: {
				title: "保单详情"
			}
		}, {
			path: '/viewVideo',
			name: 'viewVideo',
			component: ViewVideo,
			meta: {
				title: "影像资料"
			}
		}, {
			path: '/resultfeedback',
			name: 'resultfeedback',
			component: Resultfeedback,
			meta: {
				title: "签名完成"
			}
		}, {
			path: '/receipt',
			name: 'receipt',
			component: Receipt,
			meta: {
				title: "回执"
			}
		}, {
			path: '/relayfeedback',
			name: 'relayfeedback',
			component: Relayfeedback,
			meta: {
				title: "拒保"
			}
		}, {
			path: '/feedbackpayment',
			name: 'feedbackpayment',
			component: Feedbackpayment,
			meta: {
				title: "支付失败"
			}
		}, {
			path: '/feedsubmit',
			name: 'feedsubmit',
			component: Feedsubmit,
			meta: {
				title: "人工核保"
			}
		}, {
			path: '/facerecognition',
			name: 'facerecognition',
			component: Facerecognition,
			meta: {
				title: "投保人人脸识别"
			}
		}, {
			path: '/faceInsured',
			name: 'faceInsured',
			component: FaceInsured,
			meta: {
				title: "被保人人脸识别"
			}
		}, {
			path: '/epolicy',
			name: 'epolicy',
			component: Epolicy,
			meta: {
				title: "投保人电子投保单"
			}
		}, {
			path: '/epolicp',
			name: 'epolicp',
			component: Epolicp,
			meta: {
				title: "被保人电子投保单"
			}
		}, {
			path: '/informationupload',
			name: 'informationupload',
			component: Informationupload,
			meta: {
				title: "投保资料上传"
			}
		}, {
			path: '/fee',
			name: 'fee',
			component: Fee,
			meta: {
				title: "保费试算"
			}
		}, {
			path: '/feeShow',
			name: 'feeShow',
			component: FeeShow,
			meta: {
				title: "保费试算分享"
			}
		}, {
			path: '/applicant',
			name: 'applicant',
			component: Applicant,
			meta: {
				title: "投保人"
			}
		}, {
			path: '/insured',
			name: 'insured',
			component: Insured,
			meta: {
				title: "被保险人"
			}
		}, {
			path: '/idCard',
			name: 'idCard',
			component: IdCard,
			meta: {
				title: "投保人身份证识别"
			}
		}, {
			path: '/inIdCard',
			name: 'inIdCard',
			component: InIdCard,
			meta: {
				title: "被保险人身份证识别"
			}
		}, {
			path: '/ben',
			name: 'ben',
			component: Ben,
			meta: {
				title: "受益人"
			}
		}, {
			path: '/healthTold',
			name: 'healthTold',
			component: HealthTold,
			meta: {
				title: "投保人健康告知"
			}
		},{
			path: '/healthTold1',
			name: 'healthTold1',
			component: HealthTolds,
			meta: {
				title: "被保人健康告知"
			}
		}, {
			path: '/faceAcc',
			name: 'faceAcc',
			component: FaceAcc,
			meta: {
				title: "银行卡识别"
			}
		}, {
			path: '/accInformation',
			name: 'accInformation',
			component: AccInformation,
			meta: {
				title: "银行账户信息"
			}
		}, {
			path: '/msgBook',
			name: 'msgBook',
			component: MsgBook,
			meta: {
				title: "人身保险投保提示书"
			}
		}, {
			path: '/msgShow',
			name: 'msgShow',
			component: MsgShow,
			meta: {
				title: "人身保险投保提示书签字"
			}
		}, {
			path: '/zhDocumentsSign',
			name: 'zhDocumentsSign',
			component: ZhDocumentsSign,
			meta: {
				title: "单证签字"
			}
		}, {
			path: '/informationCon',
			name: 'informationCon',
			component: InformationCon,
			meta: {
				title: "信息确认"
			}
		},{
			path: '/pdfFile',
			name: 'pdfFile',
			component: PdfFile,
			meta: {
				title: "声明和授权"
			}
		},{
			path: '/payBank',
			name: 'payBank',
			component: PayBank,
			meta: {
				title: "原卡支付"
			}
		},{
			path: '/payBank_Error',
			name: 'payBank_Error',
			component: PayBank,
			meta: {
				title: "新卡支付"
			}
		}
	]
})