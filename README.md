# locali.js
A small yet effective localization solution for web apps.

## Installation
Clone this repository and add `src/locali.js` to your head.
```html
<script src="src/locali.js"></script>
```

## Setting up your page
You need to set your page the way locali needs it to be. Every text you want it to be translated, should be writte inside `<loc></loc>` element. This tag name can be changed with `Locali.setQueryKey(queryKey)` method

You can either specify key as innerHTML or as `key` attribute
```html
<button><loc>l_welcome</loc></button>
```
or

```html
<button><loc key="l_welcome">This text will be translated, so you can use this as comment</loc></button>
```

you can translate title by adding key attribute to the element
```html
<title key="l_title">This will be translated.</title>
```

## Usage
You first need to instantiate a new Locali object
```js
var locali = new Locali();
```
then add the languages you want with `Locali.addLanguage(languageName,localizedName,locale)` method
```js
locali.addLanguage("tr","Türkçe") // with undefined 3rd (locale) parameter, locale will be set to 'languagename-LANGUAGENAME'
locali.addLanguage("fr","Français")
locali.addLanguage("pl") // with undefined 2nd (localizedName) parameter, it will be set to languageName
locali.addLanguage("en","English (UK)","en-UK")
```

then you need to set keys to these languages. There are two available each doing the same with different approach
```js
locali.setKeys({
	l_welcome:{
		en:"Welcome",
		tr:"Hoş geldiniz",
		fr:"Bienvenue",
		pl:"Witamy"
	},
	l_goodbye:{
		en:"Goodbye",
		tr:"Güle güle",
		fr:"Au revoir",
		pl:"Do widzenia"
	}
});

//or

locali.setLanguageKeys({
	en:{
		l_welcome:"Welcome",
		l_goodbye:"Goodbye"
	},
	tr:{
		l_welcome:"Hoş geldiniz",
		l_goodbye:"Güle güle"
	},
	pl:{
		l_welcome:"Witamy",
		l_goodbye:"Do widzenia"
	},
	fr:{
		l_welcome:"Bienvenue",
		l_goodbye:"Au revoir"
	}
})
```

After setting the keys with whichever method you like, you can translate your page
```js
locali.setLanguage("tr")
locali.translate()
```

When you once you set the language with `Locali.setLanguage(languageName)` method it will save a cookie to remember the user language. Whenever you call ``Locali.loadUserLanguage()` or translate the page without setting a language, it will load the user's language automatically.

## License

[MIT](https://github.com/metincetin/locali.js/blob/master/LICENSE)
