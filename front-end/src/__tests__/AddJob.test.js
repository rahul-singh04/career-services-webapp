import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddJobs from '../pages/AddJobs';
import { postJob } from '../api/EmployerApi';

// Mock the api/EmployerApi module
jest.mock('../api/EmployerApi', () => ({
    postJob: jest.fn(),
}));

describe('AddJobs', () => {
    beforeEach(() => {
        render(<AddJobs />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form elements correctly', () => {
        expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/company location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/job description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/work location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/total openings/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('displays an error message when the form is submitted with empty fields', async () => {
        const submitButton = screen.getByRole('button', { name: /submit/i });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/all fields are required/i)).toBeInTheDocument();
        });

        expect(postJob).not.toHaveBeenCalled();
    });
});
