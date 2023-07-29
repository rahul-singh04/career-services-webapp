const { signup } = require("../controllers").authController;
const { signin } = require("../controllers/auth.controller");
const { authService } = require("../services")


jest.mock("../services/auth-service/auth.service", () => ({
    signup: jest.fn(),
    signin: jest.fn()
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

describe("signin user test suite", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    test('should sign in a user successfully', async () => {
        const req = {
            body: {
                username: 'vikk-dev-user',
                password: '123',
            },
        };
        const mockUser = {
            _id: '123',
            username: 'vikk-dev-user',
            email: 'vikkdevuser@gmail.com',
            roles: ['ROLE_USER'],
            accessToken: 'access-token',
        };
        authService.signin.mockResolvedValue(mockUser);
        const res = mockResponse();
        await signin(req, res);
        expect(authService.signin).toHaveBeenCalledWith('vikk-dev-user', '123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('should handle invalid username and respond with 500 status', async () => {
        const req = {
            body: {
                username: 'non_existent_user',
                password: '123',
            },
        };
        const errorMessage = 'User not found.';
        authService.signin.mockRejectedValue(new Error(errorMessage));
        const res = mockResponse();
        await signin(req, res);
        expect(authService.signin).toHaveBeenCalledWith('non_existent_user', '123');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    test('should handle invalid password and respond with 500 status', async () => {
        const req = {
            body: {
                username: 'vikk-dev-user',
                password: 'wrong_password',
            },
        };
        const errorMessage = 'Invalid Password!';
        authService.signin.mockRejectedValue(new Error(errorMessage));
        const res = mockResponse();
        await signin(req, res);
        expect(authService.signin).toHaveBeenCalledWith('vikk-dev-user', 'wrong_password');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });

})