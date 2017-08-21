
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import createHashHistory from 'history/createHashHistory'
import App from './container/App/App'
import store from './redux'
import './index.css'

const history = createHashHistory()

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App history={history}/>
		</Router>
	</Provider>,
	document.getElementById('root')
);
