<template>
	<div class="recepit_all">
		<div class="recepit_div">
			<p class="recepit_policy">
				保单合同签收回执
			</p>
			<div class="recepit_div_all">
				<div class="recepit_confirm">
					保单送达确认书保单送达确认书保单送达确认书保单送达确认书保单送达确认书保单送达确认书保单送达确认书
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: "Receipt",
		data() {
			return {
				
			}
		},
		
		methods: {
		},
		
	}
</script>

<style scoped="scoped">
	.recepit_all{
		width: 100%;
		height: 100%;
		background: #F3F3F3;
		position: fixed;
		padding:0.32rem 0.52rem 0 0.52rem ;
		
	}
	.recepit_div{
		/*width: 100%;*/
		height: 3.56rem;
		width: 6.44rem;
		background: #FFFFFF;
		border-radius: 0.16rem;
		padding: ;
	}
	.recepit_policy{
		font-size: 0.28rem;
		color: #555555;
		text-align: center;
		height: 0.7rem;
		line-height: 0.7rem;
	}
	.recepit_div_all{
		padding: 0.2rem 0.52rem 0.64rem 0.32rem;
	}
	.recepit_confirm{
		
		width: 5.6rem;
		font-size: 0.28rem;
		color: #777777;
	}
</style>