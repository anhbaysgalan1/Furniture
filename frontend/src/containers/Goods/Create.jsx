import React from 'react'
import View from 'views/Goods/Create'
import GoodsAction from  '../../actions/GoodsAction'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

class Index extends BaseContainer {
    constructor(props) {
        super(props)
        this.state = {
            permission: []
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        this.props.dispatch(GoodsAction.getTypeGoods({ pageSize: -1 }))
    }
    
    onSubmit(values) {
        this.props.dispatch(GoodsAction.create(values))
            .then(data => {
                if (!data.error) {
                    this.notify(I18n.t('Message.createDataSuccess'))
                    this.goto("/goods/create")
                }
                else {
                    let err = data.error
                    switch (err.status) {
                        case 400: {
                            if (err.message === "Role_Name_Exist") {
                                this.notify(I18n.t('Backend.Role.Role_Name_Exist'), 'error')
                            }
                            break
                        }
                        case 404: {
                            if (err.message === "Permission_Not_Exist") {
                                this.notify(I18n.t('Backend.Role.Permission_Not_Exist'), 'error')
                            }
                            break
                        }
                        default: this.notify(`Response: [${err.status}] ${err.message}`, 'error')

                    }
                }
            })
    }

    render() {
        return (
            <View
                onSubmit={this.onSubmit}
                typeGoods={this.props.typeGoods}
            />
        )
    }
}

const mapStateToProps = state => {
  
    return {
        data: selector(state, "role.data", {}),
        typeGoods: selector(state, 'goods.getTypeGoods.data', [])
    }
}

export default withRouter(connect(mapStateToProps)(Index))