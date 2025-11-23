import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Pick any theme you like:
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
// You can also try dracula, atom-dark, vsc-dark-plus, etc.

const Answers = ({ ans }) => {
  const renderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="text-black dark:text-gray-400">
      <ReactMarkdown components={renderer}>{ans}</ReactMarkdown>
    </div>
  );
};

export default Answers;