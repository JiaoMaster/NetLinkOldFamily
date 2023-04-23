<template>
	<view class="content">
		<u-toast ref="uToast"
				 ></u-toast>
		<view class="logo">
			
			<image src="../../static/icon/NetLinkOld(1).png" mode=""></image>
		</view>
		<view class="login">
			<view class="login-item">
				<image class="img" src="../../static/login_2.png" mode=""></image>
				<input v-model="username" type="text" placeholder-class="phcolor" placeholder="用户名">
			</view>
			<view class="login-item">
				<image class="img" src="../../static/mima.png" mode=""></image>
				<input v-model="password" password type="text" placeholder-class="phcolor" placeholder="密码">
			</view>
			<view class="login-item">
				<image class="img" src="../../static/mima.png" mode=""></image>
				<input v-model="repassword"password type="text" placeholder-class="phcolor" placeholder="再次输密码">
			</view>
			<view class="btnv">
				<view class="btn" @click="signup()">注册</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data(){
			return{
				username: "",
				password: "",
				repassword: "",
				title:"注册",
				warn:{
					type: 'error',
					icon: false,
					title: '两次输入的密码不一致',
					message: "两次输入的密码不一致",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
				},
				warn2:{
					type: 'error',
					icon: false,
					title: '账号重复，请更改',
					message: "账号重复，请更改",
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
				},
			}
		},
		components:{},
		methods: {
			signup(){
				if(this.password != this.repassword){
					this.$refs.uToast.show({
						...this.warn,
					})
					return
				}
				uni.request({
				url:'https://link.netlinkold.cn/register',
				method: 'POST',
				data:{
					username:this.username,
					password:this.password
				},
				success:(res)  =>{
					if(res.data.code == "200"){
						uni.navigateBack({
							delta:1,
						})
					}else{
						this.$refs.uToast.show({
							...this.warn2,
						})
					 }
				  }
				})	
			},
		}	
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100vh;
		background-color: #637e96;
		/* overflow: hidden; */
	}
	.left {
		position: fixed;
		top: 30px;
		left: 10px;
		width: 40px;
		height: 40px;
	}
	.logo {
		margin-top: 100px;
		height: 50px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.logo image {
		max-width: 5rem;
		max-height: 5rem;
		margin-bottom: 8vh;
	}
	.login {
		height: 65vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 60px;
		box-sizing: border-box;
	}
	.login-item {
		position: relative;
	}
	.login input {
		width: 110%;
		height: 50px;
		border-radius: 60px;
		margin-bottom: 30px;
		padding-left: 90px;
		box-sizing: border-box;
		border: solid 1px #ffffff;
		color: #b6b6b6;
		font-size: 20px;
	}
	.phcolor {
		color: #b6b6b6;
	}
	.login .img {
		position: absolute;
		top: 0;
		bottom: 50%;
		margin-top: 15px;
		left: 30px;
		width: 20px;
		height: 25px;
	}
	.btnv{
		display:flex;
		justify-content:center;//子元素水平居中
		align-items:center;//子元素垂直居中
	}
	.btn {
		width: 10rem;
		height: 3rem;
		line-height: 3rem;
		border-radius: 0.6rem;
		margin-top: 0.5rem;
		text-align: center;
		background: #CD6839;
		color: #fff;
		font-size: 1rem;
	}
	input::placeholder {
		color: #b6b6b6;
	}
</style>