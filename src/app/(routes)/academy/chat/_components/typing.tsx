import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface TypingEffectProps {
  content: string;
  speed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ content, speed = 1 }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < content.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + content.charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [index, content, speed]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

export default TypingEffect;
