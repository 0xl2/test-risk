import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";

import Head from "next/head";

import { IToken, IPayload, IReqBody } from "../../constants/interface";
import RightPanel from "@/components/rightpanel";

// init socket url
const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "";

export default function Home() {
  const [obList, setOblist] = useState([]);
  const [makerToken, setMakerToken] = useState<IToken | null>(null);
  const [takerToken, setTakerToken] = useState<IToken | null>(null);

  // useEffect(() => {
  //   // init ws
  //   const ws = new WebSocket(socketUrl);

  //   // function for ws open
  //   ws.onopen = () => {
  //     console.log(`websocekt connection opened`);
  //   };

  //   // update when receive msg from socket server
  //   ws.onmessage = (event: any) => {
  //     console.log(`received message: ${event.data}`);

  //     // handle event data
  //   };

  //   // close socket when page close
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  useEffect(() => {
    let payload = {
      type: "subscribe",
      channel: "orders",
      requestId: "test-request-id",
    } as IReqBody;

    // add takerToken in payload if selected
    if (takerToken) {
      payload.payload = {
        takerToken: takerToken.address,
      } as IPayload;
    }

    // add makerToken in payload if selected
    if (makerToken) {
      if (payload.payload) payload.payload.makerToken = makerToken.address;
      else
        payload.payload = {
          makerToken: makerToken.address,
        } as IPayload;
    }

    // send subscribe request
    // ws.send(JSON.stringify(payload));
  }, [takerToken, makerToken]);

  return (
    <>
      <Head>
        <title>Test Task</title>
        <meta name="description" content="Test task result" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <RightPanel
              makerToken={makerToken}
              takerToken={takerToken}
              setMakerToken={setMakerToken}
              setTakerToken={setTakerToken}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
