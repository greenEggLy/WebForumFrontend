import "bytemd/dist/index.css";
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import frontmatter from "@bytemd/plugin-frontmatter";
import React from "react";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const MarkDownEditor = ({ value, setValue }: Props) => {
  const plugins = [gfm(), highlight(), frontmatter()];
  return (
    <div style={{ left: 5 }}>
      <Editor
        value={value}
        plugins={plugins}
        mode={"auto"}
        onChange={(text) => setValue(text)}
      />
    </div>
  );
};
