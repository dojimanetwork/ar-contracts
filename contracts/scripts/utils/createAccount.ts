import Arweave from 'arweave'
import fs from 'fs'

(async () => {
    const instance: Arweave = Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http'
    })    
    const wallet = await instance.wallets.generate()

    fs.writeFile(process.env.WALLET_FILE_NAME, JSON.stringify(wallet), (err) => {
        console.log("err",err);
    })
    
    console.log("file is successfully created.");
})()