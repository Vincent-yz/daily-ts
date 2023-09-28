import React, { useEffect } from 'react';
import { List } from 'antd-mobile';
import { useNavigate } from 'react-router';
import ToolItem from './feature';
import useLayoutContext from '@/layout/layout-context';

const Tools = () => {
  const navigate = useNavigate();
  const { setPageTitle } = useLayoutContext();
  useEffect(() => setPageTitle('tools'), [setPageTitle]);

  return (
    <div>
      <List>
        {ToolItem.map(item => (
          <List.Item key={item.key} arrow>
            <div onClick={() => navigate(item.key)}>{item.title}</div>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default Tools;
