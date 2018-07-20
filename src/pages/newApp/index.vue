<template>
	<div class="first" v-show="homeShow">
		<div v-if="!cust_status" class="custseven_sattus" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">温馨提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						非保险从业人员，无法通过本平台做产品推广，请联系我们的客服马上办理从业资格认证。
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancer1" @click="notopen">取&nbsp;消</div>
					<div class="cs_btn_bg"></div>
					<a class="cs_btn_cancer2" @click="notopenknow" :href="'tel:' +  phoneNum ">马上联系</a>
				</div>
			</div>
		</div>
		<div class="blur_all" :class="{blur_all1:!cust_status}">
			<div class="banner">
				<mt-swipe :auto="5000" :show-indicators="false">
					<mt-swipe-item  v-for="adImgUrl in adImgUrls" :key="adImgUrl.adCode">
						<img :src="adImgUrl.adImgUrl" class="bannerImg"/>
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="btnBox clearFloat" id="btnBox">
				<dl class="btnDl" @click="handleClickConfirmation">
					<img src="/static/imgNew/icon_planbook3.png" class="btnImg" />
					<dt class="btnDt">计划书</dt>
				</dl>
				<dl class="btnDl" @click="handleCustManagement">
					<img src="/static/imgNew/icon_management3.png" class="btnImg" />
					<dt class="btnDt">客户管理</dt>
				</dl>
				<dl class="btnDl" @click="handleClickZhao">
					<img src="/static/imgNew/icon_getwork3.png" class="btnImg" />
					<dt class="btnDt">签约上岗</dt>
				</dl>
				<dl class="btnDl" @click="handleClickMore">
					<img src="/static/imgNew/icon_workdesktop3.png" class="btnImg" />
					<dt class="btnDt">工作台</dt>
				</dl>
			</div>
			<div class="products">
				<p class="productsTitle clearFloat">
					<span class="proTitText">热销爆款</span>
					<span class="moreBtn right proMore" @click="handleClickMore">查看全部 <b class="triangle_right"></b></span>
				</p>
				<div class="clearFloat proContent">
					<div class="left proLeft" :code="[code1,salecode1]" @click="handleClickDetail"></div>
					<div class="right proRight">
						<div class="proRight1" :code="[code2,salecode2]" @click="handleClickDetail"></div>
						<div class="proRight2" :code="[code3,salecode3]" @click="handleClickDetail"></div>
					</div>
				</div>
			</div>
			<div class="products">
				<p class="productsTitle clearFloat">
					<span class="proTitText">保险看一看</span>
					<span class="moreBtn right proMore" @click="handleClickMore">查看全部 <b class="triangle_right"></b></span>
				</p>
				<div class="clearFloat proContent">
					<img src="/static/imgNew/dis3.png" class="disImg" />
					<p class="disTitle">标题标题标题</p>
					<p class="disTitleDes">描述描述描述描述描述描述</p>
				</div>
				<div class="clearFloat proContent">
					<img src="/static/imgNew/dis3.png" class="disImg" />
					<p class="disTitle">标题标题标题</p>
					<p class="disTitleDes">描述描述描述描述描述描述</p>
				</div>
				<div class="clearFloat proContent">
					<img src="/static/imgNew/dis3.png" class="disImg" />
					<p class="disTitle">标题标题标题</p>
					<p class="disTitleDes">描述描述描述描述描述描述</p>
				</div>
			</div>
		</div>
		<div class="scrollTip">没有更多了~</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Swipe, SwipeItem } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
	  	name: 'newIndex',
	  	props: ['homeShow'],
	  	data(){
	  		return {
//	  			homeShow:this.$route.query.homeShow,
	  			seen:true,
	  			code1:"",
	  			code2:"",
	  			code3:"",
	  			salecode1:"",
	  			salecode2:"",
	  			salecode3:"",
			    adImgUrls:[{
						"adImgUrl":'/static/imgNew/banner3.png',
						"adCode":'1'
					}],
			    proLists:[],
			    temCode:"",
			    cust_status:true,
			    phoneNum:"010-86220865",
			    test:false
	  		}
	  	},
	  	beforeCreate() {
			Indicator.open()
			var data = {
				"userId": localStorage.getItem("userId"),
				"token": localStorage.getItem("token")
			};
			this.$http.post(this.$store.state.link + '/sso/dovltoken', data)
			.then(data => {
				Indicator.close()
				var dataCode = data.data.code;
				if(dataCode == "SYS_S_000") {
					if(data.data.output.flag == "Y") {
						//留在当前页面
					} else {
						this.$router.push('/login')
					}
				} else {
					this.$router.push('/login')
				}
			}, data => {
				Indicator.close()
				this.$router.push('/login')
				console.log(data.data);
			})
		},
	  	created(){
	  		//banner
	  		Indicator.open()
	  		var Shudata={
				"sitCode":"1"
			}
	  		this.$http.post(this.$store.state.link+'/cnt/resource/adlist', Shudata)
			.then(data =>{
				Indicator.close()
			    //console.log(data.data);
				var dataCode = data.data.code;
				if (dataCode == "SYS_S_000") {
//					this.adImgUrls = data.data.output
//					this.adImgUrls = [{
//						"adImgUrl":'/static/imgNew/banner3.png',
//						"adCode":'1'
//					}]
				}else{
					Toast(data.data.desc);
				}
			},data =>{
				Indicator.close()
				console.log(data.data);
			})
			//pro
			var dataprop={
				"showType": "1",
				"tagCodes": [
				    {
				      "tagCode": "TAG000003"
				    }
				]
			};
	  		this.$http.post(this.$store.state.link+'/prd/prod/prodsalelist', dataprop)
			.then(data =>{
				Indicator.close()
//			    console.log(data.data);
				var dataCode = data.data.code;
				if (dataCode == "SYS_S_000") {					
					this.proLists = data.data.output;
					this.code1 = this.proLists[0].prodCodeList[0].prodCode;
					this.code2 = this.proLists[1].prodCodeList[0].prodCode;
					this.code3 = this.proLists[2].prodCodeList[0].prodCode;
					this.salecode1 = this.proLists[0].prodSaleCode;
					this.salecode2 = this.proLists[1].prodSaleCode;
					this.salecode3 = this.proLists[2].prodSaleCode;
				}else{
					Toast(data.data.desc);
				}
			},data =>{
				Indicator.close()
				console.log(data.data);
			})
			var databroker={
				"userId": localStorage.getItem("userId"),
				"token": localStorage.getItem("token")
				
			}
			Indicator.open();
			this.$http.post(this.$store.state.link+'/pct/seloneselfinfo', databroker)
			.then(data =>{
				Indicator.close()
				var dataCode = data.data.code;
				if (dataCode == "SYS_S_000") {
					window.localStorage.BrokerId = data.data.output.brokerId;
					window.localStorage.userName = data.data.output.userName;
					window.localStorage.remind_read=data.data.output.remind_read;
				}else{
					Toast(data.data.desc);
					console.log(data.data.desc);
				}
			},data =>{
				Indicator.close()
				console.log(data.data);
			})
	  	},
	  	methods:{
	  		notopenknow(){
	  			this.cust_status=true;
	  		},
	  		notopen(){
	  			this.cust_status=true;
	  		},
	  		handleClickMore(){
	  			var data = {
					"brokerId": localStorage.BrokerId
				};
				console.log(data)
				this.$http.post(this.$store.state.link + "/core/broker/findBrokerByBrokId", data).then(res => {
					Indicator.close();
					if(res.data.code == "SYS_S_000") {
						var brokerCodehas = res.data.output.hasOwnProperty("brokerCode");					
						if(brokerCodehas == true) {
							this.$router.push('/custConfirmation')
						} else {
							this.cust_status=false;
						}

					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							Toast("登录接口undefined");
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log(res.data)
				})
	  		},
	  		handleClickConfirmation(){
	  			//我的客户确认书
				var data = {
					"brokerId": localStorage.BrokerId
				};
				console.log(data)
				this.$http.post(this.$store.state.link + "/core/broker/findBrokerByBrokId", data).then(res => {
					Indicator.close();
					if(res.data.code == "SYS_S_000") {
						var brokerCodehas = res.data.output.hasOwnProperty("brokerCode");					
						if(brokerCodehas == true) {
							this.$router.push('/custConfirmation')
						} else {
							this.cust_status=false;
						}
					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							Toast("登录接口undefined");
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					console.log(res.data)
				})
	  		},
	  		handleClickZhao(){
				var data={
					 "brokerId":localStorage.getItem("BrokerId"),
					 "userId":""
				}
				Indicator.close();
				this.$http.post(this.$store.state.link+'/core/broker/findBrokerByBrokId', data)
				.then(data =>{
					console.log(data.data)
					Indicator.close()
					var dataCode = data.data.code;
					if (dataCode == "SYS_S_000") {
						if(data.data.output.brokerCode!=undefined){
							window.localStorage.brokerCode=data.data.output.brokerCode;
							this.$router.push('/reinforce');
						}else{
							this.cust_status=false;
						}
					}else{
						Toast(data.data.desc);
						console.log(data.data.desc);
					}
				},data =>{
					Indicator.close()
					console.log(data.data);
				})
	  		},
	  		handleClickDetail(e){
	  			var code=e.currentTarget.getAttribute('code').split(',')
	  			this.$router.push('/detail?prodCode='+code[0]+'&prodSaleCode='+code[1])
	  		},
	  		handleCustManagement(){
	  			this.$router.push('/custSeven')
	  		}
	  	}
	  }
</script>

<style scoped="scoped">
	.left{
		float: left;
	}
	.right{
		float: right;
	}
	input, button {
		background: none;
		border: none;
	}
	input, button {
		outline: none;
	}
	input {
		font-weight: 100;
	}
	input::-ms-clear {
		display: none;
		width: 0;
		height: 0;
	}
	input::-ms-reveal {
		display: none;
	}
	textarea::-webkit-input-placeholder, input::-webkit-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.first {
		width: 100%;
		padding-bottom: 1.7rem;
	}
	.bannerImg {
		display: block;
		width: 6.86rem;
		height: 3.2rem;
		margin: 0 auto;
	}
	.banner {
		width: 100%;
		height: 3.5rem;
		padding-top: 0.32rem;
	}
	.btnBox {
		display: flex;
	}
	.btnDl {
		float: left;
		flex: 1;
	}
	.btnImg {
		display: block;
		height: 0.8rem;
		margin: 0 auto;
	}
	.btnDt {
		margin-top: 0.12rem;
		font-size: 0.28rem;
		color: #000000;
		text-align: center;
	}
	.triangle_right {
		display: inline-block;
        border-right: 0.04rem solid;
        border-bottom: 0.04rem solid;
        width: 0.14rem;
        height: 0.14rem;
        margin-top: -0.2rem;
        transform: rotate(-45deg);
	}
	.products {
		padding-left: 0.3rem;
		padding-top: 0.48rem;
	}
	.productsTitle {
		height: 0.32rem;
		padding-right: 0.3rem;
		line-height: 0.32rem;	
		padding-bottom: 0.24rem;
		border-bottom: solid 0.01rem #D8D8D8;
	}
	.proTitText {
		float: left;
		padding-right: 0.2rem;	
		font-size: 0.32rem;
		color: #222222;
		letter-spacing: 0.01rem;
		font-weight: bold;
	}
	.proTitBor {
		float: left;
		display: inline-block;
		width: 0.04rem;
		height: 0.32rem;
		background: #EB6069;
	}
	.proImg {
		float: left;
		display: inline-block;
		width: 1.468rem;
		height: 0.268rem;
		margin-top: 0.026rem;
		margin-left: 0.2rem;
	}
	.moreBtn {
		font-size: 0.28rem;
		color: #999999;
	}
	.proLeft {
		width: 3.36rem;
		height: 3.36rem;
		background: url(/static/imgNew/tian3.png) no-repeat;
		background-size: cover;
	}
	.proRight1 {
		width: 3.28rem;
		height: 1.6rem;
		background: url(/static/imgNew/zhong3.png) no-repeat;
		background-size: cover;
	}
	.proRight2 {
		width: 3.28rem;
		height: 1.6rem;
		margin-top: 0.16rem;
		background: url(/static/imgNew/zui3.png) no-repeat;
		background-size: cover;
	}
	.proContent{
		margin-top: 0.24rem;
		padding-right: 0.3rem;
		overflow: hidden;
	}
	.disImg {
		display: block;
		width: 6.86rem;
		margin: 0 auto;
	}
	.custseven_sattus {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.2);
	}
	.cs_div_centen {
		overflow: hidden;
		width: 5.42rem;
		height: 3.56rem;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		background: rgba(248, 248, 248, 0.91);
		border-radius: 0.26rem;
		position: relative;
	}
	.cs_div_opentitle {
		width: 100%;
		height: 0.36rem;
		text-align: center;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
		margin-top: 0.32rem;
	}
	.cs_div_openiput1 {
		width: 4.76rem;
		height: 1.23rem;
		margin: 0 auto;
		margin-top: 0.24rem;
		padding: 0 0.3rem 0 0.3rem;
	}
	.cust_p{
		line-height: 0.44rem;
		text-align: justify;
	}
	.cs_btn_bootom {
		width: 5.42rem;
		height: 0.89rem;
		position: absolute;
		bottom: 0;
		border-top: 0.01rem solid #CCCCCC;
	}
	.cs_btn_cancer1 {
		display: block;
		float: left;
		width: 2.69rem;
		height: 0.88rem;
		font-size: 0.32rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		border-right: 0.01rem solid #CCCCCC;
	}
	.cs_btn_bg {
		display: block;
		float: left;
		height: 0.88rem;
		width: 0.01rem;
		background: #CCCCCC;
	}
	.cs_btn_cancer2 {
		display: block;
		float: left;
		width: 2.69rem;
		height: 0.88rem;
		font-size: 0.3rem;
		color: #EB6067;
		line-height: 0.88rem;
		text-align: center;
		font-weight: bold;
	}
	.blur_all {
		width: 100%;
		height: 100%;
	}
	.blur_all1 {
		background-attachment: fixed;
	    -webkit-filter: blur(0.1rem);
	    filter: blur(0.1rem);
	}
	.disTitle {
		height: 0.48rem;
		line-height: 0.48rem;
		margin-top: 0.04rem;
		font-size: 0.24rem;
		font-weight: bold;
		color: #222222;
	}
	.disTitleDes {
		font-size: 0.2rem;
		color: #222222;
		margin-bottom: 0.24rem;
	}
	.scrollTip {
		margin-top: 0.24rem;
		font-size: 0.24rem;
		color: #CCCCCC;
		text-align: center;
	}
</style>