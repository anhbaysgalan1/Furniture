import React, { lazy } from 'react'
import _ from 'lodash'
import { I18n } from 'react-redux-i18n'
import { Redirect } from 'react-router'

const NotFound          = lazy(() => import('../layouts/NotFound'))
const Example           = lazy(() => import('components/Forms/Example'))
const UserIndex         = lazy(() => import('containers/User/Index'))
const UserCreate        = lazy(() => import('containers/User/Create'))
const UserEdit          = lazy(() => import('containers/User/Edit'))
const CenterIndex       = lazy(() => import('containers/Center/Index'))
const InfoIndex         = lazy(() => import('containers/Info/Index'))
const ContactIndex      = lazy(() => import('containers/Contact/Index'))
const GoodsIndex        = lazy(() => import('containers/Goods/Index'))
const GoodsCreate       = lazy(() => import('containers/Goods/Create'))
const GoodsEdit         = lazy(() => import('containers/Goods/Edit'))

const OrderIndex        = lazy(() => import('containers/Order/Index'))
const OrderCreate    = lazy(() => import('containers/Order/Create'))
const OrderEdit      = lazy(() => import('containers/Order/Edit'))

const FinanceIndex     = lazy(() => import('containers/Finance/Index'))
const FinanceCreate    = lazy(() => import('containers/Finance/Create'))
const FinanceEdit      = lazy(() => import('containers/Finance/Edit'))

const ClientIndex       = lazy(() => import('containers/Client/Index'))
const ClientCreate      = lazy(() => import('containers/Client/Create'))
const ClientEdit        = lazy(() => import('containers/Client/Edit'))
const PostsIndex        = lazy(() => import('containers/Posts/Index'))
const PostsCreate       = lazy(() => import('containers/Posts/Create'))
const PostsEdit         = lazy(() => import('containers/Posts/Edit'))
const PostsDetail       = lazy(() => import('containers/Posts/Detail'))

const BadIndex              = lazy(() => import('containers/Bad/Index'))
const TableEatIndex         = lazy(() => import('containers/TableEat/Index'))
const TableRestaurantIndex  = lazy(() => import('containers/TableRestaurant/Index'))
const WardrobeIndex         = lazy(() => import('containers/Wardrobe/Index'))
const ShoesCabinetIndex     = lazy(() => import('containers/ShoesCabinet/Index'))
const TVCabinetIndex        = lazy(() => import('containers/TVCabinet/Index'))
const TableLivingRoomIndex  = lazy(() => import('containers/TableLivingRoom/Index'))
const OfficeIndex         = lazy(() => import('containers/Office/Index'))

const DiningRoomIndex       = lazy(() => import('containers/DiningRoom/Index'))

const PostsChangeTable      = lazy(() => import('containers/Posts/ChangeTable'))
const PostsSizeBad          = lazy(() => import('containers/Posts/SizeBad'))
const PostsConvenient       = lazy(() => import('containers/Posts/Convenient'))
const PostsExport           = lazy(() => import('containers/Posts/Export'))
const PostsGuarantee        = lazy(() => import('containers/Posts/Guarantee'))
const PostsQuality          = lazy(() => import('containers/Posts/Quality'))
const PostsInteriorTrend    = lazy(() => import('containers/Posts/InteriorTrend'))
const PostsBadSmart         = lazy(() => import('containers/Posts/BadSmart'))
const PostsTableEatHot      = lazy(() => import('containers/Posts/TableEatHot'))
const PostsFrequentlyQuestions = lazy(() => import('containers/Posts/FrequentlyQuestions'))

