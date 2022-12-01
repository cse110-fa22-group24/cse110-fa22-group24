import JobApplication from '../scripts/JobApplication'

const jobApp = new JobApplication('fedcba987654321')
jobApp.title = 'SDE'
jobApp.description = 'web dev'
jobApp.portalURL = 'xyz.com'
jobApp.location = 'Seattle'
jobApp.status = 'Interview 1'
jobApp.notes = ''
jobApp.contact = '123'
jobApp.deadline = new Date(2022, 12 - 1, 8)
jobApp.company = 'Amazon'
jobApp.portalUser = 'Alex'
jobApp.portalPass = 'xyz'

/**
 * Test location is set
 */
test("Location is 'Seattle'", () => {
  expect(jobApp.location).toBe('Seattle')
})

/**
 * Test location can be set
 */
test("Location changed to 'Boston'", () => {
  jobApp.location = 'Boston'
  expect(jobApp.location).toBe('Boston')
})

/**
 * Test deadline is set
 */
test("Deadline is '12/8/2022'", () => {
  expect(jobApp.deadline.toLocaleDateString()).toBe('12/8/2022')
})

/**
 * Test deadline can be set
 */
test("Deadline changed to '12/16/2022'", () => {
  jobApp.deadline = new Date(2022, 12 - 1, 16)
  expect(jobApp.deadline.toLocaleDateString()).toBe('12/16/2022')
})
