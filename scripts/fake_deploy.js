const Arweave = require("arweave")
const fs = require("fs")
const {createContract} = require('smartweave')


const client = new Arweave({
  host: "localhost",
  port: 1984,
  protocol: "http",
});

const contract = process.env.CONTRACT_NAME;

if (!contract) throw new Error("No contract name submitted");

const wallet = JSON.parse(fs.readFileSync("./wallet.json"));
const src = fs.readFileSync(`./dist/${contract}/index.js`);
const state = fs.readFileSync(`./src/${contract}/fake_state.json`);

(async () => {
  try {
    const id = await createContract(client, wallet, src, state);
    await client.api.get('mine')
    fs.writeFile('fake_contract.json', `{
    "id": "${id}"
}`, (err) => {
      console.log(err)
    })
  } catch (err) { console.log(err) }
})();
