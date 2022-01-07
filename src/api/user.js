import { METHOD } from "./base";

export const signIn = (credentials) => ({
  path: 'v1/users/access',
  content: credentials,
  method: METHOD.POST,
  config: {
    useBaseHeaders: true
  }
});

export const signUp = (credentials) => ({
  path: 'v1/users',
  content: credentials,
  method: METHOD.POST,
  config: {
    useBaseHeaders: true
  }
});
