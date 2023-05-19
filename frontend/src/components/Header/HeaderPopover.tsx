import { Popover } from '@headlessui/react';
import { LogoutButton } from 'components/LogoutButton';

export const HeaderPopOver = () => {
   return (
      <Popover>
         <Popover.Button className="p-1.5 bg-white dark:bg-night-100 shadow rounded focus:outline-none focus:ring-1 focus:ring-gray-400">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="1.5"
               stroke="currentColor"
               className="w-6 h-6 text-zinc-500 hover:text-rose-500 dark:text-gray-400 hover:dark:text-indigo-400"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
               />
            </svg>
         </Popover.Button>

         <Popover.Panel className="absolute z-[999] bg-night-100 shadow border border-gray-700 rounded-sm top-14">
            <div></div>
            <hr className="border-zinc-500 border-1" />
            <div className="grid grid-cols-2">
               <LogoutButton />
            </div>
         </Popover.Panel>
      </Popover>
   );
};
