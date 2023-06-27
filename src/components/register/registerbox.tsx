import React, {useEffect, useState} from 'react';
import {Form, Input, Button, message, Row, Col, Card} from 'antd';
import Logo from "../../assets/logos/biglogo.png";
import color from "../../constants/color.ts";
const RegisterForm : React.FC = () => {
    const [form] = Form.useForm();
    const [finish,setFinish] = useState(false);
    // const getToken = async () => {
    //     return await AsyncStorage.getItem("token");
    // };
    useEffect(() => {
        const autologin = async () => {
            // if (await getToken()) {
            //     setFinish(true);
            // navigation.navigate("Home");
            // }
            setFinish(true);
        };
        autologin();
    }, []);


    const handleLogin = async () => {
        // const username = form.getFieldValue(["username"]);
        const password = form.getFieldValue(["password"]);
        const password_conf = form.getFieldValue(["password_conf"]);
        if (!password===password_conf) {
            message.error("请输入相同密码");
        }
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

    if(!finish)return(
        <a>waiting......</a>
    );
    return (

        <Form form={form} initialValues={{ remember: true }} onSubmitCapture={handleLogin} className={"login_form"}>
                <h1 style={{textAlign:"center",color:color.dgrayblue}}>注册用户</h1>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="用户名" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input type="password" placeholder="密码"  />
                </Form.Item>
                <Form.Item name="password_conf" rules={[{ required: true, message: 'Please confirm your password!' }]} >
                    <Input type="password" name = "password_conf" placeholder = "重复密码" />
                </Form.Item>
                <Form.Item name="tel" rules={[{ required: true, message: 'Please input your phonenumber!' }]}>
                    <Input  placeholder="请输入你的手机号码"  />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Please input you email!' }]}>
                    <Input type="email" placeholder = "邮箱" />
                </Form.Item>
                <Form.Item name="address">
                    <Input  placeholder="请输入你的地址"  />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{backgroundColor:color.dgrayblue,width:'100%'}}>
                        注册用户
                    </Button>
                </Form.Item>
            </Form>



    );
};
const RegisterBox:React.FC = () =>{
    return(
        <Row justify="center">
            <Col span={8} ><img src={Logo} style={{
                width: '104%',
                height: '100%',
                objectFit:"fill",
                borderTopLeftRadius:'30px',borderBottomLeftRadius:'30px'
            }}/></Col>
            <Col span={7} ><Card style={{borderTopLeftRadius:'0px',borderBottomLeftRadius:'0px',borderTopRightRadius:'30px',borderBottomRightRadius:'30px'}}><RegisterForm/></Card></Col>
        </Row>


    )
}
export default RegisterBox;