//import { toast } from 'react-toastify';
//import moment from 'moment';

import { useState, useEffect, useRef } from 'react';

/**
 * @name usePrevious
 * @description usePrevious Custom hook to save previous value
 * @param {any} value any value
 * @returns {boolean} returns Value
 */

export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

/**
 * @name isEmpty
 * @description Check if givven object is empty
 * @param {Object} obj {} || {'data': 'value'}
 * @returns {boolean} Returns true or false
 */

export const isEmpty = obj =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;

/**
 * @name getHourWithSecc
 * @description Returns user local hour
 * @param {date} date Date "2021-06-18T13:00:00"
 * @returns {string} Returns user local time i.e 15:00:00
 */

export const getHourWithSecc = date => {
  // const dateToUtc = moment.utc(date);
  // const localDate = moment(dateToUtc).local();
  // return localDate.format('HH:mm:ss');
};

/**
 * @name getHour
 * @description Returns user local hour
 * @param {date} date Date "2021-06-18T13:00:00"
 * @returns {string} Returns user local time i.e 15:00
 */

export const getHour = date => {
  // const dateToUtc = moment.utc(date);
  // const localDate = moment(dateToUtc).local();
  // return localDate.format('HH:mm');
};

/**
 * @name getDate
 * @description Returns user local Date
 * @param {date} date Date "2021-06-18T13:00:00"
 * @returns {string} Returns user local Date i.e 2021-06-18
 */

export const getDate = date => {
  // const dateToUtc = moment.utc(date);
  // const localDate = moment(dateToUtc).local();
  // return localDate.format('YYYY-MM-DD');
};

/**
 * @name notifySucces
 * @description Notification Succes used on Saga generators after getting response.
 * @param {object} msg Message we get from params
 * @returns {} Library notification
 */
export const notifySucces = (msg, customConfig) => {
  msg = typeof msg == 'string' ? msg : JSON.stringify(msg);
  // toast.success(msg, {
  //   position: 'top-right',
  //   autoClose: 3000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   ...customConfig,
  // });
};
/**
 * @name notifyError
 * @description Notification Error used on Saga generators after getting response.
 * @param {object} msg Message we get from params
 * @returns {} Library notification
 */
export const notifyError = (err, customConfig) => {
  let msg = typeof err == 'string' ? err : JSON.stringify(err);

  // toast.error(msg, {
  //   position: 'top-right',
  //   autoClose: 3000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   ...customConfig,
  // });
};

/**
 * @name fetchWrapper
 * @description Used on services requests as a fetch wrapper (axios-like)
 * @param {object} endpoint Endpoint of api
 * @param {boolean} withToken boolean > if true > takes token from redux state and place on api
 * @param {object} body use body only in post request > if it has body mthod becomes POST automatically >if body isnt set its GET request
 * @param {object} customConfig this object is assigned to to object of fetch request, you can override headers,body,method etc...
 * @returns {Promise} Returns a promise that is handeled in Redux Generators by ( yield call() )
 */

export const fetchWrapper = async (
  endpoint,
  { withToken = false, body, ...customConfig } = {}
) => {
  const token = window?.store?.getState?.()?.auth?.user?.token;
  const headers = {};

  const config = {
    method: body || withToken ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      Accept: 'application/json',
      ...customConfig.headers,
    },
  };
  if (body || withToken) {
    const bodyWithToken = {
      token,
      ...body,
    };
    if (token && withToken) {
      config.body = JSON.stringify(bodyWithToken);
    } else {
      config.body = JSON.stringify(body);
    }
  }
  try {
    const res = await window.fetch(`${endpoint}`, config);
    const contentType = await res.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await res?.json?.();
      return data;
    } else {
      return await res.text();
    }
  } catch (err) {
    return err;
  }
};

/**
 * @name formatDate
 * @description Formats dates
 * @param {string} language locale of clock, it, en , ar, ru, an etc
 * @param {array} dateLayoutItems items that can be shown on the date string : 'year','month','day','hour','minute','second','hour12'
 * @returns {string} date as a string
 */

