import Layout from '../components/Layout'
import { useSession } from '../contexts/sessionContext'

export default function Home() {
  const [state, send] = useSession()

  // console.log(`State: `, state.context)

  return (
    <Layout title={"Smite Stats | Home"}> 
      <h1>
        Hello World 
      </h1>
    </Layout>
  )
}
