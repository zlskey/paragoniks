import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  rules: {
    'node/prefer-global/process': ['off'],
    'node/prefer-global/buffer': ['off'],
    'ts/no-use-before-define': ['off'],
    'ts/ban-ts-comment': ['off'],
    'ts/no-namespace': ['off'],
    'no-console': ['off'],
  },
  ignores: ['./src/migrations/**/*'],
})
