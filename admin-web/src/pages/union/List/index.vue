<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">宗族列表</template>

			<!---->
			<table-comb
			name="宗族列表"
			ref="tableMain"
			:search-model-base="tableMainSearchModelBase"
			:get-action="$api.union.list"
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
					<el-button class="fr ml10" @click="openDialog">新增</el-button>
				</template>
				<!--表格-->
				<template slot="tableColumns">
					<el-table-column prop="name" label="名称">
					</el-table-column>
					<el-table-column prop="" label="所在地区">
						<template slot-scope="props">
							{{ props.row.pName}}{{ props.row.cName}}{{ props.row.dName}}{{props.row.address}}
						</template>
					</el-table-column>

					<el-table-column prop="summary" label="简介">
						<div class="ellipsis3" slot-scope="props" :title="props.row.summary">{{ props.row.summary }}</div>
					</el-table-column>

					<el-table-column label="是否启用">
						<template slot-scope="props">
							{{ props.row.status===1?'启用':'未启用' }}
						</template>
					</el-table-column>

					<el-table-column label="操作" width="120px">
						<template slot-scope="props">
							<el-button type="text" size="mini" @click="openDialog(props.row)">编辑</el-button>
							<!--<el-button type="text" size="mini" @click="editRubbish(props.row)">族谱管理</el-button>-->
							<!--<el-button type="text" size="mini" @click="editRubbish(props.row)">宗族管理员</el-button>-->
							<!--<el-button type="text" size="mini" @click="delRubbish(props.row)">删除</el-button>-->
						</template>
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
		</d2-container>

		<el-dialog :title="dialogVO.id?'编辑':'新增'" :visible.sync="dialogShow" width="800px">
			<el-form ref="dialogVO" :model="dialogVO" label-width="150px" :rules="rules">
				<el-form-item label="宗族名称：" prop="name">
					<el-input style="width: 100%" placeholder="请输入宗族名称" v-model="dialogVO.name"></el-input>
				</el-form-item>
				<el-form-item label="宗族管理员：" prop="name">
					<el-input style="width: 100%" placeholder="请输入宗族名称" v-model="dialogVO.userNum"></el-input>
				</el-form-item>
				<el-form-item label="宗族管理员密码：" prop="name">
					<el-input show-password style="width: 100%" placeholder="请输入宗族名称" v-model="dialogVO.userPassword"></el-input>
				</el-form-item>
				<el-form-item label="所在地区：" prop="cityCode">
						<city-cascader class="w100off" ref="cityCascader" placeholder="省/市/区" v-model="dialogVO.cityCode" ></city-cascader>
				</el-form-item>
				<el-form-item label="详细地址：" prop="address">
					<el-input style="width: 100%" placeholder='请输入详细地址' v-model="dialogVO.address"></el-input>
				</el-form-item>
				<el-form-item label="祖训：">
					<el-input type="textarea" :rows="5" style="width: 100%" placeholder="请输入祖训" v-model="dialogVO.dec"></el-input>
				</el-form-item>
				<el-form-item label="宗族简介：">
					<el-input type="textarea" :rows="5" style="width: 100%" placeholder="请输入宗族简介" v-model="dialogVO.summary"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="save()">保 存</el-button>
				<el-button @click="dialogShow = false">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import listMixin from "@/mixins/list.mixin";
  import CityCascader from "@/components/CityCascader";
	export default {
		// 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
		name: "UnionList",
		components: {
      CityCascader
		},
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
					"id": '',
					"name": "",
					"pId": 0,
					"cId": 0,
					"dId": 0,
					cityCode:[],
					"address": "",
					"summary": "",
					"dec": "",
					"state": 0
				},
				rules: {
					itemName: [{
						required: true,
						message: '请输入垃圾名称'
					}, ],
					cityCode: [{
						required: true,
						message: '请选择区域'
					}, ],
				},
				//省市区级联
        cityProps:{
          lazy: true,
          lazyLoad (node, resolve) {
            const { level } = node;
            console.log(node);
            // setTimeout(() => {
            //   const nodes = Array.from({ length: level + 1 })
            //     .map(item => ({
            //       value: ++id,
            //       label: `选项${id}`,
            //       leaf: level >= 2
            //     }));
            //   // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            //   resolve(nodes);
            // }, 1000);
          }
        },
			};
		},
		computed: {
          getActionWhere() {
            return {
              //clanId:parseInt(this.clanId)
            }
          }
		},
		methods: {
          // tableMounted(){
          //   this.clanId = this.$util.cookies.get('clanId');
          //   this.$nextTick(()=>{
          //     this.$refs.tableMain.fetchData()
          //   })
          // },
			openDialog(item) {
				if(!item){
					this.dialogVO = {
						"id": '',
						"name": "",
						"pId": 0,
						"cId": 0,
						"dId": 0,
						cityCode:[],
						"address": "",
						"summary": "",
						"dec": "",
						"state": 0
					}
				}else{
					this.dialogVO  = {
						...item,
						cityCode:[item.pId,item.cId,item.dId]
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
							...this.dialogVO,
							pId:this.dialogVO.cityCode[0],
							cId:this.dialogVO.cityCode[1],
							dId:this.dialogVO.cityCode[2],
							state:this.dialogVO.state ?1:0

						};
						delete vo.cityCode;
						delete vo.isTrusted;
						//新增
						if (!vo.id) {
							delete vo.id;
						}
						this.$api.union.add(vo).then(res => {
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
			getPcdList(){
				this.$api.common.getPcdList().then(res=>{
					res.data.forEach(province=>{
						province.label = province.provinceName;
						province.value = province.provinceId;
						province.children = province.cityInfoDtoList;
						delete province.provinceName;
						delete province.provinceId;
						delete province.cityInfoDtoList;
						province.children.forEach(city=>{
							city.label = city.cityName;
							city.value = city.cityId;
							city.children = city.districtionInfoDtoList;
							delete city.cityName;
							delete city.cityId;
							delete city.districtionInfoDtoList;
							if(city.children){
								city.children.forEach(region=>{
									region.label = region.districtName;
									region.value = region.districtId;
									region.children = null;
									delete region.districtName;
									delete region.districtId;
								})
							}


						})
					})
					 this.pcdList = res.data
				});
			},
			afterFetchData() {

			}
		},
		mounted() {
		   //this.getPcdList()
		}
	};
</script>
