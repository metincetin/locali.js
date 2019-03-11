function Locali() {
    this.keys = {};
    this.languages = [];
    this.currentLanguage;
    this.queryKey = "loc";
    
    this.loadUserLanguage = function () {
        var name = "localilan=";
        var cookie = decodeURIComponent(document.cookie);
        var allCookies = cookie.split(";");
        
        for (var i = 0; i < allCookies.length; i++) {
            while (allCookies[i].charAt(0) == " ") {
                allCookies[i] = allCookies[i].substring(1);
            }
            
            if (allCookies[i].indexOf(name) == 0) {
                if (allCookies[i].substring(name.length, allCookies[i].length) != undefined || c.substring(name.length, allCookies[i].length) != "") {
                    this.setLanguage(allCookies[i].substring(name.length, allCookies[i].length));
                }
            }
        }
    }

    this.setQueryKey = function(key) {
        this.queryKey = key;
    }

    this.addLanguage = function (name,localedName,locale) {
        this.languages.push({
            name: name,
            localedName:localedName==undefined?name:localedName,
            locale:locale==undefined? name.toLowerCase()+"-"+name.toUpperCase() : locale,
            keys: {}
        });
    }

    this.getCurrentLanguage = function () {
        return this.currentLanguage;
    }

 

    this.getLanguage = function (name) {
        var ret;
        this.languages.forEach(function (language) {
            if (language.name == name) {
                ret = language;
            }
        });
        return ret;
    }

    this.keyToString = function (name,key) {    
        return this.getLanguage(name).keys[key];
    }

    this.setKey = function (name, keyName, keyValue) {
        this.getLanguage(name).keys[keyName] = keyValue;
    }
    this.setKeys = function (keys) {
        for (key in keys) {
            for (language in keys[key]) {
                this.setKey(language, key, keys[key][language]);
            }
        }
    }
    this.setLanguageKeys = function (keys) {
        for (language in keys) {
            for (key in keys[language]) {
                this.setKey(language, key, keys[language][key]);
            }
        }
    }
    this.fromJSON = function (json) {
        this.languages = JSON.parse(json);
    }
    this.toJSON = function(){
        return JSON.stringify(this.languages);
    }
    this.setLanguage = function (name) {
        this.currentLanguage = this.getLanguage(name);

        /*setting the cookie*/
        var date = new Date();
        date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = "localilan=" + name + ";" + expires + ";path=/";  
        
    }
    this.translate = function () {
        if (this.currentLanguage == undefined) {
            this.currentLanguage = this.languages[0];
            //load the user language if had been set before
            this.loadUserLanguage();
        }

        for (var i = 0; i < document.querySelectorAll(this.queryKey).length; i++) {
            if (document.querySelectorAll(this.queryKey)[i].getAttribute("key") == undefined)
                document.querySelectorAll(this.queryKey)[i].setAttribute("key", document.querySelectorAll(this.queryKey)[i].innerHTML);
            document.querySelectorAll(this.queryKey)[i].innerHTML = this.keyToString(this.currentLanguage.name,document.querySelectorAll(this.queryKey)[i].getAttribute("key"));
        }
        if(document.querySelector("title") != undefined){
            if (document.querySelector("title").getAttribute("key") != undefined) {
                document.title = this.keyToString(this.currentLanguage.name,document.querySelector("title").getAttribute("key"));
            }
        }
    }
};
