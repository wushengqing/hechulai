<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">宗祠管理</template>

			<!---->
			<table-comb
					name="宗祠管理"
					ref="tableMain"
					:search-model-base="tableMainSearchModelBase"
					:get-action="$api.banner.list"
					:get-action-where="getActionWhere">
				<!--基础查询-->
				<template slot="baseSearchForm" slot-scope="scope">
					<el-input placeholder="请输入关键字" prefix-icon="el-icon-search" clearable v-model="scope.form.keyword" style="width: 250px; margin-left: 10px; margin-right: 10px">
					</el-input>
					 <el-button class="fr ml10" @click="openEditPage()">新增</el-button>
				</template>
				<!--表格-->
				<template slot="tableColumns">
					<el-table-column prop="mienTitle" label="宗祠名称" min-width="100">
						<template slot-scope="props">
							<div class="ellipsis" :title="props.row.mienTitle">{{ props.row.mienTitle }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="userNum" label="所在地址">
					</el-table-column>
					<el-table-column prop="linkUrl" label="简介" min-width="300">
						<template slot-scope="props">
							<div class="ellipsis" :title="props.row.mienTitle">{{ props.row.mienTitle }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="userNum" label="关联宗亲">
					</el-table-column>

					<el-table-column label="操作" width="200px">
						<template slot-scope="props">
							<el-button type="text" size="mini" @click="openQrcodeDialog(props.row)">相册管理</el-button>
							<el-button v-if="props.row.status!==1" type="text" size="mini" @click="openEditPage(props.row)">编辑</el-button>
							<el-button v-if="props.row.isTop" type="text" size="mini" @click="setTop(props.row.id,false)">取消置顶</el-button>
							<el-button v-else type="text" size="mini" @click="setTop(props.row.id,true)">置顶</el-button>
						</template>
					</el-table-column>
				</template>
			</table-comb>
			<template slot="footer"></template>
		</d2-container>
		<Edit ref="editPage" @back="refreshTable" />
		<el-dialog title="扫码预览" :visible.sync="dialogShow" width="240px" destroy-on-close>
			<div id="qrcode" ref="qrcode"></div>
		</el-dialog>
	</div>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  import Edit from '../Edit'
  import QRCode from "qrcodejs2";
  export default {
    // 如果需要缓存页 name 字段需要设置为和本页路由 name 字段一致
    name: "NewsList",
    components: {
      Edit,
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
		//1 banner图 2 新闻
        mienType:2,
        dialogShow:false,
        qrcodeObj:false
      }
    },
    computed: {
      getActionWhere() {
        return {
          clanId:this.clanId,
          mienType:this.mienType,
        }
      }
    },
    methods: {
      openEditPage(item){
        this.$refs.editPage.open(item);
	  },
      setTop(id,isTop){
        this.$api.banner.save({
		  id,
          isTop
		}).then(res=>{
          if(res.code===0){
            this.$message.success('操作成功！');
            this.refreshTable();
          }else{
            this.$message.error(res.msg)
          }
		})
	  },
	  //预览
	  openQrcodeDialog(item){
        this.dialogShow = true;
        setTimeout(()=>{
          this.qrcode();
		},0)

	  },
      qrcode (url='http://47.105.56.131:8080/web/index.html#/') {
        //
        this.qrcodeObj = new QRCode("qrcode", {
          width: 200, // 二维码宽度，单位像素
          height: 200, // 二维码高度，单位像素
          text: url // 生成二维码的链接
        });
      },
    },
    mounted() {
    }
  };
</script>
