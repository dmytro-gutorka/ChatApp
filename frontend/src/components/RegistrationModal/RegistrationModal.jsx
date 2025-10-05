import './registration-modal.css';
import Button from '../Button';
import GoogleColorfulIcon from '../../assets/svg-icons/GoogleColorfulIcon';
import loginGoogle from '../../services/auth/loginGoogle';
import useAuthContext from '../../hooks/useAuthContext';
import loginFacebook from '../../services/auth/loginFacebook';
import FacebookColorfulIcon from "../../assets/svg-icons/FacebookColorfulIcon";

export default function RegistrationModal() {
  const { isLoading } = useAuthContext();

  return (
    <>
      {!isLoading && (
        <div className="registration-modal_container">
          <div className="registration-modal_content">
            <p className="registration-modal_header">Welcome Back</p>
            <p className="registration-modal_subheader">Sign in to continue</p>
            <div className="registration-modal_buttons">
              <Button
                onClick={loginGoogle}
                clsName="registration-modal_button"
                icon={<GoogleColorfulIcon size="16px" />}
              >
                Login with Google
              </Button>

              <Button
                onClick={loginFacebook}
                clsName="registration-modal_button"
                icon={<FacebookColorfulIcon size="16px" />}
              >
                Login with Facebook
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
