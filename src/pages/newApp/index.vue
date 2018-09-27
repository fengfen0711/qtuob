<template>
	<div class="first" v-show="homeShow">
		<div class="blur_all" :class="{blur_all1:!cust_status}">
			<div class="banner">
				<mt-swipe :auto="5000" :show-indicators="false">
					<mt-swipe-item  v-for="adImgUrl in adImgUrls" :key="adImgUrl.adCode">
						<img :src="adImgUrl.adImgUrl" class="bannerImg"/>
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="btnBox clearFloat" id="btnBox">
				<dl class="btnDl" @click="handleCustManagement">
					<img src="/static/imgNew/icon_management3.png" class="btnImg" />
					<dt class="btnDt">客户管理</dt>
				</dl>
				<dl class="btnDl" @click="handleClickMore">
					<img src="/static/imgNew/icon_assist3.png" class="btnImg" />
					<dt class="btnDt">展业辅助</dt>
				</dl>
				<dl class="btnDl" @click="handleClickSign">
					<img src="/static/imgNew/icon_partner3.png" class="btnImg" />
					<dt class="btnDt">{{signText}}</dt>
				</dl>
				<dl class="btnDl" @click="handleClickConfirmation">
					<img src="/static/imgNew/icon_planbook3.png" class="btnImg" />
					<dt class="btnDt">客户委托书</dt>
				</dl>
			</div>
			<div class="products" ref="products">
				<p class="productsTitle clearFloat">
					<span class="proTitText" @click="a">热销爆款</span>
					<span class="moreBtn right proMore" @click="handlePro(2)">查看更多 <b class="triangle_right"></b></span>
				</p>
				<div class="proBox">
					<div class="clearFloat proContent">
						<div class="left proLeft" :code="[code1,salecode1]" @click="handleClickDetail"></div>
						<div class="right proRight">
							<div class="proRight1" :code="[code2,salecode2]" @click="handleClickDetail"></div>
							<div class="proRight2" :code="[code3,salecode3]" @click="handleClickDetail"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="products">
				<p class="productsTitle clearFloat">
					<span class="proTitText">保险看一看</span>
					<span class="moreBtn right proMore" @click="handlePro(3)">查看更多 <b class="triangle_right"></b></span>
				</p>
				<div class="clearFloat proContent" :class="art.atcStyle | layout" v-for="art in artList" @click="godetail(art.articleId)">
					<img :src="art.picUrl" class="disImg" />
					<div class="disText">
						<p class="disTitle">{{art.title}}</p>
						<p class="disTitleDes">{{art.actDesc}}</p>
						<p class="disTitleDes"><span>{{art.createTime}}</span><span class="sign" v-for="tag in art.tagList">{{tag.name}}</span></p>
					</div>
				</div>
			</div>
		</div>
		<div class="scrollTip">没有更多了~</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Swipe, SwipeItem } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
	  	name: 'home',
	  	data(){
	  		return {
	  			homeShow:true,
	  			seen:true,
	  			code1:"",
	  			code2:"",
	  			code3:"",
	  			salecode1:"",
	  			salecode2:"",
	  			salecode3:"",
			    adImgUrls:[],
			    proLists:[],
			    temCode:"",
			    cust_status:true,
			    test:false,
			    artList:[],
			    signText:'成为合伙人',
			    signStatus:'',
			    failure:''
	  		}
	  	},
	  	beforeCreate() {
	  		if (localStorage.token) {
	  			var tokenInfo = {
					"token": this.$store.state.token
				}
	  			this.$http.post(this.$store.state.link + '/sso/v2/refreshToken', tokenInfo)
				.then(res =>{
					Indicator.close()
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						window.localStorage.token = res.data.output.token;
						this.$store.dispatch("changeLoginId", res.data.output.userInfo.userType);
						if (res.data.output.userInfo.userId) {
							window.localStorage.userId = res.data.output.userInfo.userId;
							window.localStorage.phoneNum = res.data.output.userInfo.userPhone;
							window.localStorage.isBindWeChat = res.data.output.userInfo.isBindWeChat;
							if (res.data.output.brokerInfo && res.data.output.brokerInfo.brokerId) {
								window.localStorage.BrokerId = res.data.output.brokerInfo.brokerId;
							}
							this.$store.dispatch("changeToken", res.data.output.token);
							this.$store.dispatch("changeUserId", res.data.output.userInfo.userId);
							this.$store.dispatch("changeUserInfoData", {});
							this.$store.dispatch("changeUserInfoData", res.data.output.userInfo);
							this.$store.dispatch("changeBrokerInfoData", {});
							this.$store.dispatch("changeBrokerInfoData", res.data.output.brokerInfo);
						}
						this.init();
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc)
					}
				},res =>{
					Indicator.close()
					console.log(res.data);
				})
	  		}else{
				window.localStorage.removeItem("token");
				window.localStorage.removeItem("userId");
				window.localStorage.removeItem("isBindWeChat");
				if (localStorage.BrokerId) {
					window.localStorage.removeItem("BrokerId");
				}
				this.$store.dispatch("changeLoginId", '0');
				this.$store.dispatch("changeToken", '')
				this.$store.dispatch("changeUserId", '')
				this.$store.dispatch("changeUserInfoData", {})
				this.$store.dispatch("changeBrokerInfoData", {})
				var sceneInfo = {
					"sceneCode": "s001"
				}
	  			this.$http.post(this.$store.state.link + '/sso/v2/applytoken', sceneInfo)
				.then(res =>{
					Indicator.close()
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						window.localStorage.token = res.data.output.token;
						this.$store.dispatch("changeToken", res.data.output.token);
						this.$store.dispatch("changeLoginId", res.data.output.userType);
						this.init();
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc)
					}
				},res =>{
					Indicator.close()
					console.log(res.data);
				})
	  		}
		},
	  	created(){
	  		
	  	},
	  	methods:{
	  		init(){
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
						this.adImgUrls = data.data.output;
					}else{
						Toast(data.data.desc);
						console.log(data.data.desc)
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
						console.log(data.data.desc);
					}
				},data =>{
					Indicator.close()
					console.log(data.data);
				})
				
				this.recommendAjax()
				this.getBroInfo()
	  		},
	  		a(){
	  			var a = this.$refs.products.offsetWidth;
	  			alert(a)
	  			console.log(a)
	  		},
	  		handleClickMore(){
				this.$router.push('/tool?status='+this.signStatus)
	  		},
	  		handleClickConfirmation(){
				this.loginIdF('/custConfirmation',1)
	  		},
	  		loginIdF(pathAddr,a){
	  			if (this.$store.state.loginId == "0") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '请您登录后再进行查看哦',
					  	confirmButtonText: '登录', 
						cancelButtonText: '暂不登录', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/regLog')
					})
				} else if (this.$store.state.loginId == "1") {
					if (a == 1) {
						this.path(pathAddr)
					}else{
						this.$router.push(pathAddr)
					}
				}else if (this.$store.state.loginId == "2") {
					this.$router.push(pathAddr)
				}
	  		},
	  		path(pathAdd){
	  			if (this.signStatus == "ZS") {
					this.$router.push(pathAdd)
				} else  if (this.signStatus == "") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '您尚未与上海明大保险经纪有限公司签约，无法使用此功能。',
					  	confirmButtonText: '签约', 
						cancelButtonText: '暂不签约', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/guader')
					})
				} else  if (this.signStatus == "NE" || this.signStatus == "CE" || this.signStatus == "ZE") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '您的签约审核失败，是否修改信息',
					  	confirmButtonText: '修改', 
						cancelButtonText: '暂不修改', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/failindex?brokerId='+ this.$store.state.brokerInfo.brokerId+'&failure=' + this.failure)//审核失败
					})
				} else  if (this.signStatus == "TN" || this.signStatus == "CN" || this.signStatus == "ZN") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '您的签约合伙人正在审核中，不要着急哦',
					  	confirmButtonText: '查看进度', 
						cancelButtonText: '暂不查看', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/waitindex?regStatus='+ this.signStatus)//审核中
					})
				}
	  		},
	  		getBroInfo(){
	  			if (this.$store.state.brokerInfo && this.$store.state.brokerInfo.brokerId) {
	  				var broInfo = {
						"brokerId": this.$store.state.brokerInfo.brokerId,
					}
					this.$http.post(this.$store.state.link + "/core/broker/brokerRegStatus", broInfo)
					.then(res => {
//						console.log(res.data)
						if(res.data.code == "SYS_S_000") {
							if (res.data.output.brokerReg && res.data.output.brokerReg.regStatus) {
								if (res.data.output.brokerReg.status == 'Y') {
									this.signStatus = res.data.output.brokerReg.regStatus
									this.failure = res.data.output.tblBrokerRegHis.regRemarks;
								}
							}else{
								this.signStatus = ""
							}
						}
					}, res => {
						console.log(res.data)
					})
	  			}else{
	  				this.signStatus = ""
	  			}
	  		},
	  		handleClickSign(){
	  			if (this.$store.state.loginId == "0") {
					this.$router.push('/guader')
				} else {
					if (this.$store.state.loginId == "2") {
						this.$router.push('/step?brokerId='+ this.$store.state.brokerInfo.brokerId)
					}else{
						if (this.signStatus == "ZS") {
							this.$router.push('/step?brokerId='+ this.$store.state.brokerInfo.brokerId)//已签约并审核成功
						} else  if (this.signStatus == "") {
							this.$router.push('/guader')
						} else  if (this.signStatus == "NE" || this.signStatus == "CE" || this.signStatus == "ZE") {
							this.$router.push('/failindex?brokerId='+ this.$store.state.brokerInfo.brokerId+'&failure=' + this.failure)//审核失败
						} else  if (this.signStatus == "TN" || this.signStatus == "CN" || this.signStatus == "ZN") {
							this.$router.push('/waitindex?regStatus='+ this.signStatus)//审核中
						}
					}
				}
	  		},
	  		handleClickDetail(e){
	  			var code=e.currentTarget.getAttribute('code').split(',')
	  			this.$router.push('/detail?prodCode='+code[0]+'&prodSaleCode='+code[1])
	  		},
	  		handleCustManagement(){
				this.loginIdF('/custSeven')
	  		},
	  		handlePro(index){
	  			if (index == 2) {
	  				this.$router.push('/product')
	  			}
	  			else if (index == 3) {
	  				this.$router.push('/descover/recommend')
	  			}
	  		},
	  		recommendAjax(){
				var artInfo = {
					"typeId": "0-3",
					"pageIndex":0,
					"pageSize": 0
				}
				console.log(artInfo)
				this.$http.post(this.$store.state.link + "/cnt/atc/selArticleList", artInfo)
				.then(res => {
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						this.artList = res.data.output;
					}
				}, res => {
					console.log(res.data)
				})
			},
			godetail(id){
//				console.log(id)
				this.$router.push('/artDetail?detailId='+id)
			},
	  	},
		filters:{
			layout : function (value){
				if(value == "U"){
					return value = 'imgUpTextDown' 
				}
				else if(value == "D"){
					return value = 'textUpImgDown' 
				}
				else if(value == "L"){
					return value = 'imgLeftTextRight' 
				}
				else if(value == "R"){
					return value = 'textLeftImgRight' 
				}
			}
		},
	}
