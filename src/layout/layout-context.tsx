import { createContext, useContext } from 'react';

type ILayoutContext = {
  pageTitle: string;
  setPageTitle: Function;
}

export const LayoutContext = createContext<ILayoutContext>({
  pageTitle: "",
  setPageTitle: () => {},
});

const useLayoutContext = () => useContext(LayoutContext);

export default useLayoutContext;
