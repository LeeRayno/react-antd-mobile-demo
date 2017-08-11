/**
 * Created by Administrator on 2017/8/4.
 */

import * as types from '../actions/action-types'

const app = (state = {
	backStatus: false,
	filterStatus: false,
	sidebarStatus: false,
	title: '登录'
}, action) => {
	switch (action.type) {
		case types.CHANGE_BACK_STATUS:
			return {
				...state,
				backStatus: action.playLoad
			}
		case types.CHANGE_FILTER_STATUS:
			return {
				...state,
				filterStatus: action.playLoad
			}
		case types.CHANGE_TITLE:
			return {
				...state,
				title: action.playLoad
			}
		case types.CHANGE_SIDEBAR_STATUS:
			return {
				...state,
				sidebarStatus: action.playLoad
			}
		default:
			return state
	}
}

export default app