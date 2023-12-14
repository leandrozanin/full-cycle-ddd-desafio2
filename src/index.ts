import { Mediator } from "./domain/@shared/service/mediator";
import Customer from "./domain/customer/entity/customer";
import { CustomerChangeAddress } from "./domain/customer/entity/customer-change-address.event";
import { CustomerCreated } from "./domain/customer/entity/customer-created.event";
import { ChangeAddressListener } from "./domain/customer/listeners/change-address.listener";
import { SendMailListener } from "./domain/customer/listeners/send-mail.listener";
import Address from "./domain/customer/value-object/address";


const mediator = new Mediator();

const sendMailListener = new SendMailListener();

mediator.register(CustomerCreated.name, (event: CustomerCreated) => {
    sendMailListener.handle(event)
})


const changeAddressListener = new ChangeAddressListener();

mediator.register(CustomerChangeAddress.name, (event: CustomerChangeAddress) => {
    changeAddressListener.handle(event)
})

const customer = new Customer("123", "Customer 1");
const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
customer.Address = address;

const addressChange = new Address("Street 2", 22, "Zipcode 2", "City 2");
customer.changeAddress(addressChange);

mediator.publish(customer)
