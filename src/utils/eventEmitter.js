// src/utils/eventEmitter.js
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }
  off(event, listenerToRemove) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(
      (listener) => listener !== listenerToRemove
    );
  }
  emit(event, payload) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(payload));
  }
}
const eventEmitter = new EventEmitter();
export default eventEmitter;
