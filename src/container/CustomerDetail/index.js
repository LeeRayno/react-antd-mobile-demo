/**
 * Created by Administrator on 2017/8/3.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import DetailItem from '../../components/DetailItem'
import { changeBackStatus, changeFilterStatus, changeTitle } from '../../redux/actions'
import './customerDetail.less'

let scroll = null
class CustomerDetail extends Component {
	constructor (props) {
		super(props)
		this.state = {
			showData: []
		}
	}
	componentDidMount () {
		const { dispatch, title } = this.props
		dispatch(changeBackStatus(true))
		dispatch(changeFilterStatus(false))
		dispatch(changeTitle(title))

		const { metaData, listData, history } = this.props
		if (!metaData.length) {
			history.goBack()
			return
		}
		const listDataKeys = Object.keys(listData)
		const showData = []
		metaData.forEach(item => {
			if (listDataKeys.indexOf(item.code) !== -1) {
				showData.push({key: item.show_name, value: listData[item.code]})
			}
		})
		this.setState({
			showData
		})

		scroll = new BScroll(this.scroll, {
			startX: 0,
			startY: 0,
			scrollY: true
		})
	}

	componentDidUpdate () {
		scroll.refresh()
	}

	componentWillUnmount () {
		scroll && scroll.destroy()
	}

	render() {
		return(
			<div className="customer-detail" ref={(scroll) => {this.scroll = scroll }}>
				<ul>
					{this.state.showData.map((item, index) => (
						<DetailItem item={item} key={index} />
					))}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { metaData, listData } = state.app
	return {
		metaData,
		listData
	}
}
export default connect(mapStateToProps)(CustomerDetail)