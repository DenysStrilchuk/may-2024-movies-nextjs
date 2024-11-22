import {baseUrl} from "../../constants";

const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

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
