import * as React from 'react'

export default function renderProps<P, R>(
  props: P,
  renderProps: R
): React.ReactNode

export type SharedRenderProps<P> = {
  component?: React.ComponentType<P>
  render?(props: P): React.ReactNode
  children?: ((props: P) => React.ReactNode) | React.ReactNode
}
