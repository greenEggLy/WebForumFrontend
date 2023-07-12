import {Button, Form, Input, message, Upload} from "antd";
import {MarkDownEditor} from "../question/question-create/MarkDownEditor.tsx";
import React, {useEffect, useState} from "react";
import color from "../../constants/color.ts";
import {User_changeInfo, User_GetUser} from "../../service/UserService.ts";
import {IUser} from "../../Interface.ts";
import {EmptyUser} from "../../data/EmptyObject.ts";
import {useParams} from "react-router-dom";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons"
import {root} from "../../service/global.ts";
import "./InformationEdit.css"


export const AvatarUploader = () => {
	const beforeUpload = (file: any) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	};
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const handleChange = (info: any) => {
		console.log(info);
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.

			setLoading(false);
			if (info.file.response.code === 201) {
				// 把返回的图像地址设置给 imageUrl
				setImageUrl(info.file.response.data.imageUrl) // 取决于服务端返回的字段名
			}
		}

	}
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined/> : <PlusOutlined/>}
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);
	return (
		<>
			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				action={`${root}/file`}
				beforeUpload={beforeUpload}
				onChange={handleChange}
				method={"POST"}
			>
				{imageUrl ? (
					<img
						src={imageUrl}
						alt="avatar"
						style={{
							width: '100%',
						}}
					/>
				) : (
					uploadButton
				)}
			</Upload>
		</>
	);
};
export const InformationEdit = () => {
	const params = useParams();
	const [form] = Form.useForm();
	const [avatar, setAvatar] = useState('');
	const [about, setAbout] = useState('');
	const [user, setUser] = useState<IUser>(EmptyUser);
	useEffect(() => {
		const getUserInfo = async (id: string) => {
			const response = await User_GetUser(id);
			if (!response.ok) return;
			setUser(await response.json())
			form.setFieldsValue(
				{
					username: user.username,
					about: user.about,
					location: user.location,
					avatar: user.avatar,
					email: user.email

				}
			);
		};
		if (!params.userid) return;
		getUserInfo(params.userid).catch((err) => console.error(err));
	}, [params.userid]);
	const handleEdit = async () => {
		const password = form.getFieldValue(["password"]);
		const password_conf = form.getFieldValue(["password_conf"]);
		if (!(password === password_conf)) {
			message.error("请输入相同密码");
			return;
		}
		const username = form.getFieldValue(["username"]);
		const email = form.getFieldValue(["email"]);
		const location = form.getFieldValue(["address"]);
		console.log(about);
		const response = await User_changeInfo(
			password, username, email, location, about, "http://121.37.158.48:8000/images/a0cdca86-cb56-4bce-bd94-553aba8af1ab_eae47258-0b77-4609-b55a-1de551c4f1ad.jpg"
		);
		console.log(response
		);
	};
	const uploadButton = (
		<div>
			<PlusOutlined/>
			<div style={{marginTop: 8}}>Upload</div>
		</div>
	);
	return (
		<div>
			<Form form={form} initialValues={{remember: true}} onSubmitCapture={handleEdit} className={"edit_form"}>
				<Form.Item>
					<AvatarUploader/>
				</Form.Item>
				<Form.Item label="用户名" name="username" rules={
					[
						{required: true, message: 'Please input your username!'},
						{min: 4, message: '用户名至少4位'},
						{max: 12, message: '用户名最多12位'},
					]
				}>
					<Input style={{width: '80%'}}/>
				</Form.Item>
				<Form.Item label="密码" name="password" rules={
					[
						{required: true, message: 'Please input your password!'},
						{min: 6, message: '密码至少6位'},
						{max: 18, message: '密码最多18位'},
					]
				}>
					<Input style={{width: '80%'}} type="password" placeholder="密码"/>
				</Form.Item>
				<Form.Item
					label="确认密码"
					name="password_conf"
					rules={[{required: true, message: 'Please confirm your password!'}]}>
					<Input style={{width: '80%'}} type="password" name="password_conf" placeholder="重复密码"/>
				</Form.Item>
				<Form.Item label="邮箱" name="email" rules={[{required: true, message: 'Please input you email!'}]}>
					<Input style={{width: '80%'}} type="email" placeholder="邮箱"/>
				</Form.Item>
				<Form.Item label="地址" name="address">
					<Input style={{width: '80%'}} placeholder="请输入你的地址"/>
				</Form.Item>
				<Form.Item label="个人介绍" name="about">
					<div className={"markdown-editor"}>
						<MarkDownEditor value={about} setValue={setAbout}/>
					</div>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button"
							style={{backgroundColor: color.dgrayblue, width: '100%'}}>
						保存信息
					</Button>
				</Form.Item>
			</Form>

		</div>

	);
}
export default InformationEdit;
