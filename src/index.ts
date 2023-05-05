// Import the express in typescript file
import express from 'express';
import { trade_defund } from './defund';
import { Request, Response } from "express";

// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port: number = 3000;
app.use(express.urlencoded({ extended: true }))
// Handling '/' Request
app.get("/trade", async (req: Request, res: Response) => {
  try {
    let protocol: string = 'defund';
    if (req.query.protocol) protocol = req.query.protocol as string;
    const assetA = req.query.from as string;
    const assetB = req.query.to as string;
    const share = req.query.share as string;
    const amount = req.query.amount as string;
    const slippage = req.query.slippage as string;
    const poolAddress = req.query.pool as string;
    const network = req.query.network as string
    const options = {
            gasLimit: 1000000,
            gasPrice: 60, // 60 gwei
    }
    const tx = await trade_defund(poolAddress, assetA, assetB, Number(slippage), Number(share), network, options);
    res.status(200).send({status: "success", msg: tx });
  }
  catch(err) {
          res.status(400).send({status: "fail", msg: err });
  }
  });
app.get("/poolComposition", async (req: Request, res: Response) => {
  try {
    const poolAddress = req.query.pool as string;
    const network = req.query.network as string;
    const tx = await poolComposition(poolAddress, network);
    res.status(200).send({status: "success", msg: tx });
  }
  catch(err) {
          res.status(400).send({status: "fail", msg: err });
  }
 });
// Server setup
app.listen(port, () => {
        console.log(`DeFund API TypeScript with Express
                http://localhost:${port}/`);
});
