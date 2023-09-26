import React, { useEffect } from 'react';
import { IPmType, usePmType } from '@/api/classic';
import transfer from '@/utils/i18n';
import styles from './type.module.css';

type IRenderType = {
  en_name: string;
  ch_name: string;
  effect: number[];
}

function handleEffect(data: IPmType[]): IRenderType[] {
  // const effectTemplate = data.map()


  return data?.map(attackType => {




    const rt: IRenderType = {
      en_name: attackType.en_name,
      ch_name: attackType.ch_name,
      effect: [],
    }
    return rt;
  }) ?? [];
}

const Type = () => {
  const { data } = usePmType();
  let renderType: IRenderType[] = [];
  useEffect(() => {
    renderType = data?.map(attackType => {
      const effect: number[] = [];
      const at = attackType.en_name;

      data.forEach(defenseType => {
        if (defenseType.weak_to.includes(at)) {
          effect.push(2);
        } else if (defenseType.resistant_to.includes(at)) {
          effect.push(0.5);
        } else if (defenseType.immune_to.includes(at)) {
          effect.push(0);
        } else {
          effect.push(1);
        }
      });

      let rt = {
        en_name: attackType.en_name,
        ch_name: attackType.ch_name,
        effect: effect,
      }

      return rt;
    }) || renderType;
    console.log(renderType);
  }, [data]);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.cell}>占位</span>
        {data.map(type => (
          <span
            key={type.en_name}
            className={styles.cell}
            children={transfer(type)}
            style={{background: type.color}}
          />
        ))}
      </div>
      {/* {data.map(type => (
        <div className={styles.row}>

        </div>
      ))} */}

    </div>
  )
}

export default Type;
