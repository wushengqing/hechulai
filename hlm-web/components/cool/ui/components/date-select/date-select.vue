<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="input-readonly" @click="show()">
				<text v-if="valueShow">{{ valueShow }}</text>
				<text class="c-grey" v-if="!valueShow">未选择</text>
			</view>
		</view>
		<cl-popup :visible.sync="visible">
			<view class="title line88 mb30">当前选择日期：{{year}}年{{month}}月{{day}}日</view>
			<picker-view :indicator-style="indicatorStyle" :value="pickerValue" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
				</picker-view-column>
			</picker-view>
			<view class="footer flex" style="margin-top: 20upx;">
				<cl-button class="flex1" @tap="visible = false">
					<text>取消</text>
				</cl-button>
				<cl-button class="flex1" type="primary" @tap="setValue">
					<text>确定</text>
				</cl-button>
			</view>
		</cl-popup>
	</view>
</template>

<script>
	export default {
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1920; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {

				valueShow: '',
				years,
				year,
				months,
				month,
				days,
				day,
				defaultPickerValue: [year, month - 1, day - 1],
				pickerValue: [],
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: false,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		props: {
			value: {
				type: String,
				default: ''
			}
		},
		watch: {
			value: {
				handler(val) {
					console.log(val);
					if (val && val.indexOf('年') != -1 && this.years.length>0) {
						let newVal = val.replace(/[年|月|日]/g, '/')
						let date = newVal.split('/');
						this.pickerValue = [this.years.indexOf(date[0]),date[1]-1,date[2]-1];
						this.valueShow = `${date[0]}年${date[1]}月${date[2]}日`
					} else {
						this.pickerValue = [...this.defaultPickerValue];
						this.valueShow = ''
					}
				},
				immediate: true
			}
		},
		methods: {
			hide() {
				this.visible = false
			},
			show() {
				this.visible = true
			},
			setValue() {
				let newValue = `${this.year}年${this.month}月${this.day}日`
				this.hide();
				this.$emit('input', newValue);
			},
			bindChange(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
			}
		}
	}
</script>

<style>
	picker-view {
		width: 100%;
		height: 540upx;
		margin-top: 20rpx;
	}

	.item {
		line-height: 100rpx;
		text-align: center;
	}
	.input-readonly{
		padding: 18upx;
		border:#dcdfe6 solid 1upx;
	}
</style>
