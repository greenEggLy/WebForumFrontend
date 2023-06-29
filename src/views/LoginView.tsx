import Loginbox from "../components/login/loginbox.tsx";
import './LoginView.css'
export const LoginView = () => {
  return (
    <div className={'login-view-container'}>
      <div className={'login-card-container'}>
          <Loginbox/>
      </div>
    </div>
  );
};
