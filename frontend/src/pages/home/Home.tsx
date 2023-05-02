import Button from 'components/button';
import useTheme from 'hooks/useTheme';
import useLanguage from 'hooks/useLanguage';
import { Theme, Language } from 'store/slices/appSlice';
import useAuth from 'hooks/useAuth';

const Home: React.FC = () => {
   const { theme, setCurrentTheme } = useTheme();
   const { language, setCurrentLanguage } = useLanguage();

   const setTheme = () => {
      setCurrentTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
   };
   const setLanguage = () => {
      setCurrentLanguage(language === Language.EN ? Language.TR : Language.EN);
   };
   return (
      <>
         <div className="space-y-2 flex flex-col items-center">
            <div>Home</div>
            <div>Mevcut tema: {theme}</div>
            <div>Mevcut dil: {language}</div>
            <div>
               <Button onClick={setTheme} text="ChangeTheme" sClass="bg-rose-500" />
            </div>
            <div>
               <Button onClick={setLanguage} text="ChangeLanguage" sClass="bg-rose-500" />
            </div>
         </div>
      </>
   );
};

export default Home;
