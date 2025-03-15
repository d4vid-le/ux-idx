/**
 * Makes a POST request to the specified URL
 * @param url URL to send the request to
 * @param data Data to send in the request body
 * @returns Promise with the response data
 */
export const postData = async <T>({
  url,
  data
}: {
  url: string;
  data?: any;
}): Promise<T> => {
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    console.log('Error in postData', { url, data, res });
    throw Error(res.statusText);
  }

  return res.json();
};

/**
 * Makes a GET request to the specified URL
 * @param url URL to send the request to
 * @returns Promise with the response data
 */
export const getData = async <T>({
  url
}: {
  url: string;
}): Promise<T> => {
  const res: Response = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin'
  });

  if (!res.ok) {
    console.log('Error in getData', { url, res });
    throw Error(res.statusText);
  }

  return res.json();
};

/**
 * Handles API errors
 * @param error Error object
 * @returns Error message
 */
export const handleApiError = (error: any): string => {
  console.error('API Error:', error);
  
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  
  return error.message || 'An unexpected error occurred';
}; 