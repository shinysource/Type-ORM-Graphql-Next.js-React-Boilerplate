import client from 'src/lib/client';

export interface User {
  id: string;
  name: string;
  email: string;
  dob: string;
  contact: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SingupPayload {
  email: string;
  password: string;
  name: string;
  contact: string;
  dob: string;
}

export interface ForgetPasswordPayload {
  password: string;
  otp: string;
}

export const singup = async (payload: SingupPayload): Promise<User> => {
  const query = `
    mutation($email: String!, $password: String!, $name: String!, $dob: String!, $contact: String!) {
      signup (email: $email,
         password: $password
         name: $name,
         dob: $dob,
         contact: $contact
      ){
        id
        email
        name
        contact
      }
    }`;

  try {
    const data = await client.request(query, payload);

    return data.singup;
  } catch (err) {
    if (err.response?.errors && err.response.errors.length) {
      throw new Error(err.response.errors[0].message);
    }

    throw new Error('Something went wrong :-(');
  }
};

export const login = async (payload: LoginPayload): Promise<User> => {
  const query = `
    mutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id email name contact
      }
    }
  `;

  try {
    const data = await client.request(query, payload);

    return data.login;
  } catch (err) {
    if (err.response?.errors && err.response.errors.length) {
      throw new Error(err.response.errors[0].message);
    }

    throw new Error('Something went wrong :-(');
  }
};

export const logout = async (): Promise<undefined> => {
  const query = `
    mutation {
      logout
    }`;

  try {
    const data = await client.request(query);
    return data;
  } catch (err) {
    throw new Error('Something went wrong :-(');
  }
};

export interface CurrentUserResponse {
  user: User;
}

export const fetchCurrentUser = async (): Promise<CurrentUserResponse> => {
  const query = `query {
    me {
      id
      name
      email
      contact
      dob
     }
   }`;

  const data = await client.request(query);
  const me = data.me ? data.me : null;

  if (!me) {
    throw new Error('Could not get current user');
  }

  return {
    user: {
      contact: me.contact,
      dob: me.dob,
      email: me.email,
      id: me.id,
      name: me.name,
    },
  };
};

export const sendPasswordResetOTP = async (email: string): Promise<undefined> => {
  const query = `
    mutation($email: String!) {
      sendPasswordResetOtp(email: $email)
    }`;

  try {
    const data = await client.request(query, { email });

    return data?.sendPasswordResetOtp;
  } catch (err) {
    throw new Error('Something went wrong :-(');
  }
};

export const forgetPassword = async (payload: ForgetPasswordPayload): Promise<undefined> => {
  const query = `
    mutation($password: String!, $otp: String!) {
      resetPassword(newPassword: $password, otp: $otp) { id }
    }`;

  try {
    const data = await client.request(query, payload);

    return data?.resetPassword?.id;
  } catch (err) {
    if (Array.isArray(err.response?.errors) && err.response.errors.length) {
      throw new Error(err.response.errors[0].message);
    }

    throw new Error('Something went wrong :-(');
  }
};
