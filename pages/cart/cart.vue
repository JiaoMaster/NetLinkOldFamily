<template>
	<view>
		<u-sticky>
			<u-subsection :list="list" @change="sectionChange" :current="current"></u-subsection>
		</u-sticky>
		<view v-if="token == ''">
			<u-empty
			        
			>
			</u-empty>
			<button @click="toLogin">点击登录</button>
		</view>
		<view v-show="goods == null">
			<u-empty
			        
			>
			</u-empty>
		</view>
		<view v-show="current == 0" class="buy" >
			<view class="empty" v-if="show==false">
				<image
					src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F82%2F40%2F596fa6dc00bb4_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633499781&t=d37222e32213957ddbdd01d62e071309"
					mode="widthFix" style="width: 400rpx;"></image>
				<view class="empty-text">空空如也的愿望</view>
			
			</view>
			<view v-if="show==true">
				<scroll-view :scroll-y="true"  :style="'height: '+ pHeight +'px;'" bindscrolltolower="onReachBottom" lower-threshold="50">
				<view class="goods-detail" v-for="(item,index) in goods" :key="index">
						<view class="detail-left">
							<view class="goods-left">
								<checkbox-group @change="selected(item)">
									<label>
										<checkbox class="selected" color="#555555" :checked="item.flag" /><text></text>
									</label>
								</checkbox-group>
								<image :src="item.cover" style="width: 150rpx;height: 150rpx;padding-left: 20rpx;"  @click="toOrder(item.id)"></image>
							</view>
							<view class="size"  @click="toOrder(item.id)">
									<text style="font-size: 30rpx;padding-right: 20rpx;">{{item.name}}</text>
								<text class="goods-price">积分{{item.amount}}</text>
							</view>
						</view>
						<view class="detail-right"  @click="toOrder(item.id)">
							<text class="num">{{item.number}}</text>
							<text  class="add">件</text>
						</view>
					</view>
				
				</scroll-view>
				</view>
			
			<view class="end" style="height:100rpx">
				<view class="end-left">
					<checkbox-group @change="selectgoods()">
						<label>
							<checkbox :checked="allchecked" />全选
						</label>
					</checkbox-group>
					<view>
						总计：<text style="color: #f00;font-weight: bold;">积分 {{totalPrice}}</text>
					</view>
				</view>
				<view class="end-right" @click="unApply">
					拒绝({{totalNum}})
				</view>
				<view class="end-right2" @click="Pay">
					同意({{totalNum}})
				</view>
			</view>
		</view>
		<view v-show="current == 1">
			<u-list
				@scrolltolower="scrolltolower"
			>
				<u-list-item
					v-for="(item, index) in order"
					:key="index"
				>
				<view @click="toOrder(item.id)">
					<u-cell
						:title="item.name"
						customStyle="{'font-size': '12px'}"
					>
						<text slot="label" style="font-size: 12px;color: #fd550d;">{{item.amount + " 积分"}}</text>
						<u-tag
						    		    :text="Apply(item.ifApply)"
						    		    plain
						    		    size="mini"
						    		    :type="color(item.ifApply)"
										slot="value"
										shape="circle"
						    		>
						</u-tag>
						<u-avatar
							slot="icon"
							shape="square"
							size="50"
							:src="item.cover"
							customStyle="margin: -3px 5px -3px 0"
						></u-avatar>
					</u-cell>
				</view>
				</u-list-item>
			</u-list>
		</view>
		<u-popup :show="upshow" mode="bottom" :closeable="true" @close="close">
			<view>
				<view class="center ptb-30" style="height: 80rpx;line-height:80rpx;font-size:larger;margin-left: 30rpx;background-color: lightgray;border:1px,solid;border-radius: 30%;width:270rpx;margin-top:5rpx ;text-align: center;">选择扣除方式</view>
				<view style="margin-left: 15px;margin-top: 10px;">
					<u-radio-group v-model="payType" placement="column">
						<u-radio name= "2"  label="方式1" :customStyle="{marginBottom: '8px'}">
						</u-radio>
						<u-radio name= "3"  label="方式2" :customStyle="{marginBottom: '8px'}">
						</u-radio>
						<u-radio name= "1"  label="方式3" :customStyle="{marginBottom: '8px'}"> 
						</u-radio>
					</u-radio-group>
				</view>
				<view style="margin-left: 15px;">
					<text>选择发货地址，无地址请先前往用户页面添加</text>
					<u-radio-group 
						 placement="column"
					    iconPlacement="left">
						<u-radio activeColor="red" :customStyle="{marginBottom: '8px'}"
								  v-for="(item, index) in adList"
								  :key="index"
								  :label="'地址id-'+item.id+'：'+item.address+' '+item.name+' '+item.phone"
								  :name="item.name"
								  @change="rChange(item.id)">
								  </u-radio>
					</u-radio-group>
				</view>
				
				<view>
					<u-button type="primary" @click="firm" style="border-radius:10%;margin:10rpx;font-size: larger;">确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { ref } from "vue"
	export default {
		data() {
			return {
				show: true,
				allchecked: false,
				checked: false,
				goods: [],
				order: {},
				token: "",
				amount: "",
				payArr:[],
				payType:1,
				page: 2,
				id:"",//都没定义你这直接赋值
				list: ['未决定', '兑换历史'],
				// 或者如下，也可以配置keyName参数修改对象键名
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				current: 0,
				upshow:false,
				pHeight:"",
				userId:"",
				adId:"",
				adList:[]
			}
		},
		onReachBottom: function() { // 页面触底触发
					if(this.current == 1){
						return
					}
					
					this.loadmore()
				},
		onLoad() {
			let that = this
			uni.getSystemInfo({
							success: function (res) {
								console.log(res.screenHeight)
								that.pHeight = res.screenHeight - 250
							}
						})
		},		
		methods: {
			toLogin(){uni.navigateTo({
				url:"/pages/user/login"
			})},
			rChange(e){
				this.adId = e
				console.log(this.adId)
			},
			color(e){
				if(e == 0){
					return "warning"
				}else if(e == 1){
					return "error"
				}else{
					return "success"
				}
			},
			close() {
							this.upshow =false
						},
			sectionChange(index) {
							console.log(index)
							this.current = index;
							this.reload()
						},
			scrolltolower() {
				console.log("触底")
				this.loadmore()
			},
			
			loadmore(){
				let that = this
				uni.request({
				      url:"https://link.netlinkold.cn/api/user/get_user_info",
				      method:'POST',
				      header: {
				      'Authorization': 'Bearer ' + that.token,
				      },
				      success(res) {
				        that.id = res.data.info.userid
				        uni.request({
				        	url: "https://link.netlinkold.cn/api/order/GetList/"+that.page+"/10/" + that.id,
				        	method: 'POST',
				        	header: {
				        		'Authorization': 'Bearer ' + that.token
				        	},
				        	data: {
				        		amount: that.amount,
				        		page: that.page,
				        		id: that.id,
								now: that.current
				        	},
				        	success(res) {
								that.page += 1
				        		that.order = that.order.concat(...res.data.orderList)
				        		var arr = that.order
				        		that.goods = arr.filter(p => p.ifApply == 0)
				        		
								that.goods.map(item => {
									item.flag = false
								})
								that.show = true
				        	},
				        	fail(res) {
				        		console.log(res.data)
								
				        	}
				        })
				        
				       }
				      
				     })
			},
			change(e) {
				console.log(e)
			},
			Apply(e){
				if(e == 0){
					return "待查看"
				}else if(e == 1){
					return "不同意"
				}else{
					return "已同意"
				}
			},
			selected(item) {
				item.flag = !item.flag
				if (!item.flag) {
					this.allchecked = false
				} else {
					const a = this.goods.forEach((item) => {
						return item.flag === true
					})
					if (a) {
						this.allchecked = true
					} else {
						this.allchecked = false
					}
				}
			},
			selectgoods() {
				this.allchecked = !this.allchecked
				if (this.allchecked) {
					this.goods.map(item => {
						this.checked = true
						item.flag = true
					})
				} else {
					this.checked = false
					this.goods.map(item => {
						item.flag = false
					})
				}
			},
			reduce(item) {
				let num = item.number
				if (num > 1) {
					num -= 1
				} else if (num = 1) {
					uni.showToast({
						title: "该宝贝不能减少了哟~"
					})
				}


				item.number = num
			},
			add(item) {
				let num = item.number
				item.number = num + 1
			},
			unApply(){
				
			},
			Pay(){
				if (this.totalNum == 0){
					uni.showToast({
						title: '一件还没选呢！！！',
						icon:"error",
						duration: 500
					});
					return
				}
				this.upshow = true
				this.getAd()
			},
			firm(){
				let that = this
				const arr = this.goods.filter(e => e.flag == true)
				let pay = Number(this.payType)
				uni.request({
					url:"https://link.netlinkold.cn/api/order/PayAllOrder/"+that.adId,
					method:'POST',
					header: {
					'Authorization': 'Bearer ' + that.token,
				
					},
					data:{
						orders:arr,
						payType:pay
					},
					success(res) {
						console.log(res)
						if(res.data.code == 404){
							uni.showToast({
								title: '支付失败',
								icon:"error",
								duration: 500
							});
							
						}else{
							uni.showToast({
								title: '支付成功，在历史单查看',
								duration: 500
							});
							that.reload()
						}
					},
					fail(res) {
						console.log(res)
					}
				})
				this.upshow = false
			},
			getAd(){
				let that = this
				uni.request({
					url:"https://link.netlinkold.cn/api/address/getList/"+that.userId,
					method:'POST',
					header: {
					'Authorization': 'Bearer ' + that.token,
				
					},
					data:{
						
					},
					success(res) {
						
						that.adList = res.data.addressList
						console.log(that.adList)
						that.adId = res.data.addressList[0].id
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			toOrder(id){
					uni.navigateTo({
						url:"/pages/cart/orderDetail?id="+id
					})
			},
			reload(){
				let that = this
				that.page = 2
				this.allchecked = false
				this.checked = false
				uni.getStorage({
					key: 'token',
					success(res) {
						that.token = res.data //这里也是 这里直接data看输出看出来的
						console.log(res.data)
						uni.request({
						      url:"https://link.netlinkold.cn/api/user/get_user_info",
						      method:'POST',
						      header: {
						      'Authorization': 'Bearer ' + that.token,
						      },
						      success(res) {
						       console.log(res.data)
						        that.id = res.data.info.userid
						        uni.request({
						        	url: "https://link.netlinkold.cn/api/order/GetList/1/10/" + that.id,
						        	method: 'POST',
						        	header: {
						        		'Authorization': 'Bearer ' + that.token
						        	},
						        	data: {
						        		amount: that.amount,
						        		page: that.page,
						        		id: that.id,
										now: that.current
						        	},
						        	success(res) {
						        		console.log(res.data)
						        		console.log(that.id)
						        		that.order = res.data.orderList
										var arr = res.data.orderList
										that.goods = arr.filter(p => p.ifApply == 0)
										
										that.goods.map(item => {
											item.flag = false
										})
										that.show = true
						        	},
						        	fail(res) {
						        		console.log(res.data)
										
						        	}
						        })
						        
						       }
						      
						     })
					}
				})
			}
		},
		computed: {
			totalNum() {
				let totalNum = 0;
				this.goods.map(item => {
					item.flag ? totalNum += item.number : totalNum += 0
				})
				return totalNum
			},
			totalPrice() {
				let totalPrice = 0;
				this.goods.map(item => {
					item.flag ? totalPrice += item.number * item.amount : totalPrice += 0
				})
				return totalPrice
			}
		},
		mounted() {
			uni.getStorage({
				key:"token",
				success(res) {
					if(res.data == "")
					{
						uni.showToast({
							title: '未登录，请登录',
							icon:'error',
							duration: 1000
						});
					}
				},
				fail() {
					uni.showToast({
						title: '未登录，请登录',
						icon:'error',
						duration: 1000
					});
				}
			})
		},
		onPullDownRefresh() {
			let that = this
			that.page = 2
			this.allchecked = false
			this.checked = false
			
			uni.getStorage({
				key: 'token',
				success(res) {
					that.token = res.data //这里也是 这里直接data看输出看出来的
					console.log(res.data)
					uni.request({
					      url:"https://link.netlinkold.cn/api/user/get_user_info",
					      method:'POST',
					      header: {
					      'Authorization': 'Bearer ' + that.token,
					      },
					      success(res) {
					       console.log(res.data)
					        that.id = res.data.info.userid
					        uni.request({
					        	url: "https://link.netlinkold.cn/api/order/GetList/1/10/" + that.id,
					        	method: 'POST',
					        	header: {
					        		'Authorization': 'Bearer ' + that.token
					        	},
					        	data: {
					        		amount: that.amount,
					        		page: that.page,
					        		id: that.id,
									now: that.current
					        	},
					        	success(res) {
					        		console.log(res.data)
					        		console.log(that.id)
					        		that.order = res.data.orderList
									var arr = res.data.orderList
									that.goods = arr.filter(p => p.ifApply == 0)
									
									that.goods.map(item => {
										item.flag = false
									})
									that.show = true
					        	},
					        	fail(res) {
					        		console.log(res.data)
									
					        	}
					        })
					        
					       }
					      
					     })
				}
			})
			uni.stopPullDownRefresh()
		},
		onShow() {
			
			let that = this
			uni.getStorage({
				key: 'UserId',
				success: function(res) {
					that.userId = res.data
				}
			})
			that.page = 2
			this.allchecked = false
			this.checked = false
			uni.getStorage({
				key: 'token',
				success(res) {
					that.token = res.data 
					if(that.token == ""){
						that.order = null 
						that.goods = null
						return
					}
					uni.request({
					      url:"https://link.netlinkold.cn/api/user/get_user_info",
					      method:'POST',
					      header: {
					      'Authorization': 'Bearer ' + that.token,
					      },
					      success(res) {
					        that.id = res.data.info.userid
					        uni.request({
					        	url: "https://link.netlinkold.cn/api/order/GetList/1/10/" + that.id,
					        	method: 'POST',
					        	header: {
					        		'Authorization': 'Bearer ' + that.token
					        	},
					        	data: {
					        		amount: that.amount,
					        		page: that.page,
					        		id: that.id,
									now: that.current
					        	},
					        	success(res) {
									if(res.data.orderList.length == 0){
										that.order = null
										that.goods = null
										return
									}
					        		that.order = res.data.orderList
					        		var arr = res.data.orderList
					        		that.goods = arr.filter(p => p.ifApply == 0)
					        		
									that.goods.map(item => {
										item.flag = false
									})
									that.show = true
					        	},
					        	fail(res) {
					        		console.log(res.data)
									
					        	}
					        })
					        
					       }
					      
					     })
				},
				fail() {
					if(this.token == ""){
						uni.navigateTo({
							url:"/pages/user/login"
						})
						return
					}
				}
			})
		}
	}
</script>

<style lang="scss">
	.buy{
		min-height: 250px;
	}
	.goods {
		line-height: 100rpx;
		background-color: #FFFFFF;

		&-detail {
			display: flex;
			padding: 30rpx 15rpx 30rpx 30rpx;
			background-color: #fff;
			justify-content: space-between;
			border-bottom: 5rpx solid #F1F1F1;
			align-items: center;
			height: 20%;

			.detail-left {
				display: flex;

				.goods-left {
					display: flex;
					align-items: center;
				}
			}

			.size {
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				margin-left: 30rpx;

				.goods-price {
					font-size: 30rpx;
					color: #F44545;

				}
			}

			.detail-right {
				text {
					width: 50rpx;
					line-height: 50rpx;
					text-align: center;
					display: inline-block;
					background-color: #F7F7F7;
					margin-right: 7rpx;
				}

				.add {
					color: #FA4305;
					border-radius: 10rpx 30rpx 30rpx 10rpx;
					margin-right: 20rpx;
				}

				.subtract {
					border-radius: 30rpx 10rpx 10rpx 30rpx;
				}
			}
		}
	}

	.empty {

		position: relative;
		top: 220rpx;
		text-align: center;
		display: flex;
		align-items: center;
		flex-direction: column;

		&-text {
			color: #808080;
			margin-bottom: 50rpx;
		}

		&-button {
			width: 300rpx;
			height: 90rpx;
			color: orange;
			border: 1rpx solid orange;
			text-align: center;
			line-height: 90rpx;
			border-radius: 48rpx;
		}
	}

	.end {
		width: 98%;
		height: 50rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0rpx;
		left: 0;
		display: flex;
		align-items: center;
		&-left {
			width: 70%;
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;

			.end-flex {
				display: flex;
				align-items: center;
			}
		}

		&-right {
			width: 30%;
			line-height: 90rpx;
			background-color: #F44545;
			text-align: center;
			color: #fff;
			border-radius: 5%;
		}
		&-right2 {
			width: 30%;
			line-height: 90rpx;
			background-color: #1380f4;
			text-align: center;
			color: #fff;
			border-radius: 5%;
		}
	}
	.u-primary-hover {
			background-color: blue;
		}
	
	.u-radio {
			display: flex;
			flex-direction: row-reverse;
	}

	.u-radio-group {
		width: 100%;
	}

	.u-radio__label {
		width: 100%;
	}
</style>
