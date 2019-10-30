import React, { lazy } from 'react'
import _ from 'lodash'
import { I18n } from 'react-redux-i18n'
import { Redirect } from 'react-router'
const UserIndex     = lazy(() => import('containers/User/Index'))
const CenterIndex   = lazy(() => import('containers/Center/Index'))
const InfoIndex     = lazy(() => import('containers/Info/Index'))
const ContactIndex  = lazy(() => import('containers/Contact/Index'))
const ManageOrderIndex  = lazy(() => import('containers/ManageOrder/Index'))
const ManageGoodsIndex  = lazy(() => import('containers/ManageGoods/Index'))
const ManageGoodsCreate = lazy(() => import('containers/ManageGoods/Create'))
const ManageGoodsEdit   =  lazy(() => import('containers/ManageGoods/Edit'))

const BadIndex              = lazy(() => import('containers/Bad/Index'))
const DiningRoomIndex       = lazy(() => import('containers/DiningRoom/Index'))
const TableEatIndex         = lazy(() => import('containers/TableEat/Index'))
const TableRestaurantIndex  = lazy(() => import('containers/TableRestaurant/Index'))
const WindWaterChangeTable  = lazy(() => import('containers/WindWater/ChangeTable'))
const WindWaterSizeBad      = lazy(() => import('containers/WindWater/SizeBad'))


const routes = [
    // {
    //     path: "/",
    //     component: () => <Redirect to="/users" />,
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
        path: "/manage-order",
        name: 'manage.order',
        title: () => I18n.t("Breadcrumb.manageOrderIndex"),
        component: () => <ManageOrderIndex />,
        exact: true,
        sidebarName: 'manageOrder'
    },
    {
        path: "/manage-goods",
        name: 'manage.goods',
        title: () => I18n.t("Breadcrumb.manageGoodsIndex"),
        component: () => <ManageGoodsIndex />,
        exact: true,
        sidebarName: 'manageGoods'
    },
    {
        path: "/manage-goods/create",
        name: 'manage.goods.create',
        title: () => I18n.t("Breadcrumb.manageGoodsCreate"),
        component: () => <ManageGoodsCreate />,
        exact: true,
        sidebarName: 'manageGoods'
    },
    {
        path: "/manage-goods/:id",
        name: 'manage.goods.edit',
        title: () => I18n.t("Breadcrumb.manageGoodsEdit"),
        component: () => <ManageGoodsEdit />,
        exact: true,
        sidebarName: 'manageGoods'
      },

    // 


]

export default routes
