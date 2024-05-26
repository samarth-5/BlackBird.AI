import React, { useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatItem({ role, content, firstLetter }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat item component
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [content]);

  const extractCodeFromString = (message) => {
    if (message.includes('```')) {
      const blocks = message.split('```');
      return blocks;
    }
    return null;
  };

  const isCodeBlock = (str) => {
    // Check if the string contains characters commonly found in code
    return /[\[\]{}=;#]/.test(str);
  };

  const messageBlocks = extractCodeFromString(content);

  return (
    <>
      {role === 'assistant' ? (
        <div className="p-2 flex gap-2 my-2 bg-[#07073d] rounded">
          <div style={{ alignSelf: 'flex-start' }} className="mt-2" ref={scrollRef}></div>
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
            <div className="w-full flex items-center font-mono">{content}</div>
          )}
        </div>
      ) : (
        <div className="p-2 flex gap-2 my-2 bg-[#13136e] rounded" ref={scrollRef}>
          <div className="w-full flex items-center font-sans">{content}</div>
        </div>
      )}
    </>
  );
}
