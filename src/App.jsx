import React, { useEffect, useState } from 'react'
import { ArrowUp, Trash2 } from 'lucide-react'
import Answers from './Components/Answers';
import { useRef } from 'react';
import RecentSearch from './Components/RecentSearch';
import QuestionAnswer from './Components/QuestionAnswer';

const App = () => {

  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')));
  const [selectedHistory, setSelectedHistory] = useState('');
  const [loader, setLoader] = useState(false);
  const [DarkMode, setDarkMode] = useState('dark');

  const scrollToAns = useRef();

  const askQuestion = async () => {


    if (!question && !selectedHistory) {
      return false;
    }


    setLoader(true);

    if (question) {
      if (localStorage.getItem('history')) {
        let history = JSON.parse(localStorage.getItem('history'));
        // history= history.slice(0,19);
        history = [question, ...history];
        history = history.map((item) =>
          item ? item.charAt(0).toUpperCase() + item.slice(1).trim() : ""
        );
        history = [...new Set(history)];
        localStorage.setItem('history', JSON.stringify(history));
        setRecentHistory(history);
      }
      else {
        localStorage.setItem('history', JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

    const payLoadData = question ? question : selectedHistory;

    const payload = { prompt: payLoadData }; 
let response = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});
response = await response.json();


    if (!response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log("Invalid response:", response);
      setResult(["Error: API returned nothing"]);
      return;
    }

    let dataString = response.candidates[0].content.parts[0].text;
    /* dataString = dataString.replace(/\*+/g, '').trim();
    dataString = dataString.split(/\n+/).map(item => item.trim()); */
    // console.log(dataString);

    // console.log(response.candidates[0].content.parts[0].text);(
    setResult(prev => [...prev, { type: 'q', text: question ? question : selectedHistory }, { type: 'a', text: dataString }]);
    setQuestion("");

    setTimeout(() => {

      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
      setLoader(false);
    }, 500);
  }

  // console.log(result);
  // console.log(recentHistory);

  const isEnter = (e) => {
    // console.log(e.key);
    if (e.key == "Enter") {
      askQuestion();

    }
  }

  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  }

  useEffect(() => {
    console.log(selectedHistory);
    askQuestion();
  }, [selectedHistory])

  useEffect(() => {
    console.log(DarkMode);
    if (DarkMode == 'dark') {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }

  }, [DarkMode])

  return (


    <div className={DarkMode == 'dark' ? 'dark' : 'light'}>
      <div className='grid grid-cols-1 h-screen text-center md:grid-cols-5  '>
        <select onChange={(e) => setDarkMode(e.target.value)}
          className='fixed top-4 right-4 z-50 bg-gray-300 dark:bg-zinc-700 shadow-gray-500 dark:shadow-zinc-600 p-2 rounded-md shadow-md text-gray-600 dark:text-gray-300'>
          <option value="dark" className='text-black'>Dark</option>
          <option value="light" className='text-white'>Light</option>
        </select>

        <RecentSearch clearHistory={clearHistory} recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory} />

        <div className='col-span-4 flex flex-col h-screen relative'>
          =
          {loader && (
            <div className="absolute inset-0 flex justify-center items-center bg-transparent z-10">
              <div className="w-10 h-10 border-4 border-violet-800 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {result.length === 0 && !loader && (
            <div className="flex-grow flex flex-col justify-center items-center gap-4 py-6 z-0">
              <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700">
                Hello User, Ask me anything
              </h1>
            </div>
          )}


          <div ref={scrollToAns} className='flex-grow  overflow-auto dark:bg-black bg-white text-black dark:text-gray-400 p-10 '>
            
              <ul>
                <QuestionAnswer result={result} Answers={Answers} />

              </ul>
              {/*  <ul> 
               {
                result && result.map((item, index) => {
                  return <li key={index + Math.random()} className='text-left  px-7'><Answers ans={item} /></li>
                })
              } 
            </ul>
             */}

       
          </div>

          <div
            className='sticky bottom-10  dark:bg-zinc-800 sm:w-1/2 max-w-xl text-black dark:text-zinc-400 m-auto w-1/2 p-4 pl-7 pr-7 rounded-full flex justify-between border-black dark:border-zinc-700 border-2'>

            <input
              onKeyDown={isEnter}
              className=' outline-none w-full h-full bg-transparent placeholder:text-black dark:placeholder:text-zinc-400' type='text' placeholder='Ask anything'
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value)
              }} />

            <button className='cursor-pointer' onClick={askQuestion} ><ArrowUp /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
