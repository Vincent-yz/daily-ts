import { createContext, useContext } from 'react';

type ITitleContext = {
  pageTitle: string;
  setPageTitle: Function;
}

export const TitleContext = createContext<ITitleContext>({
  pageTitle: "",
  setPageTitle: () => {},
});

const useTitleContext = () => useContext(TitleContext);

export default useTitleContext;
