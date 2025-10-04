import useMessages from "../../hooks/useMessages";

export default function MessagesList() {

    const {data, isSuccess} = useMessages()
    if (!isSuccess) return <div>Loading...</div>

    console.log(data)

    return (
        <div>Messages list</div>
    )
}