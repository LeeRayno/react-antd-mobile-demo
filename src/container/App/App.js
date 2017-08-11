import React, { Component } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { RouteWithSubRoutes } from '../../utils'
import routes from '../../router'
import Header from '../../components/Header'
import './app.less'

class App extends Component {
	render() {
		return(
			<div className="app">
				<Header/>
				<div className="main">
					<Switch>
						{routes.map((route, i) => (
							<RouteWithSubRoutes key={i} {...route} />
						))}
					<Redirect from="" to="/login" />
					</Switch>
				</div>
			</div>
		)
	}
}

export default App