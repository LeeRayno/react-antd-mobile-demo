/**
 * Created by Administrator on 2017/8/15.
 */
import React from 'react'
import './detailItem.less'
import { formatTime } from '../../utils'

const DetailItem = (props) => {
	const { key, value } = props.item
	return (
		<li className="detail-item">
			<span className="key">{key}</span>
			<span className="value">{formatTime(3, value)}</span>
		</li>
	)
}

export default DetailItem