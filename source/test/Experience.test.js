import Experience from '../scripts/Experience'
// const Experience = require('../scripts/Experience')

const exp = new Experience('123456789abcdef')
exp.title = 'SDE'
exp.start = new Date(2022, 6 - 1, 1)
exp.end = new Date(2022, 9 - 1, 1)
exp.description = 'web dev'

/**
 * Test title is set
 */
test("Title is 'SDE'", () => {
  expect(exp.title).toBe('SDE')
})

/**
 * Test title can be set
 */
test("Title changed to 'MLE'", () => {
  exp.title = 'MLE'
  expect(exp.title).toBe('MLE')
})

/**
 * Test start date is set
 */
test("Start date is '6/1/2022'", () => {
  expect(exp.start.toLocaleDateString()).toBe('6/1/2022')
})

/**
 * Test start date can be set
 */
test("start date changed to '6/15/2022'", () => {
  exp.start = new Date(2022, 5, 15)
  expect(exp.start.toLocaleDateString()).toBe('6/15/2022')
})
