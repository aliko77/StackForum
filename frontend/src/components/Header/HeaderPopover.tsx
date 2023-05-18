import { Popover } from '@headlessui/react';

const HeaderPopOver = () => {
   return (
      <Popover>
         <Popover.Button>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="1.5"
               stroke="currentColor"
               className="w-6 h-6 text-zinc-600 hover:text-rose-500 dark:text-gray-400 hover:dark:text-gray-300"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
               />
            </svg>
         </Popover.Button>

         <Popover.Panel className="absolute z-10">
            <div className="grid grid-cols-2">
               <a href="/analytics">Analytics</a>
               <a href="/engagement">Engagement</a>
               <a href="/security">Security</a>
               <a href="/integrations">Integrations</a>
            </div>

            <img src="/solutions.jpg" alt="" />
         </Popover.Panel>
      </Popover>
   );
};

export default HeaderPopOver;
