import React, { lazy } from 'react'
import _ from 'lodash'
import { I18n } from 'react-redux-i18n'
import { Redirect } from 'react-router'
const UserIndex     = lazy(() => import('containers/User/Index'))
const CenterIndex   = lazy(() => import('containers/Center/Index'))
const InfoIndex     = lazy(() => import('containers/Info/Index'))
const ContactIndex  = lazy(() => import('containers/Contact/Index'))
const BadIndex              = lazy(() => import('containers/Bad/Index'))
const DiningRoomIndex       = lazy(() => import('containers/DiningRoom/Index'))
const TableEatIndex         = lazy(() => import('containers/TableEat/Index'))
const TableRestaurantIndex  = lazy(() => import('containers/TableRestaurant/Index'))


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
        path: "/users",
        name: 'user',
        title: () => I18n.t("Breadcrumb.userIndex"),
        component: () => <UserIndex />,
        exact: true,
        sidebarName: 'user'
    },

]

export default routes
