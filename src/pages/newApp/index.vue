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
			<div class="products">
				<p class="productsTitle clearFloat">
					<span class="proTitText">热销爆款</span>
					<span class="moreBtn right proMore" @click="handlePro(2)">查看更多 <b class="triangle_right"></b></span>
				</p>
				<div class="proBox">
					<div class="clearFloat proContent">
						<div class="left proLeft" :code="[code1,salecode1]" @click="handleClickDetail">
							<!--<p class="proLP1">{{pro01}}</p>
							<p class="proLP2">{{pro02}}</p>
							<p class="proLp3P" v-if="pro03!=undefined">
								<span class="proLp3">¥<span class="big">{{pro03}}</span>起</span>
							</p>-->
						</div>
						<div class="right proRight">
							<div class="proRight1" :code="[code2,salecode2]" @click="handleClickDetail">
								<!--<p class="proR1P1">{{pro11}}</p>
								<p class="proR1P2">{{pro12}}</p>
								<p class="proR1P3P" v-if="pro13!=undefined">
									<span class="proR1P3">¥<span class="big">{{pro13}}</span>起</span>
								</p>-->
							</div>
							<div class="proRight2" :code="[code3,salecode3]" @click="handleClickDetail">
								<!--<p class="proR1P1 proR2P1">{{pro21}}</p>
								<p class="proR1P2 proR2P2">{{pro22}}</p>
								<p class="proR1P3P proR2P3P" v-if="pro23!=undefined">
									<span class="proR1P3 proR2P3">¥<span class="big">{{pro23}}</span>起</span>
								</p>-->
							</div>
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
					<img :src="art.picRul" class="disImg" />
					<div class="disText">
						<p class="disTitle">{{art.title}}</p>
						<p class="disTitleDes">{{art.atcDesc}}</p>
						<p class="disTitleDes"><span>{{art.createDatetime}}</span><span class="sign" v-for="tag in art.tagList">{{tag.name}}</span></p>
					</div>
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
	import { MessageBox } from 'mint-ui';
	export default {
	  	name: 'home',
	  	data(){
	  		return {
	  			homeShow:true,
	  			seen:true,
	  			pro01:"",
	  			pro02:"",
	  			pro03:"",
	  			pro11:"",
	  			pro12:"",
	  			pro13:"",
	  			pro21:"",
	  			pro22:"",
	  			pro23:"",
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
			    phoneNum:"010-86220865",
			    test:false,
			    artList:[],
			    signText:'成为合伙人',
			    signStatus:'',
			    failure:''
	  		}
	  	},
	  	beforeCreate() {
			var userInfo = {
				"userId": localStorage.getItem("userId"),
				"token": localStorage.getItem("token")
			}
			this.$http.post(this.$store.state.link + '/sso/dovltoken', userInfo)
			.then(res => {
//				console.log(res.data);
				var dataCode = res.data.code;
				if(dataCode == "SYS_S_000") {
					if(res.data.output.flag == "Y") {
						this.$store.dispatch("changeLoginId", "1")
					} else {
						this.$store.dispatch("changeLoginId", "0")
					}
				} else {
					this.$store.dispatch("changeLoginId", "0")
					window.localStorage.removeItem("phoneNum");
					window.localStorage.removeItem("token");
					window.localStorage.removeItem("userId");
					this.$store.dispatch("changeToken", '')
					this.$store.dispatch("changeUserId", '')
					this.$store.dispatch("changeUserInfoData", {})
					this.$store.dispatch("changeBrokerInfoData", {})
				}
			}, res => {
				this.$store.dispatch("changeLoginId", "0")
				console.log(res.data);
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
			    console.log(data.data);
				var dataCode = data.data.code;
				if (dataCode == "SYS_S_000") {					
					this.proLists = data.data.output;
					this.pro01 = this.proLists[0].prodSaleName;
					this.pro02 = this.proLists[0].prodRecmd;
					this.pro03 = this.proLists[0].minPrice;
					this.pro11 = this.proLists[1].prodSaleName;
					this.pro12 = this.proLists[1].prodRecmd;
					this.pro13 = this.proLists[1].minPrice;
					this.pro21 = this.proLists[2].prodSaleName;
					this.pro22 = this.proLists[2].prodRecmd;
					this.pro23 = this.proLists[2].minPrice;
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
	  	methods:{
	  		handleClickMore(){
	  			if (this.$store.state.loginId == "0") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '请您登录后再进行查看哦',
					  	confirmButtonText: '登录', 
						cancelButtonText: '暂不登录', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/logNew')
					})
				} else {
					this.$router.push('/tool?status='+this.signStatus)
				}
	  		},
	  		handleClickConfirmation(){
	  			if (this.$store.state.loginId == "0") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '请您登录后再进行查看哦',
					  	confirmButtonText: '登录', 
						cancelButtonText: '暂不登录', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/logNew')
					})
				} else {
					if (this.$store.state.brokerInfo.isSignEnum == 'Y' && this.$store.state.brokerInfo.brokerCode != '') {
						this.$router.push('/custConfirmation')
					}else{
						this.path('/custConfirmation')
					}
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
						this.quit()
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
	  			if (this.$store.state.brokerInfo.brokerId) {
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
			quit() {
				var data = {
					"loginNme": this.$store.state.userInfo.userPhone,
					"loginType": "A",
					"token": this.$store.state.token,
					"userId": this.$store.state.userId
				};
				this.$http.post(this.$store.state.link + "/sso/dologout", data).then(res => {
					Indicator.close();
//					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						window.localStorage.removeItem("phoneNum");
						window.localStorage.removeItem("token");
						this.$store.dispatch("changeToken", '')
						this.$store.dispatch("changeUserId", '')
						this.$store.dispatch("changeUserInfoData", {})
						this.$store.dispatch("changeBrokerInfoData", {})
					} else {
						window.localStorage.removeItem("phoneNum");
						window.localStorage.removeItem("token");
						this.$store.dispatch("changeToken", '')
						this.$store.dispatch("changeUserId", '')
						this.$store.dispatch("changeUserInfoData", {})
						this.$store.dispatch("changeBrokerInfoData", {})
					}
				}, res => {
					Indicator.close();
					console.log(res.data)
				})
			},
	  		handleClickSign(){
	  			if (this.$store.state.loginId == "0") {
					this.$router.push('/guader')
				} else {
					if (this.$store.state.brokerInfo.isSignEnum == 'Y' && this.$store.state.brokerInfo.brokerCode != '') {
						this.$router.push('/step?brokerId='+ this.$store.state.brokerInfo.brokerId)
					}else{
						if (this.signStatus == "ZS") {
							this.$router.push('/step?brokerId='+ this.$store.state.brokerInfo.brokerId)//已签约并审核成功
						} else  if (this.signStatus == "") {
							this.$router.push('/guader')
							this.quit()
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
	  			if (this.$store.state.loginId == "0") {
					MessageBox.confirm('',{
					  	title: '提示',
					  	message: '请您登录后再进行查看哦',
					  	confirmButtonText: '登录', 
						cancelButtonText: '暂不登录', 
					  	showCancelButton: true
					}).then(action => {
						this.$router.push('/logNew')
					})
				} else {
					this.$router.push('/custSeven')
				}
	  		},
	  		handlePro(index){
	  			if (index == 2) {
	  				this.$router.push('/newIndex/product')
	  			}
	  			else if (index == 3) {
	  				this.$router.push('/newIndex/descover')
	  			}
	  		},
	  		recommendAjax(){
				var artInfo = {
					"isStick": "y",
					"sence": "s0001",
					"length":0,
					"start": 0
				}
				this.$http.post(this.$store.state.link + "/cnt/atc/queryAtcShow", artInfo)
				.then(res => {
//					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						this.artList = res.data.output.data;
					}
				}, res => {
					console.log(res.data)
				})
			},
			godetail(id){
				console.log(id)
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
		line-height: 0.32rem;
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
	.proLP1 {
		width: 3.1rem;
		margin-top: 0.1rem;
		margin-left: 0.2rem;
		height: 0.44rem;
		line-height: 0.44rem;
		font-size: 0.32rem;
		color: #C09E4B;
		letter-spacing: 0.01rem;		
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.proLP2 {
		width: 2.44rem;
		margin-left: 0.2rem;
		margin-top: 0.08rem;
		line-height: 0.34rem;
		min-height: 0.68rem;
		font-size: 0.24rem;
		color: #444444;
		overflow: hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
	}
	.proLp3P {
		height: 0.38rem;
		margin-left: 0.2rem;
		margin-top: 0.14rem;
		line-height: 0.38rem;
		font-size: 0.24rem;
		color: #FFFFFF;
	}
	.big {
		display: inline-block;
		margin: 0 0.02rem;
		font-size: 0.32rem;
	}
	.proLp3 {
		display: inline-block;
		padding: 0.05rem 0;
		padding-left: 0.1rem;
		padding-right: 0.22rem;
		border-radius: 0 0.3rem 0.3rem 0;
		background: #D8BC75;
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
	.proR1P1 {
		width: 3.1rem;
		padding-top: 0.1rem;
		margin-left: 0.2rem;
		height: 0.44rem;
		line-height: 0.44rem;
		font-size: 0.28rem;
		color:  #72B67E;
		letter-spacing: 0.01rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.proR2P1 {
		color:  #CA9196;
	}
	.proR1P2 {
		width: 1.64rem;
		line-height: 0.26rem;
		min-height: 0.5rem;
		margin-left: 0.2rem;
		font-size: 0.2rem;
		color: #444444;		
		overflow: hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.proR1P3P {
		height: 0.38rem;
		line-height: 0.38rem;
		margin-left: 0.2rem;
		margin-top: 0.08rem;
		font-size: 0.24rem;
		color: #FFFFFF;
	}
	.proR1P3 {
		display: inline-block;
		padding: 0.02rem 0;
		padding-left: 0.1rem;
		padding-right: 0.22rem;
		border-radius: 0 0.3rem 0.3rem 0;
		background: #72B67E;
	}
	.proR2P3 {
		background:  #CA9196;
	}
</style>