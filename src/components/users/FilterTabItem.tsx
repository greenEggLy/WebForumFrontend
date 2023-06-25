import { Users_UserFilter } from "../../service/UsersService.ts";
import { message } from "antd";
import { IUserCard } from "../../Interface.ts";
import React from "react";

interface Props {
  tab: string;
  title: string;
  setUsers: React.Dispatch<React.SetStateAction<IUserCard[]>>;
}

export const FilterTabItem = ({ tab, title, setUsers }: Props) => {
  const getUserByTab = async (tab: string) => {
    const response = await Users_UserFilter(tab);
    if (!response.ok) message.error(`get user by ${tab} error!`);
    const json: Promise<IUserCard[]> = response.json();
    setUsers(await json);
  };

  return (
    <div
      className={"filter-tab"}
      onClick={async () => {
        await getUserByTab(tab);
      }}
    >
      {title}
    </div>
  );
};
