<template>
	<div class="one" style=" -webkit-tap-highlight-color: transparent; -webkit-focus-ring-color: transparent;">
		<div class="titleFont">
			本人特此声明：<br/>
			本人已亲自面见投保人和被投保人，就投保单的告知<br/>
			事项逐一向投保人和被投保人当面询问，并见证投保<br/>
			人和被投保人在投保单上签字。<br/>
			此外，本人还核对了其身份证件且证实本表格所列情<br/>
			况与投保单表格中的陈述一致，如有不实见证或报告，<br/>
			本人愿意承担相应法律责任。
		</div>
		<div class="twoCon">
			<div class="policyHolder">
                <p class="inputGrop clearFloat">
					<label class="inputLabel3">你是怎么认识被保险人的？</label>
					<select name="name_car" class="inputText inputWidth">
						<option>请选择</option>
                        <option>请选择</option>
					</select>
				</p>
			</div>
			<div class="policyHolder">
                <p class="inputGrop clearFloat">
					<label class="inputLabel3">被保险人的投保目的？</label>
					<select name="name_car" class="inputText inputWidth">
						<option>请选择</option>
                        <option>请选择</option>
					</select>
				</p>
			</div>
			<div class="policyHolder">
                <p class="inputGrop clearFloat">
					<label class="inputLabel3">投保人/被保险人的家庭收入主要来源？</label>
					<select name="name_car" class="inputText inputWidth">
						<option>请选择</option>
                        <option>请选择</option>
					</select>
				</p>
			</div>
			<div class="policyHolder">
                <p class="inputGrop clearFloat">
					<label class="inputLabel3">投保人的居住情况？</label>
					<select name="name_car" class="inputText inputWidth">
						<option>请选择</option>
                        <option>请选择</option>
					</select>
				</p>
			</div>
			<div class="policyHolder">
                <p class="inputGrop clearFloat">
					<label class="inputLabel3">投保人的日常出行交通工具？</label>
					<select name="name_car" class="inputText inputWidth">
						<option>请选择</option>
                        <option>请选择</option>
					</select>
				</p>
			</div>
			<div class="policyHolder">
                <p class="inputGrop clearFloat">
					<label class="inputLabel3">是否具有国外多次往返签证？</label>
					<select name="name_car" class="inputText inputWidth">
						<option>请选择</option>
                        <option>请选择</option>
					</select>
				</p>
			</div>
		</div>
		<p class="btnBox clearFloat">
			<span class="btn btn1 left" @click="lastClick">上一步</span>
			<span class="btn left" @click="nextClick">下一步</span>
		</p>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: "",
		data() {
			return {
            }
        },
        methods:{
			lastClick() {
				this.$router.push('/questionnaire1');
			},
       		nextClick() {
				this.$router.push('/bankCard');
			},
			
		}
	}
</script>

<style scoped="scoped">
	.titleFont{
		line-height: 0.36rem;
		color: skyblue;
		padding-left: 0.36rem;
		padding-top: 0.36rem;
	}
	.left {
		float: left;
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
	
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	
	.one {
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: #F3F3F3;
	}
	
	.twoCon {
		/*margin-top: 0.4rem;*/
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		overflow: scroll;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	
	.twoCon::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}
	
	.btnBox {
		padding: 0.64rem 0.4rem;
		text-align: center;
	}
	
	.btnBox1 {
		position: absolute;
		left: 0;
		bottom: 0.64rem;
		padding-bottom: 0;
	}
	
	.btn {
		display: inline-block;
		width: 3.12rem;
		height: 0.88rem;
		line-height: 0.88rem;
		border: 0.02rem solid #c9141e;
		box-shadow: inset 0 0.01rem 0.03rem 0 rgba(255, 255, 255, 0.50);
		border-radius: 0.5rem;
		font-size: 0.32rem;
		color: #c9141e;
		text-align: center;
	}
	
	.btn1 {
		margin-right: 0.3rem;
	}
	
	.inputGrop {
		position: relative;
		font-size: 0.28rem;
		background: #fff;
		border-radius: 0.15rem;
		padding-left: 0.24rem;
		margin-top: 0.27rem;
	}

	.inputLabel3 {
		display: block;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		font-size: 0.3rem;
		padding-top: 0.1rem;
	}

	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		margin-bottom: 0.2rem;
	}

	select {
		padding-right: 0.48rem;
		border: none;
		background: none;
		background: url(/static/upDown.png) no-repeat right center;
		background-size: 0.4rem 0.45rem;
		outline: none;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	.inputWidth {
		width: 6rem;
	}

	.twoCon .inputGrop:last-child {
		border: none;
	}
</style>