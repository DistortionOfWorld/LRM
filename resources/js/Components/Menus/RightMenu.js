// React Libraries
import React from 'react'
import { Link } from 'react-router-dom'
// Components
import RightMemberMenu from './RightMemberMenu'
import RightGuestMenu from './RightGuestMenu'

const RightMenu = (props) => {
	if(props.session.logined)
	{
		return <RightMemberMenu username={props.session.username} changeLang={changeLang} classes={props.classes} />
	}
	else
	{
		return <RightGuestMenu changeLang={changeLang} classes={props.classes} />
	}
}

const changeLang = (props,lang) => {
	props.setLang(lang)
	props.setWords(lang)
	let params = new URLSearchParams()
	let url = props.root+'lang/'+lang
		window.axios.post(url,params)
			.then((response)=>{
			})
			.catch((error)=>{
			})
}

export default RightMenu
