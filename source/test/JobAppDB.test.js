import DBUtil from '../scripts/JobAppDB'

// Disable console logging
console.log = () => {}

const database = new DBUtil()

test('Set up database', async () => {
  try {
    await database.setupDB()
  } catch {
    console.log('error setting up db')
  }
})

test('Mock data 1', async () => {
  const mockData = {
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

  try {
    await database.setupDB()
  } catch {
    console.log('error setting up db')
  }

  try {
    await database.addJob(mockData)
    console.log('added:', mockData)
  } catch {
    console.log('error adding job')
  }
})

test('Mock data 2', async () => {
  const mockData2 = {
    id: 2,
    company: 'Microsoft',
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

  try {
    await database.addJob(mockData2)
    console.log('added:', mockData2)
  } catch {
    console.log('error adding job')
  }

  try {
    console.log('result of get', await database.getJob(2))
  } catch {
    console.log('error getting job')
  }
})

test('Mock data 3', async () => {
  const mockData3 = {
    id: 2,
    company: 'Facebook',
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

  try {
    await database.updateJob(mockData3)
    console.log('updating job 2 to:', mockData3)
  } catch {
    console.log('error updating job')
  }

  try {
    console.log('result of get after update', await database.getJob(2))
  } catch {
    console.log('error getting job')
  }

  try {
    console.log('result of getAll', await database.getAllJobs())
  } catch {
    console.log('error getting all')
  }

  try {
    console.log('result of get after update', await database.deleteJob(2))
  } catch {
    console.log('error getting job')
  }

  try {
    console.log('result of getAll', await database.getAllJobs())
  } catch {
    console.log('error getting all after delete')
  }
})
