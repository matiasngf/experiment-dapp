import { useState } from "react"
import { useGunStore } from "../hooks/use-gun-store"
import { userDB } from "../db"
import { clx } from "../utils/clx"

const inputStyles = "w-full border border-gray-300 rounded-md p-2"
const buttonStyles = "w-full border border-gray-300 rounded-lg p-4 text-lg font-bold"

export const Login = () => {
  const user = useGunStore(s => s.user)

  // form state
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    setIsSending(true)
    setError(null)
    userDB.auth(username, password, (result) => {
      setIsSending(false)
      if('err' in result) {
        setError(result.err)
      } else {
        window.location.reload()
      }
    })
  }

  const handleSignup = () => {
    setIsSending(true)
    setError(null)
    userDB.create(username, password, (result) => {
      if('err' in result) {
        setIsSending(false)
        setError(result.err)
      } else {
        handleLogin()
      }
    })
  }

  return (
    <form className={clx("space-y-8 transition-opacity", isSending && "pointer-events-none opacity-50")}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} required type="text" placeholder="username" className={inputStyles} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="password" className={inputStyles} />
      <button onClick={handleLogin} type="button" disabled={isSending} className={buttonStyles}>Login</button>
      <button onClick={handleSignup} type="button" disabled={isSending} className={buttonStyles}>Sign up</button>
      {error && (
        <div className="text-red-900">
          {error}
        </div>
      )}
    </form>
  )

}