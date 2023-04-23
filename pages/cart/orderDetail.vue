<template>

	<view class="back">

		<view class="orderBox">
			<view style="margin-left: 10px;margin-top: 0px;">
				<u-steps :current="currentId()" direction="column" :dot="true" >
						<u-steps-item title="已创建" iconSize="20" :desc="'id：'+orderDetail.id">
						
						</u-steps-item>
						
						<u-steps-item :title="'发往 '+addressDetail.address" :desc="addressDetail.name+' '+addressDetail.phone" iconSize="20" v-if="orderDetail.ifPay == 1"></u-steps-item>
						<u-steps-item title="已完成" iconSize="100" v-if = "orderDetail.ifPay == 1" :desc="'兑换方式：'+payType(orderDetail.payType)"></u-steps-item>
						<u-steps-item :error="true" title="未同意" :desc="'家属理由：'+orderDetail.unapplyReason" iconSize="20" v-if="reason != ''"></u-steps-item>
					</u-steps>
			</view>
		</view>
		<u-gap bgColor="#e8e8e8"></u-gap>
		<view class="comBox" @click="toCom(orderDetail.commodityId)">
			<view class="movieList">
				<image :src="orderDetail.cover" class="movieImg"></image>
				<text class="moiveRateT">{{orderDetail.name}}</text>
				<br/>
				<text class="moiveRateT">{{"总分："+orderDetail.amount}}</text>
				<br/>
				<text class="moiveRateT">{{"件数："+orderDetail.number}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"订单",
				orderDetail:{},
				addressDetail:{},
				token:"",
				reason:"",
				id:""
			}
		},
		onLoad(option) {
			this.id = option.id
			
		},
		onShow() {
			let that = this
			uni.getStorage({
				key:"token",
				success(res) {
					that.token = res.data
					uni.request({
						url:"https://link.netlinkold.cn/api/order/GetDetail/"+that.id,
						method:"POST",
						header: {
						'Authorization': 'Bearer ' + that.token,
						},
						success(res) {
							console.log(res.data.order)
							that.orderDetail = res.data.order
							if(that.orderDetail.unapplyReason != null){
								that.reason = that.orderDetail.unapplyReason
							}
							that.getAddress()
						},
						fail() {
							console.log(123)
						}
					})
				}
			})
			
		},
		onPullDownRefresh() {
			let that = this
			uni.getStorage({
				key:"token",
				success(res) {
					that.token = res.data
					uni.request({
						url:"https://link.netlinkold.cn/api/order/GetDetail/"+that.id,
						method:"POST",
						header: {
						'Authorization': 'Bearer ' + that.token,
						},
						success(res) {
							console.log(res.data.order)
							that.orderDetail = res.data.order
							if(that.orderDetail.unapplyReason != null){
								that.reason = that.orderDetail.unapplyReason
							}
							that.getAddress()
						},
						fail() {
							console.log(123)
						}
					})
				}
			})
			uni.stopPullDownRefresh()
		},
		mounted() {
			
		},
		methods: {
			payType(e){
				if(e == 1){
					return "银行卡"
				}else if(e == 2){
					return "微信支付"
				}else{
					return "支付宝"
				}
			},
			currentId(){
				if( this.orderDetail.ifPay == 1){
					return 3
				}
				if(this.orderDetail.ifPay == 0){
					return 1
				}
			},
			getAddress(){
				var that = this
				uni.request({
					url:"https://link.netlinkold.cn/api/address/get/"+that.orderDetail.addressId,
					method:"POST",
					header: {
					'Authorization': 'Bearer ' + that.token,
					},
					success(res) {
						that.addressDetail = res.data.address
					}
				})
			}
		},
		components:{
			
		}
	}
</script>

<style lang="scss">
	.back{
		min-height: 600px;
		background-color: #e8e8e8;
		width: 100%;
		min-height: 100vh;
		background-size: 100% 100%;
	
	}
	.orderBox{
		background-color: #ffffff;
		border-radius: 0rpx 0rpx 40rpx 40rpx;
	}
	.comBox{
		padding-top: 2px;
		background-color: #ffffff;
		border-radius: 40rpx 40rpx 40rpx 40rpx;
	}
	.slot-icon {
			width: 30px;
			height: 30px;
			background-color: $u-warning;
			border-radius: 100px;
			font-size: 12px;
			color: #fff;
			line-height: 30px;
			text-align: center;
		}
		.moiveRateT {
			margin-left: 5px;
			color: #000000;
		}
		.movieList {
			background-color: #ffffff;
			/* height: 300rpx; */
			margin-top: 8px;
			border-radius: 15rpx 15rpx 15rpx 15rpx;
			width: 100%;
		}
		.movieImg {
			padding-left: 2px;
			padding-right: 2px;
			width: 99%;
			height: 300px;
			border-radius: 20rpx;
		}
</style>