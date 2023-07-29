const { browseCandidates } = require("../controllers").userController
const { userService } = require("../services")
const { userModel } = require("../models")

jest.mock("../services/user-service/user.service", () => ({
    getFilteredCandidates: jest.fn(),
    getAllJobs: jest.fn()
}));

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe("browse all candidates test suite", () => {

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