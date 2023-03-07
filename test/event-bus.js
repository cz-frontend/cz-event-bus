const CZEventBus = require('../src/event-bus');

const eventBus = new CZEventBus();

// .on测试脚本
const onThemeFn = (...payload) => {
  console.log('--->on', '执行了');
};
console.log(eventBus.on('themeProps', onThemeFn));

// .emit测试脚本
eventBus.emit('themeProps', 'dark');

// .off测试脚本
// eventBus.on('off', onThemeFn);

// setTimeout(() => {
//   eventBus.off('off', onThemeFn);
// }, 1200);

// once测试脚本
const onceCallBack1 = (...payload) => console.log('once1');
const onceCallBack2 = (...payload) => console.log('once2');
eventBus.on('vue', onceCallBack1);
eventBus.on('vue', onceCallBack2);

console.log(eventBus.once('vue', (...payload) => console.log(payload)));
