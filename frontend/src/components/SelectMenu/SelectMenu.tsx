import { Listbox } from '@headlessui/react';
import classNames from 'classnames';
import { HiCheck, HiOutlineChevronUpDown } from 'react-icons/hi2';

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
            <Listbox.Button className="relative w-full cursor-default rounded-sm bg-gray-50 dark:bg-gray-700 p-1.5 pl-3 pr-10 text-left outline-none border border-gray-300 text-gray-900 focus:ring-secondary-500 focus:border-secondary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:border-gray-600 dark:text-gray-100">
               <span className="block truncate text-gray-700 dark:text-gray-100">{label}</span>
               <span className="text-gray-600 dark:text-gray-400 pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <HiOutlineChevronUpDown size="20px" />
               </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-sm bg-white dark:bg-gray-700 py-1 shadow-lg border border-gray-300 dark:border-gray-600 ring-1 ring-black ring-opacity-5 text-sm outline-none">
               {options.map((option, i) => (
                  <Listbox.Option
                     key={i}
                     value={option.value}
                     className={({ active }) =>
                        classNames(
                           'relative',
                           'cursor-default',
                           'select-none',
                           'py-2',
                           'pl-10',
                           'pr-4',
                           {
                              'bg-secondary-200': active,
                              'text-secondary-800': active,
                              'dark:bg-primary-300': active,
                              'dark:text-primary-800': active,
                              'text-gray-900': !active,
                              'dark:text-gray-100': !active,
                           },
                        )
                     }
                  >
                     {({ selected }) => (
                        <>
                           <span
                              className={classNames('block', 'truncate', {
                                 'font-medium': selected,
                                 'font-normal': !selected,
                              })}
                           >
                              {option.label}
                           </span>
                           {selected ? (
                              <span
                                 className={classNames(
                                    'absolute',
                                    'inset-y-0',
                                    'left-0',
                                    'flex',
                                    'items-center',
                                    'pl-3',
                                    'text-secondary-600',
                                    'dark:text-primary-500',
                                 )}
                              >
                                 <HiCheck size="20px" />
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
