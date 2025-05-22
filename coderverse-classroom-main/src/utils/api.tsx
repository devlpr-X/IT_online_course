import md5 from "md5";

// Convert password to MD5 hash
export const convertToMD5password = (password: string): string => {
  return md5(password);
};

// Generic function to send API requests
export const sendRequest = async (url: string, method: string, body: any) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
