import { Sidebar } from 'components/ControlPanel/Sidebar';
import { ReactChildrenProps } from 'types';

const ControlPanelLayout = ({ children }: ReactChildrenProps) => {
   return (
      <>
         <div className="container mx-auto sm:flex py-4 px-4 sm:space-x-6 space-y-4 sm:space-y-0">
            <div>
               <Sidebar />
            </div>
            <div className="w-full overflow-auto">{children}</div>
         </div>
      </>
   );
};

export default ControlPanelLayout;
