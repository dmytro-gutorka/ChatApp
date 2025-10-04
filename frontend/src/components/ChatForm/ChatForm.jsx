import './chatForm.css'

import {apiPaths} from "../../config/apiPaths";
import {axiosInstance} from "../../config/axiosInstance";
import Button from "../Button";


export default function ChatForm() {

    async function handleForm(e) {
        const url = apiPaths.chats.createChat()

        e.preventDefault()
        const formData = new FormData(e.target)
        const formValues = Object.fromEntries(formData.entries())

        await axiosInstance.post(url, formValues)
    }


    return (
        <>
        <form className="chat-form" onSubmit={handleForm} id="chat-form">
                <label className="chat-form_label" htmlFor="firstName">First name:</label>
                <input className="chat-form_input" type="text" name="firstName" placeholder="Enter first name"/>

                <label className="chat-form_label" htmlFor="lastName">Last name:</label>
                <input className="chat-form_input" type="text" name="lastName"  placeholder="Enter last name"/>

            <Button clsName="button--contained">Create chat</Button>
        </form>
        </>
    )
}