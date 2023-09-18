import React, { FC, ReactNode } from 'react';

type ILightFormProps = {
  children: ReactNode;
}

const LightForm: FC<ILightFormProps> = (props: ILightFormProps) => {
  const { children } = props;

  return (
    <div>
      {children}
    </div>
  );
}

export default LightForm;
