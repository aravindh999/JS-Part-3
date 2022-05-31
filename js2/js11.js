//Cookies
let dt = new Date(2022, 5, 31);
dt.setMinutes(10000);
document.cookie = `user=Jhon; path=/; expires=${dt}`;
console.log(document.cookie);

function updateCookie(name, value, options = {}) {
    opti = {
        path: "/",
        ...options,
    };
    if (options.expires instanceof Date) {
        opti.expires = options.expires.toUTCString();
    }
    let updatedCookie =
        encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let k in opti) {
        updatedCookie += ";" + k;
        let opV = opti[k];
        if (opV !== true) updatedCookie += "=" + opV;
    }
    document.cookie = updatedCookie;
}
updateCookie("user", "David", { secure: true, "max-age": 3600 });
console.log(document.cookie);

//Local Storage and session storage
localStorage.setItem("a", 1);
console.log(localStorage.getItem("a"));

let keys = Object.keys(localStorage);
for (let k of keys) {
    console.log(k, ":", localStorage.getItem(k));
}

//Animations
flyjet.onclick = function () {
    if (flyjet.classList.contains("shrink")) {
        flyjet.classList.remove("shrink");
        flyjet.classList.add("grow");
    } else {
        flyjet.classList.remove("grow");
        flyjet.classList.add("shrink");
    }
};

//Typing delayed animation
let prev = performance.now();
let times = 0;

requestAnimationFrame(function measure(time) {
    document.body.insertAdjacentHTML(
        "beforeend",
        Math.floor(time - prev) + " "
    );
    prev = time;
    if (times++ < 20) requestAnimationFrame(measure);
});

//Custom Elements
class TimeFormated extends HTMLElement {
    render() {
        let date = new Date(this.getAttribute("datetime") || Date.now());
        this.innerHTML = new Intl.DateTimeFormat("default", {
            year: this.getAttribute("year") || undefined,
            month: this.getAttribute("month") || undefined,
            day: this.getAttribute("day") || undefined,
            hour: this.getAttribute("hour") || undefined,
            minute: this.getAttribute("minute") || undefined,
            second: this.getAttribute("second") || undefined,
            timeZoneName: this.getAttribute("time-zone-name") || undefined,
        }).format(date);
    }
    connectedCallBack() {
        if (!this.rendered) {
            this.render();
            this.rendered;
        }
    }
    static get observedAttributes() {
        return [
            "datetime",
            "year",
            "month",
            "day",
            "hour",
            "minute",
            "second",
            "time-zone-name",
        ];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }
}
customElements.define("time-formatted", TimeFormated);
setInterval(() => elem.setAttribute("datetime", new Date()), 1000);

//Regular Expressions
let str = `1 Line
2 Line
3 Line`;
console.log(str.match(/^\d/gm));
console.log(str.match(/^\d/g));
console.log(str.match(/e$/gm));

console.log("Hello, Java!".match(/\bHello\b/));
console.log("12,34,54".match(/\b\d\d\b/g));

console.log("Mop Top".match(/[mt]op/gi));

console.log("acd2 23d".match(/[^0-9]\w*/g));

console.log("abcde".match(/\w{5,}/), "1 12 123".match(/\d+/g));

console.log("gogogo".match(/(go)+/g));

console.log("12- 3- 5".split(/-\s/));
