import { Sidebar } from 'components/ControlPanel/Sidebar';
import { ReactChildrenProps } from 'types';

const ControlPanelLayout = ({ children }: ReactChildrenProps) => {
   return (
      <>
         <div className="sm:container flex sm:flex-row flex-col mx-auto px-4">
            <div className="mt-4">
               <Sidebar />
            </div>
            <div className="w-full my-4 sm:ml-8">{children}</div>
         </div>
      </>
   );
};

export default ControlPanelLayout;
