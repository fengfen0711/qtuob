<template>
	<div class="brithday_all">
		<img src="/static/img/brithday_all.png" class="birthday_img"/>
	
		<div class="brithday_text">
			{{birth_name}}与以下名人同一天生日，选择一个作为惊喜分享给他！
		</div>
		<div class="birth_div" v-for="(item,index) in tabs">
			<p class="bir_p">
				<img src="/static/img/icon_select2_unfocu.png" ref="item" class="birthday_select" v-on:click="birthday($event,item.celId)" name="brithdayfall" id="item.celId"/>
				<span class="birthday_name">{{item.famName}}</span>
			</p>
			<div class="birth_text" >
				{{item.famDesc}}
			</div>
			
		</div>
		<div class="brithday_btn" v-on:click="birthday_preview">
			预览
		</div>
	</div>
	
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
    	name: "birthdayfall",
    	data () {
      		return {
      			tabs:[],
      			checkiteam:[],
      			id:'',
      			index:'',
      			birth_name:'',
      			celId:''
      		}
    	},
    	created() {
    		var data = {
				"custId": this.$route.query.custId,
				"token": localStorage.token,
				"userId": localStorage.userId
					}
    		console.log("data==="+JSON.stringify(data))
    		this.$http.post(this.$store.state.link + "/cut/cut/queryCelBirthInfo", data).then(res => {
    			console.log(res.data)
				if(res.data.code == "SYS_S_000") {
					this.tabs=res.data.output.celBirthList;
					this.birth_name=res.data.output.custName;	
				} else {
					if(res.data.desc != undefined) {

					} else {
						
					}
				}
			}, res => {
				console.log("2===" + res.data)
			})
    	},
    	
    	methods:{
    		birthday_preview(){
    			if(this.checkiteam.length==0){
    				Toast("请先选择一条数据");
    			}else{
    				this.$router.push("/preview?custId="+this.$route.query.custId+"&celId="+this.checkiteam+"&flag=2"+"&userId="+localStorage.getItem("userId")+"&token="+localStorage.getItem("token"));
    			}
 				
    		},
    		birthday(eve,celId){
    		this.celId=celId;
    		for(var i=0;i<this.$refs.item.length;i++){
				this.$refs.item[i].setAttribute("src", "/static/img/icon_select2_unfocu.png");
				this.checkiteam=[];
    		}
    		eve.currentTarget.src="/static/qijianwei/icon_select1_focus.png";
    		this.checkiteam.push(celId);
    		}
    		
    	}
    	
    	
    		
    }
</script>

<style scoped="scoped">
	.brithday_all{
		padding-bottom:.35rem ;
	}

	.birthday_img{
		width: 100%;
		height: 3.48rem;
	}
	.brithday_text{
		font-size: 0.36rem;
		color: #222222;
		width: 6.84rem;
	/*	height: 1rem;*/
		margin: 0.28rem auto;
		line-height: 0.64rem;
	}
	.birth_div{
		margin-top: 0.3rem;
	}
	.birthday_select{
		display: inline-block;
		margin-left: 0.32rem;
		width: 0.48rem;
		height: 0.48rem;
		vertical-align: middle;
		float: left;
	}
	.birthday_name{
		line-height: 0.5rem;
		font-size: 0.36rem;
		color: #222222;
		vertical-align: middle;
		display: inline-block;
		float: left;
		width: 87%;

	}
	.bir_p{
		height: 0.5rem;
		line-height: 0.5rem;
	}
	.birth_text{
		width:6.08rem; 	
		margin-left: 0.88rem;
		margin-top: 0.12rem;
		font-size: 0.32rem;
		color: #555555;
		line-height: 0.5rem;
		}
		.brithday_btn{
			background-image: url(/static/img/save.png);
			background-repeat: no-repeat;
			background-size: cover;
			margin: 1.72rem auto;
			width: 6.04rem;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			font-size: 0.32rem;
			color: #EB7760;
		}
</style>