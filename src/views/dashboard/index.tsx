import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { AntOutline, StarOutline, CalculatorOutline, UnorderedListOutline, FlagOutline } from 'antd-mobile-icons';

const Classic = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Outlet />
      </div>
      <div>
        <TabBar onChange={(key) => navigate(key)}>
          <TabBar.Item key="/dashboard/poke-index" title="全国图鉴" icon={<AntOutline />} />
          <TabBar.Item key="/dashboard/king" title="天王" icon={<StarOutline />} />
          <TabBar.Item key="/dashboard/raising" title="培育" icon={<FlagOutline />} />
          <TabBar.Item key="/dashboard/battle" title="模拟" icon={<CalculatorOutline />} />
          <TabBar.Item key="/dashboard/tools" title="工具" icon={<UnorderedListOutline />} />
        </TabBar>
      </div>
    </div>
  )
}

export default Classic;
