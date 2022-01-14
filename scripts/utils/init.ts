import Arweave from 'arweave'
import dotenv from 'dotenv'

dotenv.config();



const Client: Arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 60000,
    logging: false
})


export default Client