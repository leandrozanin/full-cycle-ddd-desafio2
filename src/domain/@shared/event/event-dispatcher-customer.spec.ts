import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import Handle1ConsoleLog from "../../customer/event/handler/handle1-consolelog.handler";
import Handle2ConsoleLog from "../../customer/event/handler/handle2-consolelog.handler";
import EventDispatcher from "./event-dispatcher";

describe("Customer events tests", () => {
  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new Handle1ConsoleLog();
    const eventHandler2 = new Handle2ConsoleLog();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);

    expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
      ).toMatchObject(eventHandler2);

    const costumerCreatedEvent = new CustomerCreatedEvent({
      id: "123",
      name: "Leandro Zanin"
    });

    eventDispatcher.notify(costumerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();

  });
});
