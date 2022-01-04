import Client from './utils/init'
import fs from 'fs'

const wallet = JSON.parse(fs.readFileSync("./wallet-2.json") as unknown as string);


(async () => {
    const address = await Client.wallets.getAddress(wallet)
    const balance = await Client.wallets.getBalance(address)
    console.log("ar balance", address, Client.ar.winstonToAr(balance), "AR")
    
})()