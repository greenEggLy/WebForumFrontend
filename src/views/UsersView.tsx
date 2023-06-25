import { IUserCard } from "../Interface.ts";
import { useState } from "react";
import { FilterTabItem } from "../components/users/FilterTabItem.tsx";
import { List } from "antd";
import { UserCardItem } from "../components/users/UserCardItem.tsx";

interface Tabs {
  tab: string;
  title: string;
}

export const UsersView = () => {
  const [users, setUsers] = useState<IUserCard[]>([]);
  const tabs: Tabs[] = [
    { tab: "reputation", title: "Reputation" },
    { tab: "newusers", title: "New Users" },
    { tab: "voters", title: "Voters" },
    { tab: "editors", title: "Editors" },
    { tab: "moderators", title: "Moderators" },
  ];
  return (
    <div>
      <div className={"view-title"}>Users</div>
      <div className="userview-header">
        <div className="inputbox">
          <input
            id="userfilter"
            name="userfilter"
            className="s-input s-input__search h100 wmx3"
            autoComplete="off"
            type="text"
            placeholder="Filter by user"
          >
            <svg
              aria-hidden="true"
              className="s-input-icon s-input-icon__search svg-icon iconSearch"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path>
            </svg>
          </input>
        </div>

        <div className="flex--item ml-auto mb12 h100 d-flex s-btn-group js-filter-btn">
          {tabs.map((tab) => (
            <FilterTabItem
              tab={tab.tab}
              title={tab.title}
              setUsers={setUsers}
            />
          ))}
        </div>
      </div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <UserCardItem user={user} />
          </List.Item>
        )}
      />
    </div>
  );
};
