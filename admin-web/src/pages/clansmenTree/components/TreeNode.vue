<template>
  <div class="clansmen-node" >
    <div class="clansmen-node-view">
      <div class="node">
        <div class="node-wrap">
          <div class="name">
            <span class="mr5 normal">{{clansman.scName}}</span>
            <span class="">{{clansman.clansmanName}}</span>
            <i class="el-icon-arrow-down fr" v-if="!showMore" @click="showMore=true"></i>
            <i class="el-icon-arrow-up fr" v-else @click="showMore=false"></i>
            <i class="el-icon-edit fr mr5" @click="openDialog(clansman,true)"></i>
          </div>
          <div class="desc" v-show="showMore">
            <div class="">房系：{{clansman.directoryName}}</div>
            <div class="">简介：{{clansman.clansmanDec}}</div>
            <div>妻子:</div>
            <div class="" v-for="wife in clansman.spouseDtoList">
              <span class="normal">{{ wife.spouseName}}</span>
              <span class="normal">{{ wife.spouseBirthDay}}</span>
              <span class="normal">{{ wife.spouseendDay}}</span>
              <span class="normal">{{ wife.spouseDec}}</span>
            </div>
          </div>
        </div>
        <div class="add">
          <el-button icon="el-icon-circle-plus" style="font-size: 18px; margin-left:2px;padding: 4px" circle @click="openDialog(clansman)" size="mini" title="添加子嗣"></el-button>
        </div>
      </div>

      <div class="clansmen-tree border"  v-if="clansman.children.length>0">
          <TreeNode v-for=" item in clansman.children" @getData="getData" :clansman="item"></TreeNode>
      </div>
    </div>
    <el-dialog style="text-align: left" :title="dialogVO.id?'编辑宗亲信息':'添加子嗣'" :visible.sync="dialogShow" width="800px">
      <el-form ref="dialogVO" :model="dialogVO" label-width="100px" :rules="rules" style="text-align: left">
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
  import listMixin from "@/mixins/list.mixin";
  import { cloneDeep } from 'lodash';
  const defaultDialogVO = {
    "id": '',
    "clanId": '',
    "scId": '',
    "directoryId": '',
    "parentId": '',
    "clansmanName": '',
    "clansmanBirthDay":'',
    "clansmanendDay": '',
    "clansmanDec": '',
    "auditUserId": 0,
    "spouseDtoList": [
      {
        spouseName:'',
        spouseBirthDay:'',
        spouseendDay:'',
        spouseDec:''
      },
    ]
  }
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "ClansmenTree",
    components: {},
    mixins: [
      listMixin
    ],
    props:{
      clansman:{
        type:Object,
        default:[]
      }
    },
    data() {
      return {
        clansmenList:[],
        dialogShow:false,
        showMore:false,
        dialogVO:cloneDeep(defaultDialogVO),
        rules:{}
      };
    },
    computed: {
      getActionWhere() {
        return {
          clanId:this.clanId
        }
      },
    },
    methods: {
      //打开子嗣或者编辑
      openDialog(vo,edit){
        this.dialogShow = true;
        if(edit){
          delete vo.directoryId;
          delete vo.scId;
          let newVo = cloneDeep(vo);
          this.dialogVO= {
            id:newVo.id,
            auditUserId:'',
            clansmanId:newVo.clansmanId,
            clansmanBirthDay:newVo.clansmanBirthDay,
            clansmanDec:newVo.clansmanDec,
            clansmanName:newVo.clansmanName,
            clansmanendDay:newVo.clansmanendDay,
            spouseDtoList: newVo.spouseDtoList
          };
          return
        }
        this.dialogVO={
          auditUserId:'',
          clanId:this.clanId,
          clansmanBirthDay: "",
          clansmanDec: "",
          clansmanName: "",
          clansmanendDay: "",
          directoryId:vo.directoryId,
          parentId:vo.clansmanId,
          scId:vo.scId,
          spouseDtoList: [{spouseName: "", spouseBirthDay: "", spouseendDay: "", spouseDec: ""}]
        };
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
        this.$emit('getData');
      },
      save(){
        this.$refs['dialogVO'].validate((valid) => {
          if (valid) {
            let vo = cloneDeep(this.dialogVO);
            vo.clanId = this.clanId;
            vo.auditUserId = this.userInfo.userId;
            this.$api.clansmen.add(vo).then(res => {
              if (res.code == 0) {
                this.dialogShow = false;
                this.getData();
                this.$message.success(vo.id ? '修改成功！':'新增成功！');
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            return false;
          }
        });
      }
    },
    mounted() {
    }
  };
</script>