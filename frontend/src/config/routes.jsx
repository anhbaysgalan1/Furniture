import React, { lazy } from 'react'
import _ from 'lodash'
import { I18n } from 'react-redux-i18n'
import { Redirect } from 'react-router'
const UserIndex     = lazy(() => import('containers/User/Index'))
const CenterIndex   = lazy(() => import('containers/Center/Index'))
const InfoIndex     = lazy(() => import('containers/Info/Index'))
const ContactIndex  = lazy(() => import('containers/Contact/Index'))

const GoodsIndex  = lazy(() => import('containers/Goods/Index'))
const GoodsCreate = lazy(() => import('containers/Goods/Create'))
const GoodsEdit   = lazy(() => import('containers/Goods/Edit'))

const OrderIndex   = lazy(() => import('containers/Order/Index'))
const OrderCreate  = lazy(() => import('containers/Order/Create'))
const OrderEdit    = lazy(() => import('containers/Order/Edit'))

const BadIndex              = lazy(() => import('containers/Bad/Index'))
const DiningRoomIndex       = lazy(() => import('containers/DiningRoom/Index'))
const TableEatIndex         = lazy(() => import('containers/TableEat/Index'))
const TableRestaurantIndex  = lazy(() => import('containers/TableRestaurant/Index'))
const WindWaterChangeTable  = lazy(() => import('containers/WindWater/ChangeTable'))
const WindWaterSizeBad      = lazy(() => import('containers/WindWater/SizeBad'))


const routes = [
    // {
    //     path: "/",
    //     component: () => <CenterIndex to="/center" />,
    //     exact: true
    // },
    {
        path: "/center",
        name: 'center',
        title: () => I18n.t("Breadcrumb.centerIndex"),
        component: () => <CenterIndex />,
        exact: true,
        sidebarName: 'center'
    },
    {
        path: "/info",
        name: 'info',
        title: () => I18n.t("Breadcrumb.infoIndex"),
        component: () => <InfoIndex />,
        exact: true,
        sidebarName: 'info'
    },
    {
        path: "/bad",
        name: 'bad',
        title: () => I18n.t("Breadcrumb.badIndex"),
        component: () => <BadIndex />,
        exact: true,
        sidebarName: 'bad'
    },
    {
        path: "/dining-room",
        name: 'diningRoom',
        title: () => I18n.t("Breadcrumb.diningRoomIndex"),
        component: () => <DiningRoomIndex />,
        exact: true,
        sidebarName: 'diningRoom'
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
        path: "/table-restaurant",
        name: 'tableRestaurant',
        title: () => I18n.t("Breadcrumb.TableRestaurantIndex"),
        component: () => <TableRestaurantIndex />,
        exact: true,
        sidebarName: 'tableRestaurant'
    },
    {
        path: "/contact",
        name: 'contact',
        title: () => I18n.t("Breadcrumb.contactIndex"),
        component: () => <ContactIndex />,
        exact: true,
        sidebarName: 'contact'
    },
    {
        path: "/size-bad",
        name: 'sizebad',
        title: () => I18n.t("Breadcrumb.windWaterIndex"),
        component: () => <WindWaterSizeBad />,
        exact: true,
        sidebarName: 'windwater'
    },
    {
        path: "/change-table",
        name: 'changetable',
        title: () => I18n.t("Breadcrumb.windWaterChangeTable"),
        component: () => <WindWaterChangeTable />,
        exact: true,
        sidebarName: 'windwater'
    },
    {
        path: "/users",
        name: 'user',
        title: () => I18n.t("Breadcrumb.userIndex"),
        component: () => <UserIndex />,
        exact: true,
        sidebarName: 'user'
    },
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
    }
]

export default routes
