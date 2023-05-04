import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import i18n from 'common/language/i18n';

import { RootState } from 'store';
import { setLanguage } from 'store/slices/appSlice';
import { Language } from 'types';

const useLanguage = () => {
   const dispatch = useDispatch();

   const { language } = useSelector((state: RootState) => state.app);

   const setCurrentLanguage = useCallback(
      (language: Language) => {
         dispatch(setLanguage(language));
         i18n.changeLanguage(language);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
   );

   return { language, setCurrentLanguage };
};

export default useLanguage;
