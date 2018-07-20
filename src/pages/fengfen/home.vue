<template>
	<div class="first">
		<!--<div class="first_title">
			<img src="../../static/logoFirst.png" class="logoImg" />
			<img src="../../static/qtb.png" class="qtbImg"/>
			<img src="../../static/btn_ling.png" class="btnLingImg"/>
			<img src="../../static/warn.png" class="warnImg"/>
		</div>-->
		<div class="banner">
			<mt-swipe :auto="5000" >
				<mt-swipe-item  v-for="adImgUrl in adImgUrls" :key="adImgUrl.adCode">
					<img :src="adImgUrl.adImgUrl" class="bannerImg"/>
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="btnBox clearFloat" id="btnBox">
			<dl v-for="btnList in btnLists" class="btnDl">
				<img :src="btnList.btnImg" class="btnImg" />
				<dt class="btnDt">{{btnList.btnMessage}}</dt>
			</dl>
		</div>
		<div class="morningN clearFloat">
			<span class="left morningNTitle">
				<img src="../../static/news.png" class="newsImg" />
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
				<img src="../../static/Products2.png" class="proImg" />
				<span class="moreBtn right proMore">更多 <b class="triangle_right"></b></span>
			</p>
			<div class="clearFloat proContent">
				<div class="left proLeft">
					<p class="proLP1">{{pro01}}</p>
					<p class="proLP2">{{pro02}}</p>
					<p class="proLp3P">
						<span class="proLp3">¥<span class="big">{{pro03}}</span>起</span>
					</p>
				</div>
				<div class="right proRight">
					<div class="proRight1" >
						<p class="proR1P1">{{pro11}}</p>
						<p class="proR1P2">{{pro12}}</p>
						<p class="proR1P3P">
							<span class="proR1P3">¥<span class="big">{{pro13}}</span>起</span>
						</p>
					</div>
					<div class="proRight2">
						<p class="proR1P1 proR2P1">{{pro21}}</p>
						<p class="proR1P2 proR2P2">{{pro22}}</p>
						<p class="proR1P3P proR2P3P">
							<span class="proR1P3 proR2P3">¥<span class="big">{{pro23}}</span>起</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<mt-tabbar v-model="selected">
			  	<mt-tab-item id="tab1">
			    	<img slot="icon" src="../../static/home_focus.png">
			    	首页
			  	</mt-tab-item>
			  	<mt-tab-item id="tab2">
			    	<img slot="icon" src="../../static/my_unfocus.png">
			    	我的
			  	</mt-tab-item>
			</mt-tabbar>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Swipe, SwipeItem } from 'mint-ui';
	import { Tabbar, TabItem } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
	  	name: 'First',
	  	data(){
	  		return {
	  			pro01:"",
	  			pro02:"",
	  			pro03:"",
	  			pro11:"",
	  			pro12:"",
	  			pro13:"",
	  			pro21:"",
	  			pro22:"",
	  			pro23:"",
	  			noticeTitle:"早报",
	  			notice:"早报sjkdhsdhfsdhfdshfksdjhfskdjfhksdjhfdsjkfhskdhfdjk",
	  			selected:true,
	  			btnLists: [
			      	{
			      		btnMessage: '客户管理',
			      		btnImg:'/static/user.png'
			      	},
			      	{
			      		btnMessage: '招募合伙人',
			      		btnImg:'/static/pos.png'
			      	},
			      	{
			      		btnMessage: '客户确认书',
			      		btnImg:'/static/mine.png'
			      	},
			      	{
			      		btnMessage: '产品中心',
			      		btnImg:'/static/pro.png'
			      	}
			    ],
			    adImgUrls:[],
			    proLists:[]
	  		}
	  	},
	  	created(){
	  		//banner
	  		var Shudata={
				"sitCode":"1"
			}
	  		axios.post(URL1+'cnt/resource/adlist', Shudata)
			.then(data =>{
			    console.log(data.data);
				var dataCode = data.data.code;
				if (dataCode == "SYS_S_000") {
					this.adImgUrls = data.data.output
				}else{
					Toast(data.data.desc);
				}
			},data =>{
				console.log(data.data);
			})
			//news
			var datafter={
				"":""
			}
	  		axios.post(URL1+'cnt/resource/listtems', datafter)
			.then(data =>{
			    console.log(data);
				var dataCode = data.data.code;
				if (dataCode == "SYS_S_000") {
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
				console.log(data.data);
			})
			//pro
			var dataprop={"kindCode": "",
			  	"showType": "1",
			  	"tagCodes": [
				    {
				      "tagCode": "TAG000004"
				    }
			  	],
			  	"tmpType": "3"
			};
	  		axios.post(URL1+'prd/prod/prodlist', dataprop)
			.then(data =>{
			    console.log(data);
				var dataCode = data.data.code;
				if (dataCode == "SYS_S_000") {					
					this.proLists = data.data.output;
					
					this.pro01 = this.proLists[0].prodName;
					this.pro02 = this.proLists[0].prodDesc;
					this.pro03 = this.proLists[0].minPrice;
					this.pro11 = this.proLists[1].prodName;
					this.pro12 = this.proLists[1].prodDesc;
					this.pro13 = this.proLists[1].minPrice;
					this.pro21 = this.proLists[2].prodName;
					this.pro22 = this.proLists[2].prodDesc;
					this.pro23 = this.proLists[2].minPrice;
					
				}else{
					Toast(data.data.desc);
				}
			},data =>{
				console.log(data.data);
			})
			
	  	},
	  	methods:{
	  		
	  	}
	  	
	  }
</script>

<style scoped="scoped">
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
		margin-top: 0.44rem;
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
		background: url(../../static/p1.png) no-repeat;
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
		-webkit-box-orient:vertical;
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
		height: 0.38rem;
		line-height: 0.38rem;
		margin: 0 0.02rem;
		font-size: 0.32rem;
	}
	.proLp3 {
		padding: 0.05rem 0;
		padding-left: 0.1rem;
		padding-right: 0.22rem;
		border-radius: 0 0.19rem 0.19rem 0;
		background: #D8BC75;
	}
	.proRight1 {
		width: 3.32rem;
		height: 1.7rem;
		background: url(../../static/p2.png) no-repeat;
		background-size: cover;
	}
	.proRight2 {
		width: 3.32rem;
		height: 1.7rem;
		margin-top: 0.2rem;
		background: url(../../static/p3.png) no-repeat;
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
		font-size: 0.16rem;
		color: #444444;		
		overflow: hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.proR1P3P {
		height: 0.38rem;
		margin-left: 0.2rem;
		margin-top: 0.08rem;
		line-height: 0.38rem;
		font-size: 0.24rem;
		color: #FFFFFF;
	}
	.proR1P3 {
		padding: 0.05rem 0;
		padding-left: 0.1rem;
		padding-right: 0.22rem;
		border-radius: 0 0.19rem 0.19rem 0;
		background: #72B67E;
	}
	.proR2P3 {
		background:  #CA9196;
	}
</style>