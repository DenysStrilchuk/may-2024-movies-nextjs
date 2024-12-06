import {baseUrl} from "../../constants";

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmEwZThhM2Q4M2I1NDM5ODA4YTdkOTU2NmNkN2ZlNSIsIm5iZiI6MTczM' +
  'Tc1MTQ1MS43NjI5MTgsInN1YiI6IjY1ZDkwZTg1MzUyMGU4MDE0YWQ2MjI2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HqTo7' +
  'U07hx9KaVXMoqBUer0f2aC9w0NPoNbNpM3Xwgo';

const fetchWithAuth = async (url: string, options: RequestInit = {}, params?: Record<string, string | number>) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  };

  const urlWithParams = params
    ? `${baseUrl}${url}?${new URLSearchParams(params as Record<string, string>)}`
    : `${baseUrl}${url}`;

  const response = await fetch(urlWithParams, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.status_message || `Request failed with status ${response.status}`);
  }

  return response.json();
};

export {fetchWithAuth};
