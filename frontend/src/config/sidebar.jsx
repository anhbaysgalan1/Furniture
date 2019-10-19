import React from 'react'
import { Translate } from 'react-redux-i18n'
import Icon from '@material-ui/core/Icon'
import UserIndex from 'containers/User/Index'
import CenterIndex from 'containers/Center/Index'

const sidebar = [
    {
        path: "/center", // trang chủ
        name: 'center',
        title: <Translate value="Sidebar.center" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <CenterIndex />,
        
    },
    {
        path: "/users", // trang chủ
        name: 'user',
        title: <Translate value="Sidebar.user" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <UserIndex />,
        
    },
    
]

export default sidebar
