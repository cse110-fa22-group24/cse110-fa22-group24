import DBUtil from '../scripts/JobAppDB'
const db = new DBUtil()

test('indexedDB set up correctly', async () => {
  await db.setupDB()
  expect(db).not.toEqual(null)
})

test('add/get job correctly', async () => {
  const mockData = {
    id: 1,
    company: 'Amazon',
    title: 'SDE I',
    description: '',
    portalURL: '',
    location: '',
    status: '',
    notes: '',
    contact: '',
    deadline: '',
    portalUser: '',
    portalPass: ''
  }
  await db.setupDB()
  await db.addJob(mockData)
  const result = await db.getJob(1)
  expect(result).toEqual(mockData)
})

test('update job correctly', async () => {
  const mockData = {
    id: 1,
    company: 'Amazon',
    title: 'SDE I',
    description: '',
    portalURL: '',
    location: '',
    status: '',
    notes: '',
    contact: '',
    deadline: '',
    portalUser: '',
    portalPass: ''
  }
  const mockDataUpdate = {
    id: 1,
    company: 'Amazon',
    title: 'SDE II',
    description: '',
    portalURL: '',
    location: '',
    status: '',
    notes: '',
    contact: '',
    deadline: '',
    portalUser: '',
    portalPass: ''
  }
  await db.setupDB()
  await db.addJob(mockData)
  const job = await db.getJob(1)
  const title = job.title
  expect(title).toEqual('SDE I')

  await db.updateJob(mockDataUpdate)
  const jobUpdate = await db.getJob(1)
  const titleUpdate = jobUpdate.title
  expect(titleUpdate).toEqual('SDE II')
})

test('get all jobs correctly', async () => {
  const mockData = {
    id: 1,
    company: 'Amazon',
    title: 'SDE I',
    description: '',
    portalURL: '',
    location: '',
    status: '',
    notes: '',
    contact: '',
    deadline: '',
    portalUser: '',
    portalPass: ''
  }
  const mockDataTwo = {
    id: 2,
    company: 'Google',
    title: 'SDE II',
    description: '',
    portalURL: '',
    location: '',
    status: '',
    notes: '',
    contact: '',
    deadline: '',
    portalUser: '',
    portalPass: ''
  }
  await db.setupDB()
  await db.addJob(mockData)
  await db.addJob(mockDataTwo)

  const jobs = await db.getAllJobs()
  expect(jobs.length).toEqual(2)
  expect(jobs[0]).toEqual(mockData)
  expect(jobs[1]).toEqual(mockDataTwo)
})

test('delete job correctly', async () => {
  const mockData = {
    id: 1, 
    company: 'Amazon',
    title: 'SDE I',
    description: '',
    portalURL: '',
    location: '',
    status: '',
    notes: '',
    contact: '',
    deadline: '',
    portalUser: '',
    portalPass: ''
  }
  const mockDataTwo = {
    id: 2,
    company: 'Google',
    title: 'SDE II',
    description: '',
    portalURL: '',
    location: '',
    status: '',
    notes: '',
    contact: '',
    deadline: '',
    portalUser: '',
    portalPass: ''
  }
  await db.setupDB()
  await db.addJob(mockData)
  await db.addJob(mockDataTwo)
  await db.deleteJob(1)
  const jobs = await db.getAllJobs()
  expect(jobs.length).toEqual(1)
  expect(jobs[0]).toEqual(mockDataTwo)
})