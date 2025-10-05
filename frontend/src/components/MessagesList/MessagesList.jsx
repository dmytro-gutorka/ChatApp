import useMessages from "../../hooks/useMessages";

export default function MessagesList() {

    const {data: messages, isSuccess} = useMessages()

    if (!isSuccess) return <div>Loading...</div>

    console.log(messages)

    return (
        <div>Messages list</div>
    )
}