<template>
	<div id="oneItem">
		<ul class="container">
			<li  class="">
				<div class="twoCon">
					<p class="title_twoCon clearFloat">
						<label class="title_twoCon2 left">保障利益明细</label>
					</p>
					<p class="title_red clearFloat">
						<label class="title_twoCon2">{{data.name}}</label>
					</p>
					<div class="bxj_title">
						<div class="read_line"></div>
						<span class="title_bxj">轻症疾病保险金</span>
					</div>
					<div class="bxj">
						<p class="txt_one">若被保险人于本主险合同生效或最后一次复效之日起90日内（含第90日）因意外伤害（见9.3）以外的原因导致疾病且经专科医生（见9.4）明确诊断罹患（见9.5）本主险合同约定的轻症疾病（见9.6）的一种或多种，我们将向您返还本主险合同累计已交保险费（无息），同时本主险合同终止。</p>
						<p class="txt_one">若被保险人因意外伤害，或于本主险合同生效或最后一次复效之日起90日后因意外伤害以外的原因导致疾病且经专科医生明确诊断初次罹患（见9.7）本主险合同约定的轻症疾病，我们将按本主险合同基本保险金额的30%给付轻症疾病保险金。</p>
						<p class="txt_one">每种轻症疾病只给付一次轻症疾病保险金，给付后该种轻症疾病的保险责任终止。</p>
						<p class="txt_one">本主险合同轻症疾病保险金累计给付次数以三次为限，当累计次数达到三次时，本项保险责任终止。</p>
					</div>

					<div class="bxj_title">
						<div class="read_line"></div>
						<span class="title_bxj">中症疾病保险金</span>
					</div>
					<div class="bxj">
						<p class="txt_one">若被保险人于本主险合同生效或最后一次复效之日起
						90日内（含第90日）因意外伤害以外的原因导致疾病且经
						专科医生明确诊断罹患本主险合同约定的中症疾病（见9.8）
						的一种或多种，我们将向您返还本主险合同累计已交保险费
						（无息），同时本主险合同终止。</p>
						<p class="txt_one">若被保险人因意外伤害，或于本主险合同生效或最后一
						次复效之日起90日后因意外伤害以外的原因导致疾病且经专
						科医生明确诊断初次罹患本主险合同约定的中症疾病，我们
						将按本主险合同基本保险金额的50%给付中症疾病保险金。</p>
						<p class="txt_one">每种中症疾病只给付一次中症疾病保险金，给付后该种中症疾病的保险责任终止。</p>
						<p class="txt_one">本主险合同中症疾病保险金累计给付次数以两次为限，当累计次数达到两次时，本项保险责任终止。</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "benefit-dec",
  data() {
    return {
      data: {
        name: "长城吉康人生重大疾病保险"
      }
    };
  },
  created() {},
  updated() {},
  methods: {}
};
</script>

<style scoped="scoped">
.txt_one {
  line-height: 0.4rem;
  text-indent: 2em;
  font-size: 0.26rem;
  color: #222222;
}

.bxj_title {
  margin-top: 0.2rem;
}
.bxj {
  /* width: 6.76rem;
	height: 6rem; */
  margin-top: 0.2rem;
}

.title_bxj {
  margin-left: 0.2rem;
  font-size: 0.28rem;
}

.read_line {
  float: left;
  width: 0.08rem;
  height: 0.32rem;
  background: #ed816c;
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
  /* padding-top: 1.2rem; */
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

.title_red {
  height: 0.4rem;
  line-height: 0.4rem;
  padding-top: 0.14rem;
  font-size: 0.28rem;
  color: #c9141e;
  text-align: center;
}

.clearFloat:after {
  height: 0;
  display: block;
  overflow: hidden;
  visibility: hidden;
  clear: both;
  content: "";
}

.left {
  float: left;
}

.inputGrop {
  position: relative;
  height: 0.88rem;
  font-size: 0.28rem;
  border-bottom: solid 0.01rem #c8c7cc;
}

.inputGrop:last-child {
  border: none;
}

.inputLabel {
  display: block;
  width: 3.22rem;
  height: 0.88rem;
  line-height: 0.88rem;
  color: #555555;
}

.inputText {
  height: 0.88rem;
  font-size: 0.28rem;
  color: #333333;
}
</style>