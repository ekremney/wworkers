/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property
* laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/

/** @license ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.23.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/

/*********************************************************************
* Class AppMeasurement(): Track for tracking
*
* @constructor
* @noalias
*********************************************************************/
function AppMeasurement(account) {
	/**
	  * @type {AppMeasurement}
	  * @noalias
	  */
	var s = this;

	s.version = "2.23.0";

	/**
	  * @type {!Window}
	  * @noalias
	  */
	var w = window;
	if (!w.s_c_in) {
		w.s_c_il = [];
		w.s_c_in = 0;
	}
	s._il = w.s_c_il;
	s._in = w.s_c_in;
	s._il[s._in] = s;
	w.s_c_in++;
	s._c="s_c";

	var thisClass = w.AppMeasurement;

	// This and the use of Null below is a hack to keep Google Closure Compiler from creating a global variable for null
	var Null = thisClass.Null;
	if (!Null) {
		Null = null;
	}

	// Get the top frame set
	var
		topFrameSet = w,
		parent,
		location;
	try {
		parent = topFrameSet.parent;
		location = topFrameSet.location;
		while ((parent) &&
			(parent.location) &&
			(location) &&
			("" + parent.location !== "" + location) &&
			(topFrameSet.location) &&
			("" + parent.location !== "" + topFrameSet.location) &&
			(parent.location.host === location.host)) {
			topFrameSet = parent;
			parent = topFrameSet.parent;
		}
	} catch (e) {}

	/*********************************************************************
	* Function log(message): Log message to console
	*     message = Message
	* Returns:
	*     Nothing
	*********************************************************************/
	s.log = function(message) {
		try {
			/* eslint-disable no-console */
			console.log(message);
			/* eslint-enable no-console */
		} catch(e) {}
	};

	// REMOVE_FOR_PRODUCTION_BUILD_START
	s.logDebug = function() {
		// Adding a yellow square for visibility
		Array.prototype.unshift.call(arguments, "🟨");
		/* eslint-disable no-console */
		console.log.apply(null, arguments);
		/* eslint-enable no-console */
	};
	// REMOVE_FOR_PRODUCTION_BUILD_END

	/*********************************************************************
	* Function isNumber(x): Is string a number?
	*     x = String/number to check
	* Returns:
	*     True if number, false if not
	*********************************************************************/
	s.isNumber = function(x) {
		return ("" + parseInt(x) == "" + x);
	};

	/*********************************************************************
	* Function replace(x,o,n): String replace
	*     x = Source string
	*     o = String to match
	*     n = String to replaces all matches with
	* Returns:
	*     x with all o's replaced with n's
	*********************************************************************/
	s.replace = function(x,o,n) {
		if ((!x) || (x.indexOf(o) < 0)) {
			return x;
		}
		return x.split(o).join(n);
	};

	/*********************************************************************
	* Function escape(x): String URL-encode (sometimes "+" is not URL
	*                     encoded)
	*     x = String to URL-encode
	* Returns:
	*     URL-encoded [x]
	*********************************************************************/
	s.escape = function(x) {
		var
			y,
			fix = "+~!*()'",
			fixPos,
			fixChar;
		if (!x) {
			return x;
		}
		y = encodeURIComponent(x);
		for (fixPos = 0;fixPos < fix.length;fixPos++) {
			fixChar = fix.substring(fixPos,(fixPos + 1));
			if (y.indexOf(fixChar) >= 0) {
				y = s.replace(y,fixChar,"%" + fixChar.charCodeAt(0).toString(16).toUpperCase());
			}
		}
		return y;
	};

	/*********************************************************************
	* Function unescape(x): String URL-decode (sometimes "+" is not URL
	*                       decoded)
	*     x = String to URL-decode
	* Returns:
	*     URL-decoded [x]
	*********************************************************************/
	s.unescape = function(x) {
		var
			y;
		if (!x) {
			return x;
		}
		y = (x.indexOf("+") >= 0 ? s.replace(x,"+"," ") : x);
		try {
			return decodeURIComponent(y);
		} catch (e) {}
		return unescape(y);
	};

	/*********************************************************************
	* Function getCookieDomain(): Generate and return domain to use for setting cookies
	*     Nothing
	* Returns:
	*     Domain to use for setting cookies
	*********************************************************************/
	s.getCookieDomain = function() {
		var
			d = w.location.hostname,
			n = s.fpCookieDomainPeriods,
			p;
		if (!n) {
			n = s.cookieDomainPeriods;
		}
		if ((d) && (!s.cookieDomain) && (!(/^[0-9.]+$/).test(d))) {
			n = (n ? parseInt(n) : 2);
			n = (n > 2? n : 2);
			p = d.lastIndexOf(".");
			if (p >= 0) {
				while ((p >= 0) && (n > 1)) {
					p = d.lastIndexOf(".",p - 1);
					n--;
				}
				s.cookieDomain = (p > 0 ? d.substring(p) : d);
			}
		}
		return s.cookieDomain;
	};

	/*********************************************************************
	* Function cookieRead(k): Read, URL-decode, and return value of k in cookies
	*     k = key to read value for out of cookies
	* Returns:
	*     Value of k in cookies if found, blank if not
	*********************************************************************/
	s.c_r = s.cookieRead = function(k) {
		k = s.escape(k);
		var
			c = " " + s.d.cookie,
			i = c.indexOf(" " + k + "="),
			e = (i < 0 ? i : c.indexOf(";",i)),
			v = (i < 0 ? "" : s.unescape(c.substring((i + 2 + k.length),(e < 0 ? c.length : e))));
		return (v != "[[B]]" ? v : "");
	};

	/*********************************************************************
	* Function cookieWrite(k,v,e): Write value v as key k in cookies with
	*                              optional expiration e and domain automaticly
	*                              generated by getCookieDomain()
	*     k = key to write value for in cookies
	*     v = value to write to cookies
	*     e = optional expiration Date object or 1 to use default expiration
	* Returns:
	*     True if value was successfuly written and false if it was not
	*********************************************************************/
	s.c_w = s.cookieWrite = function(k,v,e) {
		var
			d = s.getCookieDomain(),
			l = s.cookieLifetime,
			t,
			DEFAULT_COOKIE_EXPIRATION_IN_YEARS = 2;
		v = "" + v;
		l = (l ? ("" + l).toUpperCase() : "");
		if ((e) && (l != "SESSION") && (l != "NONE")) {
			t = (v != "" ? parseInt(l ? l : 0) : -60);
			if (t) {
				e = new Date;
				e.setTime(e.getTime() + (t * 1000));
			} else if (e === 1) {
				e = new Date;
				var y = e.getYear();
				e.setYear( y +
						DEFAULT_COOKIE_EXPIRATION_IN_YEARS +
						(y < 1900 ? 1900 : 0));
			}
		}
		if ((k) && (l != "NONE")) {
			s.d.cookie = s.escape(k) + "=" + s.escape(v != ""? v : "[[B]]" ) + "; path=/;"
				+ ((e) && (l != "SESSION") ? " expires=" + e.toUTCString() + ";" : "")
				+ (d ? " domain=" + d + ";" : "") + (s.writeSecureCookies ? " secure;" : "");
			return (s.cookieRead(k) == v);
		}
		return 0;
	};

	/*********************************************************************
	* Function disableIfUnsupportedBrowser
	*     Disables AppMeasurement by replacing all methods with NOP
	*     functions if the browser version is not supported.
	* Returns:
	*     Returns disabled AppMeasurement instance
	*********************************************************************/
	s.disableIfUnsupportedBrowser = function() {
		var ieVersion = s.Util["getIeVersion"]();
		var isIeLessThanTen = typeof ieVersion === "number" && ieVersion < 10;
		if (isIeLessThanTen) {
			s["unsupportedBrowser"] = true;
			return s._replaceMethodsWithFunction(s, function () {});
		}
	};

	s._isInternetExplorer = function() {
		var appName = navigator.appName;
		var userAgent = navigator.userAgent;
		if ((appName === "Microsoft Internet Explorer") ||
				(userAgent.indexOf("MSIE ") >= 0) ||
				((userAgent.indexOf("Trident/") >= 0) && (userAgent.indexOf("Windows NT 6") >= 0))) {
			return true;
		}
		return false;
	};

	/*********************************************************************
	* Function _replaceMethodsWithFunction(obj, fn)
 	*     obj = The object which methods will be replaced
 	*     fn  = The function to replace methods with
	*     This function was copied from: visitor-js-client
	*     TODO: Get this via a shared npm module instead
	* Returns:
	*     Returns obj with all methods replaced with fn
	*********************************************************************/
	s._replaceMethodsWithFunction = function (obj, fn) {
		for (var apiName in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, apiName) && typeof obj[apiName] === "function") {
				obj[apiName] = fn;
			}
		}
		return obj;
	};

	/*********************************************************************
	* Function delayCall(methodName,args,onlyPrerender): Delay a call to a method if needed
	*     methodName    = Name of method called
	*     args          = Arguments to method call
	*     onlyPrerender = Optionally only delay due to prerender
	* Returns:
	*     1 if a delay is needed or 0 if not
	*********************************************************************/
	s.delayCallQueue = [];
	s.delayCall = function(methodName,args,onlyPrerender) {
		if (s.delayCallDisabled)
			return 0;

		if (!s.maxDelay) {
			s.maxDelay = 250;
		}

		var
			delayNeeded = 0,
			tm = new Date,
			timeout = tm.getTime() + s.maxDelay,
			visibilityState = s.d.visibilityState,
			visibilityStateEventList = ["webkitvisibilitychange","visibilitychange"],
			visibilityStateEventNum;

		if (!visibilityState) {
			visibilityState = s.d.webkitVisibilityState;
		}
		if ((visibilityState) && (visibilityState == "prerender")) {
			if (!s.delayCallPrerender) {
				s.delayCallPrerender = 1;
				for (visibilityStateEventNum = 0;visibilityStateEventNum < visibilityStateEventList.length;visibilityStateEventNum++) {
					s.d.addEventListener(visibilityStateEventList[visibilityStateEventNum],function() {
						var
							visibilityState = s.d.visibilityState;
						if (!visibilityState) {
							visibilityState = s.d.webkitVisibilityState;
						}
						if (visibilityState == "visible") {
							s.delayCallPrerender = 0;
							s["delayReady"]();
						}
					});
				}
			}
			delayNeeded = 1;
			timeout = 0;
		} else if (!onlyPrerender) {
			if (s.callModuleMethod("_d")) {
				delayNeeded = 1;
			}
		}

		if (delayNeeded) {
			s.delayCallQueue.push({
				"m":methodName,
				"a":args,
				"t":timeout
			});
			if (!s.delayCallPrerender) {
				setTimeout(s["delayReady"],s.maxDelay);
			}
		}

		return delayNeeded;
	};

	/*********************************************************************
	* Function delayReady(): Handle the possible end of the delay
	*     Nothing
	* Returns:
	*     Nothing
	*********************************************************************/
	s["delayReady"] = function() {
		var
			tm = new Date,
			now = tm.getTime(),
			delayNeeded = 0,
			entry;
		if (s.callModuleMethod("_d")) {
			delayNeeded = 1;
		} else {
			// s.delayReady is already called by the Integrate module when a module is ready so we're pigybacking on that to update the modules ready state
			s._modulesReadyCallback();
		}
		while (s.delayCallQueue.length > 0) {
			entry = s.delayCallQueue.shift();
			if ((delayNeeded) && (!entry["t"]) && (entry["t"] > now)) {
				s.delayCallQueue.unshift(entry);
				setTimeout(s["delayReady"],parseInt(s.maxDelay / 2));
				return;
			}
			s.delayCallDisabled = 1;
			s[entry["m"]].apply(s,entry["a"]);
			s.delayCallDisabled = 0;
		}
	};

	/*********************************************************************
	* Function setAccount(account): Change the account for this instance but still keep track of the account history for this instance
	*     account = New account
	* Returns:
	*     Nothing
	*********************************************************************/
	s.setAccount = s.sa = function(account) {
		var
			accountList,
			accountNum;

		// Handle any delay that's needed
		if (s.delayCall("setAccount",arguments)) {
			return;
		}

		s.account = account;
		if (!s.allAccounts) {
			s.allAccounts = account.split(",");
		} else {
			accountList = s.allAccounts.concat(account.split(","));
			s.allAccounts = [];
			accountList.sort();
			for (accountNum = 0;accountNum < accountList.length;accountNum++) {
				if ((accountNum == 0) || (accountList[(accountNum - 1)] != accountList[accountNum])) {
					s.allAccounts.push(accountList[accountNum]);
				}
			}
		}
	};

	/*********************************************************************
	* Function foreachVar(varHandler,trackVars): Interate over all variables filtered based on the current state and hand them to the passd in handler function
	*     varHandler = Variable handler function:
	*                  function(varKey,varValue) {
	*                       ...
	*                  }
	*     trackVars  = Option string containing an additional filter for variables
	* Returns:
	*     Nothing
	*********************************************************************/
	s.foreachVar = function(varHandler,trackVars) {
		var
			varList,
			varNum,
			varKey,
			varValue,
			varFilter = "",
			eventFilter = "",
			moduleName = "";

		// Setup list
		if (s.lightProfileID) {
			varList = s.lightVarList;
			varFilter = s.lightTrackVars;
			if (varFilter) {
				varFilter = "," + varFilter + "," + s.lightRequiredVarList.join(",") + ",";
			}
		} else {
			varList = s.accountVarList;

			// Setup filters
			if ((s.pe) || (s.linkType)) {
				varFilter   = s.linkTrackVars;
				eventFilter = s.linkTrackEvents;
				if (s.pe) {
					moduleName = s.pe.substring(0,1).toUpperCase() + s.pe.substring(1);
					if (s[moduleName]) {
						varFilter   = s[moduleName].trackVars;
						eventFilter = s[moduleName].trackEvents;
					}
				}
			}
			if (varFilter) {
				varFilter = "," + varFilter + "," + s.requiredVarList.join(",") + ",";
			}
			if (eventFilter) {
				eventFilter = "," + eventFilter + ",";
				if (varFilter) {
					varFilter += ",events,";
				}
			}
		}

		if (trackVars) {
			trackVars = "," + trackVars + ",";
		}

		for (varNum = 0;varNum < varList.length;varNum++) {
			varKey   = varList[varNum];
			varValue = s[varKey];

			// If we have a value and this variable is not filtered out
			if ((varValue) &&
				((!varFilter) || (varFilter.indexOf("," + varKey + ",") >= 0)) &&
				((!trackVars) || (trackVars.indexOf("," + varKey + ",") >= 0))) {
				varHandler(varKey,varValue);
			}
		}
	};

	/*********************************************************************
	* Function serializeToQueryString(varKey,varValue,varFilter,varFilterPrefix,filter): Serialize an object to a query-string structure
	*     varKey          = Name of the object
	*     varValue        = The object
	*     varFilter       = Filter for variables
	*     varFilterPrefix = Filter prefix for variables
	*     filter          = Used internaly for recursive calls to group structure members
	* Returns:
	*     Serialized object or empty string if nothing to serialize
	*********************************************************************/
	s.serializeToQueryString = function(varKey,varValue,varFilter,varFilterPrefix,filter) {
		var
			queryString = "",
			subVarKey,
			subVarValue,
			subVarPrefix,
			subVarSuffix,
			nestedKeyEnd,
			nestedKey,
			nestedFilter,
			nestedFilterList = 0,
			nestedFilterNum,
			nestedFilterMatch;

		if (varKey == "contextData") {
			varKey = "c";
		}
		if (varKey == "clientHints") {
			varKey = "h";
		}

		if (varValue) {
			for (subVarKey in varValue) {
				if ((!Object.prototype[subVarKey]) &&
					((!filter) || (subVarKey.substring(0,filter.length) == filter)) &&
					(varValue[subVarKey]) &&
					((!varFilter) || (varFilter.indexOf("," + (varFilterPrefix ? varFilterPrefix + "." : "") + subVarKey + ",") >= 0))) {
					nestedFilterMatch = false;
					if (nestedFilterList) {
						for (nestedFilterNum = 0;nestedFilterNum < nestedFilterList.length;nestedFilterNum++) {
							if (subVarKey.substring(0,nestedFilterList[nestedFilterNum].length) == nestedFilterList[nestedFilterNum]) {
								nestedFilterMatch = true;
								break;
							}
						}
					}
					if (!nestedFilterMatch) {
						if (queryString == "") {
							queryString += "&" + varKey + ".";
						}
						subVarValue = varValue[subVarKey];
						if (filter) {
							subVarKey = subVarKey.substring(filter.length);
						}
						if (subVarKey.length > 0) {
							nestedKeyEnd = subVarKey.indexOf(".");
							if (nestedKeyEnd > 0) {
								nestedKey = subVarKey.substring(0,nestedKeyEnd);
								nestedFilter = (filter ? filter : "") + nestedKey + ".";
								if (!nestedFilterList) {
									nestedFilterList = [];
								}
								nestedFilterList.push(nestedFilter);
								queryString += s.serializeToQueryString(nestedKey,varValue,varFilter,varFilterPrefix,nestedFilter);
							} else {
								if (typeof(subVarValue) == "boolean") {
									// Change to string "true" or "false"
									if (subVarValue) {
										subVarValue = "true";
									} else {
										subVarValue = "false";
									}
								}
								if (subVarValue) {
									if ((varFilterPrefix == "retrieveLightData") && (filter.indexOf(".contextData.") < 0)) {
										subVarPrefix = subVarKey.substring(0,4);
										subVarSuffix = subVarKey.substring(4);
										switch (subVarKey) {
											case "transactionID" : {
												subVarKey = "xact";
											} break;
											case "channel" : {
												subVarKey = "ch";
											} break;
											case "campaign" : {
												subVarKey = "v0";
											} break;
											default : {
												if (s.isNumber(subVarSuffix)) {
													if (subVarPrefix == "prop") {
														subVarKey = "c" + subVarSuffix;
													} else if (subVarPrefix == "eVar") {
														subVarKey = "v" + subVarSuffix;
													} else if (subVarPrefix == "list") {
														subVarKey = "l" + subVarSuffix;
													} else if (subVarPrefix == "hier") {
														subVarKey   = "h" + subVarSuffix;
														subVarValue = subVarValue.substring(0,255);
													}
												}
											} break;
										}
									}
									queryString += "&" + s.escape(subVarKey) + "=" + s.escape(subVarValue);
								}
							}
						}
					}
				}
			}
			if (queryString != "") {
				queryString += "&." + varKey;
			}
		}

		return queryString;
	};

	s.usePostbacks = 0;

	/*********************************************************************
	* Function getQueryString(): Build the query-string
	*     Nothing
	* Returns:
	*     Query-String
	*********************************************************************/
	s.getQueryString = function() {
		var
			queryString = "",
			varList,
			varNum,
			varSubNum,
			varKey,
			varValue,
			varValueParts,
			varValuePart,
			varValuePartPos,
			varPrefix,
			varSuffix,
			varFilter = "",
			eventFilter = "",
			moduleName = "",
			events = "",
			idService = s._getIdServiceInstance();

		// Setup list
		if (s.lightProfileID) {
			varList = s.lightVarList;
			varFilter = s.lightTrackVars;
			if (varFilter) {
				varFilter = "," + varFilter + "," + s.lightRequiredVarList.join(",") + ",";
			}
		} else {
			varList = s.accountVarList;

			// Setup filters
			if ((s.pe) || (s.linkType)) {
				varFilter   = s.linkTrackVars;
				eventFilter = s.linkTrackEvents;
				if (s.pe) {
					moduleName = s.pe.substring(0,1).toUpperCase() + s.pe.substring(1);
					if (s[moduleName]) {
						varFilter   = s[moduleName].trackVars;
						eventFilter = s[moduleName].trackEvents;
					}
				}
			}
			if (varFilter) {
				varFilter = "," + varFilter + "," + s.requiredVarList.join(",") + ",";
			}
			if (eventFilter) {
				eventFilter = "," + eventFilter + ",";
				if (varFilter) {
					varFilter += ",events,";
				}
			}

			// Build product event list to be added to event list
			if (s.events2) {
				events += (events != "" ? "," : "") + s.events2;
			}
		}

		// Add Customer IDs and authenticated-state
		if (idService && idService["getCustomerIDs"]) {
			var
				cidsFlat = Null,
				cids = idService["getCustomerIDs"](),
				cidt,
				cid;
			if (cids) {
				for (cidt in cids) {
					if (!Object.prototype[cidt]) {
						cid = cids[cidt];
						if (typeof(cid) != "object") {
							continue;
						}
						if (!cidsFlat) {
							cidsFlat = {};
						}
						if (cid["id"]) {
							cidsFlat[cidt + ".id"] = cid["id"];
						}
						if (cid["authState"]) {
							cidsFlat[cidt + ".as"] = cid["authState"];
						}
					}
				}
			}
			if (cidsFlat) {
				queryString += s.serializeToQueryString("cid",cidsFlat);
			}
		}

		// Add AudienceManagement config params
		if ((s.AudienceManagement) && (s.AudienceManagement.isReady())) {
			queryString += s.serializeToQueryString("d",s.AudienceManagement.getEventCallConfigParams());
		}

		for (varNum = 0;varNum < varList.length;varNum++) {
			varKey    = varList[varNum];
			varValue  = s[varKey];
			varPrefix = varKey.substring(0,4);
			varSuffix = varKey.substring(4);

			if (!varValue) {
				if ((varKey == "events") && (events)) {
					varValue = events;
					events = "";
				} else if (
					varKey == "marketingCloudOrgID"
					&& idService
					// TODO: This ECID requirement would likely not be needed if AN-174832 is fixed
					&& s._isCategoryApproved("ECID")
				) {
					varValue = idService["marketingCloudOrgID"];
				}
			}

			// If we have a value and this variable is not filtered out
			if ((varValue) &&
				((!varFilter) || (varFilter.indexOf("," + varKey + ",") >= 0))) {
				switch (varKey) {
					case "customerPerspective" : {
						varKey = "cp";
					} break;
					case "marketingCloudOrgID" : {
						varKey = "mcorgid";
					} break;
					case "supplementalDataID" : {
						varKey = "sdid";
					} break;
					case "timestamp" : {
						varKey = "ts";
					} break;
					case "dynamicVariablePrefix" : {
						varKey = "D";
					} break;
					case "visitorID" : {
						varKey = "vid";
					} break;
					case "marketingCloudVisitorID" : {
						varKey = "mid";
					} break;
					case "analyticsVisitorID" : {
						varKey = "aid";
					} break;
					case "audienceManagerLocationHint" : {
						varKey = "aamlh";
					} break;
					case "audienceManagerBlob" : {
						varKey = "aamb";
					} break;
					case "authState" : {
						varKey = "as";
					} break;
					case "pageURL" : {
						varKey = "g";
						if (varValue.length > 255) {
							s.pageURLRest = varValue.substring(255);
							varValue = varValue.substring(0,255);
						}
					} break;
					case "pageURLRest" : {
						varKey = "-g";
					} break;
					case "referrer" : {
						varKey = "r";
					} break;
					case "vmk" :
					case "visitorMigrationKey" : {
						varKey = "vmt";
					} break;
					case "visitorMigrationServer" : {
						varKey = "vmf";
						if ((s.ssl) && (s.visitorMigrationServerSecure)) {
							varValue = "";
						}
					} break;
					case "visitorMigrationServerSecure" : {
						varKey = "vmf";
						if ((!s.ssl) && (s.visitorMigrationServer)) {
							varValue = "";
						}
					} break;
					case "charSet" : {
						varKey = "ce";
					} break;
					case "visitorNamespace" : {
						varKey = "ns";
					} break;
					case "cookieDomainPeriods" : {
						varKey = "cdp";
					} break;
					case "cookieLifetime" : {
						varKey = "cl";
					} break;
					case "variableProvider" : {
						varKey = "vvp";
					} break;
					case "currencyCode" : {
						varKey = "cc";
					} break;
					case "channel" : {
						varKey = "ch";
					} break;
					case "transactionID" : {
						varKey = "xact";
					} break;
					case "campaign" : {
						varKey = "v0";
					} break;
					case "latitude" : {
						varKey = "lat";
					} break;
					case "longitude" : {
						varKey = "lon";
					} break;
					case "resolution" : {
						varKey = "s";
					} break;
					case "colorDepth" : {
						varKey = "c";
					} break;
					case "javascriptVersion" : {
						varKey = "j";
					} break;
					case "javaEnabled" : {
						varKey = "v";
					} break;
					case "cookiesEnabled" : {
						varKey = "k";
					} break;
					case "browserWidth" : {
						varKey = "bw";
					} break;
					case "browserHeight" : {
						varKey = "bh";
					} break;
					case "connectionType" : {
						varKey = "ct";
					} break;
					case "homepage" : {
						varKey = "hp";
					} break;
					case "events" : {
						// Add events from eventList
						if (events) {
							varValue += (varValue != "" ? "," : "") + events;
						}

						// Filter events if needed
						if (eventFilter) {
							varValueParts = varValue.split(",");
							varValue = "";
							for (varSubNum = 0;varSubNum < varValueParts.length;varSubNum++) {
								varValuePart = varValueParts[varSubNum];
								varValuePartPos = varValuePart.indexOf("=");
								if (varValuePartPos >= 0) {
									varValuePart = varValuePart.substring(0,varValuePartPos);
								}
								varValuePartPos = varValuePart.indexOf(":");
								if (varValuePartPos >= 0) {
									varValuePart = varValuePart.substring(0,varValuePartPos);
								}
								if (eventFilter.indexOf("," + varValuePart + ",") >= 0) {
									varValue += (varValue ? "," : "") + varValueParts[varSubNum];
								}
							}
						}
					} break;
					case "events2" : {
						varValue = "";
					} break;
					case "contextData" : {
						queryString += s.serializeToQueryString("c",s[varKey],varFilter,varKey);
						varValue = "";
					} break;
					case "clientHints" : {
						queryString += s.serializeToQueryString("h",s[varKey],varFilter,varKey);
						varValue = "";
					} break;
					case "lightProfileID" : {
						varKey = "mtp";
					} break;
					case "lightStoreForSeconds" : {
						varKey = "mtss";
						if (!s.lightProfileID) {
							varValue = "";
						}
					} break;
					case "lightIncrementBy" : {
						varKey = "mti";
						if (!s.lightProfileID) {
							varValue = "";
						}
					} break;
					case "retrieveLightProfiles" : {
						varKey = "mtsr";
					} break;
					case "deleteLightProfiles" : {
						varKey = "mtsd";
					} break;
					case "retrieveLightData" : {
						if (s.retrieveLightProfiles) {
							queryString += s.serializeToQueryString("mts",s[varKey],varFilter,varKey);
						}
						varValue = "";
					} break;
					default : {
						if (s.isNumber(varSuffix)) {
							if (varPrefix == "prop") {
								varKey = "c" + varSuffix;
							} else if (varPrefix == "eVar") {
								varKey = "v" + varSuffix;
							} else if (varPrefix == "list") {
								varKey = "l" + varSuffix;
							} else if (varPrefix == "hier") {
								varKey   = "h" + varSuffix;
								varValue = varValue.substring(0,255);
							}
						}
					} break;
				}
				if (varValue) {
					queryString += "&" + varKey + "=" + (varKey.substring(0,3) != "pev" ? s.escape(varValue) : varValue);
				}
			}

			// Add ClickMap/ActivityMap query-string after pev# variables (pev3 is the last one) if it's set
			if ((varKey == "pev3") && (s.clickMapQueryString)) {
				queryString += s.clickMapQueryString;
			}

		}

		// If available, attach timing information from previous request
		if (s.lastRequestTiming) {
			queryString += "&lrt=" + s.lastRequestTiming;
			s.lastRequestTiming = null;
		}

		return queryString;
	};

	/*********************************************************************
	* Function getObjectType(o): Return object type or tag-name in upper-case
	*     o = object to get type or tage-name for
	* Returns:
	*     type or tag-name in upper-case
	*********************************************************************/
	s.getObjectType = function(o) {
		var
			t = o.tagName;
		if ((("" + o.tagUrn) != "undefined") || ((("" + o.scopeName) != "undefined") && (("" + o.scopeName).toUpperCase() != "HTML"))) {
			return "";
		}
		t = ((t) && (t.toUpperCase) ? t.toUpperCase() : "");
		if (t == "SHAPE") {
			t = "";
		}
		if (t) {
			if (((t == "INPUT") || (t == "BUTTON")) && (o.type) && (o.type.toUpperCase)) {
				t = o.type.toUpperCase();
			} else if ((!t) && (o.href)) {
				t = "A";
			}
		}
		return t;
	};

	/*********************************************************************
	* Function getObjectHREF(o): Return object href if possible
	*     o = object to get href from
	* Returns:
	*     href
	*********************************************************************/
	s.getObjectHREF = function(o) {
		var
			l = w.location,
			href = (o.href ? o.href : ""),
			i,
			j,
			k,
			protocol;

		// Some objects contain a href object instead of a string (like SVG animations).
		// Setting the href to be an empty string allows link tracking to occur, just without the url from the href.
		// See AN-271185
		if ( typeof href !== "string" ) {
			href = "";
		}

		i = href.indexOf(":");
		j = href.indexOf("?");
		k = href.indexOf("/");

		if ((href) && ((i < 0) || ((j >= 0) && (i > j)) || ((k >= 0) && (i > k)))) {
			protocol = ((o.protocol) && (o.protocol.length > 1) ? o.protocol : (l.protocol ? l.protocol : ""));
			i = l.pathname.lastIndexOf("/");
			href = (protocol ? protocol + "//" : "") + (o.host ? o.host : (l.host ? l.host:"")) + (href.substring(0,1) != "/" ? l.pathname.substring(0,(i < 0 ? 0 : i)) + "/" : "") + href;
		}
		return href;
	};

	/*********************************************************************
	* Function getObjectID(o): Generate object ID and type and add to passed in object as s_oid and s_oidt
	*     o = object to generate ID for
	* Returns:
	*     Array with generated ID "id" and ID type "type"
	*********************************************************************/
	s.getObjectID = function(o) {
		var
			t = s.getObjectType(o),
			p,
			c,
			n = "",
			x = 0;
		if (t) {
			p = o.protocol;
			c = o.onclick;
			if ((o.href) && ((t == "A") || (t == "AREA")) && ((!c) || (!p) || (p.toLowerCase().indexOf("javascript") < 0))) {
				n = s.getObjectHREF(o);
			} else if (c) {
				n = s.replace(s.replace(s.replace(s.replace("" + c,"\r",""),"\n",""),"\t","")," ","");
				x = 2;
			} else if ((t == "INPUT") || (t=="SUBMIT")) {
				if (o.value) {
					n = o.value;
				} else if (o.innerText) {
					n = o.innerText;
				} else if (o.textContent) {
					n = o.textContent;
				}
				x = 3;
			} else if ((t == "IMAGE") && (o.src)) {
				n = o.src;
			}
			if (n) {
				return {
					id:n.substring(0,100),
					type:x
				};
			}
		}

		return 0;
	};

	/*********************************************************************
	* Function getObjectUsable(o): Get usable object if any out of passed in object
	*     o = object to get usable object from
	* Returns:
	*     Usable object or 0 if none
	*********************************************************************/
	s.getObjectUsable = function(o) {
		var
			objectType = s.getObjectType(o),
			objectID = s.getObjectID(o),
			onClick;
		while ((o) && (!objectID) && (objectType != "BODY")) {
			o = (o.parentElement ? o.parentElement : o.parentNode);
			if (o) {
				objectType = s.getObjectType(o);
				objectID = s.getObjectID(o);
			}
		}
		if ((!objectID) || (objectType == "BODY")) {
			o = 0;
		}
		if (o) {
			onClick = (o.onclick ? "" + o.onclick : "");
			if ((onClick.indexOf(".tl(") >= 0) || (onClick.indexOf(".trackLink(") >= 0)) {
				o = 0;
			}
		}
		return o;
	};

	/*********************************************************************
	* Function prepareLinkTracking(): Populate the link-tracking variables including ClickMap
	*     Nothing
	* Returns:
	*     Nothing
	*********************************************************************/
	s.prepareLinkTracking = function() {
		var
			objectType,
			objectID,
			linkObject = s.linkObject,
			linkType   = s.linkType,
			linkURL    = s.linkURL,
			queryStringPos,
			hashPos;

		s.linkTrack = 1; // Start off tracking because this could be a manual call to
		if (!linkObject) {
			s.linkTrack = 0; // If linkObject isn't set at this point we know that it's an automatic call so don't track until we decode that we are good to go later based on linkURL/Name and linkType
			linkObject = s.clickObject;
		}
		if (linkObject) {
			// Make sure we have a clickable object
			objectType = s.getObjectType(linkObject);
			objectID   = s.getObjectID(linkObject);
			while ((linkObject) && (!objectID) && (objectType != "BODY")) {
				linkObject = (linkObject.parentElement ? linkObject.parentElement : linkObject.parentNode);
				if (linkObject) {
					objectType = s.getObjectType(linkObject);
					objectID = s.getObjectID(linkObject);
				}
			}
			if ((!objectID) || (objectType == "BODY")) {
				linkObject = 0;
			}
			// If we still have a linkObject that was not manually passed in ignore it if the onclick contains manual tracking
			if ((linkObject) && (!s.linkObject)) {
				var onClick = (linkObject.onclick ? "" + linkObject.onclick : "");
				if ((onClick.indexOf(".tl(") >= 0) || (onClick.indexOf(".trackLink(") >= 0)) {
					linkObject = 0;
				}
			}
		} else {
			s.linkTrack = 1; // If we don't have a passed in link object or one from the body onclick this isn't a link tracking call so we should track
		}

		// Get the link URL
		if ((!linkURL) && (linkObject)) {
			linkURL = s.getObjectHREF(linkObject);
		}
		if ((linkURL) && (!s.linkLeaveQueryString)) {
			queryStringPos = linkURL.indexOf("?");
			if (queryStringPos >= 0) {
				linkURL = linkURL.substring(0,queryStringPos);
			}
		}

		// If we have a link URL but no manually specified type do automatic type determination
		if ((!linkType) && (linkURL)) {
			var
				href,
				filterList,
				filterNum,
				filterMethod = 0,
				matchedFilter = 0,
				match;

			// Check for a download link type
			if ((s.trackDownloadLinks) && (s.linkDownloadFileTypes)) {
				href = linkURL.toLowerCase();
				queryStringPos = href.indexOf("?");
				hashPos = href.indexOf("#");
				/* Truncate at the hash or the start of the query-string */
				if (queryStringPos >= 0) {
					if ((hashPos >= 0) && (hashPos < queryStringPos)) {
						queryStringPos = hashPos;
					}
				} else {
					queryStringPos = hashPos;
				}
				if (queryStringPos >= 0) {
					href = href.substring(0,queryStringPos);
				}
				filterList = s.linkDownloadFileTypes.toLowerCase().split(",");
				for (filterNum = 0;filterNum < filterList.length;filterNum++) {
					match = filterList[filterNum];
					if ((match) && (href.substring((href.length - (match.length + 1))) == "." + match)) {
						linkType = "d";
					}
				}
			}

			// Check for an exit link type (if linkType hasn't already been qualified)
			if ((s.trackExternalLinks) && (!linkType)) {
				href = linkURL.toLowerCase();
				if (s.hrefSupportsLinkTracking(href)) {
					// Default linkInternalFilters to the document hostname
					if (!s.linkInternalFilters) {
						s.linkInternalFilters = w.location.hostname;
					}
					filterList = 0;
					if (s.linkExternalFilters) {
						filterList = s.linkExternalFilters.toLowerCase().split(",");
						filterMethod = 1;
					} else if (s.linkInternalFilters) {
						filterList = s.linkInternalFilters.toLowerCase().split(",");
					}
					if (filterList) {
						for (filterNum = 0;filterNum < filterList.length;filterNum++) {
							match = filterList[filterNum];
							if (href.indexOf(match) >= 0) {
								matchedFilter = 1;
							}
						}
						if (matchedFilter) {
							if (filterMethod) {
								linkType = "e";
							}
						} else if (!filterMethod) {
							linkType = "e";
						}
					}
				}
			}
		}

		s.linkObject = linkObject;
		s.linkURL    = linkURL;
		s.linkType   = linkType;

		// Handle ClickMap
		if ((s.trackClickMap) || (s.trackInlineStats)) {
			// Clear the ClickMap query-string fragment
			s.clickMapQueryString = "";

			// If we are dealing with the click of an object...
			if (linkObject) {
				var
					pageID = s.pageName,
					pageIDType = 1,
					objectIndex = linkObject.sourceIndex;
				if (!pageID) {
					pageID     = s.pageURL;
					pageIDType = 0;
				}
				if (w["s_objectID"]) {
					objectID.id   = w["s_objectID"];
					objectID.type = 1;
					objectIndex   = 1;
				}
				if ((pageID) && (objectID) && (objectID.id) && (objectType)) {
					s.clickMapQueryString =
						"&pid=" + s.escape(pageID.substring(0,255)) +
						(pageIDType ? "&pidt=" + pageIDType : "") +
						"&oid=" + s.escape(objectID.id.substring(0,100)) +
						(objectID.type ? "&oidt=" + objectID.type : "") +
						"&ot="   + objectType +
						(objectIndex ? "&oi=" + objectIndex : "")
					;
				}
			}
		}
	};

	/*********************************************************************
	* Function handleLinkTracking(): Handle link-tracking variables including ClickMap
	*     Nothing
	* Returns:
	*     Nothing
	*********************************************************************/
	s.handleLinkTracking = function() {
		var
			track = s.linkTrack,
			linkType   = s.linkType,
			linkURL    = s.linkURL,
			linkName   = s.linkName;

		if ((linkType) && ((linkURL) || (linkName))) {
			linkType = linkType.toLowerCase();
			if ((linkType != "d") && (linkType != "e")) {
				linkType = "o";
			}

			s.pe   = "lnk_" + linkType;
			s.pev1 = (linkURL ? s.escape(linkURL) : "");
			s.pev2 = (linkName ? s.escape(linkName) : "");

			track = 1; // We know we need to track this link
		}

		if (s.abort) {
			track = 0;
		}

		// Handle New & Old ClickMap
		if ((s.trackClickMap) || (s.trackInlineStats) || s.isModuleLoaded("ActivityMap")) {
			var
				clickMapData = {},
				clickMapDataChanged = 0,
				linkTrackStorageData = s._loadLinkTrackDataFromSessionStorage(),
				entryList = (linkTrackStorageData ? linkTrackStorageData.split("&") : 0),
				entryNum,
				partList,
				accountList,
				accountNum,subAccountNum,
				account,queryString,
				useLinkTrackStorageData = 0;

			// If it exists parse previous link track storage data
			if (entryList) {
				for (entryNum = 0;entryNum < entryList.length;entryNum++) {
					partList = entryList[entryNum].split("=");
					accountList = s.unescape(partList[0]).split(",");
					queryString = s.unescape(partList[1]);
					clickMapData[queryString] = accountList;
				}
			}
			accountList = s.account.split(",");

			// Add the ActivityMap contextData to s.clickMapQueryString
			var
				activityMapContextData = {};
			for (var m in s.contextData) {
				if ((m) && (!Object.prototype[m])) {
					if (m.substring(0,14) == "a.activitymap.") {
						activityMapContextData[m] = s.contextData[m];
						s.contextData[m] = "";
					}
				}
			}
			s.clickMapQueryString = s.serializeToQueryString("c",activityMapContextData) + (s.clickMapQueryString ? s.clickMapQueryString : "");

			// If we are about to track or if we have a new ClickMap query-string fragment update the ClickMap data
			if ((track) || (s.clickMapQueryString)) {
				// Remove ClickMap data for current account(s)
				// If we are tracking and don't have a new ClickMap query-string look for one in the link track data from storage
				if ((track) && (!s.clickMapQueryString)) {
					useLinkTrackStorageData = 1;
				}
				for (queryString in clickMapData) {
					if (!Object.prototype[queryString]) {
						for (accountNum = 0;accountNum < accountList.length;accountNum++) {
							// If we need to use ClickMap query-string fragments from the link track storage and we have an exact match for the account(s) add the fragement and nuke the entry
							if (useLinkTrackStorageData) {
								account = clickMapData[queryString].join(",");
								if (account == s.account) {
									s.clickMapQueryString += (queryString.charAt(0) != "&" ? "&" : "") + queryString;
									clickMapData[queryString] = [];
									clickMapDataChanged = 1;
								}
							}
							for (subAccountNum = 0;subAccountNum < clickMapData[queryString].length;subAccountNum++) {
								account = clickMapData[queryString][subAccountNum];
								if (account == accountList[accountNum]) {
									// If we need to use ClickMap query-string fragments from the link track storage and we have a single account match add the fragment wrapped as account specific variables
									if (useLinkTrackStorageData) {
										s.clickMapQueryString += "&u=" + s.escape(account) + (queryString.charAt(0) != "&" ? "&" : "") + queryString + "&u=0";
									}
									clickMapData[queryString].splice(subAccountNum,1);
									clickMapDataChanged = 1;
								}
							}
						}
					}
				}

				// If we are not about to track and just have a new ClickMap query-string we need to update the link track storage and clear out the contextData
				if (!track) {
					clickMapDataChanged = 1;
				}

				// If the ClickMap data changed write the new link track storage out or delete it
				if (clickMapDataChanged) {
					linkTrackStorageData = "";
					entryNum = 2; // Default to writing out 2 link track storage entries
					// If we need to store the new ClickMap query-string fragment for later
					if ((!track) && (s.clickMapQueryString)) {
						linkTrackStorageData = s.escape(accountList.join(",")) + "=" + s.escape(s.clickMapQueryString);
						entryNum = 1; // We have already added our first entry so just add one more
					}
					// Add 1 or 2 more entries to the link track storage
					for (queryString in clickMapData) {
						if (!Object.prototype[queryString]) {
							if ((entryNum > 0) && (clickMapData[queryString].length > 0)) {
								linkTrackStorageData += (linkTrackStorageData ? "&" : "") + s.escape(clickMapData[queryString].join(",")) + "=" + s.escape(queryString);
								entryNum--;
							}
						}
					}
					// Write out the new link track storage
					s._saveLinkTrackDataToStorage(linkTrackStorageData);
				}
			}
		}

		return track;
	};

	s._loadLinkTrackDataFromSessionStorage = function() {
		if (s.useLinkTrackSessionStorage) {
			if (s._sessionStorageSupported()) {
				return w.sessionStorage.getItem(s.linkTrackStorageName);
			}
		} else {
			return s.cookieRead(s.linkTrackStorageName);
		}
	};

	s._sessionStorageSupported = function() {
		if (w.sessionStorage) {
			return true;
		} else {
			return false;
		}
	};

	s._saveLinkTrackDataToStorage = function(linkTrackStorageData) {
		if (s.useLinkTrackSessionStorage) {
			if (s._sessionStorageSupported()) {
				w.sessionStorage.setItem(s.linkTrackStorageName, linkTrackStorageData);
			}
		} else {
			s.cookieWrite(s.linkTrackStorageName, linkTrackStorageData);
		}
	};


	/*********************************************************************
	* Function handleTechnology(): Populate the technology variables
	*     Nothing
	* Returns:
	*     Nothing
	*********************************************************************/
	s.handleTechnology = function() {
		if (!s.technologyHandled) {
			var
				tm = new Date,
				tl = topFrameSet.location,
				a,o,i,
				x = "",
				c = "",
				v = "",
				bw = "",
				bh = "",
				j = "1.2",
				k = (s.cookieWrite("s_cc","true",0) ? "Y" : "N"),
				hp = "",
				ct = "",
				pn = 0;

			if (tm.setUTCDate) {
				j = "1.3";
				if (pn.toPrecision) {
					j = "1.5";
					a = [];
					if (a.forEach) {
						j = "1.6";
						i = 0;
						o = {};
						try {
							/* eslint-disable no-undef */
							// Iterator is defined in the browser after JavaScript version 1.7
							// this has to be here but excluded from the lint check
							i=new Iterator(o);
							/* eslint-enable no-undef */
							if (i.next) {
								j = "1.7";
								if (a.reduce) {
									j = "1.8";
									if (j.trim) {
										j = "1.8.1";
										if (Date.parse) {
											j = "1.8.2";
											if (Object.create) {
												j = "1.8.5";
											}
										}
									}
								}
							}
						} catch (e) {}
					}
				}
			}
			x = screen.width + "x" + screen.height;
			v = (navigator.javaEnabled() ? "Y" : "N"); // TODO: Remove. javaEnabled is deprecated and always return false
			c = (screen.pixelDepth ? screen.pixelDepth : screen.colorDepth);
			bw = (s.w.innerWidth ? s.w.innerWidth : s.d.documentElement.offsetWidth);
			bh = (s.w.innerHeight ? s.w.innerHeight : s.d.documentElement.offsetHeight);
			try {
				s.b.addBehavior("#default#homePage");
				hp = (s.b.isHomePage(tl) ? "Y" : "N");
			} catch (e) {}
			try {
				s.b.addBehavior("#default#clientCaps");
				ct = s.b.connectionType;
			} catch (e) {}

			s.resolution        = x;
			s.colorDepth        = c;
			s.javascriptVersion = j;
			s.javaEnabled       = v;
			s.cookiesEnabled    = k;
			s.browserWidth      = bw;
			s.browserHeight     = bh;
			s.connectionType    = ct;
			s.homepage          = hp;

			s.technologyHandled = 1;
		}
	};

	s._collectClientHints = function() {
		if (
			s.collectHighEntropyUserAgentHints &&
			!s._waitingForClientHints &&
			s._browserSupportsUserAgentClientHints()
		) {
			s._waitingForClientHints = true;
			try {
				navigator["userAgentData"]["getHighEntropyValues"](s.HIGH_ENTROPY_USER_AGENT_CLIENT_HINTS)
					.then(function(hints) {
						s.clientHints = {};
						s.HIGH_ENTROPY_USER_AGENT_CLIENT_HINTS.forEach(function(hint) {
							if (Object.prototype.hasOwnProperty.call(hints, hint)) {
								s.clientHints[hint] = hints[hint];
							}
						});
					})
					.catch(function(e) {
						s._waitingForClientHints = false;
						s.clientHints = {};
						if (s.debugTracking) {
							s.log(e.message);
						}
					});
			} catch (e) {
				// Adding a try-catch here to protect against the unlikely scenario
				// where browsers implements the getHighEntropyValues differently
				// (or not at all).
				// This can be removed once all browsers adds support:
				// https://caniuse.com/?search=getHighEntropyValues.
				s._waitingForClientHints = false;
				s.clientHints = {};
				if (s.debugTracking) {
					s.log(e.message);
				}
			}
		} else {
			s.clientHints = {};
		}
	};

	s._browserSupportsUserAgentClientHints = function() {
		return (typeof navigator["userAgentData"] !== "undefined");
	};

	/*********************************************************************
	* Function loadModule(): Load a module into this instance
	*     moduleName = Module name
	*     onLoad     = Optional onLoad function to execute after the module
	*                  is loaded
	* Returns:
	*     Nothing
	*********************************************************************/
	s.modules = {};
	s.loadModule = function(moduleName,onLoad) {
		var
			module = s.modules[moduleName];
		if (!module) {
			// Create the module instance
			if (w["AppMeasurement_Module_" + moduleName]) {
				module = new w["AppMeasurement_Module_" + moduleName](s);
			} else {
				module = {};
			}
			s.modules[moduleName] = s[moduleName] = module;

			// Handle module onLoad
			module._getOnLoad = function() {
				return module._onLoad;
			};
			module._setOnLoad = function(v) {
				module._onLoad = v;
				if (v) {
					s[moduleName + "_onLoad"] = v;
					if (!s.delayCall(moduleName + "_onLoad",[s,module],1)) {
						v(s,module);
					}
				}
			};
			try {
				// Try to use Object.defineProperty
				if (Object["defineProperty"]) {
					Object["defineProperty"](module,"onLoad",{
						"get":module._getOnLoad,
						"set":module._setOnLoad
					});
				} else {
					// We don't have Object.defineProperty so set a flag telling callModuleMethod to look for the onLoad later
					module["_olc"] = 1;
				}
			} catch(e) {
				// Object.defineProperty threw an exception so set a flag telling callModuleMethod to look for the onLoad later
				module["_olc"] = 1;
			}
		}

		if (onLoad) {
			s[moduleName + "_onLoad"] = onLoad;
			if (!s.delayCall(moduleName + "_onLoad",[s,module],1)) {
				onLoad(s,module);
			}
		}
	};

	/*********************************************************************
	* Function callModuleMethod(methodName): Call method on all modules if defined
	*     methodName = Method name to call
	* Returns:
	*     1 if any module returns something that tests as true for the method.  0 otherwise
	*********************************************************************/
	s.callModuleMethod = function(methodName) {
		var
			moduleName,
			module;
		for (moduleName in s.modules) {
			if (!Object.prototype[moduleName]) {
				module = s.modules[moduleName];
				if (module) {
					if ((module["_olc"]) && (module["onLoad"])) {
						module["_olc"] = 0;
						module["onLoad"](s,module);
					}
					if (module[methodName]) {
						if (module[methodName]()) {
							return 1;
						}
					}
				}
			}
		}
		return 0;
	};

	/*********************************************************************
	* Function isModuleLoaded(moduleName): Checks if a module has been loaded
	* Returns:
	*     true or false
	*********************************************************************/
	s.isModuleLoaded = function(moduleName) {
		// The check for _c is to make sure the module is not an empty object
		if (s[moduleName] && s[moduleName]["_c"]) {
			return true;
		}
		return false;
	};

	/********************************************************************
	* Function vs(x): Check to see if visitor should be sampled or
	*                 not if visitor-sampling is turned on
	*     x  = Random sampling number
	* Returns:
	*     1 if visitor falls into sampling group or 0 if not
	*********************************************************************/
	s.isVisitorInSample = function() {
		var
			visitorSamplingNumber      = Math.floor(Math.random() * 10000000000000),
			visitorSampling            = s.visitorSampling,
			visitorSamplingGroup       = s.visitorSamplingGroup,
			visitorSamplingCookieKey   ="s_vsn_" + (s.visitorNamespace ? s.visitorNamespace : s.account) + (visitorSamplingGroup ? "_" + visitorSamplingGroup : ""),
			visitorSamplingCookieValue = s.cookieRead(visitorSamplingCookieKey);
		if (visitorSampling) {
			visitorSampling *= 100;
			if (visitorSamplingCookieValue) {
				visitorSamplingCookieValue = parseInt(visitorSamplingCookieValue);
			}
			if (!visitorSamplingCookieValue) {
				if (!s.cookieWrite(visitorSamplingCookieKey,visitorSamplingNumber)) {
					return 0;
				}
				visitorSamplingCookieValue = visitorSamplingNumber;
			}
			if (visitorSamplingCookieValue % 10000 > visitorSampling) {
				return 0;
			}
		}

		return 1;
	};

	/*********************************************************************
	* Function variableOverridesApply(variableOverrides,restoring): Apply variable overrides
	*     variableOverrides = Object containing one time variable overrides
	*     restoring         = Optional restore flag
	* Returns:
	*     a backup object containing all the variables that were just overridden
	*
	* This method will re-apply the variable overrides built in s.variableOverridesBuild function. It
	* also returns a backup object that can be used to get the tracker back into the state it was
	* in before this method was called.
	*********************************************************************/
	s.variableOverridesApply = function(variableOverrides,restoring) {
		var
			listNum,
			list,
			varNum,
			varKey,
			varValue,
			subVarKey,
			backup;

		backup = {};
		for (listNum = 0;listNum < 2;listNum++) {
			list = (listNum > 0 ? s.accountConfigList : s.accountVarList);
			for (varNum = 0;varNum < list.length;varNum++) {
				varKey   = list[varNum];
				varValue = variableOverrides[varKey];
				// only look at the set and explicitly unset variables from variableOverridesBuild
				if ((varValue) || (variableOverrides["!" + varKey])) {
					// Do a deep-apply on context data
					if (varValue && (!restoring) && ((varKey == "contextData") || (varKey == "retrieveLightData")) && (s[varKey])) {
						for (subVarKey in s[varKey]) {
							if (!varValue[subVarKey]) {
								varValue[subVarKey] = s[varKey][subVarKey];
							}
						}
					}
					// remember that this value was not set
					if (!s[varKey]) {
						backup["!" + varKey] = 1;
					}
					// remember what this property was set to
					backup[varKey] = s[varKey];
					// actually apply the state
					s[varKey] = varValue;
				}
			}
		}
		return backup;
	};
	/*********************************************************************
	* Function variableOverridesBuild(variableOverrides): Build variable overrides
	*     variableOverrides = Object to fill in with variable overrides
	*     onlySet           = Optional flag to not build unsets (!varKey),  Not called internally,
	*                         but kept for backward compatibility
	* Returns:
	*     Nothing
	*
	* This is called to remember the state of the tracker when the tracker is not ready.  When the
	* tracker becomes ready (AAM call made, all modules loaded etc.), this state is re-applied to the
	* tracker.  See s.variableOverridesApply for how this data is re-applied.
	*
	* We only want to remember that certain fields where not set.  For example eVars, props,
	* events etc. should be remembered that they were not set.  Conversely, other fields sush as
	* MarketingCloudVisitorID may not be set yet, and that is the whole reason that the tracker is not
	* ready.  For these fields and many others we should not blank them out when the state is
	* re-applied. (see AppMeasurementStateSpec.js for more info)
	*********************************************************************/
	s.variableOverridesBuild = function(variableOverrides,onlySet) {
		var
			listNum,
			list,
			varNum,
			varKey;

		for (listNum = 0;listNum < 2;listNum++) {
			list = (listNum > 0 ? s.accountConfigList : s.accountVarList);
			for (varNum = 0;varNum < list.length;varNum++) {
				varKey = list[varNum];
				variableOverrides[varKey] = s[varKey];
				if ((!onlySet) && (!variableOverrides[varKey]) && (
				// We should only remember that certain variables are not set.  To do this we use an
				// allowed list here for the fields that we should remember were not set.

					// clearVars variables
					varKey.substring(0, 4) === "prop" ||
					varKey.substring(0, 4) === "eVar" ||
					varKey.substring(0, 4) === "hier" ||
					varKey.substring(0, 4) === "list" ||
					varKey === "channel" ||
					varKey === "events" ||
					varKey === "eventList" ||
					varKey === "products" ||
					varKey === "productList" ||
					varKey === "purchaseID" ||
					varKey === "transactionID" ||
					varKey === "state" ||
					varKey === "zip" ||
					varKey === "campaign" ||
					// others
					varKey === "events2" ||
					varKey === "latitude" ||
					varKey === "longitude" ||
					varKey === "ms_a" ||
					varKey === "contextData" ||
					varKey === "supplementalDataID" ||
					varKey === "tnt" ||
					varKey === "timestamp" ||
					varKey === "abort" ||
					varKey === "useBeacon" ||
					varKey === "linkObject" ||
					varKey === "clickObject" ||
					varKey === "linkType" ||
					varKey === "linkName" ||
					varKey === "linkURL" ||
					varKey === "bodyClickTarget" ||
					varKey === "bodyClickFunction"
				)) {
					variableOverrides["!" + varKey] = 1;
				}
			}
		}
	};

	/*********************************************************************
	* Function fixReferrer(x): Fix referrers we know about
	*                 Reorder query-string variables to put
	*
	*                 Google:
	*                         q
	*                         ie
	*                         start
	*                         search_key
	*                         word
	*                         kw
	*                         cd
	*                 Yahoo:
	*                         p
	*                 Baidu:
	*                         word
	*                         wd
	*
	*                         first in the query-string.  To match google
	*                         the hostname must contain "google" and the
	*                         query-string must contain at least one of
	*                         the above query-string variables.  To match
	*                         Yahoo the hostname must contain "yahoo.co"
	*                         and the query-string must contain at least
	*                         one of the above query-string variables. To
	*                         match baidu the hostname must contain "baidu."
	*                         We also truncate the path in favor of keeping
	*                         the query-string
	*
	*     referrer = referrer URL
	* Returns:
	*     Fixed referrer URL or original if no fix was needed
	*********************************************************************/
	s.fixReferrer = function(referrer) {
		var
			newReferrer,
			i,j,
			host,
			path,
			queryStringKeySet = 0,
			queryString,
			newQueryStringLeft = "",
			newQueryStringRight = "",
			pairList,
			pair;
		if ((referrer) && (referrer.length > 255)) {
			newReferrer = "" + referrer;
			i = newReferrer.indexOf("?");
			if (i > 0) {
				queryString = newReferrer.substring(i + 1);
				newReferrer = newReferrer.substring(0,i);
				host        = newReferrer.toLowerCase();
				j = 0;
				if (host.substring(0,7) == "http://") {
					j += 7;
				} else if (host.substring(0,8) == "https://") {
					j += 8;
				}
				i = host.indexOf("/",j);
				if (i > 0) {
					host = host.substring(j,i);
					path = newReferrer.substring(i);
					newReferrer = newReferrer.substring(0,i);
					if (host.indexOf("google") >= 0) {
						queryStringKeySet = ",q,ie,start,search_key,word,kw,cd,";
					} else if (host.indexOf("yahoo.co") >= 0) {
						queryStringKeySet = ",p,ei,";
					} else if (host.indexOf("baidu.") >= 0) {
						queryStringKeySet = ",wd,word,";
					}
					if ((queryStringKeySet) && (queryString)) {
						/* Do query-string reordering */
						pairList = queryString.split("&");
						if ((pairList) && (pairList.length > 1)) {
							for (j = 0;j < pairList.length;j++) {
								pair = pairList[j];
								i = pair.indexOf("=");
								if ((i > 0) && (queryStringKeySet.indexOf("," + pair.substring(0,i) + ",") >= 0)) {
									newQueryStringLeft += (newQueryStringLeft ? "&" : "") + pair;
								} else {
									newQueryStringRight += (newQueryStringRight ? "&" : "") + pair;
								}
							}
							if ((newQueryStringLeft) && (newQueryStringRight)) {
								queryString = newQueryStringLeft + "&" + newQueryStringRight;
							} else {
								newQueryStringRight = "";
							}
						}
						/* Truncate path if needed */
						i = 253 - (queryString.length - newQueryStringRight.length) - newReferrer.length;
						/* Put it back together */
						referrer = newReferrer + (i > 0 ? path.substring(0,i) : "") + "?" + queryString;
					}
				}
			}
		}

		return referrer;
	};

	/*********************************************************************
	* Function _checkVisibility(callback): Check the browser visibility state
	*     callback = Callback to call once the browser is visible
	* Returns:
	*     true if the browser window is visible or false if not
	*********************************************************************/
	s._checkVisibility = function(callback) {
		var
			visibilityState = s.d.visibilityState,
			visibilityStateEventList = ["webkitvisibilitychange","visibilitychange"],
			visibilityStateEventNum;

		if (!visibilityState) {
			visibilityState = s.d.webkitVisibilityState;
		}
		if ((visibilityState) && (visibilityState == "prerender")) {
			if (callback) {
				for (visibilityStateEventNum = 0;visibilityStateEventNum < visibilityStateEventList.length;visibilityStateEventNum++) {
					s.d.addEventListener(visibilityStateEventList[visibilityStateEventNum],function(){
						var
							visibilityState = s.d.visibilityState;
						if (!visibilityState) {
							visibilityState = s.d.webkitVisibilityState;
						}
						if (visibilityState == "visible") {
							callback();
						}
					});
				}
			}
			return false;
		}
		return true;
	};

	/*********************************************************************
	* Function _visibilityCallback(): Callback for when browser is visible
	* Returns:
	*     Nothing
	*********************************************************************/
	s._waitingForVisibility = false;
	s._doneWaitingForVisibility = false;
	s._visibilityCallback = function() {
		s._doneWaitingForVisibility = true;
		s._callbackWhenReadyToTrackCheck();
	};

	/*********************************************************************
	* Function _visitorValuesCallback(visitorValues): Visitor API callback
	*     visitorValues = Marketing Cloud Visitor Values
	* Returns:
	*     Nothing
	*********************************************************************/
	s._waitingForVisitorValues = false;
	s._visitorValuesCallback = function(visitorValues) {
		s.marketingCloudVisitorID = visitorValues["MCMID"];
		s.visitorOptedOut = visitorValues["MCOPTOUT"];
		s.analyticsVisitorID = visitorValues["MCAID"];
		s.audienceManagerLocationHint = visitorValues["MCAAMLH"];
		s.audienceManagerBlob = visitorValues["MCAAMB"];
		s._waitingForVisitorValues = false;
		s._callbackWhenReadyToTrackCheck();
	};

	/*********************************************************************
	* Function _checkModulesReady(callback): Check for mobule readyness
	*     callback = Callback to call once modules are ready or on timeout
	* Returns:
	*     true if mobules are ready or false if not
	*********************************************************************/
	s._checkModulesReady = function(callback) {
		if (!s.maxDelay) {
			s.maxDelay = 250;
		}

		if (s.callModuleMethod("_d")) {
			if (callback) {
				setTimeout(function() {
					callback();
				},s.maxDelay);
			}
			return false;
		}
		return true;
	};

	/*********************************************************************
	* Function _modulesReadyCallback(): Callback for when modules are ready or time out
	* Returns:
	*     Nothing
	*********************************************************************/
	s._waitingForModulesReady = false;
	s._doneWaitingForModulesReady = false;
	s._modulesReadyCallback = function() {
		s._doneWaitingForModulesReady = true;
		s._callbackWhenReadyToTrackCheck();
	};

	/*********************************************************************
	* Function isReadyToTrack(): Check to see if the instance is ready to track
	* Returns:
	*     true if ready to track or false if not
	*********************************************************************/
	s.isReadyToTrack = function() {
		var readyToTrack = true;
		// IMPORTANT: If we're waiting for visibility don't do any of the other
		// ready checks because that will fire off actions that we don't want to
		// happen when the browser window isn't visible
		if (!s._isDocumentVisible()) {
			return false;
		}
		// Need to wait for Opt-In Permissions
		if (!s._isAnalyticsApproved()) {
			return false;
		}
		if (!s._isIdServiceReady()) {
			readyToTrack = false;
		}

		if (!s._modulesReady()) {
			readyToTrack = false;
		}

		if (!s._clientHintsReady()) {
			readyToTrack = false;
		}

		return readyToTrack;
	};

	s._isDocumentVisible = function() {
		// Client/browser state
		if ((!s._waitingForVisibility) && (!s._doneWaitingForVisibility)) {
			if (!s._checkVisibility(s._visibilityCallback)) {
				s._waitingForVisibility = true;
			} else {
				s._doneWaitingForVisibility = true;
			}
		}
		if ((s._waitingForVisibility) && (!s._doneWaitingForVisibility)) {
			return false;
		}
		return true;
	};

	s._isAnalyticsApproved = function() {
		var optIn = s._getOptInInstance();
		if (optIn) {
			if (!s._doneWaitingForOptInPermissions && !s._waitingForOptInPermissions) {
				optIn["fetchPermissions"](s._optInFetchPermissionsCallback, true);
				s._waitingForOptInPermissions = true;
				return false;
			} else if (s._doneWaitingForOptInPermissions) {
				if (!optIn["isApproved"](optIn["Categories"]["ANALYTICS"])) {
					return false;
				}
			} else {
				return false;
			}
		}
		return true;
	};

	s._isCategoryApproved = function(category) {
		var optIn = s._getOptInInstance();
		if (optIn && !optIn["isApproved"](optIn["Categories"][category])) {
			return false;
		}
		return true;
	};

	s._getOptInInstance = function() {
		return (w["adobe"] && w["adobe"]["optIn"]) ? w["adobe"]["optIn"] : null;
	};

	s._needNewVisitorValues = true;
	s._isIdServiceReady = function() {
		var idService = s._getIdServiceInstance();
		if (!idService || !idService["getVisitorValues"]) {
			return true;
		}
		if (s._needNewVisitorValues) {
			s._needNewVisitorValues = false;
			if (!s._waitingForVisitorValues) {
				s._waitingForVisitorValues = true;
				// This will callback immediately if visitor values have already been fetched.
				idService["getVisitorValues"](s._visitorValuesCallback);
			}
		}
		return !s._waitingForVisitorValues;
	};

	s._getIdServiceInstance = function() {
		var idService = s.visitor;
		if (idService && !idService["isAllowed"]()) {
			idService = null;
		}
		return idService;
	};

	s._modulesReady = function() {
		if ((!s._waitingForModulesReady) && (!s._doneWaitingForModulesReady)) {
			if (!s._checkModulesReady(s._modulesReadyCallback)) {
				s._waitingForModulesReady = true;
			} else {
				s._doneWaitingForModulesReady = true;
			}
		}
		if ((s._waitingForModulesReady) && (!s._doneWaitingForModulesReady)) {
			return false;
		}
		return true;
	};

	s._clientHintsReady = function() {
		if (!s._waitingForClientHints && !s.clientHints) {
			s._collectClientHints();
		}
		return s.clientHints;
	};

	/*********************************************************************
	* Function _optInFetchPermissionsCallback(): Opt-in permissions API callback
	* Returns:
	*     Nothing
	*********************************************************************/
	s._waitingForOptInPermissions = false;
	s._optInFetchPermissionsCallback = function() {
		s._waitingForOptInPermissions = false;
		s._doneWaitingForOptInPermissions = true;
	};

	/*********************************************************************
	* Function callbackWhenReadyToTrack(): Callback when instance is ready to track
	*     callbackThis = Object for callback
	*     callback     = Callback function object
	*     args         = Arguments for callback
	* Returns:
	*     Nothing
	*********************************************************************/
	s._callbackWhenReadyToTrackQueue = Null;
	s._callbackWhenReadyToTrackInterval = 0;
	s.callbackWhenReadyToTrack = function(callbackThis,callback,args) {
		var
			callbackInfo;

		callbackInfo = {};
		callbackInfo.callbackThis = callbackThis;
		callbackInfo.callback     = callback;
		callbackInfo.args         = args;
		if (s._callbackWhenReadyToTrackQueue == Null) {
			s._callbackWhenReadyToTrackQueue = [];
		}
		s._callbackWhenReadyToTrackQueue.push(callbackInfo);

		if (s._callbackWhenReadyToTrackInterval == 0) {
			s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);
		}
	};

	/*********************************************************************
	* Function _callbackWhenReadyToTrackCheck(): Interval check to see if the instance is ready to track
	* Returns:
	*     Nothing
	*********************************************************************/
	s._callbackWhenReadyToTrackCheck = function() {
		var
			callbackInfo;

		if (s.isReadyToTrack()) {
			s._stopCallbackWhenReadyToTrackInterval();
			if (s._callbackWhenReadyToTrackQueue != Null) {
				while (s._callbackWhenReadyToTrackQueue.length > 0) {
					callbackInfo = s._callbackWhenReadyToTrackQueue.shift();
					callbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);
				}
			}
		}
	};

	/*********************************************************************
	* Function _stopCallbackWhenReadyToTrackInterval()
	* Returns:
	*     Nothing
	*********************************************************************/
	s._stopCallbackWhenReadyToTrackInterval = function() {
		if (s._callbackWhenReadyToTrackInterval) {
			clearInterval(s._callbackWhenReadyToTrackInterval);
			s._callbackWhenReadyToTrackInterval = 0;
		}
	};

	/*********************************************************************
	 * Function _enqueueNotReadyToTrackRequest(): Save the state of the tracker so that the hit
	 *     can be sent later when the tracker is ready
	 * Returns:
	 *     Nothing
	 */
	s._enqueueNotReadyToTrackRequest = function(variableOverrides) {
		var varKey, newVariableOverrides = {};
		s.variableOverridesBuild(newVariableOverrides);

		if (variableOverrides != Null) {
			for (varKey in variableOverrides) {
				newVariableOverrides[varKey] = variableOverrides[varKey];
			}
		}
		s.callbackWhenReadyToTrack(s,s._trackReady,[newVariableOverrides]);
		s._resetTransientVariables();
	};

	/*********************************************************************
	* Function getFallbackVisitorID(): Get the fallback visitor ID
	*     Nothing
	* Returns:
	*     The fallback visitor ID if supported or 0 if not
	*********************************************************************/
	s.getFallbackVisitorID = function() {
		var
			digits = "0123456789ABCDEF",
			key = "s_fid",
			fallbackVisitorID = s.cookieRead(key),
			high = "",low = "",
			digitNum,digitValue,highDigitValueMax = 8,lowDigitValueMax = 4; /* The first nibble can't have the left-most bit set because we are deailing with signed 64bit numbers.  The low part can only use the 2 right-most bits to avoid collisions */
		if ((!fallbackVisitorID) || (fallbackVisitorID.indexOf("-") < 0)) {
			for (digitNum = 0;digitNum < 16;digitNum++) {
				digitValue = Math.floor(Math.random() * highDigitValueMax);
				high += digits.substring(digitValue,(digitValue + 1));
				digitValue = Math.floor(Math.random() * lowDigitValueMax);
				low += digits.substring(digitValue,(digitValue + 1));
				highDigitValueMax = lowDigitValueMax = 16;
			}
			fallbackVisitorID = high + "-" + low;
		}
		if (!s.cookieWrite(key,fallbackVisitorID,1)) {
			fallbackVisitorID = 0;
		}
		return fallbackVisitorID;
	};

	/********************************************************************
	 * Function _trackReady(): send a hit using the currently set variables.
	 *      This function assumes the tracker is ready.
	 * Returns:
	 *      The Nothing
	 *********************************************************************/
	s._trackReady = function(variableOverrides) {
		s.logDebug("[track] in _trackReady");
		var
			tm = new Date,
			sed = Math.floor(Math.random() * 10000000000000),
			cacheBusting = "s" + Math.floor(tm.getTime() / 10800000) % 10 + sed,
			year = tm.getYear(),
			time =
				tm.getDate() + "/"
				+ tm.getMonth() + "/"
				+ (year < 1900 ? year + 1900 : year) + " "
				+ tm.getHours() + ":"
				+ tm.getMinutes() + ":"
				+ tm.getSeconds() + " "
				+ tm.getDay() + " "
				+ tm.getTimezoneOffset(),
			queryString = "t=" + s.escape(time),
			overrideReferrer,
			idService = s._getIdServiceInstance(),
			variableOverridesBackup;

		// Apply variable overrides
		if (variableOverrides) {
			variableOverridesBackup = s.variableOverridesApply(variableOverrides, 1);
		}

		const isInSample = s.isVisitorInSample();
		const isOptedOut = s.visitorOptedOut();

		s.logDebug(`[track] in isVisitorInSample: ${isInSample}`);
		s.logDebug(`[track] in isVisitorOptedOut: ${isOptedOut}`);

		// Do visitor-sampling, and don't track visitors who opt-out
		if (isInSample && !isOptedOut) {
			s.logDebug("[track] visitor in sample and not opted out");
			// Make sure we have a fallback visitor ID if we don't already have an alternative
			if (!s._hasVisitorID()) {
				s.fid = s.getFallbackVisitorID();
			}

			// Prepare link tracking information before doPlugins so it can be reviewed and optionaly altered
			s.prepareLinkTracking();

			// Fire off manual plugins/modules
			if ((s.usePlugins) && (s.doPlugins)) {
				s.doPlugins(s);
			}

			// If we have an account build query-string and track
			if (s.account) {
				if (!s.abort) {
					// If timestamp hasn't been set yet and offline tracking is on set the timestamp
					if ((s.trackOffline) && (!s.timestamp)) {
						s.timestamp = Math.floor(tm.getTime() / 1000);
					}

					// Populate basic account variables
					var l = w.location;
					if (!s.pageURL) {
						s.pageURL = (l.href ? l.href : l);
					}

					if ((!s.referrer) && (!s._1_referrer)) {
						overrideReferrer = s.Util["getQueryParam"]("adobe_mc_ref", null, null, true);
						if (overrideReferrer || overrideReferrer === undefined) {
							s.referrer = overrideReferrer === undefined ? "" : overrideReferrer;
						}
						else {
							s.referrer = topFrameSet.document.referrer;
						}
					}
					s._1_referrer = 1;

					// The referrer is blanked out after every call to s.t(), but in some
					// cases the hit is not sent (i.e. the user's consent is pending).
					// The referrer should be carried forward to the next hit in these cases.
					if (!s.referrer && s._referrerForNextHit) {
						s.referrer = s._referrerForNextHit;
					}
					s._referrerForNextHit = 0;

					// reorder query string parameters for search engines to overcome
					// length limitations in Analytics
					s.referrer = s.fixReferrer(s.referrer);

					// Give modules a chance to give us variables
					s.callModuleMethod("_g");
				}

				// Handle link tracking - If it doesn't tell us to skip tracking and we havn't already been told to not track...
				// IMPORTANT-NOTE: Even if doPlugins told us to abort we still need to handle the link tracking
				if ((s.handleLinkTracking()) && (!s.abort)) {

					// Request supplemental-data ID if TARGET is approved
					if (idService && s._isCategoryApproved("TARGET")) {
						if ((!s.supplementalDataID) && (idService["getSupplementalDataID"])) {
							s.supplementalDataID = idService["getSupplementalDataID"]("AppMeasurement:" + s._in,(s.expectSupplementalData ? false : true));
						}
					}
					s.logDebug("[_trackReady] SDID:", s.supplementalDataID);
					s.logDebug("\tTARGET optIn:", s._isCategoryApproved("TARGET"));
					s.logDebug("\ts.expectSupplementalData:", s.expectSupplementalData);

					// Prevent AAM data sharing if AAM is not approved
					if (!s._isCategoryApproved("AAM")) {
						s.contextData["cm.ssf"] = 1;
					}

					// Fill in technology
					s.handleTechnology();

					s._recordConfigurationProblems();

					// Get query-string part for account variables
					queryString += s.getQueryString();

					// Fire off request
					s._makeRequest(cacheBusting,queryString);

					// Give modules a chance to take variables and use them
					s.callModuleMethod("_t");

					// Clear out referrer because we only want to use it once
					s.referrer = "";

					// Clear out any internal exception codes
					if (s.contextData && s.contextData["excCodes"]) {
						s.contextData["excCodes"] = 0;
					}
				}
			}
		}
		// In the case where the referrer is set, but the hit is not sent, we need
		// to save the referrer for the next hit. The referrer is blanked out in
		// _resetTransientVariables.
		s.logDebug("[track] referrer is set but hint is not");
		if (s.referrer) {
			s._referrerForNextHit = s.referrer;
		}

		s._resetTransientVariables();

		// Restore variables
		if (variableOverridesBackup) {
			s.variableOverridesApply(variableOverridesBackup, 1);
		}
	};

	/*********************************************************************
	* Function track(vo): Gather and send stats.  This is where the stats
	*                     are gathered and sent to mod-stats
	*     variableOverrides = Optional object containing one time variable overrides
	*     setVariables      = Optional object containing perminent variable overrides
	* Returns:
	*     Nothing
	*********************************************************************/
	s.t = s.track = function(variableOverrides,setVariables) {

		s.logDebug("[track] being called");

		if (setVariables) {
			s.variableOverridesApply(setVariables);
		}

		// Request the visitor values with every request.  The Opt-in/Opt-out permissions
		// could have changes since last time track was called.  The visitor API will take
		// the permissions into account when getting the visitor values.
		// This call may make the tracker not ready, so we put it here instead of in _trackReady
		s._needNewVisitorValues = true;
		if (!s.isReadyToTrack()) {
			s._enqueueNotReadyToTrackRequest(variableOverrides);
		} else if (s._callbackWhenReadyToTrackQueue != null && s._callbackWhenReadyToTrackQueue.length > 0) {
			// If we are readyToTrack, but have queued hits, process the queued hits first.
			s._enqueueNotReadyToTrackRequest(variableOverrides);

			// This will be called anyways from a setTimeout, but now that we know we are ready to track, we can do it now
			s._callbackWhenReadyToTrackCheck();
		} else {
			s._trackReady(variableOverrides);
		}
	};

	/*********************************************************************
	* Function _recordConfigurationProblems(): Checks tracker configuration
	*          for critical problems, and if present populates context-
	*          data with exception codes representing those errors.
	* Returns:
	*      Nothing
	*********************************************************************/
	s._recordConfigurationProblems = function() {
		// Client has configured tracker to write secure cookies when the
		// page is unsecure.
		if (s.writeSecureCookies && !s.ssl) {
			s._addExceptionCodeToContextData(1);
		}
	};

	s._addExceptionCodeToContextData = function(exceptionCode) {
		s.contextData["excCodes"] = s.contextData["excCodes"] || [];
		s.contextData["excCodes"].push(exceptionCode);
	};

	/*********************************************************************
	* Function _resetTransientVariables(): Reset variables at the end of tracking calls.
	* Returns:
	*      Nothing
	*********************************************************************/
	s._resetTransientVariables = function() {
		s.logDebug("[_resetTransientVariables] being called");
		// Reset variables
		s.abort =
			s.supplementalDataID =
			s.timestamp =
			s.pageURLRest =
			s.linkObject =
			s.clickObject =
			s.linkURL =
			s.linkName =
			s.linkType =
			w.s_objectID =
			s.pe =
			s.pev1 =
			s.pev2 =
			s.pev3 =
			s.clickMapQueryString =
			s.lightProfileID =
			s.useBeacon =
			s.referrer =
			0;
	};

	/*********************************************************************
	* Function registerPreTrackCallback(callback, parameters): Add a Callback to fire before the _makeRequest function is called in track()
	*     callback   = function
	*     ...        = <mixed>
	* Returns:
	*     Nothing
	*********************************************************************/
	s._preTrackCallbacks = [];
	s.registerPreTrackCallback = function(callback) {
		var params = [];
		for (var i = 1; i < arguments.length; i++) {
			params.push(arguments[i]);
		}

		if (typeof(callback) == "function") {
			s._preTrackCallbacks.push([callback, params]);
		} else if (s.debugTracking) {
			s.log("Warning, Non function type passed to registerPreTrackCallback");
		}
	};

	s._firePreTrackCallbacks = function(requestUrl) {
		s._fireTrackCallbacks(s._preTrackCallbacks, requestUrl);
	};

	/*********************************************************************
	* Function registerPostTrackCallback(callback, parameters): Add a Callback to fire after the _makeRequest function is called in track()
	*     callback   = function
	*     ...        = <mixed>
	* Returns:
	*     Nothing
	*********************************************************************/
	s._postTrackCallbacks = [];
	s.registerPostTrackCallback = function(callback) {
		var params = [];
		for (var i = 1; i < arguments.length; i++) {
			params.push(arguments[i]);
		}

		if (typeof(callback) == "function") {
			s._postTrackCallbacks.push([callback, params]);
		} else if (s.debugTracking) {
			s.log("Warning, Non function type passed to registerPostTrackCallback");
		}
	};

	s._firePostTrackCallbacks = function(requestUrl) {
		s._fireTrackCallbacks(s._postTrackCallbacks, requestUrl);
	};

	s._fireTrackCallbacks = function(callbacks, requestUrl) {
		if (typeof(callbacks) != "object") {
			return;
		}

		for (var i = 0; i < callbacks.length; i++) {
			var callback = callbacks[i][0];
			var params = callbacks[i][1].slice();
			params.unshift(requestUrl);

			if (typeof(callback) == "function") {
				try {
					callback.apply(null, params);
				}
				catch (e) {
					if (s.debugTracking) {
						s.log(e.message);
					}
				}
			}
		}
	};

	/*********************************************************************
	* Function trackLink(linkObject,linkType,linkName,variableOverrides,doneAction): Track link click
	*     linkObject        = link object
	*     linkType          = link type
	*     linkName          = link name
	*     variableOverrides = Optional object containing one time variable overrides
	*     doneAction        = Optional function to call when tracking is finished or times out
	* Returns:
	*     Nothing
	*********************************************************************/
	s.tl = s.trackLink = function(linkObject,linkType,linkName,variableOverrides,doneAction) {
		s.linkObject = linkObject;
		s.linkType = linkType;
		s.linkName = linkName;
		if (doneAction) {
			s.bodyClickTarget   = linkObject;
			s.bodyClickFunction = doneAction;
		}
		return s.track(variableOverrides);
	};

	/*********************************************************************
	* Function trackLight(profileID,storeForSeconds,incrementBy,variableOverrides): Track light server call
	*     profileID         = Light server call profile ID
	*     storeForSeconds   = Light server call store for seconds
	*     incrementBy       = Light server call increment by
	*     variableOverrides = Optional object containing one time variable overrides
	* Returns:
	*     Nothing
	*********************************************************************/
	s.trackLight = function(profileID,storeForSeconds,incrementBy,variableOverrides) {
		s.lightProfileID       = profileID;
		s.lightStoreForSeconds = storeForSeconds;
		s.lightIncrementBy     = incrementBy;
		return s.track(variableOverrides);
	};

	/*********************************************************************
	* Function clearVars(): Clear a standard set of variables
	* Returns:
	*     Nothing
	*********************************************************************/
	s.clearVars = function() {
		var
			varNum,
			varKey;

		for (varNum = 0;varNum < s.accountVarList.length;varNum++) {
			varKey = s.accountVarList[varNum];
			// We don't want to clear everything
			if ((varKey.substring(0,4) == "prop") ||
				(varKey.substring(0,4) == "eVar") ||
				(varKey.substring(0,4) == "hier") ||
				(varKey.substring(0,4) == "list") ||
				(varKey                == "channel") ||
				(varKey                == "events") ||
				(varKey                == "eventList") ||
				(varKey                == "products") ||
				(varKey                == "productList") ||
				(varKey                == "purchaseID") ||
				(varKey                == "transactionID") ||
				(varKey                == "state") ||
				(varKey                == "zip") ||
				(varKey                == "campaign")) {
				s[varKey] = undefined;
			}
		}
	};

	/*********************************************************************
	* Function _makeRequest(cacheBusting, queryString): Make Request
	*     cacheBusting = Random string to prevent the browser to use a
	*                    previously cached response
	*     queryString  = Stats query string
	* Returns:
	*     Nothing
	*********************************************************************/
	s.tagContainerMarker = "";
	s._makeRequest = function(cacheBusting, queryString) {
		var dataCollectionEndpoint = s._getDataCollectionEndpoint();
		var dataCollectionRequest = dataCollectionEndpoint
			+ "/" + cacheBusting
			+ "?AQB=1"  // Query begin parameter
			+ "&ndh=1"  // No duplicate hits parameter
			+ "&pf=1"   // Platform flags parameter
			+ "&" + (s._isPostbacksEnabled() ? "callback=s_c_il[" + s._in + "].doPostbacks&et=1&" : "")
			+ queryString
			+ "&AQE=1";  // Query end parameter
		s._firePreTrackCallbacks(dataCollectionRequest);
		s._enqueueRequest(dataCollectionRequest);
		s._handleRequestList();
		return "";
	};

	/*********************************************************************
	* Function _getDataCollectionEndpoint():
	* Returns:
	*     URL to the data collection end-point
	*********************************************************************/
	s._getDataCollectionEndpoint = function() {
		var dataCollectionHostname = s._getDataCollectionHostname();
		var urlRequestScheme = "http" + (s.ssl ? "s" : "");
		var dataCollectionEndpoint = urlRequestScheme + "://"
			+ dataCollectionHostname
			+ "/b/ss/" + s.account
			+ "/" + (s.mobile? "5." : "" ) + (s._isPostbacksEnabled() ? "10" : "1")
			+ "/JS-" + s.version + (s.tagContainerName ? "T" : "") + (s.tagContainerMarker ? "-" + s.tagContainerMarker : "");
		return dataCollectionEndpoint;
	};

	/*********************************************************************
	* Function _isPostbacksEnabled():
	* Returns:
	*     true if postbacks is enabled, false otherwise
	*********************************************************************/
	s._isPostbacksEnabled = function() {
		return (s.AudienceManagement && s.AudienceManagement.isReady()) || (s.usePostbacks != 0);
	};

	/*********************************************************************
	* Function _getDataCollectionHostname():
	* Returns:
	*     Data collection hostname or default if not specified
	*********************************************************************/
	s._getDataCollectionHostname = function() {
		var defaultBaseHostname = "2o7.net";
		var dc = s.dc;
		var dataCollectionHostname = s.trackingServer;
		if (dataCollectionHostname) {
			if ((s.trackingServerSecure) && (s.ssl)) {
				dataCollectionHostname = s.trackingServerSecure;
			}
		} else {
			if (dc) {
				dc = (""+dc).toLowerCase();
			} else {
				dc = "d1";
			}
			if (dc == "d1") {
				dc = "112"; // San Jose
			} else if (dc == "d2") {
				dc = "122"; // Dallas
			}
			dataCollectionHostname = s._getVisitorNamespace()
				+ "." + dc
				+ "." + defaultBaseHostname;
		}
		return dataCollectionHostname;
	};

	/*********************************************************************
	* Function _getVisitorNamespace():
	* Returns:
	*     Defined or calculated Visitor Namespace if none have been
	*     specified
	*********************************************************************/
	s._getVisitorNamespace = function() {
		var visitorNamespace = s.visitorNamespace;
		if (!visitorNamespace) {
			// Use the first rsid if no visitor namespace has been specified
			visitorNamespace = s.account.split(",")[0];
			// Remove non-alpha-numeric characters
			visitorNamespace = visitorNamespace.replace(/[^0-9a-z]/gi,"");
		}
		return visitorNamespace;
	};

	s.urlTokenRe = /{(%?)(.*?)(%?)}/;
	s.urlTokenGlobalRe = RegExp(s.urlTokenRe.source, "g");
	s.expandURLs = function(json) {
		if (typeof(json["dests"]) != "object") return;
		for (var i = 0; i < json["dests"].length; ++i) {
			var o = json["dests"][i];
			if (
				typeof(o["c"]) == "string"
				&& o["id"].substr(0, 3) == "aa."
			) {
				var matches = o["c"].match(s.urlTokenGlobalRe);
				for (var matchIndex = 0; matchIndex < matches.length; ++matchIndex) {
					var match = matches[matchIndex];
					var sub_matches = match.match(s.urlTokenRe);
					var replacement = "";

					if (sub_matches[1] == "%" && sub_matches[2] == "timezone_offset") {
						replacement = (new Date()).getTimezoneOffset();
					} else if (sub_matches[1] == "%" && sub_matches[2] == "timestampz") {
						var date = new Date();
						replacement = s.getISO8601FormattedDate(date);
					}

					o["c"] = o["c"].replace(match, s.escape(replacement));
				}
			}
		}
	};

	s.getISO8601FormattedDate = function(date) {
		var tsOffsetDate = new Date(Math.abs(date.getTimezoneOffset()) * 1000 * 60);

		// Javascript returns the timezone offset relative to the browser so the signs are backwards.
		// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
		var sign = date.getTimezoneOffset() > 0 ? "-" : "+";

		var formattedDate =
			s.lpad(4, 0, date.getFullYear()) + "-"
			+ s.lpad(2, 0, date.getMonth() + 1) + "-"
			+ s.lpad(2, 0, date.getDate()) + "T"
			+ s.lpad(2, 0, date.getHours()) + ":"
			+ s.lpad(2, 0, date.getMinutes()) + ":"
			+ s.lpad(2, 0, date.getSeconds())
			+ sign
			+ s.lpad(2, 0, tsOffsetDate.getUTCHours()) + ":"
			+ s.lpad(2, 0, tsOffsetDate.getUTCMinutes());

		return formattedDate;
	};

	s.lpad = function(length, padChar, value) {
		return (Array(length + 1).join(padChar) + value).slice(-length);
	};

	s.postbacks = {};
	s.doPostbacks = function(json) {
		if (typeof(json) != "object") return;
		s.expandURLs(json);
		if (
			typeof(s.AudienceManagement) == "object"
			&& typeof(s.AudienceManagement.isReady) == "function"
			&& s.AudienceManagement.isReady()
			&& typeof(s.AudienceManagement.passData) == "function"
		) {
			s.AudienceManagement.passData(json);
		}
		else {
			if (
				typeof(json) == "object"
				&& typeof(json["dests"]) == "object"
			) {
				for (var i = 0; i < json["dests"].length; ++i) {
					var dest = json["dests"][i];
					if (
						typeof(dest) == "object"
						&& typeof(dest["c"]) == "string"
						&& typeof(dest["id"]) == "string"
						&& dest["id"].substr(0, 3) == "aa."
					) {
						s.postbacks[dest["id"]] = new Image;
						s.postbacks[dest["id"]].alt = "";
						s.postbacks[dest["id"]].src = dest["c"];
					}
				}
			}
		}
	};

	/*********************************************************************
	* Function _enqueueRequest(request): Makes sure everything is prepped for request handling and add request to s.requestList
	*     request = Request to send off
	* Returns:
	*     Nothing
	*********************************************************************/
	s._enqueueRequest = function(request) {
		if (!s.requestList) {
			s.initRequestList();
		}
		s.requestList.push(request);
		s.lastEnqueuedPacketTimestamp = s.getCurrentTimeInMilliseconds();
		s.trimRequestListToOfflineLimit();
	};

	s.initRequestList = function() {
		s.requestList = s.loadOfflineRequestList();
		if (!s.requestList) {
			s.requestList = new Array;
		}
	};

	/*********************************************************************
	* Function loadOfflineRequestList(): Load s.requestList from permanent storage
	*     Nothing
	* Returns:
	*     Array containing offline requests, or nothing if none has been stored.
	*********************************************************************/
	s.loadOfflineRequestList = function() {
		var requestList;
		var storedString;

		if (!s.offlineStorageSupported()) {
			return;
		}

		try {
			storedString = w.localStorage.getItem(s.makeUniqueOfflineFilename());
			if (storedString) {
				requestList = w.JSON.parse(storedString);
			}
		} catch (e) {}

		return requestList;
	};

	s.offlineStorageSupported = function() {
		var offlineStorageSupport = true;
		if (!s.trackOffline || !s.offlineFilename || !w.localStorage || !w.JSON) {
			offlineStorageSupport = false;
		}
		return offlineStorageSupport;
	};

	s.getPendingRequestCount = function() {
		var pendingRequestCount = 0;
		if (s.requestList) {
			pendingRequestCount = s.requestList.length;
		}
		if (s.handlingRequest) {
			pendingRequestCount ++;
		}

		return pendingRequestCount;
	};


	/*********************************************************************
	* Function _handleRequestList(): Handle pulling from s.requestList and sending off the requests
	*     Nothing
	* Returns:
	*     Nothing
	* NOTE:
	*     Called by setTimeout and directly
	*********************************************************************/
	s._handleRequestList = function() {
		if (s.handlingRequest) {
			// If the current connection object is complete but wasn't cleaned up by success or failure...
			if ((s.currentConnection) && (s.currentConnection.complete) && (s.currentConnection.requestTimeoutId)) {
				// Clean up as a success
				s.currentConnection.success();
			}
			// If still handling a request leave
			if (s.handlingRequest) {
				return;
			}
		}
		s.handleRequestListTimer = Null;

		if (s.offline) {
			if (s.lastEnqueuedPacketTimestamp > s.lastOfflineWriteTimestamp) {
				s.saveOfflineRequestList(s.requestList);
			}
			s.scheduleCallToHandleRequestList(500);
			return;
		}

		var requestThrottleDelay = s.calculateRequestThrottleDelay();
		if (requestThrottleDelay > 0) {
			s.scheduleCallToHandleRequestList(requestThrottleDelay);
			return;
		}

		var request = s.dequeueRequest();
		if (!request) {
			return;
		}
		s.handlingRequest = 1;
		s.logRequest(request);
		s.sendRequest(request);
	};

	s.scheduleCallToHandleRequestList = function(timeoutInMilliseconds) {
		if (s.handleRequestListTimer) {
			return;
		}
		if (!timeoutInMilliseconds) {
			timeoutInMilliseconds = 0;
		}
		s.handleRequestListTimer = setTimeout(s._handleRequestList, timeoutInMilliseconds);
	};

	s.calculateRequestThrottleDelay = function() {
		var currentTimestamp;
		var timeSinceLastRequest;
		if (!s.trackOffline || s.offlineThrottleDelay <= 0) {
			return 0;
		}
		currentTimestamp = s.getCurrentTimeInMilliseconds();
		timeSinceLastRequest = currentTimestamp - s.lastRequestTimestamp;
		if (s.offlineThrottleDelay < timeSinceLastRequest) {
			return 0;
		}
		return (s.offlineThrottleDelay - timeSinceLastRequest);
	};

	s.dequeueRequest = function() {
		if (s.requestList.length > 0) {
			return s.requestList.shift();
		}
	};

	s.logRequest = function(request) {
		if (s.debugTracking) {
			var
				debug = "AppMeasurement Debug: " + request,
				debugLines = request.split("&"),
				debugLineNum;
			for (debugLineNum = 0;debugLineNum < debugLines.length;debugLineNum++) {
				debug += "\n\t" + s.unescape(debugLines[debugLineNum]);
			}
			s.log(debug);
		}
	};

	s._hasVisitorID = function() {
		return ((s.marketingCloudVisitorID) || (s.analyticsVisitorID));
	};

	s._jsonSupported = false;
	{
		var
			jsonTest;
		// Try native JSON support first
		try {
			jsonTest = JSON.parse("{\"x\":\"y\"}");
		} catch (e) {
			jsonTest = null;
		}
		if ((jsonTest) && (jsonTest.x == "y")) {
			s._jsonSupported = true;
			s._jsonParse = function(j){return JSON.parse(j);};
		// Fallback to jQuery JSON support
		} else if ((w["$"]) && (w["$"]["parseJSON"])) {
			s._jsonParse = function(j){return w["$"]["parseJSON"](j);};
			s._jsonSupported = true;
		} else {
			s._jsonParse = function(){return null;};
		}
	}

	s.sendRequest = function(request) {
		var
			connection,
			requestMethod,
			parent;
		var BEACON_REQUEST = 1;
		var XML_HTTP_REQUEST = 2;
		var SCRIPT_REQUEST = 3;
		var IMAGE_REQUEST = 4;

		s.logDebug("[sendRequest] useBeacon: ", s.useBeacon);

		// Use sendBeacon if the request qualifies
		if (s._isBeaconSupportedForRequest(request)) {
			requestMethod = BEACON_REQUEST;
			connection = {};
			connection.send = function(request) {
				// If the tracker is set to useBeacon it is always reset to
				// avoid future requests that might need to process responses
				// be sent as beacon calls.
				s.useBeacon = false;
				if (!navigator.sendBeacon(request)) {
					connection.failure();
				}
				else {
					connection.success();
				}
			};
		}

		// XmlHttpRequest POST - Only if a Visitor ID is present and the URL is too long
		if ((!connection) && (s._hasVisitorID()) && (request.length > 2047)) {
			if (s._browserSupportsXmlHttpRequest()) {
				requestMethod = XML_HTTP_REQUEST;
				connection = new XMLHttpRequest;
			}
			if (
				connection
				&& ((s.AudienceManagement && s.AudienceManagement.isReady()) || (s.usePostbacks != 0))
			) {
				if (s._jsonSupported) {
					connection.audienceManagementCallbackNeeded = true;
				} else {
					connection = 0;
				}
			}
		}

		// If not using POST and in IE with the 2047 URL limit we have to trim the request down
		if ((!connection) && (s.url2047Limit)) {
			request = request.substring(0,2047);
		}

		// JSONP
		if (
			!connection
			&& s.d.createElement
			&& (
				s.usePostbacks != 0
				|| (s.AudienceManagement && s.AudienceManagement.isReady())
			)
		) {
			connection = s.d.createElement("SCRIPT");
			if ((connection) && ("async" in connection)) {
				parent = s.d.getElementsByTagName("HEAD");
				if ((parent) && (parent[0])) {
					parent = parent[0];
				} else {
					parent = s.d.body;
				}
				if (parent) {
					connection.type = "text/javascript";
					connection.setAttribute("async","async");
					requestMethod = SCRIPT_REQUEST;
				} else {
					connection = 0;
				}
			}
		}

		// Image
		if (!connection) {
			connection = new Image;
			requestMethod = IMAGE_REQUEST;
			connection.alt = "";
			// For Firefox add abort method if missing using src = null
			if ((!connection.abort) && (typeof w["InstallTrigger"] !== "undefined")) {
				connection.abort = function() {
					connection.src = Null;
				};
			}
		}

		connection.requestStartTime = Date.now();

		connection.cleanup = function() {
			try {
				if (connection.requestTimeoutId) {
					clearTimeout(connection.requestTimeoutId);
					connection.requestTimeoutId = 0;
				}
			} catch (e) {}
		};

		connection.onload = connection.success = function() {
			s.logDebug("[connection.success] being called");
			if (connection.requestStartTime) {
				s.lastRequestTiming = Date.now() - connection.requestStartTime;
			}
			s._firePostTrackCallbacks(request);
			connection.cleanup();
			s.deleteOfflineRequestList();
			s.bodyClickRepropagate();
			s.handlingRequest = 0;
			s._handleRequestList();

			if (connection.audienceManagementCallbackNeeded) {
				connection.audienceManagementCallbackNeeded = false;

				try {
					s.doPostbacks(s._jsonParse(connection.responseText));
				}
				catch (e) {}
			}
		};

		connection.onabort = connection.onerror = connection.failure = function() {
			s.logDebug("[connection.failure] being called");
			connection.cleanup();
			// Condition to avoid having multiple of the same request put back onto the queue.
			if (((s.trackOffline) || (s.offline)) && (s.handlingRequest)) {
				s.requestList.unshift(s.currentRequest);
			}
			s.handlingRequest = 0;
			if (s.lastEnqueuedPacketTimestamp > s.lastOfflineWriteTimestamp) {
				s.saveOfflineRequestList(s.requestList);
			}
			s.bodyClickRepropagate();
			s.scheduleCallToHandleRequestList(500);
		};
		connection.onreadystatechange = function() {
			if (connection.readyState == 4) {
				if (connection.status == 200) {
					connection.success();
				} else {
					connection.failure();
				}
			}
		};

		s.lastRequestTimestamp = s.getCurrentTimeInMilliseconds();

		s.logDebug("[sendRequest] requestMethod: ", ["Beacon", "XHR", "Script", "Image"][requestMethod-1]);

		if (requestMethod === BEACON_REQUEST) {
			connection.send(request);
		}
		else if (requestMethod === XML_HTTP_REQUEST) {
			var
				dataPos = request.indexOf("?"),
				uri = request.substring(0,dataPos),
				data = request.substring((dataPos + 1));
			/* eslint-disable no-useless-escape */
			data = data.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");
			/* eslint-enable no-useless-escape */
			connection.open("POST",uri,true);
			// withCredentials needed to ensure opt-out cookie is sent if set
			// withCredentials set after connection.open due to Safari throwing INVALID_STATE_ERROR
			connection.withCredentials = true;
			//connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			connection.send(data);
		} else {
			connection.src = request;
			if (requestMethod === SCRIPT_REQUEST) {
				// If we previously injected a script tag remove the old one
				if (s.lastConnection) {
					try {
						parent.removeChild(s.lastConnection);
					} catch (e) {}
				}
				if (parent.firstChild) {
					parent.insertBefore(connection,parent.firstChild);
				} else {
					parent.appendChild(connection);
				}
				s.lastConnection = s.currentConnection;
			}
		}

		// Schedule a timeout to clean up when we don't get a success or failure from
		// the browser like a download link that triggers a navigation event that doesn't
		// leave the page but cancels network requests without notification and also
		// abort requests that are taking too long if offline tracking in enabled
		connection.requestTimeoutId = setTimeout(function() {
			// If this timeout hasn't been cleaned up yet by success or failure
			if (connection.requestTimeoutId) {
				// If loading is not complete...
				if (!connection.complete) {
					// If offline tracking is enabled and we have abort support call it
					// NOTE: We may have added our own abort method for Firefox above
					if ((s.trackOffline) && (connection.abort)) {
						connection.abort();
					}
					// Treat this as a failure
					connection.failure();
				// If loading is complete which could have been the browser aborting with no notification...
				} else {
					// Threat this as a success because it's a better guess than a failure without the notification
					connection.success();
				}
			}
		}, 5000);

		s.currentRequest = request;
		s.currentConnection = w["s_i_" + s.replace(s.account,",","_")] = connection;

		// Setup timeout for forced link tracking
		if (((s.useForcedLinkTracking) && (s.bodyClickEvent)) || (s.bodyClickFunction)) {
			if (!s.forcedLinkTrackingTimeout) {
				s.forcedLinkTrackingTimeout = 250;
			}
			s.bodyClickRepropagateTimer = setTimeout(s.bodyClickRepropagate, s.forcedLinkTrackingTimeout);
		}
	};

	s._isBeaconSupportedForRequest = function(request) {
		var requestHasBeaconSupport = false;
		if (navigator.sendBeacon) {
			if (s._isExitLinkRequest(request)) {
				requestHasBeaconSupport = true;
			} else if (s.useBeacon) {
				requestHasBeaconSupport = true;
			}
		}
		// Note: does not handle limitations for multiple sequential beacon requests
		if (s._requestExceedsBeaconSizeLimit(request)) {
			requestHasBeaconSupport = false;
		}
		return requestHasBeaconSupport;
	};

	s._isExitLinkRequest = function(request) {
		if (request && request.indexOf("pe=lnk_e") > 0) {
			return true;
		} else {
			return false;
		}
	};

	s._requestExceedsBeaconSizeLimit = function(request) {
		return request.length >= 64000;
	};

	s._browserSupportsXmlHttpRequest = function() {
		if (typeof XMLHttpRequest !== "undefined") {
			if ("withCredentials" in new XMLHttpRequest) {
				return true;
			}
		}
		return false;
	};

	s.deleteOfflineRequestList = function() {
		if (!s.offlineStorageSupported()) {
			return;
		}
		if (s.lastOfflineDeletionTimestamp > s.lastOfflineWriteTimestamp) {
			return;
		}

		try {
			w.localStorage.removeItem(s.makeUniqueOfflineFilename());
			s.lastOfflineDeletionTimestamp = s.getCurrentTimeInMilliseconds();

		} catch (e) {}
	};

	s.saveOfflineRequestList = function(requestList) {
		s.logDebug("[saveOfflineRequestList] being called");
		if (!s.offlineStorageSupported()) {
			return;
		}

		s.trimRequestListToOfflineLimit();

		try {
			w.localStorage.setItem(s.makeUniqueOfflineFilename(), w.JSON.stringify(requestList));
			s.lastOfflineWriteTimestamp = s.getCurrentTimeInMilliseconds();
			s.logDebug("[saveOfflineRequestList] saved to ", s.makeUniqueOfflineFilename());
		} catch (e) {}
	};

	s.trimRequestListToOfflineLimit = function() {
		if (!s.trackOffline) {
			return;
		}
		if (!s.offlineLimit || s.offlineLimit <= 0) {
			s.offlineLimit = 10;
		}

		while (s.requestList.length > s.offlineLimit) {
			s.dequeueRequest();
		}
	};

	s.forceOffline = function() {
		s.offline = true;
	};

	s.forceOnline = function() {
		s.offline = false;
	};

	s.makeUniqueOfflineFilename = function() {
		return s.offlineFilename + "-"  + s.visitorNamespace + s.account;
	};

	s.getCurrentTimeInMilliseconds = function() {
		return (new Date).getTime();
	};

	s.hrefSupportsLinkTracking = function(href) {
		href = href.toLowerCase();
		if ((href.indexOf("#") != 0) &&
			(href.indexOf("about:") != 0) &&
			(href.indexOf("opera:") != 0) &&
			(href.indexOf("javascript:") != 0)) {
			return true;
		}
		return false;
	};

	/*********************************************************************
	* Function setTagContainer(tagContainerName): Set the tag container
	*             and use the tag container loader if it exists to get the
	*             queues for calls to execute that happened before the
	*             container was loaded
	*     tagContainerName = Name of tag container (same as s.tagContainerName)
	* Returns:
	*     Nothing
	*********************************************************************/
	s.setTagContainer = function(tagContainerName) {
		var i,
			containerLoader,
			container,
			module;
		s.tagContainerName = tagContainerName;
		for (i=0; i<s._il.length; i++) {
			containerLoader = s._il[i];
			if (containerLoader && containerLoader["_c"] == "s_l"
					&& containerLoader["tagContainerName"] == tagContainerName) {

				s.variableOverridesApply(containerLoader);

				// Load queued up modules
				if (containerLoader["lmq"]) {
					for (i=0; i<containerLoader["lmq"].length; i++) {
						container = containerLoader["lmq"][i];
						s.loadModule(container["n"]);
					}
				}
				// Transfer various module member objects (such as: s.Media.trackMilestones etc.)
				if (containerLoader["ml"]) {
					for (container in containerLoader["ml"]) {
						if (s[container]) {
							module = s[container];
							container = containerLoader["ml"][container];
							for(i in container) {
								if (!Object.prototype[i]){
									if (typeof(container[i])!="function" || (""+container[i]).indexOf("s_c_il")<0)
										module[i] = container[i];
								}
							}
						}
					}
				}
				// Execute queued up module function calls
				if (containerLoader["mmq"]) {
					for (i=0; i<containerLoader["mmq"].length; i++) {
						container = containerLoader["mmq"][i];
						if (s[container["m"]]){
							module = s[container["m"]];
							if (module[container["f"]]&&typeof(module[container["f"]])=="function"){
								if (container["a"]) {
									module[container["f"]].apply(module, container["a"]);
								}
								else {
									module[container["f"]].apply(module);
								}
							}
						}
					}
				}
				// Execute queued up track calls
				if (containerLoader["tq"]) {
					for (i=0; i<containerLoader["tq"].length; i++) {
						s.track(containerLoader["tq"][i]);
					}
				}
				containerLoader["s"] = s;
				return;
			}
		}
	};

	/* Utilities API */
	s.Util = {
		"urlEncode":s.escape,
		"urlDecode":s.unescape,
		"cookieRead":s.cookieRead,
		"cookieWrite":s.cookieWrite,
		"getQueryParam":function(key, url, delim, checkForValuelessKey) {
			var
				queryStringPos,
				value,
				r = "";

			// If we don't have a custom URL like document.referrer...
			if (!url) {
				// Look for a custom page URL in s.pageURL
				if (s.pageURL) {
					url = s.pageURL;
				}
				//Default to window.location
				else {
					url = w.location;
				}
			}

			// If we don't have a custom delimiter (usualy ";") default to "&"
			delim = delim ? delim : "&";

			// Return if we don't have a good URL and key return
			if (!key || !url) {
				return r;
			}

			url = "" + url;
			queryStringPos = url.indexOf("?");

			// Return if there is no well defined query string
			if (queryStringPos < 0) {
				return r;
			}

			value = delim + url.substring(queryStringPos + 1) + delim;
			// check if the key exists in the query string but has no value
			if (
				checkForValuelessKey
				&& (
					value.indexOf(delim + key + delim) >= 0
					|| value.indexOf(delim + key + "=" + delim) >= 0
				)
			) {
				return undefined;
			}

			// check for existance of fragment delimiter
			queryStringPos = value.indexOf("#");
			if (queryStringPos >= 0) {
				// remove everything after fragment delimiter
				value = value.substr(0, queryStringPos) + delim;
			}

			queryStringPos = value.indexOf(delim + key + "=");
			// Return if the key is not found
			if (queryStringPos < 0) {
				return r;
			}

			value = value.substring(queryStringPos + delim.length + key.length + 1);
			queryStringPos = value.indexOf(delim);
			if (queryStringPos >= 0) {
				value = value.substring(0,queryStringPos);
			}

			if (value.length > 0) {
				// We found something so URL decode it before returning
				r = s.unescape(value);
			}

			return r;
		},
		/*********************************************************************
		* Function getIeVersion
		*     This function was copied from:
		*       visitor-js-client/lib/utils/utils.js
		*     TODO: Get this via a shared npm module instead
		* Returns:
		*     Returns Internet Explorer Version
		*********************************************************************/
		"getIeVersion":function() {
			// IE 8+ supports documentMode
			if (document.documentMode) {
				return document.documentMode;
			} else if (s._isInternetExplorer()) {
				// Instead of using unsafe detection of unsupported IE browsers we return a low version
				return 7;
			}
			// Not IE.
			return null;
		}
	};

	// This will be replaced with the variable lists by the Makefile
	/* eslint-disable semi,no-undef */
	s.requiredVarList = [
		'supplementalDataID',
		'timestamp',
		'dynamicVariablePrefix',
		'visitorID',
		'marketingCloudVisitorID',
		'analyticsVisitorID',
		'audienceManagerLocationHint',
		'authState',
		'fid',
		'vmk',
		'visitorMigrationKey',
		'visitorMigrationServer',
		'visitorMigrationServerSecure',
		'charSet',
		'visitorNamespace',
		'cookieDomainPeriods',
		'fpCookieDomainPeriods',
		'cookieLifetime',
		'pageName',
		'pageURL',
		'customerPerspective',
		'referrer',
		'contextData',
		'contextData.cm.ssf',
		'contextData.opt.dmp',
		'contextData.opt.sell',
		'clientHints',
		'currencyCode',
		'lightProfileID',
		'lightStoreForSeconds',
		'lightIncrementBy',
		'retrieveLightProfiles',
		'deleteLightProfiles',
		'retrieveLightData'
	];

	s.accountVarList = s.requiredVarList.concat([
		'purchaseID',
		'variableProvider',
		'channel',
		'server',
		'pageType',
		'transactionID',
		'campaign',
		'state',
		'zip',
		'events',
		'events2',
		'products',
		'audienceManagerBlob',
		'tnt'
	]);

	s.lightRequiredVarList = [
		'timestamp',
		'charSet',
		'visitorNamespace',
		'cookieDomainPeriods',
		'cookieLifetime',
		'contextData',
		'lightProfileID',
		'lightStoreForSeconds',
		'lightIncrementBy'
	];

	s.lightVarList = s.lightRequiredVarList.slice(0);
	s.accountConfigList = [
		'account',
		'allAccounts',
		'debugTracking',
		'visitor',
		'visitorOptedOut',
		'trackOffline',
		'offlineLimit',
		'offlineThrottleDelay',
		'offlineFilename',
		'usePlugins',
		'doPlugins',
		'configURL',
		'visitorSampling',
		'visitorSamplingGroup',
		'linkObject',
		'clickObject',
		'linkURL',
		'linkName',
		'linkType',
		'trackDownloadLinks',
		'trackExternalLinks',
		'trackClickMap',
		'trackInlineStats',
		'linkLeaveQueryString',
		'linkTrackVars',
		'linkTrackEvents',
		'linkDownloadFileTypes',
		'linkExternalFilters',
		'linkInternalFilters',
		'useForcedLinkTracking',
		'forcedLinkTrackingTimeout',
		'writeSecureCookies',
		'useLinkTrackSessionStorage',
		'collectHighEntropyUserAgentHints',
		'trackingServer',
		'trackingServerSecure',
		'ssl',
		'abort',
		'mobile',
		'dc',
		'lightTrackVars',
		'maxDelay',
		'expectSupplementalData',
		'useBeacon',
		'usePostbacks',
		'registerPreTrackCallback',
		'registerPostTrackCallback',
		'bodyClickTarget',
		'bodyClickFunction',
		'AudienceManagement'
	];

	for (var varNum = 0;varNum <= 250;varNum++) {
		if (varNum < 76) {
			s.accountVarList.push('prop' + varNum);
			s.lightVarList.push('prop' + varNum);
		}
		s.accountVarList.push('eVar' + varNum);
		s.lightVarList.push('eVar' + varNum);
		if (varNum < 6) {
			s.accountVarList.push('hier' + varNum);
		}
		if (varNum < 4) {
			s.accountVarList.push('list' + varNum);
		}
	}
	var requiredVarList2 = [
		'pe',
		'pev1',
		'pev2',
		'pev3',
		'latitude',
		'longitude',
		'resolution',
		'colorDepth',
		'javascriptVersion',
		'javaEnabled',
		'cookiesEnabled',
		'browserWidth',
		'browserHeight',
		'connectionType',
		'homepage',
		'pageURLRest',
		'marketingCloudOrgID',
		'ms_a'
	];
	s.accountVarList = s.accountVarList.concat(requiredVarList2);
	s.requiredVarList = s.requiredVarList.concat(requiredVarList2);
	/* eslint-enable semi,no-undef */

	// Defaults
	s.ssl = (w.location.protocol.toLowerCase().indexOf("https")>=0);
	s.charSet = "UTF-8";
	s.contextData = {};

	s.HIGH_ENTROPY_USER_AGENT_CLIENT_HINTS = [
		"architecture",
		"bitness",
		"model",
		"platformVersion",
		"wow64"
		// Questionable if fullVersionList is needed as brands header holds major version
		// "fullVersionList"
	];

	// writeSecureCookies should default to true once we only support TLS requests
	// and close to 100% of pages we track are secure
	s.writeSecureCookies = false;

	s.collectHighEntropyUserAgentHints = false;

	s.offlineThrottleDelay = 0;
	s.offlineFilename = "AppMeasurement.offline";

	s.linkTrackStorageName = "s_sq";

	// Timestamps that controls request throttling, and offline request storage
	s.lastRequestTimestamp = 0;
	s.lastEnqueuedPacketTimestamp = 0;
	s.lastOfflineWriteTimestamp = 0;
	s.lastOfflineDeletionTimestamp = 0;

	s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";

	// Aliases
	s.w = w;
	/**
	  * @type {!Document}
	  * @noalias
	  */
	s.d = w.document;

	/*********************************************************************
	* Function bodyClickRepropagate(): Repropagate a cloned click event
	*                                  from s.bct and s.bce or run a
	*                                  custom callback in s.bcf
	*     Nothing
	* Returns:
	*     Nothing
	* NOTE:
	*     Called by setTimeout and directly
	*********************************************************************/
	s.bodyClickRepropagate = function() {
		if (s.bodyClickRepropagateTimer) {
			w.clearTimeout(s.bodyClickRepropagateTimer);
			s.bodyClickRepropagateTimer = Null;
		}

		/*
		For future connections supporting abort, this would be a good place to call it.
		If offline storage is turned on, this would then save the pending request.
		If offline storage is turend on the forcedLinkTrackingTimeout could also be
		set shorter because requests would end up being saved.
		if (s.handlingRequest && s.currentConnection.abort) {
			s.currentConnection.abort();
		}
		*/
		if ((s.bodyClickTarget) && (s.bodyClickEvent)) {
			s.bodyClickTarget.dispatchEvent(s.bodyClickEvent);
		}
		if (s.bodyClickFunction) {
			if (typeof(s.bodyClickFunction) == "function") {
				s.bodyClickFunction();
			} else if ((s.bodyClickTarget) && (s.bodyClickTarget.href)) {
				s.d.location = s.bodyClickTarget.href;
			}
		}
		s.bodyClickTarget = s.bodyClickEvent = s.bodyClickFunction = 0;
	};

	// Setup the body when it exists
	s.setupBody = function() {
		s.b = s.d.body;

		if (s.b) {
			/*********************************************************************
			* Function bodyClick(e): <body> click handler
			*     e = Click event object
			* Returns:
			*     Nothing
			*********************************************************************/
			s.bodyClick = function(e) {
				var
					newEvent,
					target,
					requestCount,
					anchor,
					href;

				/* If ClickMap plugin is running or this is a fake click event ignore */
				if (((s.d) && (s.d.getElementById("cppXYctnr"))) ||
					((e) && (e["s_fe_" + s._in]))) {
					return;
				}

				/* If we don't have forced body click support turn off the flag */
				if (!s.blockingBodyClick) {
					s.useForcedLinkTracking=0;
				/* If we do have forced body click support but it's turned off remove the capture event listener and turn the support flag off */
				} else if(!s.useForcedLinkTracking){
					s.b.removeEventListener("click",s.bodyClick,true);
					s.blockingBodyClick = s.useForcedLinkTracking = 0;
					return;
				/* If we do have forced body click support and it's turned on remove the bubble event listener */
				} else {
					s.b.removeEventListener("click",s.bodyClick,false);
				}

				s.clickObject = (e.srcElement ? e.srcElement : e.target);
				try {
					if ((s.clickObject) && ((!s.lastClickObject) || (s.lastClickObject != s.clickObject)) && ((s.clickObject.tagName) || (s.clickObject.parentElement) || (s.clickObject.parentNode))) {
						/*
						 * Safeguard tracking a flood of clicks from fake or real events to the same object (s.lastClickObject checked above)
						 * Only track a click to the same object after a 10 second timeout
						 */
						var lastClickObject = s.lastClickObject = s.clickObject;
						if (s.lastClickObjectTimeout) {
							clearTimeout(s.lastClickObjectTimeout);
							s.lastClickObjectTimeout = 0;
						}
						s.lastClickObjectTimeout = setTimeout(function () {
							// Only clear if we are still dealing with the samek object
							if (s.lastClickObject == lastClickObject) {
								s.lastClickObject = 0;
							}
						},10000);

						requestCount = s.getPendingRequestCount();
						s.logDebug("[bodyClick] Calling track");
						s.track();

						/* If we just tracked the click, have forced body click support, it's turned on, and we have a DOM element that can dispatch events... */
						if ((requestCount < s.getPendingRequestCount()) && (s.useForcedLinkTracking) && (e.target)) {
							/*
							We only do the automatic forced link tracking for
							   1. A and AREA tags
							   2. href that is not #*, about:*, opera:*, or javascript:*
							   3. link-target attribute that is the current window
							*/
							anchor = e.target;
							while ((anchor) && (anchor != s.b) && (anchor.tagName.toUpperCase() != "A") && (anchor.tagName.toUpperCase() != "AREA")) {
								anchor = anchor.parentNode;
							}
							if (anchor) {
								href = anchor.href;
								if (!s.hrefSupportsLinkTracking(href)) {
									href = 0;
								}
								target = anchor.target;
								if ((e.target.dispatchEvent) && (href) && ((!target) || (target == "_self") || (target == "_top") || (target == "_parent") || ((w.name) && (target == w.name)))) {
									/* Create the click event */
									try {
										newEvent = s.d.createEvent("MouseEvents");
									} catch (e) {
										newEvent = new w["MouseEvent"];
									}
									if (newEvent) {
										try {
											newEvent.initMouseEvent(
												"click",
												e.bubbles,
												e.cancelable,
												e.view,
												e.detail,
												e.screenX,
												e.screenY,
												e.clientX,
												e.clientY,
												e.ctrlKey,
												e.altKey,
												e.shiftKey,
												e.metaKey,
												e.button,
												e.relatedTarget
											);
										} catch (e) {
											newEvent = 0;
										}
										if (newEvent) {
											/* Flag as a fake event that we should not handle when it's repropagated */
											newEvent["s_fe_" + s._in] = newEvent["s_fe"] = 1;

											/* Kill the event propagation */
											e.stopPropagation();
											if (e.stopImmediatePropagation) {
												e.stopImmediatePropagation();
											}
											e.preventDefault();

											/* Store the target and cloned event to use later to repropagate the click */
											s.bodyClickTarget = e.target;
											s.bodyClickEvent = newEvent;
										}
									}
								}
							}
						}
					} else {
						s.clickObject = 0;
					}
				} catch (x) {
					s.clickObject = 0;
				}
			};

			// Add event handlers
			if ((s.b) && (s.b.attachEvent)) {
				s.b.attachEvent("onclick",s.bodyClick);
			} else if ((s.b) && (s.b.addEventListener)) {
				/* Setup forced link tracking event handler if supported */
				if ((navigator) && (
					((navigator.userAgent.indexOf("WebKit") >= 0) && (s.d.createEvent)) ||
					((navigator.userAgent.indexOf("Firefox/2") >= 0) && (w["MouseEvent"]))
				)) {
					s.blockingBodyClick     = 1;
					s.useForcedLinkTracking = 1;
					s.b.addEventListener("click",s.bodyClick,true);
				}
				s.b.addEventListener("click",s.bodyClick,false);
			}
		} else {
			setTimeout(s.setupBody,30);
		}
	};

	// Limit GET request size for Internet Explorer
	// https://support.microsoft.com/en-us/help/208427/maximum-url-length-is-2-083-characters-in-internet-explorer
	s.url2047Limit = s._isInternetExplorer();

	s.disableIfUnsupportedBrowser();
	if (!s.unsupportedBrowser) {
		// TODO: Just logging this check for now until more clients fix this.
		//       In a future release this should be moved to the top and throw an exception.
		if (!account) {
			s.log("Error, missing Report Suite ID in AppMeasurement initialization");
		}
		else {
			s.setAccount(account);
		}

		s.setupBody();

		// Auto load some modules if present
		s.loadModule("ActivityMap");
	}
}

