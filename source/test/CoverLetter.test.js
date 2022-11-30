import CoverLetter from '../scripts/CoverLetter'

/**
 * Test cover letter is constructed properly
 */
test('Cover letter constructed properly', () => {
  const cl = new CoverLetter('cl1', 'Generic Cover Letter', 'This is the content of my cover letter', 'user1')

  expect(cl.id).toBe('cl1')
  expect(cl.title).toBe('Generic Cover Letter')
  expect(cl.content).toBe('This is the content of my cover letter')
  expect(cl.userId).toBe('user1')
})
