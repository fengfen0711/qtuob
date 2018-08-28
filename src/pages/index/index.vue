<template>
	<div class="first">
		<div v-if="!cust_status" class="custseven_sattus" @touchmove.prevent>
			<div class="cs_div_centen">
				<div class="cs_div_opentitle">温馨提示</div>
				<div class="cs_div_openiput1">
					<p class="cust_p">
						非保险从业人员，无法通过本平台做产品推广，请联系我们的客服马上办理从业资格认证。
					</p>
				</div>
				<div class="cs_btn_bootom">
					<div class="cs_btn_cancer1" @click="notopen">取消</div>
					<div class="cs_btn_bg"></div>
					<a class="cs_btn_cancer2" @click="notopenknow" :href="'tel:' +  phoneNum ">马上联系</a>
				</div>
			</div>
		</div>
		<div class="blur_all" :class="{blur_all1:test}">
			<div class="banner">
				<mt-swipe :auto="5000" :show-indicators="false">
					<mt-swipe-item  v-for="adImgUrl in adImgUrls" :key="adImgUrl.adCode">
						<img :src="adImgUrl.adImgUrl" class="bannerImg"/>
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="btnBox clearFloat" id="btnBox">
				<dl class="btnDl" @click="handleCustManagement">
					<img src="/static/img/user.png" class="btnImg" />
					<dt class="btnDt">客户管理</dt>
				</dl>
				<dl class="btnDl" @click="handleClickZhao">
					<img src="/static/img/pos.png" class="btnImg" />
					<dt class="btnDt">招募合伙人</dt>
				</dl>
				<dl class="btnDl" @click="handleClickConfirmation">
					<img src="/static/img/mine.png" class="btnImg" />
					<dt class="btnDt">客户委托书</dt>
				</dl>
				<dl class="btnDl" @click="handleClickMore">
					<img src="/static/img/pro.png" class="btnImg" />
					<dt class="btnDt">产品中心</dt>
				</dl>
			</div>
			<div class="morningN clearFloat" @click="handleClickAfternoon">
				<span class="left morningNTitle">
					<img src="/static/img/news.png" class="newsImg" />
					<span class="newsText">{{noticeTitle}}</span>
				</span>
				<div class="left noticeDivBox" id="noticeDivBox">
	                <p class="notice">{{notice}}</p>
	           </div>
			</div>
			<div class="products">
				<p class="productsTitle clearFloat">
					<span class="proTitText">产品甄选</span>
					<span class="proTitBor"> </span>
					<img src="/static/img/Products2.png" class="proImg" />
					<span class="moreBtn right proMore" @click="handleClickMore">更多 <b class="triangle_right"></b></span>
				</p>
				<div class="clearFloat proContent">
					<div class="left proLeft" :code="[code1,salecode1]" @click="handleClickDetail">
						<p class="proLP1">{{pro01}}</p>
						<p class="proLP2">{{pro02}}</p>
						<p class="proLp3P" v-if="pro03!=undefined">
							<span class="proLp3">¥<span class="big">{{pro03}}</span>起</span>
						</p>
					</div>
					<div class="right proRight">
						<div class="proRight1" :code="[code2,salecode2]" @click="handleClickDetail">
							<p class="proR1P1">{{pro11}}</p>
							<p class="proR1P2">{{pro12}}</p>
							<p class="proR1P3P" v-if="pro13!=undefined">
								<span class="proR1P3">¥<span class="big">{{pro13}}</span>起</span>
							</p>
						</div>
						<div class="proRight2" :code="[code3,salecode3]" @click="handleClickDetail">
							<p class="proR1P1 proR2P1">{{pro21}}</p>
							<p class="proR1P2 proR2P2">{{pro22}}</p>
							<p class="proR1P3P proR2P3P" v-if="pro23!=undefined">
								<span class="proR1P3 proR2P3">¥<span class="big">{{pro23}}</span>起</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<Bottom :seen="seen"></Bottom>
	</div>
</template>

