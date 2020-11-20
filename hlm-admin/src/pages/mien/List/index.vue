<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">风采管理</template>
			<!---->
			<table-comb
					name="风采管理"
					ref="tableMain"
					:search-model-base="tableMainSearchModelBase"
					:get-action="$api.mien.list"
					:showPagination="false"
					:autoFetch="false"
					@tableMounted="tableMounted"
					:get-action-where="getActionWhere">
				<!--基础查询-->
				<template slot="baseSearchForm" slot-scope="scope">
					<el-select
							@change="changeMienType"
						v-model="scope.form.mienType"
						placeholder="请选择">
						<el-option
							v-for="item in mienTypeOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled">
						</el-option>
					</el-select>
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
					<el-table-column prop="name" label="风采图片">
					</el-table-column>
					<el-table-column prop="name" label="标题">
					</el-table-column>
					<el-table-column prop="mienDec" label="更新时间">
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
		<el-dialog :title="dialogVO.id?'编辑':'新增'" :visible.sync="dialogShow" width="400px">
			<el-form ref="dialogVO" :model="dialogVO" label-width="100px" :rules="rules">
				<el-form-item label="风采类型：" prop="mienType">
					<el-input style="width: 100%" placeholder="请输入" :value="mienTypeNames[dialogVO.mienType]"></el-input>
				</el-form-item>
				<el-form-item label="标题：" prop="name">
					<el-input style="width: 100%" placeholder="请输入" v-model="dialogVO.name"></el-input>
				</el-form-item>
				<el-form-item label="风采图片：">
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
				<el-form-item label="所含世称：" prop="scIds">
					<el-checkbox-group v-model="dialogVO.scIds">
						<el-checkbox v-for="item in generations" :label="item.id">{{ item.name }}</el-checkbox>
					</el-checkbox-group>
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
        //风采类型
        mienTypeOptions:[
		  {label:'宗祠',value:0},
		  {label:'宗亲',value:1},
		  {label:'新闻资讯',value:2},
		],
        mienTypeNames:['宗祠','宗亲','新闻资讯'],
        tableMainSearchModelBase: {
          keyword: '',
          mienType:0
        },
        dialogShow:false,
        dialogVO:{
          id: '',
          mienType:0,
          name:'',
          directoryType:1,
          directoryFileId:'',
          scIds:[],
        },
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
      changeMienType(){
        this.$nextTick(()=>{
          this.$refs.tableMain.fetchData();
        })
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
            scIds:item.scIds.map(i =>{
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
      //获取世称列表
      this.$api.generation.list({clanId:this.clanId}).then(res=>{
        this.generations = res.data;
      })
    },
  };
</script>
