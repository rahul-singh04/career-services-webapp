module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    roots: ['src'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(png|jpg|jpeg|gif|svg)$": "identity-obj-proxy"
    }
};
