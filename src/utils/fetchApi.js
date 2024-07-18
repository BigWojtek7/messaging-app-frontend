const requestWithNativeFetch = async (data, url, method) => {
  const response = await fetch(url, {
    method: method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export default requestWithNativeFetch;
