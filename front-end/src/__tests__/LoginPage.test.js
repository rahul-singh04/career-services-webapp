import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import * as authApi from '../api/authApi';


jest.mock('../api/authApi', () => ({
    handleSignup: jest.fn(),
    handleSignin: jest.fn(),
}));

// Mock the authApi module
jest.mock('../api/authApi', () => ({
    handleSignup: jest.fn(),
    handleSignin: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Use the actual react-router-dom module except for useNavigate
    useNavigate: () => jest.fn(), // Mock the useNavigate function to return a mock function
}));


describe('LoginPage', () => {
    beforeEach(() => {
        render(<LoginPage />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('switches to signup mode when the "Sign Up" button is clicked', () => {
        const signupButton = screen.getByRole('button', { name: /sign up/i });

        fireEvent.click(signupButton);

        expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('switches to login mode when the "Login" button is clicked', () => {
        const loginButton = screen.getByRole('button', { name: /login/i });

        fireEvent.click(loginButton);

        expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });
});
