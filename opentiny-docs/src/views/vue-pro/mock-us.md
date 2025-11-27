<h1 id='mock'>Mock data</h1>

---
Supports data debugging independently of the backend and facilitates local data debugging.


<h2 id='principle'>Implementation principle</h2>

To implement the frontend and backend, you need to separate the data file from the service file.
In `TinyPro of Vue`, we define data types in `src/api` and implement related interface files in `src/api`.

The following uses login as an example to describe how to use mock data.  

Define the data parameter type in the `src/api/user.ts` file：

```ts
import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}
```

In the `src/mock/user.ts` file, we implement the interface to define the specific data to be simulated.

```ts
  {
    url: '/api/user/login',
    method: 'post',
    response: (params: MockParams) => {
      const { username, password } = JSON.parse(JSON.stringify(params.body));
      if (!username) {
        return failResponseWrap(null, 'The user name cannot be empty', 50000);
      }
      if (!password) {
        return failResponseWrap(null, 'The password cannot be empty', 50000);
      }
      if (username === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin');
        return successResponseWrap({
          token: '12345',
        });
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user');
        return successResponseWrap({
          token: '54321',
        });
      }
      return failResponseWrap(null, 'Incorrect account or password', 50000);
    },
  },
```

<h2 id='make'>Used in the project</h2>

Invoke your service in `src/view/login`：

```ts
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
```


