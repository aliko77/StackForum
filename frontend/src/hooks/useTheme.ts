import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
import { Theme, setTheme } from 'store/slices/appSlice';
import store2 from 'store2';

const useTheme = () => {
   const dispatch = useDispatch();

   const { theme } = useSelector((state: RootState) => state.app);

   const setCurrentTheme = useCallback((theme: Theme) => {
      dispatch(setTheme(theme));
      store2.set('theme', theme);
      if (theme === Theme.Dark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
   }, []);

   return { theme, setCurrentTheme };
};

export default useTheme;