export const formatDate = (
  language = 'en-US',
  date = new Date(),
  dateLayoutItems = [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'hour12',
  ]
) => {
  //if array dateLayoutItems includes all in en-US lang > returns >  6/2/2021, 3:01:15 PM
  var options = {
    ...(dateLayoutItems.includes('year') && { year: 'numeric' }),
    ...(dateLayoutItems.includes('month') && { month: 'numeric' }),
    ...(dateLayoutItems.includes('day') && { day: 'numeric' }),
    ...(dateLayoutItems.includes('hour') && { hour: 'numeric' }),
    ...(dateLayoutItems.includes('minute') && { minute: 'numeric' }),
    ...(dateLayoutItems.includes('second') && { second: 'numeric' }),
    ...(dateLayoutItems.includes('hour12') && { hour12: true }),
    //timeZone: 'America/Los_Angeles',
  };
  return new Intl.DateTimeFormat(language, options).format(date);
};

/**
 * @name b64toBlob
 * @description Function that converts base64 into a blob or url.
 * @param {string} b64Data b64 string splited (without ex: image/png || application/pdf)
 * @param {string} contentType content type ex: image/png , application/pdf
 * @returns {array} return array [0,1] first value is the url string and second is blob file
 */

export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = window.atob(b64Data.split(',')[1]);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return [URL.createObjectURL(blob), blob];
};

/**
 * @name sortBy
 * @description returns a fuction that can be passed as argument to sort, it sorts based on the propery in "attr"
 * @returns {Function}
 */

export const sortBy =
  (...attrs) =>
  (a, b) =>
    attrs.length == 0
      ? 0
      : a[attrs[0]] > b[attrs[0]]
      ? 1
      : a[attrs[0]] < b[attrs[0]]
      ? -1
      : sortBy(...attrs.slice(1))(a, b);
/**
 * @name groupBy
 * @description group array of object ky object key
 * @returns {Array}
 */
