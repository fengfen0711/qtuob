<template>
	<div class="background">
		<div class="content">
			<img class="banner" :src="banner" />
			<div class="plan">
				<p class="form_title">保障计划</p>
				<p class="item item1" ref="item1">
					<img class="point" src="/static/img/point.png"></img>
					<span class="item_left">保险计划</span>
					<select v-model="op">
						<option value="1">计划一</option>
						<option value="2">计划二</option>
						<option value="3">计划三</option>
					</select>
				</p>
				<p class="item item2">
					<img class="point" src="/static/img/point.png"></img>
					<span class="item_left">起保时间</span>
					<!--<span class="item_right  op2">{{year}}</span>-->
					<input type="date" v-model="time"/>
					<span class="time" v-if="show">请选择日期</span>
				</p>
				<p class="item item3">
					<img class="point" src="/static/img/point.png"></img>
					<span class="item_left">终保时间</span>
					<input type="date" v-model="endtime" />
					<span class="time" v-if="show1">请选择日期</span>
				</p>
			</div>
			<div class="project">
				<p class="form_title">保障项目</p>
				<div class="form_title_content">
					<div code="close" class="list close" v-for="item in listItem">
						<img class="point" src="/static/img/point.png" />
						<span class="name">{{item.dutyName}}</span>
						<img class="open" src="/static/img/open.png" />
						<span class="money">{{item.dutyDesc}}</span>
					</div>
				</div>
			</div>
			<!--<div class="img"></div>-->
			<div class="btnBox" @click="handleClick">马上购买</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Swipe, SwipeItem } from 'mint-ui';
	export default {
		name: "Login",
		data() {
			return {
				banner: "http://h5.qtoubao.cn:9900/group1/M00/00/73/rBUQCFthMQWAa_yiAAQ7ZcWuWs8523.jpg",
				listItem: [{
					"dutyName":"意外伤害身故残疾",
					"dutyDesc":"150,000元"
				},{
					"dutyName":"公共交通工具意外双倍赔付",
					"dutyDesc":"-------------"
				},{
					"dutyName":"医疗费用",
					"dutyDesc":"50,000元"
				},{
					"dutyName":"医疗运送和送返 ",
					"dutyDesc":"200,000元"
				},{
					"dutyName":"亲属慰问探望",
					"dutyDesc":"5,000元"
				},{
					"dutyName":"身故遗体送返",
					"dutyDesc":"50,000元"
				},{
					"dutyName":"国外丧葬费",
					"dutyDesc":"20,000元"
				},{
					"dutyName":"行李遗失或损坏 ",
					"dutyDesc":"2,000元"
				},{
					"dutyName":"行李延误",
					"dutyDesc":"1,000元"
				},{
					"dutyName":"旅行证件丢失",
					"dutyDesc":"2,000元"
				},{
					"dutyName":"航班延误",
					"dutyDesc":"900元"
				},{
					"dutyName":"旅行缩短",
					"dutyDesc":"3,000元"
				},{
					"dutyName":"旅行取消",
					"dutyDesc":"1,500元"
				},{
					"dutyName":"个人第三者责任",
					"dutyDesc":"50,000元"
				}],
				op:"1",
				time:"",
				endtime:"",
				show:true,
				show1:true
			}
		},
		created() {
//			this.getClause()
		},
		methods: {
			handleClick(){
				Toast('您好，平台正在报备中，暂时无法投保。')
			}
		},
		watch: {
			time:function(val){
				if(val!=""){
					this.show=false
					if(this.endtime!=""){
						var date1=new Date(this.endtime)
						var date = new Date(val);
						if(date1.getTime()<date.getTime()||date1.getTime()==date.getTime()){
							
							Toast("终保时间要大于起保时间")
						}
					}
				}
			},
			endtime:function(val){
				if(val!=""){
					this.show1=false
					if(this.time!=""){
						var date1=new Date(this.time)
						var date = new Date(val);
						if(date.getTime()<date1.getTime()||date.getTime()==date1.getTime()){
							
							Toast("终保时间要大于起保时间")
						}
					}
				}
			},
			op:function(val){
				if(val==1){
					this.listItem= [{
					"dutyName":"意外伤害身故残疾",
					"dutyDesc":"150,000元"
				},{
					"dutyName":"公共交通工具意外双倍赔付",
					"dutyDesc":"-------------"
				},{
					"dutyName":"医疗费用",
					"dutyDesc":"50,000元"
				},{
					"dutyName":"医疗运送和送返 ",
					"dutyDesc":"200,000元"
				},{
					"dutyName":"亲属慰问探望",
					"dutyDesc":"5,000元"
				},{
					"dutyName":"身故遗体送返",
					"dutyDesc":"50,000元"
				},{
					"dutyName":"国外丧葬费",
					"dutyDesc":"20,000元"
				},{
					"dutyName":"行李遗失或损坏 ",
					"dutyDesc":"2,000元"
				},{
					"dutyName":"行李延误",
					"dutyDesc":"1,000元"
				},{
					"dutyName":"旅行证件丢失",
					"dutyDesc":"2,000元"
				},{
					"dutyName":"航班延误",
					"dutyDesc":"900元"
				},{
					"dutyName":"旅行缩短",
					"dutyDesc":"3,000元"
				},{
					"dutyName":"旅行取消",
					"dutyDesc":"1,500元"
				},{
					"dutyName":"个人第三者责任",
					"dutyDesc":"50,000元"
				}]
				}else if(val==2){
					this.listItem=[{
					"dutyName":"意外伤害身故残疾",
					"dutyDesc":"350,000元"
				},{
					"dutyName":"公共交通工具意外双倍赔付",
					"dutyDesc":"350,000元"
				},{
					"dutyName":"医疗费用",
					"dutyDesc":"300,000元"
				},{
					"dutyName":"医疗运送和送返 ",
					"dutyDesc":"500,000元"
				},{
					"dutyName":"亲属慰问探望",
					"dutyDesc":"20,000元"
				},{
					"dutyName":"身故遗体送返",
					"dutyDesc":"200,000元"
				},{
					"dutyName":"国外丧葬费",
					"dutyDesc":"20,000元"
				},{
					"dutyName":"行李遗失或损坏 ",
					"dutyDesc":"7,500元"
				},{
					"dutyName":"行李延误",
					"dutyDesc":"2,000元"
				},{
					"dutyName":"旅行证件丢失",
					"dutyDesc":"2,000元"
				},{
					"dutyName":"航班延误",
					"dutyDesc":"3,000元"
				},{
					"dutyName":"旅行缩短",
					"dutyDesc":"8,000元"
				},{
					"dutyName":"旅行取消",
					"dutyDesc":"8,000元"
				},{
					"dutyName":"个人第三者责任",
					"dutyDesc":"1,000,000元"
				}]
				}else if(val==3){
					this.listItem=[{
					"dutyName":"意外伤害身故残疾",
					"dutyDesc":"300,000元"
				},{
					"dutyName":"公共交通工具意外双倍赔付",
					"dutyDesc":"300,000元"
				},{
					"dutyName":"医疗费用",
					"dutyDesc":"300,000元"
				},{
					"dutyName":"医疗运送和送返 ",
					"dutyDesc":"500,000元"
				},{
					"dutyName":"亲属慰问探望",
					"dutyDesc":"10,000元"
				},{
					"dutyName":"身故遗体送返",
					"dutyDesc":"200,000元"
				},{
					"dutyName":"国外丧葬费",
					"dutyDesc":"20,000元"
				},{
					"dutyName":"行李遗失或损坏 ",
					"dutyDesc":"5,000元"
				},{
					"dutyName":"行李延误",
					"dutyDesc":"1,500元"
				},{
					"dutyName":"旅行证件丢失",
					"dutyDesc":"2,000元"
				},{
					"dutyName":"航班延误",
					"dutyDesc":"1,500元"
				},{
					"dutyName":"旅行缩短",
					"dutyDesc":"5,000元"
				},{
					"dutyName":"旅行取消",
					"dutyDesc":"3,000元"
				},{
					"dutyName":"个人第三者责任",
					"dutyDesc":"600,000元"
				}]
				}
				
			}
		}
	}
