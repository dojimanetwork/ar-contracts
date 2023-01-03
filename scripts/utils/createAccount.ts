import Client from './init'
import fs from 'fs'

(async () => {

    const wallet = await Client.wallets.generate()
    console.log(process.env.WALLET_FILE_NAME);

    await Client.api.get('/mine')
    
    fs.writeFile(process.env.WALLET_FILE_NAME, JSON.stringify(wallet), (err) => {
        console.log("err",err);
    })

    const pathArray = (process.env.WALLET_FILE_NAME as string).split('/')
    const filePath = pathArray.slice(0, pathArray.length - 1 ).join('/')
    const address = await Client.wallets.getAddress(wallet)

    fs.appendFile(`${filePath}/address.txt`, `\n${address}\n`, (err) => {
        console.log("err",err);
    })
    

    console.log("file is successfully created.");
})()