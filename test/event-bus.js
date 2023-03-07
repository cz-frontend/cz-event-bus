const CZEventBus = require('../src/event-bus');

const eventBus = new CZEventBus();

// .on测试脚本
const onThemeFn = (...payload) => {
  console.log('--->on', payload);
};
console.log(eventBus.on('themeProps', onThemeFn));

// .emit测试脚本
eventBus.emit('themeProps', 'dark');
