import { ITag } from "../Interface.ts";
import { getRequestInit, postRequestInit, root } from "./global.ts";
import * as dayjs from "dayjs";

export const Que_PostQuestion = async (
  title: string,
  content: string,
  tags: ITag[]
) => {
  const url = `${root}/question/post-new-question`;
  const json = {
    title: title,
    content: content,
    create_time: dayjs(new Date()).toJSON(),
    last_edit: dayjs(new Date()).toJSON(),
    tags: tags,
  };
  const body = JSON.stringify(json);
  return await fetch(url, postRequestInit(body));
};

export const Que_GetQuestion = async (id: string) => {
  const url = `${root}/question?id=${id}`;
  return await fetch(url, getRequestInit());
};
