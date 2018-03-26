"use strict";

var db = new Dexie("keys");
db.version(1).stores({
  keys: "key",
  crypto: "id"
});
db.open();

function storeKey(key, iv) {
  return db.keys.put({ key: "test", data: key, iv: iv });
}

function getKey() {
  return db.keys.get("test");
}

function storeCrypto(encripted) {
  return db.crypto.put({ id: "test", data: encripted });
}
function getCrypto() {
  return db.crypto.get("test");
}

var webcrypto = window.crypto; // || window.msCrypto || window.webkitCrypto || window.mozCrypto;

// var keyStr = 'VzC2coGPrvecrigzB38DRLGiwVrgiwnQznyrD9BYxAk=';
// var keyBuf = sta(keyStr);
// var message = 'this is a secret message';
// var message = '원대하고. 하였으며. 보라. 보이는 할지니';
var message = JSON.stringify('{"test": "test"}');
var ivLen = 128 / 8;
var IV = new Uint8Array(ivLen); //webcrypto.getRandomValues(new Uint8Array(ivLen)); // defaults to zero
var DATA_ENCRYPT = sta(message);

function sta(str) {
  var enc = new TextEncoder("utf-8");
  return enc.encode(str);
}

function ats(buffer) {
  var enc = new TextDecoder("utf-8");
  return enc.decode(buffer);
}

function generateKey() {
  return webcrypto.subtle.generateKey(
    {
      name: "AES-CBC",
      length: 128
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
  );
}

function encrypt(key, iv, data) {
  var algo = key.algorithm;
  algo.iv = new Uint8Array(ivLen);
  console.log("encrypt key", key);
  console.log("encrypt algo", algo, algo.iv);
  console.log("encrypt data", data);
  return window.crypto.subtle
    .encrypt(
      algo,
      key, //from generateKey or importKey above
      data //ArrayBuffer of data you want to encrypt
    )
    .catch(function(error) {
      console.log("error encripting", error);
    });
}

function decrypt(key, iv, encrypted) {
  var algo = key.algorithm;
  algo.iv = iv;
  console.log("decrypt", algo, algo.iv, encrypted);
  return window.crypto.subtle.decrypt(
    algo,
    key, //from generateKey or importKey above
    encrypted //ArrayBuffer of data you want to encrypt
  );
}

generateKey()
  .then(function(key) {
    console.log("storeKey...");
    return storeKey(key, IV).then(function() {
      return key;
    });
  })
  .then(function(originalCryptoKey) {
    console.log("getKey...");
    return getKey().then(function(indexedDbWrappedKey) {
      return [originalCryptoKey, indexedDbWrappedKey];
    });
  })
  .then(function(responses) {
    var originalCryptoKey = responses[0];
    var indexedDbWrappedKey = responses[1];
    console.log("encrypt...");
    console.log("original key", originalCryptoKey);
    console.log("original key.iv", IV);
    console.log("indexeddb key", indexedDbWrappedKey.data);
    console.log("indexeddb key.iv", indexedDbWrappedKey.iv);
    return encrypt(
      indexedDbWrappedKey.data,
      indexedDbWrappedKey.iv,
      DATA_ENCRYPT
    );
  })
  .then(function(encripted) {
    console.log("storeCrypto...");
    console.log("encripted", encripted);
    return storeCrypto(encripted);
  })
  .then(function() {
    console.log("getCrypto...");
    return getCrypto();
  })
  .then(function(encrypted) {
    console.log("getKey...");
    return getKey().then(function(keyWrapped) {
      return [encrypted, keyWrapped];
    });
  })
  .then(function(responses) {
    console.log("decrypt...", responses);
    var encrypted = responses[0];
    var keyWrapped = responses[1];
    return decrypt(keyWrapped.data, keyWrapped.iv, encrypted.data);
  })
  .then(function(decrypted) {
    console.log(decrypted);
    const response = JSON.parse(ats(decrypted));
    console.log("decrypted...", response);
  });
//   .then(function(key) {
//     //returns the symmetric key
//     console.log("key", key);
//     var algo = key.algorithm;
//     algo.iv = iv;
//     console.log("algo", algo, algo.iv);
//     return window.crypto.subtle
//       .encrypt(
//         algo,
//         key, //from generateKey or importKey above
//         data //ArrayBuffer of data you want to encrypt
//       )
//       .then(function(encrypted) {
//         //returns an ArrayBuffer containing the encrypted data
//         // TODO base64
//         //console.log(new Uint8Array(encrypted));
//         console.log("encrypted");
//         console.log(new Uint8Array(encrypted));
//         console.log(new Uint8Array(encrypted).length);

//         window.crypto.subtle
//           .decrypt(
//             algo,
//             key, //from generateKey or importKey above
//             encrypted //ArrayBuffer of data you want to encrypt
//           )
//           .then(function(decrypted) {
//             //returns an ArrayBuffer containing the encrypted data
//             console.log(new Uint8Array(encrypted));
//             console.log("decrypted", JSON.parse(ats(decrypted)));
//           })

//           // error handling

//           .catch(function(err) {
//             console.error(err);
//           });
//       })
//       .catch(function(err) {
//         console.error(err);
//       });
//   })
//   .catch(function(err) {
//     console.error(err);
//   });
