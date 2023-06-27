import {ITag} from "../Interface.ts";
import {IUserCard} from "../Interface.ts";
const tag1:ITag={
    id:1,
    content:"Coding",
    description:"计算机"
}
const tag2:ITag={
    id:2,
    content:"计算机",
    description:"计算机"
}
const tag3:ITag={
    id:3,
    content:"软件",
    description:"计算机"
}
const User1:IUserCard={
    id:1,
    avatar:"https://tse2-mm.cn.bing.net/th/id/OIP-C.PcOT-lN3-IAT3szcXiXvQgAAAA?w=186&h=186&c=7&r=0&o=5&dpr=2&pid=1.7",
    username:"沈备军",
    location: "中国上海",
    followers_number: 233,
    profile: "一名软件学院老师",
    fields: [tag1,tag2,tag3]
}
const User2:IUserCard={
    id:2,
    avatar:"https://tse2-mm.cn.bing.net/th/id/OIP-C.PcOT-lN3-IAT3szcXiXvQgAAAA?w=186&h=186&c=7&r=0&o=5&dpr=2&pid=1.7",
    username:"沈备军",
    location: "中国上海",
    followers_number: 233,
    profile: "一名软件学院老师",
    fields: [tag1,tag2,tag3]
}
export const UserList:IUserCard[]=[User1,User2,User1,User2,User1,User2,User1,User2];