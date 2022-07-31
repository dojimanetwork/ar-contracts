import Client from './utils/init'
import fs from 'fs'


const wallet = JSON.parse(fs.readFileSync("/Users/luffybhaagi/Downloads/arweave-keyfile-BEse3_Pq84KMolix81H8k6nLSo934dLcI4U4-mnr8qk.json") as unknown as string);


const ar_amount = parseInt(process.env.MINT_AR as string, 10);

(async () => {
    const address = await Client.wallets.getAddress(wallet)
    await Client.api.get(`/mint/${address}/${ar_amount}`)
    await Client.api.get("/mine")
    const balance = await Client.wallets.getBalance(address)
    console.log("ar balance address", address, Client.ar.winstonToAr(balance), "AR") 
})()