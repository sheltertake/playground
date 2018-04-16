var initialDataUrl =
    'data:image/png;base64,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';
var wrapper = document.getElementById('signature-pad');
var clearButton = wrapper.querySelector('[data-action=clear]');
var changeColorButton = wrapper.querySelector('[data-action=change-color]');
var undoButton = wrapper.querySelector('[data-action=undo]');
var savePNGButton = wrapper.querySelector('[data-action=save-png]');
var saveJPGButton = wrapper.querySelector('[data-action=save-jpg]');
var saveSVGButton = wrapper.querySelector('[data-action=save-svg]');
var canvas = wrapper.querySelector('canvas');
var signaturePad = new SignaturePad(canvas, {
    // It's Necessary to use an opaque color when saving image as JPEG;
    // this option can be omitted if only saving as PNG or SVG
    backgroundColor: 'rgb(255, 255, 255)'
});

signaturePad.clear();
signaturePad.fromDataURL(initialDataUrl);
// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio = Math.max(window.devicePixelRatio || 1, 1);

    // This part causes the canvas to be cleared
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);

    // This library does not listen for canvas changes, so after the canvas is automatically
    // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
    // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
    // that the state of this library is consistent with visual state of the canvas, you
    // have to clear it manually.
    signaturePad.clear();
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.style = 'display: none';
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
}

// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener('click', function(event) {
    signaturePad.clear();
});

undoButton.addEventListener('click', function(event) {
    var data = signaturePad.toData();

    if (data) {
        data.pop(); // remove the last dot or line
        signaturePad.fromData(data);
    }
});

changeColorButton.addEventListener('click', function(event) {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    var color = 'rgb(' + r + ',' + g + ',' + b + ')';

    signaturePad.penColor = color;
});

savePNGButton.addEventListener('click', function(event) {
    if (signaturePad.isEmpty()) {
        alert('Please provide a signature first.');
    } else {
        var dataURL = signaturePad.toDataURL();
        download(dataURL, 'signature.png');
    }
});

saveJPGButton.addEventListener('click', function(event) {
    if (signaturePad.isEmpty()) {
        alert('Please provide a signature first.');
    } else {
        var dataURL = signaturePad.toDataURL('image/jpeg');
        download(dataURL, 'signature.jpg');
    }
});

saveSVGButton.addEventListener('click', function(event) {
    if (signaturePad.isEmpty()) {
        alert('Please provide a signature first.');
    } else {
        var dataURL = signaturePad.toDataURL('image/svg+xml');
        download(dataURL, 'signature.svg');
    }
});