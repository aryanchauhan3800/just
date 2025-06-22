
import React from 'react'
import { FiSearch } from 'react-icons/fi';
import { RxCross2 } from "react-icons/rx";
import { Input } from '../ui/input';

const SearchBar = ({ search, setSearch }: { search: string; setSearch: (val: string) => void; }) => {

  return (
    <div className="flex items-center rounded-full ring-1 ring-gray-300 min-w-[360px] max-w-[360px] px-3 py-2 h-12">
      <FiSearch className="size-4 text-[#B3B3B3]" />
      <Input
        title='Search Item Names'
        value={search}
        onChange={(e) => { setSearch(e.target.value)}}
        placeholder="Search by item name..."
        className="border-0 hover:border-0 ring-0 focus-visible:ring-0 shadow-none placeholder:text-[#B3B3B3] placeholder:text-lg placeholder:italic"
      />
      {search.length > 0 && <RxCross2 title='Clear All' className='text-red-500 size-6 cursor-pointer' onClick={() => setSearch("")} /> }
    </div>
  )
}

export default SearchBar;