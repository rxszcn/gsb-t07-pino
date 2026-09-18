// 复现：级别名字只在构造时折叠大小写，另外三条入口都不认
const pino = require('../');
const sink = { write () {} };
const log = pino({ level: 'INFO' }, sink);
console.log('构造接受大写 INFO ->', log.level, log.levelVal);

try { log.level = 'WARN'; console.log('运行时赋值 WARN ->', '成功', log.levelVal); }
catch (e) { console.log('运行时赋值 WARN -> 抛', e.message); }
try { log.child({}, { level: 'ERROR' }); console.log('子级用 ERROR ->', '成功'); }
catch (e) { console.log('子级用 ERROR -> 抛', e.message); }
console.log("isLevelEnabled('INFO') ->", log.isLevelEnabled('INFO'));

try {
  const only = pino({ customLevels: { INFO: 35 }, useOnlyCustomLevels: true, level: 'INFO' }, sink);
  console.log('只注册大写 INFO 的实例 ->', only.level, only.levelVal);
} catch (e) {
  console.log('只注册大写 INFO 的实例 -> 抛', e.message, '（用户从没写过 info）');
}
