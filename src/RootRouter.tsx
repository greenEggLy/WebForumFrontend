import {Route, Routes} from "react-router-dom";
import {LoginView} from "./views/LoginView.tsx";
import {HomeView} from "./views/HomeView.tsx";
import {QuestionsView} from "./views/QuestionsView.tsx";
import {TagsView} from "./views/TagsView.tsx";
import {UsersView} from "./views/UsersView.tsx";
import {UserInfoView} from "./views/UserInfoView.tsx";
import {SignupView} from "./views/SignupView.tsx";
import {AskQuestionView} from "./views/AskQuestionView.tsx";
import {TagQuestionsView} from "./views/TagQuestionsView.tsx";

export const RootRouter = () => {
	return (
		<Routes>
			<Route index path={"/login"} element={<LoginView/>}/>
			<Route element={<SignupView/>} path={"/sign-up"}/>
			<Route
				path={"/"}
				element={<HomeView/>}
				children={[
					<Route element={<QuestionsView/>} path={"/questions"}>
						<Route element={<TagQuestionsView/>} path={"/tag/:content"}></Route>
					</Route>,
					<Route element={<TagsView/>} path={"/tags"}/>,
					<Route element={<UsersView/>} path={"/users"}/>,
					<Route element={<UserInfoView/>} path={"/user/:userid"}/>,
				]}
			/>
			<Route element={<AskQuestionView/>} path={"/create-question"}/>
		</Routes>
	);
};
