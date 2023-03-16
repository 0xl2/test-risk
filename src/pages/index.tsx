import { useState } from "react";
import { Container, Grid } from "@mui/material";

import { IToken } from "../../constants/interface";

import HeadPanel from "@/components/headpanel";
import LeftPanel from "@/components/leftpanel";
import RightPanel from "@/components/rightpanel";

import styles from "@/styles/Home.module.css"

export default function Home() {
  const [makerToken, setMakerToken] = useState<IToken | null>(null);
  const [takerToken, setTakerToken] = useState<IToken | null>(null);

  return (
    <>
      <HeadPanel />
      <Container className={styles.mainContainer}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <LeftPanel makerToken={makerToken} takerToken={takerToken} />
          </Grid>
          <Grid item xs={3}>
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
