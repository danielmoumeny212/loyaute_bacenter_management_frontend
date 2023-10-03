interface BacenterLeader{
   id: number; 
   first_name: string;
   last_name: string; 

}

export interface Bacenter {
  id: number; 
  name: string; 
  quarter: string; 
  bacenter_leader: BacenterLeader
  deleted : boolean; 
  

}
export function isBacenter(obj: any): obj is Bacenter {
  return obj instanceof Object 
    && typeof obj.id === 'number'
    && typeof obj.name === 'string'
    && typeof obj.quarter === 'string'
    && typeof obj.bacenter_leader === 'object'
    && typeof obj.deleted === 'boolean';
}
