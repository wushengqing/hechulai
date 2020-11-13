<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">房系管理</template>
			<!---->
			<table-comb
				name="房系管理"
				ref="tableMain"
				:search-model-base="tableMainSearchModelBase"
				:get-action="$api.branch.list"
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
					<el-table-column prop="clanManName" label="发起分房宗亲"></el-table-column>
					<el-table-column prop="name" label="房系名称"></el-table-column>
					<el-table-column label="操作" width="240px">
						<template slot-scope="props">
							<el-button type="text" size="mini" @click="openDialog(props.row)">编辑</el-button>
						</template>
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
		</d2-container>
		<el-dialog :title="dialogVO.id?'编辑':'新增'" :visible.sync="dialogShow" width="600px">
			<el-form ref="dialogVO" :model="dialogVO" label-width="140px" :rules="rules">
				<el-form-item label="分房名称：" prop="name">
					<el-input style="width: 100%" placeholder="请输入" v-model="dialogVO.name"></el-input>
				</el-form-item>
				<el-form-item label="房系类型：">
					<el-radio-group v-model="dialogVO.directoryType">
						<el-radio :label="0">概述</el-radio>
						<el-radio :label="1">枝系</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="概述文件：" v-if="dialogVO.directoryType==0">
					<el-upload
						class="upload-demo"
						:action="$api.common.uploadAction"
						:data="fileData"
						:before-upload="handlegetFileData"
						:on-success="onUpload"
						:on-remove="onRemove"
						:limit="1"
						:file-list="fileList">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">请上传概述文件</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="发起分房宗亲：" prop="scIds">
					<el-autocomplete
						prefix-icon="el-icon-search"
						style="width: 100%"
						:fetch-suggestions="searchClanManByName"
						@select="selectClanMan"
						placeholder="请输入"
						v-model="dialogVO.clanManName">
					</el-autocomplete>
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
        dialogVO:{
          id: '',
          name:'',
          directoryType:1,
          directoryFileId:'',
          clanManName:'',
          clanManId:''
        },
        fileList:[],
        rules:{
          name: [{required: true, message: '请输入'}, ],
          directoryType: [{required: true, message: '请输入'}, ],
          clanManId: [{required: true, message: '请输入'}, ],
        },
        unionList:[],
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
      tableMounted(){
        this.$nextTick(()=>{
          this.$refs.tableMain.fetchData();
        })
      },
      handlegetFileData(file) {
        this.fileData.defaultSuffix = '.'+file.name.split('.').pop();
        return true
      },
      searchClanManByName(queryString, cb){
        console.log(queryString, cb)
				if(queryString){
          this.$api.user.getClanUserRelList({
            clanManName:queryString,
            clanId:this.clanId
          }).then(res=>{
            cb(res.data.map(item=>{
              return {
								...item,
								value:`${item.scName}:${item.clansmanName}(${item.parentName}之子)`
							}
						}))
          })
				}else{
          cb([])
				}

			},
      selectClanMan(item){
        console.log(item);
        this.dialogVO.clanManId = item.clansmanId;
			},
      openDialog(item) {
        if(!item){
          this.dialogVO = {
            id: '',
            name:'',
            directoryType:1,
            directoryFileId:'',
            clanManName:'',
            clanManId:''
          }
        }else{
          this.dialogVO  = {
            id:item.id,
            name:item.name,
            directoryType:item.directoryType,
            clanManName:'',
            clanManId:''
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
      //获取世称列表
      // this.$api.generation.list({clanId:this.clanId}).then(res=>{
      //   this.generations = res.data;
      // })
    },
  };
</script>