export const groupBy = (xs, key) => {
  let newArr = [...xs];
  return newArr.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
/**
 * @name capitalize
 * @description capitalizes a string
 * @returns {String}
 */

export const capitalize = word =>
  word.toLowerCase().replace(/\w/, firstLetter => firstLetter.toUpperCase());

/**
 * @name Arr
 * @description return an array of n Numbers (useful for maps)
 * @returns {Array}
 */
export const Arr = nr => [...new Array(nr)].map((a, b) => b + 1);
/**
 * @name orderBy
 * @description Order Casino Games (if it has ID as sec param it orders based on provider otherwise orders the whole list from 1-9999) forID 41 (Popular Provider it orders by popularity key)
 * @param {Array} games array of games
 * @param {Number} orderById order based on id of the provider
 * @returns {Array} retuns array of games ordered
 */
export const orderBy = (games = [], orderById, key) => {
  return (
    games.sort?.((a, b) =>
      (
        orderById
          ? Number(orderById) === 41
            ? Number(a?.popularity) > Number(b?.popularity)
            : Number(a?.orders?.[orderById]) < Number(b?.orders?.[orderById])
          : Number(a.order) < Number(b.order)
      )
        ? -1
        : 1
    ) || []
  );
};
/**
 * @name filterBy
 * @description Filter whole list of casino games based on the id of provider so it can return only the list of that provider
 * @param {Array} games array of games
 * @param {Number} filterKey id of provider || []
 * @returns {Array} retuns array of games filtred
 */

export const filterBy = (games = [], filterKey) => {
  return games?.filter(slot => {
    const slotCategories = Object.keys(slot?.categories || {}).filter(
      catKey => Number(catKey) === Number(filterKey)
    );
    return slotCategories.length > 0;
  });
};

//helper function that attach fullscreen methods on window (for casino/ casino live / virtual)
(() => {
  'use strict';
  var document =
    typeof window !== 'undefined' && typeof window.document !== 'undefined'
      ? window.document
      : {};
  var fn = (function () {
    var val;

    var fnMap = [
      [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenElement',
        'fullscreenEnabled',
        'fullscreenchange',
        'fullscreenerror',
      ],
      [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror',
      ],
      [
        'webkitRequestFullScreen',
        'webkitCancelFullScreen',
        'webkitCurrentFullScreenElement',
        'webkitCancelFullScreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror',
      ],
      [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror',
      ],
      [
        'msRequestFullscreen',
        'msExitFullscreen',
        'msFullscreenElement',
        'msFullscreenEnabled',
        'MSFullscreenChange',
        'MSFullscreenError',
      ],
    ];

    var i = 0;
    var l = fnMap.length;
    var ret = {};

    for (; i < l; i++) {
      val = fnMap[i];
      if (val && val[1] in document) {
        for (i = 0; i < val.length; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret;
      }
    }

    return false;
  })();

  var eventNameMap = {
    change: fn.fullscreenchange,
    error: fn.fullscreenerror,
  };

  var screenfull = {
    request: function (element) {
      return new Promise(
        function (resolve, reject) {
          var onFullScreenEntered = function () {
            this.off('change', onFullScreenEntered);
            resolve();
          }.bind(this);

          this.on('change', onFullScreenEntered);

          element = element || document.documentElement;

          var returnPromise = element[fn.requestFullscreen]();

          if (returnPromise instanceof Promise) {
            returnPromise.then(onFullScreenEntered).catch(reject);
          }
        }.bind(this)
      );
    },
    exit: function () {
      return new Promise(
        function (resolve, reject) {
          if (!this.isFullscreen) {
            resolve();
            return;
          }

          var onFullScreenExit = function () {
            this.off('change', onFullScreenExit);
            resolve();
          }.bind(this);

          this.on('change', onFullScreenExit);

          var returnPromise = document[fn.exitFullscreen]();

          if (returnPromise instanceof Promise) {
            returnPromise.then(onFullScreenExit).catch(reject);
          }
        }.bind(this)
      );
    },
    toggle: function (element) {
      return this.isFullscreen ? this.exit() : this.request(element);
    },
    onchange: function (callback) {
      this.on('change', callback);
    },
    onerror: function (callback) {
      this.on('error', callback);
    },
    on: function (event, callback) {
      var eventName = eventNameMap[event];
      if (eventName) {
        document.addEventListener(eventName, callback, false);
      }
    },
    off: function (event, callback) {
      var eventName = eventNameMap[event];
      if (eventName) {
        document.removeEventListener(eventName, callback, false);
      }
    },
    raw: fn,
  };

  if (!fn) {
    window.screenfull = { isEnabled: false };
    return;
  }

  Object.defineProperties(screenfull, {
    isFullscreen: {
      get: function () {
        return Boolean(document[fn.fullscreenElement]);
      },
    },
    element: {
      enumerable: true,
      get: function () {
        return document[fn.fullscreenElement];
      },
    },
    isEnabled: {
      enumerable: true,
      get: function () {
        return Boolean(document[fn.fullscreenEnabled]);
      },
    },
  });

  window.screenfull = screenfull;
})();

//orders/sorts live markets helper func
export const sortLiveMarkets = markets =>
  markets.sort(
    (a, b) => +a.id_market_type_provider - +b.id_market_type_provider
  );
export const sortLiveOdds = odds => odds.sort((a, b) => +a.order - +b.order);

/**
 * @name RenderTime
 * @description Renders  minutes and seconds in Live section
 * @param {Array} minutes inital minutes you get from api
 * @param {Number} initialSecod inital secods you get from api or random 0-60
 * @returns {Array} time forma HH:SS
 */

export const RenderTime = ({
  minutes,
  initialSecod = Math.floor(Math.random() * 60),
}) => {
  //inital second 0-20s random
  const [sec, setSec] = useState(initialSecod);
  const [prevMin, setMin] = useState(null);
  useEffect(() => {
    const tm = setTimeout(() => {
      if (sec >= 59) {
        setSec(0);
        setMin(prevMin + 1);
      } else {
        setSec(sec + 1);
      }
    }, 1000);
    return () => {
      clearTimeout(tm);
    };
  }, [sec]);
  useEffect(() => {
    if (!prevMin) {
      setMin(minutes);
    }
    if (prevMin && prevMin !== minutes) {
      setSec(0);
      setMin(minutes);
    }
  }, [minutes]);
  return [
    `${Number(prevMin) < 10 ? `0${prevMin}` : prevMin}:`,
    sec < 10 ? `0${sec}` : sec,
  ];
};
