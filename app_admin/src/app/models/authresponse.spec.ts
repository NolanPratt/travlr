import { AuthResponse } from './authresponse';

describe('AuthResponse', () => {
  it('should create an instance', () => {
    const authResponse =  new AuthResponse('abc');
    expect(authResponse).toBeTruthy();
    expect(authResponse.token).toBeTruthy();
  });
});
