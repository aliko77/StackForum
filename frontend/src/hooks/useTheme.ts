import { useSelector } from 'react-redux';
import { _setTheme } from 'slices/app';
import store, { RootState } from 'stores';

export const useTheme = () => {
   const theme = useSelector((state: RootState) => state.app.theme);

   const setTheme = (theme: string) => store.dispatch(_setTheme(theme));

   return { theme, setTheme };
};
