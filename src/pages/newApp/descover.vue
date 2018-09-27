<template>
	<div class="my_body">
		<div class="titleBoxWZ">
			<div class="titleBoxW">
				<div class="titleBox clearFloat">
					<router-link :to="{ name: title.compCode, query: { typeId: title.typeId }}" v-for="(title,index) in titleList" :key="index" tag="span">
						<span ref="title" @click="select_lab($event, title.typeId, title.compCode)" class="titleSpan">
							<span>{{title.name}}</span>
							<b class="titleBg"></b>
						</span>
					</router-link>
				</div>
				<div class="serchBox" v-show="serchShow"></div>
				<form action="javascript:return true;" ref="form" class="">
					<input @keyup.13=serchInput() type="search" ref="input1" v-model="serchText" class="serchText" :class="{serchWidth:serchShow}" @click="serchInput" @blur="serchHide">
					<img src="/static/imgNew/SearchGlyph3.png" class="serchImg" @click="serchInput" />
				</form>
			</div>
		</div>
		<div>
			<router-view @serchResult="serchResult"></router-view>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'descover',
		data() {
			return {
				noMoreShow: false,
				noShow: false,
				titleShow: true,
				titleList: [],
				desPath: this.$route.path,
				desPathMain: '',
				serchShow: false,
				serchText: '',
				artList: [],
				titleId: '',
				titlePath: '',
				serchInfoBox:'',
            }
		},
		created() {
			this.desPath = this.$route.path;
			this.desPathMain = this.desPath.split('descover/')
			this.titleAjax()
			this.common.noShare();
		},
		methods: {
			serchResult(...data){
				this.serchShow =data[0].serchShow;
				this.serchText =data[0].serchText;
			},
			select_lab(ev, id, path) {
				this.titleId = id
				this.titlePath = path
				this.serchInfoBox = {
					'titlePath': this.titlePath,
					'serchText': this.serchText,
					'titleId': this.titleId,
					'serchId': 0
				}							
				this.$store.dispatch("changeSerchInfo", this.serchInfoBox)
			},
			titleSelect(){
				if (this.$refs.title) {
					for(var i = 0; i < this.$refs.title.length; i++) {
						this.$refs.title[i].setAttribute("class", "titleSpan");
						this.$refs.title[i].children[1].setAttribute("class", "titleBg");
					}
					if(this.desPathMain[this.desPathMain.length-1] == "recommend") {
						this.$refs.title[0].setAttribute("class", "titleSlected");
						this.$refs.title[0].children[1].setAttribute("class", "titleBg1");
						this.$refs.form.setAttribute("class", "");
					}
					else if (this.desPathMain[this.desPathMain.length-1] == "study") {
						this.$refs.title[1].setAttribute("class", "titleSlected");
						this.$refs.title[1].children[1].setAttribute("class", "titleBg1");
						this.$refs.form.setAttribute("class", "disnone");
					}
				}
			},
			titleAjax() {
				var titleInfo = {
					"parTypeId": "0-1"
				}
				this.$http.post(this.$store.state.link + "/cnt/atc/queryArticleType", titleInfo)
					.then(res => {
//						console.log(res.data)
						if(res.data.code == "SYS_S_000") {
							this.titleList = res.data.output.articleTypeRespList;
							this.$store.dispatch("changeSerchInfo", {})
							this.titleId = this.titleList[0].typeId
							this.titlePath = this.titleList[0].compCode
							this.serchInfoBox = {
								'titlePath': this.titlePath,
								'serchText': this.serchText,
								'titleId': this.titleId,
								'serchId': 0
							}							
							this.$store.dispatch("changeSerchInfo", this.serchInfoBox)
						}
					}, res => {
						console.log(res.data)
					})
			},
			serchInput() {
				if(this.serchText == "") {
					if(this.serchShow) {
						this.serchInfoBox = {
							'titlePath': this.titlePath,
							'serchText': this.serchText,
							'titleId': this.titleId,
							'serchId': 1
						}							
						this.$store.dispatch("changeSerchInfo", this.serchInfoBox)
					} else {
						this.serchShow = true
					}
				} else {
					this.serchInfoBox = {
						'titlePath': this.titlePath,
						'serchText': this.serchText,
						'titleId': this.titleId,
						'serchId': 1
					}							
					this.$store.dispatch("changeSerchInfo", this.serchInfoBox)
					this.$refs.input1.blur();
				}
			},
			serchHide() {
				this.$refs.input1.blur();
				this.serchShow = false;
			},
		},
		watch: {
			$route: function() {
				this.desPath = this.$route.path;
				this.desPathMain = this.desPath.split('descover/')
				this.titleSelect()
			},
			titleList: function() {
				this.$nextTick(function() {
					if(this.$refs.title.length > 0) {
						this.titleSelect()
					}
				})
			}
		},
	}
