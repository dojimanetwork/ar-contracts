import Arweave from 'arweave'
import dotenv from 'dotenv'

dotenv.config();


const host = process.env.AR_HOST

const config = host ? {
    host,
    protocol: 'https'
} : {
    host: 'localhost',
    port: 1984,
    protocol: 'http',
    timeout: 60000,
    logging: false
}

const Client: Arweave = Arweave.init(config)


export default Client