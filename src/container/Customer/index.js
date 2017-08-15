/**
 * Created by Administrator on 2017/8/3.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import {
	changeBackStatus,
	changeFilterStatus,
	changeSidebarStatus,
	changeTitle,
	saveMetaData
} from '../../redux/actions'

import { SearchBar, Toast, Modal } from 'antd-mobile'
import RadioGroup from '../../components/RadioGroup'
import ListItems from '../../components/ListItem'
import { getQueryString } from '../../utils'
import axios from '../../http'
import api from '../../api'
import './customer.less'

let scroll = null
// 设置移动多少改变tip
const dis = 60
// 设置下拉，上拉tip
const pullToRefreshTip = {
	one: '下拉刷新',
	two: '释放立即刷新',
	three: '刷新中...',
	four: '刷新成功'
}
const pullUpLoadTip = {
	one: '上拉加载更多',
	two: '释放立即加载',
	three: '加载中...',
	four: '加载成功',
	five: '没有更多数据了'
}

const prompt = Modal.prompt

class Customer extends Component {
	constructor (props) {
		super(props)
		this.state = {
			activity_id: getQueryString('activity_id'),
			searchValue: '',
			partFilter: '所有',
			customerFilter: '所有',
			hasMore: true,
			pageNumber: 1,
			data: [],
			params: {  // 用于assign
				pageNumber: 1,
				pageSize: 10,
				activity_id: getQueryString('activity_id'),
				searchLike: [
					{name: 'company', value: ''}
				],
				searchIs: null
			}
		}
	}

	componentDidMount () {
		const { dispatch, title } = this.props
		dispatch(changeBackStatus(true))
		dispatch(changeFilterStatus(true))
		dispatch(changeTitle(title))

		this.fetchData()
		scroll = new BScroll(document.getElementById('J_Scroll'), {
			startX: 0,
			startY: 0,
			scrollY: true,
			click: true,
			probeType: 1
		})
		
		// 在初始化点击的时候设置tip
		scroll.on('beforeScrollStart', () => {
			this.refreshTip.innerHTML = pullToRefreshTip.one
			this.state.hasMore ? this.moreTip.innerHTML = pullUpLoadTip.one : this.moreTip.innerHTML = pullUpLoadTip.five
		})
		
		//在滚动过程中设置tip
		scroll.on('scroll', (pos) => {
			if (pos.y > dis) {
				this.refreshTip.innerHTML = pullToRefreshTip.two
			} else if (pos.y > 0 && pos.y <= dis) { // 注意判断条件
				this.refreshTip.innerHTML = pullToRefreshTip.one
			} else if (pos.y < 0 && ( pos.y < scroll.maxScrollY - dis )) {
				this.state.hasMore ? this.moreTip.innerHTML = pullUpLoadTip.two : this.moreTip.innerHTML = pullUpLoadTip.five
			} else if (pos.y > scroll.maxScrollY - dis && pos.y < scroll.maxScrollY) {
				this.moreTip.innerHTML = pullUpLoadTip.one
			}
		})
		
		// 在手指松开时设置tip并根据pos.y来判断是下拉还是上拉
		scroll.on('touchend', (pos) => {
			if (pos.y > dis) { //下拉刷新数据
				this.refreshTip.innerHTML = pullToRefreshTip.three
				// 松手之后用marginTop来模拟刷新中...和刷新成功
				this.refScroll.style.marginTop = dis + 'px'
				this.moreTip.innerHTML = ''
				this.filterData()
			} else if (pos.y < (scroll.maxScrollY - dis)) { // 加载更多数据
				this.moreTip.innerHTML = pullUpLoadTip.three
				this.state.hasMore ? this.loadMore() : this.moreTip.innerHTML = pullUpLoadTip.five
			}
		})
	}

	componentWillUnmount () {
		scroll && scroll.destroy()
	}

	/**
	 * 搜索text
	 * @param searchValue
	 */
	handleChange = (searchValue) => {
		this.setState({
			searchValue
		})
	}

	/**
	 * 调用搜索按钮
	 */
	handleSubmit = () => {
		this.filterData()
	}

	// 参会状态
	handlePartChange = (partFilter) => {
		this.setState({
			partFilter
		}, () => {
			this.filterData()
		})
	}

	// 客户类型
	handleCustomerChange = (customerFilter) => {
		this.setState({
			customerFilter
		}, () => {
			this.filterData()
		})
	}

	// 筛选之后的filter
	getSearchIs = () => {
		let searchIs = null
		const state = this.state
		if (state.partFilter === '所有' && state.customerFilter === '所有') {
			searchIs = null
		} else if (state.partFilter === '所有' && state.customerFilter !== '所有') {
			searchIs = [
				{name: 'formfile.field5963813ff91fdd00017e5526', value: state.customerFilter}
			]
		} else if (state.partFilter !== '所有' && state.customerFilter === '所有') {
			searchIs = [
				{name: 'check', value: state.partFilter}
			]
		} else if (state.partFilter !== '所有' && state.customerFilter !== '所有') {
			searchIs = [
				{name: 'check', value: state.partFilter},
				{name: 'formfile.field5963813ff91fdd00017e5526', value: state.customerFilter}
			]
		}
		return searchIs
	}

	// 请求数据函数
	fetchData = (params) => {
		if (!params) {
			params = Object.assign({}, this.state.params)
		}
		axios.post(`${api.prticipantpage}${this.state.activity_id}`, params)
		.then(res => {
			if (res.data.flag === 0) {
				const metadatas = res.data.data.metadatas
				const page = res.data.data.page
				const data = this.state.data.concat(page.content)
				// const hasMore = page.numberOfElements >= page.size
				const hasMore = !page.last
				const {dispatch} = this.props
				dispatch(saveMetaData(metadatas))
				this.setState({
					data,
					hasMore
				})
				this.refreshTip.innerHTML = pullToRefreshTip.four
				// 刷新成功之后marginTop为零、这里应该加个条件，如果是下拉才执行这个
				setTimeout(() => {
					this.refScroll.style.marginTop = 0
					this.refScroll.style.transition = '.2s all ease'
				}, 400)
				scroll.refresh()
			}
		})
		.catch(err => {
			console.log(err)
		})
	}

	// 筛选之后获取的数据
	filterData = () => {
		const searchIs = this.getSearchIs()
		const value = this.state.searchValue
		const params = Object.assign({}, this.state.params, {
			searchIs: searchIs,
			searchLike:[{name: 'company', value: value}]
		})

		// 筛选的话需要先清空
		this.setState({
			data: [],
			pageNumber: 1
		}, () => {
			this.fetchData(params)
		})

	}

	// 加载更多数据
	loadMore = () => {
		let pageNumber = this.state.pageNumber
		pageNumber ++
		this.setState({
			pageNumber
		})
		const searchIs = this.getSearchIs()
		const value = this.state.searchValue
		const params = Object.assign({}, this.state.params, {
			searchIs: searchIs,
			searchLike:[{name: 'company', value: value}],
			pageNumber
		})
		this.fetchData(params)
	}

	//显示侧边
	changeSidebar = () => {
		const { dispatch } = this.props
		dispatch(changeSidebarStatus(false))
	}

	// 确认参会
	ensurePart = (index) => {
		this.audit(true, index)
	}

	// 取消参会
	cancelPart = (index) => {
		this.audit(false, index)
	}

	audit = (type, index) => {
		const params = {
			datas: {check: type},
			ids: [this.state.data[index].id]
		}
		axios.post(`${api.audit}/${this.state.activity_id}`, params)
		.then(res => {
			if (res.data.flag === 0) {
				const text = type ? '确认参会成功' : '取消参会成功'
				Toast.success(text, 1)
				let data = this.state.data
				data[index].check = type
				this.setState({
					data
				})
			}
		})
		.catch(err => {
			console.log(err)
		})
	}

	// 签到
	sign = (index) => {
		prompt('请输入房间号', '输入房间号签到', [
			{ text: '取消' },
			{ text: '提交', onPress: value => new Promise((resolve, reject) => {
					if (!value.trim()) {
						Toast.info('请输入房间号', 1)
						reject('请输入房间号')
					} else {
						const params = {
							id: this.state.data[index].id,
							sign_in: this.state.data[index].check,
							room: value
						}
						axios.post(api.updateprticipant, params)
						.then(res => {
							if (res.data.flag === 0) {
								let data = this.state.data
								data[index].room = value
								this.setState({
									data
								})
								Toast.info('输入成功', 1)
								resolve()
							}
						})
						.catch(err => {
							console.log(err)
						})
					}
				})
			 },
		], 'default', null,['请输入房间号'])
	}

	render() {
		const { sidebarStatus } = this.props
		const customerClass = sidebarStatus ? 'dataList-wrap slide-left' : 'dataList-wrap'
		const display = sidebarStatus ? 'block' : 'none'
		// 参会状态props
		const partProps = {
			name: 'part',
			defaultValue: '所有',
			data:['所有', '已审核', '未审核'],
			onChange: this.handlePartChange
		}

		// 客户类型props
		const customerProps = {
			name: 'customer',
			defaultValue: '所有',
			data: ['所有', '新客户', '老客户'],
			onChange: this.handleCustomerChange
		}
		return(
			<div className="customer">
				<section className={customerClass}>
					<div className="customer-mask" style={{display}} onClick={this.changeSidebar}></div>
					<SearchBar placeholder="请输入公司名称" value={this.state.searchValue} onChange={this.handleChange} onSubmit={this.handleSubmit} />
					<div className="dataList-container" id="J_Scroll">
						<div className="scroll-hook" ref={(scroll) => {this.refScroll = scroll}}>
							<div className="refresh-tip">
								<span ref={(topTip) => {this.refreshTip = topTip}}>下拉刷新</span>
							</div>
							<ul className="dataList-list">
								{
									this.state.data.map((item, index) => (
										<ListItems key={index}
										           history={this.props.history}
										           list={item}
										           ensurePart={this.ensurePart.bind(this, index)}
										           cancelPart={this.cancelPart.bind(this, index)}
										           sign={this.sign.bind(this, index)}
										/>
									))
								}
							</ul>
							<div className="more-tip">
								<span ref={(bottomTip) => {this.moreTip = bottomTip}}>加载更多</span>
							</div>
						</div>
					</div>
				</section>
				<section className="filter-wrap" onClick={this.changeSidebar}>
					<ul className="filter-list">
						<li className="filter-list-item">
							<h6 className="filter-list-item-title">参会状态</h6>
							<RadioGroup {...partProps} />
						</li>
						<li className="filter-list-item">
							<h6 className="filter-list-item-title">客户类型</h6>
							<RadioGroup {...customerProps} />
						</li>
					</ul>
				</section>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { sidebarStatus } = state.app
	return {
		sidebarStatus
	}
}

export default connect(mapStateToProps)(Customer)