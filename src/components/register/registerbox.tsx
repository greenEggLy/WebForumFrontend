import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import Logo from "../../assets/logos/biglogo.png";
import color from "../../constants/color.ts";
import {SignupService } from "../../service/LoginService.ts";
import {useNavigate} from "react-router-dom";

const RegisterForm: React.FC = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [finish, setFinish] = useState(false);
	// const getToken = async () => {
	//     return await AsyncStorage.getItem("token");
	// };
	useEffect(() => {
		setFinish(true)
	}, []);


	const handleRegister = async () => {
		// const username = form.getFieldValue(["username"]);
		const password = form.getFieldValue(["password"]);
		const password_conf = form.getFieldValue(["password_conf"]);
		if (!(password === password_conf)) {
			message.error("请输入相同密码");
		}
		const username = form.getFieldValue(["username"]);
		const email = form.getFieldValue(["email"]);
		const location = form.getFieldValue(["address"]);
		const response = await SignupService(username,password,email,location);
		console.log(response
		);
		if (!response.ok) {
			message.error(response.statusText)
			return;
		}
		else {
			message.success("注册成功");
			navigate('/login');
		}
	};

	if (!finish) return (
		<a>waiting......</a>
	);
	return (
		<div style={{margin: '1rem'}}>
			<Form form={form} initialValues={{remember: true}} onSubmitCapture={handleRegister} className={"login_form"}>
				<h1 style={{textAlign: "center", color: color.dgrayblue}}>注册用户</h1>
				<Form.Item name="username" rules={[{required: true, message: 'Please input your username!'}]}>
					<Input style={{width:'100%'}}placeholder="用户名"/>
				</Form.Item>
				<Form.Item name="password" rules={[{required: true, message: 'Please input your password!'}]}>
					<Input style={{width:'100%'}}type="password" placeholder="密码"/>
				</Form.Item>
				<Form.Item name="password_conf" rules={[{required: true, message: 'Please confirm your password!'}]}>
					<Input style={{width:'100%'}}type="password" name="password_conf" placeholder="重复密码"/>
				</Form.Item>
				<Form.Item name="email" rules={[{required: true, message: 'Please input you email!'}]}>
					<Input style={{width:'100%'}}type="email" placeholder="邮箱"/>
				</Form.Item>
				<Form.Item name="address">
					<Input style={{width:'100%'}}placeholder="请输入你的地址"/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button"
							style={{backgroundColor: color.dgrayblue, width: '100%'}}>
						注册用户
					</Button>
				</Form.Item>
			</Form>
		</div>

	);
};
const RegisterBox: React.FC = () => {
	return (
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
				<div>
					<RegisterForm/>
				</div>
			</div>
		</div>


	)
}
export default RegisterBox;
