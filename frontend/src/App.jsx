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

  return (
    <>
        <div>
            <button onClick={handleClick}>Google</button>
            <button onClick={handleMessage}>message</button>

        </div>
    </>
  )
}

export default App
