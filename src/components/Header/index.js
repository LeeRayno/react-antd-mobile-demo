/**
 * Created by Administrator on 2017/8/3.
 */
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { NavBar, Icon } from 'antd-mobile'
import { changeSidebarStatus } from '../../redux/actions'
import './header.less'
class Header extends Component {
	leftClick = () => {
		window.history.back()
	}

	rightClick = () => {
		const { dispatch, sidebarStatus } = this.props
		dispatch(changeSidebarStatus(!sidebarStatus))
	}

	render() {
		const backStatus = this.props.backStatus
		const filterStatus = this.props.filterStatus
		const title = this.props.title
		const backDisplay = backStatus ? 'flex' : 'none'
		const filterDisplay = filterStatus ? 'flex' :'none'
		return(
			<header className="app-header">
				<NavBar leftContent={[
					<div key="0" className="navbar-left" style={{display: backDisplay}} onClick={this.leftClick}>
						<Icon type="left" />
						<span>返回</span>
					</div>
				]}
        iconName={false}
        mode="dark"
        rightContent={[
        <div key="0" className="filter-btn" onClick={this.rightClick} style={{display: filterDisplay}}>
         <i className="filter-bg"></i>
         <span>筛选</span>
				</div>
      ]}
				>{title}</NavBar>
			</header>
		)
	}
}

const mapStateToProps = (state) => {
	const { backStatus, filterStatus, sidebarStatus, title} = state.app
	return {
		backStatus,
		filterStatus,
		sidebarStatus,
		title
	}
}

export default connect(mapStateToProps)(Header)