import { Listbox } from '@headlessui/react';

export type CustomDropdownOption<T> = {
   label: string;
   value: T;
};
type CustomDropdownProps<T> = {
   options: CustomDropdownOption<T>[];
   value: T;
   onChange(value: T): void;
};

export const SelectMenu = <T,>(props: CustomDropdownProps<T>) => {
   const options = props.options;
   const selectedItem = options.find((o) => o.value === props.value);
   const label = selectedItem?.label ?? 'Seçiniz...';
   return (
      <Listbox value={props.value} onChange={props.onChange}>
         <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-sm bg-gray-50 dark:bg-gray-700 p-1.5 pl-3 pr-10 text-left outline-none border border-gray-300 text-gray-900 focus:ring-rose-500 focus:border-rose-500 dark:focus:ring-violet-500 dark:focus:border-violet-500 dark:border-gray-600 dark:text-gray-100">
               <span className="block truncate text-gray-700 dark:text-gray-100">{label}</span>
               <span className="text-gray-600 dark:text-gray-400 pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-5 h-5"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                     />
                  </svg>
               </span>
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1.5 max-h-60 w-full overflow-auto rounded-sm bg-white dark:bg-gray-700 py-1 shadow-lg border border-gray-300 dark:border-gray-600 ring-1 ring-black ring-opacity-5 text-sm outline-none">
               {options.map((option, i) => (
                  <Listbox.Option
                     key={i}
                     value={option.value}
                     className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                           active
                              ? 'bg-rose-200 text-rose-800 dark:bg-violet-300 dark:text-violet-800'
                              : 'text-gray-900 dark:text-gray-100'
                        }`
                     }
                  >
                     {({ selected }) => (
                        <>
                           <span
                              className={`block truncate ${
                                 selected ? 'font-medium' : 'font-normal'
                              }`}
                           >
                              {option.label}
                           </span>
                           {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-rose-600 dark:text-violet-500">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M4.5 12.75l6 6 9-13.5"
                                    />
                                 </svg>
                              </span>
                           ) : null}
                        </>
                     )}
                  </Listbox.Option>
               ))}
            </Listbox.Options>
         </div>
      </Listbox>
   );
};
