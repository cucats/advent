import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LegacyRef } from "react";

export const MarkdownRenderer = ({ children }: { children: string }) => {
  return (
    <Markdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      className="prose max-w-none text-zinc-300 prose-strong:text-foreground prose-code:text-foreground"
      components={{
        code(props) {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              ref={rest.ref as LegacyRef<SyntaxHighlighter> | undefined}
              PreTag="div"
              language={match[1]}
              style={atomDark}
              customStyle={{ fontSize: "0.8rem" }}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {children
        .replace(/\\n/gi, "\n")
        .replace(/\\`/gi, "`")}
    </Markdown>
  );
};
