import React, { FC } from 'react';
import { usePmAbility } from '@/api/classic/pm-ability';
import i18n from '@/utils/i18n';
import { useNavigate } from 'react-router';

type IPmAbilityProps = {
  enName?: string;
  hidden?: boolean;
}

const PmAbility: FC<IPmAbilityProps> = (props) => {
  const { enName, hidden } = props;
  const navigate = useNavigate();
  const { data } = usePmAbility(enName);

  if (!enName || !data) return null;
  const desc = {en_name: data.short_effect, ch_name: data.flavor};

  return (
    <>
      <div onClick={() => navigate(`/tools/ability/${data.en_name}`)}>
        <span>{i18n.transfer(data)}</span>
        {hidden ?
          <span style={{fontSize: '8px', color: '#aaa'}}>({i18n.transfer('hidden-ability')})</span> :
        null}
      </div>
      <div style={{fontSize: '8px', color: '#aaa'}}>{i18n.transfer(desc)}</div>
    </>
  )
}

export default PmAbility;
