/*! openspending.colors.js - Color palettes for OpenSpending
 * ------------------------------------------------------------------------
 *
 * Copyright 2013 Open Knowledge Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Define OpenSpending object (if used as a separate module)
var OpenSpending = OpenSpending || {};
// Define Colors property
OpenSpending.Colors = OpenSpending.Colors || {};

// Fallback color when something isn't found
OpenSpending.Colors.Fallback = '#424242';

// Default color palette for openspendingjs
OpenSpending.Colors.DefaultPalette = ["#CA221D", "#C22769", "#3F93E1", 
				      "#481B79", "#6AAC32", "#42928F",
				      "#D32645", "#CD531C", "#EDC92D",
				      "#A5B425", "#211D79", "#449256",
				      "#7A2077", "#CA221D", "#E29826",
				      "#44913D", "#2458A3", "#2458A3",
				      "#14388C"];

// Cofog color palette
OpenSpending.Colors.Cofog = { '01': '#C75746', '02': '#0AB971',
			      '03': '#EC2406', '04': '#790586', 
			      '05': '#2A3A03', '06': '#D33673',		
			      '07': '#4E6D00', '08': '#938626',
			      '09': '#EDC92D', '10': '#935B3B'	
			    };

OpenSpending.Colors.DefaultPalette.getColor = function (item, index, skip) {
    // getColor fetches the color of the index from an wrap around version
    // of the default palette (using modulo)
    var palette = this.slice(0);

    if (skip) {
	var idx = palette.indexOf(skip.toUpperCase()); // Find the index
	if(idx !== -1) palette.splice(idx, 1); // Remove it if really found!
    }

    if (index === undefined) {
        return OpenSpending.Colors.Fallback;
    }

    return palette[(index || 0) % (palette.length)];
};


OpenSpending.Colors.Cofog.getColor = function(item, index, skip) {
    // If item is string then it's the code, else we get it from item.name
    var code = (typeof item === 'string') ? item : (item.name || item.id);
    // We only want the top level of the code
    // (we're interested in the 10 in 10.1.1)
    if (code === undefined) {
        return OpenSpending.Colors.Fallback;
    }
    var top_level = code.substr(0, 2);
    return this[top_level] || OpenSpending.Colors.Fallback;
};

// Define Amounts property
OpenSpending.Amounts = OpenSpending.Amounts || {};

// Give a short hand version of the amount (with bn, m, k abbreviations)
OpenSpending.Amounts.shorthand = function (amount) {
    // Define supported amounts
    var billion = 1000000000;
    var million = 1000000;
    var thousand = 1000;

    // Get the absolute value (since negative numbers should work as well
    var absolute_amount = Math.abs(amount);

    // Billions get 'bn'
    if (absolute_amount > billion) {
	return OpenSpending.Amounts.format(amount / billion) + 'bn';
    }
    // Millions get 'm'
    else if (absolute_amount > million) {
	return OpenSpending.Amounts.format(amount / million) + 'm';
    }
    // Thousands get 'k'
    else if (absolute_amount > thousand) {
	return OpenSpending.Amounts.format(amount / thousand) + 'k';
    }
    // Anything less just returns the amount with two decimal places
    else {
	return OpenSpending.Amounts.format(amount, 2);
    }
};

// Format amount using accounting
OpenSpending.Amounts.format = function (amount, precision, currency) {
    // Get the currency symbol
    currency = OpenSpending.Amounts.currencySymbol(currency);
    // Use accounting.js to format the amount (default precision is 0)
    return accounting.formatMoney(amount, currency, precision||0,
				  OpenSpending.localeGroupSeparator,
				  OpenSpending.localeDecimalSeparator);
};

// Get the currency symbol
OpenSpending.Amounts.currencySymbol = function (currency) {
    // If currency is defined return currency symbol or currency
    if(currency) {
	return OpenSpending.Amounts.currencySymbols[currency] || currency;
    } else { // If not we just return an empty string
	return '';
    }
};

// All known currency symbols in openspendingjs
OpenSpending.Amounts.currencySymbols = {
    "AED": "د.إ", 
    "AFN": "؋",
    "ALL": "L",
    "AMD": "դր.",
    "ANG": "ƒ",
    "AOA": "Kz",
    "ARS": "$",
    "AUD": "$",
    "AWG": "ƒ",
    "AZN": "m",
    "BAM": "KM",
    "BBD": "$",
    "BDT": "৳",
    "BGN": "лв",
    "BHD": "ب.د",
    "BIF": "Fr",
    "BMD": "$",
    "BND": "$",
    "BOB": "Bs.",
    "BRL": "R$",
    "BSD": "$",
    "BTN": "Nu",
    "BWP": "P",
    "BYR": "Br",
    "BZD": "$",
    "CAD": "$",
    "CDF": "Fr",
    "CHF": "Fr",
    "CLP": "$",
    "CNY": "¥",
    "COP": "$",
    "CRC": "₡",
    "CUP": "$",
    "CVE": "$, Esc",
    "CZK": "Kč",
    "DJF": "Fr",
    "DKK": "kr",
    "DOP": "$",
    "DZD": "د.ج",
    "EEK": "KR",
    "EGP": "£,ج.م",
    "ERN": "Nfk",
    "ETB": "Br",
    "EUR": "€",
    "FJD": "$",
    "FKP": "£",
    "GBP": "£",
    "GEL": "ლ",
    "GHS": "₵",
    "GIP": "£",
    "GMD": "D",
    "GNF": "Fr",
    "GTQ": "Q",
    "GYD": "$",
    "HKD": "$",
    "HNL": "L",
    "HRK": "kn",
    "HTG": "G",
    "HUF": "Ft",
    "IDR": "Rp",
    "ILS": "₪",
    "INR": "₨",
    "IQD": "ع.د",
    "IRR": "﷼",
    "ISK": "kr",
    "JMD": "$",
    "JOD": "د.ا",
    "JPY": "¥",
    "KES": "KSh",
    "KGS": "лв",
    "KHR": "៛",
    "KMF": "Fr",
    "KPW": "₩",
    "KRW": "₩",
    "KWD": "د.ك",
    "KYD": "$",
    "KZT": "Т",
    "LAK": "₭",
    "LBP": "ل.ل",
    "LKR": "ரூ",
    "LRD": "$",
    "LSL": "L",
    "LTL": "Lt",
    "LVL": "Ls",
    "LYD": "ل.د",
    "MAD": "د.م.",
    "MDL": "MDL",
    "MGA": "Ar",
    "MKD": "ден",
    "MMK": "K",
    "MNT": "₮",
    "MOP": "P",
    "MRO": "UM",
    "MUR": "₨",
    "MVR": "ރ.",
    "MWK": "MK",
    "MXN": "$",
    "MYR": "RM",
    "MZN": "MT",
    "NAD": "$",
    "NGN": "₦",
    "NIO": "C$",
    "NOK": "kr",
    "NPR": "₨",
    "NZD": "$",
    "OMR": "ر.ع.",
    "PAB": "B/.",
    "PEN": "S/.",
    "PGK": "K",
    "PHP": "₱",
    "PKR": "₨",
    "PLN": "zł",
    "PYG": "₲",
    "QAR": "ر.ق",
    "RON": "RON",
    "RSD": "RSD",
    "RUB": "р.",
    "RWF": "Fr",
    "SAR": "ر.س",
    "SBD": "$",
    "SCR": "₨",
    "SDG": "S$",
    "SEK": "kr",
    "SGD": "$",
    "SHP": "£",
    "SLL": "Le",
    "SOS": "Sh",
    "SRD": "$",
    "STD": "Db",
    "SYP": "£, ل.س",
    "SZL": "L",
    "THB": "฿",
    "TJS": "ЅМ",
    "TMT": "m",
    "TND": "د.ت",
    "TOP": "T$",
    "TRY": "₤",
    "TTD": "$",
    "TWD": "$",
    "TZS": "Sh",
    "UAH": "₴",
    "UGX": "Sh",
    "USD": "$",
    "UYU": "$",
    "UZS": "лв",
    "VEF": "Bs",
    "VND": "₫",
    "VUV": "Vt",
    "WST": "T",
    "XAF": "Fr",
    "XCD": "$",
    "XOF": "Fr",
    "XPF": "Fr",
    "YER": "﷼",
    "ZAR": "R",
    "ZMK": "ZK",
    "ZWL": "$"
};
