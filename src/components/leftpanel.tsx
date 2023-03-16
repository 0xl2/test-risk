import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { ethers, BigNumber } from "ethers";

import { IToken, IOBItem } from "../../constants/interface";

import BidPanel from "@/components/bidpanel";
import AskPanel from "@/components/askpanel";
import styles from "@/styles/leftpanel.module.css";

// init socket url
const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

const requestID = "ws-request-id";

const LeftPanel = ({
  makerToken,
  takerToken,
}: {
  makerToken: IToken | null;
  takerToken: IToken | null;
}) => {
  const [askList, setAsklist] = useState<IOBItem[]>([]);
  const [bidList, setBidList] = useState<IOBItem[]>([]);

  // useEffect(() => {
  //   // init ws
  //   const ws = new WebSocket(socketUrl);

  //   // function for ws open
  //   ws.onopen = () => {
  //     console.log(`websocekt connection opened`);

  //     // send subscribe request
  //     ws.send(
  //       JSON.stringify({
  //         type: "subscribe",
  //         channel: "orders",
  //         requestId: requestID,
  //       })
  //     );
  //   };

  //   // update when receive msg from socket server
  //   ws.onmessage = (event: any) => {
  //     const eventInfo = JSON.parse(event.data);
  //     // handle only if my request
  //     if (eventInfo.requestId == requestID && takerToken && makerToken) {
  //       //   console.log(`received message: ${eventInfo}`);
  //       const bidPayload = eventInfo.payload.filter(
  //         (item: any) =>
  //           // item.order.takerToken.toLowerCase() == takerToken.address.toLowerCase() &&
  //           item.order.makerToken.toLowerCase() ==
  //           makerToken.address.toLowerCase()
  //       );

  //       const askPayload = eventInfo.payload.filter(
  //         (item: any) =>
  //           // item.order.takerToken.toLowerCase() == makerToken.address.toLowerCase() &&
  //           item.order.makerToken.toLowerCase() ==
  //           takerToken.address.toLowerCase()
  //       );

  //       if (bidPayload.length > 0) updateBids(bidPayload);
  //       if (askPayload.length > 0) updateAsks(askPayload);
  //     }
  //   };

  //   // close socket when page close
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  useEffect(() => {
    const initData = async () => {
      if (makerToken && takerToken) {
        const obResp = await fetch(
          `${apiUrl}?quoteToken=${makerToken.address}&baseToken=${takerToken.address}`
        );
        const obInfo = await obResp.json();

        let totalVal = 0;
        let bidArr: IOBItem[] = [];
        let askArr: IOBItem[] = [];

        for (let ii = 0; ii < obInfo.asks.records.length; ii++) {
          const askItem = obInfo.asks.records[ii].order;
          const takerAmt = formatAmount(askItem.takerAmount);
          totalVal += takerAmt;
          askArr.push({
            takerAmount: takerAmt,
            makerAmount: formatAmount(askItem.makerAmount, false),
            total: totalVal,
          });
        }

        totalVal = 0;
        for (let ii = 0; ii < obInfo.bids.records.length; ii++) {
          const bidItem = obInfo.bids.records[ii].order;
          const takerAmt = formatAmount(bidItem.takerAmount, false);
          totalVal += takerAmt;
          bidArr.push({
            takerAmount: takerAmt,
            makerAmount: formatAmount(bidItem.makerAmount),
            total: totalVal,
          });
        }

        setAsklist(askArr);
        setBidList(bidArr);
      }
    };

    initData();
  }, [takerToken, makerToken]);

  const formatAmount = (amount: string, isMaker = true) => {
    const decimal = isMaker
      ? makerToken
        ? makerToken.decimal
        : 18
      : takerToken
      ? takerToken.decimal
      : 18;

    return Number(ethers.utils.formatUnits(amount, decimal));
  };

  const updateAsks = (list: any[]) => {
    let totalVal = 0;
    let askArr: IOBItem[] = [];

    if (list.length > 0) {
      for (let ii = 0; ii < list.length; ii++) {
        const askItem = list[ii].order;
        const takerAmt = formatAmount(askItem.takerAmount);
        totalVal += takerAmt;

        askArr.push({
          takerAmount: takerAmt,
          makerAmount: formatAmount(askItem.makerAmount, false),
          total: totalVal,
        });
      }
    }

    console.log(askList.length, "askList");

    for (let ii = 0; ii < askList.length; ii++) {
      const askItem = askList[ii];
      totalVal += askItem.takerAmount;
      askArr.push({
        takerAmount: askItem.takerAmount,
        makerAmount: askItem.makerAmount,
        total: totalVal,
      });
    }

    console.log(askArr, "askarr");

    setAsklist(askArr);
  };

  const updateBids = (list: any[]) => {
    let totalVal = 0;
    let bidArr: IOBItem[] = [];

    if (list.length > 0) {
      for (let ii = 0; ii < list.length; ii++) {
        const bidItem = list[ii].order;
        const takerAmt = formatAmount(bidItem.takerAmount, false);
        totalVal += takerAmt;

        bidArr.push({
          takerAmount: takerAmt,
          makerAmount: formatAmount(bidItem.makerAmount),
          total: totalVal,
        });
      }
    }

    console.log(bidList.length, "bidList");

    for (let ii = 0; ii < bidList.length; ii++) {
      const bidItem = bidList[ii];
      const takerAmt = bidItem.takerAmount;
      totalVal += takerAmt;
      bidArr.push({
        takerAmount: takerAmt,
        makerAmount: bidItem.makerAmount,
        total: totalVal,
      });
    }

    console.log(bidArr.length, "bidArr");

    setBidList(bidArr);
  };

  return (
    <Grid container spacing={2} className={styles.leftDiv}>
      <Grid item xs={6}>
        <AskPanel
          oblist={askList}
          takerToken={takerToken ? takerToken.symbol : ""}
          makerToken={makerToken ? makerToken.symbol : ""}
        />
      </Grid>
      <Grid item xs={6}>
        <BidPanel
          oblist={bidList}
          takerToken={takerToken ? takerToken.symbol : ""}
          makerToken={makerToken ? makerToken.symbol : ""}
        />
      </Grid>
    </Grid>
  );
};

export default LeftPanel;
