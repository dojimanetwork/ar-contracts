import fs from "fs";
import Client from "./utils/init";
import {Tag} from "arweave/node/lib/transaction";

(async () => {
    const to_addr = process.env.TARGET_ADDRESS
    const wallet = JSON.parse(fs.readFileSync("./wallet-2.json") as unknown as string);
    const from = await Client.wallets.getAddress(wallet)
    const tag = new Tag(
        "memo",
        "WITHDRAW:AR.AR:10000"
    )
    const transfer = await Client.createTransaction({
        target: to_addr,
        tags: [tag],
        quantity: Client.ar.arToWinston("0.001")
    }, wallet)

    await Client.transactions.sign(transfer, wallet)
    const status = await Client.transactions.post(transfer)
    await Client.api.get("/mine")
    console.log("transfer status", status)
})()