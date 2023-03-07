class CZEventBus {
  constructor() {
    this.eventBus = {};
  }
  /**
   * 事件监听
   * @param {srting} eventName 事件名
   * @param {function} eventCallback 回调事件
   * @param {} thisArg
   */
  on(eventName, eventCallback, thisArg) {
    if (typeof eventName !== 'string') {
      throw new TypeError('类型错误，应为string类型');
    }

    if (typeof eventCallback !== 'function') {
      throw new TypeError('类型错误，应为function类型');
    }

    let events = this.eventBus[eventName];
    if (!events) {
      events = [];
      this.eventBus[eventName] = events;
    }

    events.push({
      eventCallback,
      thisArg,
    });
    return this;
  }

  /**
   * 事件通知
   * @param {srting} eventName 事件名
   * @param {string} payload 提供给外部的数据
   */
  emit(eventName, ...payload) {
    if (typeof eventName !== 'string') {
      throw new TypeError('类型错误，应为string类型');
    }

    const events = this.eventBus[eventName] || [];
    events.forEach((event) => {
      event.eventCallback.apply(event.thisArg, payload);
    });
    return this;
  }

  /**
   * 取消事件监听
   * @param {srting} eventName 事件名
   * @param {string} payload 提供给外部的数据
   */
  off(eventName, eventCallback) {
    if (typeof eventName !== 'string') {
      throw new TypeError('类型错误，应为string类型');
    }

    if (typeof eventCallback !== 'function') {
      throw new TypeError('类型错误，应为function类型');
    }

    let events = this.eventBus[eventName];
    if (events && eventCallback) {
      const newEvents = [...events];

      for (let key = 0; key < newEvents.length; key++) {
        const event = newEvents[key];

        if (event.eventCallback === eventCallback) {
          const index = events.indexOf(event);
          events.splice(index, 1);
        }
      }
    }
    if (events.length === 0) {
      delete this.eventBus[eventName];
    }
  }

  once(eventName, eventCallback, thisArg) {
    if (typeof eventName !== 'string') {
      throw new TypeError('类型错误，应为string类型');
    }

    if (typeof eventCallback !== 'function') {
      throw new TypeError('类型错误，应为function类型');
    }

    /**
     * 单例事件监听
     * @param {srting} eventName 事件名
     * @param {function} eventCallback 回调事件
     * @param {} thisArg
     */
    const tempCallback = (...payload) => {
      this.off(eventName, tempCallback);
      eventCallback.apply(thisArg, payload);
    };

    return this.on(eventName, tempCallback, thisArg);
  }
}
module.exports = CZEventBus;
