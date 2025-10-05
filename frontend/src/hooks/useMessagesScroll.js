import { useParams } from 'react-router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function useMessagesScroll(messages) {
  const [stickToBottom, setStickToBottom] = useState(true);
  const containerRef = useRef(null);

  const { chatId } = useParams();

  function scrollToBottom(instant = false) {
    const el = containerRef.current;

    if (!el) return;

    const behavior = instant ? 'auto' : 'smooth';
    el.scrollTo({ top: el.scrollHeight, behavior });
  }

  useLayoutEffect(() => {
    scrollToBottom(true);
  }, [chatId]);

  useEffect(() => {
    if (!messages?.length) return;
    if (stickToBottom) scrollToBottom(false);
  }, [messages?.length, stickToBottom]);

  function onScroll() {
    const el = containerRef.current;
    if (!el) return;
    const threshold = 40;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
    setStickToBottom(atBottom);
  }

  return { onScroll, containerRef };
}
