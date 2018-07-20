<template>
	<div class="one">
		<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">保单信息</label>
		</p>
		<div class="twoCon">
			<p class="group">
				<span class="inputLabel3 left">投保单号</span>
				<span class="idCard">123456789</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">保单号</span>
				<span class="idCard">123456789</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">总保费（元）</span>
				<span class="idCard">123456789</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">支付方式</span>
				<span class="idCard">123456789</span>
			</p>
			<p class="group1">
				<span class="inputLabel3 left">状态</span>
				<span class="idCard">人工核保</span>
			</p>
		</div>
		<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">险种信息</label>
		</p>
		<div class="twoCon">
			<p class="group">
				<span class="inputLabel14 left">君康富康保宝重大疾病险</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">保险金额/份数</span>
				<span class="idCard">123456789</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">保费</span>
				<span class="idCard">195.00</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">保险期间</span>
				<span class="idCard">终身</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">支付方式</span>
				<span class="idCard">年交</span>
			</p>
			<p class="group1">
				<span class="inputLabel3 left">交费期间</span>
				<span class="idCard">20年</span>
			</p>
		</div>
		<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">投保人信息</label>
		</p>
		<div class="twoCon">
			<p class="group">
				<span class="inputLabel3 left">姓名</span>
				<span class="idCard">古天乐</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">性别</span>
				<span class="idCard">女</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">出生日期</span>
				<span class="idCard">1996-12-03</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">证件类型</span>
				<span class="idCard">身份证</span>
			</p>
			<p class="group1">
				<span class="inputLabel3 left">证件号码</span>
				<span class="idCard">140623199610085647</span>
			</p>
		</div>
		<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">被保险人信息</label>
		</p>
		<div class="twoCon">
			<p class="group">
				<span class="inputLabel3 left">姓名</span>
				<span class="idCard">古天乐</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">性别</span>
				<span class="idCard">女</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">出生日期</span>
				<span class="idCard">1996-12-03</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">证件类型</span>
				<span class="idCard">身份证</span>
			</p>
			<p class="group1">
				<span class="inputLabel3 left">证件号码</span>
				<span class="idCard">140623199610085647</span>
			</p>
		</div>
		<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">受益人信息</label>
		</p>
		<div class="twoCon">
			<p class="group1">
				<span class="inputLabel3 left">受益人类型</span>
				<span class="idCard">法定受益人</span>
			</p>
		</div>
		<p  class="title_twoCon clearFloat">
					<label class="titleLable_twoCon left">缴费信息</label>
		</p>
		<div class="twoCon">
			<p class="group">
				<span class="inputLabel3 left">开户行</span>
				<span class="idCard">巴拉巴拉巴</span>
			</p>
			<p class="group">
				<span class="inputLabel3 left">户名</span>
				<span class="idCard">中国邮政</span>
			</p>
			<p class="group1">
				<span class="inputLabel3 left">账号</span>
				<span class="idCard">123456789</span>
			</p>
		</div>
		<div class="pad"></div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.one {
		width: 100%;
		min-height: 100%;
		/*position: absolute;*/
		background: #F3F3F3;
	}
	.pad{
		height:0.4rem;
		width:100 %;
		background: #F3F3F3;
	}
	.twoCon {
		/*margin-bottom: 0.4rem;*/
		padding: 0 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		background: #FFFFFF;
		overflow: scroll;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	.title_twoCon {
		padding: 0 0.4rem;
		height: 1rem;
		line-height: 1rem;
		/*border-bottom: solid 0.01rem #C8C7CC;*/
	}
	.title_twoCon1 {
		height: 1rem;
		line-height: 1rem;
		border-bottom: solid 0.01rem #C8C7CC;
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
	.group{
		display: flex;
		justify-content: space-between;
		width:100%;
		height:0.88rem;
		border-bottom: 0.01rem solid #C8C7CC;
	}
	.group1{
		display: flex;
		justify-content: space-between;
		width:100%;
		height:0.88rem;
		/*border-bottom: 0.01rem solid #C8C7CC;*/
	}
	.inputLabel14{
		/*width: 2.5rem;*/
		height: 0.88rem;
		line-height: 0.88rem;
		color: #555555;
	}
	.inputLabel3 {
		width: 2.3rem;
		height: 0.88rem;
		line-height: 0.88rem;
		color: #555555;
	}
	.idCard{
		line-height: 0.88rem;
		color: #8A8A8F;
	}
</style>