import './App.css'
import {socket} from "./app/sockets";

const prodUrl = 'https://chat-app-gtdb8.sevalla.app'
const devUrl = 'http://localhost:3000'

function App() {

    socket.emit('connection')

    async function handleClick() {
        window.location.href = `${devUrl}/api/v1/auth/google`
    }

    async function handleMessage() {
        const url = `${devUrl}/api/v1/messages/send`
        const response = await fetch(url, { credentials: 'include'})
         return await response.json()
    }

    async function handleLogout() {
        const url = `${devUrl}/api/v1/auth/logout`
        await fetch(url, { method: 'GET', credentials: 'include'})
    }

  return (
    <>
        <div>
            <button onClick={handleClick}>Google</button>
            <button onClick={handleMessage}>message</button>
            <button onClick={handleLogout}>Log out</button>
        </div>
    </>
  )
}

export default App
