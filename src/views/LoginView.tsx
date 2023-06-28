import Loginbox from "../components/login/loginbox.tsx";
import color from "../constants/color.ts";
export const LoginView = () => {
  return <div style={{backgroundColor:color.lgray,height:"100vh",alignItems:"center"}}>
        <Loginbox/></div>;
};
