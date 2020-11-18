<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">用户管理</template>

			<!---->
			<table-comb
				name="用户管理"
				ref="tableMain"
				:search-model-base="tableMainSearchModelBase"
				:get-action="$api.user.list"
				:get-action-where="getActionWhere">
				<!--基础查询-->
				<template slot="baseSearchForm" slot-scope="scope">
					<el-input placeholder="请输入关键字" prefix-icon="el-icon-search" clearable v-model="scope.form.keyword" style="width: 250px; margin-left: 10px; margin-right: 10px">
					</el-input>
					<!-- <el-button class="fr ml10" @click="addRubbish">新增</el-button> -->
				</template>
				<!--表格-->
				<template slot="tableColumns">
					<el-table-column prop="name" label="用户名称">
					</el-table-column>
					<el-table-column prop="userNum" label="登录名">
					</el-table-column>
					<el-table-column prop="sex" label="性别">
						<template slot-scope="props">
							{{ props.row.sex || '男' }}
						</template>
					</el-table-column>
					<el-table-column prop="openId" label="openId">
					</el-table-column>

					<el-table-column label="操作" width="160">
						<template slot-scope="props">
							<el-button type="text" size="mini" @click="resetPassword(props.row)">重置密码</el-button>
							<el-button type="text" size="mini" @click="openRolePage(props.row)">角色设置</el-button>
							<!--<el-button v-if="props.row.status===1" type="text" size="mini" @click="changeUserState(props.row)">停用</el-button>
							<el-button v-if="props.row.status!==1" type="text" size="mini" @click="changeUserState(props.row)">启用</el-button>-->
						</template>
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
		</d2-container>
		<UserRole ref="userRolePage" @back="refreshTable" />
	</div>
</template>

<script>
  import UserRole from '../UserRole'
  import listMixin from "@/mixins/list.mixin";
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "UserList",
    components: {
      UserRole,
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
      resetPassword(item) {
        this.$confirm('是否需要重置密码，重置密码之后，用户的密码将重置为"123456"', '提示 ', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.user.upDateUserInfo({
            ...item,
            userPassword: '123456'
          }).then(res => {
            if (res.code === 0) {
              this.$message.success('密码重置成功！');
            } else {
              this.$message.error(res.msg);
            }
          })

        }).catch(() => {
          this.$message.info('已取消操作');
        });
      },
      changeUserState(item) {
        let confirmText = '';
        let status = item.status === 1 ? 0 : 1;
        if (item.status !== '1') {
          confirmText = '是否启用用户'
        }
        this.$confirm(confirmText, '提示 ', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.user.upDateUserInfo({
            id: item.id,
            status
          }).then(res => {
            if (res.code === 0) {
              this.$message.success('密码重置成功！');
            } else {
              this.$message.error(res.msg);
            }
          })

        }).catch(() => {
          this.$message.info('已取消操作');
        });
      },
      openRolePage(item){
        this.$refs.userRolePage.open(item.id);
	  }
    },
    mounted() {

    }
  };
</script>