</script>

<style scoped="scoped">
	.disblock {
		display: block;
	}
	.disnone {
		display: none;
	}
	.left {
		float: left;
	}
	.right {
		float: right;
	}
	input, button {
		background: none;
		border: none;
	}
	input, button {
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
	textarea::-webkit-input-placeholder, input::-webkit-input-placeholder {
		color: #B2B2B2;
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
	}
	input[type=search] {
		-webkit-appearance: textfield;
		-webkit-box-sizing: content-box;
		font-family: inherit;
		font-size: 100%;
	}
	input::-webkit-search-decoration, input::-webkit-search-cancel-button {
		display: none;
	}
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.my_body {
		width: 100%;
		min-height: 100%;
		background: #FFFFFF;
	}
	.titleBoxWZ {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 4;
		width: 100%;
		height: 0.8rem;
		background: #FFFFFF;
	}
	.titleBoxW {
		position: relative;
		padding-left: 0.32rem;
	}
	.serchBox {
		position: absolute;
		bottom: 0.02rem;
		right: 0.3rem;
		z-index: 1;
		width: 3.66rem;
		height: 0.64rem;
		padding-left: 0.14rem;
		padding-right: 0.5rem;
		background: rgba(142, 142, 147, 0.16);
		border-radius: 0.08rem;
	}
	.serchText {
		position: absolute;
		bottom: 0.02rem;
		right: 0.4rem;
		z-index: 3;
		display: inline-block;
		border: none;
		background: none;
		outline: none;
		width: 0.56rem;
		height: 0.64rem;
		padding-left: 0.14rem;
		opacity: 0;
	}
	.serchImg {
		position: absolute;
		bottom: 0.16rem;
		right: 0.4rem;
		z-index: 2;
		display: inline-block;
		width: 0.36rem;
		height: 0.36rem;
	}
	.serchWidth {
		width: 4.06rem;
		opacity: 1;
		z-index: 1;
	}
	.titleBox {
		height: 0.8rem;
		line-height: 1rem;
		font-size: 0.34rem;
		color: #222222;
		border-bottom: solid 0.01rem #CCCCCC;
	}
	.titleBox .titleSpan {
		display: block;
		float: left;
		height: 0.8rem;
		margin-right: 0.24rem;
		text-align: center;
		white-space: normal;
		overflow: hidden;
	}
	.titleBox .titleSlected {
		position: relative;
		display: block;
		float: left;
		height: 0.8rem;
		margin-right: 0.24rem;
		font-size: 0.36rem;
		font-weight: bold;
		text-align: center;
		white-space: normal;
	}
	.titleBg1 {
		display: block;
		position: absolute;
		bottom: -0.04rem;
		left: 0rem;
		z-index: 3;
		width: 100%;
		height: 0.08rem;
		background-image: linear-gradient(90deg, #FF4F87 0%, #FFBA80 100%);
		border-radius: 0.12rem;
	}
	.titleBg {
		display: none;
	}
</style>