<template>
	<div class="income">
		<div class="incomeC">
			<div class="incomeTitle">
				<img src="/static/imgNew/bank_card_bg3.png" class="incomeTitleImg" />
				<span class="incomeNum">￥{{incomeNum}}</span>
				<span class="incomeDes">*此收入为税前收入</span>
			</div>
			<div class="timeBox">
				<div class="timeCon1Box">
					<swiper :options="swiperOption" ref="mySwiper">
						<swiper-slide v-for="(tab, $index) in tabTime" :key="$index">
							<p class="timeCon1"></p>
						</swiper-slide>
					</swiper>
				</div>
				<p class="timeCon clearFloat">
					<span class="oldTiBox oldTiBoxL">
						<span class="oldTi" :class="{line4:lessChangeShow,line3:manyChangeShow}" v-for="oldTime in oldTimeList">{{oldTime}}</span>
					</span>
					<span class="oldTiBox">
						<span class="newTi" :class="{line4:lessChangeShow,line3:manyChangeShow}" v-for="newTime in newTimeList">{{newTime}}</span>
					</span>
					<span class="swipeBg"></span>
				</p>
				<span class="nowTi">
					<span class="monTi">{{nowTime}}</span>
					<span class="yearTi">{{yearTime}}</span>
				</span>
			</div>
			<div class="incomeConBox">
				<div class="incomeCon">
					<p class="incomeConTil">佣金收入</p>
					<p class="pGroup clearFloat" @click="goIncomeDetail(0)">
						<span class="pLable">初年度佣金</span>
						<span class="pNum" :class="{red:(firstYearAmt>0)}"><span v-if="(firstYearAmt>0)">+</span><span v-if="(firstYearAmt<0)">-</span>{{firstYearAmt}}</span>
						<img src="/static/imgNew/income_next3.png" class="nextImg" v-if="(firstYearAmt>0)"/>
						<img src="/static/imgNew/incomeBack3.png" class="nextImg" v-if="(firstYearAmt<=0)"/>
					</p>
					<p class="pGroup clearFloat" @click="goIncomeDetail(1)">
						<span class="pLable">续年度佣金</span>
						<span class="pNum" :class="{red:(lastYearAmt>0)}"><span v-if="(lastYearAmt>0)">+</span><span v-if="(lastYearAmt<0)">-</span>{{lastYearAmt}}</span>
						<img src="/static/imgNew/income_next3.png" class="nextImg" v-if="(lastYearAmt>0)" />
						<img src="/static/imgNew/incomeBack3.png" class="nextImg" v-if="(lastYearAmt<=0)"/>
					</p>
				</div>
				<div class="incomeCon">
					<p class="incomeConTil">基本法利益</p>
					<p class="pGroup clearFloat" @click="goIncomeDetail(2)">
						<span class="pLable">个人展业津贴</span>
						<span class="pNum" :class="{red:(developAllowance>0)}"><span v-if="(developAllowance>0)">+</span><span v-if="(developAllowance<0)">-</span>{{developAllowance}}</span>
						<img src="/static/imgNew/income_next3.png" class="nextImg" v-if="(developAllowance>0)"/>
						<img src="/static/imgNew/incomeBack3.png" class="nextImg" v-if="(developAllowance<=0)"/>
					</p>
					<p class="pGroup1 marTop clearFloat">
						<span class="pLable">终身增员津贴</span>
						<span class="pNum" :class="{red:(increasePrize>0)}"><span v-if="(increasePrize>0)">+</span><span v-if="(increasePrize<0)">-</span>{{increasePrize}}</span>
					</p>
					<p class="pGroup1 clearFloat">
						<span class="pLable">经理/总监管理津贴</span>
						<span class="pNum" :class="{red:(managementAllowance>0)}"><span v-if="(managementAllowance>0)">+</span><span v-if="(managementAllowance<0)">-</span>{{managementAllowance}}</span>
					</p>
					<p class="pGroup1 clearFloat">
						<span class="pLable">经理育成津贴</span>
						<span class="pNum" :class="{red:(managerIncubationAmt>0)}"><span v-if="(managerIncubationAmt>0)">+</span><span v-if="(managerIncubationAmt<0)">-</span>{{managerIncubationAmt}}</span>
					</p>
					<p class="pGroup1 clearFloat">
						<span class="pLable">总监育成津贴</span>
						<span class="pNum" :class="{red:(chiefIncubationAmt>0)}"><span v-if="(chiefIncubationAmt>0)">+</span><span v-if="(chiefIncubationAmt<0)">-</span>{{chiefIncubationAmt}}</span>
					</p>
				</div>
				<!--<div class="incomeCon">
					<p class="incomeConTil">其他项</p>
					<p class="pGroup1 marTop1 clearFloat">
						<span class="pLable">加款项</span>
						<span class="pNum" :class="{red:(additionalMoney>0)}"><span v-if="(additionalMoney>0)">+</span><span v-if="(additionalMoney<0)">-</span>{{additionalMoney}}</span>
					</p>
					<p class="pGroup1 clearFloat">
						<span class="pLable">扣款项</span>
						<span class="pNum" :class="{red:(withdRawing>0)}"><span v-if="(withdRawing>0)">+</span><span v-if="(withdRawing<0)">-</span>{{withdRawing}}</span>
					</p>
				</div>-->
			</div>
		</div>
	</div>
