interface ButtonProps {
    onClick?: () => void,
    text: string,
    sClass: string,
    type?: "button" | "submit" | "reset"
}

function Button(props: ButtonProps): JSX.Element {
    const {
        onClick, text, sClass, type = "button"
    } = props;

    const buttonClass = `${sClass} py-1.5 px-2 rounded-sm dark:text-gray-100`;

    return (
        <button className={`${buttonClass}`} onClick={onClick} type={type}>
            <span className="text-white uppercase text-sm">{text}</span>
        </button>
    );
}

export default Button;
