import { FC, ReactNode } from "react";

type AlertProps = {
    color: string;
    children: ReactNode;
};

const Alert: FC<AlertProps> = ({ color, children }) => {
    return (
        <div
            className={`bg-${color}-500 text-white text-center dark:text-gray-100 p-2 border dark:border-night rounded-sm`}
        >
            <p>{children}</p>
        </div>
    );
};

export default Alert;
