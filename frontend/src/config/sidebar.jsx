import React from 'react'
import { Translate } from 'react-redux-i18n'
import Icon from '@material-ui/core/Icon'
import UserIndex from 'containers/User/Index'
import CenterIndex from 'containers/Center/Index'
import InfoIndex from 'containers/Info/Index'
import ContactIndex from 'containers/Contact/Index'

import BadIndex from 'containers/Bad/Index'
import TableEatIndex from 'containers/TableEat/Index'
import TableRestaurantIndex from 'containers/TableRestaurant/Index'
import WardrobeIndex from 'containers/Wardrobe/Index'
import ShoesCabinetIndex from 'containers/ShoesCabinet/Index'
import TVCabinetIndex from 'containers/TVCabinet/Index'
import TableLivingRoomIndex from 'containers/TableLivingRoom/Index'
import OfficeIndex from 'containers/Office/Index'

import DiningRoomIndex from 'containers/DiningRoom/Index'

import OrderIndex from 'containers/Order/Index'
import FinanceIndex from 'containers/Finance/Index'
import GoodsIndex from 'containers/Goods/Index'
import ClientIndex from 'containers/Client/Index'

import PostsIndex from 'containers/Posts/Index'

const sidebar = [
    {
        path: "/center", // trang chủ
        name: 'center',
        title: <Translate value="Sidebar.center" />,
        icon: <Icon>account_circle</Icon>,
        component: () => <CenterIndex />
    },
    // {
    //     path: "/info", 
    //     name: 'info',
    //     title: <Translate value="Sidebar.info" />, 
    //     icon: <Icon>account_circle</Icon>,
    //     component: () => <InfoIndex />
    // },
    {
        path: "/bad",  // Giường
        name: 'bad',
        title: <Translate value="Sidebar.bad" />,
        icon: <Icon>account_circle</Icon>,
        component: () => <BadIndex />
    },
    {
        path: "/table-eat",  // Bàn ăn
        name: 'tableEat',
        title: <Translate value="Sidebar.tableEat" />,
        icon: <Icon>account_circle</Icon>,
        component: () => <TableEatIndex />
    },
    {
        path: "/wardrobe", // Tủ quần áo
        name: 'wardrobe',
        title: <Translate value="Sidebar.wardrobe" />,
        icon: <Icon>account_circle</Icon>,
        component: () => <WardrobeIndex />
    },
    {
        path: "/shoes-cabinet",  // Tủ giày
        name: 'shoesCabinet',
        title: <Translate value="Sidebar.shoesCabinet" />,
        icon: <Icon>account_circle</Icon>,
        component: () => <ShoesCabinetIndex />
    },
    {
        path: "/tv-cabinet",  // Tủ giày
        name: 'tvCabinet',
        title: <Translate value="Sidebar.tvCabinet" />,
        icon: <Icon>account_circle</Icon>,
        component: () => <TVCabinetIndex />
    },
    {
        path: "/table-living-room",  // Tủ giày
        name: 'tableLivingRoom',
        title: <Translate value="Sidebar.tableLivingRoom" />,
        icon: <Icon>account_circle</Icon>,
        component: () => <TableLivingRoomIndex />
    },
    {
        path: "/office",  // nội thất văn phòng
        name: 'office',
        title: <Translate value="Sidebar.office" />,
        icon: <Icon>account_circle</Icon>,
        component: () => <OfficeIndex />
        // 
    },
    // {
    //     path: "/dining-room", 
    //     name: 'diningRoom',
    //     title: <Translate value="Sidebar.diningRoom" />, 
    //     icon: <Icon>account_circle</Icon>,
    //     component: () => <DiningRoomIndex />
    // },
    {
        path: "/table-restaurant",
        name: 'tableRestaurant',
        title: <Translate value="Sidebar.tableRestaurant" />,
        icon: <Icon>account_circle</Icon>,
        component: () => <TableRestaurantIndex />
    },
    // {
    //     path: "/contact", 
    //     name: 'contact',
    //     title: <Translate value="Sidebar.contact" />, 
    //     icon: <Icon>account_circle</Icon>,
    //     component: () => <ContactIndex />
    // },
    {
        path: "/order",
        name: 'order',
        title: <Translate value="Sidebar.order" />,
        icon: <Icon>account_circle</Icon>,
        component: () => <OrderIndex />
    },
    // {
    //     path: "/finance", 
    //     name: 'finance',
    //     title: <Translate value="Sidebar.finance" />, 
    //     icon: <Icon>account_circle</Icon>,
    //     component: () => <FinanceIndex />
    // },
    {
        path: "/goods",
        name: 'goods',
        title: <Translate value="Sidebar.goods" />,
        icon: <Icon>account_circle</Icon>,
        component: () => <GoodsIndex />
    },
    // {
    //     path: "/client", 
    //     name: 'client',
    //     title: <Translate value="Sidebar.client" />, 
    //     icon: <Icon>account_circle</Icon>,
    //     component: () => <ClientIndex />
    // },
    // {
    //     path: "/posts", 
    //     name: 'posts',
    //     title: <Translate value="Sidebar.posts" />, 
    //     icon: <Icon>account_circle</Icon>,
    //     component: () => <PostsIndex />
    // },
    // {
    //     path: "/users", 
    //     name: 'user',
    //     title: <Translate value="Sidebar.user" />, 
    //     icon: <Icon>account_circle</Icon>,
    //     component: () => <UserIndex />,
    // },

]

export default sidebar
