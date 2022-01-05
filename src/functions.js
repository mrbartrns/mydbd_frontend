import jwt_decode from "jwt-decode";

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

function parseJwt(token) {
  try {
    const jwt = jwt_decode(token);
    return jwt;
  } catch (e) {
    return null;
  }
}

export function isValidToken(token) {
  const decodedJwt = parseJwt(token);
  if (!decodedJwt) {
    return false;
  }
  // getTime -> milliseconds exp -> seconds
  // decodeJwt exp에 1000을 곱한값이 현재 시간보다 작으면 만료된 토큰
  if (!decodedJwt.hasOwnProperty("exp")) return false;
  return decodedJwt["exp"] * 1000 < new Date().getTime() ? false : true;
}

export function formattedDateString(rawDate) {
  const fullDate = new Date(rawDate);
  const strMinute = fullDate.getMinutes().toString();
  const strHour = fullDate.getHours().toString();
  // const strYear = fullDate.getFullYear().toString().substring(2);
  const strMonth =
    fullDate.getMonth() + 1 < 10
      ? "0" + (fullDate.getMonth() + 1).toString()
      : (fullDate.getMonth() + 1).toString();
  const strDate =
    fullDate.getDate() < 10
      ? "0" + fullDate.getDate().toString()
      : fullDate.getDate().toString();

  const now = new Date();
  const comparedFullDate = new Date(
    fullDate.getFullYear(),
    fullDate.getMonth(),
    fullDate.getDate()
  );
  const comparedNowDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const formatedDate =
    comparedFullDate < comparedNowDate
      ? `${strMonth}-${strDate}`
      : `${strHour}:${strMinute}`;

  return formatedDate;
}