/*********************************************************************
* Function getInstance(account): Finds instance for an account
*     account = Account for instance
* Returns:
*     Instance
*
* @constructor
* @noalias
*********************************************************************/
function s_gi(account) {
	/**
	  * @type {AppMeasurement}
	  * @noalias
	  */
	var s;
	var
		instanceList = window.s_c_il,
		instanceNum,
		accountSet,
		accountList = account.split(","),
		allAccounts,
		accountNum,subAccountNum,
		found = 0;
	if (instanceList) {
		instanceNum = 0;
		while ((!found) && (instanceNum < instanceList.length)) {
			s = instanceList[instanceNum];
			if (s._c == "s_c") {
				if ((s.account) || (s.oun)) {
					if ((s.account) && (s.account == account)) {
						found = 1;
					} else {
						accountSet = (s.account ? s.account : s.oun);
						allAccounts = (s.allAccounts ? s.allAccounts : accountSet.split(","));
						for (accountNum = 0;accountNum < accountList.length;accountNum++) {
							for (subAccountNum = 0;subAccountNum < allAccounts.length;subAccountNum++) {
								if (accountList[accountNum] == allAccounts[subAccountNum]) {
									found = 1;
								}
							}
						}
					}
				}
			}
			instanceNum++;
		}
	}
	if (!found) {
		s = new AppMeasurement(account);
	} else if (s.setAccount) {
		s.setAccount(account);
	}
	return s;
}
AppMeasurement["getInstance"] = s_gi;

/*********************************************************************
* Globals
*********************************************************************/
if (!window["s_objectID"]) {
	window["s_objectID"] = 0;
}

/*********************************************************************
* Function processGetInstanceCallQueue(): Process the s_gi call queue
*     that was recorded by Tag Management prior to library being loaded.
* Returns:
*     Nothing
*********************************************************************/
function s_pgicq() {
	var w = window,
		callQueue = w.s_giq,
		ia,
		callInfo,
		s;
	if(callQueue) {
		for(ia=0; ia<callQueue.length; ia++) {
			callInfo = callQueue[ia];
			s = s_gi(callInfo["oun"]);
			s.setAccount(callInfo["un"]);
			s.setTagContainer(callInfo["tagContainerName"]);
		}
	}
	w.s_giq = 0;
}

s_pgicq();
