# Member Attendance
- [x]  Jessalyn Wang
- [x]  Eric Ko
- [x]  Hyak Khulyan
- [x]  Isabelle Krochmal
- [x]  Jessalyn Wang
- [x]  Lemin Jin
- [x]  Pierre Beurtheret
- [x]  Qingxin Li
- [x]  Zhouyang Meng
- [x] Sri Gangavarapu

# Sprint Review Meeting Notes

- Jessalyn Wang
  - Helped create API layer for job applications and CRUD functions with Alex
  - Worked on integrating the frontend and backend, functionality is combined so frontend works with indexedDB
  - Simple sorting algorithm
- Lemin Jin
  - HTML and CSS for entire page, sort bars, layout, integration of summary bar into main page
  - Template for sort bars and their interactions
- Isabelle Krochmal
  - Integrating custom component for job details form into website
  - Worked as part of a group on update feature
  - Added indicators for required fields
  - Created dropdown for status field
- Hyak Khulyan
  - Created backend classes
  - Wrote tests for new classes
  - Reviewed and approved pull requests
  - [Backend classes #59](https://github.com/cse110-fa22-group24/cse110-fa22-group24/pull/59)
- Eric Ko
  - Worked with frontend team on style
  - Added some styles to the page
  - Added profile button
  - Edited team status video
- Sri Gangavarapu
  - Worked with frontend team on interface for application
- Pierre Beurtheret
  - Implemented all frontend CRUD functionality
  - Worked on styles and layout for all frontend elements
  - Added documentation and comments for all frontend JS code
- Zhouyang Meng
  - Worked with Jessalyn on backend API layer
  - Added CRUD functionality
  - Wrote tests for backend API
  - [Create CRUD functionality for Job Application #49](https://github.com/cse110-fa22-group24/cse110-fa22-group24/issues/49)
- Qingxin Li
  - Working on backend classes and tag class
  - Worked on User Centered Thinking document

# Screen Captures

## Backend

![image](https://user-images.githubusercontent.com/97627312/204437254-5c6dc4c6-a0ec-467c-8f23-1be7ddc59b17.png)

![image](https://user-images.githubusercontent.com/97627312/204444494-d328b6ab-b5e5-4682-8f27-2fae8f87b70b.png)

[Tags.test.js](https://github.com/cse110-fa22-group24/cse110-fa22-group24/blob/5f37a68dded451ac3b0173c8411e645a6875b22d/source/test/Tags.test.js)
snippet:
```js
/**
 * Test cover letter tag constructed properly
 */
test("Cover letter tag constructed properly", () => { 
  const clT = new CoverLetterTag("clt1", "SWE", "cl1");
  expect(clT.id).toBe('clt1');
  expect(clT.title).toBe('SWE');
  expect(clT.coverLetterId).toBe('cl1');
})


/**
 * Test experience tag constructed properly
 */
test("Experience tag constructed properly", () => { 
  const expT = new ExperienceTag("expT1", "SDE", "exp1");
  expect(expT.id).toBe('expT1');
  expect(expT.title).toBe('SDE');
  expect(expT.experienceId).toBe('exp1');
})
```

## Frontend

![image](https://user-images.githubusercontent.com/97627312/204445637-4e93deb0-4b7c-45cc-bc89-d20a17919a12.png)

![image](https://user-images.githubusercontent.com/97627312/204445911-ce72df48-2702-4644-9314-1899b49686cc.png)

![image](https://user-images.githubusercontent.com/97627312/204446086-f1dd3eb4-8c21-4960-85f4-064f65ecf941.png)

![image](https://user-images.githubusercontent.com/97627312/204446281-72e8b7a1-56cb-4196-9f2e-882abb266d8c.png)

