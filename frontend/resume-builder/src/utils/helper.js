// Email validation using regex
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Additional validation helpers
export const validatePassword = (password) => {
  
  return password && password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};