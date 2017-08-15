
/**
 * Created by Administrator on 2017/8/3.
 */
import React from 'react'
import { Route } from 'react-router-dom'

//routes
export const RouteWithSubRoutes = (route) => (
	<Route path={route.path} exact={route.exact } render={props => (
		<route.component {...props} routes={route.routes} title={route.title}/>
	)}/>
)

//获取url
export const getQueryString = (name) => {
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	const r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}

//时间格式化
export const formatTime = (type, value) => {
	let result
	if (value === true) {
		result =  '是'
	} else if (value === false) {
		result =  '否'
	} else if ((typeof value === 'number') && (value.toString().length >= 13)) {
		const oDate = new Date(value)
		const year = oDate.getFullYear()
		const month = oDate.getMonth() + 1
		const day = oDate.getDate()
		const hour = oDate.getHours()
		const minute = oDate.getMinutes()
		const seconds = oDate.getSeconds()
		switch (type) {
			case 0: //01-05
				result = `${format(month)}-${format(day)}`
				break
			case 1: // 11:11
				result = `${format(hour)}:${format(minute)}`
				break
			case 2: //2017-08-15
				result = `${format(year)}-${format(month)}-${format(day)}`
				break
			case 3: //2017-08-15 13:37
				result = `${format(year)}-${format(month)}-${format(day)} ${format(hour)}:${format(minute)}`
				break
			case 4: //2017-08-15 13:39:03
				result = `${format(year)}-${format(month)}-${format(day)} ${format(hour)}:${format(minute)}:${format(seconds)}`
				break
			default:
				result = value
		}
	} else {
		result = value
	}
	return result
}

//两位数补齐
export const format = (value) => {
	return value >= 10 ? value + '' : '0' + value
}