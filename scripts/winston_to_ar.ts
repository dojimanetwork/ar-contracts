import Client from './utils/init'

(async () => {
    const winston = process.env.WINSTON_VAL
    console.log("winston to ar", Client.ar.winstonToAr(winston), "AR")
})()