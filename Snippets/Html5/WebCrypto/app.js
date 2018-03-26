function stringToArrayBuffer(str) {
    if (window.TextEncoder) {
        var enc = new TextEncoder('utf-8');
        return enc.encode(str);
    }
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function arrayBufferToString(buffer) {
    if (window.TextDecoder) {
        var enc = new TextDecoder();
        return enc.decode(buffer);
    }
    var byteArray = new Uint8Array(buffer);
    var byteString = '';
    for (var i = 0; i < byteArray.byteLength; i++) {
        byteString += String.fromCodePoint(byteArray[i]);
    }
    return byteString;
}

function encryptDataWithPublicKey(data, key, random) {
    data = stringToArrayBuffer(data);
    console.log(key, key.algorithm.name);
    return window.crypto.subtle.encrypt({
            //name: "RSA-OAEP",
            name: key.algorithm.name,
            iv: random //window.crypto.getRandomValues(new Uint8Array(16))
                //label: Uint8Array([...]) //optional
        },
        key, //from generateKey or importKey above
        data //ArrayBuffer of data you want to encrypt
    );
}

function decryptDataWithPrivateKey(data, key, random) {
    //data = stringToArrayBuffer(data);
    return window.crypto.subtle.decrypt({
            // name: "RSA-OAEP",
            name: key.algorithm.name,
            iv: random // iv : window.crypto.getRandomValues(new Uint8Array(16))
                //label: Uint8Array([...]) //optional
        },
        key, //from generateKey or importKey above
        data //ArrayBuffer of data you want to encrypt
    );
}

window.crypto.subtle
    .generateKey({
            //name: "RSA-OAEP",
            //modulusLength: 2048,
            //publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            //hash: {name: "SHA-256"}
            name: 'AES-GCM',
            length: 128
        },
        false, ['encrypt', 'decrypt']
    )
    .then(function(key) {
        var data = '원대하고. 하였으며. 보라. 보이는 할지니, ';
        var random = window.crypto.getRandomValues(new Uint8Array(16));
        encryptDataWithPublicKey(data, key, random).then(result => {
            //var rdata = arrayBufferToString(result);
            //console.log("encripted", result, rdata)
            return decryptDataWithPrivateKey(result, key, random).then(result => {
                console.log('decripted', result);
                var str_result = arrayBufferToString(result);
                console.log(str_result);
            });
        });
    })
    .catch(function(err) {
        console.log(err);
    });