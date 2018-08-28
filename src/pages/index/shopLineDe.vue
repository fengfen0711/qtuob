<template>
	<div class="background">
		<div ref="mask" class="mask">
			<div class="detail">
				<p class="mask_title">条款</p>
				<div class="mask_content">
					<p @click="handleClickClauseItem" class="mask_list" v-for="item in clauseList" :code='item.fileSerialNo'>
						<span class="mask_name">{{item.clusName}}</span>
					</p>
				</div>
				<p @click="handleClikClose" class="mask_button">关闭</p>
			</div>
		</div>
		<div class="content">
			<img class="banner" :src="banner" />
			<div class="plan">
				<p class="form_title">保障计划</p>
				<p class="item item1" ref="item1">
					<img class="point" src="/static/img/point.png"></img>
					<span class="item_left">投保年龄</span>
					<span class="item_right op1">{{age}}</span>
				</p>
				<p class="item item2" ref="item2">
					<img class="point" src="/static/img/point.png"></img>
					<span class="item_left">保险期间</span>
					<span class="item_right  op2">{{year}}</span>
				</p>
				<p class="item item3" ref="item3">
					<img class="point" src="/static/img/point.png"></img>
					<span class="item_left">保障额度</span>
					<span class="item_right op3">{{money}}</span>
				</p>
			</div>
			<div class="project">
				<p class="form_title">保障项目</p>
				<div class="form_title_content">
					<div code="close" class="list close" v-for="item in listItem" @click="handleClickOpen">
						<img class="point" src="/static/img/point.png" />
						<span class="name">{{item.dutyName}}</span>
						<img class="open" src="/static/img/open.png" />
						<div class="article">{{item.dutyDesc}}</div>
					</div>
				</div>
				<p class="more">
					更多详情请查看<span ref="clauseList" class="listData" @click="handleClickList">《产品条款》</span>
				</p>
			</div>
			<div class="img"></div>
		</div>
		<!--v-bind:peopledetail="prodInfo"-->
		<!--<ShangHai v-show="shangHaiShow" :prodNo="prodNo,saleStatus,unSaleDes"></ShangHai>-->
		<!--
        	作者：786620470@qq.com
        	时间：2018-07-13
        	描述：干掉
        -->
		<!--<TianAn v-show="tianAnShow" :prodNo="prodNo,prodInfo,saleStatus,unSaleDes,cmpCode"></TianAn>-->
		<div class="btnBox" @click="handleClick">马上购买</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import ShangHai from './buy/shangHai.vue'
	import TianAn from './buy/tianAn.vue'
	import { Indicator } from 'mint-ui';
	import { Swipe, SwipeItem } from 'mint-ui';
	export default {
		name: "Login",
		data() {
			return {
				age: "",
				year: "",
				money: "",
				kindCode: "",
				banner: "",
				listItem: [],
				clauseList: [],
				prodCode: "",
				prodSaleCode: "",
				shangHaiShow: false,
				tianAnShow: false,
				cmpCode: "",
				prodNo: '',
				prodInfo: [],
				saleStatus:"",
				unSaleDes:'',
			}
		},
		created() {
			this.prodCode = this.$route.query.prodCode
			this.prodSaleCode = this.$route.query.prodSaleCode
			this.getData()
			this.getClause()
		},
		methods: {
			getData() {
				var data = {
					"cvrgExtType": "3",
					"prodCode": this.prodCode,
					"prodSaleCode": this.prodSaleCode
				}
				Indicator.open()
				this.$http.post(this.$store.state.link + '/prd/prod/saledetail', data).then(response => {
//					console.log("asdas==" + JSON.stringify(response.data))
//					console.log(response.data)
					this.prodInfo = response.data.output.prodInfo;
					this.prodNo = response.data.output.prodInfo.prodNo;
					this.cmpCode = response.data.output.prodInfo.cmpCode;
					this.saleStatus = response.data.output.prodInfo.saleStatus;
					if(this.saleStatus == "0"){
						this.unSaleDes = response.data.output.prodInfo.unsaleDesc;
					}
					
					var data = response.data.output.cvrgList;
					for(var i = 0, j = data.length; i < j; i++) {
						if(data[i].cvrgType == "M") {
							//年龄
							if(data[i].cvrgExtInfo != undefined) {
								if(data[i].cvrgExtInfo.minInsuredUnit == "A") {
									this.age = data[i].cvrgExtInfo.minInsuredAge + "岁至" + data[i].cvrgExtInfo.maxInsuredAge + "岁";
								} else if(data[i].cvrgExtInfo.minInsuredUnit == "D") {
									this.age = data[i].cvrgExtInfo.minInsuredAge + "天至" + data[i].cvrgExtInfo.maxInsuredAge + "岁";
								} else if(data[i].cvrgExtInfo.minInsuredUnit == "M") {
									this.age = data[i].cvrgExtInfo.minInsuredAge + "月至" + data[i].cvrgExtInfo.maxInsuredAge + "岁";
								}

							} else {
								this.$refs.item1.classList.add("dis");
							}

							//保险期间
							if(data[i].insuPeriodList != undefined) {
								this.year = data[i].insuPeriodList[0].insuRmk
							} else {
								this.$refs.item2.classList.add("dis");
							}

							//baoe
							if(data[i].maxAmnt != undefined && data[i].minAmnt != undefined) {
								this.money = data[i].minAmnt + "元至" + data[i].maxAmnt + "元"
							} else {
								this.$refs.item3.classList.add("dis");
							}
						}
					}
					this.kindCode = response.data.output.prodInfo.kindCode
					this.banner = response.data.output.attachList[0].attachUrl
					this.getList()

				}, response => {
					console.log("ajax error");
				});
			},
			getClause() {
				var data = {
					"prodCode": this.prodCode
				}
				this.$http.post(this.$store.state.link + '/prd/prod/cluslist', data).then(response => {
					this.clauseList = response.data.output
					//					console.log(this.clauseList)
					if(this.clauseList.length == 1) {
						this.$refs.clauseList.setAttribute('code', this.clauseList[0].fileSerialNo)
					}
				}, response => {
					console.log("ajax error");
				});
			},
			getList() {
				var data = {
					"kindCode": this.kindCode,
					"planLevl": 1,
					"prodCode": this.prodCode
				}
				this.$http.post(this.$store.state.link + '/prd/prod/planlist', data).then(response => {
					this.listItem = response.data.output[0].dutyList;
					Indicator.close();
				}, response => {
					Indicator.close();
					console.log("ajax error");
				});
			},
			handleClickOpen(e) {
				if(e.currentTarget.getAttribute('code') == "close") {
					e.currentTarget.getElementsByTagName('div')[0].style.display = "block"
					e.currentTarget.getElementsByClassName('open')[0].style.transform = "rotate(90deg)"
					e.currentTarget.setAttribute('code', "1")
				} else {
					e.currentTarget.getElementsByTagName('div')[0].style.display = "none"
					e.currentTarget.getElementsByClassName('open')[0].style.transform = "rotate(0deg)"
					e.currentTarget.setAttribute('code', "close")
				}
			},
			handleClickClauseItem(e) {
				window.location.href = e.currentTarget.getAttribute('code')
			},
			handleClikClose() {
				this.$refs.mask.style.display = "none"

			},
			handleClickList(e) {
				if(this.clauseList.length == 1) {
					window.location.href = e.currentTarget.getAttribute('code')
				} else {
					this.$refs.mask.style.display = "block"
				}
			},
			handleClick(){
				Toast('您好，平台正在报备中，暂时无法投保。')
			}
		},
		components: {
			TianAn: TianAn,
			ShangHai: ShangHai
		},
		watch: {
			cmpCode: function(val) {
				if(this.cmpCode == "000034") {
					this.tianAnShow = true
				} else {
					this.tianAnShow = false
				}

				if(this.prodCode == "P000303010194") {
					this.shangHaiShow = true
				} else {
					this.shangHaiShow = false
				}
			},
			prodNo: function(val) {
				this.prodNo = val
			}
		}
	}
