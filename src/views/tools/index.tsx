import React, { useEffect } from 'react';
import { List } from 'antd-mobile';
import { useNavigate } from 'react-router';
import ToolItem from './feature';
import useLayoutContext from '@/layout/layout-context';
import Internationalization from './internationalization';
import i18n from '@/utils/i18n';

const Tools = () => {
  const navigate = useNavigate();
  const { setPageTitle } = useLayoutContext();
  useEffect(() => setPageTitle('tools'), [setPageTitle]);

  return (
    <div>
      <List>
        <List.Item extra={<Internationalization />}>
          {i18n.transfer('language')}
        </List.Item>
        {ToolItem.map(item => (
          <List.Item key={item.key} arrow>
            <div onClick={() => navigate(item.key)}>{i18n.transfer(item.title)}</div>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default Tools;
