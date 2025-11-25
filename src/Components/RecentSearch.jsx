import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

function RecentSearch({ clearHistory, recentHistory, setSelectedHistory, setRecentHistory }) {
  const [open, setOpen] = useState(false); 

  const clearSelectedHistory = (selectedItem) => {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history = history.filter((item) => item !== selectedItem);

    setRecentHistory(history);
    localStorage.setItem("history", JSON.stringify(history));
  };

  return (
    <>
      <button
        className="md:hidden fixed top-5 left-4 z-50 bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white px-3 py-1 rounded-md shadow"
        onClick={() => setOpen(!open)}
      >
        Recent search
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-zinc-200 dark:bg-zinc-800 p-5 overflow-auto 
          transition-transform duration-300 z-40
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:relative md:block`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-white bg-red-600 px-2 rounded"
          onClick={() => setOpen(false)}
        >
          X
        </button>

        <div className="flex justify-between gap-5 mt-10 md:mt-0">
          <h1 className="text-xl text-black dark:text-white">Recent Search</h1>
          <button
            onClick={clearHistory}
            className="cursor-pointer text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700 p-1 rounded"
          >
            <Trash2 />
          </button>
        </div>

        <ul className="text-left mt-4">
          {recentHistory?.map((item, index) => (
            <div key={index} className="flex justify-between py-1">
              <li
                onClick={() => {
                  setSelectedHistory(item);
                  setOpen(false); // Close drawer on mobile selection
                }}
                className="p-1 w-full text-zinc-700 dark:text-zinc-400 cursor-pointer truncate hover:bg-zinc-300 dark:hover:bg-zinc-700"
              >
                {item}
              </li>

              <button
                onClick={() => clearSelectedHistory(item)}
                className="cursor-pointer text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700 p-1 rounded"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecentSearch;
