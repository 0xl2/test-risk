import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";

import { IToken, IPayload, IReqBody } from "../../constants/interface";

import HeadPanel from "@/components/headpanel";
import LeftPanel from "@/components/leftpanel";
import RightPanel from "@/components/rightpanel";

export default function Home() {
  const [makerToken, setMakerToken] = useState<IToken | null>(null);
  const [takerToken, setTakerToken] = useState<IToken | null>(null);

  return (
    <>
      <HeadPanel />
      <Container>
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
