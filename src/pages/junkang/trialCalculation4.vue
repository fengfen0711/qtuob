<template>
    <div class="twoCon" v-if="add">
        <p  class="title_twoCon clearFloat">
			<label class="titleLable_twoCon left">附加险信息4</label>
		</p>
        <p class="inputGrop clearFloat">
			<label class="more left">君康附加尊享赢家养老年金保险</label>
			<label class="more right" @click="handleClean">删除</label>
		</p>
        <p class="inputGrop clearFloat">
				<label class="inputLabel3 left">缴费方式</label>
				<select name="name_car"  class="left inputText inputWidth" >
					<option >支付宝</option>
					<option >微信</option>
				</select>
		</p>
        <p class="inputGrop clearFloat">
				<label class="inputLabel3 left">缴费期间</label>
				<select name="name_car"  class="left inputText inputWidth" >
					<option >年缴</option>
					<option >批量</option>
				</select>
		</p>
        <p class="inputGrop clearFloat">
				<label class="inputLabel3 left">保险期间</label>
				<select name="name_car"  class="left inputText inputWidth" >
					<option >3</option>
					<option >6</option>
				</select>
		</p>
        <p class="inputGrop clearFloat">
				<label class="inputLabel3 left">保额（元）</label>
				<input type="text" class="inputText left"   placeholder="请输入保额" />
		</p>
		<p class="inputGrop1 clearFloat">
				<label class="inputLabel3 left">保费（元）</label>
				<input type="text" class="inputText left"   placeholder="请输入保费" />
		</p>
    </div>
</template>

<script>
    export default{
		data(){
			return{	
				add:true
			}
		},
        methods:{
           //清除
			handleClean(){
				if(this.add){
					this.add = false
				}
			}, 
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
		width: 4.4rem;
	}
	.twoCon {
		margin-bottom: 0.4rem;
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
		overflow: scroll;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	.title_twoCon {
		height: 1.11rem;
		line-height: 1.11rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
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
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputLabel3 {
		display: block;
		width: 2.3rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}
	.inputText {
		height: 0.88rem;
		font-size: 0.28rem;
		color: #666666;
		padding-left: 0;
	}
	.more{
		line-height: 0.88rem;
		font-size: 0.3rem;
		color: #C9141E;
	}
	.inputGrop {
		position: relative;
		height: 0.88rem;
		font-size: 0.28rem;
		border-bottom: solid 0.01rem #C8C7CC;
	}
	.inputLabel3 {
		display: block;
		width: 2.3rem;
		height: 0.88rem;
		line-height: 0.88rem;
		font-weight: bold;
		color: #555555;
		/*background: #669900;*/
	}
</style>