export interface IToken {
  name: string;
  symbol: string;
  address: string;
  logo: string;
}

export interface IPayload {
  takerToken: string | null;
  makerToken: string | null;
}

export interface IReqBody {
  type: string;
  channel: string;
  requestId: string;
  payload: IPayload | null;
}
