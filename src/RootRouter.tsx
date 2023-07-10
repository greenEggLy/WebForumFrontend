import { Navigate, Route, Routes } from "react-router-dom";
import {LoginView} from "./views/LoginView.tsx";
import {HomeView} from "./views/HomeView.tsx";
import {QuestionsView} from "./views/QuestionsView.tsx";
import {TagsView} from "./views/TagsView.tsx";
import {UsersView} from "./views/UsersView.tsx";
import {UserInfoView} from "./views/UserInfoView.tsx";
import {SignupView} from "./views/SignupView.tsx";
import {AskQuestionView} from "./views/AskQuestionView.tsx";
import {QuestionView} from "./views/QuestionView.tsx";

export const RootRouter = () => {
	return (
		<Routes>
			<Route id={"default"} path={"/"} element={<Navigate to={'/questions'} />}/>
			<Route id={"login"} index path={"/login"} element={<LoginView/>}/>
			<Route id={"signup"} element={<SignupView/>} path={"/sign-up"}/>
			<Route
				id={"main"}
				path={"/"}
				element={<HomeView/>}
				children={[
					<Route id={"questions"} element={<QuestionsView/>} path={"/questions"}>
						{/*<Route element={<TagQuestionsView/>} path={"questions/tagged/:content"}></Route>*/}
					</Route>,
					<Route id={'tags'} element={<TagsView/>} path={"/tags"}/>,
					<Route id={'users'} element={<UsersView/>} path={"/users"}/>,
					<Route id={'user'} element={<UserInfoView/>} path={"/user/:userid"}/>,
					<Route id={'question'} element={<QuestionView/>} path={"/question/:quesid"}/>,
				]}
			/>
			<Route id={'create'} element={<AskQuestionView/>} path={"/create-question"}/>
		</Routes>
	);
};
