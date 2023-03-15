import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

// init socket url
const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || ""

export default function Home() {
  const [obList, setOblist] = useState([])

  useEffect(() => {
    // init ws
    const ws = new WebSocket(socketUrl)
    
    // function for ws open
    ws.onopen = () => {
      console.log(`websocekt connection opened`)
      ws.send(`hello server`)
    }

    // update when receive msg from socket server
    ws.onmessage = (event: any) => {
      console.log(`received message: ${event.data}`)

      // handle event data
    }

    // send subscribe request
    ws.send(JSON.stringify({
      "type": "subscribe",
      "channel": "orders",
      "requestId": "test-request-id"
    }))

    // close socket when page close
    return () => {
      ws.close()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Test Task</title>
        <meta name="description" content="Test task result" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          
        </div>
      </main>
    </>
  )
}
