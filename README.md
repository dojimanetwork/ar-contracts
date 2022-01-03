# Testing AR contracts 1

*Italic*
This repo used to test ar contracts, interact, read and deploy contracts with arlocal.

```
# code block
 yarn build:all - builds all contracts.
 yarn deploy:testing - deploy contract to node.
 yarn fake_deploy:testing - deploy fake contract.
 yarn interact - interacts with contract to do task.
 yarn createAcc - creates new arweave account.
 yarn read_contract - read latest contract state.
 yarn verifyTx - verify particular tx as valid or not.
```


Steps To Load project:
1. Add .env file at root directory and modify variables.
2. run yarn deploy:testing
3. run yarn interact