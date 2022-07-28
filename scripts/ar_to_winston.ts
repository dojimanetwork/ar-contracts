import Client from './utils/init'

(async () => {
    const arweave = process.env.ARWEAVE_VAL
    console.log(arweave)
    console.log("winston to ar", Client.ar.arToWinston(arweave, {formatted: true}), "WINSTON")
})()