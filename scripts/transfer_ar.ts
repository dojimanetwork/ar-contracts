import Client from './utils/init'
import fs from 'fs'


const to_addr = process.env.TARGET_ADDRESS
const wallet = JSON.parse(fs.readFileSync("./wallet-1.json") as unknown as string);

(async () => {
    // const fee = await Client.api.get(`/price/1/${to_addr}`)
    // console.log(fee.data);
    const from = await Client.wallets.getAddress(wallet)
    console.log("from address", from);
    
    const transfer = await Client.createTransaction({
        target: to_addr,
        quantity: Client.ar.arToWinston("1")
    }, wallet)
    await Client.transactions.sign(transfer, wallet)
    const status = await Client.transactions.post(transfer)
    await Client.api.get("/mine")
    console.log("transfer status", status)
    
})()
