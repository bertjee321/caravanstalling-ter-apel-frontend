export interface AuthState {
  isAuthenticated: boolean;
  user: Partial<User> | null;
  error: string | null;
  isLoading: boolean;
}

export type IdentityData = {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
};

export type Identity = {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
};

export type AppMetadata = {
  provider: string;
  providers: string[];
};

export type UserMetadata = Record<string, unknown>;

export type User = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: string;
  updated_at: string;
};

export type Session = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: User;
};

export type Data = {
  user: User;
  session: Session;
};

export type ApiResponse = {
  user: User;
  session: Session;
  error: null | string; // Error could be more complex if needed
};
