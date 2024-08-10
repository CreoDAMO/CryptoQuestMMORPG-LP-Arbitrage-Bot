declare module '@uniswap/sdk' {
  export class Token {
    constructor(chainId: number, address: string, decimals: number, symbol?: string, name?: string);
  }

  export class Fetcher {
    static fetchPairData(tokenA: Token, tokenB: Token, provider: any): Promise<any>;
  }

  export class Route {
    constructor(pairs: any[], input: Token, output?: Token);
    midPrice: {
      toSignificant: (significantDigits: number) => string;
      invert: () => {
        toSignificant: (significantDigits: number) => string;
      };
    };
  }
}
