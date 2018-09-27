<template>
	<div class="bg">
		<!--<img class="img" src="/static/detail1.jpg" />-->
		<img class="img" src="/static/detail2.jpg" />
		<div style="height:1rem;background: #fff;overflow: hidden;">
			<img class="img1" src="/static/detail3.jpg" />
		</div>
		<table class="insurance_table">
			<tr class="thead">
				<td>保险责任</td>
				<td>保额（单位：元）</td>
			</tr>
			<tr>
				<td>民航班机意外身故(伤残)</td>
				<td>500000</td>
			</tr>
			<tr>
				<td>高铁、火车、轮船意外身故(伤残)</td>
				<td>200000</td>
			</tr>
			<tr>
				<td>公共汽车、班车意外身故(伤残)</td>
				<td>100000</td>
			</tr>
			<tr>
				<td>附加公共交通个人意外伤害医疗</td>
				<td>5000</td>
			</tr>
		</table>
		<div class="bottom">
			<div class="img_wrap" @click="handleClickYes">
				<img v-if="show" src="/static/y.png" />
				<img v-if="!show" src="/static/n.png" />
			</div>
			<p class="agreemen" @click="handleClickLict">本人已充分了解本保险产品，并承诺投保信息的真实性。
				<span style="color: #26A2FF;">《保险条款》</span></br>
				<!--<span style="color: #26A2FF;" @click="handleClickLict(1)">《航空旅客人身意外伤害保险（一年期）条款》</span></br>-->
				<!--<span style="color: #26A2FF;" @click="handleClickLict(2)">《公共交通意外伤害保险（A款）条款》</span>
				<span style="color: #26A2FF;" @click="handleClickLict(3)">《附加公共交通个人意外伤害医疗保险条款》</span>-->
			</p>
		</div>
		<div class="btn">
			<span class="money">保费&yen;20元/份</span>
			<span @click="handleClickBuy" class="buy">立即投保</span>
		</div>
		<div v-if="!pdfShow" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div>
	</div>
</template>

<script>
	import Pdf from '@/components/pdf.vue'
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				show: false,
				pdf:"http://h5.qtoubao.cn:8012/onlinePreview?url=http://outer.qtoubao.cn:9900/group1/M00/00/8A/rBUADVufV0aAV0wdAAXofCNTbPs829.pdf",
				pdfShow:true
			}
		},
		methods: {
			handleClickYes() {
				if(this.show) {
					this.show = false
				} else {
					this.show = true
				}
			},
			handleClickBuy() {
				Toast('您好，平台正在报备中，暂时无法投保。')
			},
			handleClickLict(a){
				this.pdfShow=false
				
			},
			pdfClose(...data) {
				this.pdfShow = data[0]
			},
		},
		components:{
			Pdf:Pdf
		}
	}
</script>

<style scoped="scoped">
	.mask{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		z-index: 10;
	}
	.bg {
		width: 100%;
		height: 100%;
		background: #f8f8f8;
		position: relative;
		padding-bottom: .3rem;
	}
	
	.img {
		width: 7.5rem;
		height: auto;
	}
	
	.img1 {
		width: 1.68rem;
		height: auto;
		display: block;
		margin: .2rem auto 0;
	}
	
	.insurance_table {
		width: 98%;
		margin: .2rem auto;
		border-collapse: collapse;
		line-height: 1rem;
		border: 1px solid #aaa;
		background: #FFFFFF;
	}
	
	.insurance_table .thead {
		background: #ee1446;
		color: #fff;
		text-align: right;
		font-size: .25rem;
	}
	
	.insurance_table td {
		padding: .1rem;
		text-align: center;
		font-size: .3rem;
		border: 1px solid #aaa;
	}
	
	tr {
		height: .5rem;
		line-height: .5rem;
	}
	
	.bottom {
		position: relative;
		height: 2rem;
	}
	
	.img_wrap {
		position: relative;
	}
	
	.img_wrap img {
		width: .32rem;
		height: .32rem;
		position: absolute;
		top: .3rem;
		left: .3rem;
	}
	
	.agreemen {
		position: absolute;
		top: .2rem;
		left: .7rem;
		line-height: 0.44rem;
	}
	
	.btn {
		width: 100%;
		position: fixed;
		bottom: 0;
	}
	
	.buy {
		display: inline-block;
		width: 60%;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
		background: #ee1446;
		color: #fff;
		font-size: .34rem;
		float: right;
	}
	
	.money {
		display: inline-block;
		width: 40%;
		text-align: center;
		height: 1rem;
		line-height: 1rem;
		background: #fff;
		color: #ee1446;
		font-size: .34rem;
	}
	.ctc_div_mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000;
		background: rgba(0, 0, 0, 0.40);
		z-index: 10;
	}
</style>