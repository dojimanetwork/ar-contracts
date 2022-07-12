import Arweave from 'arweave'
import dotenv from 'dotenv'

dotenv.config();



const Client: Arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
    timeout: 60000,
    logging: false
})


export default Client