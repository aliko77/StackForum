import React from 'react';

type ButtonProps = {
    onClick: () => void,
    text: string,
    sClass: string,
};

function Button(props: ButtonProps) {
    const {onClick, text, sClass} = props;

    const buttonClass = `${sClass} py-1 px-2 rounded-sm dark:text-gray-100`;

    return (
        <button className={`${buttonClass}`} onClick={onClick}>
            <span className="text-white uppercase text-sm">{text}</span>
        </button>
    );
}

export default Button;
