import React from 'react';
import {BulbOutlined, TagsOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeTab} from "../../features/tab/tabSlice.ts";

type MenuItem = Required<MenuProps>['items'][number];


function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group',
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuProps['items'] = [
	getItem('所有问题', 'all', <BulbOutlined/>, [
		getItem('全部问题', 'questions'),
		getItem('未回答的', 'unanswered'),
		// getItem('我的问题', 'myQuestions', null, [
		// 	getItem('我回答的', 'myAnswers'),
		// 	getItem('我提出的', 'myAsked'),
		// ]),
	]),
	getItem('标签', 'tags', <TagsOutlined/>),
	getItem('用户', 'users', <UserOutlined/>),
]

export const SideBar: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch()

	const onClick: MenuProps['onClick'] = (e) => {
		if (e.key === 'questions') {
			dispatch(changeTab('heat'))
			navigate('/questions')
		}
		if (e.key === 'unanswered') {
			dispatch(changeTab('unanswered'))
			navigate('/questions')
		} else
			navigate('/' + e.key);
	};

	return (
		<Menu
			onClick={onClick}
			defaultSelectedKeys={['1']}
			defaultOpenKeys={['sub1']}
			mode="inline"
			items={items}
			style={{height: '100%'}}
		/>
	);
};

