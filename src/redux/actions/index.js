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

// sidebar
export const changeSidebarStatus = playLoad => ({
	type: 'CHANGE_SIDEBAR_STATUS',
	playLoad
})

//metaData
export const saveMetaData = playLoad => ({
	type: 'SAVE_META_DATA',
	playLoad
})

//listData
export const saveListData = playLoad => ({
	type: 'SAVE_LIST_DATA',
	playLoad
})
