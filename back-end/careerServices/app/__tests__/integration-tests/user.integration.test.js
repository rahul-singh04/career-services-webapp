const request = require('supertest');
const app = require('../../../server');


const { userModel } = require('../../models');
const { userService } = require('../../services');
const { userController } = require('../../controllers');
const endpointConfig = require('../../config/endpoint.config');

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
            .get(endpointConfig.employerEndpoint + '/getCandidates')
            .set('x-access-token', authToken)
            .expect(200);
        expect(response.body).toEqual(sampleCandidates);
        expect(userService.getFilteredCandidates).toHaveBeenCalledTimes(1);
    });

    test('should handle error and return status 500', async () => {
        const errorMessage = 'Database connection failed.';
        jest.spyOn(userService, 'getFilteredCandidates').mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .get(endpointConfig.employerEndpoint + '/getCandidates')
            .set('x-access-token', authToken)
            .expect(500);


        expect(response.text).toBe('Failed to fetch candidates');
        expect(userService.getFilteredCandidates).toHaveBeenCalledTimes(2);
    });
});


describe('Integration Test: browseJobs Controller', () => {
    const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzUzZjg1MWE1MTIxMWRmNjU1NDljMSIsImlhdCI6MTY5MDcyNzE1MywiZXhwIjoxNjkwODEzNTUzfQ.a9zktsQ3uSC9ruQMhnJxHOJjvQSzyzDAQyE4AtL409Q`;
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch all jobs and return status 200 with job data', async () => {
        const sampleJobs = [
            {
                _id: '1',
                jobTitle: 'Software Engineer',
                jobDesc: 'Job description goes here.',
                employerID: { username: 'employer1', email: 'employer@example.com', fullName: 'Employer One' },
                companyLocation: 'New York, USA',
                workLocation: 'Remote',
                totalOpenings: 3,
                datePosted: '2023-07-29',
            },
        ];
        jest.spyOn(userService, 'getAllJobs').mockResolvedValue(sampleJobs);
        const response = await request(app).get(endpointConfig.candidateEndpoint + "/browseJobs").set('x-access-token', authToken).expect(200);
        expect(response.body).toEqual(sampleJobs);
        expect(userService.getAllJobs).toHaveBeenCalledTimes(1);
    });

    test('should handle error and return status 500', async () => {
        const errorMessage = 'Database connection failed.';
        jest.spyOn(userService, 'getAllJobs').mockRejectedValue(new Error(errorMessage));
        const response = await request(app).get(endpointConfig.candidateEndpoint + "/browseJobs").set('x-access-token', authToken).expect(500);

        expect(response.text).toBe('Failed to fetch jobs');

        expect(userService.getAllJobs).toHaveBeenCalledTimes(1);
    });
});