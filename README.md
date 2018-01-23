# @macklinu/render-props

> A helper function to support various React render prop use cases

[![npm](https://img.shields.io/npm/v/@macklinu/render-props.svg)](https://npm.im/@macklinu/render-props)
[![Build Status](https://travis-ci.org/macklinu/render-props.svg?branch=master)](https://travis-ci.org/macklinu/render-props)
[![license](https://img.shields.io/github/license/macklinu/render-props.svg)](https://github.com/macklinu/render-props/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Motivation](#motivation)
* [Installation](#installation)
* [Example](#example)
* [Usage](#usage)
* [API Reference](#api-reference)
  * [`renderProps(props: Object, newProps: Object): ReactElement`](#renderpropsprops-object-newprops-object-reactelement)
* [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Motivation

If you're building React components using [render props](https://reactjs.org/docs/render-props.html), this library aims to simplify various render prop use cases.

## Installation

```
npm install @macklinu/render-props
```

## Example

See [this CodeSandbox](https://codesandbox.io/s/zw08xmk5yl) for an in-browser example.

See [`src/types/example.tsx`](https://github.com/macklinu/render-props/blob/master/types/example.tsx) for a TypeScript example and using the provided TypeScript types.

## Usage

Let's build a `Counter` component using a traditional render prop.

```js
import React from 'react'

class Counter extends React.Component {
  state = { count: 0 }

  render() {
    return this.props.render({
      count: this.state.count,
      increment: this.increment,
      decrement: this.decrement,
    })
  }

  increment = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }

  decrement = () => {
    this.setState(prevState => ({ count: prevState.count - 1 }))
  }
}
```

This works well if you only support a `render` prop function:

```js
<Counter
  render={props => (
    <div>
      <span>{props.count}</span>
      <button onClick={props.decrement}>-</button>
      <button onClick={props.increment}>+</button>
    </div>
  )}
/>
```

But what if you want to use a prop [other than `render`](https://reactjs.org/docs/render-props.html#using-props-other-than-render)? For example, a `children` function prop is popular alternative to `render`:

```js
<Counter>
  {props => (
    <div>
      <span>{props.count}</span>
      <button onClick={props.decrement}>-</button>
      <button onClick={props.increment}>+</button>
    </div>
  )}
</Counter>
```

This is where `@macklinu/render-props` comes into play. It allows render props named `component`, `render`, and `children` (in that order), making it simpler for your React components to support common render prop APIs.

```js
import React from 'react'
import renderProps from '@macklinu/render-props'

class Counter extends React.Component {
  state = { count: 0 }

  render() {
    return renderProps(this.props, {
      count: this.state.count,
      increment: this.increment,
      decrement: this.decrement,
    })
  }

  increment = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }

  decrement = () => {
    this.setState(prevState => ({ count: prevState.count - 1 }))
  }
}
```

And now you can use all cases:

```js
<div>
  <Counter
    component={props => (
      <div>
        <h2>
          Using the <code>component</code> prop
        </h2>
        <span>{props.count}</span>
        <button onClick={props.decrement}>-</button>
        <button onClick={props.increment}>+</button>
      </div>
    )}
  />
  <Counter
    render={props => (
      <div>
        <h2>
          Using the <code>render</code> prop
        </h2>
        <span>{props.count}</span>
        <button onClick={props.decrement}>-</button>
        <button onClick={props.increment}>+</button>
      </div>
    )}
  />
  <Counter>
    {props => (
      <div>
        <h2>
          Using the <code>children</code> prop
        </h2>
        <span>{props.count}</span>
        <button onClick={props.decrement}>-</button>
        <button onClick={props.increment}>+</button>
      </div>
    )}
  </Counter>
</div>
```

## API Reference

### `renderProps(props: Object, newProps: Object): ReactElement`

* `props`: The [`props`](https://reactjs.org/docs/react-component.html#props) object from a React component
* `newProps`: The props object passed into the render prop function (`component`, `render`, or `children`), which can be used by consumer components for rendering a React element.

Returns the React element returned from the `component`, `render`, or `children` prop. If none of those props are provided, returns `null`.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/2344137?v=4" width="100px;"/><br /><sub><b>Macklin Underdown</b></sub>](http://macklin.underdown.me)<br />[💻](https://github.com/macklinu/render-props/commits?author=macklinu "Code") [📖](https://github.com/macklinu/render-props/commits?author=macklinu "Documentation") [⚠️](https://github.com/macklinu/render-props/commits?author=macklinu "Tests") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
