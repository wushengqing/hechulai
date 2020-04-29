<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">世称管理</template>
			<!---->
			<table-comb
				name="世称管理"
				ref="tableMain"
				:search-model-base="tableMainSearchModelBase"
				:get-action="$api.generation.list"
				:showPagination="false"
				:autoFetch="false"
				@tableMounted="tableMounted"
				:get-action-where="getActionWhere">
				<!--基础查询-->
				<template slot="baseSearchForm" slot-scope="scope">
					<el-input
						placeholder="请输入关键字"
						prefix-icon="el-icon-search"
						clearable
						v-model="scope.form.keyword"
						style="width: 250px; margin-left: 10px; margin-right: 10px">
					</el-input>
					 <el-button class="fr ml10" @click="openDialog()" >新增</el-button>
				</template>
				<!--表格-->
				<template slot="tableColumns">
					<el-table-column prop="name" label="世称">
					</el-table-column>
					<el-table-column prop="userNum" label="显示名">
					</el-table-column>
					<el-table-column label="操作" width="240px">
						<template slot-scope="props">
							<el-button type="text" size="mini" @click="openDialog(props.row)">编辑</el-button>
						</template>
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
		</d2-container>
		<el-dialog :title="dialogVO.id?'编辑':'新增'" :visible.sync="dialogShow" width="800px">
			<el-form ref="dialogVO" :model="dialogVO" label-width="150px" :rules="rules">
				<el-form-item label="世称：" prop="name">
					<el-input style="width: 100%" placeholder="请输入" v-model="dialogVO.name"></el-input>
				</el-form-item>
				<el-form-item label="显示名：" prop="name">
					<el-input style="width: 100%" placeholder="请输入宗族名称" v-model="dialogVO.name"></el-input>
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
  import { mapState } from 'vuex'
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "GenerationList",
    components: {},
    mixins: [
      listMixin
    ],
    data() {
      return {
        tableMainSearchModelBase: {
          keyword: '',
          categoryId: '',
        },
        dialogShow:false,
        unionList:[],
        clanId:''
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.d2admin.userinfo,
      }),
      getActionWhere() {
        return {
          clanId:parseInt(this.clanId)
        }
      }
    },
    methods: {
      tableMounted(){
        this.clanId = this.$util.cookies.get('clanId');
        console.log(this.clanId );
        this.$nextTick(()=>{
          this.$refs.tableMain.fetchData()
        })
	  },
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
    },
    mounted() {
    },
  };
</script>
