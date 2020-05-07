<template>
  <div class="workapply-area">
    <d2-container>
      <template slot="header">宗亲列表</template>

      <!---->
      <table-comb
        name="宗亲列表"
        ref="tableMain"
        :search-model-base="tableMainSearchModelBase"
        :get-action="$api.clansmen.list"
        :get-action-where="getActionWhere"
        :afterFetchData="afterFetchData">
        <!--基础查询-->
        <template slot="baseSearchForm" slot-scope="scope">
          <el-input
            placeholder="请输入关键字"
            prefix-icon="el-icon-search"
            clearable
            v-model="scope.form.keyword"
            style="width: 250px; margin-left: 10px; margin-right: 10px">
          </el-input>
          <el-button class="fr ml10" @click="openDialog">新增</el-button>
        </template>
        <!--表格-->
        <template slot="tableColumns">
          <el-table-column
            prop="itemName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="itemName"
            label="世称">
          </el-table-column>
          <el-table-column
            prop=""
            label="父亲">
          </el-table-column>
          <el-table-column
                  prop=""
                  label="子女">
          </el-table-column>
          <el-table-column
            prop="belongCategory.categoryName"
            label="夫人">
          </el-table-column>
          <el-table-column
            prop="belongCategory.description"
            label="描述">
          </el-table-column>
          <el-table-column label="是否已经关联用户">
            <template slot-scope="props">
              {{ props.row.status===1?'是':'否' }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="200px">
            <template slot-scope="props">
              <el-button type="text" size="mini" @click="editRubbish(props.row)">编辑</el-button>
              <el-button type="text" size="mini" @click="editRubbish(props.row)">族谱管理</el-button>
              <el-button type="text" size="mini" @click="delRubbish(props.row)">删除</el-button>
            </template>
          </el-table-column>
        </template>
      </table-comb>
      <template slot="footer"></template>
    </d2-container>
    <el-dialog :title="dialogVO.id?'编辑':'新增'" :visible.sync="dialogShow">
      <el-form ref="dialogVO" :model="dialogVO" label-width="150px" :rules="rules">
        <el-form-item label="父亲房系：" prop="scId">
          <el-cascader
                  v-model="branchAndGeneration"
                  :props="{
                    children:'scIds',
                    label:'name',
                    value:'id'
                  }"
                  :options="branchList"
                  @change="changeBranch"></el-cascader>
        </el-form-item>
        <el-form-item label="父亲姓名：" prop="pid">
          <el-select v-model="dialogVO.pid" placeholder="请选择">
            <el-option
                    v-for="item in fatherList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="dialogVO.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="出生日期：" prop="name">
          <el-input v-model="dialogVO.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="去世日期：" prop="name">
          <el-input v-model="dialogVO.name" placeholder="请输入"></el-input>
        </el-form-item>
        <p>夫人列表</p>
        <el-table :data="dialogVO.spouseDtoList" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="180">
            <template slot-scope="props">
              <el-input v-model="props.row.spouseName" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="简介" width="180">
            <template slot-scope="props">
              <el-input v-model="props.row.spouseDec" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="出生日期" width="180">
            <template slot-scope="props">
              <el-input v-model="props.row.spouseBirthDay" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="死亡日期" width="180">
            <template slot-scope="props">
              <el-input v-model="props.row.spouseendDay" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
        </el-table>

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
    name: "ClansmenList",
    components: {},
    mixins: [
      listMixin
    ],
    data() {
      return {
        tableMainSearchModelBase:{
          keyword: '',
          categoryId:''
        },
        branchList:[],
        //世称列表
        scIdList : [],
        //分类列表
        fatherList : [],
        dialogShow:false,
        //新增或者编辑的vo
        branchAndGeneration:[],
        dialogVO:{
          id:'',
          directoryId:'',
          scId:'',
          parentId:'',
          clansmanName:'',
          clansmanBirthDay:'',
          clansmanendDay:'',
          clansmanDec:'',
          auditUserId:'',
          spouseDtoList:[
            {
              spouseName:'',
              spouseBirthDay:'',
              spouseendDay:'',
              spouseDec:''
            },
          ]
        },
        rules: {
        }
      };
    },
    computed: {
      getActionWhere() {
        return {
          clanId:this.clanId
        }
      }
    },
    methods: {
      //通过房系id获取世称列表
      changeBranch(){
        this.dialogVO.directoryId = this.branchAndGeneration[0];
        this.dialogVO.scId = this.branchAndGeneration[1];
        //获取父亲们
        this.$api.user.getClanUserRelList({
          clanId:this.clanId,
          directoryId:this.dialogVO.directoryId,
          scId:this.dialogVO.scId
        }).then(res=>{

        })
      },
      //打开新增弹窗
      openDialog(){
        if(this.$refs['dialogVO']){
          this.$nextTick(()=>{
            this.$refs['dialogVO'].clearValidate();
          })
        }
        this.dialogShow = true;
      },

      save(){
        this.$refs['dialogVO'].validate((valid) => {
          if (valid) {
            let vo = {
              ...this.dialogVO,
              status: this.dialogVO.status?1:0
            };
            //新增
            if(!vo.id){
              delete vo.id;
              //
              this.$api.rubbish.create(vo).then(res=>{
                if(res.status==1){
                  this.dialogShow = false
                  this.$message.success('新增成功！');
                  this.$refs.tableMain.fetchData();
                }else{
                  this.$message.error(res.errorMessage)
                }

              })
            }else{
              this.$api.rubbish.edit(vo).then(res=>{
                if(res.status==1){
                  this.dialogShow = false;
                  this.$message.success('修改成功！');
                  this.$refs.tableMain.fetchData();
                }else{
                  this.$message.error(res.errorMessage)
                }

              })
            }
          } else {
            return false;
          }
        });
      },
      afterFetchData(){

      }
    },
    mounted() {
      //获取房系列表
      this.$api.branch.list({clanId:this.clanId}).then(res=>{
        this.branchList = res.data;
      })
    }
  };
</script>
