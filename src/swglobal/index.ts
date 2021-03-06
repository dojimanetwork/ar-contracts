import {
  simulateCreateContractFromTx,
  simulateCreateContractFromSource,
  createContract,
  createContractFromTx,
} from './contract-create';
import { loadContract } from './contract-load';
import {
  interactWrite,
  interactWriteDryRun,
  interactRead,
  interactWriteDryRunCustom,
  simulateInteractWrite,
} from './contract-interact';
import { readContract } from './contract-read';
import { selectWeightedPstHolder } from './weighted-pst-holder'; 
import { interactFakeWrite } from './contract-fake-interact';

const smartweave = {
  simulateCreateContractFromTx,
  simulateCreateContractFromSource,
  createContract,
  createContractFromTx,
  loadContract,
  interactWrite,
  interactWriteDryRun,
  interactWriteDryRunCustom,
  simulateInteractWrite,
  interactRead,
  readContract,
  selectWeightedPstHolder,
};

export {
  simulateCreateContractFromTx,
  simulateCreateContractFromSource,
  createContract,
  createContractFromTx,
  loadContract,
  interactWrite,
  interactWriteDryRun,
  interactWriteDryRunCustom,
  simulateInteractWrite,
  interactRead,
  readContract,
  selectWeightedPstHolder,
  interactFakeWrite,
  smartweave,
};
