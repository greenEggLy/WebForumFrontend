import React, { useEffect, useState} from 'react';
import {Form, Input, Button, Checkbox,Col,Row,Card} from 'antd';
import {UserOutlined,LockOutlined} from "@ant-design/icons";
import color from "../../constants/color.ts";
import Logo from '../../assets/logos/biglogo.png';
import {history} from "../../service/History.ts";
const LoginForm : React.FC = () => {
    const [form] = Form.useForm();
    const [remember, setRemember] = useState(false);
    const [finish,setFinish] = useState(false);
    // const getToken = async () => {
    //     return await AsyncStorage.getItem("token");
    // };
    useEffect(() => {
        const autologin = async () => {
            // if (await getToken()) {
            //     setFinish(true);
            //     navigation.navigate("Home");
            // }
            history.push('/home');
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
        // navigation.navigate("/sign-up");
    };
   const findAccount = () => {};
    if(!finish)return(
        <a>waiting......</a>
    );
    return (
        <div style={{alignItems:"center",marginTop:'10%',marginLeft:'5%'}} >
        <h1 style={{textAlign:"center",color:color.dgrayblue}}>登录</h1>
        <Form form={form} onSubmitCapture={handleLogin} style={{marginBottom:'15%'}}>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                    },
                ]}
                style={{fontSize:'20px'}}
            >
                <Input prefix={<UserOutlined />} placeholder="username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                    },
                ]}
                style={{fontSize:'20px'}}
            >
                <Input.Password prefix = {<LockOutlined />} placeholder="password" />
            </Form.Item>
            <Form.Item
                style={{ display: "flex" }}
                name="rememberMe"
                valuePropName="checked"
            >
                <Checkbox onChange={() => setRemember(!remember)}>记住密码</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button className={"submit"} type="primary" htmlType="submit" style={{backgroundColor:color.dgrayblue,width:'100%'}}>
                    登录
                </Button>
            </Form.Item>

            <Form.Item
            >
                <a style={{fontSize:14,textDecorationLine: "underline",alignSelf:"flex-start",marginRight:5  }} onClick={doReg}>
                    免费注册
                </a>

                <a style={{fontSize:14,textDecorationLine: "underline",alignSelf:"flex-end"}} onClick={findAccount}>
                    找回密码
                </a>
            </Form.Item>

        </Form>
            </div>


    );
};
const LoginBox:React.FC = () =>{
    return(
        <Row justify="center" style={{paddingTop:"20vh"}}>
            <Col span={8} ><img src={Logo} style={{
                width: '104%',
                height: '100%',
                objectFit:"fill",
                borderTopLeftRadius:'30px',borderBottomLeftRadius:'30px'
            }}/></Col>
            <Col span={7} ><Card style={{borderTopLeftRadius:'0px',borderBottomLeftRadius:'0px',borderTopRightRadius:'30px',borderBottomRightRadius:'30px'}}><LoginForm/></Card></Col>
        </Row>


    )
}
export default LoginBox;