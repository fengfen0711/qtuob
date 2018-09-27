<template>
	<div class="bg">
		<img class="img" src="/static/fly1.jpg" />
		<img class="img" src="/static/fly2.jpg" />
		<div style="height:1rem;background: #fff;overflow: hidden;">
			<img class="img1" src="/static/detail3.jpg" />
		</div>
		<p class="inputGrop">
			<label class="inputLabel">保险期间</label>
			<select name="name_car" v-model="time" class="inputText" @change="getCouponSelected">
				<option :value="ti.id" v-for="ti in timeList" >{{ti.name}}</option>
			</select>
		</p>
		<table class="insurance_table">
            <thead>
                <tr>
                	<td width="64%">保障项目</td>
                    <td>保额（单位：元）</td>
                </tr>
            </thead>
            <tbody>
            	<tr v-for="bao in baoBList">
                    <td>{{bao.name}}</td>
                    <td>{{bao.money}}</td>
               </tr>
            </tbody>
		</table>
		<div class="bottom">
			<div class="img_wrap">
				<img v-if="show" src="/static/y.png"  @click="handleClickYes"/>
				<img v-if="!show" src="/static/n.png"  @click="handleClickYes"/>
			</div>
			<p class="agreemen"><span id="" class="" style="color:#4d4d4d;"></span><span @click="handleClickLict">本人已充分了解本保险产品，并承诺投保信息的真实性，理解并同意 <span style="color: #26A2FF;">《保险条款》</span>。</span><!--，、<span style="color: #26A2FF;" @click="handleClickLict">《附加个人意外伤害住院津贴保险（B款）条款》</span>--></p>
		</div>
		<div class="btn">
			<span class="money">保费&yen;1元/份</span>
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
				pdf:"http://h5.qtoubao.cn:8012/onlinePreview?url=http://outer.qtoubao.cn:9900/group1/M00/00/8A/rBUADVufVzaAKJf7AAV-QP1yZ3s444.pdf",
				pdfShow:true,
				time:'',
				timeList: [
					{
						'id':"0",
						'name':"1个月"
					},
					{
						'id':"1",
						'name':"3个月"
					},
					{
						'id':"2",
						'name':"6个月"
					},
					{
						'id':"3",
						'name':"9个月"
					},
					{
						'id':"4",
						'name':"12个月"
					},
				],
				baoBList:[],
				baoList: [
					{
						'id':"1",
						'baoChList': [
							{
								'chId':'0',
								'name':'交通意外身故-飞机',
								'money':'1,000.00'
							},
							{
								'chId':'1',
								'name':'交通意外残疾-飞机',
								'money':'1,000.00'
							},
							{
								'chId':'2',
								'name':'交通意外身故-火车',
								'money':'500.00'
							},
							{
								'chId':'3',
								'name':'交通意外残疾-火车',
								'money':'500.00'
							},
							{
								'chId':'4',
								'name':'交通意外身故-轮船',
								'money':'500.00'
							},
							{
								'chId':'5',
								'name':'交通意外残疾-轮船',
								'money':'500.00'
							}
						]
					},
					{
						'id':"3",
						'baoChList': [
							{
								'chId':'0',
								'name':'交通意外身故-飞机',
								'money':'800.00'
							},
							{
								'chId':'1',
								'name':'交通意外残疾-飞机',
								'money':'800.00'
							},
							{
								'chId':'2',
								'name':'交通意外身故-火车',
								'money':'500.00'
							},
							{
								'chId':'3',
								'name':'交通意外残疾-火车',
								'money':'500.00'
							},
							{
								'chId':'4',
								'name':'交通意外身故-轮船',
								'money':'500.00'
							},
							{
								'chId':'5',
								'name':'交通意外残疾-轮船',
								'money':'500.00'
							}
						]
					},
					{
						'id':"6",
						'baoChList': [
							{
								'chId':'0',
								'name':'交通意外身故-飞机',
								'money':'800.00'
							},
							{
								'chId':'1',
								'name':'交通意外残疾-飞机',
								'money':'800.00'
							},
							{
								'chId':'2',
								'name':'交通意外身故-火车',
								'money':'300.00'
							},
							{
								'chId':'3',
								'name':'交通意外残疾-火车',
								'money':'300.00'
							},
							{
								'chId':'4',
								'name':'交通意外身故-轮船',
								'money':'300.00'
							},
							{
								'chId':'5',
								'name':'交通意外残疾-轮船',
								'money':'300.00'
							}
						]
					},
					{
						'id':"9",
						'baoChList': [
							{
								'chId':'0',
								'name':'交通意外身故-飞机',
								'money':'600.00'
							},
							{
								'chId':'1',
								'name':'交通意外残疾-飞机',
								'money':'600.00'
							},
							{
								'chId':'2',
								'name':'交通意外身故-火车',
								'money':'200.00'
							},
							{
								'chId':'3',
								'name':'交通意外残疾-火车',
								'money':'200.00'
							},
							{
								'chId':'4',
								'name':'交通意外身故-轮船',
								'money':'200.00'
							},
							{
								'chId':'5',
								'name':'交通意外残疾-轮船',
								'money':'200.00'
							}
						]
					},
					{
						'id':"12",
						'baoChList': [
							{
								'chId':'0',
								'name':'交通意外身故-飞机',
								'money':'500.00'
							},
							{
								'chId':'1',
								'name':'交通意外残疾-飞机',
								'money':'500.00'
							},
							{
								'chId':'2',
								'name':'交通意外身故-火车',
								'money':'100.00'
							},
							{
								'chId':'3',
								'name':'交通意外残疾-火车',
								'money':'100.00'
							},
							{
								'chId':'4',
								'name':'交通意外身故-轮船',
								'money':'100.00'
							},
							{
								'chId':'5',
								'name':'交通意外残疾-轮船',
								'money':'100.00'
							}
						]
					}
				]
			}
		},
		components:{
			Pdf:Pdf
		},
		created(){
	  		this.time = this.timeList[0].id;
	  		this.baoBList = this.baoList[0].baoChList;
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
			},
			getCouponSelected(){
				console.log(this.time)
				this.baoBList = this.baoList[this.time].baoChList;
			}
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
	.inputGrop {
		position: relative;
		padding: 0 0.4rem;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputLabel {
		display: block;
		float: left;
		width: 4.04rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		text-align: center;
	}
	.inputText {
		float: left;
		width: 2.2rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #333333;
	}
	input, button {
		background: none;
		border: none;
	}
	input, button {
		outline: none;
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
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
	}
	select{
		text-align-last: center;
		padding: 0;
		margin: 0;
		padding-right: 0.48rem;
		border: none;
		background: none;
		background: url(/static/upDown.png) no-repeat right center;
		background-size: 0.4rem 0.45rem;
		outline: none;
		appearance:none;
		-webkit-appearance:none;
		-moz-appearance:none;
	}
</style>