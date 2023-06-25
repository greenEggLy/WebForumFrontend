import { IQuestion, IUser } from "../Interface.ts";

export const EmptyUser: IUser = {
  id: 0,
  username: "",
  email: "",
  create_time: new Date(),
  last_login: new Date(),
  location: "",
  profile: "",
  avatar: "",
  is_admin: false,
  is_banned: false,
  fields: [],
  like_questions: [],
  like_answer: [],
  star_questions: [],
  questions: [],
  answers: [],
  followers: [],
  following: [],
};

export const EmptyQuestion: IQuestion = {
  id: 0,
  title: "",
  content: "",
  create_time: new Date(),
  last_edit: new Date(),
  browse_time: 0,
  user: EmptyUser,
  star_users: [],
  like_users: [],
  answers: [],
  tags: [],
};
