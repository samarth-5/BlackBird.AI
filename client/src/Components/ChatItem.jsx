import React, { useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import phoenix from '/phoenix.png'

export default function ChatItem({ role, content, firstLetter }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [content]);

  const extractCodeFromString = (message) => {
    if (typeof message !== "string") return null;
    if (!message.includes("```")) return null;
    return message.split("```");
  };

  const isCodeBlock = (str) => {
    return typeof str === "string" && /[\[\]{}=;#]/.test(str);
  };

  const messageBlocks = extractCodeFromString(content);

  return (
    <>
      {role === 'ai' ? (
        <div className='flex mx-1 my-2 gap-2' ref={scrollRef}>
          <img src={phoenix} alt="ai" className='h-9 w-9 text-center mt-2 outline outline-[#00ff31] rounded-full' />
          
          <div className="p-2 flex text-black bg-[#00ff31] rounded-2xl flex-col w-full">
            <div style={{ alignSelf: 'flex-start' }} className="mt-2"></div>

            {messageBlocks ? (
              messageBlocks.map((block, index) =>
                isCodeBlock(block) ? (
                  <SyntaxHighlighter key={index} style={coldarkDark} language="javascript">
                    {block}
                  </SyntaxHighlighter>
                ) : (
                  <div key={index} className="w-full flex items-center font-mono">
                    {block}
                  </div>
                )
              )
            ) : (
              <div className="w-full flex items-center font-mono pb-1">{content}</div>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-1 flex gap-2 my-2" ref={scrollRef}>
          <div className='h-9 w-9 text-2xl text-center pt-1 outline outline-green-800 rounded-full mt-1'>{firstLetter}</div>
          <div className="bg-green-800 p-2 pb-3 rounded-2xl w-full flex items-center font-sans">{content}</div>
        </div>
      )}
    </>
  );
}
