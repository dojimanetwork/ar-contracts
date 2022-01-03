export interface StateInterface {
    name: string;
    ticker: string;
    owner: string;
    canEvolve: boolean;
    balances: BalancesInterface;
  }
  
  export interface RoleInterface {
    [key: string]: string;
  }
  
  export interface BalancesInterface {
    [key: string]: number;
  }

  export interface ActionInterface {
    input: InputInterface;
    caller: string;
  }
  
  export interface InputInterface {
    function: GetFunctionType | SetFunctionType;
    cast?: string;
    target?: string;
    qty?: number;
  }

  
  export interface ResultInterface {
    target: string;
    balance: number;
    role: string;
  }
  
  export type GetFunctionType = 'balance' | 'unlockedBalance' | 'vaultBalance' | 'role';
  export type SetFunctionType = 'transfer' | 'transferLocked' | 'vote' | 'propose' | 'finalize' | 'lock' | 'increaseVault' | 'unlock' | 'extend';
  