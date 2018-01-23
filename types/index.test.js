import path from 'path'
import { check } from 'typings-tester'

test('TypeScript types compile', () => {
  expect(() =>
    check(
      [path.join(__dirname, 'example.tsx')],
      path.join(__dirname, 'tsconfig.json')
    )
  ).not.toThrow()
})
