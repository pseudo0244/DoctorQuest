const API_URL = "http://localhost:5000/api/auth";

export const signUp = async (formData: { name: string, email: string, password: string }) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

export const logIn = async (formData: { email: string, password: string }) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};