</script>

<style scoped="scoped">
	html{
		background: #fff;
	}
	.return {
		font-size: .36rem;
		color: #FFC901;
		letter-spacing: 0;
		line-height: .36rem;
		position: absolute;
		top: 1.05rem;
		left: .76rem;
	}
	
	.share_text {
		font-size: .36rem;
		color: #FFC901;
		letter-spacing: 0;
		line-height: .36rem;
		position: absolute;
		top: 1.05rem;
		right: 1.04rem;
	}
	
	.share {
		width: .4rem;
		height: .42rem;
		position: absolute;
		top: .9rem;
		right: .32rem;
	}
	
	.title {
		height: .64rem;
		font-size: .4rem;
		color: #222222;
		letter-spacing: 0;
		line-height: .68rem;
		position: absolute;
		bottom: .1rem;
		left: .28rem;
		font-weight: bold;
	}
	
	.content {
		width: 100%;
		position: relative;
	}
	
	.banner {
		width: 7.46rem;
		height: 4.54rem;
	}
	
	.banner_bottom {
		width: 2.16rem;
		height: .52rem;
		background: url(/static/banner_bottom.png) no-repeat;
		background-size: cover;
		position: absolute;
		top: 3.88rem;
		right: .156rem;
		font-size: .32rem;
		color: #222222;
		letter-spacing: 0;
		text-align: center;
		line-height: .52rem;
	}
	
	.plan {
		margin-left: .4rem;
		margin-top: .1rem;
	}
	
	.form_title {
		font-size: .36rem;
		color: #222222;
		letter-spacing: 0;
		line-height: .44rem;
		font-weight: bold;
	}
	
	.form_title_content {
		position: relative;
		padding-bottom: 1rem;
	}
	
	.list {
		min-height: .88rem;
		line-height: .88rem;
		border-bottom: .001rem solid #C8C7CC;
		position: relative;
	}
	
	.article {
		padding-left: .45rem;
		padding-right: .65rem;
		min-height: 1rem;
		display: none;
		color: #555;
		font-size: .2rem;
		line-height: .45rem;
		text-align: justify;
	}
	
	.name {
		margin-left: .44rem;
		margin-right: 0;
		letter-spacing: .01rem
	}
	
	.money {
		height: .86rem;
		background: #fff;
		position: absolute;
		right: .8rem;
		color: #969696;
	}
	
	.open {
		width: .52rem;
		height: .52rem;
		position: absolute;
		right: .18rem;
		top: .15rem;
	}
	
	.more {
		height: .76rem;
		line-height: .76rem;
		font-size: .32rem;
		color: #222222;
	}
	
	.more span {
		color: red;
	}
	
	.item {
		height: .88rem;
		border-bottom: .001rem solid #C8C7CC;
		position: relative;
	}
	
	.point {
		width: .2rem;
		height: .2rem;
		position: absolute;
		left: .08rem;
		top: .34rem
	}
	
	.item_left {
		font-size: .32rem;
		color: #222222;
		margin-left: .44rem;
		line-height: .88rem;
	}
	
	.item_right {
		font-size: .32rem;
		font-size: 16px;
		color: #555555;
		float: right;
		margin-right: .32rem;
		line-height: .88rem;
	}
	
	.red {
		color: #FF0F01;
	}
	
	.project {
		margin-left: .4rem;
		margin-top: .32rem;
		margin-bottom: .4rem;
	}
	
	.img_bottom {
		width: 7.5rem;
		height: 4.6rem;
	}
	
	.btn {
		width: 100%;
		height: 1rem;
		font-weight: bold;
	}
	
	.btn_left {
		width: 50%;
		height: 1rem;
		float: left;
		background: #FAFAFA;
		font-size: .36rem;
		color: #FF0F01;
		letter-spacing: 0;
		line-height: 1rem;
		text-align: center;
	}
	
	.btn_right {
		width: 50%;
		height: 1rem;
		float: left;
		background: #FFC901;
		color: #222;
		letter-spacing: 0;
		line-height: 1rem;
		text-align: center;
	}
	
	#data {
		opacity: 0;
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .2rem;
		right: 2.22rem;
		z-index: 10;
	}
	
	.data {
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .2rem;
		right: 2.22rem;
	}
	
	.one,
	.two {
		display: inline-block;
		width: 1.26rem;
		height: .44rem;
		background: #FAFAFA;
		border: .02rem solid #000000;
		border-radius: .08rem;
		text-align: center;
		line-height: .44rem;
		position: absolute;
		top: .22rem
	}
	
	.one {
		right: 1.74rem;
	}
	
	.two {
		right: .32rem;
	}
	
	.active {
		background: #FFC901;
	}
	
	.input,
	.input2 {
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .2rem;
		opacity: 0;
		z-index: 10;
	}
	
	.input {
		right: 2rem;
	}
	
	.txt,
	.txt2 {
		font-size: .32rem;
		color: #222222;
		line-height: .88rem;
		position: absolute;
	}
	
	.txt {
		right: 1.6rem;
	}
	
	.txt2 {
		right: .4rem;
	}
	
	.input2 {
		right: .8rem;
	}
	
	.rest {
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .2rem;
		right: .8rem;
	}
	
	.checked {
		width: .48rem;
		height: .48rem;
		position: absolute;
		top: .2rem;
		right: 2rem;
	}
	
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: none;
	}
	
	.detail {
		width: 100%;
		height: 10.84rem;
		background: #fff;
		border-radius: .16rem;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.mask_title {
		width: 100%;
		border-bottom: .001rem solid #eee;
		margin: 0 auto;
		text-align: center;
		height: .88rem;
		line-height: .88rem;
		font-size: .36rem;
		color: #222;
	}
	
	.mask_content {
		height: 7.6rem;
		overflow: hidden;
	}
	
	.mask_button {
		width: 100%;
		border-top: .001rem solid #eee;
		margin: 0 auto;
		text-align: center;
		height: .88rem;
		line-height: .88rem;
		font-size: .36rem;
		color: #222;
		position: absolute;
		bottom: .3rem;
	}
	
	.mask_list {
		padding-left: .3rem;
		height: .8rem;
		line-height: .8rem;
		font-size: .36rem;
		color: #222;
		border-bottom: .001rem solid #EEEEEE;
		position: relative;
	}
	
	.mask_name {
		display: inline-block;
		width: 6.4rem;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.img_mask {
		width: .52rem;
		height: .52rem;
		position: absolute;
		right: .3rem;
		top: .19rem;
	}
	
	.dis {
		display: none;
	}
	.money{
		display: inline-block;
		width: 2rem;
		float: right;
		color: #333;
		background: none;
	}
	.time{
		
		display: inline-block;
		width: 3rem;
		text-align: left;
		height: 100%;
		line-height: .88rem;
		position: absolute;
		right: .4rem;
		color: #999;
		z-index: -1;
	}
	input{
		width: 3rem;
		border: none;
		background: none;
		height: 100%;
		float: right;
		margin-right: .4rem;
	}
	select{
		width: 3rem;
		text-align: left;
		border: none;
		background: none;
		margin-right: .4rem;
		border: none;
		height: 100%;
		float: right;
	}
	.btnBox{
		position: fixed;
		bottom: 0;
		width:100%;
		height: 1.06rem;
		font-size: 0.36rem;
		color: #fff;
		line-height: 1rem;
		text-align: center;
		background:#E7A128;
	}
</style>