<template>
	<div>
		<div class="matchReport_all">
			<p class="matchReport_title" v-if="match_dear">
			亲爱的经纪人您好：<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这是我们为您匹配到的客户的生日信息，请知悉。
			</p>
			<p class="matchReport_title" v-if="!match_dear">
				亲爱的经纪人您好：<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们没有为您匹配到的客户的生日信息，请确保开启智能匹配的功能。
			</p>
		</div>
		<div  v-show="!matchtrue" class="match_top" >
			<img src="/static/img/failImg.png" class="matchre_img"/>
		</div>
		<div class="matchReport_name" v-for="(item,index) in tabs" v-show="matchtrue" >
			<p class="matchReport_datetime" >
				{{item.impTime}}
			</p>
			<div class="matchReport_div" v-for="(items,index) in item.detailList" @click="match_detail(items.custId)">
				<p class="matchReport_span_name">{{items.custName}}</p>
				<p class="matchReport_span_phone">{{items.mMobile}}</p>
				<p class="matchReport_span_data">{{items.mBirth}}</p>
			</div>
		</div>

	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	export default {
    	name: "MatchReport",
    	data () {
      		return {
      			tabs:[],
      			match_data:"",
      			matchtrue:true,
      			match_dear:true,
      		}
    	},
    	created(){
			this.match_status();
    		var data={
    			"userId": localStorage.getItem("userId"),
    			"token": localStorage.getItem("token")
				
    		}
    		Indicator.open();
				this.$http.post(this.$store.state.link + "/cut/cut/queryBirthMatchRep", data).then(res => {
					Indicator.close();
					console.log("55555===="+JSON.stringify(res.data));
					if(res.data.code == "SYS_S_000") {
						if(res.data.output.length==0){
							this.matchtrue=false;
							this.match_dear=false;
						}else{
							this.tabs=res.data.output;
							this.matchtrue=true;
							this.match_dear=true;
						}
						
						
						
					} else {
						if(res.data.desc != undefined) {
							Toast(res.data.desc);
						} else {
							
						}
					}
				}, res => {
					Indicator.close();
					
				});
				
    	},
    	methods:{
    		match_detail(custIddetail){
    			this.$router.push('/manage?custId=' + custIddetail);
    		},
    		match_status(){
    			var date={
    				"userId":localStorage.getItem("userId"),
    				"token": localStorage.getItem("token")
    			}
    			Indicator.open();
					this.$http.post(this.$store.state.link + "/cut/cut/updateBirthMatch", date).then(res => {
						Indicator.close();
//						console.log("ddd555=="+JSON.stringify(res.data));
						if(res.data.code == "SYS_S_000") {
						
						} else {
							if(res.data.desc != undefined) {
								Toast(res.data.desc);
							} else {
								console.log("分享接口undefined");
							}
						}
					}, res => {
						Indicator.close();
						console.log("2===失败1" + res.data)
					});
    		}
    	}
   }
</script>

<style scoped="scoped">
		.matchReport_all{
			padding: 0.24rem 0.33rem 0 0.33rem;
		}
		.matchReport_title{
			font-size: 0.28rem;
			color: #222222;
			line-height: 0.4rem;
		}
		.matchReport_name{
			padding: 0 0 0 0.33rem;
			margin-top: 0.64rem;
		/*	border: 0.01rem solid red;*/
		}
		.matchReport_datetime{
			font-size: 0.32rem;
			color: #EB6067;
			line-height: 0.5rem;
		}
		.matchReport_div{
			height: 0.88rem;
			border-bottom: 0.01rem solid;
			border-bottom-color: #E3E3E3;
			clear: both;
		}
		.match_top{
			margin-top: 1rem;
		}
		.matchReport_span_name{
			display: inline-block;
			font-size: 0.32rem;
			color: #555555;
			line-height: 0.88rem;
			width: 1.6rem;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			clear: both;
			float: left;
			
		}
		.matchReport_span_phone{
			display: inline-block;
			width: 2rem;
			font-size: 0.32rem;
			color: #555555;
			margin-left: 0.78rem;
			line-height: 0.88rem;
			clear: both;
			
			
		}
		.matchReport_span_data{
			display: inline-block;
			width: 1.9rem;
			margin-left: 0.64rem;
			font-size: 0.32rem;
			color: #555555;
			line-height: 0.88rem;
			clear: both;
			
		}
		.matchre_img{
			width: 2.4rem;
			height: 2.4rem;
			display: block;
			margin: 0 auto;
			
		}
</style>