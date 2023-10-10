import { useAbilityList } from '@/api/classic/pm-ability';
import React, { useState } from 'react';

const Ability = () => {
  const [keyword, setKeyword] = useState<string>('');

  const { data } = useAbilityList(keyword);

  return (
    <div>
      Ability
    </div>
  )
}

export default Ability;
