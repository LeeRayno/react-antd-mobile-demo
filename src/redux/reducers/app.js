/**
 * Created by Administrator on 2017/8/4.
 */

import * as types from '../actions/action-types'

const app = (state = {
	backStatus: false,
	filterStatus: false,
	sidebarStatus: false,
	title: '登录',
	metaData: [],
	listData: {}
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
		case types.SAVE_META_DATA:
			return {
				...state,
				metaData: action.playLoad
			}
		case types.SAVE_LIST_DATA:
			return {
				...state,
				listData: action.playLoad
			}
		default:
			return state
	}
}

export default app