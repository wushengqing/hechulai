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
					<el-table-column prop="givingBtime" label="发起时间"></el-table-column>
					<el-table-column prop="givingEtime" label="结束时间"></el-table-column>
					<el-table-column prop="givingUserSum" label="乐捐人次"></el-table-column>
					<el-table-column prop="givingSumMoney" label="乐捐目标金额"></el-table-column>
					<el-table-column prop="givingMoneySum" label="乐捐金额"></el-table-column>
					<el-table-column prop="" label="乐捐状态">
						<template slot-scope="props">
							<span v-if="getStatus(props.row)===0" class="color-grey">未知状态</span>
							<span v-if="getStatus(props.row)===1" class="color-primary">未开始</span>
							<span v-if="getStatus(props.row)===2" class="color-error">进行中</span>
							<span v-if="getStatus(props.row)===3" class="color-grey">已结束</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="140px">
						<template slot-scope="props">
							<el-button type="text" size="mini" @click="openDialog(props.row)">编辑</el-button>
							<el-button type="text" size="mini" @click="openGivingUserList(props.row)">乐捐金额</el-button>
						</template>
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
			<el-dialog :title="dialogVO.id?'编辑':'新增'" :visible.sync="dialogShow" width="600px" apend-to-body>
				<el-form ref="dialogVO" :model="dialogVO" label-width="140px" :rules="rules">
					<el-form-item label="乐捐项目：" prop="name">
						<el-input style="width: 220px" placeholder="请输入" v-model="dialogVO.name"></el-input>
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
					<el-form-item label="乐捐目标金额：" prop="givingSumMoney">
						<el-input
							style="width: 220px"
							type="number"
							maxlength="8"
							placeholder="请输入金额（元）"
							v-model="dialogVO.givingSumMoney">
						</el-input>
					</el-form-item>
					<el-form-item label="乐捐开始时间：" prop="givingBtime">
						<el-date-picker
							v-model="dialogVO.givingBtime"
							type="date"
							value-format="yyyy-MM-dd"
							placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="乐捐截止时间：" prop="givingEtime">
						<el-date-picker
							v-model="dialogVO.givingEtime"
							type="date"
							value-format="yyyy-MM-dd"
							placeholder="选择日期">
						</el-date-picker>
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
          givingBtime:'',
          givingEtime:'',
          givingSumMoney:''
        },
        rules: {
          name: [
            {required: true, message: '请输入'},
					],
          givingDec: [
            {required: true, message: '请输入'},
					],
          givingBtime: [
            {required: true, message: '请输入',trigger: 'change'},
					],
          givingEtime: [
            {required: true, message: '请输入',trigger: 'change'},
          ],
          givingSumMoney: [
            {required: true, message: '请输入'},
          ],
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
      //获取乐捐状态
      getStatus(row){
        if(row.givingBtime && row.givingEtime){
          let now = new Date();
          let start =  new Date(row.givingBtime.replace(/-/g, '/'));
          let end =  new Date(row.givingEtime.replace(/-/g, '/'));
          //未开始
          if(now.getTime()<start.getTime()){
            return 1
					}
          //进行中
          else if(now.getTime()<=end.getTime()){
            return 2
          }
          //已结束
          else{
            return 3
					}
				}
				return 0;
			},
      openDialog(item) {
        if(!item){
          this.dialogVO = {
            id:'',
            name:'',
            givingDec:'',
            givingBtime:'',
            givingEtime:'',
            createUserId:this.userInfo.userId,
            givingSumMoney:'',
          }
        }else{
          this.dialogVO  = {
            id:item.id,
            name:item.name,
            givingDec:item.givingDec,
            givingBtime:item.givingBtime,
            givingEtime:item.givingEtime,
            createUserId:item.createUserId,
            givingSumMoney:item.givingSumMoney
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
