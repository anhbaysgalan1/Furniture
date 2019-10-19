import React, { lazy } from 'react'
import _ from 'lodash'
import { I18n } from 'react-redux-i18n'
import { Redirect } from 'react-router'
const UserIndex = lazy(() => import('containers/User/Index'))
const CenterIndex = lazy(() => import('containers/Center/Index'))

const routes = [
    // {
    //     path: "/",
    //     component: () => <Redirect to="/users" />,
    //     exact: true
    // },
    {
        path: "/center",
        name: 'center',
        permissions: ['mana_center'],
        title: () => I18n.t("Breadcrumb.centerIndex"),
        component: () => <CenterIndex />,
        exact: true,
        sidebarName: 'center'
    },
    {
        path: "/users",
        name: 'user',
        permissions: ['mana_user'],
        title: () => I18n.t("Breadcrumb.userIndex"),
        component: () => <UserIndex />,
        exact: true,
        sidebarName: 'user'
    },


]

export default routes
