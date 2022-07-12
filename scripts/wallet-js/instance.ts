import {ArweaveAccount} from "@dojima-wallet/account";
import dotenv from "dotenv";
import {ArweaveChain} from "@dojima-wallet/transfer";

dotenv.config();

const Instance = new ArweaveAccount("testnet")
const TransferInstance = new ArweaveChain(process.env.MNEMONIC,"testnet")


export { TransferInstance }
export default Instance