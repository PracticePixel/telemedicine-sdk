import DeviceInfo from 'react-native-device-info';

// Get user info
/**
 * 
 * @param {string} token client token
 * @param {*} data will be user detail object
 * @returns
 */
//original response = `https://sdk.telemedicine.com?cid=${token}`;

export async function getInfo(cid, data = {}) {
  const BUNDLE_ID = await DeviceInfo.getBundleId()
  const response = await fetch(`https://api.litedev.com/v1/member`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': cid,
      'sales-channel': 'ios',
      'bundle-id': BUNDLE_ID
    },
    body: JSON.stringify(data)
  });
  return response.json();
}
