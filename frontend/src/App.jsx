import './App.css'

function App() {

    async function handleClick() {
        window.location.href = 'http://localhost:3000/api/v1/auth/google'
    }

  return (
    <>
        <div>
            <button onClick={handleClick}>Google</button>
        </div>

    </>
  )
}

export default App
