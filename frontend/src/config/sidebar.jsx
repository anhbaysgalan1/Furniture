import React from 'react'
import { Translate } from 'react-redux-i18n'
import Icon from '@material-ui/core/Icon'
import UserIndex from 'containers/User/Index'
import CenterIndex from 'containers/Center/Index'
import InfoIndex from 'containers/Info/Index'
import ContactIndex from 'containers/Contact/Index'
import BadIndex from 'containers/Bad/Index'
import DiningRoomIndex from 'containers/DiningRoom/Index'
import TableEatIndex from 'containers/TableEat/Index'
import TableRestaurantIndex from 'containers/TableRestaurant/Index'
import OrderIndex from 'containers/Order/Index'
import GoodsIndex from 'containers/Goods/Index'
import ClientIndex from 'containers/Client/Index'

const sidebar = [
    {
        path: "/center", // trang chủ
        name: 'center',
        title: <Translate value="Sidebar.center" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <CenterIndex />
    },
    {
        path: "/info", 
        name: 'info',
        title: <Translate value="Sidebar.info" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <InfoIndex />
    },
    {
        path: "/bad", 
        name: 'bad',
        title: <Translate value="Sidebar.bad" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <BadIndex />
    },
    {
        path: "/dining-room", 
        name: 'diningRoom',
        title: <Translate value="Sidebar.diningRoom" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <DiningRoomIndex />
    },
    {
        path: "/table-eat", 
        name: 'tableEat',
        title: <Translate value="Sidebar.tableEat" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <TableEatIndex />
    },
    {
        path: "/table-restaurant", 
        name: 'tableRestaurant',
        title: <Translate value="Sidebar.tableRestaurant" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <TableRestaurantIndex />
    },
    {
        path: "/contact", 
        name: 'contact',
        title: <Translate value="Sidebar.contact" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <ContactIndex />
    },
    {
        path: "/order", 
        name: 'order',
        title: <Translate value="Sidebar.order" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <OrderIndex />
    },
    {
        path: "/goods", 
        name: 'goods',
        title: <Translate value="Sidebar.goods" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <GoodsIndex />
    },
    {
        path: "/client", 
        name: 'client',
        title: <Translate value="Sidebar.client" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <ClientIndex />
    },
    // {
    //     path: "/users", 
    //     name: 'user',
    //     title: <Translate value="Sidebar.user" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
    //     icon: <Icon>account_circle</Icon>,
    //     component: () => <UserIndex />,
    // },
    
]

export default sidebar
