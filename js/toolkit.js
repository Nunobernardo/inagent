//#region HELP FUNCTIONS

function isStringVoid(obj) {
    return (isUndefinedOrNull(obj) ? true : (isEmpty(ifUndefinedOrNull(obj, ''))));
};

function isEmpty(obj) {
    return (obj == '');
};

function isUndefinedOrNull(obj) {
    if (typeof (obj) == 'undefined') return true;

    return (obj == null);
};

function ifUndefinedOrNull(argument, value) {
    if (isUndefinedOrNull(argument)) { argument = value; };

    return argument;
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
};

function isBase64(str) {
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    };
};

function IsValidWebsite(website) {
    var filter = /(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?/;

    return filter.test(website);
};

function GetIPAddress(after) {
    $.get('http://api.hostip.info/get_html.php', function (data) {
        var data = data.split("\n"),
            ipaddress;

        for (i = 0; data.length >= i; i++) {
            ipAddress = (!isUndefinedOrNull(data[i])) ? data[i].split(":") : new Array();

            if (ipAddress[0] == "IP") {
                ipaddress = ipAddress[1].trim();
                break;
            };
        };

        if (!isUndefinedOrNull(after)) { after(ipaddress) };
    });
};

//#endregion

//#region PROTOTYPES

String.prototype.toBoolean = function () {
    return (this.toLowerCase() == 'true') || (this == '1');
};

String.prototype.urlEncode = function () {
    var str = escape(this);

    return str.replace(/[*+\/@]|%20/g,
        function (s) {
            switch (s) {
                case "*": s = "%2A"; break;
                case "+": s = "%2B"; break;
                case "/": s = "%2F"; break;
                case "@": s = "%40"; break;
                case "%20": s = "+"; break;
            };

            return s;
        }
    );
};

String.prototype.urlDecode = function () {
    return unescape(this)
        .ReplaceAll("%2A", "*")
        .ReplaceAll("%2B", "+")
        .ReplaceAll("%2F", "/")
        .ReplaceAll("%40", "@")
        .ReplaceAll("+", "%20")
        .ReplaceAll("%5C", "\\");
};

String.prototype.format = function () {
    var str = this;

    if (arguments.length > 0) {
        var _args = new Array();

        if (Object.prototype.toString.call(arguments[0]) != '[object Array]') {
            for (var i = 0; i < arguments.length; i++) {
                try {
                    _args.push(arguments[i]);
                } catch (e) { };
            };
        } else {
            _args = arguments[0];
        };

        if (_args.length > 0) {
            for (var j = 0; j < _args.length; j++) {
                str = str.ReplaceAll('{' + j.toString() + '}', _args[j]);
                str = str.ReplaceAll('%7b' + j.toString() + '%7d', _args[j]);
            };
        };
    };

    return str.toString();
};

String.prototype.ReplaceAll = function (from, to) {
    var str = this;

    try {
        var pos = str.indexOf(from);

        while (pos > -1) {
            str = str.replace(from, to);
            pos = str.indexOf(from);
        };
    } catch (ex) { }

    return (str);
};

String.prototype.StripBase64Header = function () {
    var index = this.indexOf("base64,");

    if (index >= 0) {
        return this.substr(index + 7);
    } else {
        return this;
    };
};

Array.prototype.indexOfField = function (field, value) {
    for (var j = 0; j < this.length; j++) {
        if (this[j][field] == value) { return j; }
    };

    return -1;
};

Array.prototype.removeField = function (field, value) {
    var index = this.indexOfField(field, value);

    if (index != -1) { this.splice(index, 1); };

    return this;
};

Array.prototype.SingleFieldDistinct = function (field) {
    var array = new Array();

    for (var j = 0; j < this.length; j++) {
        array.pushdistinct(this[j][field]);
    };

    return array;
};

Array.prototype.pushdistinct = function (value, match) {
    if (typeof (value) == 'object') {
        for (var j = 0; j < this.length; j++) {
            if (match(this[j], value)) return this;
        };

        this.push(value);
    } else {
        if (!this.contains(value)) this.push(value);
    };

    return this;
};

Array.prototype.contains = function (value) {
    if (typeof (this) == "object") {
        return (this.indexOf(value) >= 0);
    };
};

Date.prototype.SimpleDateTime = function (format) {
    format = ifUndefinedOrNull(format, 'dd-mm-yyyy HH:MM');

    return this.format(format, 'getUTC');
};

Date.prototype.toYMD = function () {
    var year, month, day;

    year = String(this.getFullYear());
    month = String(this.getMonth() + 1);

    if (month.length == 1) {
        month = "0" + month;
    };

    day = String(this.getDate());

    if (day.length == 1) {
        day = "0" + day;
    };

    return year + "-" + month + "-" + day;
};

jQuery.fn.TransitionPrefixedEvent = function (type, callback, data) {
    var pfx = ['webkit', 'ms', 'o', ''],
        element = this;

    for (var j = 0; j < pfx.length; j++) {
        if (!pfx[j]) type = type.toLowerCase();

        if (!isUndefinedOrNull(data)) {
            element.on(pfx[j] + type, data, callback);
        } else {
            element.on(pfx[j] + type, callback);
        };
    };
};

$.fn.transitionend = function () {
    this.TransitionPrefixedEvent("TransitionEnd", arguments[(arguments.length == 1) ? 0 : 1], arguments[0]);
};

jQuery.fn.offtransitionend = function () {
    this.RemoveTransitionPrefixedEvent('TransitionEnd');
};

jQuery.fn.RemoveTransitionPrefixedEvent = function (type) {
    var pfx = ['webkit', 'MS', 'o', ''];
    var element = this;

    for (var j = 0; j < pfx.length; j++) {
        if (!pfx[j]) { type = type.toLowerCase(); };

        element.off(pfx[j] + type);
    };
};

//#endregion