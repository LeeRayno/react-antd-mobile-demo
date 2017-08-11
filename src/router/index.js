/**
 * Created by Administrator on 2017/8/3.
 */
import Loadable from 'react-loadable'

const Login = Loadable({
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

const routes = [
	{
		path: '/login',
		component: Login,
		exact: true,
		title: '登录'
	},
	{
		path: '/customer',
		component: Customer,
		exact: true,
		title: '客户列表'
	},
	{
		path: '/customerDetail/:id',
		exact: true,
		component: CustomerDetail,
		title: '客户信息'
	}
]

export default routes