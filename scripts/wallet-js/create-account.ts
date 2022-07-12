import Instance from "./instance";

(async () => {
    const pubAddress: string = await Instance.getAddress(process.env.MNEMONIC)
    console.log(pubAddress)
})()