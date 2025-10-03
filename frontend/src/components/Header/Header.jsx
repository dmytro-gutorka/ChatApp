import './header.css'
import Button from "../Button";


export default function Header() {
    return (
        <header>
            <div className="header_container">
                <h2 className="header_title">Chat</h2>
                <Button clName="header_button">Log out</Button>
            </div>

        </header>
    )
}