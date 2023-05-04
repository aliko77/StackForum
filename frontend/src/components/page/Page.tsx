import { ReactChildrenResponse } from 'types';

const Page = ({ children }: ReactChildrenResponse) => {
   return <main className="content dark:bg-night">{children}</main>;
};

export default Page;
