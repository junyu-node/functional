const composer = (...handles) => (target, ...args) => {
  return handles.reduce((last, handle) => {
    return handle.apply(last, [last, ...args])
  }, target)
}

// test
const stringReverse = (s) => {
  if (typeof s !== 'string') return s
  return s.split('').reverse().join('')
}

const exist = obj => !!obj

const exec = (condition, handle) => (...args) => exist(condition) ? handle(...args) : undefined

const invoker = name => (target, ...args) => {
  const targetMethod = target[name]
  return exec(targetMethod, targetMethod.bind(target))(...args)
}

const fix = (prefix, suffix) => (value) => `${prefix}${value}${suffix}`

const str = composer(invoker('toString'), stringReverse, fix('pre-', '-end'))

console.log(str(true))
console.log(str('abc'))
console.log(str(['a', 'b', 'c']))
