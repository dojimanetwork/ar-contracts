import Instance from "./wallet-js/instance";


const hash = process.env.TX_HASH as string

(async() => {
    const txDetails = await Instance._arweave.transactions.get(hash)
    txDetails.tags.map((tag) => {
        console.log("name", Instance._arweave.utils.b64UrlToString(tag.name), "value", Instance._arweave.utils.b64UrlToString(tag.value.toString()))
    })
    console.log("Arweave Tx",txDetails)
})()