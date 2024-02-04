export const authRole = {
  Admin: ['admin'],
  User: ['user', 'admin'],
};

export const fileStackKey = process.env.NEXT_PUBLIC_FILESTACK_KEY as string;
export const initialUrl = process.env.NEXT_PUBLIC_INITIAL_URL as string; // this url will open after login
