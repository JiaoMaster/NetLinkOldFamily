<template>
	<view style="background-color: #f4f4f4;">
		<view style="">
			<u-tabs :list="list1" @click="click"></u-tabs>
		</view>
		<view v-if="token == ''">
			<u-empty
			        mode="message"	
			>
			</u-empty>
			<button @click="toLogin">点击登录</button>
		</view>
		<view v-show="indexList == null">
			<u-empty
			        mode="message"	
			>
			</u-empty>
		</view>
		
		<view class="movieBox" v-if='indexList != null'>
			<view v-for="(item, index) in indexList" :key="index">
			<view @click="toDetail(item.id)">
			<text class="text_size"  v-if="item.title != ''">{{item.title}}</text>
			<br></br>
			<text class="text_size"  v-if="item.title == ''">{{'来自'+item.username+'的语音'}}</text>
			<br></br>
			<text class="grid-text">{{timestampToTime(item.create_time)}}</text>
			<u-divider  lineColor="#ffaa7f"></u-divider>
			</view>
			</view>
	    </view>	
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				title: 'Hello',
				oldname:"",
				indexList:{},
				token:"",
				amount:10,
				page:1,
				loadStatu: false, // loading是否显示
				listStatus: 'loading', // loading状态
				contentText: {
									contentdown: "加载更多",
									contentrefresh: "正在加载...",
									contentnomore: "我是有底线的"
								},
								
				userId:"",
				oids:[],
				oldids:[],
				list1:[
					{
						name: '老人1',
					}, {
						name: '老人2',
					}
				],
				oldIndex:0,
				res:{}
			}
		},
		onShow() {
				let that = this
				this.amount = 10	
				var id = ""
				uni.getStorage({
					key: 'UserId',
					success: function(res) {
						that.userId = res.data
					}
				})
				uni.getStorage({
					key: 'token',
					success: function(res) {
						that.token = res.data
						if(res.data == ""){
							uni.showToast({
								title: '未登录，请登录',
								icon:'error',
								duration: 1000
							});
							that.question_list = null
							that.indexList = null
							return
						}
						uni.request({
							url:'https://link.netlinkold.cn/api/user/getOldByUid',
							method:'post',
							header: {
							'Authorization': 'Bearer ' + that.token,
							},
							success: (res)=> {
								
								if(res.data.oldId == null){
									that.indexList = null
									console.log(res)
									return
								}
								that.oldids = res.data.oldId.split('+')
									uni.request({
										url:'https://link.netlinkold.cn/api/user/get_user_name/' + that.oldids[0],
										method:'post',
										header: {
										'Authorization': 'Bearer ' + that.token,
										},
										success: (res)=> {
											id = res.data.name
											uni.request({
												
												url:'https://link.netlinkold.cn/api/question/get_question_by_id/'+id+'/'+that.page+'/'+that.amount,
												method:'post',
												header: {
												'Authorization': 'Bearer ' + that.token,
												},
												success: (res)=> {
													
													that.indexList = res.data.question_list
													that.listStatus = 'loading'
													that.loadStatu = false
													console.log(res)
												},
												fail(res) {
													console.log(res)
												}
											})
										},
										fail(res) {
											console.log(res)
										}
									})
								
							},
							fail(res) {
								console.log(res)
							}
						})
					},fail() {
							uni.showToast({
								title: '未登录，请登录',
								icon:'error',
								duration: 1000
							});
					}
				})
				
		},
		onLoad() {
			this.amount = 10
		},
		onReachBottom: function() { // 页面触底触发
					console.log('触底’')
					this.loadmore()
				},
		methods: {
			toLogin(){uni.navigateTo({
				url:"/pages/user/login"
			})},
			click(item) {
							let that = this
							this.amount = 10	
			                that.oldIndex = item.index
							var id = ""
							uni.request({
								url:'https://link.netlinkold.cn/api/user/getOldByUid',
								method:'post',
								header: {
								'Authorization': 'Bearer ' + that.token,
								},
								success: (res)=> {
										that.oldids = res.data.oldId.split('+')
										uni.request({
											url:'https://link.netlinkold.cn/api/user/get_user_name/' + that.oldids[item.index],
											method:'post',
											header: {
											'Authorization': 'Bearer ' + that.token,
											},
											success: (res)=> {
												id = res.data.name
												uni.request({
													url:'https://link.netlinkold.cn/api/question/get_question_by_id/'+id+'/'+this.page+'/'+this.amount,
													method:'post',
													header: {
													'Authorization': 'Bearer ' + that.token,
													},
													success: (res)=> {
														console.log(res)
														that.res = res
														if( res.data.question_list != null ){
															that.indexList = res.data.question_list
															that.listStatus = 'loading'
															that.loadStatu = false
														}else{
															that.indexList = null
														}
													},
													fail(res) {
														that.indexList = null
														console.log(res)
													}
												})
												console.log(id)
											},
											fail(res) {
												console.log(res)
											}
										})
									
								},
								fail(res) {
									console.log(res)
								}
							})
							
			            },
			toDetail(id){
				uni.navigateTo({
					url:"./chatdetail?id="+id,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			timestampToTime (time) {// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
				time = time.replace("T"," ")
				time = time.replace("Z"," ")
				return time
			},
			loadmore() {
				
				let that = this
				if(that.amount >= 70){
					return
				}
				that.loadStatu = true
				that.amount+=10;
				that.listStatus = 'loading'
				var id = ""
				uni.request({
					url:'https://link.netlinkold.cn/api/user/getOldByUid',
					method:'post',
					header: {
					'Authorization': 'Bearer ' + that.token,
					},
					success: (res)=> {
							that.oldids = res.data.oldId.split('+')
							uni.request({
								url:'https://link.netlinkold.cn/api/user/get_user_name/' + that.oldids[that.oldIndex],
								method:'post',
								header: {
								'Authorization': 'Bearer ' + that.token,
								},
								success: (res)=> {
									id = res.data.name
									uni.request({
										url:'https://link.netlinkold.cn/api/question/get_question_by_id/'+id+'/'+that.page+'/'+that.amount,
										method:'post',
										header: {
										'Authorization': 'Bearer ' + that.token,
										},
										success: (res)=> {
											console.log(res)
											that.res = res
											if( res.data.question_list != null ){
												that.indexList = res.data.question_list
												that.listStatus = 'loading'
												that.loadStatu = false
											}else{
												that.indexList = null
											}
										},
										fail(res) {
											that.indexList = null
											console.log(res)
										}
									})
									console.log(id)
								},
								fail(res) {
									console.log(res)
								}
							})
						
					},
					fail(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.movieBox {
		width:94%;
		margin: 0 auto;
		margin-top: 5px;
		background: #ffffff;
		border-radius: 40rpx 40rpx 40rpx 40rpx;
	}
	.u-page{
		margin-left: 10px;
		margin-right: 10px;
	}
	.border{
			 margin-left: 10px;
			 margin-right: 10px;
	}
	.text_size{
		color: #696969;
		font-size: 30px;
	}
	.grid-text{
		color: #A9A9A9;
	}
</style>
