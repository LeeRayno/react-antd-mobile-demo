/**
 * Created by Administrator on 2017/8/18.
 */
import React, { Component } from 'react'
import BScroll from 'better-scroll'
import classnames from 'classnames'
import { Toast } from 'antd-mobile'
import { format } from '../../utils'
import './animateCalender.less'

const MAX_DAY = 12 // 最大天数
const YEARS = 2 // 创建的年数
const DIS = 50 // title的高度

let scroll = null

class AnimateCalender extends Component {
	constructor(props) {
		super(props)
		this.state = {
			date: [],
			listHeight: [],
			startTime: -1,
			endTime: -1,
			curIndex: 0,
			showFixed: true
		}
	}

	componentDidMount() {
		this.createYear()
		// 用setTimeout 代替 componentDidUpdate
		setTimeout(() => {
			scroll = new BScroll(this.refScroll, {
				click: true,
				probeType: 3
			})
			this.getListHeight()
			this.handleScroll()
		}, 20)
	}

	componentWillUnmount() {
		scroll && scroll.destroy()
	}

	// 获取每个月的offsetTop
	getListHeight = () => {
		const aLi = this.refUl.children
		let listHeight = []
		for (let i = 0; i < aLi.length; i++) {
			const h = aLi[i].offsetTop
			listHeight.push(h)
		}
		console.log(listHeight)
		this.setState({
			listHeight
		})
	}

	// better-scroll 滚动的时候
	handleScroll = () => {
		scroll.on('scroll', (pos) => {
			const y = pos.y
			const listHeight = this.state.listHeight
			// 当y < 0 的时候才显示
			const showFixed = y < 0
			this.setState({
				showFixed
			})
			// 滚动到顶部
			if (y >= 0) {
				const curIndex = 0
				this.setState({
					curIndex
				})
				return
			}
			// 中间部分
			for (let i = 0; i < listHeight.length; i++) {
				const h1 = listHeight[i]
				const h2 = listHeight[i + 1]
				if (-y >= h1 && -y < h2) {
					this.setState({
						curIndex: i
					})
					const diff = y + h2
					const translateY = (diff > 0 && diff < DIS) ? diff - DIS : 0
					this.refFixed.style.transform = `translate3d(0, ${translateY}px, 0)`
					return
				}
			}
			// 滚动到底部
			this.setState({
				curIndex: listHeight.length - 1
			})
		})
	}

	// 点击每一天的时候
	handleClick = (e) => {
		const dataSet = e.target.dataset
		if (dataSet.disabled === 'disabled') {
			return
		}
		const time = Math.floor(dataSet.time)
		const startTime = this.state.startTime
		const endTime = this.state.endTime

		if (startTime === -1 || (time <= startTime && endTime === -1)) {
			// 选择开始时间
			this.setState({
				startTime: time
			})
			Toast.info('请选择结束时间！', 1, null, false)
		} else if (time > startTime && endTime === -1) {
			// 求差值
			let interval = (time - startTime) / 1000
			interval = Math.floor(interval / 86400) + 1
			if (interval > MAX_DAY) {
				Toast.fail(`您最多只能投保 ${MAX_DAY} 天,请从新选择`, 1, null, false)
				return
			}
			// 选择结束时间
			this.setState({
				endTime: time
			})
			this.props.sendTime({startTime: startTime, endTime: time})
			Toast.success(`您投保了 ${interval} 天`, 1, null, false)
		} else if (startTime !== -1 && endTime !== -1) {
			// 从新设置开始、结束时间
			this.setState({
				startTime: time,
				endTime: -1
			})
			Toast.info('请选择结束时间！', 1, null, false)
		}
	}

	// 创建年
	createYear = () => {
		const monthLength = YEARS * 12
		for (let i = 0; i < monthLength; i++) {
			this.createMonth(i)
		}
	}

	// 创建月
	createMonth = (j) => {
		let oDate = new Date()
		// 存当前时间
		const now = oDate.getTime()
		// 设置多少个月
		oDate.setMonth(oDate.getMonth() + j)
		const year = oDate.getFullYear()
		const month = oDate.getMonth()
		// 设置到下个月的第0天，会自动跑到上个月的最后一天
		oDate.setMonth(month + 1, 0)
		// 求当月总共有多少天
		const totalDay = oDate.getDate()
		// 求当月最后一天是星期几
		const lastDay = oDate.getDay()
		// 求当月第一天是星期几
		oDate.setDate(1)
		const firstDay = oDate.getDay()

		const title = `${year}-${format(month + 1)}`
		let dateList = []

		// 创建天数
		for (let i = 1; i <= totalDay; i++) {
			let sDate = new Date()
			sDate.setFullYear(year, month, i)
			const time = sDate.getTime()
			// 如果时间小于当前时间设为disabled
			if (time < now) {
				dateList.push({time: time, text: i, disabled: 'disabled'})
			} else {
				dateList.push({time: time, text: i, disabled: 'enabled'})
			}
		}
		// 补前空白
		for (let i = 0; i < firstDay; i++) {
			dateList.unshift({time: 0, text: '', disabled: 'disabled'})
		}
		// 补后空白
		for (let i = 0; i< 6 - lastDay; i++) {
			dateList.push({time: 0, text: '', disabled: 'disabled'})
		}

		let date = this.state.date
		date.push({title: title, dateList: dateList})
		this.setState({
			date
		})
	}

	render() {
		const { startTime, endTime, date, showFixed, curIndex } = this.state
		const display = showFixed ? 'flex' : 'none'
		return (
			<div className="calender-wrapper">
				<div className="calender-mask" onClick={this.props.toggleShow}></div>
				<div className="calender-content">
					<ul className="weekday">
						{Array.from('日一二三四五六').map((item, index) => (
							<li key={index} className={index % 7 === 0 ||index % 7 === 6 ? 'weekday' : ''}>{item}</li>
						))}
					</ul>
					<section className="scroll-part" ref={scroll => this.refScroll = scroll}>
						<ul className="date" ref={ul => this.refUl = ul}>
							{this.state.date.map((month, monthIndex) =>(
								<li className="date-month" data-month={month.title} key={monthIndex}>
									<h6>{month.title}</h6>
									<ol className="date-day-wrapper">
										{month.dateList.map((date, dateIndex) => (
											<li
												onClick={this.handleClick}
												data-time={date.time}
										    data-disabled={date.disabled ==='disabled' ? 'disabled' : 'enabled'}
										    key={dateIndex}
										    className={
											    classnames({
												    disabled: date.disabled === 'disabled',
												    start: date.time === startTime,
												    between: date.time > startTime && date.time < endTime,
												    end: date.time === this.state.endTime,
												    weekend: dateIndex % 7 === 0 || dateIndex % 7 === 6
											    })
										    }
											>{date.text}</li>
										))}
									</ol>
								</li>
							))}
						</ul>
						<h6 className="fixed-title" style={{display}} ref={fixed => this.refFixed = fixed}>{date.length && date[curIndex].title}</h6>
					</section>
				</div>
			</div>
		)
	}
}
export default AnimateCalender