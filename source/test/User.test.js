import User from '../scripts/User';

const user = new User('abcdef123456789');
user.name = 'Alex';
user.email = 'zhmeng@ucsd.edu';
user.linkedIn = 'linkedin.com';
user.website = 'alexm.com';
user.addSkill('Java');
user.addSkill('Python');

/**
 * Test website is set
 */
test("Website is 'alexm.com'", () => {
  expect(user.website).toBe('alexm.com');
})

/**
 * Test website can be set
 */
test("Website changed to 'alexmeng.com'", () => { 
  user.website = 'alexmeng.com';
  expect(user.website).toBe('alexmeng.com');
})

/**
 * Test addSkill() method.
 */
test("Add 'C++' to skills", () => {
  user.addSkill('C++');
  expect(user.skills.has('C++')).toBe(true);
})

/**
 * Test deleteSkill() method.
 */
 test("Delete 'Java' from skills", () => {
  user.deleteSkill('Java');
  expect(user.skills.has('Java')).toBe(false);
})
