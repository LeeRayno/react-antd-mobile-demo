/**
 * Created by Administrator on 2017/8/3.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeBackStatus, changeFilterStatus, changeTitle } from '../../redux/actions'
import './customerDetail.less'
class CustomerDetail extends Component {
	componentDidMount () {
		const { dispatch, title } = this.props
		dispatch(changeBackStatus(true))
		dispatch(changeFilterStatus(false))
		dispatch(changeTitle(title))
	}
	render() {
		return(
			<div className="customer-detail">
				customer-detail
			</div>
		)
	}
}

export default connect()(CustomerDetail)