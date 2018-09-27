<template>
	<div class="bg">
		<img class="img" src="/static/safe.png" />
		<div class="bottom">
			<div class="img_wrap" @click="handleClickYes">
				<img v-if="show" src="/static/y.png" />
				<img v-if="!show" src="/static/n.png" />
			</div>
			<p class="agreemen"><span id="" class="" style="color:#4d4d4d;"></span>本人已充分了解本保险产品，并承诺投保信息的真实性。理解并同意 <span style="color: #26A2FF;" @click="handleClickLict">《保险条款》</span></p>
		</div>
		<div @click="handleClickBuy" class="btn">立即投保</div>
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
				pdf:"http://h5.qtoubao.cn:8012/onlinePreview?url=http://outer.qtoubao.cn:9900/group1/M00/00/6A/rBUADVuIsZGAES-2AARuMD97bfA353.pdf",
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
				this.pdfShow=false
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
	}
	
	.img {
		width: 7.5rem;
		height: auto;
		margin-bottom: .3rem;
	}
	
	.bottom {
		position: relative;
		height: 1.5rem;
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
		height: 1rem;
	    background-color: #0165b3;
	    text-align: center;
	    line-height: 1rem;
	    font-size: .34rem;
	    color: #ffffff;
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