import { Grid } from "@mui/material";

import { IOBItem, IToken } from "../../constants/interface";

import styles from "@/styles/leftpanel.module.css";

const AskPanel = ({
  oblist,
  makerToken,
  takerToken,
}: {
  oblist: IOBItem[];
  makerToken: string;
  takerToken: string;
}) => {
  return (
    <div className={styles.askDiv}>
      <span className={styles.rightHeader}>Ask List</span>
      <Grid container spacing={2} className={styles.tblHead}>
        <Grid item xs={4}>
          Maker Amount <br />
          {takerToken.length > 0 && (
            <span className={styles.symbol}>({takerToken})</span>
          )}
        </Grid>
        <Grid item xs={4} className={styles.qtItem}>
          Taker Amount <br />
          {makerToken.length > 0 && (
            <span className={styles.symbol}>({makerToken})</span>
          )}
        </Grid>
        <Grid item xs={4} className={styles.totalItem}>
          Total <br />
          {makerToken.length > 0 && (
            <span className={styles.symbol}>({makerToken})</span>
          )}
        </Grid>
      </Grid>
      <div className={styles.itemDiv}>
        {oblist.map((mkItem: IOBItem, ind: number) => (
          <Grid container spacing={2} key={ind}>
            <Grid item xs={4} className={styles.priceItem}>
              {mkItem.makerAmount.toFixed(2)}
            </Grid>
            <Grid item xs={4} className={styles.qtItem}>
              {mkItem.takerAmount.toFixed(2)}
            </Grid>
            <Grid item xs={4} className={styles.totalItem}>
              {mkItem.total.toFixed(2)}
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  );
};

export default AskPanel;
