import { Sidebar } from 'components/AdminPanel/Sidebar';
import { ReactChildrenProps } from 'types';

const AdminPanel = ({ children }: ReactChildrenProps) => {
   return (
      <>
         <div className="container mx-auto sm:flex py-4 px-4 sm:space-x-6 space-y-4 sm:space-y-0">
            <div>
               <Sidebar />
            </div>
            <div className="w-full">{children}</div>
         </div>
      </>
   );
};

export default AdminPanel;
