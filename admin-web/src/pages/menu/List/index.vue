<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">菜单管理</template>

			<!---->
			<table-comb 
			name="菜单管理" 
			ref="tableMain" 
			:search-model-base="tableMainSearchModelBase" 
			:get-action="$api.menu.list"
			 :get-action-where="getActionWhere" 
			 :afterFetchData="afterFetchData">
				<!--基础查询-->
				<template slot="baseSearchForm" slot-scope="scope">
					<el-input placeholder="请输入关键字" 
					prefix-icon="el-icon-search" 
					clearable 
					v-model="scope.form.keyword" 
					style="width: 250px; margin-left: 10px; margin-right: 10px">
					</el-input>
					<el-button class="fr ml10" @click="openDialog()">新增菜单</el-button>
				</template>
				<!--表格-->
				<template slot="tableColumns">
					<el-table-column prop="name" label="菜单名称">
					</el-table-column>
					<el-table-column prop="path" label="菜单路由">
					</el-table-column>
					<el-table-column label="操作" width="240px">
						<template slot-scope="props">
							<el-button type="text" size="mini" @click="openDialog(props.row)">编辑</el-button>
							<el-button type="text" size="mini" @click="remove(props.row)">删除</el-button>
						</template>
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
		</d2-container>

		<el-dialog :title="dialogVO.id?'编辑':'新增'" :visible.sync="dialogShow" width="400px">
			<el-form ref="dialogVO" :model="dialogVO" label-width="100px" :rules="rules">
				<el-form-item label="菜单名称：" prop="name">
					<el-input style="width: 100%" placeholder="请输入" v-model="dialogVO.name"></el-input>
				</el-form-item>
				<el-form-item label="菜单路由：" prop="path">
					<el-input style="width: 100%" placeholder="请输入" v-model="dialogVO.path"></el-input>
				</el-form-item>
				<el-form-item label="菜单图标：" prop="icon">
					<el-input style="width: 100%" placeholder="请输入" v-model="dialogVO.path"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="save">保 存</el-button>
				<el-button @click="dialogShow = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import listMixin from "@/mixins/list.mixin";
	export default {
		// 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
		name: "MenuList",
		components: {},
		mixins: [
			listMixin
		],
		data() {
			return {
				tableMainSearchModelBase: {
					keyword: '',
				},
				dialogShow: false,
				//新增或者编辑的vo
				dialogVO: {
					id: '',
					name:'',
					path:'',
					icon:'',
					//仅后天菜单
					projectType:0,
					
				},
				rules: {
					name: [{
						required: true,
						message: '请输入'
					}, ],
					path: [{
						required: true,
						message: '请输入'
					}, ],
				},
			};
		},
		computed: {
			getActionWhere() {
				return {

				}
			},
		},
		methods: {
			openDialog(item) {
				if(!item){
					this.dialogVO = {
						id: '',
						name:'',
						path:'',
						icon:'',
					}
				}else{
					this.dialogVO  = {
						...item,
					}
				}
				if (this.$refs['dialogVO']) {
					this.$nextTick(() => {
						this.$refs['dialogVO'].clearValidate();
					})
				}
				this.dialogShow = true;
			},
			
			save() {
	
				this.$refs['dialogVO'].validate((valid) => {
					if (valid) {
						let vo = {
							...this.dialogVO
						};
						//新增
						if (!vo.id) {
							delete vo.id;
						} 
						
						this.$api.menu.add(vo).then(res => {
							if (res.code == 0) {
								this.dialogShow = false
								this.$message.success('新增成功！');
								this.$refs.tableMain.fetchData();
							} else {
								this.$message.error(res.errorMessage)
							}
						})
					} else {
						return false;
					}
				});
			},
			remove(){},
			afterFetchData() {

			}
		},
		mounted() {
		
		}
	};
</script>
