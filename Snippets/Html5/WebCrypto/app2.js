'use strict';

var webcrypto = window.crypto; // || window.msCrypto || window.webkitCrypto || window.mozCrypto;

// var keyStr = 'VzC2coGPrvecrigzB38DRLGiwVrgiwnQznyrD9BYxAk=';
// var keyBuf = sta(keyStr);
// var message = 'this is a secret message';
// var message = '원대하고. 하였으며. 보라. 보이는 할지니';
var message = JSON.stringify('{"test": "test"}');
var ivLen = 128 / 8;
var iv = new Uint8Array(ivLen); // defaults to zero
var data = sta(message);

function sta(str) {
    var enc = new TextEncoder('utf-8');
    return enc.encode(str);
}

function ats(buffer) {
    var enc = new TextDecoder('utf-8');
    return enc.decode(buffer);
}
webcrypto.subtle
    .generateKey({
            name: 'AES-CBC',
            length: 128
        },
        false, //whether the key is extractable (i.e. can be used in exportKey)
        ['encrypt', 'decrypt'] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
    )
    .then(function(key) {
        //returns the symmetric key
        console.log('key', key);
        var algo = key.algorithm;
        algo.iv = iv;
        console.log('algo', algo, algo.iv);
        return window.crypto.subtle
            .encrypt(
                algo,
                key, //from generateKey or importKey above
                data //ArrayBuffer of data you want to encrypt
            )
            .then(function(encrypted) {
                //returns an ArrayBuffer containing the encrypted data
                // TODO base64
                //console.log(new Uint8Array(encrypted));
                console.log('encrypted');
                console.log(new Uint8Array(encrypted));
                console.log(new Uint8Array(encrypted).length);

                window.crypto.subtle
                    .decrypt(
                        algo,
                        key, //from generateKey or importKey above
                        encrypted //ArrayBuffer of data you want to encrypt
                    )
                    .then(function(decrypted) {
                        //returns an ArrayBuffer containing the encrypted data
                        console.log(new Uint8Array(encrypted));
                        console.log('decrypted', JSON.parse(ats(decrypted)));
                    })

                // error handling

                .catch(function(err) {
                    console.error(err);
                });
            })
            .catch(function(err) {
                console.error(err);
            });
    })
    .catch(function(err) {
        console.error(err);
    });