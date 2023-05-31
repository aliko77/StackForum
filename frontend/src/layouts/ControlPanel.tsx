import { Sidebar } from 'components/ControlPanel/Sidebar';
import { IReactChildren } from 'types';

const ControlPanelLayout = ({ children }: IReactChildren) => {
   return (
      <>
         <div className="container mx-auto my-4">
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
