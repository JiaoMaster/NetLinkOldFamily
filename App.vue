<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			uni.getStorage({
				key:"token",
				success(res) {
					if(res == "")
					{
						uni.showToast({
							title: '未登录，请点击底部用户登录',
							duration: 1000
						});
					}
				},
				fail() {
					uni.showToast({
						title: '未登录，请点击底部用户登录',
						duration: 1000
					});
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