<script>
	import Bottom from "./bottom.vue"
	import { Toast } from 'mint-ui'
	import { Swipe, SwipeItem } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
	  	name: 'First',
	  	data(){
	  		return {
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
	  			noticeTitle:"早报",
	  			notice:"",
	  			selected:true,
			    adImgUrls:[],
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
//			console.log("===王璇接口data==" + JSON.stringify(data));
			this.$http.post(this.$store.state.link + '/sso/dovltoken', data)
			.then(data => {
				Indicator.close()
//				console.log("===王璇接口token校验==" + JSON.stringify(data.data));
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
					this.adImgUrls = data.data.output
				}else{
					Toast(data.data.desc);
				}
			},data =>{
				Indicator.close()
				console.log(data.data);
			})
			//news
			var datafter={
				"":""
			}
	  		this.$http.post(this.$store.state.link+'/cnt/resource/listtems', datafter)
			.then(data =>{
				Indicator.close()
			    //console.log(data.data);
				var dataCode = data.data.code;
				if (dataCode == "SYS_S_000") {
					this.temCode=data.data.output[0].temCode
					if (data.data.output[0].temType == "1") {
						this.noticeTitle = "早报"
						this.notice = data.data.output[0].temTitle;
					}
					else if (data.data.output[0].temType == "2") {
						this.noticeTitle = "午报"
						this.notice = data.data.output[0].temTitle;
					}
					else if (data.data.output[0].temType == "3") {
						this.noticeTitle = "晚报"
						this.notice = data.data.output[0].temTitle;
					}
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
				console.log("dfr3333=="+JSON.stringify(data.data));
				if (dataCode == "SYS_S_000") {
					window.localStorage.BrokerId = data.data.output.brokerId;
					window.localStorage.userName = data.data.output.userName;
					window.localStorage.remind_read=data.data.output.remind_read;
				}else{
					//Toast(data.data.desc);
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
//	  			this.test=false;
	  		},
	  		handleClickMore(){
	  			this.$router.push('/produch')
	  		},
	  		handleClickConfirmation(){
	  			//我的客户确认书
				var data = {
					"brokerId": localStorage.BrokerId
				};
				console.log(data)
				this.$http.post(this.$store.state.link + "/core/broker/findBrokerByBrokId", data).then(res => {
					Indicator.close();
					console.log("总数据111111==" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						var brokerCodehas = res.data.output.tblBroker.hasOwnProperty("brokerCode");					
						if(brokerCodehas == true) {
							this.$router.push('/custConfirmation')
						} else {
//							Toast("尚未获得经纪人资格，快去申请经纪人资格吧");
								this.cust_status=false;
						}

					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					
					console.log("2===" + res.data)
				})
	  			
	  			
	  			
	  		},
	  		handleClickZhao(){
//	  			if(localStorage.getItem("BrokerId")!=undefined){
//	  				this.$router.push('/reinforce')
//	  			}else{
//	  				Toast("尚未获得经纪人资格,不能查看招募合伙人");
//	  			}
				var data={
					 "brokerId":localStorage.getItem("BrokerId"),
					 "userId":""
					 
				}
				Indicator.close();
				this.$http.post(this.$store.state.link+'/core/broker/findBrokerByBrokId', data)
				.then(data =>{
					console.log("sdfg"+JSON.stringify(data))
					Indicator.close()
					var dataCode = data.data.code;
					if (dataCode == "SYS_S_000") {
							if(data.data.output.tblBroker.brokerCode!=undefined){
								window.localStorage.brokerCode=data.data.output.brokerCode;
								this.$router.push('/reinforce');
							}else{
//								Toast("尚未获得经纪人资格,不能查看招募合伙人");
								this.cust_status=false;
//								this.test=true;
							}
						
					
					}else{
						Toast(data.data.desc);
					}
				},data =>{
					Indicator.close()
					console.log(data.data);
				})
					
		  			
	  		},
	  		handleClickAfternoon(){
	  			this.$router.push('/afternoon?temCode='+this.temCode)
	  		},
	  		handleClickDetail(e){
	  			var code=e.currentTarget.getAttribute('code').split(',')
	  			this.$router.push('/detail?prodCode='+code[0]+'&prodSaleCode='+code[1])
	  		},
	  		handleCustManagement(){
	  			this.$router.push('/custSeven')
	  		}
//	  		prodCode
//	  		prodSaleCode
	  	},
	  	components:{
    		Bottom : Bottom
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
	.first_title {
		position: relative;
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
	}
	.logoImg {
		display: inline-block;
		width: 0.48rem;
		height: 0.5rem;
		margin: 0 0.16rem 0 0.3rem;
		vertical-align: middle;
	}
	.qtbImg {
		display: inline-block;
		width: 1.22rem;
		height: 0.32rem;
		vertical-align: middle;
	}
	.btnLingImg {
		display: inline-block;
		float: right;
		width: 0.48rem;
		height: 0.48rem;
		margin-top: 0.2rem;
		margin-right: 0.3rem;
	}
	.warnImg {
		position: absolute;
		top: 0.28rem;
		right: 0.36rem;
		width: 0.12rem;
		height: 0.12rem;
	}
	.bannerImg {
		display: block;
		width: 7.14rem;
		height: 3.44rem;
		margin: 0 auto;
	}
	.banner {
		width: 100%;
		height: 3.7rem;
		margin-top: 0.2rem;
	}
	.btnBox {
		display: flex;
		/*margin-top: 0.44rem;*/
		padding-bottom: 0.45rem;
		border-bottom: solid 0.01rem #D8D8D8;
	}
	.btnDl {
		float: left;
		flex: 1;
	}
	.btnImg {
		display: block;
		width: 0.8rem;
		height: 0.8rem;
		margin: 0 auto;
	}
	.btnDt {
		margin-top: 0.12rem;
		font-size: 0.24rem;
		color: #000000;
		text-align: center;
	}
	.morningN {
		width: 100%;
		height: 0.68rem;
		line-height: 0.68rem;
		overflow: hidden;
		border-bottom: solid 0.08rem #F4F4F4;
	}
	.newsImg {
		display: inline-block;
		width: 0.34rem;
		height: 0.34rem;
		margin: 0 0.17rem 0 0.3rem;
		vertical-align: middle;
	}
	.newsText {
		padding-right: 0.15rem;
		font-size: 0.3rem;
		color: #FFB948;
		letter-spacing: 1.07px;
		border-right: solid 0.01rem #D8D8D8;
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
	.noticeDivBox {
		width: 5.1rem;
		margin-left: 0.15rem;
		font-size: 0.28rem;		
		color: #444444;
		letter-spacing: 0.01rem;
	}
	.notice {
		width: 5.1rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.products {
		padding: 0 0.3rem;
		padding-top: 0.32rem;
	}
	.productsTitle {
		height: 0.32rem;		
		line-height: 0.32rem;	
		margin-bottom: 0.24rem;
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
		width: 3.32rem;
		height: 3.68rem;
		background: url(/static/img/p1.png) no-repeat;
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
		/* autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
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
		width: 3.32rem;
		height: 1.7rem;
		background: url(/static/img/p2.png) no-repeat;
		background-size: cover;
	}
	.proRight2 {
		width: 3.32rem;
		height: 1.7rem;
		margin-top: 0.2rem;
		background: url(/static/img/p3.png) no-repeat;
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
	.proContent{
		overflow: hidden;
	}
	.custseven_sattus {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		z-index: 100;
		background: rgba(0, 0, 0, 0.20);
	}
	.cs_div_centen {
		overflow: hidden;
		width: 5.42rem;
		height: 3.56rem;
		margin: 0 auto;
		margin-top: 50%;
		border-radius: 0.16rem;
		background: rgba(248, 248, 248, 0.90);
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
		margin-top: 0.38rem;
		padding: 0 0.3rem 0 0.3rem;
	}
	.cust_p{
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
		font-size: 0.32rem;
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
		filter: blur(0.18rem);
	}
</style>