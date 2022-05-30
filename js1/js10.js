Window;

let params = `scrollbars=no,width=500,height=500,left=-1000,top=-1000,resizable=no,status=no,location=no,toolbar=no,menubar=no`;
let win = window.open("/", "Test", params);
win.focus();
win.onload = function () {
    win.document.body.insertAdjacentHTML("afterbegin", "<h1>Hello World!</h1>");
};
win.onblur = () => win.focus();
win.onclose = function () {
    console.log("Closed");
};
setTimeout(() => win.close(), 5000);

//Array Buffer
let bfr = new ArrayBuffer(16);
let vie = new Uint32Array(bfr);
console.log(Uint32Array.BYTES_PER_ELEMENT);

console.log(vie.length, vie.byteLength);

vie[0] = 123456;
for (let num of vie) {
    console.log(num);
}

let uar = new Uint8Array([72, 101, 108, 108, 111]);
console.log(new TextDecoder().decode(uar));

console.log(new TextEncoder().encode("Hello"));

//BLOB
{
    let a = document.createElement("a");
    a.download = "hello.txt";

    let blob = new Blob(["Hello There!"], { type: "text/plain" });
    a.href = URL.createObjectURL(blob);
    a.innerHTML = "Click";
    console.log(a.href);
    a.click();
    URL.revokeObjectURL(a.href);
}

//FileReader
function readFile(filesList) {
    let file = filesList.files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        fileCon.innerHTML = reader.result;
    };
}

//Fetch
(async () => {
    let res = await fetch(
        "https://javascript.info/article/fetch/logo-fetch.svg"
    );
    let blob = await res.blob();

    let img = document.createElement("img");
    img.style = "position:fixed;top:10px;right:10px;width:100px";

    document.body.append(img);

    img.src = URL.createObjectURL(blob);

    setTimeout(() => {
        img.remove();
        URL.revokeObjectURL(img.src);
    }, 5000);
})();

//POST Blob

canvasElem.onmousemove = function (e) {
    let ctx = canvasElem.getContext("2d");
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
};
async function submit() {
    let blob = await new Promise((res) => canvasElem.toBlob(res, "image/png"));
    let response = await fetch(
        "https://javascript.info/article/fetch/post/image",
        {
            method: "POST",
            body: blob,
        }
    );
    let result = await response.json();
    alert(result.message);
}

//FormData
formElem.onsubmit = async (e) => {
    e.preDefault();
    let fmD = new FormData(formElem);
    fmD.append("ID", 12345);
    fmD.append("Quantity", 1);
    fmD.append("Price", 10.0);
    console.log(fmD.values);
    let response = await fetch("https://reqbin.com/echo/post/json", {
        method: "POST",
        body: fmD,
    });
    let res = await response.json();
    console.log(res);
};

//creating URL
let url = new URL("https://google.com/search");
console.log(url.host, url.hostname, url.port, url.protocol);

url.searchParams.set("q", "Nothing @$kksf");
console.log(url.href);

//XMLHTTPRequest
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://gorest.co.in/public/v2/users");
xhr.send();
xhr.onprogress = function (e) {
    if (e.lengthComputable) {
        console.log(`Received ${e.loaded} of ${e.total} bytes`);
    } else {
        console.log(`Received ${e.loaded} bytes`);
    }
};
xhr.onload = function () {
    if (xhr.status != 200) {
        alert("Call failed");
    } else {
        console.log(`Done, got ${xhr.response.length} bytes`);
    }
};

//
