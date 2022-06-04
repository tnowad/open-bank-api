interface AccessTokenPayload {
  id: string;
  email: string;
}

interface RefreshTokenPayload {
  id: string;
}

export { AccessTokenPayload, RefreshTokenPayload };
