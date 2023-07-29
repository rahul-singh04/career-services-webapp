const { signup } = require("../controllers").authController;
const { authService } = require("../services")


jest.mock("../services/auth-service/auth.service", () => ({
    signup: jest.fn()
}));

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("signup user test suite", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    test("should register a user successfully", async () => {
        const req = {
            body: {
                username: 'vikk-dev-user',
                email: 'vikkdevuser@gmail.com',
                password: '123',
                roles: ['user'],
            },
        };
        const res = mockResponse()
        await signup(req, res);
        expect(authService.signup).toHaveBeenCalledWith(
            'vikk-dev-user',
            'vikkdevuser@gmail.com',
            '123',
            ['user']
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User was registered successfully!' });
    })
    test("controller should throw an error if db create fails", async () => {
        const req = {
            body: {
                username: 'vikk-dev-user',
                email: 'vikkdevuser@gmail.com',
                password: '123',
                roles: ['user'],
            },
        };
        const res = mockResponse()
        const errorMessage = "Failed to register user!";
        authService.signup.mockRejectedValue(new Error(errorMessage))
        await signup(req, res);
        expect(authService.signup).toHaveBeenCalledWith(
            'vikk-dev-user',
            'vikkdevuser@gmail.com',
            '123',
            ['user']
        );
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage })
    })
})