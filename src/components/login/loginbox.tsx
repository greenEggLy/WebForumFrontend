import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Input, message} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import color from "../../constants/color.ts";
import Logo from '../../assets/logos/biglogo.png';
import {useNavigate} from "react-router-dom";
import {GetToken, LoginService} from "../../service/LoginService.ts";
import { ILoginResponse, IUserCard } from "../../Interface.ts";
import { User_GetMyInfo } from "../../service/UserService.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import { login } from "../../features/user/userSlice.ts";
import { isLogin } from "../../utils/login.ts";

const LoginForm: React.FC = () => {
	const [form] = Form.useForm();
	const [remember, setRemember] = useState(false);
	const userInfo = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		const autologin = async () => {
			const token = await GetToken();
			if (!isLogin()) return;
			navigate('/questions')
		};
		autologin().catch(err => console.error(err));
	}, []);

	const handleLogin = async () => {
		const username = form.getFieldValue(["username"]);
		const password = form.getFieldValue(["password"]);
		const response = await LoginService(username, password)
		if (!response.ok) {
			message.error(response.statusText)
			return;
		}
		const json: ILoginResponse = await response.json();
		localStorage.setItem('accessToken', json.accessToken)
		localStorage.setItem('refreshToken', json.refreshToken)
		localStorage.setItem('expire', json.expire)
		await setUserInfo()
		navigate('/questions')
	};

	const setUserInfo = async () => {
		const response = await User_GetMyInfo();
		const json:IUserCard = await response.json();
		const username = json.username;
		const avatar = json.avatar;
		dispatch(login({username, avatar}));
	}

	return (
		<div className={'login-card'} style={
			{alignItems: "center", marginTop: '10%', marginLeft: '5%', marginRight: '5%'}
		}>
			<h1 style={{textAlign: "center", color: color.dgrayblue}}>登录</h1>
			<Form form={form} onSubmitCapture={handleLogin} style={{marginBottom: '15%'}}>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
						},
					]}
					style={{fontSize: '20px'}}
				>
					<Input prefix={<UserOutlined/>} placeholder="username"/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
						},
					]}
					style={{fontSize: '20px'}}
				>
					<Input.Password prefix={<LockOutlined/>} placeholder="password"/>
				</Form.Item>
				<Form.Item
					style={{display: "flex"}}
					name="rememberMe"
					valuePropName="checked"
				>
					<Checkbox onChange={() => setRemember(!remember)}>记住密码</Checkbox>
				</Form.Item>
				<Form.Item>
					<Button className={"submit"} type="primary" htmlType="submit"
							style={{backgroundColor: color.dgrayblue, width: '100%'}}>
						登录
					</Button>
				</Form.Item>

				<Form.Item
				>
					<a
						style={{fontSize: 14, textDecorationLine: "underline", alignSelf: "flex-start", marginRight: 5}}
						onClick={() => navigate('sign-up')}>
						免费注册
					</a>

					<a
						style={{fontSize: 14, textDecorationLine: "underline", alignSelf: "flex-end"}}
						onClick={() => alert("你先别急")}>
						找回密码
					</a>
				</Form.Item>

			</Form>
		</div>


	);
};
const LoginBox: React.FC = () => {
	return (
		// <Row justify="center" >
		//     <Col span={8} ><img src={Logo} style={{
		//         width: '104%',
		//         height: '100%',
		//         objectFit:"fill",
		//         borderTopLeftRadius:'30px',borderBottomLeftRadius:'30px'
		//     }}/></Col>
		//     <Col span={7} ><Card style={{borderTopLeftRadius:'0px',borderBottomLeftRadius:'0px',borderTopRightRadius:'30px',borderBottomRightRadius:'30px'}}><LoginForm/></Card></Col>
		// </Row>
		<div style={{width: "100%", height: "100%"}}>
			<div style={{float: 'left', width: '50%', height: '100%'}}>
				<img src={Logo} style={{
					width: '104%',
					height: '100%',
					objectFit: "fill",
					borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px'
				}}/>
			</div>
			<div style={{float: 'right', width: '50%', height: '100%', backgroundColor: 'white'}}>
				<div><LoginForm/></div>
			</div>
		</div>

	)
}
export default LoginBox;
