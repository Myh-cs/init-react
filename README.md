# init-react

react 项目初始化架构，在redux官方购物车demo上修改而来。纯项目相关，没有进行eslint等与开发无关的配置，后续可能会补上（一般就没有后续了）。

## 目录结构

- container 容器组件
- components UI组件
- redux 状态管理相关（只在actions里发请求 所以收缩api到redux目录）
- Layout 布局组件
- locale 国际化语言
- pages 页面组织
- utils 工具
（。。。考虑常量目录）

### 新增路由权限验证code 和 App.js中对国际化 PropTypes的验证
路由鉴权的具体逻辑需结合业务来写 在withAuthority里留有位置和 是否有权限的标记变量 auth

国际化 2.x.x版本不支持直接在formatMessage方法嵌入reactElement，需升级到3.xx版本待商榷*3.xx版本有部分Api变动*。（如有需要暂时只能通过React-intl提供的组件来动态传入reactElement）

### 新增 布局组件结合router 、请求 全局处理、错误全局处理、webpack @到src的映射
jsconfig.json 文件夹是用来 方便vscode在使用‘@’映射到‘src’是保持ctrl加点击转跳和自动补全用的。


--- 
## 技术选型 状态管理选型
 
 

## redux官网demo扩展
### react+redux+redux-thunk

将业务划分模块

每个模块有自己的 reducer

在每个模块自己的文件夹下创建一下：

- actions：业务逻辑，export function 不区分同步异步 在actions文件夹里统一处理
- reducers reducers文件夹里抛出reducer及相关业务处理的纯函数（工具方法）供创建store 和简化actions 处理业务
- actionType 可选 actionType常量定义 一般在actions里使用  reducers里switch case


## 代码分割

```jsx
import Loadable from 'react-loadable';
import Loading from './my-loading-component';
 
const LoadableComponent = Loadable({
  loader: () => import('./my-component'),
  loading: Loading,
});
 
export default class App extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}
```
## 测试

```js
test(`
should only save the three recommended products and show ads 
when user enters the product detail page 
given the user is not a VIP 
`, async () => {
  const action = { payload: { userId: 233 } }
  const store = { credentials: { vipList: [2333] } }
  const recommendedProducts = [product(1), product(2), product(3), product(4)]
  const firstThreeRecommendations = [product(1), product(2), product(3)]
  Api.get = jest.fn().mockImplementations(() => recommendedProducts)
  await testSaga(onEnterProductDetailPage, action, store)
  expect(Api.get).toHaveBeenCalledWith('products/recommended')
  expect(actions.importantActionToSaveRecommendedProducts).toHaveBeenDispatchedWith(firstThreeRecommendations)
  expect(actions.importantActionToFetchAds).toHaveBeenDispatched()
})
```

1. **should** only save the three recommended products and show ads
2. **when** user enters the product detail page
3. **given** the user is not a VIP
---
**component 测试**
```js
import React from 'react'
import { shallow } from 'enzyme'
import ProductsList from './ProductsList'

const setup = props => {
  const component = shallow(
    <ProductsList title={props.title}>{props.children}</ProductsList>
  )

  return {
    component: component,
    children: component.children().at(1),
    h3: component.find('h3')
  }
}

describe('ProductsList component', () => {
  it('should render title', () => {
    const { h3 } = setup({ title: 'Test Products' })
    expect(h3.text()).toMatch(/^Test Products$/)
  })

  it('should render children', () => {
    const { children } = setup({ title: 'Test Products', children: 'Test Children' })
    expect(children.text()).toMatch(/^Test Children$/)
  })
})
```
**reducers测试**
```js
import cart from './cart'

describe('reducers', () => {
  describe('cart', () => {
    const initialState = {
      addedIds: [],
      quantityById: {}
    }

    it('should provide the initial state', () => {
      expect(cart(undefined, {})).toEqual(initialState)
    })

    it('should handle CHECKOUT_REQUEST action', () => {
      expect(cart({}, { type: 'CHECKOUT_REQUEST' })).toEqual(initialState)
    })

    it('should handle CHECKOUT_FAILURE action', () => {
      expect(cart({}, { type: 'CHECKOUT_FAILURE', cart: 'cart state' })).toEqual('cart state')
    })

    it('should handle ADD_TO_CART action', () => {
      expect(cart(initialState, { type: 'ADD_TO_CART', productId: 1 })).toEqual({
        addedIds: [ 1 ],
        quantityById: { 1: 1 }
      })
    })

    describe('when product is already in cart', () => {
      it('should handle ADD_TO_CART action', () => {
        const state = {
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 1 }
        }

        expect(cart(state, { type: 'ADD_TO_CART', productId: 2 })).toEqual({
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 2 }
        })
      })
    })
  })
})

```

## 国际化


```js

import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import zh_CN from './locale/zh_CN';
import en_US from './locale/en_US.js';
import { connect } from 'react-redux';
addLocaleData([...zh, ...en]);

const Locale = ({ locale, localeMessage, children }) => {
  return (
    <IntlProvider key={locale} locale={locale} messages={localeMessage} >
      {children}
    </IntlProvider>
  )
}
const chooseLocale = (val) => {
  let _val = val || navigator.language.split('_')[0];
  switch (_val) {
    case 'en':
      return en_US;
    case 'zh':
      return zh_CN;
    default:
      return en_US;
  }
}

const mapStateToProps = (state) => ({
  locale: state.root.language,
  localeMessage: chooseLocale(state.root.language)
});

export default connect(mapStateToProps)(Locale);
```

使用

```js

import React from 'react'
import { FormattedMessage } from 'react-intl';
import { changeLang } from '../actions';


const App = ({ changeLang }) => (
  <div>
    <FormattedMessage id='name' values={{
      name: <button onClick={changeLang} > {'国际化'}</button>
    }} />
    <FormattedMessage id="hello" tagName="p" />
    <FormattedMessage id='hello'>
      {(txt) => (
        <input type="button"value={txt} />
      )}
    </FormattedMessage>
  </div>
)

export default connect(() => ({}), { changeLang })(App)
```

api调用方式 

[github文档](https://github.com/formatjs/react-intl/blob/master/docs/API.md#injectintl-hoc)
```js
import { injectIntl, intlShape } from 'react-intl';
export default class MyComponent extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }
  render () {
      const { intl: { formatMessage } } = this.props
      const title = formatMessage({id:'app'});
      const content = formatMessage({id:'Myapp'});
      // formatMessage() => string
      
      return (
          <div>
           ....
          </div>
       );
}

export default injectIntl(MyComponent);

```
