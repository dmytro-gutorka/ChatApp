import './chat-overlay-header.css'

export default function ChatOverlayHeader() {
    return (
        <div className="overlay-header_container">
            <div className="overlay-header_content">
                <img className="overlay-header_user-avatar" src="/user-chat-icon.png" alt="user avatar"/>

                <div className="overlay-header_user-info">
                <p className="overlay-header_chat-name">Dima Gutorka</p>
                <p className="overlay-header_status">Active now</p>

                </div>
            </div>
        </div>
    )
}