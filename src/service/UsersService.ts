import { getRequestInit, root } from "./global.ts";

export const Users_UserFilter = async (tab: string) => {
  const url = `${root}/users?tab=${tab}`;
  return await fetch(url, getRequestInit());
};
