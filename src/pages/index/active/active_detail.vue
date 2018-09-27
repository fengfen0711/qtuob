<template>
    <div id="headed">
         
        <ul class="tab">
            <li>
                <div class="body_bottom" @click="jump(0)" :class="{'active_color': index==0}">至尊计划</div>
            </li>
            <li>
                <div class="body_bottom" @click="jump(1)" :class="{'active_color': index==1}">豪华计划</div>
            </li>
            <li>
                <div class="body_bottom" @click="jump(2)" :class="{'active_color': index==2}">超值计划</div>
            </li>
        </ul>
		<div class="article">
			<p class="title">
				意外身故、伤残
				<span>{{money1}}万元</span>
			</p>
			<p class="center">
				被保险人遭受意外伤害，并自该意外伤害发生之 日起180日内因该意外伤害导致身故的，按约定 的保险金额扣除已给付伤残保险金后的余额给付 身故保险金;自该意外伤害发生之日起180日内 因该意外伤害导致身体残疾的，根据《人身保险 伤残评定标准(行业标准)》的规定，按比例给付 伤残保险金。最高不超过保单载明的金额。
			</p>
			
		</div>
		<div class="article">
			<p class="title">
				 意外医疗 
				<span>{{money2}}</span>
			</p>
			<p class="center">
被保险人在保险期间内，如发生意外事故，在二 级以上(含二级)公立医院治疗，对被保险人所 支出的符合当地社会基本医疗保险支付范围的医 疗费用，保险公司按免赔额100元，100%比例给 付保险金。
			</p>
			
		</div>
		<div class="article">
			<p class="title">
				意外住院津贴
				<span>{{money3}}</span>
			</p>
			<p class="center">
				被保险人在保险期间内，如发生意外事故住院， 在二级以上(含二级)公立医院或保险公司指定 或认可的医疗机构住院治疗，保险公司按实际住 院天数，按超值计划每

日0元，豪华计划保额每 日50元、至尊计划每日100元给付意外住院津贴 保险金: (1)单次住院给付天数不超过90天，累 计给付不超过180日; (2)须在二级以上(含二 级)公立医院治疗; (3)

如保险到期后仍需住 院，给付保险金期限自动延长，累计给付不超过 180日。
			</p>
			
		</div>
		<div class="article">
			<p class="title">
				航空意外伤害
				<span>{{money4}}万元</span>
			</p>
			<p class="center">
				被保险人以乘客身份乘坐合法商业运营的客运飞 机，并遵守承运人关于安全乘坐的规定，自持有 效机票检票并进入所乘客运飞机客舱时起至抵达 机票载明的终点离

开所乘客运飞机客舱的期间内 遭受意外伤害，自该意外伤害发生日起180日内 导致身故的，按约定的保险金额扣除已给付伤残 保险金后的余额给付身故保险金;因该意外伤害 导致身体残疾

的，根据《人身保险伤残评定标 准》的规定，按比例给付伤残保险金。最高不超 过保单载明的金额</p>
			
		</div>
		<div class="article">
			<p class="title">
				火车意外伤害
				<span>{{money5}}万元</span>
			</p>
			<p class="center">
				被保险人以乘客身份乘坐合法商业运营的客运火 车，并遵守承运人关于安全乘坐的规定，自持有 效车票检票并进入所乘客运火车车厢时起至抵达 车票载明的终点离开

所乘客运火车车厢的期间内 遭受意外伤害，自该意外伤害发生日起180日内 导致身故的，按约定的保险金额扣除已给付伤残 保险金后的余额给付身故保险金;因该意外伤害 导致身体残疾的

，根据《人身保险伤残评定标 准》的规定，按比例给付伤残保险金。最高不超 过保单载明的金额。</p>
		</div>
		<div class="article">
			<p class="title">
				 轮船意外伤害
				<span>{{money6}}万元</span>
			</p>
			<p class="center">
				被保险人以乘客身份乘坐合法商业运营的客运轮 船，并遵守承运人关于安全乘坐的规定，自持有 效船票检票并登上所乘客运轮船甲板时起至抵达 船票载明的终点离

开所乘客运轮船甲板的期间内 遭受意外伤害，自该意外伤害发生日起180日内 导致身故的，按约定的保险金额扣除已给付伤残 保险金后的余额给付身故保险金;因该意外伤害 导致身体残疾

的，根据《人身保险伤残评定标 准》的规定，按比例给付伤残保险金。最高不超 过保单载明的金额。 </p>
		</div>
		<div class="article">
			<p class="title">
				公共交通乘坐意外伤害
				<span>{{money7}}万元</span>
			</p>
			<p class="center">
				被保险人以乘客身份乘坐合法商业运营的客运汽 车，并遵守承运人关于安全乘坐的规定，自进入 所乘汽车车厢时起至离开所乘汽车车厢的期间内 遭受意外伤

害，自该意外伤害发生日起180日内 导致身故的，按约定的保险金额扣除已给付伤残 保险金后的余额给付身故保险金;因该意外伤害 导致身体残疾的，根据《人身保险伤残评定标 准》的规

定，按比例给付伤残保险金。最高不超 过保单载明的金额。</p>
		</div>
    </div>
</template>
 
<script>
    export default{
        data(){
            return {
                index: 0, // 选中了第几个选项卡
               money1:"50",
               money2:"5万元",
               money3:"18000",
               money4:"200",
               money5:"50",
               money6:"50",
               money7:"20"
            }
        },
        methods: {
            jump(index){
                this.index = index;
                if(this.index==0){
                	this.money1="50"
                	this.money2="5万元"
                	this.money3="1800"
                	this.money4="200"
                	this.money5="50"
                	this.money6="50"
                	this.money7="20"
                }
                if(this.index==1){
                	this.money1="30"
                	this.money2="3万元"
                	this.money3="9000"
                	this.money4="100"
                	this.money5="30"
                	this.money6="30"
                	this.money7="20"
                }
                if(this.index==2){
                	this.money1="6"
                	this.money2="5000元"
                	this.money3="-"
                	this.money4="50"
                	this.money5="10"
                	this.money6="10"
                	this.money7="2"
                }
            },
        }
    }
</script>
 
<style scoped="scoped">
	
    #headed{
        width: 7.50rem;
        overflow: hidden;
        background: #F8F8F8;
    }
    .line{
        width: 100%;
        height: 1px;
        background-color: #e6e6e6;
        margin-top: -2px;
    }
    .tab{
        overflow: hidden;
        padding: 0;
        margin: 0;
        height: 1rem;
        line-height: 1rem;
        background: #fff;
    }
    .tab li{
        float: left;
        list-style: none;
        width: 33.3%;
        text-align: center;
    }
    .body_bottom{
        width: 1.6rem;
        height: .9rem;
        margin: 0 auto;
        text-align: center;
        font-size: .24rem;
    }
    .active_color{
        color: #d22330;
        border-bottom: .02rem solid #d22330 !important;
    }
    .article{
		
		width: 7rem;
		margin: 0 auto;
		background: #fff;
		margin-top: .3rem;
	}
	.title{
		width: 6.5rem;
		margin: 0 auto;
		height: .8rem;
		line-height: .8rem;
	}
	.title span{
		float: right;
		height: .8rem;
		line-height: .8rem;
	}
	.center{
		padding: 0 .3rem .1rem;
		font-size: .24rem;
		line-height: .4rem;
	}
</style>