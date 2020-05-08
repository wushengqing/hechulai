<template>
  <div class="workapply-area">
    <d2-container>
      <template slot="header">宗亲列表</template>
      <div class="clansmen-tree"  >
        <div class="clansmen-node" v-if="clansmenList.length===0">
          <div class="name">
            <span class="">待添加</span>
          </div>
          <div class="desc">
            <el-button size="mini" type="primary" @click="openDialog()" style="margin-top: 20px" >新增宗亲</el-button>
          </div>
          <!--<div class="more">
            <el-button type="text" size="mini">详细></el-button>
          </div>-->
        </div>
        <tree-node v-else :data="clansmenTree"></tree-node>
      </div>

      <!---->

      <template slot="footer"></template>
    </d2-container>
    <el-dialog :title="dialogVO.id?'添加子嗣':'新增'" :visible.sync="dialogShow" width="800px">
      <el-form ref="dialogVO" :model="dialogVO" label-width="100px" :rules="rules">
        <el-form-item label="宗亲姓名：" prop="clansmanName">
          <el-input class="w200" v-model="dialogVO.clansmanName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="出生日期：" prop="name">
          <el-input  class="w200"  v-model="dialogVO.clansmanBirthDay" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="去世日期：" prop="name">
          <el-input  class="w200"  v-model="dialogVO.clansmanendDay" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="clansmanDec" label="宗亲简介">
          <el-input v-model="dialogVO.clansmanDec" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="夫人列表：" width="180">
          <el-table :data="dialogVO.spouseDtoList" style="width: 100%" border size="mini">
            <el-table-column prop="spouseName" label="姓名" width="120">
              <template slot-scope="props">
                <el-input v-model="props.row.spouseName" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="spouseBirthDay" label="出生日期" width="135">
              <template slot-scope="props">
                <el-input v-model="props.row.spouseBirthDay" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="spouseendDay" label="死亡日期" width="135">
              <template slot-scope="props">
                <el-input v-model="props.row.spouseendDay" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="简介">
              <template slot-scope="props">
                <el-input v-model="props.row.spouseDec" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  circle
                  size="mini"
                  title="添加到本条记录后面"
                  @click="addWife(scope.$index)"
                  icon="el-icon-circle-plus-outline"></el-button>
                <el-button
                  type="danger"
                  title="删除"
                  circle
                  size="mini"
                  :disabled="dialogVO.spouseDtoList.length<=1"
                  @click="deleteWife(scope.$index)"
                  icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button @click="dialogShow = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import listMixin from "@/mixins/list.mixin";
  import { cloneDeep } from 'lodash'
  import TreeNode from '../components/TreeNode'
  Vue.component("TreeNode",TreeNode);
  const defaultDialogVO = {
    // "id": '',
    // "clanId": '',
    // "scId": '',
    // "directoryId": '',
    // "parentId": '',
    // "clansmanName": '',
    // "clansmanBirthDay":'',
    // "clansmanendDay": '',
    // "clansmanDec": '',
    // "auditUserId": 0,
    // "spouseDtoList": [
    //   {
    //     spouseName:'',
    //     spouseBirthDay:'',
    //     spouseendDay:'',
    //     spouseDec:''
    //   },
    // ]
    auditUserId:'',
    clanId: 1,
    clansmanBirthDay: "公元856年",
    clansmanDec: "开山始祖",
    clansmanName: "巫罗俊",
    clansmanendDay: "公元956年",
    directoryId: "",
    parentId: "",
    scId: "",
    spouseDtoList: [{spouseName: "张氏", spouseBirthDay: "公元851年", spouseendDay: "公元926年", spouseDec: "妻子1"}]
  }
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "ClansmenTree",
    components: {
      TreeNode
    },
    mixins: [
      listMixin
    ],
    data() {
      return {
        clansmenList:[],
        clansmenTree:[],
        branchList:[],
        dialogShow:false,
        dialogVO:cloneDeep(defaultDialogVO),
        rules:{}
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
      //打开新增或者编辑弹出
      openDialog(vo){
        if(this.branchList.length===0){
          this.$message.error('没有获取到房系列表')
          return false
        }
        this.dialogShow = true;
        if(!vo){
          this.dialogVO=cloneDeep(defaultDialogVO);
          this.dialogVO.scId = this.branchList[0].scIds[0].id;
          this.dialogVO.directoryId = this.branchList[0].id;
        }
      },
      //添加夫人
      addWife(index){
        this.dialogVO.spouseDtoList.splice(index,0,{
          spouseName:'',
          spouseBirthDay:'',
          spouseendDay:'',
          spouseDec:''
        })
      },
      deleteWife(index){
        this.dialogVO.spouseDtoList.splice(index,1)
      },
      getData(){
        //获取宗亲列表
        this.$api.clansmen.list({
          clanId:this.clanId,
          pageSize:10000,
          currentPage:1
        }).then(res=>{
          this.setClansmenTree(cloneDeep(res.data));
          this.clansmenList = cloneDeep(res.data);
        });
      },
      //数组转树结构
      setClansmenTree(clansmenList){
        if(clansmenList.length===0){
          this.clansmenTree = [];
          return
        }
        let passIds = [];
        let treeNodes = [];
        //获取跟节点
        clansmenList.map(item=>{
          if(!item.parentId){
            passIds.push(item.id);
            treeNodes.push(item);
            //拼接子节点
            item.children = getChildren(item);

          }
        });

        //获取子节点
        function getChildren(pNode) {
          let childrenNodes = clansmenList.filter(node=>{
            return node.parentId === pNode.id
          });
          childrenNodes.map(childrenNode=>{
            passIds.push(childrenNode.id);
            childrenNode.children = getChildren(childrenNode)
            //递归获取子节点
            if(childrenNode.children.length>0){
              childrenNode.children.map(child=>{
                child.children =  getChildren(item)
              })
            }
          });
          return childrenNodes;
        }
        this.clansmenTree = treeNodes
      },
      save(){

        this.$refs['dialogVO'].validate((valid) => {
          if (valid) {
            let vo = cloneDeep(this.dialogVO);
            //新增
            if (!vo.id) {
              delete vo.id;
            }
            vo.clanId = this.clanId;
            this.$api.clansmen.add(vo).then(res => {
              if (res.code == 0) {
                this.dialogShow = false;
                this.getData();
                this.$message.success('新增成功！');
              } else {
                this.$message.error(res.errorMessage)
              }
            })
          } else {
            return false;
          }
        });
      }
    },
    mounted() {
      this.getData();
      //获取房系列表
      this.$api.branch.list({clanId:this.clanId}).then(res=>{
        this.branchList = res.data;
      });
    }
  };
</script>
<style  lang="scss">
  .clansmen-tree{
    text-align: center;
    margin: 20px 0 0 0;
    display: flex;
    .clansmen-node{
      flex: 1;
      margin:0 50px 50px ;
    }
    .node{
      display: inline-block;
      width: 150px;
      background: #fff;
      border:#eee solid 1px;
      line-height: 20px;
      min-height: 100px;
      font-size: 12px;
      border-radius: 5px;
      overflow: hidden;
      .name{
        text-align: left;
        padding: 5px;
        background: #2f74ff;
        color: #fff;
        height: 20px;
        overflow: hidden;
        .normal{
          border-bottom: #fff dashed 1px;
          cursor: pointer;
        }
      }
      .desc{
        text-align: left;
        padding: 5px 10px;
      }
      .add{
        padding-bottom: 10px;
      }
    }
  }
</style>