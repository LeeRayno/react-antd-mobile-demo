/**
 * Created by Administrator on 2017/8/4.
 */

/**
 * action creator
 */

// 返回状态
export const changeBackStatus = playLoad => ({
	type: 'CHANGE_BACK_STATUS',
	playLoad
})

// 筛选状态
export const changeFilterStatus = playLoad => ({
	type: 'CHANGE_FILTER_STATUS',
	playLoad
})

// title
export const changeTitle = playLoad => ({
	type: 'CHANGE_TITLE',
	playLoad
})

export const changeSidebarStatus = playLoad => ({
	type: 'CHANGE_SIDEBAR_STATUS',
	playLoad
})
