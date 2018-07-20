<template>
	<div class="one" id="one">
		<div class="mo_div_titleall">
			<span @click="select_title('1')" class="mo_div_titlecenet titlecenet1" :class="{mo_div_titleleft:titleSel1}">全部</span>
			<span @click="select_title('5')" class="mo_div_titlecenet" :class="{mo_div_titleleft:titleSel5}">待核保</span>
			<span @click="select_title('2')" class="mo_div_titlecenet" :class="{mo_div_titleleft:titleSel2}">待支付</span>
			<span @click="select_title('3')" class="mo_div_titlecenet" :class="{mo_div_titleleft:titleSel3}">待出单</span>
			<span @click="select_title('4')" class="mo_div_titlecenet titlecenet4" :class="{mo_div_titleleft:titleSel4}">已出单</span>
		</div>
		<div class="mo_div_contentall" v-show="!emptyHide">
			<div class="mo_div_contentitem"  @click="handleClickGoNoPay(item.pkgNo,item.prodCode,item.cmpCode )" v-for="(item,index) in tabs">
				<p class="mo_div_top clearFloat">
					<span class="mo_div_topname left">{{item.prodName}}</span>
					<span class="mo_div_toprogight right" >{{item.orderStatus|statu}}</span>
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
					
					<!--<p :class="item.plcySts | dispaly">
						<span class="btn mo_div_delete " @click.stop="textdelete">删除</span>
						<span class="btn mo_div_cancel " @click.stop="withdraw(item.pkgNo, item.deptCode,item.prodCode)" >撤单</span>
						<span class="btn mo_div_pay " @click.stop="handleClickGoPay">支付</span>
					</p>-->
				</div>
			</div>
		</div>
		<div class="empty" v-show="emptyHide">
			<img src="/static/img/ba_white.png" class="emptyImg" />
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
				titleSel5:false,
				emptyHide:false,
