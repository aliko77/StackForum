import { Sidebar } from 'components/ControlPanel/Sidebar';
import { ReactChildrenProps } from 'types';

const ControlPanelLayout = ({ children }: ReactChildrenProps) => {
   return (
      <>
         <div className="sm:container mx-2 sm:mx-auto my-4">
            <div className="table table-fixed w-full">
               <>
                  <Sidebar />
               </>
               <div className="mt-4 md:mt-0 float-none md:float-right w-full md:w-[calc(100%-260px)]">
                  {children}
               </div>
            </div>
         </div>
      </>
   );
};

export default ControlPanelLayout;
