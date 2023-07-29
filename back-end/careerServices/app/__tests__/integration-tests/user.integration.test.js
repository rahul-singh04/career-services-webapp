const request = require('supertest');
const app = require('../../../server');


const { userModel } = require('../../models');
const { userService } = require('../../services');
const { userController } = require('../../controllers');

describe('Integration Tests: Controller and Service', () => {
    const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzU4OTJjMDM0ZDMyNzRmY2ZiOWEyOSIsImlhdCI6MTY5MDY2NzMwOSwiZXhwIjoxNjkwNzUzNzA5fQ.1daozVjG49eZ0PTLJp8Dtp-rdaotckgQfjEJL2LqeMI`;
    beforeEach(() => {
    });

    afterEach(() => {
    });

    test('should browse candidates and return status 200 with candidate data', async () => {
        const sampleCandidates = [{ _id: '1', name: 'Vikk' }, { _id: '2', name: 'dev-employeer' }];
        jest.spyOn(userService, 'getFilteredCandidates').mockResolvedValue(sampleCandidates);
        const response = await request(app)
            .get('/api/test/employer/getCandidates')
            .set('x-access-token', authToken)
            .expect(200);
        expect(response.body).toEqual(sampleCandidates);
        expect(userService.getFilteredCandidates).toHaveBeenCalledTimes(1);
    });

    test('should handle error and return status 500', async () => {
        const errorMessage = 'Database connection failed.';
        jest.spyOn(userService, 'getFilteredCandidates').mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .get('/api/test/employer/getCandidates')
            .set('x-access-token', authToken)
            .expect(500);


        expect(response.text).toBe('Failed to fetch candidates');
        expect(userService.getFilteredCandidates).toHaveBeenCalledTimes(2);
    });
});