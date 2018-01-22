import React from 'react'
import renderer from 'react-test-renderer'
import renderProps from '.'

const Counter = props => renderProps(props, { count: 1 })

test('accepts component prop', () => {
  const Component = ({ count }) => <div>{count}</div>

  expect(render(<Counter component={Component} />)).toMatchSnapshot()
})

test('accepts render prop', () => {
  expect(
    render(<Counter render={({ count }) => <div>{count}</div>} />)
  ).toMatchSnapshot()
})

test('accepts children function prop', () => {
  expect(
    render(<Counter>{({ count }) => <div>{count}</div>}</Counter>)
  ).toMatchSnapshot()
})

test('renders component prop above all other props passed to it', () => {
  const Component = ({ count }) => <div>{count}</div>
  const MockComponent = jest.fn(props => <Component {...props} />)
  const RenderComponent = jest.fn(props => <Component {...props} />)
  const ChildrenComponent = jest.fn(props => <Component {...props} />)

  render(
    <Counter component={MockComponent} render={RenderComponent}>
      {ChildrenComponent}
    </Counter>
  )

  expect(MockComponent).toHaveBeenCalled()
  expect(RenderComponent).not.toHaveBeenCalled()
  expect(ChildrenComponent).not.toHaveBeenCalled()
})

test('throws if no component props are passed', () => {
  const InvalidComponent = _props => renderProps(null, { any: 'any' })

  expect(() => render(<InvalidComponent />)).toThrowErrorMatchingSnapshot()
})

test('throws if no new props are passed', () => {
  const InvalidComponent = props => renderProps(props)

  expect(() => render(<InvalidComponent />)).toThrowErrorMatchingSnapshot()
})

test('throws if component props is truthy but not an object', () => {
  const InvalidComponent = _props => renderProps('nope', { any: 'any' })

  expect(() => render(<InvalidComponent />)).toThrowErrorMatchingSnapshot()
})

test('throws if new props are truthy but not an object', () => {
  const InvalidComponent = props => renderProps(props, 'nope')

  expect(() => render(<InvalidComponent />)).toThrowErrorMatchingSnapshot()
})

function render(element) {
  return renderer.create(element).toJSON()
}
