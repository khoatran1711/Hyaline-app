export enum EventName {
  ReceiveMessage = "ReceiveMessage",
}

type EvenCallback = (...args: any[]) => void;

export class EventStore {
  private eventListeners: Map<EventName, EvenCallback[]>;

  constructor() {
    this.eventListeners = new Map();
  }

  on(event: EventName, callback: EvenCallback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)?.push(callback);
  }

  off(event: EventName, callback: EvenCallback) {
    if (this.eventListeners.has(event)) {
      const index = this.eventListeners.get(event)?.indexOf(callback);

      if (index !== undefined && index > -1) {
        this.eventListeners.get(event)?.splice(index, 1);
      }
    }
  }

  emit(event: EventName, ...args: any[]) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event)?.forEach((callback) => {
        callback(...args);
      });
    }
  }
}

export const WebSocketEventStore = new EventStore();
