import {FC} from 'react';

interface InputProps {
    id: string,
    type: string,
    placeholder: string,
    required: boolean
}

const TextInput: FC<InputProps> = ({id, type, placeholder, required}) => {
    return (
        <input type={type} id={id} placeholder={placeholder} required={required}
               className="block w-full p-2 outline-0 bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
        />
    );
}

export default TextInput;