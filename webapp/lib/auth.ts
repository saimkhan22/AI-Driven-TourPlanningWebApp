export const isLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};


export const loginUser = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};

export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
