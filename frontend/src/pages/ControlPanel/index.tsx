import ControlPanelLayout from 'layouts/ControlPanel';
import { Topics } from 'components/Topics';

const ControlPanel = () => {
   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="bg-night-900 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Son Mesajlarınız
               </p>
            </div>
            <Topics />
         </div>
      </ControlPanelLayout>
   );
};

export default ControlPanel;
