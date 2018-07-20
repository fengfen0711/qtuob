<template>
	<div ref="item" class="bo_div_body">
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'Login',
		data() {
			return {
				birthday: ''
			}
		},
		methods: { //方法

		},
		created() {
			var br1 = this.$route.query.birthday;
			console.log("===" + br1);
			var br2 = br1.split("-");
			console.log(br2)
			this.birthday = br2[1] + br2[2];
			console.log("===" + this.birthday);
			var data = {
				"custBirthday": this.birthday,
				"token": localStorage.token,
				"userId": localStorage.userId
			};
			this.$http.post(this.$store.state.link + "/cut/cut/queryBirthInfo", data).then(res => {
				console.log("详细信息===" + JSON.stringify(res.data))
				if(res.data.code == "SYS_S_000") {
					this.$refs.item.innerHTML = res.data.output.context;
				} else {
					if(res.data.desc != undefined) {

					} else {
						console.log("登录接口undefined");
					}
				}
			}, res => {
				console.log("2===" + res.data)
			});
		}
	}
</script>

<style>
	.bo_div_body {
		padding: 0.5rem 0.4rem;
	}
	
	.bo_div_body div {
		line-height: 0.48rem;
	}
	
	.bo_div_body p {
		font-size: .3rem;
		margin-bottom: 0.2rem;
		line-height: 0.58rem;
		color: #666;
	}
	
	.bo_div_body strong {
		width: 100%;
		text-align: center;
		display: block;
		font-size: .36rem;
		font-weight: bold;
		margin-top: .4rem;
	}
</style>