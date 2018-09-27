<template>
	<div class="bg">
		<img class="img" src="/static/bus1.jpg" />
		<img class="img" src="/static/bus2.jpg" />
		<div style="height:1rem;background: #fff;overflow: hidden;">
			<img class="img1" src="/static/detail3.jpg" />
		</div>
		<table class="insurance_table">
            <thead>
                <tr><td width="64%">保障项目</td>
                    <td>保额（单位：元）</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>意外伤害残疾</td>
                    <td>100000</td>
                </tr>
            
                <tr>
                    <td>意外伤害身故</td>
                    <td>100000</td>
                </tr>
            
                <tr>
                    <td>意外伤害医疗费用</td>
                    <td>10000</td>
                </tr>
            </tbody>
		</table>
		<div class="bottom">
			<div class="img_wrap">
				<img v-if="show" src="/static/y.png" @click="handleClickYes"/>
				<img v-if="!show" src="/static/n.png" @click="handleClickYes"/>
			</div>
			<p class="agreemen">
				<span id="" class="" style="color:#4d4d4d;"></span>
				<span @click="handleClickLict">
					本人已充分了解本保险产品，并承诺投保信息的真实性。理解并同意
					<span style="color: #26A2FF;">《保险条款》</span>
				</span>
			</p>
		</div>
		<div class="btn">
			<span class="money">保费&yen;90元/份</span>
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
				pdf:"",
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
			pdfClose(...data) {
				this.pdfShow = data[0]
			},
			handleClickBuy() {
				Toast('您好，平台正在报备中，暂时无法投保。')
			},
			handleClickLict(){
				this.pdfShow=false;
				this.pdf="http://h5.qtoubao.cn:8012/onlinePreview?url=http://outer.qtoubao.cn:9900/group1/M00/00/89/rBUADVufVwqACtyKAAZO-WH9jt4889.pdf"
			}
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
	
	.insurance_table thead {
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
	
	.insurance_table thead td {
		border: 0;
	}
	
	.insurance_table thead td:nth-child(2n) {
		background-color: #ee1446;
	}
	
	.insurance_table td:nth-child(2n) {
		background: #ffd0da;
	}
	
	.insurance_table thead td {
		border: 0;
	}
	
	tr {
		height: .5rem;
		line-height: .5rem;
	}
	
	.bottom {
		position: relative;
		height: 3rem;
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
		line-height: .4rem;
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
	.busBg {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 10;
		width: 2.6rem;
		height: 3.4rem;
		background: #a7d7d7;
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