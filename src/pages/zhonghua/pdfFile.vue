<template>
	<div class="one">
		<iframe :src="tmFmsUrl" id="iframe"></iframe>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	export default{
		data(){
			return{	
				tmFmsUrl:'',
			}
		},
		created() {
				var data = 	[
							  {
							    "tmId": "TM0009"
							  }
							]
				console.log("请求=="+JSON.stringify(data))
				this.$http.post(this.$store.state.link + '/css/css/queryTemplateByTmIdList', data)
				.then(res => {
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
						this.tmFmsUrl = res.data.output[0].tmFmsUrl;
						console.log("响应=="+JSON.stringify(res.data.output))
					} else {
						console.log("响应1=="+JSON.stringify(res.data))
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
				
		},
			
		methods:{
		
			
			
		}
	}
</script>

<style scoped="scoped">
	.one {
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
	}
	#iframe {
		position: absolute;
		top:0.1rem;
		left: 0;
		width: 7.5rem;
		height: 13.3rem;
		background: #fff;
		border: none;
		padding: none;
	}
</style>