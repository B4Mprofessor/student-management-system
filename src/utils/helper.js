// This file can contain utility functions that can be used across your application

export const generateUniqueId = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Add more utility functions as needed
