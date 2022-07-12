import Instance, {TransferInstance} from "./instance";

(async() => {
    const rawTx = await TransferInstance.createTransaction(process.env.CROSS_CHAIN_ADDRESS, 1)
    console.log(rawTx)
    const send = await TransferInstance.signAndSend(rawTx)
    console.log("Arweave Tx",send)
})()