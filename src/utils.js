// Get user info
/**
 * 
 * @param {string} token client token
 * @param {*} data will be user detail object
 * @returns
 */
//original response = `https://sdk.telemedicine.com?cid=${token}`;

export async function getInfo(token = '', data = {}) {
  const response = await fetch(`https://phub.litedev.com/v6/api/member`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'sales-channel': 'ios'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

// export async function getInfo(token = '', data = {}) {
//   const response = await fetch(`https://api.litedev.com/v1/member`, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     body: JSON.stringify(data),
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'sales-channel': 'web',
//       'accept-language': 'en',
//       'Authorization': 'c8NQD9ugZ72FV1dRdFcUypLzhjg7jS4Oymvur33xgo/NPawk+4rDLlLFl5GIW22e4e2C2Ae48fMgr3x+UiJSzLFkcZf69Cpzpf5oFEe4pU6yQhnbQkGf5ba+bYC+VtUgHO8uNeHqbrbH7MpblLOzgveI/Nsrhh+StQ+eigAEOaq+KVQm5a9USOtJ4J3/CQc4e3LgJmh3ICmnhXCt+BO60kycl6eUUOAGq42sG18JGdPl31MU9aoIVXz/ODkLIeyC'
//     }
//   });
//   return response.json();
// }