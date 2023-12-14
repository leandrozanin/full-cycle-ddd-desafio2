import { CustomerChangeAddress } from "../entity/customer-change-address.event";



export class ChangeAddressListener{
    handle(event: CustomerChangeAddress){
        console.log(`Endereço do cliente: ${event.aggregate_id}, ${event.name} alterado para: ${event.address}`)
    }
}