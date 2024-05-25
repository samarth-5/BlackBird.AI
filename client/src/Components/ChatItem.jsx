import React, { useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatItem({ role, content, firstLetter }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [content]);

  const extractCodeFromString = (message) => {
    if (message.includes("```")) {
      const blocks = message.split("```");
      return blocks.filter(block => block.trim() !== ""); // filter out empty blocks
    }
    return [message]; // return the message itself if no code blocks
  };

  const isCodeBlock = (str) => {
    return /[=;[\]{}#//]/.test(str);
  };

  const messageBlocks = extractCodeFromString(content);

  return (
    <div className='mx-1'>
      {role === 'ai' ? (
        <div className='p-2 flex gap-2 my-2 bg-[#07073d] rounded'>
          <div style={{ alignSelf: 'flex-start' }} className='mt-2' ref={scrollRef}></div>
          {messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter key={index} style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <div key={index} className='w-full flex items-center font-mono'>{block}</div>
            )
          )}
        </div>
      ) : (
        <div className='p-2 flex gap-2 my-2 bg-slate-600 text-white rounded' ref={scrollRef}>
          <div className='w-full flex items-center font-sans'>{content}</div>
        </div>
      )}
    </div>
  );
}
