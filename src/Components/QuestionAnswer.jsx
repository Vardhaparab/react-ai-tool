import React from 'react'

function QuestionAnswer({result,Answers}) {
    return (
        <>
            <div className=''>
                {result.map((msg, index) => (
                    <li key={index} className={msg.type === "q" ? " text-right bg-zinc-300 dark:bg-zinc-700 ml-auto px-4 py-2 border-zinc-500 dark:border-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit mt-5"
                        : " text-left  mt-5"}>
                        <Answers ans={msg.text} type={msg.type} />
                    </li>
                ))}
            </div>
        </>
    )
}

export default QuestionAnswer
