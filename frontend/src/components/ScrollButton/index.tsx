import classNames from 'classnames';
import { useState, useEffect, FC } from 'react';
import { FiChevronUp } from 'react-icons/fi';

const ScrollButton: FC = () => {
   const [isVisible, setIsVisible] = useState(false);

   const handleScroll = () => {
      if (window.scrollY > 100) {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
   };

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <button
         className={classNames(
            'fixed',
            'bottom-4',
            'right-4',
            'bg-secondary-500 dark:bg-primary-500',
            'text-white',
            'p-3',
            'rounded-full',
            'focus:outline-none',
            'focus:ring-0',
            {
               hidden: !isVisible,
            },
         )}
         onClick={scrollToTop}
      >
         <FiChevronUp size={24} />
      </button>
   );
};

export default ScrollButton;
