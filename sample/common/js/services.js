/**
 * This module uses the open weather API. See practical article on
 * operations that are not limited by same origin policy
 * http://arunisrael.com/2013/08/25/accessing-external-apis-with-angularjs.html
 */
angular.module('sample.services',[])
.constant('weatherAPI', {
		url: 'http://api.openweathermap.org/data/2.5/weather',
		forecastUrl: 'http://api.openweathermap.org/data/2.5/forecast',
		key: 'b1fd36a98f2f1ed2d72cdd1c6ff5ed76'
	})
.service('adminService', ['$http', '$q', 'weatherAPI', function($http, $q, weatherAPI) {

	var countries = [
		{code: "AD", name: "Andorra"},
		{code: "AE", name: "United Arab Emirates"},
		{code: "AF", name: "Afghanistan"},
		{code: "AG", name: "Antigua and Barbuda"},
		{code: "AI", name: "Anguilla"},
		{code: "AL", name: "Albania"},
		{code: "AM", name: "Armenia"},
		{code: "AO", name: "Angola"},
		{code: "AQ", name: "Antarctica"},
		{code: "AR", name: "Argentina"},
		{code: "AS", name: "American Samoa"},
		{code: "AT", name: "Austria"},
		{code: "AU", name: "Australia"},
		{code: "AW", name: "Aruba"},
		{code: "AX", name: "Åland Islands"},
		{code: "AZ", name: "Azerbaijan"},
		{code: "BA", name: "Bosnia and Herzegovina"},
		{code: "BB", name: "Barbados"},
		{code: "BD", name: "Bangladesh"},
		{code: "BE", name: "Belgium"},
		{code: "BF", name: "Burkina Faso"},
		{code: "BG", name: "Bulgaria"},
		{code: "BH", name: "Bahrain"},
		{code: "BI", name: "Burundi"},
		{code: "BJ", name: "Benin"},
		{code: "BL", name: "Saint Barthélemy"},
		{code: "BM", name: "Bermuda"},
		{code: "BN", name: "Brunei Darussalam"},
		{code: "BO", name: "Bolivia, Plurinational State of"},
		{code: "BQ", name: "Bonaire, Sint Eustatius and Saba"},
		{code: "BR", name: "Brazil"},
		{code: "BS", name: "Bahamas"},
		{code: "BT", name: "Bhutan"},
		{code: "BV", name: "Bouvet Island"},
		{code: "BW", name: "Botswana"},
		{code: "BY", name: "Belarus"},
		{code: "BZ", name: "Belize"},
		{code: "CA", name: "Canada"},
		{code: "CC", name: "Cocos (Keeling) Islands"},
		{code: "CD", name: "Congo, the Democratic Republic of the"},
		{code: "CF", name: "Central African Republic"},
		{code: "CG", name: "Congo"},
		{code: "CH", name: "Switzerland"},
		{code: "CI", name: "Côte d'Ivoire"},
		{code: "CK", name: "Cook Islands"},
		{code: "CL", name: "Chile"},
		{code: "CM", name: "Cameroon"},
		{code: "CN", name: "China"},
		{code: "CO", name: "Colombia"},
		{code: "CR", name: "Costa Rica"},
		{code: "CU", name: "Cuba"},
		{code: "CV", name: "Cabo Verde"},
		{code: "CW", name: "Curaçao"},
		{code: "CX", name: "Christmas Island"},
		{code: "CY", name: "Cyprus"},
		{code: "CZ", name: "Czech Republic"},
		{code: "DE", name: "Germany"},
		{code: "DJ", name: "Djibouti"},
		{code: "DK", name: "Denmark"},
		{code: "DM", name: "Dominica"},
		{code: "DO", name: "Dominican Republic"},
		{code: "DZ", name: "Algeria"},
		{code: "EC", name: "Ecuador"},
		{code: "EE", name: "Estonia"},
		{code: "EG", name: "Egypt"},
		{code: "EH", name: "Western Sahara"},
		{code: "ER", name: "Eritrea"},
		{code: "ES", name: "Spain"},
		{code: "ET", name: "Ethiopia"},
		{code: "FI", name: "Finland"},
		{code: "FJ", name: "Fiji"},
		{code: "FK", name: "Falkland Islands (Malvinas)"},
		{code: "FM", name: "Micronesia, Federated States of"},
		{code: "FO", name: "Faroe Islands"},
		{code: "FR", name: "France"},
		{code: "GA", name: "Gabon"},
		{code: "GB", name: "United Kingdom"},
		{code: "GD", name: "Grenada"},
		{code: "GE", name: "Georgia"},
		{code: "GF", name: "French Guiana"},
		{code: "GG", name: "Guernsey"},
		{code: "GH", name: "Ghana"},
		{code: "GI", name: "Gibraltar"},
		{code: "GL", name: "Greenland"},
		{code: "GM", name: "Gambia"},
		{code: "GN", name: "Guinea"},
		{code: "GP", name: "Guadeloupe"},
		{code: "GQ", name: "Equatorial Guinea"},
		{code: "GR", name: "Greece"},
		{code: "GS", name: "South Georgia and the South Sandwich Islands"},
		{code: "GT", name: "Guatemala"},
		{code: "GU", name: "Guam"},
		{code: "GW", name: "Guinea-Bissau"},
		{code: "GY", name: "Guyana"},
		{code: "HK", name: "Hong Kong"},
		{code: "HM", name: "Heard Island and McDonald Islands"},
		{code: "HN", name: "Honduras"},
		{code: "HR", name: "Croatia"},
		{code: "HT", name: "Haiti"},
		{code: "HU", name: "Hungary"},
		{code: "ID", name: "Indonesia"},
		{code: "IE", name: "Ireland"},
		{code: "IL", name: "Israel"},
		{code: "IM", name: "Isle of Man"},
		{code: "IN", name: "India"},
		{code: "IO", name: "British Indian Ocean Territory"},
		{code: "IQ", name: "Iraq"},
		{code: "IR", name: "Iran, Islamic Republic of"},
		{code: "IS", name: "Iceland"},
		{code: "IT", name: "Italy"},
		{code: "JE", name: "Jersey"},
		{code: "JM", name: "Jamaica"},
		{code: "JO", name: "Jordan"},
		{code: "JP", name: "Japan"},
		{code: "KE", name: "Kenya"},
		{code: "KG", name: "Kyrgyzstan"},
		{code: "KH", name: "Cambodia"},
		{code: "KI", name: "Kiribati"},
		{code: "KM", name: "Comoros"},
		{code: "KN", name: "Saint Kitts and Nevis"},
		{code: "KP", name: "Korea, Democratic People's Republic of"},
		{code: "KR", name: "Korea, Republic of"},
		{code: "KW", name: "Kuwait"},
		{code: "KY", name: "Cayman Islands"},
		{code: "KZ", name: "Kazakhstan"},
		{code: "LA", name: "Lao People's Democratic Republic"},
		{code: "LB", name: "Lebanon"},
		{code: "LC", name: "Saint Lucia"},
		{code: "LI", name: "Liechtenstein"},
		{code: "LK", name: "Sri Lanka"},
		{code: "LR", name: "Liberia"},
		{code: "LS", name: "Lesotho"},
		{code: "LT", name: "Lithuania"},
		{code: "LU", name: "Luxembourg"},
		{code: "LV", name: "Latvia"},
		{code: "LY", name: "Libya"},
		{code: "MA", name: "Morocco"},
		{code: "MC", name: "Monaco"},
		{code: "MD", name: "Moldova, Republic of"},
		{code: "ME", name: "Montenegro"},
		{code: "MF", name: "Saint Martin (French part)"},
		{code: "MG", name: "Madagascar"},
		{code: "MH", name: "Marshall Islands"},
		{code: "MK", name: "Macedonia, the former Yugoslav Republic of"},
		{code: "ML", name: "Mali"},
		{code: "MM", name: "Myanmar"},
		{code: "MN", name: "Mongolia"},
		{code: "MO", name: "Macao"},
		{code: "MP", name: "Northern Mariana Islands"},
		{code: "MQ", name: "Martinique"},
		{code: "MR", name: "Mauritania"},
		{code: "MS", name: "Montserrat"},
		{code: "MT", name: "Malta"},
		{code: "MU", name: "Mauritius"},
		{code: "MV", name: "Maldives"},
		{code: "MW", name: "Malawi"},
		{code: "MX", name: "Mexico"},
		{code: "MY", name: "Malaysia"},
		{code: "MZ", name: "Mozambique"},
		{code: "NA", name: "Namibia"},
		{code: "NC", name: "New Caledonia"},
		{code: "NE", name: "Niger"},
		{code: "NF", name: "Norfolk Island"},
		{code: "NG", name: "Nigeria"},
		{code: "NI", name: "Nicaragua"},
		{code: "NL", name: "Netherlands"},
		{code: "NO", name: "Norway"},
		{code: "NP", name: "Nepal"},
		{code: "NR", name: "Nauru"},
		{code: "NU", name: "Niue"},
		{code: "NZ", name: "New Zealand"},
		{code: "OM", name: "Oman"},
		{code: "PA", name: "Panama"},
		{code: "PE", name: "Peru"},
		{code: "PF", name: "French Polynesia"},
		{code: "PG", name: "Papua New Guinea"},
		{code: "PH", name: "Philippines"},
		{code: "PK", name: "Pakistan"},
		{code: "PL", name: "Poland"},
		{code: "PM", name: "Saint Pierre and Miquelon"},
		{code: "PN", name: "Pitcairn"},
		{code: "PR", name: "Puerto Rico"},
		{code: "PS", name: "Palestine, State of"},
		{code: "PT", name: "Portugal"},
		{code: "PW", name: "Palau"},
		{code: "PY", name: "Paraguay"},
		{code: "QA", name: "Qatar"},
		{code: "RE", name: "Réunion"},
		{code: "RO", name: "Romania"},
		{code: "RS", name: "Serbia"},
		{code: "RU", name: "Russian Federation"},
		{code: "RW", name: "Rwanda"},
		{code: "SA", name: "Saudi Arabia"},
		{code: "SB", name: "Solomon Islands"},
		{code: "SC", name: "Seychelles"},
		{code: "SD", name: "Sudan"},
		{code: "SE", name: "Sweden"},
		{code: "SG", name: "Singapore"},
		{code: "SH", name: "Saint Helena, Ascension and Tristan da Cunha"},
		{code: "SI", name: "Slovenia"},
		{code: "SJ", name: "Svalbard and Jan Mayen"},
		{code: "SK", name: "Slovakia"},
		{code: "SL", name: "Sierra Leone"},
		{code: "SM", name: "San Marino"},
		{code: "SN", name: "Senegal"},
		{code: "SO", name: "Somalia"},
		{code: "SR", name: "Suriname"},
		{code: "SS", name: "South Sudan"},
		{code: "ST", name: "Sao Tome and Principe"},
		{code: "SV", name: "El Salvador"},
		{code: "SX", name: "Sint Maarten (Dutch part)"},
		{code: "SY", name: "Syrian Arab Republic"},
		{code: "SZ", name: "Swaziland"},
		{code: "TC", name: "Turks and Caicos Islands"},
		{code: "TD", name: "Chad"},
		{code: "TF", name: "French Southern Territories"},
		{code: "TG", name: "Togo"},
		{code: "TH", name: "Thailand"},
		{code: "TJ", name: "Tajikistan"},
		{code: "TK", name: "Tokelau"},
		{code: "TL", name: "Timor-Leste"},
		{code: "TM", name: "Turkmenistan"},
		{code: "TN", name: "Tunisia"},
		{code: "TO", name: "Tonga"},
		{code: "TR", name: "Turkey"},
		{code: "TT", name: "Trinidad and Tobago"},
		{code: "TV", name: "Tuvalu"},
		{code: "TW", name: "Taiwan, Province of China"},
		{code: "TZ", name: "Tanzania, United Republic of"},
		{code: "UA", name: "Ukraine"},
		{code: "UG", name: "Uganda"},
		{code: "UM", name: "United States Minor Outlying Islands"},
		{code: "US", name: "United States"},
		{code: "UY", name: "Uruguay"},
		{code: "UZ", name: "Uzbekistan"},
		{code: "VA", name: "Holy See (Vatican City State)"},
		{code: "VC", name: "Saint Vincent and the Grenadines"},
		{code: "VE", name: "Venezuela, Bolivarian Republic of"},
		{code: "VG", name: "Virgin Islands, British"},
		{code: "VI", name: "Virgin Islands, U.S."},
		{code: "VN", name: "Viet Nam"},
		{code: "VU", name: "Vanuatu"},
		{code: "WF", name: "Wallis and Futuna"},
		{code: "WS", name: "Samoa"},
		{code: "YE", name: "Yemen"},
		{code: "YT", name: "Mayotte"},
		{code: "ZA", name: "South Africa"},
		{code: "ZM", name: "Zambia"},
		{code: "ZW", name: "Zimbabwe"}
	];
	
	/**
	 * Promise that resolves with provided argument.
	 */
	var toPromise = function(data) {
		var deferred = $q.defer();
		deferred.resolve(data);
		return deferred.promise;
	};
	
	var allCountriesFn = function() {
		return toPromise(countries);
	};
	
	/**
	 * @returns Promise which parameter with object for city found
	 * or undefined
	 */
	var findCityByNameFn = function(name, countryCode) {
		return $http.get(weatherAPI.url,
				{params: {q: name + ',' + countryCode,
		                  APPID: weatherAPI.key}})
		.then(function(httpResponse) {
			var result = undefined;

			var data = httpResponse.data;
			if (data.cod === 200) {
				result = {
						id: data.id,
						name: data.name,
						country: countryCode
					};
			}
			return result;
		});
	};
	
	/** Cities are held in memory. Initializing with a couple of cities */
	var cities = [
		{name: "Paris", country: "FR", id: 2988507},
		{name: "Toulouse", country: "FR", id: 2972315},
		{name: "Berlin", country: "DE", id: 2950159},
		{name: "Munich", country: "DE", id: 2867714},
		{name: "London", country: "GB", id: 2643743},
		{name: "Basingstoke", country: "GB", id: 2656192}
	];

	/**
	 * @returns Promise which parameter of successful function
	 *          is an object with properties:
	 *          - countryMap : country code to country object
	 *          - cities : array of city objects
	 *          - byCountry : country code to array of cities
	 */
	var allCitiesFn = function() {
		return allCountriesFn()
		.then(function(countries) {
			var countryMap = {};
			angular.forEach(countries, function(c) {
				countryMap[c.code] = c;
			});

			var byCountry = {};
			angular.forEach(cities, function(l) {
				var citiesForCountry = byCountry[l.country];
				if (! citiesForCountry) {
					citiesForCountry = byCountry[l.country] = [];
				}
				citiesForCountry.push(l);
			});
			return {
				countryMap: countryMap,
				byCountry: byCountry,
				cities: cities
			};
		});
	};

	/**
	 * @returns Promise which parameter of successful function
	 *          is an array of country objects which have a city
	 *          recorded against them
	 */
	var countriesFn = function() {
		return allCitiesFn()
		.then(function(allCities) {
			var result; result = [];

			for (var code in allCities.byCountry) {
				result.push(allCities.countryMap[code]);
			}
			return result;
		});
	};

	/**
	 * @returns Promise which parameter of successful function
	 *          is an array of city objects
	 */
	var citiesFn = function() {
		return allCitiesFn()
		.then(function(allCities) {
			return allCities.cities;
		});
	};

	/**
	 * @returns Promise which parameter of successful function
	 *          is an array of city objects
	 */
	var citiesForCountryFn = function(countryCode) {
		return allCitiesFn()
		.then(function(allCities) {
			return allCities.byCountry[countryCode];
		});
	};

	/**
	 * @returns Promise which parameter of successful function
	 * is the updated list of cities
	 */
	var addCityFn = function(city) {
		var present = (! city);
		for (var i = 0; (! present) && i < cities.length; i++) {
			if (cities[i].id === city.id) {
				present = cities[i];
			}
		}
		if (! present) {
			cities.push(city);
		}
		return citiesFn();
	};

	return {
		findCityByName: findCityByNameFn,
		addCity: addCityFn,
		allCountries: allCountriesFn,
		cities: citiesFn,
		countries: countriesFn,
		citiesForCountry: citiesForCountryFn
	};	
}])
.service('weatherService', ['$http', 'weatherAPI', function($http, weatherAPI) {

	var toWeatherItem = function(data) {
		var dt = (data.dt_txt)?data.dt_txt.replace(' ','T'):undefined;
		return {
			name: data.name,
			date: dt,
			temp: data.main.temp - 273.15,
			humidity: data.main.humidity,
			main: data.weather[0].main,
			description: data.weather[0].description,
			iconUrl: 'http://openweathermap.org/img/w/'+ data.weather[0].icon + '.png'
		};	
	};

	var currentFn = function(cityId) {
		return $http.get(weatherAPI.url,
				{params: {id: cityId,
		                  APPID: weatherAPI.key}})
		.then(function(httpResponse) {
			return toWeatherItem(httpResponse.data);	
		});
	};

	var forecastFn = function(cityId) {
		return $http.get(weatherAPI.forecastUrl,
				{params: {id: cityId,
		                  APPID: weatherAPI.key}})
		.then(function(httpResponse) {
			var result; result = [];
			var data = httpResponse.data.list;
			for (var i = 0; i < data.length && i < 17; i++) {
				result.push(toWeatherItem(data[i]));
			}
			return result;
		});
	};

	return {
		current: currentFn,
		forecast: forecastFn
	};
}]);

