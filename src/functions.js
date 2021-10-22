export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function parseQueryStringToDictionary(queryString) {
  const dictionary = {};
  if (!queryString) {
    return dictionary;
  }
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

export function checkIfContentIsModified(dtCreated, dtModified) {
  /**
   * dtCreated: String created Date from api
   * dtModified: String modified Date from api */
  return new Date(dtCreated).valueOf() + 1000 < new Date(dtModified).valueOf();
}

// TODO: key 값에 대하여 생각하기
export function replaceNewLineToBr(text) {
  return text.split("\n").map((line, idx) => {
    return (
      <span key={idx}>
        {line}
        <br />
      </span>
    );
  });
}
