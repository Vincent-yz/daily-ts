import { createContext, useContext } from 'react';

type ILayoutContext = {
  pageTitle: string;
  setPageTitle: Function;
  locateChangedTime: number;
  changeLocate: Function;
}

export const LayoutContext = createContext<ILayoutContext>({
  pageTitle: "",
  setPageTitle: () => {},
  locateChangedTime: 0,
  changeLocate: () => {},
});

const useLayoutContext = () => useContext(LayoutContext);

export default useLayoutContext;
