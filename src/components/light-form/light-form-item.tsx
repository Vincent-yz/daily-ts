import React, { FC, ReactNode } from 'react';
import styles from './light-form.module.css';

type ILightFormItemProps = {
  label?: string;
  children: ReactNode;
}

const LightFormItem: FC<ILightFormItemProps> = (props) => {
  const { label, children } = props;

  if (!children || Array.isArray(children) && children.length < 1) return null;

  return (
    <div className={styles.item}>
      <div className={styles.itemLabel}>{label}</div>
      <div className={styles.itemContent}>{children}</div>
    </div>
  );
}

export default LightFormItem;
