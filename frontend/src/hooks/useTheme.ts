import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
import { setTheme } from 'store/slices/appSlice';
import { Theme } from 'types';

const useTheme = () => {
   const dispatch = useDispatch();

   const { theme } = useSelector((state: RootState) => state.app);

   const setCurrentTheme = useCallback(
      (theme: Theme) => {
         dispatch(setTheme(theme));
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
   );

   return { theme, setCurrentTheme };
};

export default useTheme;