</script>

<style scoped="scoped">
	.background {
		padding-bottom: .83rem;
	}
	
	.header {
		width: 100%;
		height: 2.64rem;
		background: #fff;
		box-shadow: 0 .08rem .12rem 0 rgba(0, 0, 0, 0.20);
		position: relative;
	}
	
	.back {
		width: .24rem;
		height: .42rem;
		position: absolute;
		top: 1rem;
		left: .32rem;
	}
	
	.return {
		font-size: .36rem;
		color: #FFC901;
		letter-spacing: 0;
		line-height: .36rem;
		position: absolute;
		top: 1.05rem;
		left: .76rem;
	}
	
	.share_text {
		font-size: .36rem;
		color: #FFC901;
		letter-spacing: 0;
		line-height: .36rem;
		position: absolute;
		top: 1.05rem;
		right: 1.04rem;
	}
	
	.share {
		width: .4rem;
		height: .42rem;
		position: absolute;
		top: .9rem;
		right: .32rem;
	}
	
	.title {
		height: .64rem;
		font-size: .4rem;
		color: #222222;
		letter-spacing: 0;
		line-height: .68rem;
		position: absolute;
		bottom: .1rem;
		left: .28rem;
		font-weight: bold;
	}
	
	.content {
		width: 100%;
		position: relative;
	}
	
	.banner {
		width: 7.46rem;
		height: 4.54rem;
	}
	
	.banner_bottom {
		width: 2.16rem;
		height: .52rem;
		background: url(/static/banner_bottom.png) no-repeat;
		background-size: cover;
		position: absolute;
		top: 3.88rem;
		right: .156rem;
		font-size: .32rem;
		color: #222222;
		letter-spacing: 0;
		text-align: center;
		line-height: .52rem;
	}
	
	.plan {
		margin-left: .4rem;
		margin-top: .1rem;
	}
	
	.form_title {
		font-size: .36rem;
		color: #222222;
		letter-spacing: 0;
		line-height: .44rem;
		font-weight: bold;
	}
	
	.form_title_content {
		position: relative;
	}
	
	.list {
		min-height: .88rem;
		line-height: .88rem;
		border-bottom: .001rem solid #C8C7CC;
		position: relative;
	}
	
	.article {
		padding-left: .45rem;
		padding-right: .65rem;
		min-height: 1rem;
		display: none;
		color: #555;
		font-size: .2rem;
		line-height: .45rem;
		text-align: justify;
	}
	
	.name {
		margin-left: .44rem;
		margin-right: 0;
		letter-spacing: .01rem
	}
	
	.money {
		height: .86rem;
		background: #fff;
		position: absolute;
		right: .8rem;
		color: #969696;
	}
	
	.open {
		width: .52rem;
		height: .52rem;
		position: absolute;
		right: .18rem;
		top: .15rem;
	}
	
	.more {
		height: .76rem;
		line-height: .76rem;
		font-size: .32rem;
		color: #222222;
	}
	
	.more span {
		color: red;
	}
	
	.item {
		height: .88rem;
		border-bottom: .001rem solid #C8C7CC;
		position: relative;
	}
	
	.point {
		width: .2rem;
		height: .2rem;
		position: absolute;
		left: .08rem;
		top: .34rem
	}
	
	.item_left {
		font-size: .32rem;
		color: #222222;
		margin-left: .44rem;
		line-height: .88rem;
	}
	
	.item_right {
		font-size: .32rem;
		font-size: 16px;
		color: #555555;
		float: right;
		margin-right: .32rem;
		line-height: .88rem;
	}
	
	.red {
		color: #FF0F01;
	}
	
	.project {
		margin-left: .4rem;
		margin-top: .32rem;
		margin-bottom: .4rem;
	}
	
	.img_bottom {
		width: 7.5rem;
		height: 4.6rem;
	}
	
	.btn {
		width: 100%;
		height: 1rem;
		font-weight: bold;
	}
	
	.btn_left {
		width: 50%;
		height: 1rem;
		float: left;
		background: #FAFAFA;
		font-size: .36rem;
		color: #FF0F01;
		letter-spacing: 0;
		line-height: 1rem;
		text-align: center;
	}
	
	.btn_right {
		width: 50%;
		height: 1rem;
		float: left;
		background: #FFC901;
		color: #222;
		letter-spacing: 0;
		line-height: 1rem;
		text-align: center;
	}
	
	#data {
		opacity: 0;
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .2rem;
		right: 2.22rem;
		z-index: 10;
	}
	
	.data {
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .2rem;
		right: 2.22rem;
	}
	
	.one,
	.two {
		display: inline-block;
		width: 1.26rem;
		height: .44rem;
		background: #FAFAFA;
		border: .02rem solid #000000;
		border-radius: .08rem;
		text-align: center;
		line-height: .44rem;
		position: absolute;
		top: .22rem
	}
	
	.one {
		right: 1.74rem;
	}
	
	.two {
		right: .32rem;
	}
	
	.active {
		background: #FFC901;
	}
	
	.input,
	.input2 {
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .2rem;
		opacity: 0;
		z-index: 10;
	}
	
	.input {
		right: 2rem;
	}
	
	.txt,
	.txt2 {
		font-size: .32rem;
		color: #222222;
		line-height: .88rem;
		position: absolute;
	}
	
	.txt {
		right: 1.6rem;
	}
	
	.txt2 {
		right: .4rem;
	}
	
	.input2 {
		right: .8rem;
	}
	
	.rest {
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .2rem;
		right: .8rem;
	}
	
	.checked {
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .2rem;
		right: 2rem;
	}
	
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: none;
	}
	
	.detail {
		width: 100%;
		height: 10.84rem;
		background: #fff;
		border-radius: .16rem;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.mask_title {
		width: 100%;
		border-bottom: .001rem solid #eee;
		margin: 0 auto;
		text-align: center;
		height: .88rem;
		line-height: .88rem;
		font-size: .36rem;
		color: #222;
	}
	
	.mask_content {
		height: 7.6rem;
		overflow: hidden;
	}
	
	.mask_button {
		width: 100%;
		border-top: .001rem solid #eee;
		margin: 0 auto;
		text-align: center;
		height: .88rem;
		line-height: .88rem;
		font-size: .36rem;
		color: #222;
		position: absolute;
		bottom: .3rem;
	}
	
	.mask_list {
		padding-left: .3rem;
		height: .8rem;
		line-height: .8rem;
		font-size: .36rem;
		color: #222;
		border-bottom: .001rem solid #EEEEEE;
		position: relative;
	}
	
	.mask_name {
		display: inline-block;
		width: 6.4rem;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.img_mask {
		width: .52rem;
		height: .52rem;
		position: absolute;
		right: .3rem;
		top: .19rem;
	}
	
	.dis {
		display: none;
	}
	.btnBox{
		position: fixed;
		bottom: 0;
		width:100%;
		height: 1.06rem;
		font-size: 0.36rem;
		color: #fff;
		line-height: 1rem;
		text-align: center;
		background:#E7A128;
	}
</style>