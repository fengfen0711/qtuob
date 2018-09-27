<template>
	<div class="scrollDiv">
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
</template>

<script>
	import Scroll from '@/components/scroll.vue'
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		name: 'recommend',
		data() {
			return {
				id:this.$route.query.typeId,
				artList:[],
				serchList:'',
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
                noMoreShow: false,
				noShow: false,
				serchText: '',
				serchResult:{},
			}
		},
		created() {
			if (this.id) {
				this.getList(this.id)
			}
		},
		components: {
			Scroll: Scroll
		},
		computed: {
			listenstage() {
				return this.$store.state.serchInfo;
			}
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
					"typeId": this.id,
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
					"typeId": this.id,
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
								this.serchResult = {
									'serchShow': this.serchShow,
									'serchText': this.serchText
								}
								this.$emit('serchResult',this.serchResult);
							}
						}
					}, res => {
						console.log(res.data)
					})
			},
			godetail(id){
				console.log(id)
				this.$router.push('/artDetail?detailId='+id)
			},
		},
		watch:{
			listenstage : function (ov,nv) {
				if (this.$store.state.serchInfo.titlePath == "recommend") {
					this.id = this.$store.state.serchInfo.titleId;
					if (this.$store.state.serchInfo.serchId == 1) {
						this.serchText = this.$store.state.serchInfo.serchText;
						this.getList(1)
					}else{
						this.serchText = this.$store.state.serchInfo.serchText;
						this.getList()
					}
				}
			},			
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
		}
	}
</script>

<style scoped="scoped">
	.clearFloat:after {
		height: 0;
		display: block;
		overflow: hidden;
		visibility: hidden;
		clear: both;
		content: "";
	}
	.noCon {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		margin-top: 1rem;
		font-size: 0.332rem;
		color: #E73748;
		text-align: center;
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
		background: rgba(0,0,0,0.03);
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
		background: rgba(0,0,0,0.03);
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
		height: 2.14rem;
		background: rgba(0,0,0,0.03);
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
		background: rgba(0,0,0,0.03);
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
		line-height: 0.34rem;
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
		line-height: 1rem;
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
	.products {
		padding-left: 0.3rem;
		padding-bottom: 0.5rem;
	}
	.proContent{
		margin-top: 0.24rem;
		padding-right: 0.3rem;
		overflow: hidden;
	}
	.loading {
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
	}
	.noCon {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		margin-top: 1rem;
		font-size: 0.332rem;
		color: #E73748;
		text-align: center;
	}
</style>