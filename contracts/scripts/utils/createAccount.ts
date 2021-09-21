import Arweave from 'arweave'
import fs from 'fs'

(async () => {
    const instance: Arweave = Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http'
    })
    console.log(instance);
    
    // const wallet = await instance.wallets.generate()
    // const address = await instance.wallets.getAddress(wallet)
    // fs.writeFile(process.env.file_name, JSON.stringify(wallet), (err) => {
    //     console.log("err",err);
    // })
    
    console.log("file is successfully created.");
})()