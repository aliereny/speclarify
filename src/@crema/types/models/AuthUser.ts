export type AuthUserType = {
  id: string;
  name: string;
  email: string;
  photo?: string;
  role: "admin" | "user";
};
