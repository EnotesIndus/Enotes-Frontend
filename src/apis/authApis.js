const API_BASE_URL = 'http://localhost:8080';

export const verifyUserApi = (uid, code) =>
  fetch(`${API_BASE_URL}/verify?uid=${uid}&code=${code}`);

export const verifyResetLinkApi = (uid, resetCode) =>
  fetch(`${API_BASE_URL}/verify-reset?uid=${uid}&resetCode=${resetCode}`);

export const requestPasswordResetApi = (email) =>
  fetch(`${API_BASE_URL}/forgot-password?email=${encodeURIComponent(email)}`, {
    method: 'POST',
  });

export const resetPasswordApi = (payload) =>
  fetch(`${API_BASE_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
