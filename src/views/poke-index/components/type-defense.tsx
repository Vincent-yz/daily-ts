import React, { FC } from 'react';
import { usePmType } from '@/api/classic';
import PmType from '@/components/pm-type';
import { LightFormItem } from '@/components/light-form';

type ITypeDefenseProps = {
  typeIds: string[];
}

const TypeDefense: FC<ITypeDefenseProps> = (props) => {
  const { data: pmType } = usePmType();
  const { typeIds } = props;

  const defenseMap: Record<string, number> = {};

  pmType?.forEach(t => {
    if (t.en_name === typeIds[0] || t.en_name === typeIds[1]) {
      defenseMap[t.en_name] ??= 100;
      t.weak_to.forEach(id => {
        defenseMap[id] = 2 * (defenseMap[id] ?? 100);
      });
      t.resistant_to.forEach(id => {
        defenseMap[id] = .5 * (defenseMap[id] ?? 100);
      });
      t.immune_to.forEach(id => {
        defenseMap[id] = 0 * (defenseMap[id] ?? 100);
      });
    }
  });

  const x400:string[] = [];
  const x200:string[] = [];
  const x50:string[] = [];
  const x25:string[] = [];
  const x0:string[] = [];

  for (let id in defenseMap) {
    if (defenseMap[id] === 400) {
      x400.push(id);
    } else if (defenseMap[id] === 200) {
      x200.push(id);
    } else if (defenseMap[id] === 50) {
      x50.push(id);
    } else if (defenseMap[id] === 25) {
      x25.push(id);
    } else if (defenseMap[id] === 0) {
      x0.push(id);
    }
  }

  return (
    <>
      <LightFormItem label="x400">
        {x400.map(id => <PmType key={id} id={id} />)}
      </LightFormItem>
      <LightFormItem label="x200">
        {x200.map(id => <PmType key={id} id={id} />)}
      </LightFormItem>
      <LightFormItem label="x50">
        {x50.map(id => <PmType key={id} id={id} />)}
      </LightFormItem>
      <LightFormItem label="x25">
        {x25.map(id => <PmType key={id} id={id} />)}
      </LightFormItem>
      <LightFormItem label="x0">
        {x0.map(id => <PmType key={id} id={id} />)}
      </LightFormItem>
    </>
  );
}

export default TypeDefense;
