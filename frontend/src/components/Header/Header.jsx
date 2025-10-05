import './header.css'
import Button from "../Button";
import LogoutOutlinedIcon from "../../assets/svgIcons/LogoutOutlinedIcon";


export default function Header() {

    return (
        <header className="header">
            <div className="header_container">
                <h2 className="header_title">Chat</h2>
                <Button clsName="header_button" icon={<LogoutOutlinedIcon size="20px"/>} >Log out</Button>
            </div>
        </header>
    )
}