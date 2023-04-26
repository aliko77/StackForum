export default function NoPage(): JSX.Element {
    return (
        <>
            <div className="flex justify-center items-center mt-[10vh]">
                <div className="px-4">
                    <div className="gap-4 flex">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="font-bold text-indigo-600 text-9xl">404</h1>
                            <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                                <span className="text-red-500">Oops!</span>
                            </p>
                            <p className="mb-8 text-center dark:text-gray-200">
                               Aradığınız sayfa bulunamadı...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}