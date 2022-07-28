import Client from "./utils/init";


(async () => {
    const price = (await Client.api.get(`/price/0/2txTDSdb_RjG12uHZlVsB5jrfPzqxtzScKTtPef2KZ0`)).data
    console.log(price)
})()