<template>
	<div class="income">
		<p class="timeS clearFloat">
			<span class="timeSD">{{queryDate}}</span>
			<span class="lineBg"></span>
		</p>
		<div class="incomeDetail" v-for="detail in detailModular" v-show="!emptyShow">
			<p class="incomeDeT">{{detail.riskName}}</p>
			<p class="spanGroup spanGroupFirst clearFloat">
				<span class="spanBg"></span>
				<span class="spanCon">保 单 号 ：{{detail.policyCode}}</span>
			</p>
			<p class="spanGroup clearFloat">
				<span class="spanBg"></span>
				<span class="spanCon">投 保 人 ：{{detail.orderPerson}}</span>
			</p>
			<p class="spanGroup clearFloat">
				<span class="spanBg"></span>
				<span class="spanCon">年缴保费：{{detail.firstPrem}}元</span>
			</p>
			<p class="spanGroup clearFloat">
				<span class="spanBg"></span>
				<span class="spanCon">标准保费：{{detail.stdPrem}}元</span>
			</p>
			<p class="spanGroup clearFloat">
				<span class="spanBg"></span>
				<span class="spanCon">缴费年期：{{detail.chargePeriodValue}}年</span>
			</p>
			<p class="spanGroup clearFloat">
				<span class="spanBg"></span>
				<span class="spanCon">保单年度：{{detail.payYear}}年</span>
			</p>
			<p class="spanGroup1 clearFloat">
				<span class="spanCon">{{aName}}收入：{{detail.inCome}}元</span>
			</p>
		</div>
		<div v-show="emptyShow">
			<img src="/static/imgNew/Group3.png" class="emptyImg" />
			<p class="emptyText">还没有收入哦~快快快快去签单吧</p>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
	  	name: 'incomeDetail',
	  	data(){
	  		return {
			    queryDate:this.$route.query.queryDate,
			    a:this.$route.query.a,
			    firstYearInComeInfo:[],
			    lastYearInComeInfo:[],
			    devInComeInfo:[],
			    detailModular:[],
			    emptyShow:false,
			    aName:"初年度佣金"
	  		}
	  	},
	  	created(){
	  		this.queryDate = this.$route.query.queryDate;
	  		this.init();
	  	},
	  	methods:{
	  		init() {
				var Shudata = {
//				  	"brokerId": "2063",
				  	"brokerId": this.$store.state.brokerInfo.brokerId,
				  	"reportDate": this.queryDate
				}
				console.log(Shudata)
				this.$http.post(this.$store.state.link + '/core/comm/findMyInCome', Shudata)
					.then(res => {
//						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.incomeObject = res.data.output;
							this.firstYearInComeInfo = res.data.output.firstYearInComeInfo;
							this.lastYearInComeInfo = res.data.output.lastYearInComeInfo;
							this.devInComeInfo = res.data.output.devInComeInfo;
							if (this.a == 0) {
								this.detailModular = this.firstYearInComeInfo;
								this.aName = "初年度佣金";
							}
							else if (this.a == 1) {
								this.detailModular = this.lastYearInComeInfo;
								this.aName = "续年度佣金";
							}
							else if (this.a == 2) {
								this.detailModular = this.devInComeInfo;
								this.aName = "个人展业津贴";
							}
							if (this.detailModular.length > 0) {
								this.emptyShow = false;
							}else{
								this.emptyShow = true;
							}
						} else {
							Toast(res.data.desc);
							console.log(res.data.desc);
						}
					}, data => {
						console.log(data.data);
					})
			}
		},
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
	.income {
		position: absolute;
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
	}
	.incomeDetail {
		width: 6.58rem;
		height: 6.26rem;
		margin: 0 auto;
		margin-top: 0.16rem;
		background: url(/static/imgNew/Shape3.png) no-repeat;
		background-size: cover;
	}
	.incomeDeT {
		width: 5.94rem;
		height: 0.8rem;
		margin: 0 auto;
		line-height: 0.8rem;
		padding-left: 0.32rem;
		padding-top: 0.2rem;
		font-size: 0.28rem;
		font-weight: bold;
		color: #222222;		
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.spanGroup {
		width: 5.94rem;
		height: 0.56rem;
		margin: 0 auto;
		line-height: 0.56rem;
		padding-left: 0.32rem;
		font-size: 0.24rem;
		color: #222222;
	}
	.spanBg {
		display: block;
		float: left;
		width: 0.1rem;
		height: 0.1rem;
		line-height: 0;
		margin-top: 0.2rem;
		font-size: 0;
		background: linear-gradient(135deg, #FFBA80 0%, #FF4F87 100%);
		/*background: #FF4F87;*/
	}
	.spanCon {
		display: block;
		float: left;
		margin-left: 0.1rem;
	}
	.spanGroupFirst {
		margin-top: -0.1rem;
	}
	.spanGroup1 {
		width: 5.94rem;
		height: 0.28rem;
		margin: 0 auto;
		padding-left: 0.32rem;
		margin-top: 0.88rem;
		font-size: 0.28rem;
		font-weight: bold;
		color: #222222;
	}
	.timeS {
		height: 0.32rem;
		padding-left: 0.64rem;
		padding-top: 0.32rem;
		font-size: 0.32rem;
		color: #CCCCCC;
	}
	.timeSD {
		display: block;
		float: left;
		width: 1.36rem;
	}
	.lineBg {
		display: block;
		float: left;
		width: 5.5rem;
		height: 0.02rem;
		margin-top: 0.15rem;
		background: linear-gradient(90deg, #ffffff 0%, #eeeeee 100%);
	}
	.emptyImg {
		display: block;
		width: 4.16rem;
		/*height: 4.18rem;*/
		margin: 0 auto;
		margin-top: 0.8rem;
		margin-bottom: 0.16rem;
	}
	.emptyText {
		width: 100%;
		font-size: 0.3rem;
		color: #CCCCCC;
		text-align: center;
	}
</style>