<template>
	<div class="prd_div_body">
		<div class="prd_div_topall">
			<!--</div class="prd_div_queryall">-->
				<!--<img class="prd_img_query" src="/static/qijianwei/SearchGlyph.png" @click="changeCount" />-->
				<!--<input v-model="input_value" class="prd_input_query" type="text" placeholder="搜索" v-on:blur="changeCount()" />-->
			<!--</div>-->
		</div>
		<div class="sortMenu clearfix" v-show="!show">
			<ul class="sortMenu-ul">
				<li ref="item" @click="select_lab($event,item.tagCode)" class="cell1" v-for="item in sortMenu">
					<div class="prd_div_itemlab1">{{item.tagName}}</div>
				</li>
			</ul>
		</div>
		<div class="prd_div_allpading">
			<div v-if="data_flag" :code="item.prodCodeList[0].prodCode" :coder="item.prodSaleCode" @click="handleClickDetail" v-for="item in itemall" class="prd_div_itemall">
				<div class="prd_div_itemtop">
					<img class="prd_div_itemimg" :src="item.attachList[0].attachUrl" />
				</div>
				<div class="prd_div_itemtopright">
					<div class="prd_div_name">{{item.prodSaleName}}</div>
					<div class="prd_div_describe">{{item.prodRecmd}}</div>
					<!--<div class="prd_div_bottom">
						<img class="prd_img_hot" src="/static/qijianwei/hot.png" />
					</div>-->
				</div>
				<div class="prd_div_itemcompany">{{item.deptAbr}}</div>
				<div class="prd_div_bottom">
					<img class="prd_img_hot" src="/static/qijianwei/hot.png" />
				</div>
				<div class="prd_div_rb">
					<div v-if="show_money(item.minPrice)" class="prd_div_money">￥</div>
					<div class="prd_div_money1">{{item.minPrice}}</div>
					<div v-if="show_money(item.minPrice)" class="prd_div_money">起</div>
				</div>
				<div class="prd_div_bottombg"></div>
			</div>
		</div>
		<div v-if="!data_flag">
			<img class="prd_img_null" src="/static/qijianwei/pro_null.png" />
			<div class="prd_div_null">还没有任何产品，敬请期待！</div>
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
				sortMenu: [],
				itemall: [],
				data_flag: true,
				input_value: "",
				tagCode: "",
				show:true
			}
		},
		created() {
			var data = {
				"": ""
			}
			Indicator.open();
			this.$http.post(this.$store.state.link + "/prd/prod/taglist", data).then(res => {
				Indicator.close();
				if(res.data.code == "SYS_S_000") {
					this.sortMenu = res.data.output;
					console.log(this.sortMenu);
				} else {
					if(res.data.desc != undefined) {
						Toast(res.data.desc);
					} else {
						console.log("登录接口undefined");
					}
				}
			}, res => {
				Indicator.close();
			})
		},
		methods: {
			show_money(money_index) {
				if(money_index == undefined) {
					return false;
				} else {
					return true;
				}
			},
			handleClickDetail(e) {
				var code = e.currentTarget.getAttribute('code')
				var prodSaleCode = e.currentTarget.getAttribute('coder')
				if(code=="P000304010207"){
					this.$router.push('/yin?prodCode=' + code + '&prodSaleCode=' + prodSaleCode + "&userId=" + localStorage.userId)
				}else{
					this.$router.push('/shopLineDe?prodCode=' + code + '&prodSaleCode=' + prodSaleCode + "&userId=" + localStorage.userId)	
				}
				
			},
			select_lab(ev, code) {
				this.tagCode = code;
				for(var i = 0; i < this.$refs.item.length; i++) {
					this.$refs.item[i].setAttribute("class", "cell1");
				}
				ev.currentTarget.setAttribute("class", "cell");
				var data = {
					"prodSaleName": this.input_value,
					"showType": "2",
					"clssTtagList": [{
						"tagCode": code
					}],
					"tmpType": ""
				}
				Indicator.open();
				this.$http.post(this.$store.state.link + "/prd/prod/tagprodsalelist", data).then(res => {
					Indicator.close();
					console.log("res.data===" + JSON.stringify(res.data))
					if(res.data.code == "SYS_S_000") {
						this.itemall = res.data.output;
						this.data_flag = true;
					} else {
						this.data_flag = false;
						if(res.data.desc != undefined) {
							//							Toast(res.data.desc);
						} else {
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					this.data_flag = false;
					console.log("2===" + res.data)
				})

			},
			changeCount() {
//				if(this.input_value.length < 2 && this.input_value.length != 0) {
//					Toast("搜索名称不能小于2个字");
//					return;
//				}
				var data = {
					"prodSaleName": this.input_value,
					"showType": "2",
					"clssTtagList": [{
						//网售产品
						"tagCode": 'TAG001001' 
					}],
					"tmpType": ""
				};
				Indicator.open();
				this.$http.post(this.$store.state.link + "/prd/prod/tagprodsalelist", data).then(res => {
					Indicator.close();
					if(res.data.code == "SYS_S_000") {
						this.itemall = res.data.output;
						this.data_flag = true;
					} else {
						this.data_flag = false;
						if(res.data.desc != undefined) {
							//							Toast(res.data.desc);
						} else {
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					this.data_flag = false;
					console.log("2===" + res.data)
				})

			}
		},
		watch: {
			sortMenu: function() {
				this.$nextTick(function() {
					/*现在数据已经渲染完毕*/

					if(this.$refs.item.length > 0) {
						this.$refs.item[0].setAttribute("class", "cell");
						this.test = false
						var data = {
							"prodSaleName": "",
							"showType": "2",
							"clssTtagList": [{
								"tagCode": this.sortMenu[8].tagCode
							}],
							"tmpType": ""
						}
						this.tagCode = this.sortMenu[0].tagCode;
						this.$http.post(this.$store.state.link + "/prd/prod/tagprodsalelist", data).then(res => {
							if(res.data.code == "SYS_S_000") {
								this.itemall = res.data.output;
								//								console.log("测试===" + JSON.stringify(this.itemall))
								this.data_flag = true;
							} else {
								this.data_flag = false;
								if(res.data.desc != undefined) {
									Toast(res.data.desc);
								} else {
									console.log("登录接口undefined");
								}
							}
						}, res => {
							this.data_flag = false;
							//console.log("2===" + res.data)
						})
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.prd_div_body {
		/*overflow: hidden;*/
	}
	
	.prd_div_title {
		height: 0.9rem;
		width: 7.1rem;
		padding-top: 0.48rem;
		padding-left: 0.4rem;
		background: #F8F8F8;
		color: #000000;
		font-size: 0.68rem;
	}
	
	.prd_div_queryall {
		width: 7.18rem;
		height: 0.72rem;
		margin: 0 auto;
		background: #EEEEEE;
		border-radius: 0.2rem;
	}
	
	.prd_img_query {
		display: block;
		float: left;
		width: 0.28rem;
		height: 0.28rem;
		margin-top: 0.22rem;
		margin-left: 0.2rem;
	}
	
	.prd_input_query {
		width: 6.46rem;
		height: 0.72rem;
		padding-left: 0.24rem;
		border: none;
		background: #EEEEEE;
		font-size: 0.32rem;
	}
	
	.prd_div_topall {
		/*position: fixed;
		top: 0;
		right: 0;*/
		background: #ffffff;
		/*padding-top: 0.2rem;*/
	}
	
	.prd_div_labelall {
		width: 100%;
		overflow-x: scroll;
		height: 1.04rem;
		background: #F8F8F8;
	}
	
	.prd_div_label {
		height: 1.04rem;
		font-size: 0.36rem;
		color: #222222;
		line-height: 1.04rem;
		padding: 0 0.2rem;
	}
	/* 分类菜单*/
	
	.sortMenu {
		margin-top: 0.1rem;
		width: 100%;
		background-color: #fff;
		overflow-x: scroll;
		-webkit-overflow-x: scroll;
	}
	
	.sortMenu::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}
	
	.sortMenu-ul {
		min-width: 7.5rem;
		display: flex;
		justify-content: flex-start;
		padding-left: 0.1rem;
	}
	
	.cell {
		display: inline-block;
		font-size: 0.32rem;
		margin: 0 0.5em;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		position: relative;
		text-overflow: ellipsis;
		word-break: keep-all;
		color: #f19667;
		color: #f19667;
		border-bottom: 0.04rem solid #f19667;
	}
	
	.cell1 {
		display: inline-block;
		font-size: 0.32rem;
		margin: 0 0.5em;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		position: relative;
		text-overflow: ellipsis;
		word-break: keep-all;
		color: #222222;
	}
	
	.prd_div_itemall {
		width: 7.18rem;
		height: 2.03rem;
		padding-top: 0.32rem;
		padding-left: 0.32rem;
		position: relative;
	}
	
	.prd_div_itemtop {
		display: block;
		float: left;
		width: 2.68rem;
		height: 1.46rem;
		margin-right: 0.32rem;
	}
	
	.prd_div_itemimg {
		width: 2.68rem;
		height: 1.46rem;
		border-radius: 6px;
	}
	
	.prd_div_itemtopright {
		display: block;
		float: left;
		width: 4rem;
		height: 1.46rem;
		position: relative;
	}
	
	.prd_div_name {
		font-size: 0.28rem;
		color: #444444;
		line-height: 0.4rem;
		font-weight: bold;
	}
	
	.prd_div_describe {
		margin-top: 0.04rem;
		width: 4rem;
		height: 0.56rem;
		/*overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;*/
		line-height: 0.28rem;
		/*-webkit-box-orient: vertical;*/
		font-size: 0.24rem;
		color: #969696;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.prd_img_hot {
		display: block;
		float: left;
		width: 0.56rem;
		height: 0.32rem;
		margin-right: 0.32rem;
	}
	
	.prd_div_bottom {
		display: block;
		float: left;
		/*widows: 4rem;*/
		height: 0.32rem;
		margin-top: 0.1rem;
		margin-left: 0.35rem;
		/*position: absolute;
		bottom: 0;*/
	}
	
	.prd_div_itemcompany {
		display: block;
		float: left;
		width: 2.65rem;
		height: 0.24rem;
		line-height: 0.24rem;
		font-size: 0.24rem;
		color: rgba(0, 0, 0, 0.50);
		margin-top: 0.16rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.prd_div_rb {
		height: 0.44rem;
		position: absolute;
		bottom: 0.07rem;
		right: 0.2rem;
	}
	
	.prd_div_money {
		display: block;
		float: left;
		font-size: 0.28rem;
		height: 0.28rem;
		line-height: 0.44rem;
		color: #EB6069;
	}
	
	.prd_div_money1 {
		display: block;
		float: left;
		font-size: 0.44rem;
		color: #EB6069;
	}
	
	.prd_div_bottombg {
		width: 7.18rem;
		height: 0.01rem;
		background: #C8C7CC;
		position: absolute;
		bottom: 0;
	}
	
	.prd_img_null {
		width: 4.82rem;
		height: 3.9rem;
		margin-left: 1.34rem;
		margin-top: 1.6rem;
	}
	
	.prd_div_null {
		font-size: 0.28rem;
		color: #333333;
		margin-top: 0.34rem;
		text-align: center;
	}
	
	.prd_div_allpading {
		padding-bottom: 0.5rem;
	}
</style>