import request from 'supertest'
import app from '../../../src/main/config/app'

describe('Content type middleware', () => {
  test('should return JSON as default content type', async () => {
    app.get('/test-content-type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/test-content-type')
      .expect('content-type', /json/)
  })

  test('should return XML as content type when forced', async () => {
    app.get('/test-content-type-xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/test-content-type-xml')
      .expect('content-type', /xml/)
  })
})
