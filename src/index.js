import React from 'react'

export default function renderProps(props, newProps) {
  if (!isObject(props)) {
    throw new Error('Must supply truthy component props')
  }

  if (props.component) {
    return React.createElement(props.component, newProps)
  }
  if (props.render) {
    return props.render(newProps)
  }
  if (props.children) {
    if (typeof props.children === 'function') {
      return props.children(newProps)
    }
    if (React.Children.count(props.children) > 0) {
      return React.Children.only(props.children)
    }
    return null
  }
  return null
}

function isObject(obj) {
  return obj !== null && !Array.isArray(obj) && typeof obj === 'object'
}
