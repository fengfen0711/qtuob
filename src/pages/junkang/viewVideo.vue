<template>
	<div class="inforUpload">
		<div class="inforUploadW">
			<div class="inforUpload_all">
				<div class="inforUpload_div">
					<p class="inforUpload_p">投保人{{aName}} 证件</p>
					<div class="inforUpload_img">
						<div id="" class="inforUpload_up">
							<img :src="a" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="" code="1">
						</div>
						<div id="" class="inforUpload_up inforUpload_right">
							<img :src="b" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="" code="2">
						</div>
					</div>
				</div>
				<div class="inforUpload_div1">
					<p class="inforUpload_p">投保人{{aName}} 银行卡</p>
					<div class="inforUpload_img">
						<div id="" class="inforUpload_up">
							<img :src="c" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="" code="3">
						</div>
	
					</div>
				</div>
				<div class="inforUpload_div1 ">
					<p class="inforUpload_p">被保险人{{iName}} 证件</p>
					<div class="inforUpload_img">
						<div id="" class="inforUpload_up">
							<img :src="d" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="" code="4">
						</div>
						<div id="" class="inforUpload_up inforUpload_right">
							<img :src="e" class="inforUpload_up_img" />
							<input class="file" type="file" accept="image/*" name="file" @change="" code="5">
						</div>
					</div>
				</div>
	
			</div>
			<div class="information_bottom_btn">
				<span class="information_bottom" @click="lastClick">上一步</span>
				<span class="information_next" @click="nextClick">下一步</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Exif from 'exif-js'
	import wx from 'weixin-js-sdk'
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: "inforUpload",
		data() {
			return {
				relationshipFlag: false,
				aName: "",
				iName: "",
				headerImage: '',
				picValue: '',
				a: "/static/img/ida.png",
				b: "/static/img/IdCard.png",
				c: "/static/img/banka.png",
				d: "/static/img/ida.png",
				e: "/static/img/IdCard.png",
				a1: "",
				b1: "",
				c1: "",
				d1: "",
				e1: "",
				allData: {},
				shou: ""

			}
		},
		created() {
			//			this.nationalitySelect();
			this.init();
		},
		methods: {
			init() {
				var data = {
					"token": this.$route.query.token,
					"userId": this.$route.query.userId,
					"head": {
						"oprStep": "inforUpload",
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$route.query.userId,
						"prodCode": this.$route.query.prodCode

					},
					"opt": "ALL",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
            },
            lastClick() {
				this.$router.push('');
			},
       		nextClick() {
				this.$router.push('/jkCustomer');
			}
		}
	}
</script>

<style scoped="scoped">
	canvas {
		position: fixed;
		opacity: 0;
	}
	
	.inforUpload {
		width: 100%;
		position: absolute;
		background: #F3F3F3;
		min-height: 100%;
	}
	.inforUploadW {
		padding: 0.4rem 0 .6rem;
	} 
	.inforUpload_all {
		padding: 0 0.52rem;
		margin-bottom: 0.58rem;
	}
	
	.inforUpload_div {
		background: #FFFFFF;
		height: 3.44rem;
		width: 100%;
		border-radius: 0.16rem;
	}
	
	.inforUpload_div1 {
		background: #FFFFFF;
		height: 3.65rem;
		width: 100%;
		border-radius: 0.08rem;
		margin-top: 0.32rem;
	}
	
	.inforUpload_p {
		font-size: 0.28rem;
		color: #555555;
		height: 0.7rem;
		border-bottom: 0.01rem solid #EEEEEE;
		text-align: center;
		line-height: 0.7rem;
	}
	
	.inforUpload_img {
		padding: 0 0.4rem;
		margin-top: 0.5rem;
	}
	
	.inforUpload_up {
		position: relative;
		width: 2.46rem;
		height: 1.68rem;
		background: #E0E5FE;
		border-radius: 0.08rem;
		display: inline-block;
	}
	
	.file {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		opacity: 0;
	}
	
	.inforUpload_right {
		float: right;
	}
	
	.inforUpload_up_img {
		width: 2.46rem;
		height: 1.68rem;
		display: block;
	}
	
	.inforUpload_up_p {
		font-size: 0.24rem;
		color: #888888;
		text-align: center;
	}
	
	.information_bottom_btn {
		padding: 0 0 0 0.48rem;
		vertical-align: bottom;
		height: 0.88rem;
		/*margin-bottom: 0.56rem;*/
	}
	
	.information_bottom {
		width: 3.12rem;
		height: 0.88rem;
		border: 1px solid #EB7760;
		border-radius: 0.44rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
	}
	
	.information_next {
		width: 3.12rem;
		height: 0.88rem;
		border: 1px solid #EB7760;
		border-radius: 0.44rem;
		font-size: 0.32rem;
		color: #EB7760;
		text-align: center;
		line-height: 0.88rem;
		display: inline-block;
		margin-left: 0.3rem;
	}
	
	.inforUpload_booy {
		margin-bottom: ;
	}
</style>