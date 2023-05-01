import Button from 'components/button/Button';
import useTheme from 'hooks/useTheme';
import { Theme } from 'store/slices/appSlice';

const Home: React.FC = () => {
   const { theme, setCurrentTheme } = useTheme();

   const setTheme = () => {
      setCurrentTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
   };

   return (
      <>
         <div>Home</div>
         <div>Mevcut tema: {theme}</div>
         <div>
            <Button onClick={setTheme} text="ChangeTheme" sClass="bg-rose-500" />
         </div>
      </>
   );
};

export default Home;
