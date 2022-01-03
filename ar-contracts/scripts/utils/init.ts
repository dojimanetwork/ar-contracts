import Arweave from 'arweave'

const instance: Arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http'
})

export default instance as Arweave