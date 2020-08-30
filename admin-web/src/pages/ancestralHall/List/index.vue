<template>
	<div class="workapply-area">
		<d2-container>
			<template slot="header">宗祠/祖坟管理</template>

			<!---->
			<table-comb
					name="宗祠/祖坟管理"
					ref="tableMain"
					:showPagination="false"
					:search-model-base="tableMainSearchModelBase"
					:get-action="$api.ancestralHall.list"
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
							<div class="ellipsis" :title="props.row.name">{{ props.row.name }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="ancestralHallAddess" label="所在地址">
					</el-table-column>
					<el-table-column prop="ancestralHallDec" label="简介" min-width="300">
						<template slot-scope="props">
							<div class="ellipsis" :title="props.row.ancestralHallDec">{{ props.row.ancestralHallDec }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="userNum" label="关联宗亲">
						<template slot-scope="props">
							<div class="ellipsis" :title="toStringClanManList(props.row)">{{ toStringClanManList(props.row) }}</div>
						</template>
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
        },
        dialogShow:false,
      }
    },
    computed: {
      getActionWhere() {
        return {
          clanId:this.clanId,
        }
      }
    },
    methods: {
      openEditPage(item){
        this.$refs.editPage.open(item);
	  },
      toStringClanManList(vo){
        let names = vo.clanManList.map(item=>item.name);
        return names.join(',')
	  }
    },
    mounted() {
    }
  };
</script>
