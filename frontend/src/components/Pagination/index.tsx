import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { FC } from 'react';

interface PaginationProps {
   pageCount: number;
   handlePageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: FC<PaginationProps> = ({ pageCount, handlePageChange }) => {
   return (
      <ReactPaginate
         className="w-full flex items-center p-1.5 pt-4 mt-4 border-t border-gray-300 dark:border-gray-500"
         nextClassName="ml-auto"
         previousClassName="mr-auto"
         nextLinkClassName="w-6 h-6 rounded-full shadow-lg border border-gray-400 dark:border-primary-100 flex items-center justify-center text-sm text-gray-600 dark:text-primary-100 font-semibold hover:border-primary-400 hover:text-primary-500"
         previousLinkClassName="w-6 h-6 rounded-full shadow-lg border border-gray-400 dark:border-primary-100 flex items-center justify-center text-sm text-gray-600 font-semibold dark:text-primary-100 hover:border-secondary-400 dark:hover:border-primary-400 hover:text-primary-500"
         activeClassName="w-7 h-7 border border-gray-400 dark:border-primary-100 rounded-full flex items-center justify-center hover:border-secondary-400"
         pageLinkClassName="w-7 h-7 mx-1 flex items-center justify-center text-sm text-gray-500 dark:text-primary-500 font-semibold hover:text-secondary-700 dark:hover:text-primary-100"
         breakLabel="..."
         breakClassName="w-7 h-7 flex items-center text-gray-400 pb-2"
         nextLabel={<MdOutlineKeyboardArrowRight size={18} />}
         onPageChange={handlePageChange}
         pageRangeDisplayed={3}
         marginPagesDisplayed={2}
         pageCount={pageCount}
         previousLabel={<MdOutlineKeyboardArrowLeft size={18} />}
      />
   );
};

export default Pagination;
