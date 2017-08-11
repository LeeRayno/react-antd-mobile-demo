
/**
 * Created by Administrator on 2017/8/3.
 */
import React from 'react'
import { Route } from 'react-router-dom'
export const RouteWithSubRoutes = (route) => (
	<Route path={route.path} exact={route.exact } render={props => (
		<route.component {...props} routes={route.routes} title={route.title}/>
	)}/>
)

export const getQueryString = (name) => {
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	const r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}
