<template>
	<div class="one">
			<div class="Group">
				<div class="twoCon">
					<p  class="title_twoCon clearFloat">
							<label class="titleLable_twoCon left">基本信息</label>
					</p>
					<p class="inputGrop1">
							<label class="inputLabel3" style="line-height: .88rem;">身高（cm）</label>
							<input type="text" class="inputText"   placeholder="请输入身高"  v-model="height"/>
					</p>
					<p class="inputGrop1">
							<label class="inputLabel3 left" style="line-height: .88rem;">体重(kg)</label>
							<input type="text" class="inputText left"   placeholder="请输入体重" v-model="weight"/>
					</p>
				</div>
				<div class="twoCon">
					<p  class="title_twoCon clearFloat">
							<label class="titleLable_twoCon left">健康情况</label>
					</p>
					<p class="inputGrop clearFloat" v-for="(item,index) in tabs" yn="0" ref="father" :code="item.quesNo">
						<label class="inputLabel" :value="item.quesCont">{{item.quesCont}}</label>
						<span class="inputText inputSpan">
                            <!--<span v-for="(list,index) in lists" :class="{deny:index === ind}" :key="index" @click="hand(index)">{{list}}</span>-->
							<span class="dent" @click="insurance_yes($event)">是</span>
							<span class="dent deny" @click="insurance_no($event)">否</span>
						</span>
					</p>
                   
				</div>
				<div  class="btnBox clearFloat" >
					<div class="boxLast" @click="lastClick">上一步</div>
					<div class="boxNext" @click="nextClick">下一步</div>
				</div>
				
			</div>	
			
		
	</div>
</template>

