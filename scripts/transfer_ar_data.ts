import Client from './utils/init'
import fs from 'fs'


const to_addr = process.env.TARGET_ADDRESS
const wallet = JSON.parse(fs.readFileSync("./wallet-1.json") as unknown as string);

(async () => {
    const from = await Client.wallets.getAddress(wallet)
    const data = process.env.TRANSFER_DATA as string
    const byteSize = Buffer.from(data).length
    const reward = await Client.api.get(`/price/${byteSize}/${to_addr}`)
    console.log(reward.data);
    
    const transfer = await Client.createTransaction({
        target: to_addr,
        quantity: Client.ar.arToWinston("1"),
        data,
        reward: reward.data
    }, wallet)

    await Client.transactions.sign(transfer, wallet)
    const status = await Client.transactions.post(transfer)
    await Client.api.get("/mine")
    console.log("transfer status", status)
    
})()
