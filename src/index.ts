// Import the express in typescript file
import express from 'express';
import { trade_defund } from './defund';

// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port: number = 3000;

// Handling '/' Request
app.get('/', async (_req, _res) => {
	const fundAddress = '';
	const fromToken = '';
	const toToken = '';
	const slippage = 1; // 1%
	const share = 10; // 10%
	const network = '';
	const options = {
		gasLimit: 1000000,
		// gasPrice: 60, // 60 gwei
	} // optional
	const tx = await trade_defund(fundAddress, fromToken, toToken, slippage, share, network, options);
	_res.send(tx);
});

// Server setup
app.listen(port, () => {
	console.log(`TypeScript with Express
		http://localhost:${port}/`);
});

