/* eslint-disable no-undef */
describe('Basic user flow for Job Buddy website', () => {
  // First, visit our website
  beforeAll(async () => {
    await page.goto('https://cse110-fa22-group24.github.io/cse110-fa22-group24/')
  })

  it('Check that the job list is initially empty', async () => {
    console.log('Checking for empty job list...')

    const numApplications = await page.$$eval('job-details', (jobElements) => {
      return jobElements.length
    })
    expect(numApplications).toBe(0)
  })

  it('Test the create CRUD functionality', async () => {
    console.log('Checking create...')

    const newButton = await page.$('#new-app-button')
    await newButton.click()
    await page.type('#company', 'Microsoft')
    await page.type('#position', 'Product Manager')
    await page.type('#location', 'San Diego')
    await page.select('#status', 'Applying')
    await page.type('#deadline', '12082022')
    await page.keyboard.press('ArrowRight')
    await page.type('#deadline', '1159p')
    const submitButton = await page.$('button[type="submit"]')
    await submitButton.click()

    const numApplications = await page.$$eval('job-details', (jobElements) => {
      return jobElements.length
    })
    expect(numApplications).toBe(1)
  }, 10000)

  it('Test refresh after create', async () => {
    console.log('Checking that job application is still present after refresh...')

    await page.reload()

    const numApplications = await page.$$eval('job-details', (jobElements) => {
      return jobElements.length
    })
    expect(numApplications).toBe(1)
  })

  it('Test the read CRUD functionality', async () => {
    console.log('Checking read...')

    const firstJob = await page.$('job-details')
    const firstJobShadow = await firstJob.getProperty('shadowRoot')
    const firstJobSummary = await firstJobShadow.$('summary')
    await firstJobSummary.click()
    const company = await firstJobShadow.$('#company')
    const companyText = await page.evaluate(company => company.textContent, company)
    const position = await firstJobShadow.$('#title')
    const positionText = await page.evaluate(position => position.textContent, position)
    const location = await firstJobShadow.$('#location')
    const locationText = await page.evaluate(location => location.textContent, location)
    const status = await firstJobShadow.$('#status')
    const statusText = await page.evaluate(status => status.textContent, status)
    const deadline = await firstJobShadow.$('#deadline-date')
    const deadlineText = await page.evaluate(deadline => deadline.textContent, deadline)
    const deadlineTime = await firstJobShadow.$('#deadline-time')
    const deadlineTimeText = await page.evaluate(deadlineTime => deadlineTime.textContent, deadlineTime)

    expect(companyText).toBe('Microsoft')
    expect(positionText).toBe('Product Manager')
    expect(locationText).toBe('San Diego')
    expect(statusText).toBe('Status: Applying')
    expect(deadlineText).toBe('12/8/22')
    expect(deadlineTimeText).toBe('11:59 PM')

    const numApplications = await page.$$eval('job-details', (jobElements) => {
      return jobElements.length
    })
    expect(numApplications).toBe(1)
  })

  it('Test the update CRUD functionality', async () => {
    console.log('Checking update...')

    const firstJob = await page.$('job-details')
    const firstJobShadow = await firstJob.getProperty('shadowRoot')
    const updateButton = await firstJobShadow.$('#edit')
    await updateButton.click()
    await page.click('#company')
    for (let i = 0; i < 9; i++) {
      await page.keyboard.press('Backspace')
    }
    await page.type('#company', 'IBM')
    const submitButton = await page.$('button[type="submit"]')
    await submitButton.click()

    const numApplications = await page.$$eval('job-details', (jobElements) => {
      return jobElements.length
    })
    expect(numApplications).toBe(1)

    const company = await firstJobShadow.$('#company')
    const companyText = await page.evaluate(company => company.textContent, company)
    expect(companyText).toBe('IBM')
  })

  it('Test refresh after update', async () => {
    console.log('Checking that job application is still updated after refresh...')

    await page.reload()
    const numApplications = await page.$$eval('job-details', (jobElements) => {
      return jobElements.length
    })
    expect(numApplications).toBe(1)

    const firstJob = await page.$('job-details')
    const firstJobShadow = await firstJob.getProperty('shadowRoot')
    const company = await firstJobShadow.$('#company')
    const companyText = await page.evaluate(company => company.textContent, company)
    expect(companyText).toBe('IBM')
  })

  it('Test the delete CRUD functionality', async () => {
    console.log('Checking delete...')

    const firstJob = await page.$('job-details')
    const firstJobShadow = await firstJob.getProperty('shadowRoot')
    const firstJobSummary = await firstJobShadow.$('summary')
    await firstJobSummary.click()
    const deleteButton = await firstJobShadow.$('#delete')
    await deleteButton.click()
    const confirmDeleteButton = await page.$('button[id="delete-submit"]')
    await confirmDeleteButton.click()

    const numApplications = await page.$$eval('job-details', (jobElements) => {
      return jobElements.length
    })
    expect(numApplications).toBe(0)
  })

  it('Test refresh after delete', async () => {
    console.log('Checking that job application is still deleted after refresh...')

    await page.reload()

    const numApplications = await page.$$eval('job-details', (jobElements) => {
      return jobElements.length
    })
    expect(numApplications).toBe(0)
  })
})
