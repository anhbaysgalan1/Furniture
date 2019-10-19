import React from 'react'
import { Translate } from 'react-redux-i18n'
import Icon from '@material-ui/core/Icon'
import UserIndex from 'containers/User/Index'
import RecruimentIndex from 'containers/Recruiment/Index'
import RegistrationIndex from 'containers/Registration/Index'
import NewIndex from 'containers/New/Index'
import IntroduceIndex from 'containers/Introduce/Index'
import JobIndex from 'containers/Job/Index'
import ContactIndex from 'containers/Contact/Index'
import QuestionIndex from 'containers/Question/Index'
const sidebar = [
    {
        path: "/users", // trang chủ
        name: 'user',
        title: <Translate value="Sidebar.user" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <UserIndex />,
        
    },
    {
        path: "/news", // Tin tức
        name: 'new',
        title: <Translate value="Sidebar.new" />,
        component: () => <NewIndex />,
    },
    {
        path: "/introduces", // Giới thiệu
        name: 'introduce',
        title: <Translate value="Sidebar.introduce" />,
        component: () => <IntroduceIndex />,
    },
    {
        path: "/recruiments",  // tuyển dụng
        name: 'recruiment',
        title: <Translate value="Sidebar.recruiment" />,
        icon: <Icon>location_on</Icon>,
        component: () => <RecruimentIndex />,
    },
    {
        path: "/jobs", // Công việc
        name: 'job',
        title: <Translate value="Sidebar.job" />,
        component: () => <JobIndex />,
    },
    {
        path: "/registration", // đăng kí
        name: 'registration',
        title: <Translate value="Sidebar.registration" />,
        icon: <Icon>location_on</Icon>,
        component: () => <RegistrationIndex />,
    },
    {
        path: "/contact", // trang chủ
        name: 'contact',
        title: <Translate value="Sidebar.contact" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <ContactIndex />,
        
    },
    {
        path: "/question", // trang chủ
        name: 'question',
        title: <Translate value="Sidebar.question" />, //bắt buộc dùng thẻ Translate, không được dùng I18n
        icon: <Icon>account_circle</Icon>,
        component: () => <QuestionIndex />,
        
    },
]

export default sidebar
