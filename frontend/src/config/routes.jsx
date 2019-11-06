import React, { lazy } from 'react'
import _ from 'lodash'
import { I18n } from 'react-redux-i18n'
import { Redirect } from 'react-router'
const NotFound      = lazy(() => import('../layouts/NotFound'))
const UserIndex     = lazy(() => import('containers/User/Index'))
const CenterIndex   = lazy(() => import('containers/Center/Index'))
const InfoIndex     = lazy(() => import('containers/Info/Index'))
const ContactIndex  = lazy(() => import('containers/Contact/Index'))
const GoodsIndex    = lazy(() => import('containers/Goods/Index'))
const GoodsCreate   = lazy(() => import('containers/Goods/Create'))
const GoodsEdit     = lazy(() => import('containers/Goods/Edit'))
const OrderIndex    = lazy(() => import('containers/Order/Index'))
// const OrderCreate  = lazy(() => import('containers/Order/Create'))
// const OrderEdit    = lazy(() => import('containers/Order/Edit'))
const ClientIndex    = lazy(() => import('containers/Client/Index'))
const ClientCreate  = lazy(() => import('containers/Client/Create'))
const ClientEdit    = lazy(() => import('containers/Client/Edit'))

const BadIndex              = lazy(() => import('containers/Bad/Index'))
const DiningRoomIndex       = lazy(() => import('containers/DiningRoom/Index'))
const TableEatIndex         = lazy(() => import('containers/TableEat/Index'))
const TableRestaurantIndex  = lazy(() => import('containers/TableRestaurant/Index'))
const PostsChangeTable      = lazy(() => import('containers/Posts/ChangeTable'))
const PostsSizeBad          = lazy(() => import('containers/Posts/SizeBad'))
const PostsConvenient       = lazy(() => import('containers/Posts/Convenient'))
const PostsExport           = lazy(() => import('containers/Posts/Export'))
const PostsGuarantee        = lazy(() => import('containers/Posts/Guarantee'))
const PostsQuality          = lazy(() => import('containers/Posts/Quality') )
const PostsFrequentlyQuestions = lazy(() => import('containers/Posts/FrequentlyQuestions') )
const PostsInteriorTrend    = lazy(() => import('containers/Posts/InteriorTrend') )
const PostsBadSmart         = lazy(() => import('containers/Posts/BadSmart') )
const PostsTableEatHot         = lazy(() => import('containers/Posts/TableEatHot') )
// 

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
        path: "/table-eat",
        name: 'tableEat',
        title: () => I18n.t("Breadcrumb.tableEatIndex"),
        component: () => <TableEatIndex />,
        exact: true,
        sidebarName: 'tableEat'
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
        sidebarName: 'posts'
    },
    {
        path: "/size-bad",
        name: 'sizebad',
        title: () => I18n.t("Breadcrumb.postsSizebad"),
        component: () => <PostsSizeBad />,
        exact: true,
        sidebarName: 'posts'
    },
    {
        path: '/5-cau-hoi-thuong-gap',
        name: 'frequently.questions',
        title: () => I18n.t("Breadcrumb.postsFrequentlyQuestions"),
        component: () => <PostsFrequentlyQuestions />,
        exact: true,
        sidebarName: 'posts'
    },
    {
        path: '/xu-huong-noi-that-2020',
        name: 'interior.trend',
        title: () => I18n.t("Breadcrumb.postsPostsInteriorTrend"),
        component: () => <PostsInteriorTrend />,
        exact: true,
        sidebarName: 'posts'
    },
    {
        path: '/giuong-ngu-thong-minh',
        name: 'bad.smart',
        title: () => I18n.t("Breadcrumb.postsBadSmart"),
        component: () => <PostsBadSmart />,
        exact: true,
        sidebarName: 'posts'
    },
    {
        path: '/ban-an-hot',
        name: 'table-eat-hot',
        title: () => I18n.t("Breadcrumb.postsTableEatHot"),
        component: () => <PostsTableEatHot />,
        exact: true,
        sidebarName: 'posts'
    },
    
    // 
    {
        path: "/convenient",
        name: 'Convenient',
        title: () => I18n.t("Breadcrumb.postsConvenient"),
        component: () => <PostsConvenient />,
        exact: true,
        sidebarName: 'posts'
    },
    {
        path: "/export",
        name: 'export',
        title: () => I18n.t("Breadcrumb.postsExport"),
        component: () => <PostsExport />,
        exact: true,
        sidebarName: 'posts'
    },
    {
        path: "/guarantee",
        name: 'guarantee',
        title: () => I18n.t("Breadcrumb.postsGuarantee"),
        component: () => <PostsGuarantee />,
        exact: true,
        sidebarName: 'posts'
    },
    {
        path: "/quality",
        name: 'quality',
        title: () => I18n.t("Breadcrumb.postsQuality"),
        component: () => <PostsQuality />,
        exact: true,
        sidebarName: 'posts'
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
