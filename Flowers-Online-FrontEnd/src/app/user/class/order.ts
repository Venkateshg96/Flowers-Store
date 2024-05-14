import { Product } from "./product";
import { billingAddress } from './billing-address';
export class Order {
    constructor(
      public id:number,
      public totalCost:number,
      public products: Product[],
      public billingAddress: billingAddress
    ) {}
    }