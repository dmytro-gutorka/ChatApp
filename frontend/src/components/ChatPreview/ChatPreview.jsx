import './chatPreview.css'
import Button from "../Button";
import EditPencilOutlinedIcon from "../../assets/svgIcons/EditPencilOutlinedIcon";
import TrashBinOutlinedIcon from "../../assets/svgIcons/TrashBinOutlinedIcon";

export default function ChatPreview({ data }) {
    const fullName = data.contact.firstName + ' ' + data.contact.lastName


    return (
        <li className="chat-preview" key={data?._id}>
            <div className="chat-preview_outer-container">

                <div className="chat-preview_container">
                    <img className="chat-preview_user-icon" src='/./user-chat-icon.png' alt="user avatar" width='42px' height='38px'/>
                    <div  className="chat-preview_user-info">
                        <p className="chat-preview_user-name">
                            {fullName}
                        </p>
                        <p className="chat-preview_last-message">
                            {data.lastMessageAt && data.lastMessageAt || 'no messages yet'}
                        </p>
                    </div>
                </div>

                <div className="chat-preview_buttons-container">
                    <Button clsName="chat-preview_edit-button">
                        <EditPencilOutlinedIcon size="14px"/>
                    </Button>
                    <Button clsName="chat-preview_delete-button">
                        <TrashBinOutlinedIcon size="14px"/>
                    </Button>
                </div>

            </div>
        </li>
    )
}