const routes = [
    {
        path: "/",
        component: () => {
            let link = '/center'
            return <CenterIndex to={link ? link : './not-found'} />
        },
        exact: true,
        name: 'dashboard'
    },
    //--------------------------------------
    {
        path: "/not-found",
        component: () => <NotFound />,
        exact: true,
        name: 'dashboard'
    },
    //--------------------------------------
    {
        path: "/example",
        name: 'example',
        title: () => I18n.t("Breadcrumb.userIndex"),
        component: () => <Example />,
        exact: true,
        sidebarName: 'example'
      },
    //--------------------------------------
    {
        path: "/center",
        name: 'center',
        title: () => I18n.t("Breadcrumb.centerIndex"),
        component: () => <CenterIndex />,
        exact: true,
        sidebarName: 'center'
    },
    //--------------------------------------
    {
        path: "/info",
        name: 'info',
        title: () => I18n.t("Breadcrumb.infoIndex"),
        component: () => <InfoIndex />,
        exact: true,
        sidebarName: 'info'
    },
    //--------------------------------------
    {
        path: "/bad",
        name: 'bad',
        title: () => I18n.t("Breadcrumb.badIndex"),
        component: () => <BadIndex />,
        exact: true,
        sidebarName: 'bad'
    },
    {
        path: "/table-eat",
        name: 'tableEat',
        title: () => I18n.t("Breadcrumb.tableEatIndex"),
        component: () => <TableEatIndex />,
        exact: true,
        sidebarName: 'tableEat'
    },
    {
        path: "/wardrobe",
        name: 'wardrobe',
        title: () => I18n.t("Breadcrumb.wardrobeIndex"),
        component: () => <WardrobeIndex />,
        exact: true,
        sidebarName: 'wardrobe'
    },
    {
        path: "/shoes-cabinet",
        name: 'shoesCabinet',
        title: () => I18n.t("Breadcrumb.shoesCabinetIndex"),
        component: () => <ShoesCabinetIndex />,
        exact: true,
        sidebarName: 'shoesCabinet'
    },
    {
        path: "/tv-cabinet",
        name: 'tvCabinet',
        title: () => I18n.t("Breadcrumb.tvCabinetIndex"),
        component: () => <TVCabinetIndex />,
        exact: true,
        sidebarName: 'tvCabinet'
    },
    {
        path: "/table-living-room",
        name: 'tableLivingRoom',
        title: () => I18n.t("Breadcrumb.tableLivingRoomIndex"),
        component: () => <TableLivingRoomIndex />,
        exact: true,
        sidebarName: 'tableLivingRoom'
    },
    {
        path: "/office",
        name: 'office',
        title: () => I18n.t("Breadcrumb.officeIndex"),
        component: () => <OfficeIndex />,
        exact: true,
        sidebarName: 'office'
    },

    //--------------------------------------
    {
        path: "/dining-room",
        name: 'diningRoom',
        title: () => I18n.t("Breadcrumb.diningRoomIndex"),
        component: () => <DiningRoomIndex />,
        exact: true,
        sidebarName: 'diningRoom'
    },
    //--------------------------------------
    {
        path: "/table-restaurant",
        name: 'tableRestaurant',
        title: () => I18n.t("Breadcrumb.TableRestaurantIndex"),
        component: () => <TableRestaurantIndex />,
        exact: true,
        sidebarName: 'tableRestaurant'
    },
    //--------------------------------------
    {
        path: "/contact",
        name: 'contact',
        title: () => I18n.t("Breadcrumb.contactIndex"),
        component: () => <ContactIndex />,
        exact: true,
        sidebarName: 'contact'
    },
    //--------------------------------------
    {
        path: "/change-table",
        name: 'changetable',
        title: () => I18n.t("Breadcrumb.postsChangeTable"),
        component: () => <PostsChangeTable />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: "/size-bad",
        name: 'sizebad',
        title: () => I18n.t("Breadcrumb.postsSizebad"),
        component: () => <PostsSizeBad />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: '/5-cau-hoi-thuong-gap',
        name: 'frequently.questions',
        title: () => I18n.t("Breadcrumb.postsFrequentlyQuestions"),
        component: () => <PostsFrequentlyQuestions />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: '/xu-huong-noi-that-2020',
        name: 'interior.trend',
        title: () => I18n.t("Breadcrumb.postsPostsInteriorTrend"),
        component: () => <PostsInteriorTrend />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: '/giuong-ngu-thong-minh',
        name: 'bad.smart',
        title: () => I18n.t("Breadcrumb.postsBadSmart"),
        component: () => <PostsBadSmart />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: '/ban-an-hot',
        name: 'table-eat-hot',
        title: () => I18n.t("Breadcrumb.postsTableEatHot"),
        component: () => <PostsTableEatHot />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: "/convenient",
        name: 'Convenient',
        title: () => I18n.t("Breadcrumb.postsConvenient"),
        component: () => <PostsConvenient />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: "/export",
        name: 'export',
        title: () => I18n.t("Breadcrumb.postsExport"),
        component: () => <PostsExport />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: "/guarantee",
        name: 'guarantee',
        title: () => I18n.t("Breadcrumb.postsGuarantee"),
        component: () => <PostsGuarantee />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: "/quality",
        name: 'quality',
        title: () => I18n.t("Breadcrumb.postsQuality"),
        component: () => <PostsQuality />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: '/posts',
        name: 'posts.index',
        title: () => I18n.t("Breadcrumb.postsIndex"),
        component: () => <PostsIndex />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: '/posts/create',
        name: 'posts.create',
        title: () => I18n.t("Breadcrumb.postsCreate"),
        component: () => <PostsCreate />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: '/posts/:id',
        name: 'posts.edit',
        title: () => I18n.t("Breadcrumb.postsEdit"),
        component: () => <PostsEdit />,
        exact: true,
        sidebarName: 'post'
    },
    {
        path: '/posts/:id/detail',
        name: 'posts.detail',
        title: () => I18n.t("Breadcrumb.postsDetail"),
        component: () => <PostsDetail />,
        exact: true,
        sidebarName: 'post'
    },
    //--------------------------------------

    {
        path: "/users",
        name: 'user',
        title: () => I18n.t("Breadcrumb.userIndex"),
        component: () => <UserIndex />,
        exact: true,
        sidebarName: 'user'
    },
    {
        path: "/users/create",
        name: 'user.create',
        title: () => I18n.t("Breadcrumb.userCreate"),
        component: () => <UserCreate />,
        exact: true,
        sidebarName: 'user'
    },
    {
        path: "/users/:id",
        name: 'user.edit',
        title: () => I18n.t("Breadcrumb.userEdit"),
        component: () => <UserEdit />,
        exact: true,
        sidebarName: 'user'
    },
    //--------------------------------------
    {
        path: "/goods",
        name: 'goods',
        title: () => I18n.t("Breadcrumb.goodsIndex"),
        component: () => <GoodsIndex />,
        exact: true,
        sidebarName: 'goods'
    },
    {
        path: "/goods/create",
        name: 'goods.create',
        title: () => I18n.t("Breadcrumb.goodsCreate"),
        component: () => <GoodsCreate />,
        exact: true,
        sidebarName: 'goods'
    },
    {
        path: "/goods/:id",
        name: 'goods.edit',
        title: () => I18n.t("Breadcrumb.goodsEdit"),
        component: () => <GoodsEdit />,
        exact: true,
        sidebarName: 'goods'
    },
    //--------------------------------------
    {
        path: "/order",
        name: 'order',
        title: () => I18n.t("Breadcrumb.orderIndex"),
        component: () => <OrderIndex />,
        exact: true,
        sidebarName: 'order'
    },
    {
        path: "/order/create",
        name: 'order.create',
        title: () => I18n.t("Breadcrumb.orderCreate"),
        component: () => <OrderCreate />,
        exact: true,
        sidebarName: 'order'
    },
    {
        path: "/order/:id",
        name: 'order.edit',
        title: () => I18n.t("Breadcrumb.orderEdit"),
        component: () => <OrderEdit />,
        exact: true,
        sidebarName: 'order'
    },
    //---------------------------------------
    {
        path: "/finance",
        name: 'finance',
        title: () => I18n.t("Breadcrumb.financeIndex"),
        component: () => <FinanceIndex />,
        exact: true,
        sidebarName: 'finance'
    },
    {
        path: "/finance/create",
        name: 'finance.create',
        title: () => I18n.t("Breadcrumb.financeCreate"),
        component: () => <FinanceCreate />,
        exact: true,
        sidebarName: 'finance'
    },
    {
        path: "/finance/:id",
        name: 'finance.edit',
        title: () => I18n.t("Breadcrumb.financeEdit"),
        component: () => <FinanceEdit />,
        exact: true,
        sidebarName: 'finance'
    },
    //---------------------------------------
    {
        path: "/client",
        name: 'client',
        title: () => I18n.t("Breadcrumb.clientIndex"),
        component: () => <ClientIndex />,
        exact: true,
        sidebarName: 'client'
    },
    {
        path: "/client/create",
        name: 'client.create',
        title: () => I18n.t("Breadcrumb.clientCreate"),
        component: () => <ClientCreate />,
        exact: true,
        sidebarName: 'client'
    },
    {
        path: "/client/:id",
        name: 'client.edit',
        title: () => I18n.t("Breadcrumb.clientEdit"),
        component: () => <ClientEdit />,
        exact: true,
        sidebarName: 'client'
    }
]

export default routes
