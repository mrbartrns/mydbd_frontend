export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function parseQueryStringToDictionary(queryString) {
  const dictionary = {};
  if (queryString.indexOf("?") === 0) {
    queryString = queryString.substr(1);
  }
  const parts = queryString.split("&");
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const keyValuePair = p.split("=");
    const key = keyValuePair[0];
    let value = keyValuePair[1];

    value = decodeURIComponent(value);
    value = value.replace(/\+/g, " ");
    dictionary[key] = value;
    return dictionary;
  }
}
