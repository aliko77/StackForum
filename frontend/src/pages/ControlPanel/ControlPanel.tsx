import { Sidebar } from 'components/ControlPanel/Sidebar';

const ControlPanel = () => {
   return (
      <>
         <div className="container mx-auto mt-4">
            <div className="table table-fixed w-full">
               <>
                  <Sidebar />
               </>
               <div className="float-none md:float-right w-full md:w-[calc(100%-300px)]">
                  <div>content</div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ControlPanel;
