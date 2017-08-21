/**
 * Created by Administrator on 2017/8/3.
 */
import Loadable from 'react-loadable'

/*const Login = Loadable({
	loader: () => import('../container/Login'),
	loading: () => null
})

const Customer = Loadable({
	loader: () => import('../container/Customer'),
	loading: () => null
})

const CustomerDetail = Loadable({
	loader: () => import('../container/CustomerDetail'),
	loading: () => null
})

const Calender = Loadable({
	loader: () => import('../container/Calender'),
	loading: () => null
})*/

const loadComponent = (component) => {
	return Loadable({
		loader: () => import(`../container/${component}/index.js`),
		loading: () => null
	})
}

const routes = [
	{
		path: '/login',
		component: loadComponent('Login'),
		exact: true,
		title: '登录'
	},
	{
		path: '/customer',
		component: loadComponent('Customer'),
		exact: true,
		title: '客户列表'
	},
	{
		path: '/customerDetail/:id',
		exact: true,
		component: loadComponent('CustomerDetail'),
		title: '客户信息'
	},
	{
		path: '/calender',
		exact: true,
		component: loadComponent('Calender'),
		title: '日历'
	}
]

export default routes