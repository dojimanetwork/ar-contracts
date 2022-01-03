import {
    StateInterface,
    ActionInterface,
    BalancesInterface,
    InputInterface,
  } from "./faces";
  
  declare const ContractError: any;
  
  export function handle(state: StateInterface, action: ActionInterface): { state: StateInterface } | { result: any } {
    const balances: BalancesInterface = state.balances;
    const input: InputInterface = action.input;
    const caller: string = action.caller;
  
    /** Transfer Function */
    if (input.function === 'transfer') {
      const target = isArweaveAddress(input.target);
      const qty = input.qty;
  
      if (!Number.isInteger(qty)) {
        throw new ContractError('Invalid value for "qty". Must be an integer.');
      }
  
      if (!target) {
        throw new ContractError('No target specified.');
      }
  
      if (qty <= 0 || caller === target) {
        throw new ContractError('Invalid token transfer.');
      }
  
      if(!(caller in balances)) {
        throw new ContractError('Caller doesn\'t own any DAO balance.');
      }
  
      if (balances[caller] < qty) {
        throw new ContractError(`Caller balance not high enough to send ${qty} token(s)!`);
      }
  
      // Lower the token balance of the caller
      balances[caller] -= qty;
  
      if (target in balances) {
        // Wallet already exists in state, add new tokens
        balances[target] += qty;
      } else {
        // Wallet is new, set starting balance
        balances[target] = qty;
      }
  
      return { state };
    }

    function isArweaveAddress(addy: string) {
      const address = addy.toString().trim();
      if(!/[a-z0-9_-]{43}/i.test(address)) {
        throw new ContractError('Invalid Arweave address.');
      }
  
      return address;
    }
  
    throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
  }
  