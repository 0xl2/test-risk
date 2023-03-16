import { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { Search } from "@mui/icons-material";
import { Container, Grid, TextField, InputAdornment } from "@mui/material";

import Head from "next/head";

import { tokens } from "../../constants/tokens";
import { IToken } from "../../constants/interface";

import styles from "@/styles/Home.module.css";

// init socket url
const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "";

interface IPayload {
  takerToken: string | null;
  makerToken: string | null;
}

interface IReqBody {
  type: string;
  channel: string;
  requestId: string;
  payload: IPayload | null;
}

export default function Home() {
  const [, setSearch] = useState("");
  const [opt, setOpt] = useState("");
  const [open, setOpen] = useState(true);
  const [obList, setOblist] = useState([]);
  const [makerToken, setMakerToken] = useState<IToken | undefined>(undefined);
  const [takerToken, setTakerToken] = useState<IToken | undefined>(undefined);
  const [filtered, setFiltered] = useState([] as IToken[]);

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
    setFiltered(tokens);
  }, []);

  const optChanged = (token: IToken) => {
    console.log(token, opt);
    if (opt == "maker") {
      setMakerToken(token);
    } else if (opt == "taker") {
      setTakerToken(token);
    }

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

    setOpen(true);
  };

  const doChange = (searchVal: string) => {
    setSearch(searchVal);

    const lowSearchVal = searchVal.toLowerCase();
    const newFilter = tokens.filter((tokenItem: IToken) => {
      return (
        tokenItem.symbol.toLocaleLowerCase().includes(lowSearchVal) ||
        tokenItem.name.toLocaleLowerCase().includes(lowSearchVal) ||
        tokenItem.address.toLocaleLowerCase().includes(lowSearchVal)
      );
    });

    setFiltered(newFilter);
  };

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
            <div className={styles.selectDiv}>
              <Collapse className="collapse" isOpened={open}>
                <div className={styles.cardDiv}>
                  <p className={styles.title}>Select tokens</p>
                </div>
                <div className={styles.cardDiv}>
                  <button
                    className={styles.tokenBtn}
                    onClick={() => {
                      setOpt("maker");
                      setOpen(false);
                    }}
                  >
                    {makerToken ? makerToken.name : "Maker Token"}
                    <span className={styles.btnSpan}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="7"
                        fill="none"
                        viewBox="0 0 11 7"
                      >
                        <path
                          fill="#1F1F41"
                          d="M5.4 6.9L0 1.5 1.4.1l4 4 4-4 1.4 1.4-5.4 5.4z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <div className={styles.cardDiv}>
                  <button
                    className={styles.tokenBtn}
                    onClick={() => {
                      setOpt("taker");
                      setOpen(false);
                    }}
                  >
                    {takerToken ? takerToken.name : "Taker Token"}
                    <span className={styles.btnSpan}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="7"
                        fill="none"
                        viewBox="0 0 11 7"
                      >
                        <path
                          fill="#1F1F41"
                          d="M5.4 6.9L0 1.5 1.4.1l4 4 4-4 1.4 1.4-5.4 5.4z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </Collapse>
              <Collapse className="collapse" isOpened={!open}>
                <div className={styles.collapseHead}>
                  <div className={styles.cardDiv}>
                    <p className={styles.tokenTitle}>Choose token</p>
                  </div>
                  <div className={styles.jmgGTH} onClick={() => setOpen(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="none"
                      viewBox="0 0 10 10"
                    >
                      <path
                        fill="#1F1F41"
                        d="M8.18 9.278a.75.75 0 001.065-1.056L5.81 4.755 9.278 1.32A.75.75 0 108.222.253L4.754 3.69 1.317.222A.75.75 0 10.252 1.278l3.437 3.468L.222 8.18a.75.75 0 001.056 1.066L4.744 5.81 8.18 9.278z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className={styles.srchDiv}>
                  <TextField
                    onChange={(e) => doChange(e.target.value)}
                    placeholder="Search or paste any token"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    className={styles.srchInput}
                  />
                </div>
                <div className={styles.listDiv}>
                  {filtered.map((token) => (
                    <div
                      key={token.symbol}
                      className={styles.listItem}
                      onClick={() => optChanged(token)}
                    >
                      <img
                        src={token.logo}
                        className={styles.listIcon}
                        alt="coin-icon"
                      />
                      {token.name} -{" "}
                      <span className={styles.tokenSymbol}>{token.symbol}</span>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
