import React from 'react'
import renderer from 'react-test-renderer'
import renderProps from '.'

const Counter = props => renderProps(props, { count: 1 })
const Component = ({ count }) => <div>{count}</div>
const render = element => renderer.create(element).toJSON()

test('accepts component prop', () => {
  expect(
    render(<Counter component={({ count }) => <div>{count}</div>} />)
  ).toMatchSnapshot()
  expect(render(<Counter component={Component} />)).toMatchSnapshot()
})

test('accepts render prop', () => {
  expect(
    render(<Counter render={({ count }) => <div>{count}</div>} />)
  ).toMatchSnapshot()
  expect(render(<Counter render={Component} />)).toMatchSnapshot()
})

test('accepts children function prop', () => {
  expect(
    render(<Counter>{({ count }) => <div>{count}</div>}</Counter>)
  ).toMatchSnapshot()
  expect(render(<Counter>{Component}</Counter>)).toMatchSnapshot()
})

test('renders component prop above all other props passed to it', () => {
  const createMockComponent = () => jest.fn(props => <Component {...props} />)
  const MockComponent = createMockComponent()
  const RenderComponent = createMockComponent()
  const ChildrenComponent = createMockComponent()

  render(
    <Counter component={MockComponent} render={RenderComponent}>
      {ChildrenComponent}
    </Counter>
  )

  expect(MockComponent).toHaveBeenCalled()
  expect(RenderComponent).not.toHaveBeenCalled()
  expect(ChildrenComponent).not.toHaveBeenCalled()
})

test('renders null if render functions are not passed to component', () => {
  expect(render(<Counter />)).toBeNull()
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
