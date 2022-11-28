import User from "../scripts/User";
import CoverLetter from '../scripts/CoverLetter';
import CoverLetterTag from '../scripts/CoverLetterTag';
import Experience from '../scripts/Experience';
import ExperienceTag from '../scripts/ExperienceTag';
import JobApplication from '../scripts/JobApplication';
import JobAppTag from '../scripts/JobAppTag';

const user1 = new User("user1"); 

const cl = new CoverLetter("cl1", "Generic Cover Letter", "This is the content of my cover letter", "user1");

const exp = new Experience("exp1");
exp.title = 'SDE';
exp.start = new Date(2022, 6-1, 1);
exp.end = new Date(2022, 9-1, 1);
exp.description = 'web dev';

const jobApp1 = new JobApplication('jobApp1');
jobApp1.title = 'SDE';
jobApp1.description = 'web dev';
jobApp1.portalURL = 'xyz.com';
jobApp1.location = 'Seattle';
jobApp1.status = 'Interview 1';
jobApp1.notes = '';
jobApp1.contact = '123';
jobApp1.deadline = new Date(2022, 12-1, 8);
jobApp1.company = 'Amazon';
jobApp1.portalUser = 'Alex';
jobApp1.portalPass = 'xyz';

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

/**
 * Test job application tag constructed properly
 */
 test("Job application tag constructed properly", () => { 
    const jobAppT = new JobAppTag("jobAppT1", "SWE", "jobApp1");
    expect(jobAppT.id).toBe('jobAppT1');
    expect(jobAppT.title).toBe('SWE');
    expect(jobAppT.jobAppId).toBe('jobApp1');
  })