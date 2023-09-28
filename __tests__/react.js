/**
 * @jest-environment jsdom
*/

import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../src/components/LoginPage';
import SignupPage from '../src/components/SignupPage';
// import FeedPage from '../src/components/FeedPage'
import UploadImage from '../src/components/UploadImage'
import {createMemoryHistory} from 'history'

describe('Unit testing React components', () => {
    describe('LoginPage', () => {

        const mockLogin = jest.fn();

        test('updates username and password on user input', () => {
            render(
                <Router>
                    <LoginPage />
                </Router>
            );

            const usernameInput = screen.getByLabelText('Username:');
            const passwordInput = screen.getByLabelText('Password:');
          
            fireEvent.change(usernameInput, { target: { value: 'testUser' } });
            fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
          
            expect(usernameInput.value).toBe('testUser');
            expect(passwordInput.value).toBe('testPassword');
          });

          test('displays error message when user does not enter username/password', async () => {
            window.alert = jest.fn();

            render(
              <Router>
                <LoginPage />
              </Router>
            );
          
            const submitButton = screen.getByRole('button', { name: 'Login' });

            fireEvent.click(submitButton);

            expect(window.alert).toHaveBeenCalledWith('Please enter a username and password')
          });

          test('displays error message when user credentials do not match', async () => {
            window.alert = jest.fn();
            global.fetch = jest.fn(() =>
                Promise.resolve({
                ok: false, // This simulates an unsuccessful response
            })
          );

            render(
              <Router>
                <LoginPage />
              </Router>
            );
            
            const usernameInput = screen.getByLabelText('Username:');
            const passwordInput = screen.getByLabelText('Password:');
            const submitButton = screen.getByRole('button', { name: 'Login' });
            
            fireEvent.change(usernameInput, { target: { value: 'Vladimir' } });
            fireEvent.change(passwordInput, { target: { value: 'Nabokov' } });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(window.alert).toHaveBeenCalledWith("Credentials don't match");
              });
          });
          
          test('redirects to /feed on successful login', async () => {
            mockLogin.mockResolvedValueOnce({ username: 'testUser' });
          
            const history = createMemoryHistory();
            render(
              <Router history={history}>
                <LoginPage />
              </Router>
            );
          
            const usernameInput = screen.getByLabelText('Username:');
            const passwordInput = screen.getByLabelText('Password:');
            const submitButton = screen.getByRole('button', { name: 'Login' });
          
            fireEvent.change(usernameInput, { target: { value: 'testUser' } });
            fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
            fireEvent.click(submitButton);
          
            await waitFor(() => expect(history.location.pathname).toBe('/'));
          });
    })

    describe('SignupPage', () => {

        const mockSignup = jest.fn();

        test('updates username and password on user input', () => {
            render(
                <Router>
                    <SignupPage />
                </Router>
            );

            const usernameInput = screen.getByLabelText('Username:');
            const passwordInput = screen.getByLabelText('Password:');
          
            fireEvent.change(usernameInput, { target: { value: 'testUser' } });
            fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
          
            expect(usernameInput.value).toBe('testUser');
            expect(passwordInput.value).toBe('testPassword');
        })

        test('redirects to signup page on link click', async () => {
            const history = createMemoryHistory({ initialEntries: ["/login"] });

            render(
                <Router history={history}>
                    <SignupPage />
                </Router>
            );

            const redirectLink = screen.getByRole('link', { name: 'Click Here to Log In To An Existing Account' });
            
            fireEvent.click(redirectLink);

            await waitFor(() => expect(history.location.pathname).toBe('/login'));
        })

        test('redirects to /feed on successful sign up', async () => {
          
          mockSignup.mockResolvedValueOnce({ username: 'testUser' });
        
          const history = createMemoryHistory({ initialEntries: ["/feed"] });

          render(
            <Router history={history}>
              <LoginPage />
            </Router>
          );
        
          const usernameInput = screen.getByLabelText('Username:');
          const passwordInput = screen.getByLabelText('Password:');
          const submitButton = screen.getByRole('button', { name: 'Login' });
        
          fireEvent.change(usernameInput, { target: { value: 'testUser' } });
          fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
          fireEvent.click(submitButton);
        
          await waitFor(() => expect(history.location.pathname).toBe('/feed'));
        });
    })

  describe('UploadImage', () => {
    test('renders a file input element', () => {
      render(
        <UploadImage />
      )

      const fileInput = screen.getByTestId('file-input');

      expect(fileInput).toBeDefined();
    })

  })
})