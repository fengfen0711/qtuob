<template>
	<div id="oneItem">
		<ul class="container">
			<li  class="">
				<div class="twoCon">
					<p class="title_twoCon clearFloat">
						<label class="title_twoCon2 left">{{data.name}}</label>
						<label class="title_twoConsee right">查看资料</label>
					</p>
					<div class="bxj_title">
						<span class="title_insure_age">被保险人年龄</span>
            <slRule :dataParams="dataParams"></slRule>
					</div>

					<p class="bor_concent clearFloat">
						<label class="title_twoCon2 left">保单年度</label>
						<label class="right">1</label>
					</p>
					<p class="bor_concent clearFloat">
						<label class="title_twoCon2 left">年初年龄</label>
						<label class="right">1</label>
					</p>
					<p class="bor_concent clearFloat">
						<label class="title_twoCon2 left">当期保费</label>
						<label class="right">1</label>
					</p>
					<p class="bor_concent clearFloat">
						<label class="title_twoCon2 left">累计保费</label>
						<label class="right">1</label>
					</p>
					<p class="bor_concent clearFloat">
						<label class="title_twoCon2 left">身故/全残保险金</label>
						<label class="right">1</label>
					</p>
					<p class="bor_concent clearFloat">
						<label class="title_twoCon2 left">疾病终末期保险金</label>
						<label class="right">1</label>
					</p>
					<p class="bor_concent clearFloat">
						<label class="title_twoCon2 left">现金价值</label>
						<label class="right">1</label>
					</p>
					<p class="bor_concent clearFloat">
						<label class="title_twoCon2 left">豁免保险费</label>
						<label class="right">1</label>
					</p>

				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import slRule from "../../components/changcheng/sl-rule";
export default {
  name: "benefit-table",
  components: {
    slRule
  },
  data() {
    return {
      data: {
        name: "长城吉康人生重大疾病保险",
      },
      dataParams:{
        num:"0"
      },
    }
  },
  created() {},
  updated() {},
  methods: {}
};
</script>

<style scoped="scoped">
.title_twoConsee {
  font-size: 0.28rem;
  color: #c9141e;
}

.txt_one {
  line-height: 0.4rem;
  text-indent: 2em;
  font-size: 0.26rem;
  color: #222222;
}

.bxj_title {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
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

.title_insure_age {
  /* margin-left:0.2rem; */
  font-size: 0.28rem;
  color: #555555;
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

.bor_concent {
  height: 0.44rem;
  line-height: 0.44rem;
  padding-top: 0.2rem;
  font-size: 0.28rem;
  color: #555555;
}

.title_red {
  height: 0.4rem;
  line-height: 0.4rem;
  padding-top: 0.14rem;
  font-size: 0.28rem;
  color: #c9141e;
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