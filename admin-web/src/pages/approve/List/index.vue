<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">审核员管理</template>
			<!---->
			<table-comb
					name="审核员管理"
					ref="tableMain"
					:search-model-base="tableMainSearchModelBase"
					:showSearchBar="false"
					:get-action="$api.approve.userList"
					:showPagination="false"
					:autoFetch="false"
					@tableMounted="tableMounted"
					:get-action-where="getActionWhere">
				<!--基础查询-->
				<!--表格-->
				<template slot="tableColumns">
					<el-table-column prop="auditUserName" label="审核员"></el-table-column>
					<el-table-column prop="name" label="审核事件">
						<template slot-scope="props">
							{{ getAuditList(props.row) }};
						</template>
					</el-table-column>
					<el-table-column label="操作" width="240px">
						<template slot-scope="props">
							<el-button type="text" size="mini" @click="openDialog(props.row)">设置审核权限</el-button>
						</template>
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
		</d2-container>
		<el-dialog title="审核员设置" :visible.sync="dialogShow" width="600px">
			<div class="mb10">审核事件：绑定宗亲</div>
			<el-table
					border
					:data="tableData"
					stripe
					size="mini"
					style="width: 100%">
				<el-table-column
						prop="date"
						label="审核员">
				</el-table-column>
				<el-table-column
						prop="name"
						label="房系">
				</el-table-column>
				<el-table-column
						prop="name"
						label="世称">
				</el-table-column>
				<el-table-column
						prop="name"
						label="族委会职位"
						width="180">
				</el-table-column>
				<el-table-column prop="address" label="操作">
					<template slot="header" slot-scope="scope">
						<div class="tc">
							<el-button size="mini" type="primary">新增</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
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
        dialogVO:{
          id: '',
          name:'',
          userList:[],
        },
        userOptions:[],
        showSelect:false,
        fileList:[],
        rules:{
          name: [{required: true, message: '请输入'}, ],
          directoryType: [{required: true, message: '请输入'}, ],
          scIds: [{required: true, message: '请输入'}, ],
        },
        unionList:[],
        generations:[],
        fileData:{
          defaultSuffix:'',
        }
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.d2admin.userinfo,
      }),
      getActionWhere() {
        return {
          clanId:this.clanId
        }
      }
    },
    methods: {
      getAuditList(item){
        let names =  item.auditList.map(audiEvent=>audiEvent.auditName);
       return names.join('，');
	  },
      tableMounted(){
        this.$nextTick(()=>{
          this.$refs.tableMain.fetchData();
        })
      },
      handlegetFileData(file) {
        this.fileData.defaultSuffix = '.'+file.name.split('.').pop();
        return true
      },
      openDialog(item) {
        if(!item){
          this.dialogVO = {
            id: '',
            name:'',
            directoryType:1,
            directoryFileId:'',
            scIds:[],
          }
        }else{
          this.dialogVO  = {
            id:item.id,
            name:item.name,
            directoryType:item.directoryType,
            scIds:(item.scIds||[]).map(i =>{
              return i.id;
            }),
          }
          //如果已经有文件的，需要回显文件
          if(item.directoryFileId){
            this.$api.common.getFile(item.directoryFileId).then(res=>{
              this.fileList = [{
                name:res.data.fileName,
                url:res.data.fileUrl
              }]
            })
          }
        }
        if (this.$refs['dialogVO']) {
          this.$nextTick(() => {
            this.$refs['dialogVO'].clearValidate();
          })
        }
        this.dialogShow = true;
      },
      onUpload(response){
        this.dialogVO.directoryFileId = response.id;
      },
      onRemove(){
        this.dialogVO.directoryFileId = '';
      },
      save() {
        this.$refs['dialogVO'].validate((valid) => {
          if (valid) {
            let vo = {
              ...this.dialogVO,
              clanId:this.clanId,
            };
            //新增
            if (!vo.id) {
              delete vo.id;
            }
            if(vo.directoryType===1){
              delete  vo.directoryFileId
            }
            let scIds =  this.generations.filter(item=>{
              return vo.scIds.indexOf(item.id) !=-1;
            }).map(item=>{
              return {
                id:item.id
              }
            });
            vo.scIds = scIds;
            this.$api.branch.add(vo).then(res => {
              if (res.code == 0) {
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
    },
    mounted() {

    },
  };
</script>