//				payStatus:'待支付',
				tabs:[]
			}
		},
		created() {
			this.select_title('1');
		},
		methods: {
			allorders(){
					var data={
						"head": {
						    "channelCode": "qtb_h5",
						    "oprCode": this.$store.state.userId,
						 },
						  "userId": this.$store.state.userId,
						  "token":this.$store.state.token,
						  "orderStatus": ""
					}
					console.log(data);
//					Indicator.open();
					this.$http.post(this.$store.state.link +'/trd/order/v1/listorder', data).then(response => {
						console.log(response.data);
						Indicator.close();
						if(response.data.code == "SYS_S_000") {
							
							if(response.data.output.length==0){
								this.emptyHide = true;
								document.getElementById("one").background="#FFFFFF";
							}else{
								this.tabs=response.data.output;
								this.emptyHide = false;
								document.getElementById("one").background="#F3F3F3";
							}
							
							
						}else if(response.data.code == "TRD_E_901"){
							this.emptyHide = true;
							document.getElementById("one").background="#FFFFFF";
						}else if(response.data.code == "TRD_E_908"){
							this.emptyHide = true;
							document.getElementById("one").background="#FFFFFF";
						}
						else {
								Toast(response.data.desc);
							}
							}, response => {
								Indicator.close();
								Toast(response.data.desc);
								console.log("ajax error");
						});
			},
			pendingorder(){
					var data={
						"head": {
						    "channelCode": "qtb_h5",
						    "oprCode": this.$store.state.userId 
						  },
						  "userId": this.$store.state.userId ,
						  "token": this.$store.state.token,
						  "orderStatus": "04"
					};
					Indicator.open();
					this.$http.post(this.$store.state.link +"/trd/order/v1/listorder", data).then(response => {
						console.log(response.data);
						Indicator.close();
						if(response.data.code == "SYS_S_000") {
							
							if(response.data.output.length==0){
								this.emptyHide = true;
								document.getElementById("one").background="#FFFFFF";
							}else{
								this.tabs=response.data.output;
								this.emptyHide = false;
								document.getElementById("one").background="#F3F3F3";
							}
							
							
						}else if(response.data.code == "TRD_E_901"){
							this.emptyHide = true;
							document.getElementById("one").background="#FFFFFF";
						}else if(response.data.code == "TRD_E_908"){
							this.emptyHide = true;
							document.getElementById("one").background="#FFFFFF";
						}
						else {
								Toast(response.data.desc);
							}
							}, response => {
								Indicator.close();
								Toast(response.data.desc);
								console.log("ajax error");
						});
					
			},
			paidorder(){
					var data={
						"head": {
						    "channelCode": "qtb_h5",
						    "oprCode": this.$store.state.userId
						  },
						  "userId": this.$store.state.userId ,
						  "token": this.$store.state.token,
						  "orderStatus": "07"
					};
					Indicator.open();
					this.$http.post(this.$store.state.link +"/trd/order/v1/listorder", data).then(response => {
						console.log(response.data);
						Indicator.close();
						if(response.data.code == "SYS_S_000") {
							
							if(response.data.output.length==0){
								this.emptyHide = true;
								document.getElementById("one").background="#FFFFFF";
							}else{
								this.tabs=response.data.output;
								this.emptyHide = false;
								document.getElementById("one").background="#F3F3F3";
							}
							
							
						}else if(response.data.code == "TRD_E_901"){
							this.emptyHide = true;
							document.getElementById("one").background="#FFFFFF";
						}else if(response.data.code == "TRD_E_908"){
							this.emptyHide = true;
							document.getElementById("one").background="#FFFFFF";
						}
						else {
								Toast(response.data.desc);
							}
							}, response => {
								Indicator.close();
								Toast(response.data.desc);
								console.log("ajax error");
						});
			},
			cancelleorder(){
					var data={
						"head": {
						    "channelCode": "qtb_h5",
						    "oprCode": this.$store.state.userId
						  },
						  "userId": this.$store.state.userId ,
						  "token": this.$store.state.token,
						  "orderStatus": "08"
					};
					Indicator.open();
					this.$http.post(this.$store.state.link +"/trd/order/v1/listorder", data).then(response => {
						console.log(response.data);
						Indicator.close();
						if(response.data.code == "SYS_S_000") {
							
							if(response.data.output.length==0){
								this.emptyHide = true;
								document.getElementsByClassName("one").style.background="#FFFFFF";
							}else{
								this.tabs=response.data.output;
								this.emptyHide = false;
								document.getElementsByClassName("one").style.background="#F3F3F3";
							}
							
						}else if(response.data.code == "TRD_E_901"){
							this.emptyHide = true;
							document.getElementsByClassName("one").style.background="#FFFFFF";
						}else if(response.data.code == "TRD_E_908"){
							this.emptyHide = true;
							document.getElementById("one").background="#FFFFFF";
						}
						else {
								Toast(response.data.desc);
							}
							}, response => {
								Indicator.close();
								Toast(response.data.desc);
								console.log("ajax error");
						});
			},
			underwriting(){
				var data={
						"head": {
						    "channelCode": "qtb_h5",
						    "oprCode": this.$store.state.userId
						  },
						  "userId": this.$store.state.userId ,
						  "token": this.$store.state.token,
						  "orderStatus": "02"
					};
					Indicator.open();
					this.$http.post(this.$store.state.link +"/trd/order/v1/listorder", data).then(response => {
						console.log(response.data);
						Indicator.close();
						if(response.data.code == "SYS_S_000") {
							
							if(response.data.output.length==0){
								this.emptyHide = true;
								
							}else{
								this.tabs=response.data.output;
								this.emptyHide = false;
								
							}
							
						}else if(response.data.code == "TRD_E_901"){
							this.emptyHide = true;
							
						}else if(response.data.code == "TRD_E_908"){
							this.emptyHide = true;
							document.getElementById("one").background="#FFFFFF";
						}
						else {
								Toast(response.data.desc);
							}
							}, response => {
								Toast(response.data.desc);
								Indicator.close();
								console.log("ajax error");
						});
			},
			select_title(index) {
				if(index == "1") {
					this.titleSel1 = true
					this.titleSel2 = false
					this.titleSel3 = false
					this.titleSel4 = false
					this.titleSel5 =false
					this.allorders();
				} else if(index == "2") {
					this.tabs=[];
					this.titleSel2 = true
					this.titleSel1 = false
					this.titleSel3 = false
					this.titleSel4 = false
					this.titleSel5 =false
//					this.emptyHide = false
					this.pendingorder();
					
				} else if(index == "3") {
					this.tabs=[];
					this.titleSel3 = true
					this.titleSel1 = false
					this.titleSel2 = false
					this.titleSel4 = false
					this.titleSel5 =false
//					this.emptyHide = false
					this.paidorder();
					
				} else if(index == "4") {
					this.tabs=[];
					this.titleSel4 = true
//					this.emptyHide = false
					this.titleSel1 = false
					this.titleSel2 = false
					this.titleSel3 = false
					this.titleSel5 =false
					this.cancelleorder();
				}else if(index == "5") {
					this.tabs=[];
					this.titleSel4 = false
//					this.emptyHide = false
					this.titleSel1 = false
					this.titleSel2 = false
					this.titleSel3 = false
					this.titleSel5 =true
					this.underwriting();
				}
			},
			textdelete(){
				
			},
			withdraw(page,deptCode,prodCode){
				var cancedata={
					
						  "applFlag": "1",
						  "head": {
						    "channelCode": "qtb-h5",
						    "deptCode": deptCode,
						    "oprCode": "001",
						    "prodCode": prodCode
						  },
						  "pkgNo": page
						}
				Indicator.open();
				this.$http.post(this.$store.state.link +"/withdrawal/v1/cancel", cancedata)
				.then(res =>{
					Indicator.close();
				    console.log(JSON.stringify(res.data));
					var dataCode = res.data.code;
					
					if (dataCode == "SYS_S_000") {
						
					this.allorders();
					this.pendingorder();
					}
				},res =>{
					Indicator.close();
					
					console.log(res.data);
				})
				
			},
			handleClickGoPay(){
				this.$router.push('/payInfo?pkgNo='+pagon+"&prodCode="+prodCode+"&deptCode="+deptCode);
			},
			handleClickGoNoPay(pagon,prodCode,deptCode){
				this.$router.push('/noPayInfo?pkgNo='+pagon+"&prodCode="+prodCode+"&deptCode="+deptCode);
			},
			handleClickGoOrderInfo(){
				this.$router.push('/orderInfo');
			}
		},
		filters:{
			statu:function(value){
				if(value=="INPAY"){
					return value = "收费中"
				}else if(value=="AUC"){
					return value = "自核成功"
				}else if(value=="AUF"){
						return value = "自核失败"
				}else if(value=="AWL"){
						return value = "已撤单"
				}else if(value=="DEL"){
					return value = "已删除"
				}else if(value=="PAY"){
					return value = "收费成功"
				}else if(value=="PAY_FAL"){
					return value = "收费失败"
				}else if(value=="UDR"){
					return value = "承保成功"
				}else if(value=="UDR_FAL"){
					return value = "承保失败"
				}else if(value=="PLY_CAL"){
					return value = "退保"
				}else if(value=="HPUC"){
					return value = "人工核保中"
				}else if(value=="HUFN"){
					return value = "人核失败并发送通知书"
				}else if(value=="PLY_ER"){
					return value = "保单生效已回执状态"
				}else if(value=="OTHER"){
					return value = "其他"
				}else if(value=="HUC"){
					return value = "人工核保成功"
				}else if(value=="HPRO"){
					return value = "人核未进核心"
				}else if(value=="UDR_PAY"){
					return value = "收费承保"
				}else if(value=="COPC"){
					return value = "犹豫期退保"
				}else if(value=="CONO"){
					return value = "暂存单"
				}else if(value=="AUT"){
					return value = "自核交易失败"
				}else if(value=="HUF"){
					return value = "人核失败"
				}else if(value=="PAYT"){
					return value = "收费交易失败"
				}else if(value=="UDRT"){
					return value = "承保交易失败"
				}else if(value=="UCS"){
					return value = "承保收费成功"
				}else if(value=="DECL"){
					return value = "拒保"
				}else if(value=="PREP"){
					return value = "待支付"
				}else if(value=="PAY_OUT"){
					return value = "支付超时"
				}else if(value=="AUS"){
					return value = "该订单已核保成功"
				}else if(value=="HUS"){
					return value = "核保预审"
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
	.empty{

		background: #FFFFFF;
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.mo_withdraw{
		z-index: 888;
	}
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
		/*padding-bottom: 1.28rem;*/
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
		padding-bottom:0.4rem;
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
		/*width: 4.88rem;*/
		width: 3.3rem;
		height: 2.26rem;
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
		/*display: none;*/
		display:none;
	}
</style>