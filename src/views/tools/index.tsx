import React from 'react';
import { List } from 'antd-mobile';
import { Link } from 'react-router-dom';

interface ITool {
  title: string;
  key: string;
}

const ToolItem:ITool[] = [
  {
    title: '属性克制',
    key: '/tools/type',
  },
  {
    title: '性格修正',
    key: '/tools/nature',
  },
  {
    title: '招式查询',
    key: '/tools/move',
  },
  {
    title: '特性查询',
    key: '/tools/ability',
  },
  {
    title: '蛋组查询',
    key: '/tools/egg-group',
  },
  {
    title: '道具查询',
    key: '/tools/held-item',
  },
  {
    title: '数据同步',
    key: '/tools/data-sync',
  },
]

const Tools = () => {
  return (
    <div>
      <List>
        {ToolItem.map(item => (
          <List.Item key={item.key}>
            <Link to={item.key}>{item.title}</Link>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default Tools;
