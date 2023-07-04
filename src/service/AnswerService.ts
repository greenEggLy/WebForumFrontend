import {getRequestInit, postRequestInit, root} from "./global.ts";
export const Ans_PostAnswer = async (
  content:string,
  questionId:string
) => {
  const url = `${root}/answer/add`
  const json = {
    content: content,
    questionId: questionId
  }
  const body = JSON.stringify(json)
  return await fetch(url, postRequestInit(body));
}