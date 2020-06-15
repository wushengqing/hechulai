<template>
	<view>
		好友详情
	</view>
</template>

<script>
		import listCell from '@/components/mix-list-cell';
	export default {
		data() {
			return {
				contacts:[
					{name:'江长远',phone: '15210487540',id:'111'},
					{name:'江长',phone:'15210487540',id:'111'},
					{name:'江远',phone:'15210487540',id:'111'},
					{name:'江长远2',phone:'15210487540',id:'111'},
					{name:'江长远33',phone:'15210487540',id:'111'},
					{name:'江长远1',phone:'15210487540',id:'111'},
					{name:'巫卡卡',phone:'15210487540',id:'111'},
					{name:'巫卡卡',phone:'15210487540',id:'111'},
					{name:'巫卡卡',phone:'15210487540',id:'111'},
					{name:'cheng',phone:'15210487540',id:'111'},
					{name:'10086',phone:'15210487540',id:'111'},
					{name:'11',phone:'15210487540',id:'111'},
					{name:'江长远',phone:'15210487540',id:'111'},
					{name:'江长远',phone:'15210487540',id:'111'},
					{name:'江长远',phone:'15210487540',id:'111'},
					{name:'江长远',phone:'15210487540',id:'111'},
				],
			}
		},
		components: {
			listCell
		},
		async onLoad(options){
			let id = options.id;
			if(id){
				this.$api.msg(`点击了${id}`);
			}
			
		},
		methods: {
			openContact(item){
				uni.navigateTo({
					url: `/pages/contacts/detail?id=${item.id}`
				})
			}
		}
	}
</script>

<style>

</style>
