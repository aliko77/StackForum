import ReactPaginate from 'react-paginate';
import { FC } from 'react';

interface PaginationProps {
   pageCount: number;
   handlePageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: FC<PaginationProps> = ({ pageCount, handlePageChange }) => {
   return (
      <ReactPaginate
         className="w-full flex justify-end space-x-2 items-center pt-4 mt-4"
         activeLinkClassName="!bg-primary-500 !text-white"
         pageLinkClassName="w-7 h-7 flex items-center justify-center bg-white dark:bg-night-900 hover:bg-gray-300 dark:hover:bg-night-600 border border-gray-300 dark:border-gray-500 rounded text-sm dark:text-primary-100 font-500"
         nextLinkClassName="h-7 px-2 bg-white border border-gray-300 dark:border-gray-500 rounded dark:bg-night-900 flex items-center justify-center text-sm dark:text-primary-100 hover:text-secondary-700"
         previousLabel={'Prev'}
         previousLinkClassName="h-7 px-2 bg-white border border-gray-300 dark:border-gray-500 rounded dark:bg-night-900 flex items-center justify-center text-sm dark:text-primary-100 hover:text-secondary-700"
         disabledLinkClassName="!hidden"
         breakLabel="..."
         breakClassName="w-7 h-7 flex items-center text-gray-400 pb-2"
         onPageChange={handlePageChange}
         pageRangeDisplayed={3}
         marginPagesDisplayed={2}
         pageCount={pageCount}
      />
   );
};

export default Pagination;