<script>
	import { Toast, Indicator } from 'mint-ui';
	export default{
		data(){
			return{	
                tabs:"",
                weight:"",
                height:"",
                backview:"",
                flag:false,
                one:false
			}
		},
		created(){
			if(this.$route.query.one!=undefined){
				this.one=true
			}
			this.getList()
			this.getData()
		},
		updated(){
				this.backView()
			},
		methods:{
			getData(){
				var data = {
					"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode

					},
					"opt": "INSNOT",
					"pkgNo": this.$route.query.orderNo, //订单号
				}
				this.$http.post(this.$store.state.link5 + '/trd/order/v1/queryorder', data)
					.then(res => {
						if(res.data.code == "SYS_S_000") {
							console.log("11=="+JSON.stringify(res.data.output.insNotResp))
							if(res.data.output.insNotResp.length!=0){
								this.backview=res.data.output.insNotResp
								this.flag=true
							}

						} else {
//							Toast(res.data.desc)
						}

					}, res => {
						console.log(res.data);
					})
			},
			getList(){
				var data = {
				"prodCode": this.$route.query.prodCode
			}
			console.log(data)
			this.$http.post(this.$store.state.link5 + '/prd/prod/heallist', data)
				.then(res => {
					console.log(res)
					if(res.data.code == "SYS_S_000") {
						this.tabs = res.data.output;
						console.log(this.tabs)
					} else {
						Toast(res.data.desc)						
					}
				}, data => {
					console.log(data.data);
				})
			},
			backView(){
				if(this.flag){
					var item=this.$refs.father;
					console.log(this.backview)
					for(var i=0,j=this.backview.length;i<j;i++){
						if(this.backview[i].optNo=='Y'){
							item[i].setAttribute('yn','1')
							item[i].getElementsByClassName('dent')[0].setAttribute('class','dent deny')
							item[i].getElementsByClassName('dent')[1].setAttribute('class','dent')
						}else{
							item[i].setAttribute('yn','0')
							item[i].getElementsByClassName('dent')[1].setAttribute('class','dent deny')
							item[i].getElementsByClassName('dent')[0].setAttribute('class','dent')
						}
					}	
				}
				
			},
			insurance_yes(e, index) {
				e.currentTarget.setAttribute('class', 'dent deny')
				e.currentTarget.nextElementSibling.setAttribute('class', 'dent')
//				this.$refs.dis[index].style.display = "block"
				e.currentTarget.parentNode.parentNode.setAttribute('yn', '1')

			},
			insurance_no(e, index) {
				e.currentTarget.setAttribute('class', 'dent deny')
				e.currentTarget.previousElementSibling.setAttribute('class', 'dent')
//				this.$refs.dis[index].style.display = "none"
				e.currentTarget.parentNode.parentNode.setAttribute('yn', '0')
			},
			lastClick() {
				this.$router.push('/ben');
			},
       		nextClick() {
//     			if(this.one){
//     				this.tou()
//     			}else{
//     				this.bei()
//     			}
				this.bei()
			},
			bei(){
				var item=this.$refs.father,mery = [];
				
       			for(var i=0,j=item.length;i<j;i++){
       				
	       			if(item[i].getAttribute('yn')==0){
	       				var data={
							"noticeSubject": "1",
							"optNo": "N",
							"quesNo": item[i].getAttribute('code'),
							"REMARK":this.tabs[i].quesCont
	       				}
	       			}else{
	       				var data={
							"noticeSubject": "1",
							"optNo": "Y",
							"quesNo": item[i].getAttribute('code'),
							"REMARK":this.tabs[i].quesCont
	       				}
	       			}
	       			mery.push(data)
	       		}
       			console.log(mery)
       			var data={
       				"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode
					},
					"mark": "UC",
					"noticeReq": mery,
					"opt": "INSNOT",
					"pkgNo": this.$route.query.orderNo,
       			}
       			console.log("bei=="+JSON.stringify(data))
//     			http://192.168.171.12:9009/order/v1/saveorder
       			this.$http.post(this.$store.state.link5+'/trd/order/v1/saveorder', data).then(response => {
						Indicator.close();
						console.log(response.data);
						if(response.data.code == "SYS_S_000") {
							this.$router.push('/accInformation?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&prodNo=" + this.$route.query.prodNo )

						} else {
							Toast(response.data.desc)
							console.log(response.data.desc)
						}
					}, response => {
						Indicator.close();
						console.log("ajax error");
					});
//				this.$router.push('/healthTold');
			},
			tou(){
				var item=this.$refs.father,mery = [];
       			for(var i=0,j=item.length;i<j;i++){
	       			if(item[i].getAttribute('yn')==0){
	       				var data={
							"noticeSubject": "0",
							"optNo": "N",
							"quesNo": item[i].getAttribute('code')
	       				}
	       			}else{
	       				var data={
							"noticeSubject": "0",
							"optNo": "Y",
							"quesNo": item[i].getAttribute('code')
	       				}
	       			}
	       			mery.push(data)
	       		}
       			console.log(mery)
       			var data={
       				"token": this.$store.state.token,
					"userId": this.$store.state.userId,
					"head": {
						"channelCode": "qtb_h5",
						"deptCode": this.$route.query.cmpCode,
						"oprCode": this.$store.state.userId,
						"prodCode": this.$route.query.prodCode
					},
					"mark": "UC",
					"noticeReq": mery,
					"opt": "APPLNOT",
					"pkgNo": this.$route.query.orderNo,
       			}
       			console.log("tou==="+JSON.stringify(data))
//     			http://192.168.171.12:9009/order/v1/saveorder
       			this.$http.post(this.$store.state.link5+'/trd/order/v1/saveorder', data).then(response => {
						Indicator.close();
						console.log(response.data);
						if(response.data.code == "SYS_S_000") {
//							this.$router.push('/insuranceadvice?prodCode=' + this.$route.query.prodCode + "&orderNo=" + this.$route.query.orderNo + "&cmpCode=" + this.$route.query.cmpCode + "&userId=" + this.$route.query.userId + "&prodNo=" + this.$route.query.prodNo + "&token=" + this.$route.query.token)
							this.bei()
						} else {
							Toast(response.data.desc)
						}
					}, response => {
						Indicator.close();
						console.log("ajax error");
					});
//				this.$router.push('/healthTold');
			}
		},
		watch:{
			backview:function(val){
				this.backView()
			}
		}
	}
</script>

