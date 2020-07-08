<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">乐捐管理</template>

			<!---->
			<table-comb
				name="用户管理"
				ref="tableMain"
				:search-model-base="tableMainSearchModelBase"
				:get-action="$api.project.list"
				:get-action-where="getActionWhere">
				<!--基础查询-->
				<template slot="baseSearchForm" slot-scope="scope">
					<el-input placeholder="请输入关键字" prefix-icon="el-icon-search" clearable v-model="scope.form.keyword" style="width: 250px; margin-left: 10px; margin-right: 10px">
					</el-input>
					 <el-button class="fr ml10" type="primary" @click="openDialog()">新增</el-button>
				</template>
				<!--表格-->
				<template slot="tableColumns">
					<el-table-column prop="name" label="乐捐项目">
					</el-table-column>
					<el-table-column prop="givingDec" label="项目描述">
						<template slot-scope="props">
							<div :title="props.row.givingDec" class="ellipsis">{{ props.row.givingDec }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="createUserName" label="发起人">
					</el-table-column>
					<el-table-column prop="givingEtime" label="发起时间"></el-table-column>
					<el-table-column prop="givingBtime" label="结束时间"></el-table-column>
					<el-table-column prop="givingUserSum" label="乐捐人次"></el-table-column>
					<el-table-column prop="givingMoneySum" label="乐捐金额"></el-table-column>
					<el-table-column label="操作" width="240px">
						<template slot-scope="props">
							<el-button type="text" size="mini" @click="openDialog(props.row)">编辑</el-button>
							<el-button type="text" size="mini" @click="openGivingUserList(props.row)">乐捐金额</el-button>
						</template>
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
			<el-dialog :title="dialogVO.id?'编辑':'新增'" :visible.sync="dialogShow" width="600px" apend-to-body>
				<el-form ref="dialogVO" :model="dialogVO" label-width="100px" :rules="rules">
					<el-form-item label="乐捐项目：" prop="name">
						<el-input style="width: 200px" placeholder="请输入" v-model="dialogVO.name"></el-input>
					</el-form-item>
					<el-form-item label="项目描述：" prop="givingDec">
						<el-input
							style="width: 100%"
							type="textarea"
							:rows="5"
							placeholder="请输入"
							v-model="dialogVO.givingDec">
						</el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="save">保 存</el-button>
					<el-button @click="dialogShow = false">取 消</el-button>
				</div>
			</el-dialog>
		</d2-container>
		<GivingUserList ref="givingUserListPage" @back="refreshTable" />
	</div>
</template>

<script>
  import GivingUserList from '../GivingUserList'
  import listMixin from "@/mixins/list.mixin";
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "UserList",
    components: {
      GivingUserList
	},
    mixins: [
      listMixin
    ],
    data() {
      return {
        tableMainSearchModelBase: {
          keyword: '',
          categoryId: ''
        },
        dialogShow:false,
        dialogVO:{
          id:'',
          name:'',
          givingDec:'',
		},
        rules: {
          name: [{
            required: true,
            message: '请输入'
          }, ],
          givingDec: [{
            required: true,
            message: '请输入'
          }, ],
        },
      }
    },
    computed: {
      getActionWhere() {
        return {
          clanId:this.clanId
        }
      }
    },
    methods: {
      openDialog(item) {
        console.log('userInfo',this.userInfo)
        if(!item){
          this.dialogVO = {
            id:'',
            name:'',
            givingDec:'',
            createUserId:this.userInfo.userId,
          }
        }else{
          this.dialogVO  = {
            id:item.item,
            name:item.name,
            givingDec:item.givingDec,
            createUserId:item.createUserId,
          }
        }
        this.$nextTick(() => {
          this.$refs['dialogVO'].clearValidate();
        })
        this.dialogShow = true;
      },

      save() {
        this.$refs['dialogVO'].validate((valid) => {
          if (valid) {
            let vo = {
              ...this.dialogVO,
              clanId:this.clanId
            };
            //新增
            if (!vo.id) {
              delete vo.id;
            }
            this.$api.project.save(vo).then(res => {
              if (res.code === 0) {
                console.log(res)
                this.dialogShow = false;
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
      openGivingUserList(item){
        this.$refs.givingUserListPage.open(item.id);
      }
    },
    mounted() {

    }
  };
</script>
