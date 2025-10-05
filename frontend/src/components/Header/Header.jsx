import './header.css';
import Button from '../Button';
import LogoutOutlinedIcon from '../../assets/svg-icons/LogoutOutlinedIcon';
import logout from '../../services/auth/logout';
import useAuthContext from '../../hooks/useAuthContext';

export default function Header() {
  const { setUser } = useAuthContext();

  function handleLogout() {
    logout();
    setUser(null);
  }

  return (
    <header className="header">
      <div className="header_container">
        <h2 className="header_title">Chat</h2>
        <Button
          onClick={handleLogout}
          clsName="header_button"
          icon={<LogoutOutlinedIcon size="20px" />}
        >
          Log out
        </Button>
      </div>
    </header>
  );
}
