# jest
## 常用列表

- expect.assertions(number)  验证在测试期间调用了一定数量的断言
- expect.hasAssertions()  验证在测试期间至少调用一个断言
- .toBe(value)  比较原始值或检查对象实例的引用一致性
- .toHaveBeenCalled() 确保模拟的function被调用了
- .toHaveLength(number) 检查数组或字符串大小
- .toContain(item) 检查 item(非Object) 包含在数组中
- .toContainEqual(item)  检查 item 包含在数组中
- .toEqual(value) 检查对象是否相等
- jest.fn(implementation)  mock方法的实现，接收一个function
  
## 可能用到

- .toBeDefined()  检查一个变量不是 undefined
- .toBeUndefined()  检查一个变量是 undefined
- .toBeFalsy()  检查值是 false、0、''、null、undefined 或 NaN
- .toBeTruthy()  检查值 不是上述 falsy
- .toBeGreaterThan(number) 检查值 大于 number
- .toBeGreaterThanOrEqual(number) 检查值 大于等于 number
- .toBeLessThan(number) 检查值 小于 number
- .toBeLessThanOrEqual(number) 检查值 小于等于 number

# enzyme > Shallow

### 选择器方法

- .find(selector) => ShallowWrapper
- .filter(selector) => ShallowWrapper
- .children([selector]) => ShallowWrapper
- .childAt(index) => ShallowWrapper
- .at(index) => ShallowWrapper
- get(index) => ReactElement
    返回一个react node，要测试它，得重新渲染。
- .first() => ShallowWrapper
- .last() => ShallowWrapper

### 懒人判断方法

- .contains(nodeOrNodes) => Boolean 精确匹配
- .containsAllMatchingElements(nodes) => Boolean 模糊匹配
- .equals(node) => Boolean 
- .exists([selector]) => Boolean
- .hasClass(className) => Boolean
- .is(selector) => Boolean
- .some(selector) => Boolean
- .every(selector) => Boolean

### 组件方法
- .key() => String
- .state([key]) => Any
- .prop(key) => Any
- .props() => Object
- .text() => String
- .simulate(event[, ...args]) => Self
- .setProps(nextProps[, callback]) => Self
- .setState(nextState[, callback]) => Self
- .render() => CheerioWrapper
- .renderProp(propName)(...args) => ShallowWrapper

### 复合方法

- .forEach(fn) => Self
- .map(fn) => Array<Any>
- .reduce(fn[, initialValue]) => Any
- .slice([begin[, end]]) => ShallowWrapper

### 其他方法
- .shallow([options]) => ShallowWrapper
- .debug([options]) => String
    将Shallow的快照节点打印为字符串,例如: `shallow((<Todo/>)).debug()`
- .dive() 浅渲染当前wrapper中的一个复合子组件 
