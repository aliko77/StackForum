import Logo from "../Logo";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t">
            <div className="w-full p-4">
                <Logo/>
                <hr className="my-6 border-gray-200 dark:border-gray-700"/>
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023 Stack Forum™. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}

export default Footer