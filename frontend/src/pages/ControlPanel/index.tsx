import ControlPanelLayout from 'layouts/ControlPanel';
import { Topics } from 'components/Questions';
import { Topics_i_answered } from 'fake-api/Topices_i_answered';
import { Topices_i_created } from 'fake-api/Topices_i_created';

const ControlPanel = () => {
   return (
      <ControlPanelLayout>
         <div className="w-full mb-4">
            <div className="border border-gray-300 bg-gray-300 dark:bg-night-900 dark:text-gray-100 p-2 rounded-t">
               <p className="text-base font-500 tracking-wide">Sorduğunuz Sorular</p>
            </div>
            <Topics topics={Topices_i_created} />
         </div>
         <div className="w-full">
            <div className="border border-gray-300 bg-gray-300 dark:bg-night-900 dark:text-gray-100 p-2 rounded-t">
               <p className="text-base font-500 tracking-wide">Son Mesajlarınız</p>
            </div>
            <Topics topics={Topics_i_answered} />
         </div>
      </ControlPanelLayout>
   );
};

export default ControlPanel;
