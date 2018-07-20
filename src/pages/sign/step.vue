<template>
	<div class="background">
		<div v-if="!pdfFlag" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div>
		<div class="items"></div>
		<img class="tpo_img" src="/static/img/sign/bg@2x.png" alt="" />
		<p class="join">加入明大保险经纪</p>
		<div class="hr hr1"></div>
		<div class="ling"></div>
		<div class="cir"></div>
		<div class="ling2"></div>
		<div class="hr hr2"></div>
		<p class="name" v-model="stepname">{{stepname}}</p>
		<div class="hr3"></div>
		<p class="sm_it" v-model="stepcode">经纪人代码：{{stepcode}}</p>
		<p class="sm_it1" v-model="stepzhinum">执业证编号：{{stepzhinum}}</p>
		<p class="data" v-model="stepstartdata">{{stepstartdata}}</p>
		<p class="data1" v-model="stependdata">{{stependdata}}</p>
		<p class="day">入司日期</p>
		<p class="day1">证书有效期</p>
		<div class="bottom">
			<div class="ht ht1" v-model="singindexss" @click="stepnoclick">
    		<img src="/static/img/sign/agreement.png" alt="" />	<br>
			<p class="item1">委托销售合同</p>
    	</div>
    	<div class="ht ht2" v-model="singindex1ss" @click="stepnoclick1">
    		<img src="/static/img/sign/agreement.png" alt="" /><br>
    		<p class="item2">诚信展业承诺书</p>
    	</div>
    	<div class="ht ht3" v-model="singindex2ss" @click="stepnoclick2">
    		<img src="/static/img/sign/agreement.png" alt="" /><br>
    		<p class="item2">合规展业承诺书</p>
    	</div>
		</div>
		
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import Pdf from '@/components/pdf.vue'
	export default {
		name: "handCard",
		data() {
			return {
				stepname:"",
				stepstartdata:"",
				stependdata:"",
				stepcode:"",
				stepzhinum:"",
				singindexss:"",
				singindex1ss:"",
				singindex2ss:"",
				pdfFlag: true,
				pdf:""
			}
		},
		created(){
			this.stepclick();
			var data={
				"brokerId":this.$route.query.brokerId
			}
			Indicator.open();
				this.$http.post(this.$store.state.link + "/core/broker/findBrokersByBrokId", data).then(res => {
					Indicator.close();
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						
					this.stepname=res.data.output.qBrokerName
					this.stepstartdata=res.data.output.qEmployDate
					this.stependdata=res.data.output.qInvalidDate
					this.stepcode=res.data.output.qBrokerCode
					this.stepzhinum=res.data.output.qQuafNo
					} else {
						
					}
				}, res => {
					Indicator.close();
					
					console.log("2===" + res.data)
				})
				
		},
		methods:{
			pdfClose(...data) {
				this.pdfFlag = data[0]
			},
			stepnoclick(){
				console.log(this.singindexss)
				this.pdfFlag=false;
				this.pdf=this.singindexss
				
			},
			stepnoclick1(){
				this.pdfFlag=false;
				this.pdf=this.singindex1ss
			},
			stepnoclick2(){
				this.pdfFlag=false;
				this.pdf=this.singindex2ss
			},
			stepclick(){
				var signdata = [{
				"tmId": "TM0004"
			}, {
				"tmId": "TM0005"
			}, {
				"tmId": "TM0006"
			}]

			console.log(signdata);
			Indicator.open();
			this.$http.post(this.$store.state.link + '/css/css/queryTemplateByTmIdList', signdata)
				.then(res => {
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						this.singindexss = res.data.output[2].tmFmsUrl;
						this.singindex1ss = res.data.output[0].tmFmsUrl;
						this.singindex2ss = res.data.output[1].tmFmsUrl;

					}

					Indicator.close();
				}, res => {
					Indicator.close();

				})

			}
		},
		components: {
			Pdf: Pdf
		}
	}
		
</script>

