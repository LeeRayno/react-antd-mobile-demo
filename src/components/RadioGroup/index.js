/**
 * Created by Administrator on 2017/8/8.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './radioGroup.less'

class RadioGroup extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		data: PropTypes.array.isRequired,
		onChange: PropTypes.func.isRequired
	}

	static defaultProps = {
		defaultValue: ''
	}

	handleRadioChange = (e) => {
		// e.preventDefault()
		e.stopPropagation()
		
		const { onChange } = this.props
		onChange(e.target.value)
		console.log(e.isPropagationStopped())

	}

	render(){
		const {name, defaultValue, data} = this.props
		return (
			<div className="radio-group">
				{data.map((item, index) => (
					<label className="radio-label" key={index}>
						<input type="radio" name={name} value={item} defaultChecked={item === defaultValue} onClick={this.handleRadioChange}/>
						<span>{item}</span>
					</label>
				))}
			</div>
		)
	}
}

export default RadioGroup