'use client'
import React from "react";
import { useChat } from "ai/react";

export default function generate() {
    const { handleInputChange, handleSubmit, messages } = useChat({ api: "/api/chat" });
   
  return (
      <section className='flex justify-center items-center h-screen'>
          {messages.map(message => (
              <div className={`flex flex-col mb-2 p-2 rounded-md ${ message.role === 'assistant'?'self-end bg-gray-800':'self-start bg-blue-700'}`} key={message.id}>
{message.content}                  
              </div>
          ))}
      <form action='' className='max-w-xl w-full' onSubmit={handleSubmit}>
        <div className='flex justify-between my-4'>
          <label className='text-white block font-bold my-2'> say something...</label>
          <button className='bg-blue-600 text-white px-3 py-2 rounded-md focus:outline-none'>Send</button>
        </div>
        <textarea
          rows={4}
          placeholder='message here'
          className='text-black bg-slate-300 px-3 py-2 w-full rounded-md focus:outline-none'
          onChange={handleInputChange}></textarea>
      </form>
    </section>
  );
}
