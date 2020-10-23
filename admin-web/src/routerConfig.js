/* eslint-disable */
// 工具
import UtilIce from '@/libs/util-ice.js'; // 页面和布局
import layout from './layout/HeaderAside';

// 变量名 routerConfig 为 iceworks 检测关键字
import Index from './pages/Index';
import Login from './pages/Login';
import Error401 from './pages/Error401';
import Error404 from './pages/Error404';

//宗族管理
import UnionList from '@/pages/union/List/index.vue';
//角色管理
import RoleList from '@/pages/role/List/index.vue';
//菜单管理
import MenuList from '@/pages/menu/List/index.vue';
//用户管理
import UserList from '@/pages/user/List/index.vue';
//宗亲管理
import ClansmenList from '@/pages/clansmenTree/List/index.vue';
//banner图管理
import BannerList from '@/pages/banner/List/index.vue';
//新闻管理
import NewsList from '@/pages/news/List/index.vue';
//公告管理
import NoticeList from '@/pages/notice/List/index.vue';
//宗亲管理
import GenerationList from '@/pages/generation/List/index.vue';
//目录管理
import BranchList from '@/pages/branch/List/index.vue';
//风采管理
import ProjectList from '@/pages/project/List/index.vue';
//审核管理
import ApproveList from '@/pages/approve/List/index.vue';
//审核管理
import AncestralHall from '@/pages/ancestralHall/List/index.vue';

//宗族圈
import CircleIndex from '@/pages/circle/index.vue'
import CircleDetail from '@/pages/circle/detail.vue'


const routerConfig = [
  {
    path: '/',
    name: 'index',
    layout,
    component: Index,
  },
];

// 不参与菜单显示的
// ice 不会处理这部分
// 但是这部分路由也会被注册
// 处理规则同 routerConfig
const routerConfigMenuOut = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/401',
    name: 'Unauthorized',
    layout,
    component: Error401,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '*',
    component: Error404,
  },
];

// 导出全部路由设置
export const pageRouter = [
  {
    path: '/union/list',
    name: 'UnionList',
    layout,
    component: UnionList,
    meta: {
      title: '宗族管理(超管)',
    }
  },
  {
    path: '/role/list',
    name: 'RoleList',
    layout,
    component: RoleList,
    meta: {
      title: '角色管理',
    }
  },
  {
    path: '/menu/list',
    name: 'MenuList',
    layout,
    component: MenuList,
    meta: {
      title: '菜单管理',
    }
  },
  {
    path: '/user/list',
    name: 'UserList',
    layout,
    component: UserList,
    meta: {
      title: '用户管理',
    }
  },
  {
    path: '/clansmen/list',
    name: 'ClansmenList',
    layout,
    component: ClansmenList,
    meta: {
      title: '宗亲管理',
    }
  },
  {
    path: '/banner/list',
    name: 'BannerList',
    layout,
    component: BannerList,
    meta: {
      title: '轮播图管理',
    }
  },
  {
    path: '/news/list',
    name: 'NewsList',
    layout,
    component: NewsList,
    meta: {
      title: '新闻管理',
    }
  },
  {
    path: '/notice/list',
    name: 'NoticeList',
    layout,
    component: NoticeList,
    meta: {
      title: '公告管理',
    }
  },
  {
    path: '/album/list',
    name: 'BannerList',
    layout,
    component: BannerList,
    meta: {
      title: '相册管理',
    }
  },
  {
    path: '/project/list',
    name: 'ProjectList',
    layout,
    component: ProjectList,
    meta: {
      title: '乐捐管理',
    }
  },
  {
    path: '/generation/list',
    name: 'GenerationList',
    layout,
    component: GenerationList,
    meta: {
      title: '世称管理',
    }
  },
  {
    path: '/branch/list',
    name: 'BranchList',
    layout,
    component: BranchList,
    meta: {
      title: '族谱目录管理',
    }
  },
  {
    path: '/approve/list',
    name: 'ApproveList',
    layout,
    component: ApproveList,
    meta: {
      title: '审核员管理',
    }
  },
  {
    path: '/ancestralHall/list',
    name: 'AncestralHall',
    layout,
    component: AncestralHall,
    meta: {
      title: '宗祠/祖坟管理',
    }
  },
  {
    path: '/circle/home',
    name: 'CircleIndex',
    layout,
    component: CircleIndex,
    meta: {
      title: '宗族圈',
    }
  },
  {
    path: '/circle/detail/:id',
    name: 'CircleDetail',
    layout,
    component: CircleDetail,
    meta: {
      title: '宗族圈详情',
    }
  },
]


export default UtilIce.recursiveRouterConfig([
  ...pageRouter,
  ...routerConfigMenuOut,
  ...routerConfig
]);






// 导出参与多标签页处理的路由设置
// 这个数据会在 mian.js 中使用
export const frameInRoutes = UtilIce.recursiveRouterConfig([
  ...routerConfig,
  ...pageRouter
]).map(
  e => {
    const route = e.children ? e.children[0] : e;
    return {
      path: e.path,
      name: route.name,
      meta: route.meta,
    };
  }
);
