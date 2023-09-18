import React, { FC, ReactNode } from 'react';
import styles from './light-form.module.css';

export type ILightFormBlockProps = {
  title?: string;
  children: ReactNode;
}

const LightFormBlock: FC<ILightFormBlockProps> = (props) => {
  const { title, children } = props;

  return (
    <div className={styles.block}>
      <div className={styles.blockTitle}>{title}</div>
      <div className={styles.blockContent}>{children}</div>
    </div>
  );
}

export default LightFormBlock;
