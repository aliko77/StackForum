import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { FC } from 'react';

interface PaginationProps {
   count: number;
   range?: number;
}

const Pagination: FC<PaginationProps> = ({ count, range = 3 }) => {
   return (
      <ReactPaginate
         className="flex items-center gap-x-1.5 border p-2 border-gray-700 dark:border-gray-400 rounded mt-4"
         previousClassName="mr-auto"
         nextClassName="ml-auto"
         nextLinkClassName="w-8 h-8 rounded-full border border-gray-700 dark:border-gray-400 flex items-center justify-center text-sm text-zinc-500 font-semibold hover:border-zinc-600 hover:text-primary-500"
         previousLinkClassName="w-8 h-8 rounded-full border border-gray-700 dark:border-gray-400 flex items-center justify-center text-sm text-zinc-500 font-semibold hover:border-zinc-600 hover:text-primary-500"
         activeClassName="!bg-primary !border-primary !text-white"
         activeLinkClassName="w-8 h-8 rounded-full border border-gray-700 dark:border-gray-400 flex items-center justify-center text-sm text-zinc-500 font-semibold hover:border-zinc-600 hover:text-primary-500"
         breakClassName="h-9 flex items-center text-zinc-400 pb-2"
         pageClassName="text-gray-700 dark:text-gray-400"
         pageLinkClassName="flex items-center mx-1 p-1"
         breakLabel="..."
         nextLabel={<MdOutlineKeyboardArrowRight size={18} />}
         // onPageChange={handlePageClick}
         pageRangeDisplayed={range}
         marginPagesDisplayed={1}
         pageCount={count}
         previousLabel={<MdOutlineKeyboardArrowLeft size={18} />}
      />
   );
};

export default Pagination;
