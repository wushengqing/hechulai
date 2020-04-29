<template>
  <div class="workapply-area">
    <d2-container>
      <template slot="header">角色管理</template>

      <!---->
      <table-comb
              name="角色管理"
              ref="tableMain"
              :search-model-base="tableMainSearchModelBase"
              :get-action="$api.role.list"
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
        </template>
        <!--表格-->
        <template slot="tableColumns">
          <el-table-column
                  prop="name"
                  label="角色名称">
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="props">
              <el-button type="text" size="mini" @click="oepnDialog(props.row)">菜单权限设置</el-button>
            </template>
          </el-table-column>
        </template>
      </table-comb>
      <template slot="footer"></template>
    </d2-container>

    <el-dialog title="权限设置" :visible.sync="dialogShow">
      <el-table
              :data="tableData"
              border
              style="width: 100%">
        <el-table-column
                prop="name"
                label="菜单名称"
        >
        </el-table-column>
        <el-table-column
                prop="path"
                label="菜单路由"
                width="180">
        </el-table-column>
        <el-table-column
                prop=""
                label="是否开启权限">
          <template slot-scope="props">
            <el-switch v-model="props.row.isYes">
            </el-switch>
            <span class="color-green ml10" v-if="props.row.isYes">已开启</span>
            <span class="color-grey ml10" v-else>未开启</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button @click="dialogShow = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  import { mapActions } from 'vuex'
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "RoleList",
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
        dialogShow:false,
        tableData:[],
        currAccessId:'',
      };
    },
    computed: {
      getActionWhere(){
        return {

        }
      },
    },
    methods: {
      ...mapActions([
        'd2adminSetMenuAside'
      ]),
      oepnDialog(item){
        this.dialogShow =true;
        //根据角色Id获取角色的权限列表
        this.$api.role.getMenuById({accessId:item.id}).then(res=>{
          this.tableData = res.data;
          this.currAccessId = item.id;
        })
      },
      save(){
        let vo = [];
        this.tableData.forEach(item=>{
          //如果有relId则说明是update，否则认为是新增
          if(item.isYes && !item.relId){
            vo.push({
              menuId:item.menuId,
              accessId:this.currAccessId,
            })
          }else if(item.relId && !item.isYes){
            vo.push({
              menuId:item.menuId,
              relId:item.relId
            })
          }
        });
        //保存
        this.$api.role.seveMenuById(vo).then(res=>{
          if(res.code===0){
            this.dialogShow = false;
            this.$message.success('保存成功！');
            //更新菜单权限
            this.d2adminSetMenuAside({vm:this});
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      afterFetchData(){

      }
    },
    mounted() {

    }
  };
</script>
