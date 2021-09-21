import Arweave from 'arweave'
import fs from 'fs'

(async () => {
    const instance: Arweave = Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http'
    })    
    const wallet = await instance.wallets.generate()
    console.log(process.env.WALLET_FILE_NAME);
    
    fs.writeFile(process.env.WALLET_FILE_NAME, JSON.stringify(wallet), (err) => {
        console.log("err",err);
    })

    const pathArray = (process.env.WALLET_FILE_NAME as string).split('/')
    const filePath = pathArray.slice(0, pathArray.length - 1 ).join('/')
    const address = await instance.wallets.getAddress(wallet)

    fs.appendFile(`${filePath}/address.txt`, `\n${address}\n`, (err) => {
        console.log("err",err);
    })
    

    console.log("file is successfully created.");
})()