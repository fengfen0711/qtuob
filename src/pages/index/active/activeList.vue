<template>
	<div class="prd_div_body">
		<div class="prd_div_allpading">
			<div :code="item.router" @click="handleClickDetail" v-for="(item,index) in itemall" class="prd_div_itemall">
				<div class="prd_div_itemtop">
					<img class="prd_div_itemimg" :src="item.src" />
				</div>
				<div class="prd_div_itemtopright">
					<div class="prd_div_name">{{item.name}}</div>
					<!--<div class="prd_div_describe">{{item.prodRecmd}}</div>-->
					<!--<div class="prd_div_bottom">
						<img class="prd_img_hot" src="/static/qijianwei/hot.png" />
					</div>-->
					<span class="pBottom">
						<img class="pHot" src="/static/imgNew/hot3.png" />
						<img class="pHot" src="/static/imgNew/new3.png" />
						<img class="pHot" src="/static/imgNew/tj3.png" />
					</span>
				</div>
				<div class="prd_div_itemcompany">{{item.city}}</div>
				<div class="prd_div_bottom">
<!--				<img class="prd_img_hot" src="/static/qijianwei/hot.png" />-->
				</div>
				<div class="prd_div_rb">
					<div class="prd_div_money">￥</div>
					<div class="prd_div_money1">{{item.price}}</div>
					<div class="prd_div_money">起</div>
				</div>
				<div class="prd_div_bottombg"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'activeList',
		data() {
			return {
				itemall: [{
					name: "小蘑菇",
					src: "/static/banner_xiao.jpg",
					city: "上海人寿",
					price: "32",
					router: "/shopLineDe?prodCode=P000303010194&prodSaleCode=G000303001142"
				}, {
					name: "畅游天下",
					src: "/static/banner_yin.jpg",
					city: "中银保险",
					price: "50",
					router: "/shopLineDe?prodCode=P000304010207&prodSaleCode=G000304001161"
				}, {
					name: "就医安心手术意外伤害",
					src: "/static/banner_y.jpg",
					city: "新华保险",
					price: "428",
					router: "/yiwai"
				}, {
					name: "母婴安康意外伤害",
					src: "/static/banner_y.jpg",
					city: "新华保险",
					price: "398",
					router: "/muying"
				}, {
					name: "航空意外险",
					src: "/static/detail2.jpg",
					city: "中银保险",
					price: "20",
					router: "/zhongyin"
				}, {
					name: "全年综合意外医疗",
					src: "/static/banner_active.png",
					city: "新华保险",
					price: "30",
					router: "/xinhua"
				}, {
					name: "账户无忧",
					src: "/static/activesafe1.png",
					city: "中银保险",
					price: "30",
					router: "/activeSafe"
				}, {
					name: "吉祥安康",
					src: "/static/bus1.jpg",
					city: "中银保险",
					price: "90",
					router: "/bus"
				}, {
					name: "公共交通意外险",
					src: "/static/fly1.jpg",
					city: "中银保险",
					price: "1",
					router: "/fly"
				}, {
					name: "全民e保·百万医疗",
					src: "/static/active_bai.png",
					city: "泰康保险",
					price: "1",
					router: "/bai"
				},{
					name: "海外医疗",
					src: "/static/sea1.png",
					city: "中银保险",
					price: "557",
					router: "/overseas"
				}]

			}
		},
		created() {
			if(this.$route.query.path == "ming"){
				var sceneInfo = {
					"sceneCode": "s001"
				}
	  			this.$http.post(this.$store.state.link + '/sso/v2/applytoken', sceneInfo)
				.then(res =>{
				    console.log(res.data);
					var dataCode = res.data.code;
					if (dataCode == "SYS_S_000") {
						window.localStorage.token = res.data.output.token;
						this.$store.dispatch("changeToken", res.data.output.token);
						this.titleAjax()
					}else{
						Toast(res.data.desc);
						console.log(res.data.desc)
					}
				},res =>{
					console.log(res.data);
				})
			}
		},
		methods: {
			handleClickDetail(e) {
				this.$router.push(e.currentTarget.getAttribute('code'))
			}
		}
	}
</script>

<style scoped="scoped">
	.prd_div_itemall {
		width: 7.18rem;
		height: 2.03rem;
		padding-top: 0.32rem;
		padding-left: 0.32rem;
		position: relative;
		border-bottom: .01rem solid #ccc;
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
		height: 1.2rem;
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
	/*	/*
	.prd_div_bottombg {
		width: 7.18rem;
		height: 0.01rem;
		background: #C8C7CC;
		position: absolute;
		bottom: 0;
	}*/
	
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
	.pBottom {
		display: block;
		height: 0.32rem;
	}
	.pHot {
		display: block;
		float: left;
		width: 0.56rem;
		margin-right: 0.32rem;
	}
</style>