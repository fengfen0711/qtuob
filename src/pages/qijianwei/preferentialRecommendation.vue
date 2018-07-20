<template>
	<div class="pr_div_all">
		<!--第一行-->
		<div class="pr_div_nameall">
			<div class="pr_div_name">{{cust_name}}</div>
			<img class="pr_img_sex" :src="custGender" />
			<div class="pr_div_time">{{custBirth}}</div>
		</div>
		<div @click="share_preview()" class="pr_div_btn">分享预览</div>
		<!--第二行-->
		<div class="pr_div_introduce">据客户个人信息，系统向客户推荐出以下产品，这些产品客户生日后不同幅度的涨价（默认以10万保额为例，可自动调整保额</div>
		<!--列表-->
		<div class="mar_bottom">
			<div class="pr_div_itemall" v-for="(item,index) in itemData">
				<img @click="setCheckValue($event,item,index)" class="pr_img_item" src="/static/qijianwei/icon_select1_unfocus1.png" />

				<div class="pr_div_item">
					<!--第一行-->
					<div class="pr_div_iconnameall">
						<!--<div class="pr_div_iconname">-->
						<!--产品图片-->
						<!--<img class="pr_div_product" src="/static/qijianwei/icon.png" />-->
						<!--</div>-->
						<img class="pr_div_iconname" :src="item.prdPicUrl" />
						<div class="pr_div_iconname_right">
							<!--险种名称-->
							<div class="pr_div_insurancename">{{item.prodName}}</div>
							<!--公司名称-->
							<div class="pr_div_companyname">{{item.cmpName}}</div>
						</div>
					</div>
					<div class="pr_div_setting">设置保额：</div>
					<div class="pr_div_input">
						<input ref="inputs" v-on:blur="cvrgCodeList(item.prodCode,item.cvrgCodeList,index)" class="pr_input_number" type="number" placeholder="自定义保额，实时算费，当前默认100000元" />
					</div>
					<div class="pr_div_result">结算结果：</div>
					<div class="pr_div_termall">
						<div class="pr_div_money marleft_item">生日前购买</div>
						<div class="pr_div_money">生日后购买</div>
					</div>
					<div class="pr_div_termall" v-for="(item1,index1) in item.coverageFeesList">
						<div class="pr_div_term">{{item.coverageFeesList[index1].payType+":"}}</div>
						<div class="pr_div_moneydiscount">{{"￥"+item.coverageFeesList[index1].actFee}}</div>
						<div class="pr_div_money">{{"￥"+item.coverageFeesList[index1].oriFee}}</div>
					</div>
					<div class="pr_div_bir">投保示例：以10万保额,{{item.coverageFeesList[item.coverageFeesList.length-1].payType}}费为例</div>
					<div class="pr_div_bir1">生日前购买合计交费 {{item.coverageFeesList[item.coverageFeesList.length-1].yearCode}}*{{item.coverageFeesList[item.coverageFeesList.length-1].actFee}}={{item.allMoney1}}</div>
					<div class="pr_div_bir1">生日后购买合计交费 {{item.coverageFeesList[item.coverageFeesList.length-1].yearCode}}*{{item.coverageFeesList[item.coverageFeesList.length-1].oriFee}}={{item.allMoney2}}</div>
					<div class="pr_div_bottom">
						<div class="pr_div_bir3">
							<span class="pr_div_bir2">马上</span><span class="pr_span_add">涨</span><span class="pr_span_add1">涨</span><span class="pr_span_add2">涨</span>
						</div>
						<span class="pr_span_right">{{"￥"+item.actPre}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name: 'Login',

		data() {
			return {
				checkIds: [],
				itemData: [],
				defAge: "",
				prodName: "",
				defLifeAgeAmt: "",
				defSafeGuard: "",
				defSex: "",
				cust_name: '',
				custGender: '/static/qijianwei/woman.png',
				custBirth: '',
				data_all: []
			}
		},
		created() {
			var data = {
				"custId": this.$route.query.custId,
				"token": localStorage.token,
				"userId": localStorage.userId
				//				"custId": "1"
			}
			this.$http.post(this.$store.state.link + "/cut/cut/queryProdList", data).then(res => {
				if(res.data.code == "SYS_S_000") {
					this.itemData = res.data.output;
					for(var k = 0; k < this.itemData.length; k++) {
						this.itemData[k].allMoney1 = this.accMul(parseFloat(this.itemData[k].coverageFeesList[this.itemData[k].coverageFeesList.length - 1].actFee), parseInt(this.itemData[k].coverageFeesList[this.itemData[k].coverageFeesList.length - 1].yearCode))
						this.itemData[k].allMoney2 = this.accMul(parseFloat(this.itemData[k].coverageFeesList[this.itemData[k].coverageFeesList.length - 1].oriFee), parseInt(this.itemData[k].coverageFeesList[this.itemData[k].coverageFeesList.length - 1].yearCode))
					}
				} else {
					if(res.data.desc != undefined) {

					} else {
						console.log("登录接口undefined");
					}
				}
			}, res => {
				console.log("2===" + res.data)
			});

			this.$http.post(this.$store.state.link + "/cut/cut/queryCustInfo", data).then(res => {
				console.log("====" + JSON.stringify(res.data))
				if(res.data.code == "SYS_S_000") {
					this.cust_name = res.data.output.custName;
					this.custBirth = res.data.output.custBirth;
					if(res.data.output.custGender == "M") {
						this.custGender = "/static/qijianwei/man.png";
					} else if(res.data.output.custGender == "F") {
						this.custGender = "/static/qijianwei/woman.png";
					} else {
						this.custGender = "/static/qijianwei/man.png";
					}
				} else {
					if(res.data.desc != undefined) {

					} else {
						console.log("登录接口undefined");
					}
				}
			}, res => {
				console.log("2===" + res.data)
			});

		},
		methods: { //方法
			insurance_select() {
				if(this.select) {
					this.select = false;
				} else {
					this.select = true;
				}
			},
			setCheckValue(ev, item, index) {
				console.log(ev.currentTarget)
				var id = item.prodCode;
				console.log("id==" + id);
				var flag = false;
				if(this.checkIds.length == 0) {
					this.checkIds.push(id);
					ev.currentTarget.src = "/static/qijianwei/icon_select1_focus1.png";
					var obj = new Object();
					obj.actFeeList = this.itemData[index].coverageFeesList;
					obj.actPre = this.itemData[index].actPre;
					obj.invalidTime = item.invalidTime;
					if(this.$refs.inputs[index].value != "") {
						obj.prdAmt = this.$refs.inputs[index].value;
					} else {
						obj.prdAmt = "100000";
					}
					obj.prdCode = item.prodCode;
					obj.prdComp = item.cmpName;
					obj.prdDetailUrl = item.tmpAddrPrefix;
					obj.prdName = item.prodName;
					obj.prdPic = item.prdPicUrl;
					this.data_all.push(obj);

				} else {
					for(var i = 0; i < this.checkIds.length; i++) {
						if(this.checkIds[i] == id) {
							this.checkIds.splice(i, 1);
							ev.currentTarget.src = "/static/qijianwei/icon_select1_unfocus1.png";
							for(var k = 0; k < this.data_all.length; k++) {
								if(this.data_all[k].prdCode == id) {
									this.data_all.splice(k, 1);
								}
							}
							flag = true;
							break;
						} else {
							flag = false;
						}
					}
					if(flag == false) {
						this.checkIds.push(id);
						ev.currentTarget.src = "/static/qijianwei/icon_select1_focus1.png";
						var obj2 = new Object();
						obj2.actFeeList = this.itemData[index].coverageFeesList;
						obj2.actPre = this.itemData[index].actPre;
						obj2.invalidTime = item.invalidTime;
						if(this.$refs.inputs[index].value != "") {
							obj2.prdAmt = this.$refs.inputs[index].value;
						} else {
							obj2.prdAmt = "100000";
						}

						obj2.prdCode = item.prodCode;
						obj2.prdComp = item.cmpName;
						obj2.prdDetailUrl = item.tmpAddrPrefix;
						obj2.prdName = item.prodName;
						obj2.prdPic = item.prdPicUrl;
						this.data_all.push(obj2);
					}
				}
				console.log("ev==" + ev);
				console.log("data_all==" + JSON.stringify(this.data_all));
				console.log("itemData==" + JSON.stringify(this.itemData));
			},
			share_preview() {
				if(this.checkIds.length == 0) {
					Toast('请至少选择一款产品')
				} else {
					console.log("data_all===" + JSON.stringify(this.data_all));
					console.log("itemData===" + JSON.stringify(this.itemData));
					for(var z = 0; z < this.data_all.length; z++) {
						for(var k = 0; k < this.itemData.length; k++) {
							if(this.data_all[z].prdCode == this.itemData[k].prodCode) {
								console.log("value1==" + this.data_all[z].prdCode)
								console.log("value2==" + this.itemData[k].prodCode)
								if(this.itemData[k].coverage == undefined || this.itemData[k].coverage == "") {
									this.data_all[z].prdAmt = "100000";
								} else {
									this.data_all[z].prdAmt = this.itemData[k].coverage;
								}

								this.data_all[z].actFeeList = this.itemData[k].coverageFeesList;
								this.data_all[z].actPre = this.itemData[k].actPre;
							}
						}
					}
					var shareSaveData = {
						"custId": this.$route.query.custId,
						"prodList": this.data_all,
						"token": localStorage.token,
						"userId": localStorage.userId
					}
					//					console.log("shareSaveData==" + JSON.stringify(shareSaveData))
					this.$http.post(this.$store.state.link + "/cut/cut/saveProdInfo", shareSaveData).then(res => {
						console.log("1===" + JSON.stringify(res.data))
						if(res.data.code == "SYS_S_000") {
							var seq = res.data.output.shareH5Url.split("seq=")[1];
							//							console.log(seq);
							this.$router.push('/recommendedDetails?seq=' + seq + "&custId=" + this.$route.query.custId + "&userId=" + localStorage.userId + "&token=" + localStorage.token);
						} else {
							if(res.data.desc != undefined) {

							} else {
								console.log("登录接口undefined");
							}
						}
					}, res => {
						console.log("2===" + res.data)
					});

				}
			},
			accMul(arg1, arg2) {
				var m = 0,
					s1 = arg1.toString(),
					s2 = arg2.toString();
				try {
					m += s1.split(".")[1].length
				} catch(e) {}
				try {
					m += s2.split(".")[1].length
				} catch(e) {}
				return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
			},
			cvrgCodeList(prodCode, cvrgCodeList, index) {
				var initCalData = {
					"list": []
				};
				for(var k = 0; k < this.itemData.length; k++) {
					if(this.itemData[k].prodCode == prodCode) {
						this.defAge = this.itemData[k].countDefInfo.defAge;
						this.prodName = this.itemData[k].prodName;
						this.defLifeAgeAmt = this.itemData[k].countDefInfo.defLifeAgeAmt;
						this.defSafeGuard = this.itemData[k].countDefInfo.defSafeGuard;
						this.defSex = this.itemData[k].countDefInfo.defSex;
						//						initCalData.list.push(feedate);
					}
				}
				for(var i = 0; i < cvrgCodeList.length; i++) {
					var feedata = {
						"age": this.defAge,
						"birthDays": "",
						"coverage": this.$refs.inputs[index].value,
						"cvrgCode": cvrgCodeList[i], //险种代码
						"cvrgName": this.prodName,
						"freqyNo": "",
						"lifeAmtAge": this.defLifeAgeAmt,
						"prodId": prodCode,
						"safeGuard": this.defSafeGuard, // 保险期间；0，终身；n，n年 ,
						"sex": this.defSex,
						"year": "B1",
						"yearFee": 0,
						"token": localStorage.token,
						"userId": localStorage.userId
					}
					initCalData.list.push(feedata);
				}
				console.log("feedata===" + JSON.stringify(initCalData))
				this.$http.post(this.$store.state.link + "/ppt/count/queryCutCoverageFee", initCalData).then(res => {
					console.log("12===" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						for(var k = 0; k < this.itemData.length; k++) {
							if(this.itemData[k].prodCode == prodCode) {
								this.itemData[k].coverageFeesList = res.data.output.cutFeeList;
								this.itemData[k].actPre = res.data.output.actPre;
								this.itemData[k].coverage = this.$refs.inputs[index].value;
							}
						}
					} else {
						if(res.data.desc != undefined) {

						} else {
							console.log("接口undefined");
						}
					}
				}, res => {
					console.log("2===" + res.data)
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.pr_div_all {
		padding-bottom: 0.35rem;
	}
	
	.mar_bottom {
		/*margin-bottom: 1rem;*/
		overflow: hidden;
	}
	
	.pr_div_nameall {
		width: 100%;
		height: 0.48rem;
		margin-top: 0.33rem;
	}
	
	.pr_div_name {
		font-size: 0.48rem;
		color: #222222;
		line-height: 0.48rem;
		margin-left: 0.4rem;
		display: block;
		float: left;
	}
	
	.pr_img_sex {
		margin-left: 0.16rem;
		display: block;
		float: left;
		width: 0.28rem;
		height: 0.3rem;
		margin-top: 0.18rem;
	}
	
	.pr_div_time {
		display: block;
		float: left;
		font-size: 0.24rem;
		color: #222222;
		margin-top: 0.18rem;
		margin-left: 0.16rem;
		vertical-align: bottom;
	}
	
	.pr_div_introduce {
		width: 6.34rem;
		font-size: 0.24rem;
		color: #555555;
		text-align: left;
		line-height: 0.4rem;
		margin-left: 0.7rem;
		margin-top: 0.17rem;
	}
	
	.pr_div_itemall {
		width: 100%;
		/*height: 5.86rem;*/
		margin-top: 0.32rem;
	}
	
	.pr_img_item {
		margin-left: 0.12rem;
		margin-top: 0.16rem;
		display: block;
		float: left;
		width: 0.64rem;
		height: 0.64rem;
	}
	
	.pr_div_item {
		display: block;
		float: left;
		width: 6.1rem;
		/*height: 5.86rem;*/
		background: rgba(255, 255, 255, 0.90);
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.10);
		border-radius: 12px;
		margin-left: 0.08rem;
		margin-bottom: 0.34rem;
	}
	
	.pr_div_iconnameall {
		width: 6.1rem;
		height: 1.42rem;
		margin-top: 0.2rem;
	}
	
	.pr_div_iconname {
		display: block;
		float: left;
		width: 2.4rem;
		height: 1.42rem;
		border-radius: 6px;
		margin-left: 0.2rem;
	}
	
	.pr_div_product {
		display: block;
		float: left;
		width: 2.4rem;
		height: 1.42rem;
	}
	
	.pr_div_iconname_right {
		display: block;
		float: left;
		height: 1.42rem;
		width: 3.12rem;
		margin-left: 0.16rem;
		position: relative;
	}
	
	.pr_div_insurancename {
		width: 3.12rem;
		font-size: 0.24rem;
		color: #222222;
		line-height: 0.34rem;
	}
	
	.pr_div_companyname {
		width: 3.12rem;
		font-size: 0.24rem;
		color: #555555;
		line-height: 0.34rem;
		vertical-align: bottom;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	
	.pr_div_setting {
		margin-top: 0.16rem;
		margin-left: 0.2rem;
		font-size: 0.24rem;
		color: #555555;
		line-height: 0.34rem;
	}
	
	.pr_div_result {
		margin-top: 0.32rem;
		margin-left: 0.2rem;
		font-size: 0.24rem;
		color: #555555;
		line-height: 0.34rem;
		margin-bottom: 0.02rem;
	}
	
	.pr_div_input {
		width: 5.68rem;
		height: 0.52rem;
		background: #ffffff;
		border: 0.01rem solid #8E8E93;
		margin-top: 0.08rem;
		margin-left: 0.2rem;
	}
	
	.pr_input_number {
		/*padding-left: 0.1rem;*/
		border: none;
		width: 5.49rem;
		height: 100%;
		text-align: left;
		margin-left: 0.19rem;
	}
	
	.pr_div_term {
		display: block;
		float: left;
		width: 1.2rem;
		height: 0.4;
		font-size: 0.24rem;
		color: #555555;
		line-height: 0.4rem;
		text-align: right;
	}
	
	.pr_div_termall {
		/*margin-left: 0.2rem;*/
		height: 0.4rem;
		margin-top: 0.04rem;
	}
	
	.pr_div_moneydiscount {
		display: block;
		float: left;
		width: 2.2rem;
		/*background: #669900;*/
		font-size: 0.28rem;
		color: #EB6067;
		line-height: 0.4rem;
		margin-left: 0.16rem;
		text-align: center;
	}
	
	.pr_div_money {
		display: block;
		float: left;
		width: 2.2rem;
		height: 0.4rem;
		/*background: #669900;*/
		font-size: 0.28rem;
		line-height: 0.4rem;
		margin-left: 0.16rem;
		font-size: 0.24rem;
		color: #222222;
		text-align: center;
		/*text-decoration: line-through;*/
	}
	
	.marleft_item {
		margin-left: 1.35rem;
	}
	
	.pr_div_bottom {
		width: 5.9rem;
		height: 0.8rem;
		padding-right: 0.2rem;
		/*position: relative;*/
		/*background: #669900;*/
	}
	
	.pr_div_bir {
		margin-left: 0.2rem;
		height: 0.34rem;
		font-size: 0.24rem;
		color: #555555;
		margin-top: 0.22rem;
	}
	
	.pr_div_bir1 {
		margin-left: 0.2rem;
		height: 0.34rem;
		font-size: 0.24rem;
		color: #555555;
	}
	
	.pr_div_bir2 {
		margin-left: 0.2rem;
		font-size: 0.24rem;
		color: #555555;
		line-height: 0.8rem;
	}
	
	.pr_span_right {
		display: block;
		float: right;
		margin-left: 0.2rem;
		color: #EB6067;
		font-size: 0.68rem;
		line-height: 0.84rem;
	}
	
	.pr_div_bir3 {
		display: block;
		float: left;
	}
	
	.pr_div_addbo {
		width: 2rem;
		height: 2rem;
	}
	
	.pr_div_bir2 {
		width: 2rem;
		margin-left: 0.2rem;
		height: 0.34rem;
	}
	
	.pr_div_percentage {
		display: block;
		float: right;
		font-size: 0.68rem;
		color: #EB6067;
		line-height: 1.2rem;
		margin-right: 0.22rem;
		/*position: absolute;
		right: 0.22rem;*/
	}
	
	.pr_img_up {
		display: block;
		float: right;
		width: 0.78rem;
		height: 0.48rem;
		margin-top: 0.36rem;
	}
	
	.pr_span_add {
		color: #EB6067;
		font-size: 0.32rem;
		line-height: 0.8rem;
	}
	
	.pr_span_add1 {
		color: #EB6067;
		font-size: 0.4rem;
		line-height: 0.8rem;
	}
	
	.pr_span_add2 {
		color: #EB6067;
		font-size: 0.48rem;
		line-height: 0.8rem;
	}
	
	.pr_div_btn {
		position: fixed;
		bottom: 1rem;
		right: 0.5rem;
		z-index: 888;
		background: #FFFFFF;
		width: 1.6rem;
		height: 0.6rem;
		border-radius: 0.4rem;
		text-align: center;
		line-height: 0.6rem;
		color: #EC7962;
		border: 0.02rem solid#EC7962;
	}
</style>