const request = require('supertest');
const app = require('../server');

describe('Test API endpoints', () => {
  it('should get list of blogs', async () => {
    const response = await request(app).get('/api/blogs');
    expect(response.status).toBe(200);
  });

  it('should get a specific blog', async () => {
    const response = await request(app).get('/api/blog/658f528041a4b377d7917ed5');
    expect(response.status).toBe(200);
  });
  it('should delete a specific blog', async () => {
    const response = await request(app).delete('/api/blog/658f528041a4b377d7917ed5')
    .set('Authorization', `TOKEN`)
    expect(response.status).toBe(200);
  });
  it('should create a  blog', async () => {
    const response = await request(app).post('/api/blog')
    .set('Authorization', `TOKEN`)
    .send({ title: 'blog title', content: 'blog content',auther:'blog auther' });
    expect(response.status).toBe(200);
  });
  it('should update a  blog', async () => {
    const response = await request(app).put('/api/blog/658f528041a4b377d7917ed5')
    .set('Authorization', `TOKEN`)
    .send({ title: 'update blog title', content: 'update blog content',auther:'update blog auther' });
    expect(response.status).toBe(200);
  });
});