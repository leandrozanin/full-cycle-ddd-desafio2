import Customer from "../../customer/entity/customer";
import { CustomerChangeAddress } from "../../customer/entity/customer-change-address.event";
import { ChangeAddressListener } from "../../customer/listeners/change-address.listener";
import Address from "../../customer/value-object/address";
import { Mediator } from "../service/mediator";

describe("Change Address events tests", () => {
  it("should notify all event handlers", () => {
   
    const mediator = new Mediator();

    const changeAddressListener = new ChangeAddressListener();
    const spyEventHandler1 = jest.spyOn(changeAddressListener, "handle");


    mediator.register(CustomerChangeAddress.name, (event: CustomerChangeAddress) => {
      changeAddressListener.handle(event)
    })

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;

    const addressChange = new Address("Street 2", 22, "Zipcode 2", "City 2");
    customer.changeAddress(addressChange);

    mediator.publish(customer);


    expect(spyEventHandler1).toHaveBeenCalled();
  });
});
