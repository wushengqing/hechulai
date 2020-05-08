<template>
  <div class="clansmen-tree">
    <div class="clansmen-node"  v-for=" item in data">
      <div class="node">
        <div class="name">
          <span class="normal mr20">{{item.clanName}}</span>
          <span class="normal">{{item.scName}}</span>
        </div>
        <div class="desc">
          <div class="normal">{{item.clansmanDec}}</div>
          <div>妻子:</div>
          <div class="" v-for="wife in item.spouseDtoList">
            <span class="normal">{{ wife.spouseName}}</span>
            <span class="normal">{{ wife.spouseBirthDay}}</span>
            <span class="normal">{{ wife.spouseendDay}}</span>
            <span class="normal">{{ wife.spouseDec}}</span>
          </div>
          <el-button type="text" size="mini">详细介绍</el-button>
        </div>
        <div class="add">
          <el-button type="warning" size="mini">添加子嗣</el-button>
        </div>
      </div>
      <TreeNode v-if="item.children.length>0" :data="item.children"></TreeNode>
    </div>
  </div>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  import { cloneDeep } from 'lodash'
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
    auditUserId: 0,
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
    components: {},
    mixins: [
      listMixin
    ],
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
        clansmenList:[],
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
        padding: 5px;
      }
    }
  }
</style>