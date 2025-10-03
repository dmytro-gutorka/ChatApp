import './App.css'

function App() {

    async function handleClick() {
        window.location.href = 'http://localhost:3000/api/v1/auth/google'
    }

    async function handleMessage() {
        const url = 'http://localhost:3000/api/v1/messages/send'
        const response = await fetch(url, { credentials: 'include'})
         return await response.json()
    }

    async function handleLogout() {
        const url = 'http://localhost:3000/api/v1/auth/logout'
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
