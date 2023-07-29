const { browseCandidates, browseJobs, getUserProfile } = require("../controllers").userController
const { userService } = require("../services")

jest.mock("../services/user-service/user.service", () => ({
    getFilteredCandidates: jest.fn(),
    getAllJobs: jest.fn(),
    browseJobs: jest.fn(),
    getUserProfile: jest.fn()
}));

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe("browse candidates", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch filtered candidates and respond with status 200', async () => {
        const sampleCandidates = [{ _id: '1', name: 'vikk' }, { _id: '2', name: 'test-dev' }];
        userService.getFilteredCandidates.mockResolvedValue(sampleCandidates);

        const req = {};
        const res = mockResponse();

        await browseCandidates(req, res);

        expect(userService.getFilteredCandidates).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(sampleCandidates);
    });

    test('should handle error and respond with status 500', async () => {
        const errorMessage = 'Database connection failed.';
        userService.getFilteredCandidates.mockRejectedValue(new Error(errorMessage));

        const req = {};
        const res = mockResponse();

        await browseCandidates(req, res);

        expect(userService.getFilteredCandidates).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Failed to fetch candidates');
    });
})

describe('Get all jobs', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch all jobs and respond with status 200', async () => {
        // Mock the userService.getAllJobs function to return sample job data
        const sampleJobs = [
            {
                _id: '1',
                jobTitle: 'Software Engineer',
                jobDesc: 'Job description goes here.',
                fullName: 'John Doe',
                companyLocation: 'New York, USA',
                workLocation: 'Remote',
                totalOpenings: 5,
                datePosted: '2023-07-29',
                employerID: {
                    username: 'john_doe',
                    email: 'john@example.com',
                    fullName: 'John Doe',
                },
            },
        ];
        userService.getAllJobs.mockResolvedValue(sampleJobs);

        const req = {};
        const res = mockResponse();

        await browseJobs(req, res);

        expect(userService.getAllJobs).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(sampleJobs);
    });

    test('should handle error and respond with status 500', async () => {
        // Mock the userService.getAllJobs function to throw an error
        const errorMessage = 'Database connection failed.';
        userService.getAllJobs.mockRejectedValue(new Error(errorMessage));

        const req = {};
        const res = mockResponse();

        await browseJobs(req, res);

        expect(userService.getAllJobs).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Failed to fetch jobs');
    });
});


describe('Get UserProfile', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch user profile and respond with status 200', async () => {
        const sampleProfile = {
            _id: '1',
            username: 'john_doe',
            email: 'john@example.com',
            fullName: 'John Doe',
        };
        userService.getUserProfile.mockResolvedValue(sampleProfile);

        const req = {
            headers: {
                'x-access-token': 'sample-access-token',
            },
        };
        const res = mockResponse();

        await getUserProfile(req, res);

        expect(userService.getUserProfile).toHaveBeenCalledTimes(1);
        expect(userService.getUserProfile).toHaveBeenCalledWith('sample-access-token');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(sampleProfile);
    });

    test('should handle error and respond with status 500', async () => {
        const errorMessage = 'Database connection failed.';
        userService.getUserProfile.mockRejectedValue(new Error(errorMessage));

        const req = {
            headers: {
                'x-access-token': 'invalid-access-token',
            },
        };
        const res = mockResponse();

        await getUserProfile(req, res);

        expect(userService.getUserProfile).toHaveBeenCalledTimes(1);
        expect(userService.getUserProfile).toHaveBeenCalledWith('invalid-access-token');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Failed to fetch profile');
    });
});