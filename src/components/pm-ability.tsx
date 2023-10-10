import React, { FC } from 'react';
import { usePmAbility } from '@/api/classic/pm-ability';
import i18n from '@/utils/i18n';

type IPmAbilityProps = {
  enName?: string;
}

const PmAbility: FC<IPmAbilityProps> = (props) => {
  const { enName } = props;
  const { data } = usePmAbility(enName);

  if (!enName || !data) return null;

  return (
    <span>{i18n.transfer(data)}</span>
  )
}

export default PmAbility;
