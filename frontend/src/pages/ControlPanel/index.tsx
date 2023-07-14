import ControlPanelLayout from 'layouts/ControlPanel';

const ControlPanel = () => {
   return (
      <ControlPanelLayout>
         <div className="w-full mb-4">
            <div className="border border-gray-300 bg-gray-300 dark:bg-night-900 dark:text-gray-100 p-2 rounded-t">
               <p className="text-base font-500 tracking-wide">Sorduğunuz Sorular</p>
            </div>
         </div>
         <div className="w-full">
            <div className="border border-gray-300 bg-gray-300 dark:bg-night-900 dark:text-gray-100 p-2 rounded-t">
               <p className="text-base font-500 tracking-wide">Son Mesajlarınız</p>
            </div>
         </div>
      </ControlPanelLayout>
   );
};

export default ControlPanel;
