<template>
	<div>
		<div id="oneItem">
			<ul class="container">
				<li  class="">
					<!-- <div class="twoCon">
						<p class="title_twoCon clearFloat">
							<label class="title_twoCon2 left">投保人信息</label>
						</p>
						<div>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>姓名</label>
								<input type="text" class="inputText inputWidth left" placeholder="柴小木" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>性别</label>
								<input type="text" class="inputText inputWidth left" placeholder="男" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>出生日期</label>
								<input type="text" class="inputText inputWidth left" placeholder="26" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>职业名称</label>
								<input type="text" class="inputText inputWidth left" placeholder="国家权力机关及其工作机构负责人" />
							</p>
						</div>
					</div>
					<div class="twoCon">
						<p class="title_twoCon clearFloat">
							<label class="title_twoCon2 left">被保险人信息</label>
						</p>
						<div>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>姓名</label>
								<input type="text" class="inputText inputWidth left" placeholder="柴小木" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>性别</label>
								<input type="text" class="inputText inputWidth left" placeholder="男" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>出生日期</label>
								<input type="text" class="inputText inputWidth left" placeholder="26" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>职业名称</label>
								<input type="text" class="inputText inputWidth left" placeholder="国家权力机关及其工作机构负责人" />
							</p>
						</div>
					</div> -->
					<div class="twoCon">
						<p class="title_twoCon clearFloat">
							<label class="title_twoCon2 left">投保险种信息</label>
						</p>
						<div>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>主险</label>
								<input type="text" class="inputText inputWidth left" placeholder="长城吉祥人生两全保险" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>被保险人</label>
								<input type="text" class="inputText inputWidth left" placeholder="柴小木" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>保额</label>
								<input type="text" class="inputText inputWidth left" placeholder="100000.00" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>首期保费</label>
								<input type="text" class="inputText inputWidth left" placeholder="1950.00" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>保险期间</label>
								<input type="text" class="inputText inputWidth left" placeholder="终身" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>交费方式</label>
								<input type="text" class="inputText inputWidth left" placeholder="年交" />
							</p>
							<p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>交费期间</label>
								<input type="text" class="inputText inputWidth left" placeholder="20年" />
							</p>
							<!-- <p class="inputGrop clearFloat">
								<label class="inputLabel left">
									<label class="star"></label>祝寿金领取年龄</label>
								<input type="text" class="inputText inputWidth left" placeholder="79周岁" />
							</p> -->
						</div>
					</div>
					<div class="twoCon">
						<p class="title_twoCon clearFloat">
							<label class="title_twoCon2 left">产品条款</label>
						</p>
						<div>
							<p class="inputGrop1 clearFloat" @click="authorization('sms')">
								<label class="inputLabel1 left">《产品说明书》</label>
								<label class="inputLabel1 rit">预览</label>
							</p>
							<p class="inputGrop1 clearFloat" @click="authorization('tk')">
								<label class="inputLabel1 left">《长城吉康人生重大疾病保险条款》</label>
								<label class="inputLabel1 rit">预览</label>
							</p>
							<p class="inputGrop1 clearFloat" @click="authorization('tkf')">
								<label class="inputLabel1 left">《长城附加吉康两全保险条款》</label>
								<label class="inputLabel1 rit">预览</label>
							</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<benefitDec></benefitDec>
		<!-- pdf预览 -->
		<!-- <div v-if="!pdfFlag" class="ctc_div_mask">
			<Pdf :pdf="pdf" @pdfClose="pdfClose"></Pdf>
		</div> -->
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import benefitDec from './benefitDec'
export default {
	name: "benefit-plan",
	components: {
			benefitDec,
	},
  data() {
    return {};
  },
  created() {},
  updated() {},
  methods: {
		//PDF预览
		authorization(tmId) {
			var data = [{
				"tmId": tmId || "TM0009"
			}]
			console.log("请求==" + JSON.stringify(data))
			this.$http.post(this.$store.state.link5 + '/css/css/queryTemplateByTmIdList', data)
				.then(res => {
					var dataCode = res.data.code;
					if(dataCode == "SYS_S_000") {
						this.pdf = res.data.output[0].tmFmsUrl;
						this.pdfFlag = false
						console.log("响应==" + JSON.stringify(res.data.output))
					} else {
						console.log("响应1==" + JSON.stringify(res.data))
						Toast(res.data.desc);
					}
				}, res => {
					console.log(res.data);
				})
		},
	}
};
</script>

<style scoped="scoped">
.ctc_div_mask {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background: #c9141e;
	background: rgba(0, 0, 0, 0.40);
	z-index: 10;
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
  color: #b2b2b2;
}

input:-ms-input-placeholder {
  color: #b2b2b2;
}

.window {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background: #f3f3f3;
}

.btns {
  display: flex;
  width: 90%;
  margin-left: 5%;
  margin-top: 0.32rem;
  border: 1px solid #eb7760;
  overflow: hidden;
  border-radius: 0.1rem;
  position: fixed;
  z-index: 10;
  background: #ffffff;
}

.btnsli {
  width: 33.33%;
  height: 0.56rem;
  line-height: 0.56rem;
  text-align: center;
  color: #eb7760;
  border-left: 1px solid #eb7760;
}

.btns li:first-child {
  border-left: none;
}

.active {
  background: #eb7760;
  color: #ffffff;
}

.inputSpan {
  display: inline-block;
  line-height: 0.88rem;
  color: #555555;
  font-weight: bold;
}

.container {
  width: 300%;
  min-height: 100%;
  display: flex;
  padding-top: 1.2rem;
  box-sizing: border-box;
  background: #ffffff;
}

.container li {
  width: 33.3%;
  min-height: 100%;
  /* border: 1px solid green; */
  background: #f3f3f3;
}

.twoCon {
  margin-top: 0.4rem;
  padding: 0 0.4rem;
  font-size: 0.32rem;
  color: #222222;
  background: #ffffff;
}

.twoCon:first-child {
  margin-top: 0;
}

.title_twoCon {
  height: 0.84rem;
  line-height: 0.84rem;
  padding-top: 0.28rem;
  font-size: 0.32rem;
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

/* .left {
  float: left;
} */

.inputGrop {
  position: relative;
  height: 0.88rem;
  font-size: 0.28rem;
  border-bottom: solid 0.01rem #c8c7cc;
  display: flex;
}

.inputGrop:last-child {
  border: none;
}

.inputGrop1 {
	display: flex;
  position: relative;
  height: 0.88rem;
  font-size: 0.28rem;
  border-bottom: solid 0.01rem #c8c7cc;
  display: flex;
}

.inputGrop1:last-child {
  border: none;
}

.inputLabel {
  display: block;
  width: 3.22rem;
  height: 0.88rem;
  line-height: 0.88rem;
  color: #555555;
}

.inputLabel1 {
  display: block;
  /* width: 3.22rem; */
  height: 0.88rem;
  line-height: 0.88rem;
  color: #555555;
}

.rit{
	flex: 1;
	text-align: right;
}

.inputText {
  height: 0.88rem;
  font-size: 0.28rem;
  color: #333333;
}
</style>