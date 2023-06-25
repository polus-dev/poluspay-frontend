import LoginAbout from '../../components/pages/login/About';
import LoginForm from '../../components/pages/login/Form';

import './Login.scoped.scss';

const LoginPage: React.FC = () => {
    return (
        <div className="login">
            <div className="login__inner">
                <div className="login__inner-about">
                    <LoginAbout />
                </div>
                <div className="login__inner-form">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
