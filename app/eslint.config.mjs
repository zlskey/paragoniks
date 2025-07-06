import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'node/prefer-global/process': ['off'],
    'import/no-default-export': ['off'],
    'ts/no-empty-object-type': ['off'],
    'ts/no-use-before-define': ['off'],
    'ts/no-require-imports': ['off'],
    'no-empty-pattern': ['off'],
    'no-console': ['off'],
  },
})
