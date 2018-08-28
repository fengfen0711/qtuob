<template>
	<div class="my_body">
		<div class="titleBoxWZ">
			<div class="titleBoxW">
				<div class="titleBox clearFloat">
					<span ref="title" v-for="(title,index) in titleList" :id="title.typeId" class="titleSlected">
						{{title.name}}
					</span>
					<b class="titleBg" id="titleBg1"></b>
				</div>
				<div class="serchBox" v-show="serchShow"></div>
				<form action="javascript:return true;">
					<input @keyup.13=serchInput() type="search" ref="input1" v-model="serchText" class="serchText" :class="{serchWidth:serchShow}" @click="serchInput" @blur="serchHide">
					<img src="/static/imgNew/SearchGlyph3.png" class="serchImg" @click="serchInput" />
				</form>
			</div>
		</div>
		<div class="scrollDiv" ref="viewBox">
			<Scroll :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomPullText='bottomText' :auto-fill="false" @bottom-status-change="handleBottomChange" ref="loadmore">
				<div class="products">
					<div class="clearFloat proContent" :class="art.atcStyle | layout" v-for="art in artList" @click="godetail(art.articleId)">
						<img :src="art.picUrl" class="disImg" />
						<div class="disText">
							<p class="disTitle"><span>{{art.title}}</span></p>
							<p class="disTitleDes">{{art.actDesc}}</p>
							<p class="disTitleDes"><span>{{art.createTime}}</span><span class="sign" v-for="tag in art.tagList">{{tag.name}}</span></p>
						</div>
					</div>
					<p class="noMore" v-show="noMoreShow">没有更多了~</p>
					<p class="noCon" v-show="noShow">没有搜索到任何内容哦~</p>
					<div v-show="loading" slot="bottom" class="loading">
						加载中...
					</div>
				</div>
			</Scroll>
		</div>
	</div>
</template>

<script>
	import Scroll from '@/components/scroll.vue'
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
				tagCode: '',
				desPath: this.$route.path,
				desPathMain: '',
				serchShow: false,
				serchText: '',
				artList: [],
				titleId: '',
				titlePath: '',
				counte: 1,
				num: 10,
				scrollHeight: 0,
                scrollTop: 0,
                containerHeight: 0,
                loading: false,
                allLoaded: false,
                bottomText: '上拉加载更多...',
                bottomStatus: '',
                pageNo: 1,
                totalCount: '',
            }
		},
		created() {
			this.titleAjax()
			this.common.noShare();
		},
		components: {
			Scroll: Scroll
		},
		methods: {
			_scroll: function(ev) {
				ev = ev || event;
				ev.preventDefault();
        		ev.stopPropagation();
				this.scrollHeight = this.$refs.innerScroll.scrollHeight;
				this.scrollTop = this.$refs.innerScroll.scrollTop;
				this.containerHeight = this.$refs.innerScroll.offsetHeight;
			},
			loadBottom: function() {
				this.loading = true;
				var artInfo = {
					"search": this.serchText,
					"typeId": this.titleId,
					"pageIndex": this.counte,
					"pageSize": this.num,
				}
				console.log(artInfo)
				this.$http.post(this.$store.state.link + "/cnt/atc/selArticleList", artInfo)
				.then(res => {
					console.log(res.data)
					if(res.data.code == "SYS_S_000") {
						this.$nextTick(() => {
							let arr = res.data.output;
							this.artList = this.artList.concat(arr);
							if(res.data.output.length < this.num) {
								this.loading = false;
								this.allLoaded = true;
								this.noMoreShow = true;
								this.serchText = ""
								return;
							}else{
								this.counte++;
							}
							done()
						})
					}
				}, (response) => {
					console.log('error');
				});
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			getList(a) {
				var artInfo = {
					"search": this.serchText,
					"typeId": this.titleId,
					"pageIndex": 1,
					"pageSize": this.num,
				}
				console.log(artInfo)
				this.$http.post(this.$store.state.link + "/cnt/atc/selArticleList", artInfo)
					.then(res => {
						console.log(res.data)
						if(res.data.code == "SYS_S_000") {
							this.artList = res.data.output.slice(0, this.num);
							if(res.data.output.length == 0) {
								this.allLoaded = true;
								this.noShow = true;
								this.noMoreShow = false;
								this.serchText = ""
							} else if(res.data.output.length == 10) {
								this.counte = 2;
								this.noMoreShow = false;
								this.noShow = false;
								this.allLoaded = false;
							} else if(res.data.output.length < 10) {
								this.allLoaded = true;
								this.noMoreShow = true;
								this.noShow = false;
								this.serchText = ""
							}
							if(a == 1) {
								this.serchShow = false;
							}
						}
					}, res => {
						console.log(res.data)
					})
			},
			titleAjax() {
				var titleInfo = {
					"parTypeId": "0-1"
				}
				this.$http.post(this.$store.state.link + "/cnt/atc/queryArticleType", titleInfo)
					.then(res => {
						//console.log(res.data)
						if(res.data.code == "SYS_S_000") {
							this.titleList.push(res.data.output.articleTypeRespList[0]);
							this.titleId = this.titleList[0].typeId
							this.getList()
						}
					}, res => {
						console.log(res.data)
					})
			},
			serchInput() {
				if(this.serchText == "") {
					if(this.serchShow) {
						this.getList(1)
					} else {
						this.serchShow = true
					}
				} else {
					this.getList(1)
					this.$refs.input1.blur();
				}
			},
			serchHide() {
				this.$refs.input1.blur();
				this.serchShow = false;
			},
			godetail(id) {
				//console.log(id)
				this.$router.push('/artDetail?detailId=' + id)
			},
		},
		watch: {
			artList: function() {
				window.scroll(0, 0);
			},
		},
		filters: {
			layout: function(value) {
				if(value == "U") {
					return value = 'imgUpTextDown'
				} else if(value == "D") {
					return value = 'textUpImgDown'
				} else if(value == "L") {
					return value = 'imgLeftTextRight'
				} else if(value == "R") {
					return value = 'textLeftImgRight'
				}
			}
		},
	}
