import { fetchWrapper } from 'utils';

// export const getLogin = (username, password) => {
//   return fetchWrapper(`${{}['endPoint']}/`, {
//     body: {
//       userid: username,
//       pwd: password,
//       cmd: 'login',
//       skinname: {}.name,
//     },
//   });
// };

// export const requestLogOut = token => {
//   return fetchWrapper(`${{}['endPoint']}/logout?token=${token}`);
// };

// export const reqTransfer = (type, id, data) => {
//   const hostToSent =
//     // window.location.host.match(/192|localhost/g)
//     //   ? 'new.feedmaker.live'
//     //   :
//     window.location.host;
//   return fetchWrapper(`${{}['backOffice']}/payment/${type}/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     withToken: true,
//     body: {
//       ...data,
//       success_url: `${window.location.protocol}//${hostToSent}/#/${type}/success`,
//       failed_url: `${window.location.protocol}//${hostToSent}/#/${type}/failed`,
//       cancel_url: `${window.location.protocol}//${hostToSent}/#/${type}/cancel`,
//     },
//   });
// };

// export const fetchTransferLists = kind => {
//   const type = kind === 'deposit' || kind === 'payin' ? 'payin' : 'payout';
//   return fetchWrapper(`${{}['backOffice']}/customer/${type}/payments`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     withToken: true,
//   });
// };
