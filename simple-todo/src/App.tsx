import './App.css'
import { Login } from './components/login';
import { Todo } from './components/todo';
import { userDB } from './db';
import { useGun, useGunStore } from './hooks/use-gun-store';


const login = () => {
  userDB.auth('test-user', 'test-password', (ack) => {
    console.log(ack);
  })
}

function App() {

  useGun()

  const user = useGunStore(state => state.user)

  return (
    <div>
      {user ? (<Todo />) : (<Login />)}
    </div>
  )
}

export default App
