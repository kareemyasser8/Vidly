const request = require('supertest')
const { Genre } = require('../../models/genre')
let server


describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index') })
    afterEach(async () => {
        server.close();
        await Genre.remove({})
    })


    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'Genre1' },
                { name: 'Genre2' },
            ])

            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'Genre1')).toBeTruthy()
            expect(res.body.some(g => g.name === 'Genre2')).toBeTruthy()

        })
    })

    describe('GET /:id', () => {
        it('should return the genre with a specific id', async () => {
            const genre = new Genre({ name: 'genre1' })
            await genre.save()

            const res = await request(server).get('/api/genres/' + genre._id)
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        })
    })


    describe('GET /:id', () => {
        it('should return 404 if a valid id is passed', async () => {
            const res = await request(server).get('/api/genres/1')
            expect(res.status).toBe(404);
        })
    })

})