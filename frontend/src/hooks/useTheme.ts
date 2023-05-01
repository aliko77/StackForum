import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
import { Theme, setTheme } from 'store/slices/appSlice';

const useTheme = () => {
   const dispatch = useDispatch();

   const { theme } = useSelector((state: RootState) => state.app);

   const setCurrentTheme = useCallback((theme: Theme) => {
      dispatch(setTheme(theme));
   }, []);

   useEffect(() => {
      if (theme === Theme.Dark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
   }, [theme]);

   return { theme, setCurrentTheme };
};

export default useTheme;
