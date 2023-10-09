import React, { FC, ReactNode } from 'react';

type IBlockProps = {
  title?: string;
  children?: ReactNode;
}

const Block: FC<IBlockProps> = ({title, children}) => {
  return (
    <div>
      <div style={{background: '#eee'}}>{title}</div>
      {children ?
        <div>{children}</div> :
        <div>--</div>
      }
    </div>
  )
}

export default Block;
