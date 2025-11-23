import React from 'react'
import { ArrowUp, Trash2 } from 'lucide-react'

function RecentSearch({clearHistory,recentHistory,setSelectedHistory,setRecentHistory}) {

    const clearSlectedHistory =(selectedItem)=>{
        let history =JSON.parse(localStorage.getItem('history'));

       history = history.filter((item)=>{
            if(item != selectedItem){
                return item;
            };
        })
        setRecentHistory(history);
        localStorage.setItem('history',JSON.stringify(history));
        // console.log(history,selectedItem);
    }

    return (
        <>
            <div className='hidden md:block w-64 shrink-0 bg-zinc-200 dark:bg-zinc-800 p-5 h-screen overflow-auto'>
                
                <div className='flex justify-between gap-5'>
                    <h1 className='text-xl text-black dark:text-white'>Recent Search</h1>
                    <button
                        onClick={clearHistory}
                        className=' cursor-pointer text-black dark:text-white  hover:bg-zinc-300 dark:hover:bg-zinc-700'><Trash2 /></button>
                </div>
                <ul className='text-left overflow-auto mt-4'>
                    {
                        recentHistory && recentHistory.map((item,index) => {
                            return <div className='flex justify-between py-1 '> 
                            <li key={index}
                            onClick={() => {
                                setSelectedHistory(item)

                            }} className='p-1 w-full text-zinc-700 dark:text-zinc-400 cursor-pointer truncate hover:bg-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-200'>{item}</li>

                            <button
                        onClick={()=>clearSlectedHistory(item)}
                        className=' cursor-pointer text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700'><Trash2 /></button>
                        </div>
                        })
                    }
                </ul>
            </div>

        </>
    )
}

export default RecentSearch
