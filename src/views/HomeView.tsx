import { CodeRunning, ParseMarkdown } from "../service/MarkdownService.ts";
import { useEffect, useState } from "react";

export const HomeView = () => {
  const [show, setShow] = useState<string>("");
  useEffect(() => {
    CodeRunning();
  }, [show]);
  return (
    <div>
      <button
        onClick={() => {
          let s = ParseMarkdown(
            document.querySelector("#markdown-content")?.textContent
          );
          if (!s) return;
          setShow(s);
        }}
      >
        {" "}
        hahaha{" "}
      </button>
      <textarea
        onChange={(e) => {
          let s = ParseMarkdown(e.target.value);
          if (!s) return;
          // let source = new DOMParser().parseFromString(s,'text/html');
          setShow(s);
        }}
      ></textarea>
      <div dangerouslySetInnerHTML={{ __html: show }}></div>
    </div>
  );
};
