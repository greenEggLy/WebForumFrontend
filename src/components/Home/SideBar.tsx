import React from 'react';
import { BulbOutlined, TagsOutlined, UserOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

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

const items:MenuProps['items'] = [
  getItem('所有问题', 'all', <BulbOutlined />, [
    getItem('全部问题', 'allQuestions'),
    getItem('未回答的', 'unanswered'),
    getItem('我的问题', 'myQuestions'),
  ]),
  getItem('标签', 'tags', <TagsOutlined />),
  getItem('用户', 'users', <UserOutlined />),
]

export const SideBar: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