</script>

<style scoped="scoped">
	.left{
		float: left;
	}
	.right{
		float: right;
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
		width: 7.18rem;
		padding-left: 0.32rem;
		padding-top: 0.48rem;
	}
	.proBox {
		width: 6.86rem;
		padding-right: 0.32rem;
	}
	.proContent{
		position: relative;
		margin-top: 0.32rem;
		overflow: hidden;
	}
	.imgUpTextDown {
		height: 4.62rem;
	}
	.imgUpTextDown .disImg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		display: block;
		width: 6.86rem;
		height: 3.2rem;
		background: rgba(0,0,0,0.03);
		margin: 0 auto;
	}
	.imgUpTextDown .disText{
		position: absolute;
		top: 3.32rem;
		left: 0;
		z-index: 1;
	}
	.textUpImgDown {
		height: 4.62rem;
	}
	.textUpImgDown .disImg {
		position: absolute;
		top: 1.4rem;
		left: 0;
		z-index: 1;
		display: block;
		width: 6.86rem;
		height: 3.2rem;
		background: rgba(0,0,0,0.03);
		margin: 0 auto;
	}
	.textUpImgDown .disText{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.imgUpTextDown .disTitle, .textUpImgDown .disTitle {
		width: 6.86rem;
		height: 0.48rem;
		line-height: 0.48rem;
		margin-top: 0.02rem;
		font-size: 0.32rem;
		font-weight: bold;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.imgUpTextDown .disTitleDes, .textUpImgDown .disTitleDes {
		width: 6.86rem;
		height: 0.4rem;
		line-height: 0.4rem;
		font-size: 0.24rem;
		color: #555555;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.sign {
		margin-left: 0.2rem;
		color: #E73748;
	}
	.imgLeftTextRight {
		height: 2.14rem;
	}
	.imgLeftTextRight .disImg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		display: block;
		width: 2.14rem;
		height: 2.14rem;
		background: rgba(0,0,0,0.03);
		margin: 0 auto;
	}
	.imgLeftTextRight .disText{
		position: absolute;
		top: 0;
		left: 2.76rem;
		z-index: 1;
	}
	.textLeftImgRight {
		height: 2.14rem;
	}
	.textLeftImgRight .disImg {
		position: absolute;
		top: 0;
		left: 4.72rem;
		z-index: 1;
		display: block;
		width: 2.14rem;
		height: 2.14rem;
		background: rgba(0,0,0,0.03);
		margin: 0 auto;
	}
	.textLeftImgRight .disText{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.imgLeftTextRight .disTitle, .textLeftImgRight .disTitle {
		width: 4.1rem;
		height: 0.8rem;
		line-height: 0.42rem;
		margin-top: 0.02rem;
		font-size: 0.32rem;
		font-weight: bold;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box; 
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
	}
	.imgLeftTextRight .disTitleDes, .textLeftImgRight .disTitleDes {
		width: 4.1rem;
		/*height: 0.64rem;*/
		line-height: 0.34rem;
		margin-top: 0.16rem;
		margin-bottom: 0.22rem;
		font-size: 0.24rem;
		color: #555555;
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box; 
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
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
	.moreBtn {
		font-size: 0.28rem;
		color: #999999;
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
	.scrollTip {
		margin-top: 0.24rem;
		font-size: 0.24rem;
		color: #CCCCCC;
		text-align: center;
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
</style>