<template>
	<div class="one">
		<div class="mo_div_titleall">
			<span @click="select_title('1')" class="mo_div_titlecenet titlecenet1" :class="{mo_div_titleleft:titleSel1}">全部</span>
			<span @click="select_title('2')" class="mo_div_titlecenet" :class="{mo_div_titleleft:titleSel2}">待支付</span>
			<span @click="select_title('3')" class="mo_div_titlecenet" :class="{mo_div_titleleft:titleSel3}">已承保</span>
			<span @click="select_title('4')" class="mo_div_titlecenet titlecenet4" :class="{mo_div_titleleft:titleSel4}">已撤单</span>
		</div>
		<div class="mo_div_contentall" v-show="!emptyHide">
			<div class="mo_div_contentitem" @click="handleClickGoNoPay(item.pkgNo)" v-for="(item,index) in tabs">
				<p class="mo_div_top clearFloat">
					<span class="mo_div_topname left">{{item.prodName}}</span>
					<span class="mo_div_toprogight right">{{item.plcySts|statu}}</span>
				</p>
				<div class="mo_div_bottomcontent">
					<p class="mo_div_bottomcontentitem">
						<span class="mo_div_bottomcontentitemleft">投保人：</span>
						<span class="mo_div_bottomcontentitemright">{{item.applName}} </span>
					</p>
					<p class="mo_div_bottomcontentitem">
						<span class="mo_div_bottomcontentitemleft">被保险人：</span>
						<span class="mo_div_bottomcontentitemright">{{item.insrntName }}</span>
					</p>
					<p class="mo_div_bottomcontentitem">
						<span class="mo_div_bottomcontentitemleft">投保时间：</span>
						<span class="mo_div_bottomcontentitemright">{{item.applTime }}</span>
					</p>
					<p class="mo_div_bottomcontentitem">
						<span class="mo_div_bottomcontentitemleft">投保单号：</span>
						<span class="mo_div_bottomcontentitemright">{{item.applNo  }}</span>
					</p>
					
					<p :class="item.plcySts | dispaly">
						<span class="btn mo_div_delete">删除</span>
						<span class="btn mo_div_cancel" >撤单</span>
						<span class="btn mo_div_pay" @click="handleClickGoPay">支付</span>
					</p>
				</div>
			</div>
		</div>
		<div class="empty" v-show="emptyHide">
			<img src="/static/empty.png" class="emptyImg" />
			<p class="emptyDes">空空当当的，快来给我加点料吧</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'allSort',
		data() {
			return {
				titleSel1:true,
				titleSel2:false,
				titleSel3:false,
				titleSel4:false,
				emptyHide:false,
//				payStatus:'待支付',
				tabs:[]
			}
		},
		created() {
			this.select_title('1');
		},
		methods: {
			select_title(index) {
				if(index == "1") {
					this.titleSel1 = true
					this.titleSel2 = false
					this.titleSel3 = false
					this.titleSel4 = false
					
					
					var data = {
							"oprCode":"001",
							"plcySts": ""
					};
					this.$http.post("http://192.168.171.12:9009/order/v1/listorder", data).then(response => {
						console.log(response.data);
						if(response.data.code == "SYS_S_000") {
							if(response.data.output.length==0){
								this.emptyHide = true;
							}else{
								this.tabs=response.data.output;
								this.emptyHide = false;
							}
							
							
						} else {
								Toast("身份不合法");
							}
							}, response => {
								console.log("ajax error");
						});
				} else if(index == "2") {
					this.tabs=[];
					this.titleSel2 = true
					this.titleSel1 = false
					this.titleSel3 = false
					this.titleSel4 = false
//					this.emptyHide = false
					var data = {
							"oprCode":"001",
							"plcySts": "150"
					};
					this.$http.post("http://192.168.171.12:9009/order/v1/listorder", data).then(response => {
						console.log(response.data);
						if(response.data.code == "SYS_S_000") {
							if(response.data.output.length==0){
								this.emptyHide = true;
							}else{
								this.tabs=response.data.output;
								this.emptyHide = false;
							}
							
							
						} else {
								Toast("身份不合法");
							}
							}, response => {
								console.log("ajax error");
						});
					
				} else if(index == "3") {
					this.tabs=[];
					this.titleSel3 = true
					this.titleSel1 = false
					this.titleSel2 = false
					this.titleSel4 = false
//					this.emptyHide = false
					var data = {
							"oprCode":"001",
							"plcySts": "40"
					};
					this.$http.post("http://192.168.171.12:9009/order/v1/listorder", data).then(response => {
						console.log(response.data);
						if(response.data.code == "SYS_S_000") {
							if(response.data.output.length==0){
								this.emptyHide = true;
							}else{
								this.tabs=response.data.output;
								this.emptyHide = false;
							}
							
							
						} else {
								Toast("身份不合法");
							}
							}, response => {
								console.log("ajax error");
						});
					
				} else if(index == "4") {
					this.tabs=[];
					this.titleSel4 = true
//					this.emptyHide = false
					this.titleSel1 = false
					this.titleSel2 = false
					this.titleSel3 = false
					var data = {
							"oprCode":"001",
							"plcySts": "30"
					};
					this.$http.post("http://192.168.171.12:9009/order/v1/listorder", data).then(response => {
						console.log(response.data);
						if(response.data.code == "SYS_S_000") {
							if(response.data.output.length==0){
								this.emptyHide = true;
							}else{
								this.tabs=response.data.output;
								this.emptyHide = false;
							}
							
						} else {
								Toast("身份不合法");
							}
							}, response => {
								console.log("ajax error");
						});
				}
			},
			handleClickGoPay(){
				this.$router.push('/payInfo');
			},
			handleClickGoNoPay(pagon){
				this.$router.push('/noPayInfo?pkgNo='+pagon);
			},
			handleClickGoOrderInfo(){
				this.$router.push('/orderInfo');
			}
		},
		filters:{
			statu:function(value){
				if(value==30){
					return value = "已撤单"
				}else if(value==40){
					return value = "已承保"
				}else{
					return value = "待支付"
				}
			},
			dispaly:function(value){
				if(value==30||value==40){
					return value="dispaly"
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.left {
		float: left;
	}
	.right {
		float: right;
	}
	input, button {
		background: none;
		border: none;
	}
	input, button {
		outline: none;
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
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.one {
		position: absolute;
		width: 100%;
		min-height: 100%;
		background: #F3F3F3;
	}
	.mo_div_titleall {
		display: flex;
		width: 6.9rem;
		height: 0.56rem;
		line-height: 0.56rem;
		padding: 0.32rem 0 0.06rem 0;
		padding-left: 0.3rem;
		padding-right: 0.3rem;
		background: #FFFFFF;
	}	
	.mo_div_titlecenet {
		display: inline-block;
		flex: 1;
		font-size: 0.26rem;
		text-align: center;
		border: 0.01rem solid #ED816C;
		border-right: none;
		background: #FFFFFF;
		color: #ED816C;
	}
	.mo_div_titleall .mo_div_titlecenet:last-child {
		border-right: 0.01rem solid #ED816C;;
	}
	.mo_div_titleleft {
		background: #ED816C;
		color: #FFFFFF;
	}
	.titlecenet1 {
		border-radius: 0.08rem 0 0 0.08rem;
	}
	.titlecenet4 {
		border-radius: 0 0.08rem 0.08rem 0;
	}
	.mo_div_contentall {
		padding-bottom: 1.28rem;
		background: #F3F3F3;
	}
	.mo_div_contentitem {
		padding: 0 0.4rem;
		margin-top: 0.4rem;
		background: #FFFFFF;
	}
	.mo_div_contentall .mo_div_contentitem:first-child {
		margin-top: 0;
	}
	.mo_div_top {
		height: 0.8rem;
		line-height: 0.8rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.mo_div_topname {
		display: block;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
	}
	.mo_div_toprogight {
		display: block;
		font-size: 0.28rem;
		color: #73AEF3;
	}
	.mo_div_bottomcontent {		
		position: relative;
		width: 100%;
		margin-top: 0.13rem;
		padding-bottom:1.12rem;
	}
	.mo_div_bottomcontentitem {
		height: 0.5rem;
		line-height: 0.5rem;
	}
	.mo_div_bottomcontentitemleft {
		display: block;
		float: left;	
		font-size: 0.24rem;
		color: #222222;
	}
	.mo_div_bottomcontentitemright {
		display: block;
		float: left;
		font-size: 0.24rem;
		color: #222222;
	}
	.btn {
		display: inline-block;
		width: 1.04rem;
		height: 0.48rem;
		line-height: 0.48rem;
		font-size: 0.24rem;
		color: #EB7760;
		text-align: center;
		border: 0.02rem solid#EB7760;
		border-radius: 0.24rem;
	}
	.mo_div_cancel {		
		position: absolute;
		left: 0;
		bottom: 0.4rem;
	}
	.mo_div_delete{
		position: absolute;
		left: 3rem;
		bottom: 0.4rem;
	}
	.mo_div_pay {
		position: absolute;
		left: 1.54rem;
		bottom: 0.4rem;
	}
	.emptyImg {
		display: block;
		width: 4.88rem;
		margin: 0 auto;
		margin-top: 0.74rem;
		margin-bottom: 0.32rem;
	}
	.emptyDes {
		font-size: 0.26rem;
		color: #ED816C;
		text-align: center;
	}
	.dispaly{
		display: none;
	}
</style>