</template>

<script>
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { Toast } from 'mint-ui';
	export default {
		name: 'income',
		data() {
			let self = this;
			return {
				incomeNum: "0.00",
				firstYearAmt:"0.00",
				lastYearAmt:"0.00",
				developAllowance:"0.00",
				increasePrize:"0.00",
				managementAllowance:"0.00",
				managerIncubationAmt:"0.00",
				chiefIncubationAmt:"0.00",
				additionalMoney:"0.00",
				withdRawing:"0.00",
				adImgUrls: [],
				positiveShow: true,
				swiperOption: {
					notNextTick: true,
					autoplay: 500,
					loop : true,
					cancelable:true,
					speed: 50,
					direction: 'horizontal',
					grabCursor: true,
					setWrapperSize: true,
					autoHeight: true,
					pagination: '.swiper-pagination',
					paginationClickable: true,
					prevButton: '.swiper-button-prev', //上一张
					nextButton: '.swiper-button-next', //下一张
					scrollbar: '.swiper-scrollbar', //滚动条
					mousewheelControl: true,
					observeParents: true,
					debugger: true,
					noSwipingClass: 'ruler-container',
					on: {
						slideChangeTransitionEnd: function() {
							self.changePages(this.activeIndex);
						},
					},
				},
				tabTime: [1, 2, 3, 4, 5, 6,7,8,9,10,11,12],
				oDate: '',
				nowTime: '',
				oldTimeList: [],
				newTimeList: [],
				minusTime: '',
				plusTime: '',
				yearTime: '',
				nowIndex: '',
				stopLeftYear: '2018',
				stopLeftMonth: '3',
				stopRightYear: '',
				stopRightMonth: '',
				lessChangeShow: false,
				manyChangeShow: false,
				incomeObject:"",
				queryDate:""
			}
		},
		created() {
			this.nowIndex = 1;
			this.oDate = new Date();
			if (localStorage.queryDate) {
				this.yearTime = localStorage.queryDate.split("-")[0];
				this.nowTime = localStorage.queryDate.split("-")[1];
				if (this.nowTime < 10) {
					this.nowTime = this.nowTime.split("0")[1]
				}else{
					this.nowTime = this.nowTime
				}
			}else{
				this.yearTime = this.oDate.getFullYear();
				this.nowTime = this.oDate.getMonth()+1;
			}
			this.stopRightYear = this.oDate.getFullYear();
			this.stopRightMonth = this.oDate.getMonth()+1;
			this.timeGet();
		},
		components: {
			swiper,
			swiperSlide,
		},
		methods: {
			timeGet(){
				this.newTimeList=[];
				this.oldTimeList=[];
				this.nowTime = parseInt(this.nowTime);
				for(let i = 1; i < 7; i++) {
					this.minusTime = this.nowTime - i;
					this.plusTime = this.nowTime + i
					if(this.nowTime + i >= 13) {
						this.plusTime = this.plusTime - 12;
						this.newTimeList.push(this.plusTime);
					} else {
						this.newTimeList.push(this.plusTime);
					}
	
					if(this.nowTime - i <= 0) {
						this.minusTime = this.minusTime + 12;
						this.oldTimeList.push(this.minusTime);
					} else {
						this.oldTimeList.push(this.minusTime);
					}
				}
				this.oldTimeList.reverse();
				this.init();
			},
			init() {
				this.queryDate = "";
				if (this.nowTime < 10) {
					this.queryDate = this.yearTime +"-0"+ this.nowTime
				}else{
					this.queryDate = this.yearTime +"-"+ this.nowTime
				}
				var Shudata = {
//				  	"brokerId": "2063",
				  	"brokerId": this.$store.state.brokerInfo.brokerId,
				  	"reportDate": this.queryDate
				}
//				console.log(Shudata)
				this.$http.post(this.$store.state.link + '/core/comm/findMyInCome', Shudata)
					.then(res => {
//						console.log(res.data);
						var dataCode = res.data.code;
						if(dataCode == "SYS_S_000") {
							this.incomeObject = res.data.output;
							this.incomeNum = res.data.output.commAmt;
							this.firstYearAmt = res.data.output.firstYearAmt;
							this.lastYearAmt = res.data.output.lastYearAmt;
							this.developAllowance = res.data.output.developAllowance;
							this.increasePrize = res.data.output.increasePrize;
							this.managementAllowance = res.data.output.managementAllowance;
							this.managerIncubationAmt = res.data.output.managerIncubationAmt;
							this.chiefIncubationAmt = res.data.output.chiefIncubationAmt;
						} else {
							Toast(res.data.desc);
							console.log(res.data.desc)
						}
					}, data => {
						console.log(data.data);
					})
			},
			goIncomeDetail(a) {
				var that = this;
				setTimeout(() => {
					window.localStorage.queryDate = that.queryDate;
					that.$router.push('/incomeDetail?queryDate='+ that.queryDate + '&a='+a)
				}, 100)
			},
			changePages(index) {
				if (index < this.nowIndex || (index > this.nowIndex && Math.abs(index-this.nowIndex)>2)) {
					if (this.nowTime != this.stopLeftMonth || this.yearTime != this.stopLeftYear) {
						this.nowTime = this.nowTime-1;
						if(this.nowTime <= 0) {
							this.nowTime = 12;
							this.yearTime = this.yearTime-1;
						}
						this.timeGet();
						this.lessChangeShow = true;
					}else{
						Toast("前方是数据荒原，无法在滑动啦！")
					}
				}
				else if (this.nowIndex < index || (index < this.nowIndex && Math.abs(index-this.nowIndex)>2)) {
					var i=i++
					this.tabTime.push(i)
					if (this.nowTime != this.stopRightMonth || this.yearTime != this.stopRightYear) {
						this.nowTime = this.nowTime+1;
						if(this.nowTime >= 13) {
							this.nowTime = 1;
							this.yearTime = this.yearTime+1;
						}
						this.timeGet();
						this.manyChangeShow = true;
					}else{
						Toast("前方是数据荒原，无法在滑动啦！")
					}
				}
				this.nowIndex = index;
				var self = this;
				setTimeout(()=>{
					self.lessChangeShow = false;
					self.manyChangeShow = false;
				},300)
			},
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
	.incomeC {
		padding-bottom: 0.64rem;
	}
	.incomeTitle {
		position: relative;
		width: 7.2rem;
		height: 4.24rem;
		margin: 0 auto;
		padding-top: 0.12rem;
	}
	.incomeTitleImg {
		width: 7.2rem;
		height: 4.24rem;
	}
	.incomeNum {
		position: absolute;
		top: 1.52rem;
		left: 0.4rem;
		display: block;
		width: 6.4rem;
		height: 0.96rem;
		line-height: 0.96rem;
		font-size: 0.84rem;
		color: #FFFFFF;
		text-align: center;
	}
	.incomeDes {
		position: absolute;
		bottom: 0.84rem;
		left: 0.4rem;
		display: block;
		width: 6.4rem;
		height: 0.24rem;
		font-size: 0.24rem;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
	}
	.incomeCon {
		width: 7.18rem;
		padding-top: 0.38rem;
		padding-left: 0.32rem;
	}
	.incomeConBox .incomeCon:first-child {
		margin-top: -0.6rem;
	}
	.incomeConTil {
		height: 0.36rem;
		line-height: 0.36rem;
		padding-bottom: 0.16rem;
		font-size: 0.3rem;
		font-weight: bold;
		color: #222222;
		border-bottom: solid 0.01rem #CCCCCC;
	}
	.pGroup {
		position: relative;
		height: 0.8rem;
		line-height: 0.84rem;
		margin-top: 0.16rem;
		background: #FFFFFF;
		box-shadow: 0 0.04rem 0.16rem 0 rgba(0, 0, 0, 0.10);
		border-radius: 0.16rem 0 0 0.16rem;
	}
	.pGroup:active {
		box-shadow: none;
	}
	.pLable {
		display: block;
		float: left;
		margin-left: 0.24rem;
		font-size: 0.28rem;
		color: #222222;
	}
	.pNum {
		display: block;
		float: right;
		margin-right: 0.58rem;
		font-size: 0.26rem;
		color: #222222;
	}
	.nextImg {
		position: absolute;
		top: 0.28rem;
		right: 0.318rem;
		width: 0.142rem;
		height: 0.24rem;
	}
	.red {
		color: #FF2D55;
	}
	.pGroup1 {
		position: relative;
		height: 0.64rem;
		line-height: 0.64rem;
	}
	.marTop {
		margin-top: 0.16rem;
	}
	.marTop1 {
		margin-top: 0.08rem;
	}
	.timeBox {
		position: relative;
		width: 100%;
		height: 1.5rem;
	}
	.timeCon {
		position: relative;
		width: 100%;
		height: 0.88rem;
		line-height: 0.88rem;
	}
	.timeCon1Box {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 4;
		width: 100%;
		height: 0.88rem;
	}
	.timeCon1 {
		width: 100%;
		height: 0.88rem;
		background: none;
	}
	.oldTiBox {		
		display: flex;
		float: left;
		width: 3.25rem;
	}
	.oldTiBoxL {
		margin-right: 1rem;
	}
	.oldTi,.newTi {
		flex: 1;
		font-size: 0.3rem;
		text-align: center;
		font-weight: 500;
	}
	.oldTiBox .oldTi:first-child,.oldTiBox .newTi:last-child {
		opacity: 0.1;
	}
	.oldTiBox .oldTi:nth-child(2),.oldTiBox .newTi:nth-child(5) {
		opacity: 0.3;
	}
	.oldTiBox .oldTi:nth-child(3),.oldTiBox .newTi:nth-child(4) {
		opacity: 0.5;
	}
	.oldTiBox .oldTi:nth-child(4),.oldTiBox .newTi:nth-child(3) {
		opacity: 0.7;
	}
	.oldTiBox .oldTi:nth-child(5),.oldTiBox .newTi:nth-child(2) {
		opacity: 0.9;
	}
	.nowTi {
		position: absolute;
		top: -0.08rem;
		left: 3.25rem;
		z-index: 3;
		width: 1rem;
		height: 1rem;
		background: #FFFFFF;
		box-shadow: 0 0.04rem 0.16rem rgba(0,0,0,0.10);
		border-radius: 0.16rem;
		text-align: center;
		color: #222222;
	}
	.monTi {
		display: block;
		padding-top: 0.16rem;
		line-height: 0.5rem;
		font-size: 0.4rem;
		font-weight: 500;
	}
	.yearTi {
		display: block;
		margin-top: 0.04rem;
		line-height: 0.2rem;
		font-size: 0.16rem;
	}
	.swipeBg {
		position: absolute;
		bottom: 0.2rem;
		left: 0;
		z-index: 2;
		width: 100%;
		height: 0.02rem;
		background: linear-gradient(-90deg, #FFFFFF 0%, #cccccc 50%, #FFFFFF 100%);
	}
	.line3 {
		z-index: 2;
		-webkit-animation: line3 0.3s 1 ease-in-out;
		animation: line3 0.3s 1 ease-in-out;
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
	}
	@-webkit-keyframes line3 {
		0% {
			transform: translate(0.5rem, 0);
			-webkit-transform: translate(0.5rem, 0);
		}
		100% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
		}
	}
	@keyframes line3 {
		0% {
			transform: translate(0.5rem, 0);
			-webkit-transform: translate(0.5rem, 0);
		}
		100% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
		}
	}
	.line4 {
		z-index: 2;
		-webkit-animation: line4 0.3s 1 ease-in-out;
		animation: line4 0.3s 1 ease-in-out;
		-webkit-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
	}
	@-webkit-keyframes line4 {
		0% {
			transform: translate(-0.5rem, 0);
			-webkit-transform: translate(-0.5rem, 0);
		}
		100% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
		}
	}
	@keyframes line4 {
		0% {
			transform: translate(-0.5rem, 0);
			-webkit-transform: translate(-0.5rem, 0);
		}
		100% {
			transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
		}
	}
</style>