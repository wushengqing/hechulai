<template>
  <div class="workapply-area">
    <d2-container>
      <template slot="header">宗亲列表</template>

      <!---->
      <table-comb
        name="宗亲列表"
        ref="tableMain"
        :search-model-base="tableMainSearchModelBase"
        :get-action="$api.union.list"
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
          <el-button class="fr ml10" @click="add">新增</el-button>
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
        <el-form-item label="父亲世称：" prop="scId">
          <el-select v-model="dialogVO.scId" placeholder="请选择">
            <el-option
                    v-for="item in scIdList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父亲房系：" prop="scId">
          <el-select v-model="dialogVO.scId" placeholder="请选择">
            <el-option
                    v-for="item in scIdList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
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
        <el-table :data="dialogVO.tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="180">
            <template slot-scope="props">
              <el-input v-model="props.row.name" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="简介" width="180">
            <template slot-scope="props">
              <el-input v-model="props.row.name" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="出生日期" width="180">
            <template slot-scope="props">
              <el-input v-model="props.row.name" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="死亡日期" width="180">
            <template slot-scope="props">
              <el-input v-model="props.row.name" placeholder="请输入"></el-input>
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
    name: "UnionList",
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
        //分类列表
        scIdList : [],
        //分类列表
        fatherList : [
          {
          value: '1',
          label: '陈1'
        }, {
          value: '2',
          label: '陈2'
        }, {
          value: '3',
          label: '陈3'
        }, {
          value: '4',
          label: '陈4'
        }, {
          value: '5',
          label: '陈5'
        }],
        dialogShow:false,
        //新增或者编辑的vo
        dialogVO:{
          id:'',
          categoryId:'',
          itemName:'',
          status:true,
          tableData:[
            {
              name:'',
              birthday:'',
              deathDay:'',
              dec:''
            },
          ]
        },
        rules: {
          itemName: [
            { required: true, message: '请输入垃圾名称'},
          ],
          categoryId: [
            { required: true, message: '请选择垃圾类型'},
          ],
        }
      };
    },
    computed: {
      getActionWhere(){
        return {

        }
      },
    },
    methods: {
      add(){
        // this.dialogVO= {
        //   categoryId:'',
        //   itemName:'',
        //   status:true
        // }
        this.openDialog();
      },
      editRubbish(detailVO){
        this.dialogVO= {
          id:detailVO.id,
          categoryId:detailVO.belongCategory.id,
          itemName:detailVO.itemName,
          status:detailVO.status==1,
        }
        this.openDialog();
      },
      openDialog(){
        if(this.$refs['dialogVO']){
          this.$nextTick(()=>{
            this.$refs['dialogVO'].clearValidate();
          })
        }
        this.dialogShow = true;
      },
      delRubbish(vo){
        this.$confirm('确认删除该记录？')
          .then(() => {
            this.$api.rubbish.del(vo.id).then(res=>{
              if(res.status==1){
                this.$message.success('删除成功！');
                this.$refs.tableMain.fetchData();
              }else {
                this.$message.error(res.errorMessage)
              }

            });
          })
          .catch(confirm => {});
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
                  this.dialogShow = false
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
      //获取氏称列表
      this.$api.generation.list({clanId:this.clanId}).then(res=>{
        this.scIdList = res.data;
      })
    }
  };
</script>
