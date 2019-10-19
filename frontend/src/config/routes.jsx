import React, { lazy } from 'react'
import _ from 'lodash'
import { I18n } from 'react-redux-i18n'
import { Redirect } from 'react-router'
const UserIndex = lazy(() => import('containers/User/Index'))
const ContactIndex = lazy(() => import('containers/Contact/Index'))
const QuestionIndex = lazy(() => import('containers/Question/Index'))
const RecruimentIndex = lazy(() => import('containers/Recruiment/Index'))
const RegistrationIndex = lazy(() => import('containers/Registration/Index'))
const NewIndex = lazy(() => import('containers/New/Index'))
const IntroduceIndex = lazy(() => import('containers/Introduce/Index'))
const JobIndex = lazy(() => import('containers/Job/Index'))

const routes = [
    // {
    //     path: "/",
    //     component: () => <Redirect to="/users" />,
    //     exact: true
    // },
    {
        path: "/users",
        name: 'user',
        permissions: ['mana_user'],
        title: () => I18n.t("Breadcrumb.userIndex"),
        component: () => <UserIndex />,
        exact: true,
        sidebarName: 'user'
    },
    {
        path: "/recruiments",
        name: 'recruiment',
        permissions: ['mana_user'],
        title: () => I18n.t("Breadcrumb.recruimentIndex"),
        component: () => <RecruimentIndex />,
        exact: true,
        sidebarName: 'Recruiment'
    },
    {
        path: "/registration",
        name: 'registration',
        title: () => I18n.t("Breadcrumb.registrationIndex"),
        component: () => <RegistrationIndex />,
        exact: true,
        sidebarName: 'registration'
    },
    {
        path: "/news",
        name: 'new',
        title: () => I18n.t("Breadcrumb.newIndex"),
        component: () => <NewIndex />,
        exact: true,
        sidebarName: 'new'
    },
    {
        path: "/introduces",
        name: 'introduce',
        permissions: ['mana_user'],
        title: () => I18n.t("Breadcrumb.introduceIndex"),
        component: () => <IntroduceIndex />,
        exact: true,
        sidebarName: 'introduce'
    },
    {
        path: "/jobs",
        name: 'job',
        title: () => I18n.t("Breadcrumb.jobIndex"),
        component: () => <JobIndex />,
        exact: true,
        sidebarName: 'job'
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
        path: '/question',
        name: 'question',
        title: () => I18n.t("Breadcrumb.questionIndex"),
        component: () => <QuestionIndex />,
        exact: true,
        sidebarName: 'question'
    }
]

export default routes
