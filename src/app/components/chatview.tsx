"use client";

import { useChat } from "ai/react";
import { useState } from "react";

export default function ChatView() {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } = useChat({ api: '/api/data-collection', maxSteps: 10});

  return (
    <div className="flex flex-col h-screen w-full max-w-2xl mx-auto">
      {/* Fixed Title Bar */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          AI Accident Details Extraction
        </h1>
      </div>

      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="space-y-4">
          {messages.map(m => (
            <div key={m.id} className={`p-4 rounded-lg ${
              m.role === 'user' ? 'bg-blue-100 ml-auto max-w-[80%]' : 'bg-gray-100 mr-auto max-w-[80%]'
            }`}>
              <div className="font-semibold mb-1">
                {m.role === 'user' ? 'You' : 'PMR Assistant'}
              </div>
              <div className="text-gray-700">
                {m.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed bottom section */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white px-4 py-4">
        {messages.some(m => m.toolInvocations && m.toolInvocations.length > 0) && (
          <div className="w-full p-6 mb-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Accident Details</h3>
            {messages.map(m => (
              m.toolInvocations?.map((tool, index) => (
                tool.state === 'result' && (
                  <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="grid grid-cols-2 gap-3">
                      <p className="text-sm"><span className="font-medium">Date:</span> {tool.result.date}</p>
                      <p className="text-sm"><span className="font-medium">Time:</span> {tool.result.time}</p>
                      <p className="text-sm"><span className="font-medium">Location:</span> {tool.result.location}</p>
                      <p className="text-sm"><span className="font-medium">Number of Cars:</span> {tool.result.number_of_cars}</p>
                      <p className="col-span-2 text-sm"><span className="font-medium">Description of Injuries:</span> {tool.result.description_of_injuries}</p>
                    </div>
                  </div>
                )
              ))
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={input}
            placeholder="Type your message here..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}