<style scoped="scoped">
	 .clear{
		clear: both;
	}
	.background{
		  	width: 100%;
		  	height: 100%;
		  	/*position: fixed;*/
		  	background: url(/static/img/sign/paper.png) no-repeat;
		  	background-size:cover ;
		  	overflow: hidden;
  	}
  	.items{
  		position: relative;
  	}
  	.item2{
  		margin-left:-0.1rem;
  	}
  	.tpo_img{
  		/*position: absolute;*/
  		/*margin-top:1.2rem;*/
  		/*margin-left: 0.34rem;*/
  		width:100%;
  		height:100%;
  	}	
	.join{
		position: absolute;
		top:2.6rem;
		left:1.84rem;
		font-size: 0.48rem;
		line-height: 0.48rem;
		color: #3F464C;
	}
	.cir{
		position: absolute;
		top:3.45rem;
		left:3.585rem;
		width:0.12rem;
		height:0.12rem;
		border-radius: 50%;
		background: #3F464C;
	}
	.ling{
		position: absolute;
		top:3.5rem;
		left:3.35rem;
		width :0.17rem;
		height:0.12rem;
		transform: skew(45deg);
		background: #3F464C;
	}
	.ling2{
		position: absolute;
		top:3.5rem;
		left:3.75rem;
		width :0.17rem;
		height:0.12rem;
		/*transform: rotate(45deg);*/
		transform: skew(-45deg);
		background: #3F464C;
	}
	.hr{
		position: absolute;
		top:3.5rem;
		left:2.0rem;
		width:1.26rem;
		height:0.06rem;
		border-bottom:0.01rem solid #3F464C;
	}
	.hr2{
		left:4.054rem;
	}
	.name{
		position: absolute;
		top:5.06rem;
		left:3.02rem;
		font-size: 0.36rem;
		line-height:0.5rem;
		text-align: center;
		color: #3F464C;		
	}
	.hr3{
		position: absolute;
		top:5.58rem;
		left:1.78rem;
		width:3.92rem;
		height:0.06rem;
		border-bottom: 0.02px solid #3F464C;
	}
	.sm_it{
		position: absolute;
		top:5.98rem;
		left:2.52rem;
		font-size: 0.2rem;
		color: #3F464C;
	}
	.sm_it1{
		position: absolute;
		top:6.38rem;
		left:2.52rem;
		font-size: 0.2rem;
		color: #3F464C;
	}
	.data{
		position: absolute;
		top:7.64rem;
		left:1.34rem;
		border-bottom:0.01rem dashed #000; 
		font-size: 0.2rem;
		line-height: 0.48rem;
		color: #000000;
	}
	.data1{
		position: absolute;
		top:7.64rem;
		right:1.38rem;
		border-bottom:0.01rem dashed #000; 
		font-size: 0.2rem;
		line-height: 0.48rem;
		color: #000000;
	}
	.day{
		position: absolute;
		top:8.32rem;
		left:1.44rem;
		font-size:0.16rem;
		color: #3F464C;
	}
	.day1{
		position: absolute;
		top:8.32rem;
		right:1.44rem;
		font-size:0.16rem;
		color: #3F464C;
	}
	 .ht{
  	 	float: left;
  	 	font-size: 0.2rem;
		color: #FFFFFF;
  	 	/*margin-bottom: 1.04rem;*/
  	 }
  	 .ht img{
  	 	width:1.60rem;
  	 	height:1.54rem;
  	 	margin-top: 0.32rem;
  	 	margin-bottom: 0.32rem;
  	 }
  	.ht1 {
  		margin-left: 0.9rem;
  		margin-right: 0.5rem;
  	}
  	.ht3{
  		margin-left: 0.5rem;
  	}
  	.bottom{
  		position: absolute;
  		top:11.13rem;
  	}
  	.ctc_div_mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #000000;
		background: rgba(0, 0, 0, 0.40);
		z-index: 100;
	}
  	
</style>