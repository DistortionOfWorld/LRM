// React Libraries
import React from 'react'
// Components
import LoginForm from '../../Components/Contents/LoginForm'
import RegisterForm from '../../Components/Contents/RegisterForm'
import ForgotForm from '../../Components/Contents/ForgotForm'
import ResetForm from '../../Components/Contents/ResetForm'
import Home from '../../Components/Contents/Home'
import Verify from '../../Components/Contents/Verify'
import Menu1 from '../../Components/Contents/Menu1'
import Menu2 from '../../Components/Contents/Menu2'
import Menu3 from '../../Components/Contents/Menu3'
import Menu4 from '../../Components/Contents/Menu4'
import Settings from '../../Components/Contents/Settings'

const RoutingTable = {
	'login':{
		path:'/login',
		exact:true,
		category:'guest',
		icon:'lock',
		type:'component',
		component:(LoginForm),
	},
	'register':{
		path:'/register',
		exact:true,
		category:'guest',
		icon:'create',
		type:'component',
		component:(RegisterForm),
	},
	'forgot':{
		path:'/password/reset',
		exact:true,
		category:'guest',
		icon:'help_outline',
		type:'component',
		component:(ForgotForm),
	},
	'reset':{
		path:'/password/reset/:id',
		exact:false,
		category:'guest',
		icon:'how_to_reg',
		type:'render',
		render:((props) => <ResetForm params={props.match.params} />),
	},
	'verify':{
		path:'/email/verify',
		exact:true,
		category:'verify',
		icon: 'send',
		type:'component',
		component:(Verify),
	},
	'home':{
		path:'/home',
		exact:true,
		category:'member',
		icon: 'home',
		type:'component',
		component:(Home),
	},
	'menu1':{
		path:'/menu1',
		exact:true,
		category:'member',
		icon: 'looks_one',
		type:'component',
		component:(Menu1),
	},
	'menu2':{
		path:'/menu2',
		exact:true,
		category:'member',
		icon: 'looks_two',
		type:'component',
		component:(Menu2),
	},
	'menu3':{
		path:'/menu3',
		exact:true,
		category:'member',
		icon: 'looks_3',
		type:'component',
		component:(Menu3),
	},
	'menu4':{
		path:'/menu4',
		exact:true,
		category:'member',
		icon: 'looks_4',
		type:'component',
		component:(Menu4),
	},
	'settings':{
		path:'/settings',
		exact:true,
		category:'member',
		icon:'settings',
		type:'component',
		component:(Settings),
	},
}

export default RoutingTable
