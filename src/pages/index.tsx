import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

import { tokens } from '../../constants/tokens'

// init socket url
const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || ""

interface IPayload {
  takerToken: string | null,
  makerToken: string | null
}

interface IReqBody {
  type: string,
  channel: string,
  requestId: string,
  payload: IPayload | null
}

export default function Home() {
  const [makerToken, setMakerToken] = useState("")
  const [takerToken, setTakerToken] = useState("")
  const [obList, setOblist] = useState([])
  const [ws, setWs] = useState(null as any)

  useEffect(() => {
    // init ws
    setWs(new WebSocket(socketUrl))
    
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

    // close socket when page close
    return () => {
      ws.close()
    }
  }, [])

  const optChanged = () => {
    let payload = {
      type: "subscribe",
      channel: "orders",
      requestId: "test-request-id"
    } as IReqBody

    // add takerToken in payload if selected
    if (takerToken.length > 0) {
      payload.payload = {
        takerToken
      } as IPayload
    }

    // add makerToken in payload if selected
    if (makerToken.length > 0) {
      if (payload.payload) payload.payload.makerToken = makerToken
      else payload.payload = {
        makerToken
      } as IPayload
    } 
      
    // send subscribe request
    ws.send(JSON.stringify(payload))
  }

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