<style scoped="scoped">
	.left {
		float: left;
	}
	
	.right {
		float: right;
	}
	
	input,
	button {
		background: none;
		border: none;
	}
	
	input,
	button {
		outline: none;
	}
	
	input {
		font-weight: 100;
	}
	
	input::-ms-clear {
		display: none;
		width: 0;
		height: 0;
	}
	
	input::-ms-reveal {
		display: none;
	}
	
	textarea::-webkit-input-placeholder,
	input::-webkit-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
	}
	
	input:-ms-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
	}
	.inputWidth {
		width: 4.4rem;
	}
	.one {
		width: 100%;
		/*height:100%;*/	
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
		top:0;
		left: 0;
	}
	.twoCon {
		margin-bottom: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
		overflow: scroll;
		overflow-y: auto;
		border-radius:0.16rem ;
		-webkit-overflow-scrolling: touch;
	}
	.twoCon1 {
		/*margin-bottom: 0.4rem;*/
		padding: 0 0.4rem;
		/*font-size: 0.32rem;*/
		font-size:lighter;
		color: #222222;
		background: #F3F3F3;
		overflow: scroll;
		overflow-y: auto;
		border-radius:0.16rem ;
		-webkit-overflow-scrolling: touch;
	}
	.Group{
		width:6.44rem;
		border-radius: 0.16rem;
		margin:0.44rem 0.52rem 0.48rem;
	}
	.title_twoCon {
		height: 1.11rem;
		line-height: 1.11rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	}
	.title_twoCon1 {
		height: 1.11rem;
		line-height: 1.11rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.titleLable_twoCon {
		display: inline-block;
		font-size: 0.34rem;
		font-weight: bold;
		color: #222222;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.inputGrop {
		position: relative;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputGrop1 {
		font-size: 0.28rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
        display: flex;
        justify-content: space-between;
	}
	.inputGrop2{
		height:1rem;
	}
	.inputLabel {
		display: block;
		color: #555555;
	}
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		padding-left: 0;
	}
	.inputText1 {
		width:0.58rem;
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		padding-left: 0;
	}
	.start {
		display: block;
		height: 0.88rem;
		line-height: 0.88rem;
		color: red;
	}
	.sexImg {
		display: inline-block;
		float: left;
		margin-top: 0.2rem;
		width: 0.48rem;
		height: 0.48rem;
		margin-right: 0.06rem;
	}
	.sex label {
		display: inline-block;
		float: left;
	}
	.inputSpan {
		margin-left: 1rem;
		line-height: 0.88rem;
		color: #555555;
	}
	.inputSpan14 {
		margin-left: 1.5rem;
		line-height: 0.88rem;
		color: #555555;
		font-weight: bold;
	}
	.inputLabel {
		display: block;
		/*width: 2.04rem;*/
		line-height: 0.55rem;
		font-weight: bold;
		color: #555555;
		padding-left: 0;
	}
	.sex label {
		display: inline-block;
		float: left;
	}
	.conText{
		line-height:0.45rem;
		font-size: 0.28rem;
	}

	.btnBox {
		width:100%;
		background:#F3F3F3;
		display: flex;
		justify-content: space-around;
	}
	.boxLast {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color:#c9141e;
		letter-spacing: 0;
		border:0.01rem solid #c9141e;
		border-radius: .44rem;
		float: left;
		margin-right: 0.3rem;
	}
	
	.boxNext {
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		text-align: center;
		font-size: 0.32rem;
		color:  #fff;
		background: #c9141e;
		letter-spacing: 0;
		border:0.01rem solid #c9141e;
		border-radius: .44rem;
		float: right;
	}

    .dent{
        color: #54CCC1;
        border: 0.01rem solid #54CCC1;
        padding: 0.1rem 0.24rem;
        border-radius: 0.2rem;
        margin-left: 0.28rem;
    }
    .deny{
        color: #ffffff;
        background: #54CCC1;
        padding: 0.1rem 0.24rem;
        border-radius: 0.2rem;
    }
    .margin_top{
        margin-top: 3rem;
    }
</style>