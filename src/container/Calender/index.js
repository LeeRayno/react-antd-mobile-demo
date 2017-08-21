/**
 * Created by Administrator on 2017/8/18.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import { List } from 'antd-mobile'
import {
	changeTitle,
	changeBackStatus,
	changeFilterStatus,
} from '../../redux/actions'
import AnimateCalender from '../../components/AnimateCalender'
import { formatTime } from '../../utils'
import './calender.less'

const Item = List.Item

class Calender extends Component {

	constructor(props) {
		super(props)
		this.state = {
			showCalender: false,
			startTime: Date.now(),
			endTime: Date.now()
		}
	}

	componentDidMount() {
		const { dispatch, title } = this.props
		dispatch(changeTitle(title))
		dispatch(changeBackStatus(true))
		dispatch(changeFilterStatus(false))
	}

	// 接收时间
	receiveTime = (data) => {
		this.setState(data)
	}

	toggleShow = () => {
		this.setState({
			showCalender: !this.state.showCalender
		})
	}

	render() {
		const renderComponent = this.state.showCalender
			? <AnimateCalender toggleShow={this.toggleShow} sendTime={this.receiveTime} />
			: null
		const { startTime, endTime } = this.state
		return(
			<div className="calender">
				<List>
					<Item arrow="horizontal" onClick={this.toggleShow}>
						<span>选择日期</span>
						<span>{formatTime(2, startTime)}</span>
						<span>{formatTime(2, endTime)}</span>
					</Item>
				</List>
				<CSSTransitionGroup
					transitionName="fade"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					{renderComponent}
				</CSSTransitionGroup>
			</div>
		)
	}
}

export default connect()(Calender)