</script>

<style scoped="scoped">
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
	textarea::-webkit-input-placeholder, input::-webkit-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
	}
	input:-ms-input-placeholder {
		color: #B2B2B2;
		font-weight: 100;
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
	.noCon {
		width: 100%;
		margin-top: 1rem;
		font-size: 0.332rem;
		color: #E73748;
		text-align: center;
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
		position: relative;
		height: 0.8rem;
		line-height: 1rem;
		font-size: 0.34rem;
		color: #222222;
		border-bottom: solid 0.01rem #CCCCCC;
	}
	.titleBox span {
		display: block;
		float: left;
		/*width: 0.88rem;*/
		margin-right: 0.24rem;
		text-align: center;
		white-space: normal;
		overflow: hidden;
	}
	.titleBox span.titleSlected {
		font-size: 0.36rem;
		font-weight: bold;
	}
	.titleBg {
		position: absolute;
		bottom: -0.04rem;
		left: -0.06rem;
		z-index: 3;
		width: 1.2rem;
		height: 0.08rem;
		background-image: linear-gradient(90deg, #FF4F87 0%, #FFBA80 100%);
		border-radius: 0.1rem;
	}
	.products {
		width: 6.86rem;
		padding: 0 0.32rem;
		background: #FFFFFF;
	}
	.proContent {
		position: relative;
		margin-top: 0.32rem;
	}
	.imgUpTextDown {
		height: 4.62rem;
	}
	.imgUpTextDown .disImg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		display: block;
		width: 6.86rem;
		height: 3.2rem;
		margin: 0 auto;
	}
	.imgUpTextDown .disText {
		position: absolute;
		top: 3.32rem;
		left: 0;
		z-index: 1;
	}
	.textUpImgDown {
		height: 4.62rem;
	}
	.textUpImgDown .disImg {
		position: absolute;
		top: 1.4rem;
		left: 0;
		z-index: 1;
		display: block;
		width: 6.86rem;
		height: 3.2rem;
		margin: 0 auto;
	}
	.textUpImgDown .disText {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.imgUpTextDown .disTitle, .textUpImgDown .disTitle {
		width: 6.86rem;
		height: 0.48rem;
		line-height: 0.48rem;
		margin-top: 0.02rem;
		font-size: 0.32rem;
		font-weight: bold;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.imgUpTextDown .disTitleDes, .textUpImgDown .disTitleDes {
		width: 6.86rem;
		height: 0.4rem;
		line-height: 0.4rem;
		font-size: 0.24rem;
		color: #555555;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.sign {
		margin-left: 0.2rem;
		color: #E73748;
	}
	.imgLeftTextRight {
		height: 2.14rem;
	}
	.imgLeftTextRight .disImg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		display: block;
		width: 2.14rem;
		margin: 0 auto;
	}
	.imgLeftTextRight .disText {
		position: absolute;
		top: 0;
		left: 2.76rem;
		z-index: 1;
	}
	.textLeftImgRight {
		height: 2.14rem;
	}
	.textLeftImgRight .disImg {
		position: absolute;
		top: 0;
		left: 4.72rem;
		z-index: 1;
		display: block;
		width: 2.14rem;
		height: 2.14rem;
		margin: 0 auto;
	}
	.textLeftImgRight .disText {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.imgLeftTextRight .disTitle, .textLeftImgRight .disTitle {
		width: 4.1rem;
		height: 0.8rem;
		line-height: 0.42rem;
		margin-top: 0.02rem;
		font-size: 0.32rem;
		margin-bottom: 0.16rem;
		font-weight: bold;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.imgLeftTextRight .disTitleDes, .textLeftImgRight .disTitleDes {
		width: 4.1rem;
		/*height: 0.64rem;*/
		line-height: 0.32rem;
		margin-bottom: 0.22rem;
		font-size: 0.24rem;
		color: #555555;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.noMore {
		margin-top: 1rem;
		height: 1rem;
		font-size: 0.24rem;
		color: #CCCCCC;
		text-align: center;
	}
	.scrollDiv {
		position: absolute;
		left: 0;
		top: 0.8rem;
		width: 100%;
		height: 100%;
		padding-bottom: 1rem;
		background: #FFFFFF;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
	}
</style>