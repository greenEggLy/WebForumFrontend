import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import color from "../../constants/color.ts";
import Logo from '../../assets/logos/biglogo.png';
import {history} from "../../service/History.ts";
import {useNavigate} from "react-router-dom";

const LoginForm: React.FC = () => {
	const [form] = Form.useForm();
	const [remember, setRemember] = useState(false);
	const [finish, setFinish] = useState(false);
	const navigate = useNavigate();
	// const getToken = async () => {
	//     return await AsyncStorage.getItem("token");
	// };
	useEffect(() => {
		const autologin = async () => {
			// if (await getToken()) {
			//     setFinish(true);
			//     navigation.navigate("Home");
			// }
			history.push('/');
			setFinish(true);
		};
		autologin();
	}, []);


	const handleLogin = async () => {
		// const username = form.getFieldValue(["username"]);
		// const password = form.getFieldValue(["password"]);
		// login_user(username, password).then(async (res) => {
		//     if (res.access) {
		//         // console.log(res.access);
		//         await AsyncStorage.multiSet([
		//             ["token", res.access],
		//             ["refresh", res.refresh],
		//         ]).then(navigation.navigate("Home"));
		//         // navigation.navigate("Home");
		//     } else {
		//         // 处理未成功获取到token的情况
		//         setPassword("");
		//     }
		// });
	};
	const doReg = () => {
		navigate('/sign-up')
	};
	const findAccount = () => {
	};
	if (!finish) return (
		<a>waiting......</a>
	);
	return (
		<div className={'login-card'}
			 style={{alignItems: "center", marginTop: '10%', marginLeft: '5%', marginRight: '5%'}}>
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
					<a style={{fontSize: 14, textDecorationLine: "underline", alignSelf: "flex-start", marginRight: 5}}
					   onClick={doReg}>
						免费注册
					</a>

					<a style={{fontSize: 14, textDecorationLine: "underline", alignSelf: "flex-end"}}
					   onClick={findAccount}>
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
