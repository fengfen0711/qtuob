<template>
	<div class="prd_div_body">
		
		<div class="sortMenu clearfix">
			<!--tab头部-->
			<div class="sortMenu-ul">
				<ul class="sortMenu-ul1">
					<li ref="item" @click="select_lab($event,item.tagCode,index)" class="cell1" v-for="(item,index) in sortMenu">
						<span class="prd_div_itemlab1">{{item.tagName}}</span>
						<b class="titleBg"></b>
					</li>
				</ul>
			</div>
		</div>
		<div class="prd_div_allpading">
			<div class="prd_div_topall">
				<p class="prd_div_queryall">
					<img class="prd_img_query" src="/static/imgNew/SearchGlyph3.png" @click="changeCount" />
					<input v-model="input_value" class="prd_input_query" type="search" @keyup.13=changeCount() placeholder="搜索" />
				</p>
			</div>
			<div class="conBox">
				<div v-if="data_flag" :code="item.prodCodeList[0].prodCode" :coder="item.prodSaleCode" @click="handleClickDetail" v-for="item in itemall" class="prd_div_itemall">
					<div class="topBox clearFloat">
						<div class="prd_div_itemtop">
							<img class="prd_div_itemimg" :src="item.attachList[0].attachUrl" />
						</div>
						<div class="prd_div_itemtopright">
							<p class="prd_div_name">{{item.prodSaleName}}</p>
							<p class="prd_div_describe">{{item.prodRecmd}}</p>
							<p>
								<span class="prd_div_bottom">
									<img class="prd_img_hot" src="/static/imgNew/hot3.png" />
									<img class="prd_img_hot" src="/static/imgNew/new3.png" />
									<img class="prd_img_hot" src="/static/imgNew/tj3.png" />
								</span>
							</p>
						</div>
					</div>
					<div class="btomBox">
						<span class="prd_div_itemcompany">{{item.deptAbr}}</span>
						
						<span class="prd_div_rb">
							<span v-if="show_money(item.minPrice)" class="prd_div_money">￥</span>
							<span class="prd_div_money1">{{item.minPrice}}</span>
							<span v-if="show_money(item.minPrice)" class="prd_div_money">起</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="nothing" v-if="!data_flag">
			<img class="prd_img_null" src="/static/qijianwei/pro_null.png" />
			<div class="prd_div_null">还没有任何产品，敬请期待！</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'product',
		data() {
			return {
				sortMenu: [],
				itemall: [],
				data_flag: true,
				input_value: "",
				tagCode: ""
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
					this.getPro(this.sortMenu[0].tagCode);
				} else {
					if(res.data.desc != undefined) {
						console.log(res.data.desc);
					} else {
						console.log("登录接口undefined");
					}
				}
			}, res => {
				Indicator.close();
				console.log(res.data)
			})
			
			this.common.noShare();
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
				this.$router.push('/detail?prodCode=' + code + '&prodSaleCode=' + prodSaleCode + "&userId=" + localStorage.userId)
			},
			select_lab(ev, code) {
				this.tagCode = code;
				for(var i = 0; i < this.$refs.item.length; i++) {
					this.$refs.item[i].setAttribute("class", "cell1");
					this.$refs.item[i].children[1].setAttribute("class", "titleBg");
				}
				ev.currentTarget.setAttribute("class", "cell");
				ev.currentTarget.children[1].setAttribute("class", "titleBg1");
				this.getPro(code);
			},
			getPro(code){
				var data = {
					"prodSaleName": this.input_value,
					"showType": "2",
					"clssTtagList": [{
						"tagCode": code
					}],
					"tmpType": ""
				}
				console.log(JSON.stringify(data))
				Indicator.open();
				this.$http.post(this.$store.state.link + "/prd/prod/tagprodsalelist", data).then(res => {
					Indicator.close();
					if(res.data.code == "SYS_S_000") {
						this.itemall = res.data.output;
						this.data_flag = true;
					} else {
						this.data_flag = false;
						if(res.data.desc != undefined) {
							console.log(res.data.desc);
						} else {
							console.log("登录接口undefined");
						}
					}
				}, res => {
					Indicator.close();
					this.data_flag = false;
					console.log(res.data)
				})
			},
			changeCount() {
				if(this.input_value.length < 2 && this.input_value.length != 0) {
					Toast("搜索名称不能小于2个字");
					return;
				}
				this.getPro(this.tagCode)
			}
		},
		watch: {
			sortMenu: function() {
				this.$nextTick(function() {
					if(this.$refs.item.length > 0) {
						this.$refs.item[0].setAttribute("class", "cell");
						this.$refs.item[0].children[1].setAttribute("class", "titleBg1");
						this.test = false;
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.prd_div_body {
		position: absolute;
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
	}
	
	.prd_div_title {
		width: 7.1rem;
		height: 0.9rem;
		padding-top: 0.48rem;
		padding-left: 0.4rem;
		background: #F8F8F8;
		color: #000000;
		font-size: 0.68rem;
	}
	
	.prd_div_queryall {
		width: 6.86rem;
		height: 0.64rem;
		margin: 0 auto;
		background: #EEEEEE;
		border-radius: 0.08rem;
	}
	
	.prd_img_query {
		display: block;
		float: left;
		width: 0.28rem;
		height: 0.28rem;
		margin-top: 0.18rem;
		margin-left: 0.2rem;
	}
	
	.prd_input_query {
		width: 6.14rem;
		height: 0.64rem;
		padding-left: 0.24rem;
		border: none;
		background: #EEEEEE;
		font-size: 0.32rem;
		border-radius: 0.08rem;
	}
	
	.prd_div_topall {
		padding-top: 1.2rem;
		background: #ffffff;
	}
	
	.prd_div_labelall {
		width: 100%;
		height: 1.04rem;
		background: #F8F8F8;
		overflow-x: scroll;
	}
	
	.prd_div_label {
		height: 1.04rem;
		line-height: 1.04rem;
		padding: 0 0.2rem;
		font-size: 0.36rem;
		color: #222222;
	}
	
	.sortMenu {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 10;
		width: 100%;
		height: 1rem;
		background: #FFFFFF;
		overflow-x: scroll;
		-webkit-overflow-x: scroll;
	}
	
	.sortMenu::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}
	
	.sortMenu-ul {
		display: flex;
		justify-content: flex-start;
		min-width: 7.5rem;
		padding: 0 0.1rem;
		padding-left: 0.3rem;
	}
	.sortMenu-ul1 {
		position: relative;
		display: flex;
		justify-content: flex-start;
		border-bottom: solid 0.01rem #CCCCCC;
	}
	.cell {
		position: relative;
		display: inline-block;
		height: 0.88rem;
		line-height: 1rem;
		margin: 0 0.5em;
		font-size: 0.32rem;
		font-weight: bold;
		color: #FF4848;
		text-align: center;
		position: relative;
		text-overflow: ellipsis;
		word-break: keep-all;
	}
	
	.cell1 {
		position: relative;
		display: inline-block;
		height: 0.88rem;
		line-height: 1rem;
		margin: 0 0.2rem;
		font-size: 0.3rem;
		color: #222222;
		text-align: center;
		position: relative;
		text-overflow: ellipsis;
		word-break: keep-all;
	}
	.sortMenu-ul1 .cell:first-child,.sortMenu-ul1 .cell1:first-child {
		margin-left: 0;
	}
	.titleBg {
		display: none;
	}
	.titleBg1 {
		position: absolute;
		bottom: -0.04rem;
		left: 0;
		z-index: 3;
		display: block;
		width: 100%;
		height: 0.08rem;
		background: linear-gradient(90deg,#FF4F87 0%,#A86BF6 100%);
		border-radius: 0.08rem;
	}
	
	.conBox {
		width: 7.18rem;
		padding-left: 0.32rem;
	}
	.prd_div_itemall {
		position: relative;
		height: 2.01rem;
		padding-top: 0.32rem;
		border-bottom: solid 0.01rem #D8D8D8;
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
		border-radius: 0.08rem;
		background: rgba(0,0,0,0.03);
	}
	
	.prd_div_itemtopright {
		position: relative;
		display: block;
		float: left;
		width: 4rem;
		height: 1.46rem;
	}
	
	.prd_div_name {
		line-height: 0.4rem;
		font-size: 0.28rem;
		font-weight: bold;
		color: #444444;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.prd_div_describe {
		width: 4rem;
		height: 0.64rem;
		line-height: 0.34rem;
		margin-top: 0.1rem;
		margin-bottom: 0.06rem;
		font-size: 0.24rem;
		color: #969696;
		overflow: hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient: vertical;
		-webkit-line-clamp:2;
	}
	
	.prd_img_hot {
		display: block;
		float: left;
		width: 0.6rem;
		height: 0.24rem;
		margin-right: 0.16rem;
	}
	
	.prd_div_bottom {
		display: block;
		/*float: left;*/
		height: 0.32rem;
		/*margin-left: 0.35rem;*/
	}
	.btomBox {
		margin-top: 0.12rem;
	}
	.prd_div_itemcompany {
		display: block;
		float: left;
		width: 2.65rem;
		height: 0.32rem;
		line-height: 0.32rem;
		font-size: 0.24rem;
		color: rgba(0, 0, 0, 0.50);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.prd_div_rb {
		position: absolute;
		bottom: 0.07rem;
		right: 0.2rem;
		height: 0.44rem;
	}
	
	.prd_div_money {
		display: block;
		float: left;
		line-height: 0.44rem;
		font-size: 0.28rem;
		height: 0.28rem;
		color: #EB6069;
	}
	
	.prd_div_money1 {
		display: block;
		float: left;
		font-size: 0.44rem;
		color: #EB6069;
	}
	
	.prd_img_null {
		width: 4.82rem;
		height: 3.9rem;
		margin-left: 1.34rem;
		margin-top: 1.6rem;
	}
	
	.prd_div_null {
		margin-top: 0.34rem;
		font-size: 0.28rem;
		color: #666666;
		text-align: center;
	}
	
	.prd_div_allpading {
		padding-bottom: 1rem;
	}
</style>