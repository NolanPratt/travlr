import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    // Creating an instance with email and name
    const user = new User('example@example.com', 'John Doe');
    expect(user).toBeTruthy();
    expect(user.email).toEqual('example@example.com');
    expect(user.name).toEqual('John Doe');
  });
});