import dotenv from "dotenv";
import Instance from "./instance";



(async()=>{
    const address = process.env.TARGET_ADDRESS
    await Instance.mintArTokens(address)
    const balance = await Instance.getBalance(address)
    console.log(balance)
})()