import * as React from 'react'
import renderProps, { SharedRenderProps } from '.'

type Props = {
  initialCount: number
} & SharedRenderProps<RenderProps>

type State = {
  count: number
}

type RenderProps = {
  count: number
  increment: () => void
  decrement: () => void
}

class Counter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      count: props.initialCount,
    }
  }
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

function renderAll() {
  const CounterComponent: React.SFC<RenderProps> = ({
    count,
    increment,
    decrement,
  }) => (
    <div>
      <span>{count}</span>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  )

  return (
    <div>
      <Counter initialCount={10} component={CounterComponent} />
      <Counter
        initialCount={10}
        component={({ count, increment, decrement }) => (
          <div>
            <span>{count}</span>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
          </div>
        )}
      />
      <Counter initialCount={10} render={CounterComponent} />
      <Counter
        initialCount={10}
        render={({ count, increment, decrement }) => (
          <div>
            <span>{count}</span>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
          </div>
        )}
      />
      <Counter initialCount={10}>
        {({ count, increment, decrement }) => (
          <div>
            <span>{count}</span>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
          </div>
        )}
      </Counter>
      <Counter initialCount={10}>{CounterComponent}</Counter>
    </div>
  )
}
