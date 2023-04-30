import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login';


describe('LoginForm component', () => {
  test('renders login form', () => {

    const handleSubmit = jest.fn();
    render(<Login onSubmit={handleSubmit} />);
    const form = screen.getByTestId('login-form');
    expect(form).toBeInTheDocument();

  });

  test('should update email and password inputs', () => {

    const handleSubmit = jest.fn();
    render(<Login onSubmit={handleSubmit} />);
    const emailInput = screen.getByTestId('username-input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');

  });


  test('allows user to enter email and password and submit the form', () => {

    const handleSubmit = jest.fn();
    render(<Login onSubmit={handleSubmit} />);
    const emailInput = screen.getByTestId('username-input') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const submitButton = screen.getByTestId('login-submit');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith('test@example.com', 'password123');
  });

});
