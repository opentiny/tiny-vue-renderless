import "../../chunk-G2ADBYYC.js";
let ws = null;
const url = "ws://localhost";
const ports = [27197, 27198, 27199];
let index = 0;
let connected;
let pollingInterval = 1e3;
let timeout = 3e4;
let cid = 0;
let callbacks = {};
let pollingTimer;
let userStatus = {};
const heartbeatInterval = 20 * 1e3;
let heartbeatTimer = null;
let connectTimer = null;
let apiTimers = {};
let events = {};
let out = {};
let error = () => void 0;
let ready = () => void 0;
const clearCallback = function(cid2) {
  clearTimeout(apiTimers[cid2]);
  delete callbacks[cid2];
  delete apiTimers[cid2];
};
const onopen = function() {
  connectTimer = setTimeout(() => {
    ws.close();
  }, 5e3);
};
const send = function(argv, cb) {
  let id = cid++;
  id = String(id);
  argv.cid = id;
  if (!connected) {
    cb && setTimeout(cb, 0, { ok: false, message: "eSpace is not logged in." });
    return;
  }
  if (typeof cb === "function") {
    callbacks[id] = cb;
    apiTimers[id] = setTimeout(() => {
      cb({ ok: false, message: "time out" });
      clearCallback(id);
    }, timeout);
  }
  ws.send(JSON.stringify(argv));
};
const sendHeartbeat = function() {
  heartbeatTimer = setTimeout(() => {
    if (connected) {
      send(
        {
          type: "heartbeat"
        },
        () => {
          sendHeartbeat();
        }
      );
    } else {
      clearTimeout(heartbeatTimer);
    }
  }, heartbeatInterval);
};
const connectionSucceeded = function(data) {
  connected = true;
  sendHeartbeat();
  clearTimeout(pollingTimer);
  clearTimeout(connectTimer);
  ready(data);
};
const onmessage = function(evt) {
  let data = evt.data;
  if (typeof data !== "string") {
    return;
  }
  data = data.replace(/^\d+/, "");
  if (!data) {
    return;
  }
  try {
    data = JSON.parse(data);
  } catch (e) {
    return !e;
  }
  if (connected) {
    let event = events[data.type];
    if (event) {
      return event(data.data);
    }
    let cid2 = data.cid;
    let cb = callbacks[cid2];
    if (cb) {
      if (data.ok) {
        cb(null, data.data);
      } else {
        cb({ ok: data.ok });
      }
      clearCallback(cid2);
    }
  } else {
    if (data.type === "eSpace-ctrl-connection-success") {
      connectionSucceeded(data.data);
    } else {
      ws.close();
    }
  }
};
const bindEvents = function() {
  ws.onopen = onopen;
  ws.onclose = onclose;
  ws.onmessage = onmessage;
};
const connect = function(interval) {
  pollingTimer = setTimeout(() => {
    if (index >= ports.length) {
      index = 0;
    }
    ws = new WebSocket(url + ":" + ports[index++]);
    bindEvents();
  }, interval || 0);
};
const onclose = function() {
  if (connected || typeof connected === "undefined") {
    connected = false;
    error();
  }
  connect(pollingInterval);
};
out.init = function(conf) {
  if (conf) {
    timeout = conf.timeout || 3e4;
    pollingInterval = conf.pollingInterval || 0;
  }
  connect();
};
out.ready = function(cb) {
  ready = cb;
};
out.error = function(cb) {
  error = cb;
};
const attrToArr = function(name, total, object) {
  let result = [];
  for (let i = 0; i < total; i++) {
    let attrName = name;
    if (i) {
      attrName += i;
    }
    let attrVal = object[attrName];
    if (attrVal) {
      result.push(attrVal);
    }
  }
  return result;
};
out.on = function(event, hander) {
  events[event] = hander;
};
out.getUserInfo = function(account, cb) {
  const fn = function(err, data) {
    if (err) {
      return cb(err);
    }
    const formatInfo = function(user) {
      return {
        account: user.account,
        name: user.name,
        mobile: attrToArr("mobile", 6, user),
        "office_phone": attrToArr("office_phone", 6, user),
        "home_phone": user.home_phone,
        "ip_phone": user.ip_phone,
        "other_phone": user.other_phone
      };
    };
    if (data.account) {
      cb(null, formatInfo(data));
    } else {
      let result = {};
      for (let p in data) {
        if (Object.prototype.hasOwnProperty.call(data, p)) {
          let user = data[p];
          result[p] = user ? formatInfo(user) : user;
        }
      }
      cb(null, result);
    }
  };
  send(
    {
      type: "get-user-info",
      param: account
    },
    fn
  );
};
out.subscribeUserStatus = function(accounts, cb) {
  if (Array.isArray(accounts)) {
    accounts.forEach((account) => {
      userStatus[account] = true;
    });
  }
  send(
    {
      type: "subscribe-user-status",
      param: accounts
    },
    cb
  );
};
out.eSpaceCall = function(account, num, cb) {
  send(
    {
      type: "espace-call",
      param: {
        account,
        number: num
      }
    },
    cb
  );
};
out.eSpaceCallByAccount = function(account, cb) {
  send(
    {
      type: "espace-call",
      param: {
        account
      }
    },
    cb
  );
};
out.eSpaceCallByNumber = function(number, cb) {
  send(
    {
      type: "espace-call",
      param: {
        number
      }
    },
    cb
  );
};
out.showImDialog = function(account, cb) {
  send(
    {
      type: "show-espace-im-dialog",
      param: account
    },
    cb
  );
};
out.showGroupDialog = function(gid, cb) {
  send(
    {
      type: "show-espace-im-group-dialog",
      param: gid
    },
    cb
  );
};
out.addContactList = function(account, cb) {
  send(
    {
      type: "add-contact-list",
      param: account
    },
    cb
  );
};
if (!window.WebSocket) {
  const notFn = function() {
    return void 0;
  };
  for (let api in out) {
    if (Object.prototype.hasOwnProperty.call(out, api)) {
      let fn = out[api];
      if (typeof fn === "function") {
        out[api] = notFn;
      }
    }
  }
}
let initialized = false;
function init() {
  if (!initialized) {
    localStorage.setItem("eSpaceCtrl_initialized", 0);
    out.init({ timeout: 3e3, pollingInterval: 1e3 });
    out.ready(() => {
      localStorage.setItem("eSpaceCtrl_initialized", 1);
    });
    out.error(() => {
      localStorage.setItem("eSpaceCtrl_initialized", 0);
    });
    initialized = true;
  }
  return out;
}
var eSpaceCtrl_default = out;
export {
  eSpaceCtrl_default as default,
  init
};
