(function() {
  window._satellite = window._satellite || {};
  window._satellite.container = {
    "buildInfo": {
      "buildDate": "2022-10-17T03:22:43Z",
      "turbineBuildDate": "2022-09-28T18:15:16Z",
      "turbineVersion": "27.4.0"
    },
    "environment": {
      "id": "ENf8447b17af6647fbac3af6aa969b6fa4",
      "stage": "staging"
    },
    "dataElements": {
      "Channel": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            var channel = "not_set";

            if (_satellite.getVar("is BambooHR WWW Microsite"))
              channel = "www";
            else if (_satellite.getVar("is BambooHR Blog Microsite"))
              channel = "blog";
            else if (_satellite.getVar("is BambooHR Marketplace Microsite"))
              channel = "marketplace";
            else if (_satellite.getVar("is BambooHR Partners Microsite"))
              channel = "partners";

            return channel;
          }
        }
      },
      "Blog Post Title": {
        "defaultValue": "",
        "modulePath": "core/src/lib/dataElements/javascriptVariable.js",
        "settings": {
          "path": "digitalData.resource.title"
        }
      },
      "is BambooHR WWW Microsite": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            return (/^(localhost(:\d+)?|.*--bamboohr-website--hlxsites\.hlx\.page|www\.bamboohr\.com)$/i.test(document.location.hostname) && !_satellite.getVar("is BambooHR Ancillary Microsite"));
          }
        }
      },
      "is TrustArc Advertising Cookie Allowed": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            var noticeGDPRPrefs = _satellite.cookie.get("notice_gdpr_prefs");
            var noticeBehavior = _satellite.cookie.get("notice_behavior");

            if (!noticeGDPRPrefs && noticeBehavior && noticeBehavior != "expressed|eu")
              return true;
            else if (noticeGDPRPrefs) {
              if (/^.*2.*$/i.test(noticeGDPRPrefs))
                return true;
              else
                return false;
            }
            else
              return false;
          }
        }
      },
      "Server": {
        "modulePath": "core/src/lib/dataElements/pageInfo.js",
        "settings": {
          "attribute": "hostname"
        }
      },
      "Adobe Experience Cloud ID": {
        "modulePath": "adobe-mcid/src/lib/dataElements/ecid.js",
        "settings": {
        }
      },
      "Blog Post Read Time": {
        "defaultValue": "",
        "modulePath": "core/src/lib/dataElements/javascriptVariable.js",
        "settings": {
          "path": "digitalData.resource.readTime"
        }
      },
      "is TrustArc Functional Cookie Allowed": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            var noticeGDPRPrefs = _satellite.cookie.get("notice_gdpr_prefs");
            var noticeBehavior = _satellite.cookie.get("notice_behavior");

            if (!noticeGDPRPrefs && noticeBehavior && noticeBehavior != "expressed|eu")
              return true;
            else if (noticeGDPRPrefs) {
              if (/^.*1.*$/i.test(noticeGDPRPrefs))
                return true;
              else
                return false;
            }
            else
              return false;
          }
        }
      },
      "is BambooHR Site": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            return (/^(localhost(:\d+)?|.*--bamboohr-website--hlxsites\.hlx\.page|www\.bamboohr\.com)$i/.test(document.location.hostname));
          }
        }
      },
      "Adobe Tags Environment Stage": {
        "modulePath": "core/src/lib/dataElements/runtimeEnvironment.js",
        "settings": {
          "attribute": "environmentStage"
        }
      },
      "is BambooHR Partners Microsite": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            return (/^partners\.bamboohr\.com$/i.test(document.location.hostname));
          }
        }
      },
      "Referrer": {
        "modulePath": "core/src/lib/dataElements/pageInfo.js",
        "settings": {
          "attribute": "referrer"
        }
      },
      "Event": {
        "modulePath": "core/src/lib/dataElements/javascriptVariable.js",
        "settings": {
          "path": "digitalData.event"
        }
      },
      "Campaign": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            var campaign = (s.Util.getQueryParam("utm_campaign") || "not_set") + "|" + (s.Util.getQueryParam("utm_source") || "not_set") + "|" + (s.Util.getQueryParam("utm_medium") || "not_set") + "|" + (s.Util.getQueryParam("utm_term") || "not_set") + "|" + (s.Util.getQueryParam("utm_content") || "not_set");

            return (campaign != "not_set|not_set|not_set|not_set|not_set" ? campaign : "");
          }
        }
      },
      "Blog Post Author": {
        "defaultValue": "",
        "modulePath": "core/src/lib/dataElements/javascriptVariable.js",
        "settings": {
          "path": "digitalData.resource.author"
        }
      },
      "Page Name": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            /*
   Assumes the Page Name is built strictly off of the URL structure in the format "bhr|site-name|path|page" and pages end in ".html", "/", or a character
*/

            var hostNameFirstElement = window.location.hostname.split(".")[0];
            var pageName = "bhr";
            var path = window.location.pathname.replace(/(\.html|\/)$/, "").replaceAll("/", "|");

            if (/^\/blog\/.*$/i.test(window.location.pathname))
              ;
            else if (/^\/integrations\/.*$/i.test(window.location.pathname))
              path = path.replace(/^\|integrations/, "|marketplace");
            else if (/^(localhost|.*--bamboohr-website--hlxsites|www)$/i.test(hostNameFirstElement))
              pageName += "|www";
            else if (/^partners$/i.test(hostNameFirstElement))
              pageName += "|partners";
            else
              pageName += hostNameFirstElement;

            if (!path)
              pageName += "|home";
            else
              pageName += path;

            return pageName;
          }
        }
      },
      "is BambooHR Ancillary Microsite": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            return (_satellite.getVar("is BambooHR Blog Microsite") || _satellite.getVar("is BambooHR Marketplace Microsite") || _satellite.getVar("is BambooHR Partners Microsite"));
          }
        }
      },
      "Blog Post Category": {
        "defaultValue": "",
        "modulePath": "core/src/lib/dataElements/javascriptVariable.js",
        "settings": {
          "path": "digitalData.resource.category"
        }
      },
      "Blog Post Updated Date": {
        "defaultValue": "",
        "modulePath": "core/src/lib/dataElements/javascriptVariable.js",
        "settings": {
          "path": "digitalData.resource.updatedDate"
        }
      },
      "Blog Post Publication Date": {
        "defaultValue": "",
        "modulePath": "core/src/lib/dataElements/javascriptVariable.js",
        "settings": {
          "path": "digitalData.resource.publicationDate"
        }
      },
      "Session Page View Count": {
        "modulePath": "core/src/lib/dataElements/visitorBehavior.js",
        "settings": {
          "attribute": "sessionPageViewCount"
        }
      },
      "is BambooHR Blog Microsite": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            return (/^\/blog\/.*$/i.test(document.location.pathname));
          }
        }
      },
      "Activity Map Customizer Contextual DOM Attribute": {
        "modulePath": "activity-map-customizer/src/lib/dataElements/linkClickRegionPath.js",
        "settings": {
          "inputParam": {
            "delim": " > ",
            "grabAttr": "am-region",
            "grabCriteria": "all",
            "matchCriteria": "self-ancestors",
            "matchCSSSelector": "*[am-region]",
            "traverseBottomToTop": false
          }
        }
      },
      "Adobe Tags Debug Info": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            return "p=" + _satellite.property.name + ";e=" + _satellite.environment.stage + ";d=" + _satellite.buildInfo.buildDate + (event ? ";r=" + event.$rule.name + ";t=" + event.$type : "");
          }
        }
      },
      "is BambooHR Marketplace Microsite": {
        "modulePath": "core/src/lib/dataElements/customCode.js",
        "settings": {
          "source": function(event) {
            return (/^\/integrations\/.*$/i.test(document.location.pathname));
          }
        }
      }
    },
    "extensions": {
      "adobe-analytics": {
        "displayName": "Adobe Analytics",
        "hostedLibFilesBaseUrl": "https://assets.adobedtm.com/extensions/EPbf7b42aa08bc4f10879b1484195e80d1/",
        "settings": {
          "orgId": "63C70EF1613FCF530A495EE2@AdobeOrg",
          "customSetup": {
            "source": function(s) {
              //Stop secondary custom link beacon from firing on rules that send an exit link beacon
              s.linkInternalFilters = s.apl(s.linkInternalFilters, "localhost,hlx.page,bamboohr.com,mailto:,facebook.com/bamboohr,facebook.com/sharer/sharer.php,twitter.com/share,twitter.com/bamboohr,instagram.com/bamboohr,linkedin.com/sharing,linkedin.com/company/bamboorhr,youtube.com/user/bamboohr,apps.apple.com/us/app/bamboohr/id587244049,play.google.com/store/apps/details?id=com.mokinetworks.bamboohr");

              s.ActivityMap.regionIDAttribute = "am-region";

              s.linkTrackVars = "eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar7,eVar8,eVar10,events,campaign,channel,server";

              s.usePlugins = true;

              function s_doPlugins(s) {
                s.campaign = _satellite.getVar("Campaign");
                s.channel = _satellite.getVar("Channel");
                s.server = _satellite.getVar("Server");

                s.eVar1 = s.pageName = _satellite.getVar("Page Name");

                if (s.pageName) {
                  s.getPercentPageViewed();
                  s.getPageLoadTime();
                }

                if (s._ppvPreviousPage && s._ppvPreviousPage != "undefined") {
                  s.eVar2 = s._ppvPreviousPage;
                  s.eVar6 = "highestPercentViewed=" + s._ppvHighestPercentViewed + " | initialPercentViewed=" + s._ppvInitialPercentViewed + " | foldsSeen=" + s._ppvFoldsSeen + " | foldsAvailable=" + s._ppvFoldsAvailable;
                }

                s.eVar3 = "D=g";

                if (_satellite.getVar("Session Page View Count") == 1 && !s.linkType)
                  s.eVar4 = "D=g";

                if (s._pltPreviousPage && !s.linkType) {
                  s.eVar5 = s._pltLoadTime;
                  s.events = "event100=" + s._pltLoadTime;
                }

                if (!document.documentMode)
                  s.eVar7 = getTimeParting("America/Denver");
                else
                  s.eVar7 = "Internet Explorer Visitors";

                s.eVar8 = _satellite.getVar("Time Since Last Visit");

                s.eVar10 = _satellite.getVar("Adobe Experience Cloud ID");
              }

              s.doPlugins = s_doPlugins;
            }
          },
          "libraryCode": {
            "type": "managed",
            "accounts": {
              "staging": [
                "bamboohrstage"
              ],
              "production": [
                "bamboohrprod"
              ],
              "development": [
                "bamboohrstage"
              ]
            },
            "useActivityMap": true,
            "scopeTrackerGlobally": true
          },
          "trackerProperties": {
            "currencyCode": "USD",
            "trackingServer": "smetrics.bamboohr.com",
            "trackInlineStats": true,
            "trackDownloadLinks": true,
            "trackExternalLinks": true,
            "trackingServerSecure": "smetrics.bamboohr.com",
            "linkDownloadFileTypes": [
              "doc",
              "docx",
              "eps",
              "jpg",
              "png",
              "svg",
              "xls",
              "ppt",
              "pptx",
              "pdf",
              "xlsx",
              "tab",
              "csv",
              "zip",
              "txt",
              "vsd",
              "vxd",
              "xml",
              "js",
              "css",
              "rar",
              "exe",
              "wma",
              "mov",
              "avi",
              "wmv",
              "mp3",
              "wav",
              "m4v"
            ]
          }
        },
        "modules": {
          "adobe-analytics/src/lib/actions/clearVariables.js": {
            "name": "clear-variables",
            "displayName": "Clear Variables",
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2016 Adobe Systems Incorporated
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

              'use strict';

              var getTracker = require('../sharedModules/getTracker');

              module.exports = function() {
                return getTracker().then(function(tracker) {
                  if (tracker.clearVars) {
                    turbine.logger.info('Clear variables.');
                    tracker.clearVars();
                  }
                }, function(errorMessage) {
                  turbine.logger.error(
                    'Cannot clear variables: ' +
                    errorMessage
                  );
                });
              };

            }

          },
          "adobe-analytics/src/lib/actions/sendBeacon.js": {
            "name": "send-beacon",
            "displayName": "Send Beacon",
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2016 Adobe Systems Incorporated
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

              'use strict';

              var getTracker = require('../sharedModules/getTracker');
              var getNodeLinkText = require('../helpers/getNodeLinkText');

              var isLink = function(element) {
                return element && element.nodeName && element.nodeName.toLowerCase() === 'a';
              };

              var getLinkName = function(element) {
                if (isLink(element)) {
                  return getNodeLinkText(element);
                } else {
                  return 'link clicked';
                }
              };

              var sendBeacon = function(tracker, settings, targetElement) {
                if (settings.type === 'page') {
                  turbine.logger.info('Firing page view beacon.');
                  tracker.t();
                } else {
                  var linkSettings = {
                    linkType: settings.linkType || 'o',
                    linkName: settings.linkName || getLinkName(targetElement)
                  };

                  turbine.logger.info(
                    'Firing link track beacon using the values: ' +
                    JSON.stringify(linkSettings) + '.'
                  );

                  tracker.tl(
                    isLink(targetElement) ? targetElement : 'true',
                    linkSettings.linkType,
                    linkSettings.linkName
                  );
                }
              };

              module.exports = function(settings, event) {
                return getTracker().then(function(tracker) {
                  sendBeacon(tracker, settings, event.element);
                }, function(errorMessage) {
                  turbine.logger.error(
                    'Cannot send beacon: ' +
                    errorMessage
                  );
                });
              };

            }

          },
          "adobe-analytics/src/lib/actions/setVariables.js": {
            "name": "set-variables",
            "displayName": "Set Variables",
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2016 Adobe Systems Incorporated
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

              'use strict';

              var getTracker = require('../sharedModules/getTracker');
              var applyTrackerVariables = require('../helpers/applyTrackerVariables');

              module.exports = function(settings, event) {
                return getTracker().then(function(tracker) {
                  turbine.logger.info('Set variables on the tracker.');
                  applyTrackerVariables(tracker, settings.trackerProperties);
                  if (settings.customSetup && settings.customSetup.source) {
                    settings.customSetup.source.call(event.element, event, tracker);
                  }
                }, function(errorMessage) {
                  turbine.logger.error(
                    'Cannot set variables: ' +
                    errorMessage
                  );
                });
              };

            }

          },
          "adobe-analytics/src/lib/sharedModules/getTracker.js": {
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2016 Adobe Systems Incorporated
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

              'use strict';

              var cookie = require('@adobe/reactor-cookie');
              var Promise = require('@adobe/reactor-promise');
              var window = require('@adobe/reactor-window');
              var settingsHelper = require('../helpers/settingsHelper');
              var augmenters = require('../helpers/augmenters');

              var applyTrackerVariables = require('../helpers/applyTrackerVariables');
              var loadLibrary = require('../helpers/loadLibrary');
              var generateVersion = require('../helpers/generateVersion');

              var version = generateVersion(turbine.buildInfo.turbineBuildDate);
              var BEFORE_SETTINGS_LOAD_PHASE = 'beforeSettings';

              var mcidInstance = turbine.getSharedModule('adobe-mcid', 'mcid-instance');

              var checkEuCompliance = function(trackingCoookieName) {
                if (!trackingCoookieName) {
                  return true;
                }

                var euCookieValue = cookie.get(trackingCoookieName);
                return euCookieValue === 'true';
              };

              var augmentTracker = function(tracker) {
                return Promise.all(augmenters.map(function(augmenterFn) {
                  var result;

                  // If a tracker augmenter fails, we don't want to fail too. We'll re-throw the error in a
                  // timeout so it still hits the console but doesn't reject our promise.
                  try {
                    result = augmenterFn(tracker);
                  } catch (e) {
                    setTimeout(function() {
                      throw e;
                    });
                  }

                  return Promise.resolve(result);
                })).then(function() {
                  return tracker;
                });
              };

              var linkVisitorId = function(tracker) {
                if (mcidInstance) {
                  turbine.logger.info('Setting MCID instance on the tracker.');
                  tracker.visitor = mcidInstance;
                }

                return tracker;
              };

              var updateTrackerVersion = function(tracker) {
                turbine.logger.info('Setting version on tracker: "' + version + '".');

                if (typeof tracker.tagContainerMarker !== 'undefined') {
                  tracker.tagContainerMarker = version;
                } else if (typeof tracker.version === 'string'
                  && tracker.version.substring(tracker.version.length - 5) !== ('-' + version)) {
                  tracker.version += '-' + version;
                }

                return tracker;
              };

              var updateTrackerVariables = function(trackerProperties, customSetup, tracker) {
                if (customSetup.loadPhase === BEFORE_SETTINGS_LOAD_PHASE && customSetup.source) {
                  turbine.logger.info('Calling custom script before settings.');
                  customSetup.source.call(window, tracker);
                }

                applyTrackerVariables(tracker, trackerProperties || {});

                if (customSetup.loadPhase !== BEFORE_SETTINGS_LOAD_PHASE && customSetup.source) {
                  turbine.logger.info('Calling custom script after settings.');
                  customSetup.source.call(window, tracker);
                }

                return tracker;
              };

              var initializeAudienceManagement = function(settings, tracker) {
                if (settingsHelper.isAudienceManagementEnabled(settings)) {
                  tracker.loadModule('AudienceManagement');
                  turbine.logger.info('Initializing AudienceManagement module');
                  tracker.AudienceManagement.setup(settings.moduleProperties.audienceManager.config);
                }
                return tracker;
              };

              var initialize = function(settings) {
                if (checkEuCompliance(settings.trackingCookieName)) {
                  return loadLibrary(settings)
                    .then(augmentTracker)
                    .then(linkVisitorId)
                    .then(updateTrackerVersion)
                    .then(updateTrackerVariables.bind(
                      null,
                      settings.trackerProperties,
                      settings.customSetup || {}
                    ))
                    .then(initializeAudienceManagement.bind(null, settings));
                } else {
                  return Promise.reject('EU compliance was not acknowledged by the user.');
                }
              };

              var promise = initialize(turbine.getExtensionSettings());
              module.exports = function() {
                return promise;
              };

            }
            ,
            "name": "get-tracker",
            "shared": true
          },
          "adobe-analytics/src/lib/sharedModules/augmentTracker.js": {
            "name": "augment-tracker",
            "shared": true,
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2017 Adobe Systems Incorporated
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

              'use strict';

              var augmenters = require('../helpers/augmenters');

              module.exports = function(fn) {
                augmenters.push(fn);
              };

            }

          },
          "adobe-analytics/src/lib/helpers/settingsHelper.js": {
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2020 Adobe Systems Incorporated
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

              'use strict';

              var window = require('@adobe/reactor-window');

              var settingsHelper = {
                LIB_TYPES: {
                  MANAGED: 'managed',
                  PREINSTALLED: 'preinstalled',
                  REMOTE: 'remote',
                  CUSTOM: 'custom'
                },

                MANAGED_LIB_PATHS: {
                  APP_MEASUREMENT: 'AppMeasurement.js',
                  ACTIVITY_MAP: 'AppMeasurement_Module_ActivityMap.js',
                  AUDIENCE_MANAGEMENT: 'AppMeasurement_Module_AudienceManagement.js',
                },

                getReportSuites: function(reportSuitesData) {
                  var reportSuiteValues = reportSuitesData.production;
                  if (reportSuitesData[turbine.environment.stage]) {
                    reportSuiteValues = reportSuitesData[turbine.environment.stage];
                  }

                  return reportSuiteValues.join(',');
                },

                isActivityMapEnabled: function(settings) {
                  return !(settings.libraryCode &&
                    !settings.libraryCode.useActivityMap &&
                    settings.libraryCode.useActivityMap === false);
                },

                isAudienceManagementEnabled: function(settings) {
                  var isEnabled = false;
                  // check if audience management module should be enabled
                  if (settings &&
                    settings.moduleProperties &&
                    settings.moduleProperties.audienceManager &&
                    settings.moduleProperties.audienceManager.config &&
                    window &&
                    window._satellite &&
                    window._satellite.company &&
                    window._satellite.company.orgId) {
                    isEnabled = true;
                  }

                  return isEnabled;
                }
              };

              module.exports = settingsHelper;

            }

          },
          "adobe-analytics/src/lib/helpers/augmenters.js": {
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2017 Adobe Systems Incorporated
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

              'use strict';

              module.exports = [];

            }

          },
          "adobe-analytics/src/lib/helpers/applyTrackerVariables.js": {
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2016 Adobe Systems Incorporated
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

              'use strict';

              var queryString = require('@adobe/reactor-query-string');
              var window = require('@adobe/reactor-window');

              var eVarRegExp = /eVar([0-9]+)/;
              var propRegExp = /prop([0-9]+)/;
              var linkTrackVarsKeys = new RegExp('^(eVar[0-9]+)|(prop[0-9]+)|(hier[0-9]+)|campaign|purchaseID|' +
                'channel|server|state|zip|pageType$');

              var onlyUnique = function(value, index, self) {
                return self.indexOf(value) === index;
              };

              var buildLinkTrackVars = function(tracker, newTrackerProperties, addEvents) {
                var linkTrackVarsValues = Object.keys(newTrackerProperties)
                  .filter(linkTrackVarsKeys.test.bind(linkTrackVarsKeys));

                if (addEvents) {
                  linkTrackVarsValues.push('events');
                }

                // Merge with the values already set on tracker.
                linkTrackVarsValues = linkTrackVarsValues.concat((tracker.linkTrackVars || '').split(','));

                return linkTrackVarsValues.filter(function(value, index) {
                  return value !== 'None' && value && onlyUnique(value, index, linkTrackVarsValues);
                }).join(',');
              };

              var buildLinkTrackEvents = function(tracker, eventsData) {
                var linkTrackEventsValues = eventsData.map(function(event) {
                  return event.name;
                });

                // Merge with the values already set on tracker.
                linkTrackEventsValues = linkTrackEventsValues.concat((tracker.linkTrackEvents || '').split(','));

                return linkTrackEventsValues.filter(function(value, index) {
                  return value !== 'None'  && onlyUnique(value, index, linkTrackEventsValues);
                }).join(',');
              };

              var commaJoin = function(store, keyName, trackerProperties) {
                store[keyName] = trackerProperties[keyName].join(',');
              };

              var variablesTransform = function(store, keyName, trackerProperties) {
                var dynamicVariablePrefix = trackerProperties.dynamicVariablePrefix || 'D=';

                trackerProperties[keyName].forEach(function(variableData) {
                  var value;
                  if (variableData.type === 'value') {
                    value = variableData.value;
                  } else {
                    var eVarData = eVarRegExp.exec(variableData.value);

                    if (eVarData) {
                      value = dynamicVariablePrefix + 'v' + eVarData[1];
                    } else {
                      var propData = propRegExp.exec(variableData.value);

                      if (propData) {
                        value = dynamicVariablePrefix + 'c' + propData[1];
                      }
                    }
                  }

                  store[variableData.name] = value;
                });
              };

              var transformers = {
                linkDownloadFileTypes: commaJoin,
                linkExternalFilters: commaJoin,
                linkInternalFilters: commaJoin,
                hierarchies: function(store, keyName, trackerProperties) {
                  trackerProperties[keyName].forEach(function(hierarchyData) {
                    store[hierarchyData.name] = hierarchyData.sections.join(hierarchyData.delimiter);
                  });
                },
                props: variablesTransform,
                eVars: variablesTransform,
                campaign: function(store, keyName, trackerProperties) {
                  if (trackerProperties[keyName].type === 'queryParam') {
                    var queryParams = queryString.parse(window.location.search);
                    store[keyName] = queryParams[trackerProperties[keyName].value];
                  } else {
                    store[keyName] = trackerProperties[keyName].value;
                  }
                },
                events: function(store, keyName, trackerProperties) {
                  var events = trackerProperties[keyName].map(function(data) {
                    var entry = data.name;
                    if (data.id) {
                      entry = [entry, data.id].join(':');
                    }
                    if (data.value) {
                      entry = [entry, data.value].join('=');
                    }
                    return entry;
                  });
                  store[keyName] = events.join(',');
                }
              };

              module.exports = function(tracker, trackerProperties) {
                var newProperties = {};
                trackerProperties = trackerProperties || {};

                Object.keys(trackerProperties).forEach(function(propertyName) {
                  var transform = transformers[propertyName];
                  var value = trackerProperties[propertyName];

                  if (transform) {
                    transform(newProperties, propertyName, trackerProperties);
                  } else {
                    newProperties[propertyName] = value;
                  }
                });

                // New events are added to existing tracker events
                if (newProperties.events) {
                  if (tracker.events && tracker.events.length > 0) {
                    newProperties.events = tracker.events + ',' + newProperties.events;
                  }
                }

                var hasEvents =
                  trackerProperties && trackerProperties.events && trackerProperties.events.length > 0;
                var linkTrackVars = buildLinkTrackVars(tracker, newProperties, hasEvents);
                if (linkTrackVars) {
                  newProperties.linkTrackVars = linkTrackVars;
                }

                var linkTrackEvents = buildLinkTrackEvents(tracker, trackerProperties.events || []);
                if (linkTrackEvents) {
                  newProperties.linkTrackEvents = linkTrackEvents;
                }

                turbine.logger.info(
                  'Applying the following properties on tracker: "' +
                  JSON.stringify(newProperties) +
                  '".'
                );

                Object.keys(newProperties).forEach(function(propertyName) {
                  tracker[propertyName] = newProperties[propertyName];
                });
              };

            }

          },
          "adobe-analytics/src/lib/helpers/loadLibrary.js": {
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2016 Adobe Systems Incorporated
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

              'use strict';

              var loadScript = require('@adobe/reactor-load-script');
              var window = require('@adobe/reactor-window');
              var Promise = require('@adobe/reactor-promise');
              var settingsHelper = require('./settingsHelper');
              var pollHelper = require('./pollHelper');

              var createTracker = function(settings, reportSuites) {
                if (!window.s_gi) {
                  throw new Error(
                    'Unable to create AppMeasurement tracker, `s_gi` function not found.' + window.AppMeasurement
                  );
                }
                turbine.logger.info('Creating AppMeasurement tracker with these report suites: "' +
                  reportSuites + '"');
                var tracker = window.s_gi(reportSuites);
                if (settings.libraryCode.scopeTrackerGlobally) {
                  turbine.logger.info('Setting the tracker as window.s');
                  window.s = tracker;
                }
                return tracker;
              };

              /**
               * @param settings
               *
               * @return array
               */
              var getUrlsToLoad = function(settings) {
                var urls = [];
                switch (settings.libraryCode.type) {
                  case settingsHelper.LIB_TYPES.MANAGED:
                    // load app measurement
                    urls.push(turbine.getHostedLibFileUrl(settingsHelper.MANAGED_LIB_PATHS.APP_MEASUREMENT));
                    // check if activity map should be loaded
                    if (settingsHelper.isActivityMapEnabled(settings)) {
                      urls.push(turbine.getHostedLibFileUrl(settingsHelper.MANAGED_LIB_PATHS.ACTIVITY_MAP));
                    }
                    break;
                  case settingsHelper.LIB_TYPES.CUSTOM:
                    urls.push(settings.libraryCode.source);
                    break;
                  case settingsHelper.LIB_TYPES.REMOTE:
                    urls.push(window.location.protocol === 'https:' ?
                      settings.libraryCode.httpsUrl : settings.libraryCode.httpUrl);
                    break;
                }
                // check if audience management should be loaded
                if (settingsHelper.isAudienceManagementEnabled(settings)) {
                  var visitorServiceConfig = {
                    namespace: window._satellite.company.orgId
                  };
                  settings.moduleProperties.audienceManager.config.visitorService = visitorServiceConfig;
                  urls.push(turbine.getHostedLibFileUrl(settingsHelper.MANAGED_LIB_PATHS.AUDIENCE_MANAGEMENT));
                }
                return urls;
              };

              var loadLibraryScripts = function(settings) {
                return Promise.all(getUrlsToLoad(settings).map(function(url) {
                  turbine.logger.info("Loading script: " + url);
                  return loadScript(url);
                }));
              };

              var setReportSuitesOnTracker = function(settings, tracker) {
                if (settings.libraryCode.accounts) {
                  if (!tracker.sa) {
                    turbine.logger.warn('Cannot set report suites on tracker. `sa` method not available.');
                  } else {
                    var reportSuites = settingsHelper.getReportSuites(settings.libraryCode.accounts);
                    turbine.logger.info('Setting the following report suites on the tracker: "' +
                      reportSuites + '"');
                    tracker.sa(reportSuites);
                  }
                }

                return tracker;
              };

              var getTrackerFromVariable = function(trackerVariableName) {
                if (window[trackerVariableName]) {
                  turbine.logger.info('Found tracker located at: "' + trackerVariableName + '".');
                  return window[trackerVariableName];
                } else {
                  throw new Error('Cannot find the global variable name: "' + trackerVariableName + '".');
                }
              };

// returns a promise that resolves with the tracker
              module.exports = function(settings) {
                // loads all libraries from urls in parallel
                var loadLibraries = loadLibraryScripts(settings);

                // now setup the tracker
                switch (settings.libraryCode.type) {
                  case settingsHelper.LIB_TYPES.MANAGED:
                    var reportSuites = settingsHelper.getReportSuites(settings.libraryCode.accounts);
                    return loadLibraries
                      .then(createTracker.bind(null, settings, reportSuites));

                  case settingsHelper.LIB_TYPES.PREINSTALLED:
                    return loadLibraries
                      .then(pollHelper.poll.bind(null, window, settings.libraryCode.trackerVariableName))
                      .then(setReportSuitesOnTracker.bind(null, settings));

                  case settingsHelper.LIB_TYPES.CUSTOM:
                  case settingsHelper.LIB_TYPES.REMOTE:
                    return loadLibraries
                      .then(getTrackerFromVariable.bind(null, settings.libraryCode.trackerVariableName))
                      .then(setReportSuitesOnTracker.bind(null, settings));

                  default:
                    throw new Error('Cannot load library. Type not supported.');

                }
              };

            }

          },
          "adobe-analytics/src/lib/helpers/generateVersion.js": {
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2016 Adobe Systems Incorporated
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

// The Launch code version is a 4 characters string.  The first character will always be L
// followed by year, month, and day codes.
// For example: JS-1.4.3-L53O = JS 1.4.3 code, Launch 2015 March 24th release (revision 1)
// More info: https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=tagmanager&title=DTM+Analytics+Code+Versions

              'use strict';

              var THIRD_OF_DAY = 8; //hours

              var getDayField = function(date) {
                return date.getUTCDate().toString(36);
              };

              var getLastChar = function(str) {
                return str.substr(str.length - 1);
              };

              var getRevision = function(date) {
                // We are under the assumption that a Turbine version will be release at least 8h apart (max 3
                // releases per day).
                return Math.floor(date.getUTCHours() / THIRD_OF_DAY);
              };

              var getMonthField = function(date) {
                var monthNumber = date.getUTCMonth() + 1;
                var revision = getRevision(date);

                var monthField = (monthNumber + revision * 12).toString(36);

                return getLastChar(monthField);
              };

              var getYearField = function(date) {
                return (date.getUTCFullYear() - 2010).toString(36);
              };

              module.exports = function(dateString) {
                var date = new Date(dateString);

                if (isNaN(date)) {
                  throw new Error('Invalid date provided');
                }

                return ('L' + getYearField(date) + getMonthField(date) + getDayField(date)).toUpperCase();
              };

            }

          },
          "adobe-analytics/src/lib/helpers/pollHelper.js": {
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2020 Adobe Systems Incorporated
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

              'use strict';

              var Promise = require('@adobe/reactor-promise');

              var MAX_ITERATIONS = 40;
              var INTERVAL = 250;

              var found = function(resolve, variableName, result) {
                turbine.logger.info('Found property located at: "' + variableName + '"].');
                resolve(result);
              };

              var getPromise = function(object, variableName) {
                return new Promise(function(resolve, reject) {
                  if (object[variableName]) {
                    return found(resolve, variableName, object[variableName]);
                  }
                  var i = 1;
                  var intervalId = setInterval(function() {
                    if (object[variableName]) {
                      found(resolve, variableName, object[variableName]);
                      clearInterval(intervalId);
                    }
                    // give up after 10 seconds
                    if (i >= MAX_ITERATIONS) {
                      clearInterval(intervalId);
                      reject(new Error(
                        'Bailing out. Cannot find the variable name: "' + variableName + '"].'));
                    }
                    i++;
                  }, INTERVAL); // every 1/4th second
                });
              };

              module.exports = {
                poll: function(object, variableName) {
                  turbine.logger.info('Waiting for the property to become accessible at: "'
                    + variableName + '"].');
                  return getPromise(object, variableName);
                }
              };

            }

          },
          "adobe-analytics/src/lib/helpers/getNodeLinkText.js": {
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2016 Adobe Systems Incorporated
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

              'use strict';

              /**
               * Reduces repeated whitespace within a string. Whitespace surrounding the string
               * is trimmed and any occurrence of whitespace within the string is replaced with
               * a single space.
               * @param {string} str String to be formatted.
               * @returns {string} Formatted string.
               */
              var truncateWhiteSpace = function(str) {
                return str && str.replace(/\s+/g, ' ').trim();
              };

              var unsupportedNodeNames = /^(SCRIPT|STYLE|LINK|CANVAS|NOSCRIPT|#COMMENT)$/i;

              /**
               * Determines if a node qualifies as a supported link text node.
               * @param {*} node Node to determine support for.
               * @returns {boolean}
               */
              var isSupportedTextNode = function(node) {
                if (node && node.nodeName) {
                  if (node.nodeName.match(unsupportedNodeNames)) {
                    return false;
                  }
                }
                return true;
              };

              /**
               * Orders and returns specified node and its child nodes in arrays of supported
               * and unsupported nodes.
               * @param {*} node The node to extract supported and unsupported nodes from.
               * @returns {{supportedNodes: Array, includesUnsupportedNodes: boolean}} Node support object.
               */
              var extractSupportedNodes = function(node) {
                var supportedNodes = [];
                var includesUnsupportedNodes = false;
                if (isSupportedTextNode(node)) {
                  supportedNodes.push(node);
                  if (node.childNodes) {
                    var childNodes = Array.prototype.slice.call(node.childNodes);
                    childNodes.forEach(function(childNode) {
                      var nodes = extractSupportedNodes(childNode);
                      supportedNodes = supportedNodes.concat(nodes.supportedNodes);
                      includesUnsupportedNodes = includesUnsupportedNodes || nodes.includesUnsupportedNodes;
                    });
                  }
                } else {
                  includesUnsupportedNodes = true;
                }
                return {
                  supportedNodes:supportedNodes,
                  includesUnsupportedNodes:includesUnsupportedNodes
                };
              };

              /**
               * Returns the value of a node attribute.
               * @param {*} node The node holding the attribute.
               * @param {string} attributeName The name of the attribute.
               * @param {string} nodeName Optional node name constraint.
               * @returns {string} Attribute value or undefined.
               */
              var getNodeAttributeValue = function(node, attributeName, nodeName) {
                var attributeValue;
                if (!nodeName || nodeName === node.nodeName.toUpperCase()) {
                  attributeValue = node.getAttribute(attributeName);
                }
                return attributeValue;
              };

              /**
               * Extracts a link-name from a given node. This closely mirrors the logic
               * used in ActivityMap to determine link-names.
               *
               * The returned link-name is set to one of the following (in order of priority):
               *
               * 1. Clicked node innerText
               * 2. Clicked node textContent
               * 3. Clicked node and its child nodes nodeValue appended together.
               * 4. Clicked node alt attribute or node descendant alt attribute.
               *    Whichever is found first.
               * 5. Clicked node text attribute or node descendant text attribute.
               *    Whichever is found first.
               * 6. Clicked node INPUT descendant value attribute.
               *    Whichever is found first.
               * 7. Clicked node IMG descendant src attribute.
               *    Whichever is found first.
               *
               * @param {*} node The node to find link text for.
               * @returns {string} link-name or an empty string if not link-name is found.
               */
              module.exports = function(node) {
                var nodeText = truncateWhiteSpace(node.innerText || node.textContent);
                var nodes = extractSupportedNodes(node);
                if (!nodeText || nodes.includesUnsupportedNodes) {
                  var alt;
                  var title;
                  var inputValue;
                  var imgSrc;
                  var texts = [];
                  nodes.supportedNodes.forEach(function(supportedNode) {
                    if (supportedNode.getAttribute) {
                      alt = alt || truncateWhiteSpace(supportedNode.getAttribute('alt'));
                      title = title || truncateWhiteSpace(supportedNode.getAttribute('title'));
                      inputValue = inputValue || truncateWhiteSpace(
                        getNodeAttributeValue(supportedNode, 'value', 'INPUT'));
                      imgSrc = imgSrc || truncateWhiteSpace(
                        getNodeAttributeValue(supportedNode, 'src', 'IMG'));
                    }
                    if (supportedNode.nodeValue) {
                      texts.push(supportedNode.nodeValue);
                    }
                  });
                  nodeText = truncateWhiteSpace(texts.join(''));
                  if (!nodeText) {
                    nodeText = truncateWhiteSpace(alt || title || inputValue || imgSrc || '');
                  }
                }
                return nodeText;
              };

            }

          }
        }
      },
      "adobe-mcid": {
        "displayName": "Experience Cloud ID Service",
        "hostedLibFilesBaseUrl": "https://assets.adobedtm.com/extensions/EPbdfb4b2e3570442dafcd49b858f2288a/",
        "settings": {
          "orgId": "63C70EF1613FCF530A495EE2@AdobeOrg",
          "doesOptInApply": true,
          "isOptInStorageEnabled": false
        },
        "modules": {
          "adobe-mcid/src/lib/dataElements/ecid.js": {
            "name": "ecid",
            "displayName": "ECID",
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2018 Adobe Systems Incorporated
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

              'use strict';

              var mcidInstance = require('../sharedModules/mcidInstance');
              var ecid;

              mcidInstance.onReceiveEcid(function(id) {
                ecid = id;
              });

              module.exports = function() {
                return ecid;
              };

            }

          },
          "adobe-mcid/src/lib/sharedModules/mcidInstance.js": {
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2016 Adobe Systems Incorporated
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

              'use strict';
              var document = require('@adobe/reactor-document');
              var VisitorAPI = require('../codeLibrary/VisitorAPI');
              var timeUnits = require('../../view/utils/timeUnits');

              var transformArrayToObject = function(configs) {
                var initConfig = configs.reduce(function(obj, config) {
                  var value = /^(true|false)$/i.test(config.value) ? JSON.parse(config.value) : config.value;

                  obj[config.name] = value;

                  return obj;
                }, {});

                return initConfig;
              };

              var initializeVisitorId = function(Visitor) {
                var extensionSettings = turbine.getExtensionSettings();
                if (typeof extensionSettings.orgId !== 'string') {
                  throw new TypeError('Org ID is not a string.');
                }

                var initConfig = transformArrayToObject(extensionSettings.variables || []);
                var doesOptInApply = extensionSettings.doesOptInApply;
                if (doesOptInApply) {
                  if (typeof doesOptInApply === 'boolean') {
                    initConfig['doesOptInApply'] = doesOptInApply;
                  } else if (extensionSettings.optInCallback) {
                    initConfig['doesOptInApply'] = extensionSettings.optInCallback;
                  }
                }

                var isOptInStorageEnabled = extensionSettings.isOptInStorageEnabled;
                if (isOptInStorageEnabled) {
                  initConfig['isOptInStorageEnabled'] = isOptInStorageEnabled;
                }

                var optInCookieDomain = extensionSettings.optInCookieDomain;
                if (optInCookieDomain) {
                  initConfig['optInCookieDomain'] = optInCookieDomain;
                }

                var optInStorageExpiry = extensionSettings.optInStorageExpiry;
                if (optInStorageExpiry) {
                  var timeUnit = extensionSettings.timeUnit;
                  if (timeUnit && timeUnits[timeUnit]) {
                    var seconds = optInStorageExpiry * timeUnits[timeUnit];
                    initConfig['optInStorageExpiry'] = seconds;
                  }
                } else if (isOptInStorageEnabled === true) {
                  // default is 13 months
                  initConfig['optInStorageExpiry'] = 13 * 30 * 24 * 3600;
                }

                var previousPermissions = extensionSettings.previousPermissions;
                if (previousPermissions) {
                  initConfig['previousPermissions'] = previousPermissions;
                }

                var preOptInApprovals = extensionSettings.preOptInApprovals;
                if (preOptInApprovals) {
                  initConfig['preOptInApprovals'] = preOptInApprovals;
                } else {
                  var preOptInApprovalInput = extensionSettings.preOptInApprovalInput;
                  if (preOptInApprovalInput) {
                    initConfig['preOptInApprovals'] = preOptInApprovalInput;
                  }
                }

                var isIabContext = extensionSettings.isIabContext;
                if (isIabContext) {
                  initConfig['isIabContext'] = isIabContext;
                }

                var instance = Visitor.getInstance(extensionSettings.orgId, initConfig);

                turbine.logger.info('Created instance using orgId: "' + extensionSettings.orgId + '"');
                turbine.logger.info('Set variables: ' + JSON.stringify(initConfig));

                // getMarketingCloudVisitorID is called automatically when the instance is created, but
                // we call it here so that we can log the ID once it has been retrieved from the server.
                // Calling getMarketingCloudVisitorID multiple times will not result in multiple requests
                // to the server.
                instance.getMarketingCloudVisitorID(function(id) {
                  turbine.logger.info('Obtained Marketing Cloud Visitor Id: ' + id);
                }, true);

                return instance;
              };

              var excludePathsMatched = function(path) {
                var extensionSettings = turbine.getExtensionSettings();
                var pathExclusions = extensionSettings.pathExclusions || [];

                return pathExclusions.some(function(pathExclusion) {
                  if (pathExclusion.valueIsRegex) {
                    return new RegExp(pathExclusion.value, 'i').test(path);
                  } else {
                    return pathExclusion.value === path;
                  }
                });
              };

              var visitorIdInstance = null;

// Overwrite the getVisitorId exposed in Turbine. This is largely for backward compatibility
// since DTM supported this method on _satellite.
              _satellite.getVisitorId = function() { return visitorIdInstance; };

              if (excludePathsMatched(document.location.pathname)) {
                turbine.logger.warn('MCID library not loaded. One of the path exclusions matches the ' +
                  'current path.');
              } else {
                visitorIdInstance = initializeVisitorId(VisitorAPI);
              }

              module.exports = visitorIdInstance;

            }
            ,
            "name": "mcid-instance",
            "shared": true
          },
          "adobe-mcid/src/lib/codeLibrary/VisitorAPI.js": {
            "script": function(module, exports, require, turbine) {
              /* istanbul ignore next */
              module.exports = function() {
                /**
                 * @license
                 * Adobe Visitor API for JavaScript version: 5.4.0
                 * Copyright 2022 Adobe, Inc. All Rights Reserved
                 * More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
                 */
                var e=function(){"use strict";function e(t){"@babel/helpers - typeof";return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(){return{callbacks:{},add:function(e,t){this.callbacks[e]=this.callbacks[e]||[];var n=this.callbacks[e].push(t)-1,i=this;return function(){i.callbacks[e].splice(n,1)}},execute:function(e,t){if(this.callbacks[e]){t=void 0===t?[]:t,t=t instanceof Array?t:[t];try{for(;this.callbacks[e].length;){var n=this.callbacks[e].shift();"function"==typeof n?n.apply(null,t):n instanceof Array&&n[1].apply(n[0],t)}delete this.callbacks[e]}catch(e){}}},executeAll:function(e,t){(t||e&&!U.isObjectEmpty(e))&&Object.keys(this.callbacks).forEach(function(t){var n=void 0!==e[t]?e[t]:"";this.execute(t,n)},this)},hasCallbacks:function(){return Boolean(Object.keys(this.callbacks).length)}}}function i(e,t,n){var i=null==e?void 0:e[t];return void 0===i?n:i}function r(e){for(var t=/^\d+$/,n=0,i=e.length;n<i;n++)if(!t.test(e[n]))return!1;return!0}function a(e,t){for(;e.length<t.length;)e.push("0");for(;t.length<e.length;)t.push("0")}function o(e,t){for(var n=0;n<e.length;n++){var i=parseInt(e[n],10),r=parseInt(t[n],10);if(i>r)return 1;if(r>i)return-1}return 0}function s(e,t){if(e===t)return 0;var n=e.toString().split("."),i=t.toString().split(".");return r(n.concat(i))?(a(n,i),o(n,i)):NaN}function c(e){return e===Object(e)&&0===Object.keys(e).length}function u(e){return"function"==typeof e||e instanceof Array&&e.length}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){return!0};this.log=Ie("log",e,t),this.warn=Ie("warn",e,t),this.error=Ie("error",e,t)}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.cookieName,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.cookies;if(!t||!i)return{get:xe,set:xe,remove:xe};var r={remove:function(){i.remove(t)},get:function(){var e=i.get(t),n={};try{n=JSON.parse(e)}catch(e){n={}}return n},set:function(e,n){n=n||{};var a=r.get(),o=Object.assign(a,e);i.set(t,JSON.stringify(o),{domain:n.optInCookieDomain||"",cookieLifetime:n.optInStorageExpiry||3419e4,expires:!0})}};return r}function f(e){this.name=this.constructor.name,this.message=e,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error(e).stack}function p(){function e(e,t){var n=Ae(e);return n.length?n.every(function(e){return!!t[e]}):Oe(t)}function t(){M(A),O(de.COMPLETE),_(h.status,h.permissions),s&&m.set(h.permissions,{optInCookieDomain:c,optInStorageExpiry:u}),C.execute(He)}function n(e){return function(n,i){if(!Me(n))throw new Error("[OptIn] Invalid category(-ies). Please use the `OptIn.Categories` enum.");return O(de.CHANGED),Object.assign(A,ke(Ae(n),e)),i||t(),h}}var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=i.doesOptInApply,a=i.previousPermissions,o=i.preOptInApprovals,s=i.isOptInStorageEnabled,c=i.optInCookieDomain,u=i.optInStorageExpiry,l=i.isIabContext,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},p=f.cookies,g=Ne(a);Fe(g,"Invalid `previousPermissions`!"),Fe(o,"Invalid `preOptInApprovals`!");var m=d({cookieName:"adobeujs-optin"},{cookies:p}),h=this,_=le(h),C=_e(),S=Le(g),I=Le(o),v=s?m.get():{},D={},y=function(e,t){return Pe(e)||t&&Pe(t)?de.COMPLETE:de.PENDING}(S,v),b=function(e,t,n){var i=ke(he,!r);return r?Object.assign({},i,e,t,n):i}(I,S,v),A=Ee(b),O=function(e){return y=e},M=function(e){return b=e};h.deny=n(!1),h.approve=n(!0),h.denyAll=h.deny.bind(h,he),h.approveAll=h.approve.bind(h,he),h.isApproved=function(t){return e(t,h.permissions)},h.isPreApproved=function(t){return e(t,I)},h.fetchPermissions=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?h.on(de.COMPLETE,e):xe;return!r||r&&h.isComplete||!!o?e(h.permissions):t||C.add(He,function(){return e(h.permissions)}),n},h.complete=function(){h.status===de.CHANGED&&t()},h.registerPlugin=function(e){if(!e||!e.name||"function"!=typeof e.onRegister)throw new Error(Be);D[e.name]||(D[e.name]=e,e.onRegister.call(e,h))},h.execute=Ue(D),h.memoizeContent=function(e){we(e)&&m.set(e,{optInCookieDomain:c,optInStorageExpiry:u})},h.getMemoizedContent=function(e){var t=m.get();if(t)return t[e]},Object.defineProperties(h,{permissions:{get:function(){return b}},status:{get:function(){return y}},Categories:{get:function(){return fe}},doesOptInApply:{get:function(){return!!r}},isPending:{get:function(){return h.status===de.PENDING}},isComplete:{get:function(){return h.status===de.COMPLETE}},__plugins:{get:function(){return Object.keys(D)}},isIabContext:{get:function(){return l}}})}function g(e,t){function n(){r=null,e.call(e,new f("The call took longer than you wanted!"))}function i(){r&&(clearTimeout(r),e.apply(e,arguments))}if(void 0===t)return e;var r=setTimeout(n,t);return i}function m(){if(window.__tcfapi)return window.__tcfapi;var e=window;if(e===window.top)return void ye.error("__tcfapi not found");for(var t;!t;){e=e.parent;try{e.frames.__tcfapiLocator&&(t=e)}catch(e){}if(e===window.top)break}if(!t)return void ye.error("__tcfapi not found");var n={};return window.__tcfapi=function(e,i,r,a){var o=Math.random()+"",s={__tcfapiCall:{command:e,parameter:a,version:i,callId:o}};n[o]=r,t.postMessage(s,"*")},window.addEventListener("message",function(e){var t=e.data;if("string"==typeof t)try{t=JSON.parse(e.data)}catch(e){}if(t.__tcfapiReturn){var i=t.__tcfapiReturn;"function"==typeof n[i.callId]&&(n[i.callId](i.returnValue,i.success),delete n[i.callId])}},!1),window.__tcfapi}function h(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=!0===e.vendor.consents[t],r=n.every(function(t){return!0===e.purpose.consents[t]});return i&&r}function _(){var e=this;e.name="iabPlugin",e.version="0.0.2";var t,n=_e(),i={transparencyAndConsentData:null},r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return i[e]=t};e.fetchConsentData=function(e){var t=e.callback,n=e.timeout,i=g(t,n);a({callback:i})},e.isApproved=function(e){var t=e.callback,n=e.category,r=e.timeout;if(i.transparencyAndConsentData)return t(null,h(i.transparencyAndConsentData,pe[n],ge[n]));var o=g(function(e,i){t(e,h(i,pe[n],ge[n]))},r);a({category:n,callback:o})},e.onRegister=function(n){t=n;var i=Object.keys(pe),r=function(e,t){!e&&t&&(i.forEach(function(e){var i=h(t,pe[e],ge[e]);n[i?"approve":"deny"](e,!0)}),n.complete())};e.fetchConsentData({callback:r})};var a=function(e){var a=e.callback;if(i.transparencyAndConsentData)return a(null,i.transparencyAndConsentData);n.add("FETCH_CONSENT_DATA",a),o(function(e,a){if(a){var o=Ee(e),s=t.getMemoizedContent("iabConsentHash"),c=De(o.tcString).toString(32);o.consentString=e.tcString,o.hasConsentChangedSinceLastCmpPull=s!==c,r("transparencyAndConsentData",o),t.memoizeContent({iabConsentHash:c})}n.execute("FETCH_CONSENT_DATA",[null,i.transparencyAndConsentData])})},o=function(e){var t=Ve(pe),n=m();"function"==typeof n&&n("getTCData",2,e,t)}}var C="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};Object.assign=Object.assign||function(e){for(var t,n,i=1;i<arguments.length;++i){n=arguments[i];for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e};var S,I,v={HANDSHAKE:"HANDSHAKE",GETSTATE:"GETSTATE",PARENTSTATE:"PARENTSTATE"},D={MCMID:"MCMID",MCAID:"MCAID",MCAAMB:"MCAAMB",MCAAMLH:"MCAAMLH",MCOPTOUT:"MCOPTOUT",CUSTOMERIDS:"CUSTOMERIDS"},y={MCMID:"getMarketingCloudVisitorID",MCAID:"getAnalyticsVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"isOptedOut",ALLFIELDS:"getVisitorValues"},b={CUSTOMERIDS:"getCustomerIDs"},A={MCMID:"getMarketingCloudVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"isOptedOut",MCAID:"getAnalyticsVisitorID",CUSTOMERIDS:"getCustomerIDs",ALLFIELDS:"getVisitorValues"},O={MC:"MCMID",A:"MCAID",AAM:"MCAAMB"},M={MCMID:"MCMID",MCOPTOUT:"MCOPTOUT",MCAID:"MCAID",MCAAMLH:"MCAAMLH",MCAAMB:"MCAAMB"},k={UNKNOWN:0,AUTHENTICATED:1,LOGGED_OUT:2},E={GLOBAL:"global"},T={LAX:"Lax",STRICT:"Strict",NONE:"None"},L={MESSAGES:v,STATE_KEYS_MAP:D,ASYNC_API_MAP:y,SYNC_API_MAP:b,ALL_APIS:A,FIELDGROUP_TO_FIELD:O,FIELDS:M,AUTH_STATE:k,OPT_OUT:E,SAME_SITE_VALUES:T},P=L.STATE_KEYS_MAP,R=function(e){function t(){}function n(t,n){var i=this;return function(){var r=e(0,t),a={};return a[t]=r,i.setStateAndPublish(a),n(r),r}}this.getMarketingCloudVisitorID=function(e){e=e||t;var i=this.findField(P.MCMID,e),r=n.call(this,P.MCMID,e);return void 0!==i?i:r()},this.getVisitorValues=function(e){this.getMarketingCloudVisitorID(function(t){e({MCMID:t})})}},w=L.MESSAGES,x=L.ASYNC_API_MAP,N=L.SYNC_API_MAP,F=function(){function e(){}function t(e,t){var n=this;return function(){return n.callbackRegistry.add(e,t),n.messageParent(w.GETSTATE),""}}function n(n){this[x[n]]=function(i){i=i||e;var r=this.findField(n,i),a=t.call(this,n,i);return void 0!==r?r:a()}}function i(t){this[N[t]]=function(){return this.findField(t,e)||{}}}Object.keys(x).forEach(n,this),Object.keys(N).forEach(i,this)},j=L.ASYNC_API_MAP,V=function(){Object.keys(j).forEach(function(e){this[j[e]]=function(t){this.callbackRegistry.add(e,t)}},this)},U=function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(t,n){n.isObjectEmpty=function(e){return e===Object(e)&&0===Object.keys(e).length},n.isValueEmpty=function(e){return""===e||n.isObjectEmpty(e)};var i=function(){var e=navigator.appName,t=navigator.userAgent;return"Microsoft Internet Explorer"===e||t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0&&t.indexOf("Windows NT 6")>=0};n.getIeVersion=function(){return document.documentMode?document.documentMode:i()?7:null},n.isFirefox=function(e){return!!/Firefox\/([0-9\.]+)(?:\s|$)/.test(e||window.navigator.userAgent)},n.encodeAndBuildRequest=function(e,t){return e.map(encodeURIComponent).join(t)},n.isObject=function(t){return null!==t&&"object"===e(t)&&!1===Array.isArray(t)},n.defineGlobalNamespace=function(){return window.adobe=n.isObject(window.adobe)?window.adobe:{},window.adobe},n.pluck=function(e,t){return t.reduce(function(t,n){return e[n]&&(t[n]=e[n]),t},Object.create(null))},n.parseOptOut=function(e,t,n){t||(t=n,e.d_optout&&e.d_optout instanceof Array&&(t=e.d_optout.join(",")));var i=parseInt(e.d_ottl,10);return isNaN(i)&&(i=7200),{optOut:t,d_ottl:i}},n.normalizeBoolean=function(e){var t=e;return"true"===e?t=!0:"false"===e&&(t=!1),t}}),H=(U.isObjectEmpty,U.isValueEmpty,U.getIeVersion,U.isFirefox,U.encodeAndBuildRequest,U.isObject,U.defineGlobalNamespace,U.pluck,U.parseOptOut,U.normalizeBoolean,n),B=L.MESSAGES,G={0:"prefix",1:"orgID",2:"state"},Y=function(e,t){this.parse=function(e){try{var t={};return e.data.split("|").forEach(function(e,n){if(void 0!==e){t[G[n]]=2!==n?e:JSON.parse(e)}}),t}catch(e){}},this.isInvalid=function(n){var i=this.parse(n);if(!i||Object.keys(i).length<2)return!0;var r=e!==i.orgID,a=!t||n.origin!==t,o=-1===Object.keys(B).indexOf(i.prefix);return r||a||o},this.send=function(n,i,r){var a=i+"|"+e;r&&r===Object(r)&&(a+="|"+JSON.stringify(r));try{n.postMessage(a,t)}catch(e){}}},q=L.MESSAGES,W=function(e,t,n,i){function r(e){Object.assign(p,e)}function a(e){Object.assign(p.state,e),Object.assign(p.state.ALLFIELDS,e),p.callbackRegistry.executeAll(p.state)}function o(e){if(!h.isInvalid(e)){m=!1;var t=h.parse(e);p.setStateAndPublish(t.state)}}function s(e){!m&&g&&(m=!0,h.send(i,e))}function c(){r(new R(n._generateID)),p.getMarketingCloudVisitorID(),p.callbackRegistry.executeAll(p.state,!0),C.removeEventListener("message",u)}function u(e){if(!h.isInvalid(e)){var t=h.parse(e);m=!1,C.clearTimeout(p._handshakeTimeout),C.removeEventListener("message",u),r(new F(p)),C.addEventListener("message",o),p.setStateAndPublish(t.state),p.callbackRegistry.hasCallbacks()&&s(q.GETSTATE)}}function l(){g&&postMessage?(C.addEventListener("message",u),s(q.HANDSHAKE),p._handshakeTimeout=setTimeout(c,250)):c()}function d(){C.s_c_in||(C.s_c_il=[],C.s_c_in=0),p._c="Visitor",p._il=C.s_c_il,p._in=C.s_c_in,p._il[p._in]=p,C.s_c_in++}function f(){function e(e){0!==e.indexOf("_")&&"function"==typeof n[e]&&(p[e]=function(){})}Object.keys(n).forEach(e),p.getSupplementalDataID=n.getSupplementalDataID,p.isAllowed=function(){return!0}}var p=this,g=t.whitelistParentDomain;p.state={ALLFIELDS:{}},p.version=n.version,p.marketingCloudOrgID=e,p.cookieDomain=n.cookieDomain||"",p._instanceType="child";var m=!1,h=new Y(e,g);p.callbackRegistry=H(),p.init=function(){d(),f(),r(new V(p)),l()},p.findField=function(e,t){if(void 0!==p.state[e])return t(p.state[e]),p.state[e]},p.messageParent=s,p.setStateAndPublish=a},X=L.MESSAGES,K=L.ALL_APIS,J=L.ASYNC_API_MAP,z=L.FIELDGROUP_TO_FIELD,Q=function(e,t){function n(){var t={};return Object.keys(K).forEach(function(n){var i=K[n],r=e[i]();U.isValueEmpty(r)||(t[n]=r)}),t}function i(){var t=[];return e._loading&&Object.keys(e._loading).forEach(function(n){if(e._loading[n]){var i=z[n];t.push(i)}}),t.length?t:null}function r(t){return function n(r){var a=i();if(a){var o=J[a[0]];e[o](n,!0)}else t()}}function a(e,i){var r=n();t.send(e,i,r)}function o(e){c(e),a(e,X.HANDSHAKE)}function s(e){r(function(){a(e,X.PARENTSTATE)})()}function c(n){function i(i){r.call(e,i),t.send(n,X.PARENTSTATE,{CUSTOMERIDS:e.getCustomerIDs()})}var r=e.setCustomerIDs;e.setCustomerIDs=i}return function(e){if(!t.isInvalid(e)){(t.parse(e).prefix===X.HANDSHAKE?o:s)(e.source)}}},$=function(e,t){function n(e){return function(n){i[e]=n,r++,r===a&&t(i)}}var i={},r=0,a=Object.keys(e).length;Object.keys(e).forEach(function(t){var i=e[t];if(i.fn){var r=i.args||[];r.unshift(n(t)),i.fn.apply(i.context||null,r)}})},Z={get:function(e){e=encodeURIComponent(e);var t=(";"+document.cookie).split(" ").join(";"),n=t.indexOf(";"+e+"="),i=n<0?n:t.indexOf(";",n+1);return n<0?"":decodeURIComponent(t.substring(n+2+e.length,i<0?t.length:i))},set:function(e,t,n){var r=i(n,"cookieLifetime"),a=i(n,"expires"),o=i(n,"domain"),s=i(n,"secure"),c=i(n,"sameSite"),u=s?"Secure":"",l=c?"SameSite="+c+";":"";if(a&&"SESSION"!==r&&"NONE"!==r){var d=""!==t?parseInt(r||0,10):-60;if(d)a=new Date,a.setTime(a.getTime()+1e3*d);else if(1===a){a=new Date;var f=a.getYear();a.setYear(f+2+(f<1900?1900:0))}}else a=0;return e&&"NONE"!==r?(document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+"; path=/;"+(a?" expires="+a.toGMTString()+";":"")+(o?" domain="+o+";":"")+l+u,this.get(e)===t):0},remove:function(e,t){var n=i(t,"domain");n=n?" domain="+n+";":"";var r=i(t,"secure"),a=i(t,"sameSite"),o=r?"Secure":"",s=a?"SameSite="+a+";":"";document.cookie=encodeURIComponent(e)+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"+n+s+o}},ee=function(e,t){var n;!e&&C.location&&(e=C.location.hostname),n=e;var i,r=n.split("."),a=t||{};for(i=r.length-2;i>=0;i--)if(a.domain=r.slice(i).join("."),Z.set("TEST_AMCV_COOKIE_WRITE","cookie",a))return Z.remove("TEST_AMCV_COOKIE_WRITE",a),a.domain;return""},te={compare:s,isLessThan:function(e,t){return s(e,t)<0},areVersionsDifferent:function(e,t){return 0!==s(e,t)},isGreaterThan:function(e,t){return s(e,t)>0},isEqual:function(e,t){return 0===s(e,t)}},ne=!!C.postMessage,ie={postMessage:function(e,t,n){var i=1;t&&(ne?n.postMessage(e,t.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):t&&(n.location=t.replace(/#.*$/,"")+"#"+ +new Date+i+++"&"+e))},receiveMessage:function(e,t){var n;try{ne&&(e&&(n=function(n){if("string"==typeof t&&n.origin!==t||"[object Function]"===Object.prototype.toString.call(t)&&!1===t(n.origin))return!1;e(n)}),C.addEventListener?C[e?"addEventListener":"removeEventListener"]("message",n):C[e?"attachEvent":"detachEvent"]("onmessage",n))}catch(e){}}},re=function(e){var t,n,i="0123456789",r="",a="",o=8,s=10,c=10,u=""+Date.now(),l=u.substr(-6).split("").reverse("").join("");if(1==e){for(i+="ABCDEF",t=0;16>t;t++)n=Math.floor(Math.random()*o),4>t&&l[t]<o&&(n=+l[t]),r+=i.substring(n,n+1),n=Math.floor(Math.random()*o),a+=i.substring(n,n+1),o=16;return r+"-"+a}for(t=0;19>t;t++)n=Math.floor(Math.random()*s),6>t&&l[t]<s?(r+=l[t],n=l[t]):r+=i.substring(n,n+1),0===t&&9==n?s=3:(1==t||2==t)&&10!=s&&2>n?s=10:2<t&&(s=10),n=Math.floor(Math.random()*c),a+=i.substring(n,n+1),0===t&&9==n?c=3:(1==t||2==t)&&10!=c&&2>n?c=10:2<t&&(c=10);return r+a},ae=function(e,t){return{corsMetadata:function(){var e="none",t=!0;return"undefined"!=typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?e="XMLHttpRequest":"undefined"!=typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(t=!1),Object.prototype.toString.call(C.HTMLElement).indexOf("Constructor")>0&&(t=!1)),{corsType:e,corsCookiesEnabled:t}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new C[this.corsMetadata.corsType]},fireCORS:function(t,n,i){function r(e){var n;try{if((n=JSON.parse(e))!==Object(n))return void a.handleCORSError(t,null,"Response is not JSON")}catch(e){return void a.handleCORSError(t,e,"Error parsing response as JSON")}try{for(var i=t.callback,r=C,o=0;o<i.length;o++)r=r[i[o]];r(n)}catch(e){a.handleCORSError(t,e,"Error forming callback function")}}var a=this;n&&(t.loadErrorHandler=n);try{var o=this.getCORSInstance();o.open("get",t.corsUrl+"&ts="+(new Date).getTime(),!0),"XMLHttpRequest"===this.corsMetadata.corsType&&(o.withCredentials=!0,o.timeout=e.loadTimeout,o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.onreadystatechange=function(){4===this.readyState&&200===this.status&&r(this.responseText)}),o.onerror=function(e){a.handleCORSError(t,e,"onerror")},o.ontimeout=function(e){a.handleCORSError(t,e,"ontimeout")},o.send(),e._log.requests.push(t.corsUrl)}catch(e){this.handleCORSError(t,e,"try-catch")}},handleCORSError:function(t,n,i){e.CORSErrors.push({corsData:t,error:n,description:i}),t.loadErrorHandler&&("ontimeout"===i?t.loadErrorHandler(!0):t.loadErrorHandler(!1))}}},oe={POST_MESSAGE_ENABLED:!!C.postMessage,DAYS_BETWEEN_SYNC_ID_CALLS:1,MILLIS_PER_DAY:864e5,ADOBE_MC:"adobe_mc",ADOBE_MC_SDID:"adobe_mc_sdid",VALID_VISITOR_ID_REGEX:/^[0-9a-fA-F\-]+$/,ADOBE_MC_TTL_IN_MIN:5,VERSION_REGEX:/vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/,FIRST_PARTY_SERVER_COOKIE:"s_ecid"},se=function(e,t){var n=C.document;return{THROTTLE_START:3e4,MAX_SYNCS_LENGTH:649,throttleTimerSet:!1,id:null,onPagePixels:[],iframeHost:null,getIframeHost:function(e){if("string"==typeof e){var t=e.split("/");return t[0]+"//"+t[2]}},subdomain:null,url:null,getUrl:function(){var t,i="http://fast.",r="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(n.location.origin);return this.subdomain||(this.subdomain="nosubdomainreturned"),e.loadSSL&&(i=e.idSyncSSLUseAkamai?"https://fast.":"https://"),t=i+this.subdomain+".demdex.net/dest5.html"+r,this.iframeHost=this.getIframeHost(t),this.id="destination_publishing_iframe_"+this.subdomain+"_"+e.idSyncContainerID,t},checkDPIframeSrc:function(){var t="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(n.location.href);"string"==typeof e.dpIframeSrc&&e.dpIframeSrc.length&&(this.id="destination_publishing_iframe_"+(e._subdomain||this.subdomain||(new Date).getTime())+"_"+e.idSyncContainerID,this.iframeHost=this.getIframeHost(e.dpIframeSrc),this.url=e.dpIframeSrc+t)},idCallNotProcesssed:null,doAttachIframe:!1,startedAttachingIframe:!1,iframeHasLoaded:null,iframeIdChanged:null,newIframeCreated:null,originalIframeHasLoadedAlready:null,iframeLoadedCallbacks:[],regionChanged:!1,timesRegionChanged:0,sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],messageSendingInterval:oe.POST_MESSAGE_ENABLED?null:100,onPageDestinationsFired:[],jsonForComparison:[],jsonDuplicates:[],jsonWaiting:[],jsonProcessed:[],canSetThirdPartyCookies:!0,receivedThirdPartyCookiesNotification:!1,readyToAttachIframePreliminary:function(){return!(e.idSyncDisableSyncs||e.disableIdSyncs||e.idSyncDisable3rdPartySyncing||e.disableThirdPartyCookies||e.disableThirdPartyCalls)},readyToAttachIframe:function(){return this.readyToAttachIframePreliminary()&&(this.doAttachIframe||e._doAttachIframe)&&(this.subdomain&&"nosubdomainreturned"!==this.subdomain||e._subdomain)&&this.url&&!this.startedAttachingIframe},attachIframe:function(){function e(){r=n.createElement("iframe"),r.sandbox="allow-scripts allow-same-origin",r.title="Adobe ID Syncing iFrame",r.id=i.id,r.name=i.id+"_name",r.style.cssText="display: none; width: 0; height: 0;",r.src=i.url,i.newIframeCreated=!0,t(),n.body.appendChild(r)}function t(e){r.addEventListener("load",function(){r.className="aamIframeLoaded",i.iframeHasLoaded=!0,i.fireIframeLoadedCallbacks(e),i.requestToProcess()})}this.startedAttachingIframe=!0;var i=this,r=n.getElementById(this.id);r?"IFRAME"!==r.nodeName?(this.id+="_2",this.iframeIdChanged=!0,e()):(this.newIframeCreated=!1,"aamIframeLoaded"!==r.className?(this.originalIframeHasLoadedAlready=!1,t("The destination publishing iframe already exists from a different library, but hadn't loaded yet.")):(this.originalIframeHasLoadedAlready=!0,this.iframeHasLoaded=!0,this.iframe=r,this.fireIframeLoadedCallbacks("The destination publishing iframe already exists from a different library, and had loaded alresady."),this.requestToProcess())):e(),this.iframe=r},fireIframeLoadedCallbacks:function(e){this.iframeLoadedCallbacks.forEach(function(t){"function"==typeof t&&t({message:e||"The destination publishing iframe was attached and loaded successfully."})}),this.iframeLoadedCallbacks=[]},requestToProcess:function(t){function n(){r.jsonForComparison.push(t),r.jsonWaiting.push(t),r.processSyncOnPage(t)}var i,r=this;if(t===Object(t)&&t.ibs)if(i=JSON.stringify(t.ibs||[]),this.jsonForComparison.length){var a,o,s,c=!1;for(a=0,o=this.jsonForComparison.length;a<o;a++)if(s=this.jsonForComparison[a],i===JSON.stringify(s.ibs||[])){c=!0;break}c?this.jsonDuplicates.push(t):n()}else n();if((this.receivedThirdPartyCookiesNotification||!oe.POST_MESSAGE_ENABLED||this.iframeHasLoaded)&&this.jsonWaiting.length){var u=this.jsonWaiting.shift();this.process(u),this.requestToProcess()}e.idSyncDisableSyncs||e.disableIdSyncs||!this.iframeHasLoaded||!this.messages.length||this.sendingMessages||(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){r.messageSendingInterval=oe.POST_MESSAGE_ENABLED?null:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},getRegionAndCheckIfChanged:function(t,n){var i=e._getField("MCAAMLH"),r=t.d_region||t.dcs_region;return i?r&&(e._setFieldExpire("MCAAMLH",n),e._setField("MCAAMLH",r),parseInt(i,10)!==r&&(this.regionChanged=!0,this.timesRegionChanged++,e._setField("MCSYNCSOP",""),e._setField("MCSYNCS",""),i=r)):(i=r)&&(e._setFieldExpire("MCAAMLH",n),e._setField("MCAAMLH",i)),i||(i=""),i},processSyncOnPage:function(e){var t,n,i,r;if((t=e.ibs)&&t instanceof Array&&(n=t.length))for(i=0;i<n;i++)r=t[i],r.syncOnPage&&this.checkFirstPartyCookie(r,"","syncOnPage")},process:function(e){var t,n,i,r,a,o=encodeURIComponent,s=!1;if((t=e.ibs)&&t instanceof Array&&(n=t.length))for(s=!0,i=0;i<n;i++)r=t[i],a=[o("ibs"),o(r.id||""),o(r.tag||""),U.encodeAndBuildRequest(r.url||[],","),o(r.ttl||""),"","",r.fireURLSync?"true":"false"],r.syncOnPage||(this.canSetThirdPartyCookies?this.addMessage(a.join("|")):r.fireURLSync&&this.checkFirstPartyCookie(r,a.join("|")));s&&this.jsonProcessed.push(e)},checkFirstPartyCookie:function(t,n,i){var r="syncOnPage"===i,a=r?"MCSYNCSOP":"MCSYNCS";e._readVisitor();var o,s,c=e._getField(a),u=!1,l=!1,d=Math.ceil((new Date).getTime()/oe.MILLIS_PER_DAY);c?(o=c.split("*"),s=this.pruneSyncData(o,t.id,d),u=s.dataPresent,l=s.dataValid,u&&l||this.fireSync(r,t,n,o,a,d)):(o=[],this.fireSync(r,t,n,o,a,d))},pruneSyncData:function(e,t,n){var i,r,a,o=!1,s=!1;for(r=0;r<e.length;r++)i=e[r],a=parseInt(i.split("-")[1],10),i.match("^"+t+"-")?(o=!0,n<a?s=!0:(e.splice(r,1),r--)):n>=a&&(e.splice(r,1),r--);return{dataPresent:o,dataValid:s}},manageSyncsSize:function(e){if(e.join("*").length>this.MAX_SYNCS_LENGTH)for(e.sort(function(e,t){return parseInt(e.split("-")[1],10)-parseInt(t.split("-")[1],10)});e.join("*").length>this.MAX_SYNCS_LENGTH;)e.shift()},fireSync:function(t,n,i,r,a,o){var s=this;if(t){if("img"===n.tag){var c,u,l,d,f=n.url,p=e.loadSSL?"https:":"http:";for(c=0,u=f.length;c<u;c++){l=f[c],d=/^\/\//.test(l);var g=new Image;g.addEventListener("load",function(t,n,i,r){return function(){s.onPagePixels[t]=null,e._readVisitor();var o,c=e._getField(a),u=[];if(c){o=c.split("*");var l,d,f;for(l=0,d=o.length;l<d;l++)f=o[l],f.match("^"+n.id+"-")||u.push(f)}s.setSyncTrackingData(u,n,i,r)}}(this.onPagePixels.length,n,a,o)),g.src=(d?p:"")+l,this.onPagePixels.push(g)}}}else this.addMessage(i),this.setSyncTrackingData(r,n,a,o)},addMessage:function(t){var n=encodeURIComponent,i=n(e._enableErrorReporting?"---destpub-debug---":"---destpub---");this.messages.push((oe.POST_MESSAGE_ENABLED?"":i)+t)},setSyncTrackingData:function(t,n,i,r){t.push(n.id+"-"+(r+Math.ceil(n.ttl/60/24))),this.manageSyncsSize(t),e._setField(i,t.join("*"))},sendMessages:function(){var e,t=this,n="",i=encodeURIComponent;this.regionChanged&&(n=i("---destpub-clear-dextp---"),this.regionChanged=!1),this.messages.length?oe.POST_MESSAGE_ENABLED?(e=n+i("---destpub-combined---")+this.messages.join("%01"),this.postMessage(e),this.messages=[],this.sendingMessages=!1):(e=this.messages.shift(),this.postMessage(n+e),setTimeout(function(){t.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1},postMessage:function(e){ie.postMessage(e,this.url,this.iframe.contentWindow),this.messagesPosted.push(e)},receiveMessage:function(e){var t,n=/^---destpub-to-parent---/;"string"==typeof e&&n.test(e)&&(t=e.replace(n,"").split("|"),"canSetThirdPartyCookies"===t[0]&&(this.canSetThirdPartyCookies="true"===t[1],this.receivedThirdPartyCookiesNotification=!0,this.requestToProcess()),this.messagesReceived.push(e))},processIDCallData:function(i){(null==this.url||i.subdomain&&"nosubdomainreturned"===this.subdomain)&&("string"==typeof e._subdomain&&e._subdomain.length?this.subdomain=e._subdomain:this.subdomain=i.subdomain||"",this.url=this.getUrl()),i.ibs instanceof Array&&i.ibs.length&&(this.doAttachIframe=!0),this.readyToAttachIframe()&&(e.idSyncAttachIframeOnWindowLoad?(t.windowLoaded||"complete"===n.readyState||"loaded"===n.readyState)&&this.attachIframe():this.attachIframeASAP()),"function"==typeof e.idSyncIDCallResult?e.idSyncIDCallResult(i):this.requestToProcess(i),"function"==typeof e.idSyncAfterIDCallResult&&e.idSyncAfterIDCallResult(i)},canMakeSyncIDCall:function(t,n){return e._forceSyncIDCall||!t||n-t>oe.DAYS_BETWEEN_SYNC_ID_CALLS},attachIframeASAP:function(){function e(){t.startedAttachingIframe||(n.body?t.attachIframe():setTimeout(e,30))}var t=this;e()}}},ce={audienceManagerServer:{},audienceManagerServerSecure:{},cookieDomain:{},cookieLifetime:{},cookieName:{},doesOptInApply:{type:"boolean"},disableThirdPartyCalls:{type:"boolean"},discardTrackingServerECID:{type:"boolean"},idSyncAfterIDCallResult:{},idSyncAttachIframeOnWindowLoad:{type:"boolean"},idSyncContainerID:{},idSyncDisable3rdPartySyncing:{type:"boolean"},disableThirdPartyCookies:{type:"boolean"},idSyncDisableSyncs:{type:"boolean"},disableIdSyncs:{type:"boolean"},idSyncIDCallResult:{},idSyncSSLUseAkamai:{type:"boolean"},isCoopSafe:{type:"boolean"},isIabContext:{type:"boolean"},isOptInStorageEnabled:{type:"boolean"},loadSSL:{type:"boolean"},loadTimeout:{},marketingCloudServer:{},marketingCloudServerSecure:{},optInCookieDomain:{},optInStorageExpiry:{},overwriteCrossDomainMCIDAndAID:{type:"boolean"},preOptInApprovals:{},previousPermissions:{},resetBeforeVersion:{},sdidParamExpiry:{},serverState:{},sessionCookieName:{},secureCookie:{type:"boolean"},sameSiteCookie:{},takeTimeoutMetrics:{},trackingServer:{},trackingServerSecure:{},useLocalStorage:{type:"boolean"},whitelistIframeDomains:{},whitelistParentDomain:{}},ue={getConfigNames:function(){return Object.keys(ce)},getConfigs:function(){return ce},normalizeConfig:function(e,t){return ce[e]&&"boolean"===ce[e].type?"function"!=typeof t?t:t():t}},le=function(e){var t={};return e.on=function(e,n,i){if(!n||"function"!=typeof n)throw new Error("[ON] Callback should be a function.");t.hasOwnProperty(e)||(t[e]=[]);var r=t[e].push({callback:n,context:i})-1;return function(){t[e].splice(r,1),t[e].length||delete t[e]}},e.off=function(e,n){t.hasOwnProperty(e)&&(t[e]=t[e].filter(function(e){if(e.callback!==n)return e}))},e.publish=function(e){if(t.hasOwnProperty(e)){var n=[].slice.call(arguments,1);t[e].slice(0).forEach(function(e){e.callback.apply(e.context,n)})}},e.publish},de={PENDING:"pending",CHANGED:"changed",COMPLETE:"complete"},fe={AAM:"aam",ADCLOUD:"adcloud",ANALYTICS:"aa",CAMPAIGN:"campaign",ECID:"ecid",LIVEFYRE:"livefyre",TARGET:"target",MEDIA_ANALYTICS:"mediaaa"},pe=(S={},t(S,fe.AAM,565),t(S,fe.ECID,565),S),ge=(I={},t(I,fe.AAM,[1,10]),t(I,fe.ECID,[1,10]),I),me=["videoaa","iabConsentHash"],he=function(e){return Object.keys(e).map(function(t){return e[t]})}(fe),_e=function(){var e={};return e.callbacks=Object.create(null),e.add=function(t,n){if(!u(n))throw new Error("[callbackRegistryFactory] Make sure callback is a function or an array of functions.");e.callbacks[t]=e.callbacks[t]||[];var i=e.callbacks[t].push(n)-1;return function(){e.callbacks[t].splice(i,1)}},e.execute=function(t,n){if(e.callbacks[t]){n=void 0===n?[]:n,n=n instanceof Array?n:[n];try{for(;e.callbacks[t].length;){var i=e.callbacks[t].shift();"function"==typeof i?i.apply(null,n):i instanceof Array&&i[1].apply(i[0],n)}delete e.callbacks[t]}catch(e){}}},e.executeAll=function(t,n){(n||t&&!c(t))&&Object.keys(e.callbacks).forEach(function(n){var i=void 0!==t[n]?t[n]:"";e.execute(n,i)},e)},e.hasCallbacks=function(){return Boolean(Object.keys(e.callbacks).length)},e},Ce=function(){},Se=function(e){var t=window,n=t.console;return!!n&&"function"==typeof n[e]},Ie=function(e,t,n){return n()?function(){if(Se(e)){for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];console[e].apply(console,[t].concat(i))}}:Ce},ve=l,De=function(){for(var e=[],t=0;t<256;t++){for(var n=t,i=0;i<8;i++)n=1&n?3988292384^n>>>1:n>>>1;e.push(n)}return function(t,n){t=unescape(encodeURIComponent(t)),n||(n=0),n^=-1;for(var i=0;i<t.length;i++){var r=255&(n^t.charCodeAt(i));n=n>>>8^e[r]}return(n^=-1)>>>0}}(),ye=new ve("[ADOBE OPT-IN]"),be=function(t,n){return e(t)===n},Ae=function(e,t){return e instanceof Array?e:be(e,"string")?[e]:t||[]},Oe=function(e){var t=Object.keys(e);return!!t.length&&t.every(function(t){return!0===e[t]})},Me=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return!(!e||Te(e))&&Ae(e).every(function(e){return he.indexOf(e)>-1||t&&me.indexOf(e)>-1})},ke=function(e,t){return e.reduce(function(e,n){return e[n]=t,e},{})},Ee=function(e){return JSON.parse(JSON.stringify(e))},Te=function(e){return"[object Array]"===Object.prototype.toString.call(e)&&!e.length},Le=function(e){if(we(e))return e;try{return JSON.parse(e)}catch(e){return{}}},Pe=function(e){return void 0===e||(we(e)?Me(Object.keys(e),!0):Re(e))},Re=function(e){try{var t=JSON.parse(e);return!!e&&be(e,"string")&&Me(Object.keys(t),!0)}catch(e){return!1}},we=function(e){return null!==e&&be(e,"object")&&!1===Array.isArray(e)},xe=function(){},Ne=function(e){return be(e,"function")?e():e},Fe=function(e,t){Pe(e)||ye.error("".concat(t))},je=function(e){return Object.keys(e).map(function(t){return e[t]})},Ve=function(e){return je(e).filter(function(e,t,n){return n.indexOf(e)===t})},Ue=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.command,i=t.params,r=void 0===i?{}:i,a=t.callback,o=void 0===a?xe:a;if(!n||-1===n.indexOf("."))throw new Error("[OptIn.execute] Please provide a valid command.");try{
                  var s=n.split("."),c=e[s[0]],u=s[1];if(!c||"function"!=typeof c[u])throw new Error("Make sure the plugin and API name exist.");var l=Object.assign(r,{callback:o});c[u].call(c,l)}catch(e){ye.error("[execute] Something went wrong: "+e.message)}}};f.prototype=Object.create(Error.prototype),f.prototype.constructor=f;var He="fetchPermissions",Be="[OptIn#registerPlugin] Plugin is invalid.";p.Categories=fe,p.TimeoutError=f;var Ge=Object.freeze({OptIn:p,IabPlugin:_}),Ye=function(e,t){e.publishDestinations=function(n){var i=arguments[1],r=arguments[2];try{r="function"==typeof r?r:n.callback}catch(e){r=function(){}}var a=t;if(!a.readyToAttachIframePreliminary())return void r({error:"The destination publishing iframe is disabled in the Visitor library."});if("string"==typeof n){if(!n.length)return void r({error:"subdomain is not a populated string."});if(!(i instanceof Array&&i.length))return void r({error:"messages is not a populated array."});var o=!1;if(i.forEach(function(e){"string"==typeof e&&e.length&&(a.addMessage(e),o=!0)}),!o)return void r({error:"None of the messages are populated strings."})}else{if(!U.isObject(n))return void r({error:"Invalid parameters passed."});var s=n;if("string"!=typeof(n=s.subdomain)||!n.length)return void r({error:"config.subdomain is not a populated string."});var c=s.urlDestinations;if(!(c instanceof Array&&c.length))return void r({error:"config.urlDestinations is not a populated array."});var u=[];c.forEach(function(e){U.isObject(e)&&(e.hideReferrer?e.message&&a.addMessage(e.message):u.push(e))});!function e(){u.length&&setTimeout(function(){var t=new Image,n=u.shift();t.src=n.url,a.onPageDestinationsFired.push(n),e()},100)}()}a.iframe?(r({message:"The destination publishing iframe is already attached and loaded."}),a.requestToProcess()):!e.subdomain&&e._getField("MCMID")?(a.subdomain=n,a.doAttachIframe=!0,a.url=a.getUrl(),a.readyToAttachIframe()?(a.iframeLoadedCallbacks.push(function(e){r({message:"Attempted to attach and load the destination publishing iframe through this API call. Result: "+(e.message||"no result")})}),a.attachIframe()):r({error:"Encountered a problem in attempting to attach and load the destination publishing iframe through this API call."})):a.iframeLoadedCallbacks.push(function(e){r({message:"Attempted to attach and load the destination publishing iframe through normal Visitor API processing. Result: "+(e.message||"no result")})})}},qe=function e(t){function n(e,t){return e>>>t|e<<32-t}for(var i,r,a=Math.pow,o=a(2,32),s="",c=[],u=8*t.length,l=e.h=e.h||[],d=e.k=e.k||[],f=d.length,p={},g=2;f<64;g++)if(!p[g]){for(i=0;i<313;i+=g)p[i]=g;l[f]=a(g,.5)*o|0,d[f++]=a(g,1/3)*o|0}for(t+="Â€";t.length%64-56;)t+="\0";for(i=0;i<t.length;i++){if((r=t.charCodeAt(i))>>8)return;c[i>>2]|=r<<(3-i)%4*8}for(c[c.length]=u/o|0,c[c.length]=u,r=0;r<c.length;){var m=c.slice(r,r+=16),h=l;for(l=l.slice(0,8),i=0;i<64;i++){var _=m[i-15],C=m[i-2],S=l[0],I=l[4],v=l[7]+(n(I,6)^n(I,11)^n(I,25))+(I&l[5]^~I&l[6])+d[i]+(m[i]=i<16?m[i]:m[i-16]+(n(_,7)^n(_,18)^_>>>3)+m[i-7]+(n(C,17)^n(C,19)^C>>>10)|0);l=[v+((n(S,2)^n(S,13)^n(S,22))+(S&l[1]^S&l[2]^l[1]&l[2]))|0].concat(l),l[4]=l[4]+v|0}for(i=0;i<8;i++)l[i]=l[i]+h[i]|0}for(i=0;i<8;i++)for(r=3;r+1;r--){var D=l[i]>>8*r&255;s+=(D<16?0:"")+D.toString(16)}return s},We=function(e,t){return"SHA-256"!==t&&"SHA256"!==t&&"sha256"!==t&&"sha-256"!==t||(e=qe(e)),e},Xe=function(e){return String(e).trim().toLowerCase()},Ke=Ge.OptIn;U.defineGlobalNamespace(),window.adobe.OptInCategories=Ke.Categories;var Je=function(t,n,i){function r(){S._customerIDsHashChanged=!1}function a(e){var t=e;return function(e){var n=e||A.location.href;try{var i=S._extractParamFromUri(n,t);if(i)return q.parsePipeDelimetedKeyValues(i)}catch(e){}}}function o(e){function t(e,t,n){e&&e.match(oe.VALID_VISITOR_ID_REGEX)&&(n===T&&(b=!0),t(e))}t(e[T],S.setMarketingCloudVisitorID,T),S._setFieldExpire(N,-1),t(e[w],S.setAnalyticsVisitorID)}function s(e){e=e||{},S._supplementalDataIDCurrent=e.supplementalDataIDCurrent||"",S._supplementalDataIDCurrentConsumed=e.supplementalDataIDCurrentConsumed||{},S._supplementalDataIDLast=e.supplementalDataIDLast||"",S._supplementalDataIDLastConsumed=e.supplementalDataIDLastConsumed||{}}function c(e){function t(e,t,n){return n=n?n+="|":n,n+=e+"="+encodeURIComponent(t)}function n(e,n){var i=n[0],r=n[1];return null!=r&&r!==F&&(e=t(i,r,e)),e}var i=e.reduce(n,"");return function(e){var t=q.getTimestampInSeconds();return e=e?e+="|":e,e+="TS="+t}(i)}function u(e){var t=e.minutesToLive,n="";return(S.idSyncDisableSyncs||S.disableIdSyncs)&&(n=n||"Error: id syncs have been disabled"),"string"==typeof e.dpid&&e.dpid.length||(n=n||"Error: config.dpid is empty"),"string"==typeof e.url&&e.url.length||(n=n||"Error: config.url is empty"),void 0===t?t=20160:(t=parseInt(t,10),(isNaN(t)||t<=0)&&(n=n||"Error: config.minutesToLive needs to be a positive number")),{error:n,ttl:t}}function l(){return!!S.configs.doesOptInApply&&!(I.optIn.isComplete&&d())}function d(){return S.configs.doesOptInApply&&S.configs.isIabContext?I.optIn.isApproved(I.optIn.Categories.ECID)&&y:I.optIn.isApproved(I.optIn.Categories.ECID)}function f(){[["getMarketingCloudVisitorID"],["setCustomerIDs",void 0],["syncIdentity",void 0],["getAnalyticsVisitorID"],["getAudienceManagerLocationHint"],["getLocationHint"],["getAudienceManagerBlob"]].forEach(function(e){var t=e[0],n=2===e.length?e[1]:"",i=S[t];S[t]=function(e){return d()&&S.isAllowed()?i.apply(S,arguments):("function"==typeof e&&S._callCallback(e,[n]),n)}})}function p(){var e=S._getAudienceManagerURLData(),t=e.url;return S._loadData(E,t,null,e)}function g(e,t){if(y=!0,e)throw new Error("[IAB plugin] : "+e);t&&t.gdprApplies&&(v=t.consentString,D=t.hasConsentChangedSinceLastCmpPull?1:0),p(),_()}function m(e,t){if(y=!0,e)throw new Error("[IAB plugin] : "+e);t.gdprApplies&&(v=t.consentString,D=t.hasConsentChangedSinceLastCmpPull?1:0),S.init(),_()}function h(){I.optIn.isComplete&&(I.optIn.isApproved(I.optIn.Categories.ECID)?S.configs.isIabContext?I.optIn.execute({command:"iabPlugin.fetchConsentData",callback:m}):(S.init(),_()):S.configs.isIabContext?I.optIn.execute({command:"iabPlugin.fetchConsentData",callback:g}):(f(),_()))}function _(){I.optIn.off("complete",h)}if(!i||i.split("").reverse().join("")!==t)throw new Error("Please use `Visitor.getInstance` to instantiate Visitor.");var S=this,I=window.adobe,v="",D=0,y=!1,b=!1;S.version="5.4.0";var A=C,O=A.Visitor;O.version=S.version,O.AuthState=L.AUTH_STATE,O.OptOut=L.OPT_OUT,A.s_c_in||(A.s_c_il=[],A.s_c_in=0),S._c="Visitor",S._il=A.s_c_il,S._in=A.s_c_in,S._il[S._in]=S,A.s_c_in++,S._instanceType="regular",S._log={requests:[]},S.marketingCloudOrgID=t,S.cookieName="AMCV_"+t,S.sessionCookieName="AMCVS_"+t;var M={};n&&n.secureCookie&&n.sameSiteCookie&&(M={sameSite:n.sameSiteCookie,secure:n.secureCookie}),S.cookieDomain=S.useLocalStorage?"":ee(null,M),S.loadSSL=!0,S.loadTimeout=3e4,S.CORSErrors=[],S.marketingCloudServer=S.audienceManagerServer="dpm.demdex.net",S.sdidParamExpiry=30;var k=null,E="MC",T="MCMID",P="MCIDTS",R="A",w="MCAID",x="AAM",N="MCAAMB",F="NONE",j=function(e){return!Object.prototype[e]},V=ae(S);S.FIELDS=L.FIELDS,S.cookieRead=function(e){return S.useLocalStorage?e===S.sessionCookieName?sessionStorage.getItem(e):localStorage.getItem(e):Z.get(e)},S.cookieWrite=function(e,t,n){var i=""+t;if(S.useLocalStorage)return e===S.sessionCookieName?sessionStorage.setItem(e,i):localStorage.setItem(e,i);var r=S.cookieLifetime?(""+S.cookieLifetime).toUpperCase():"",a={expires:n,domain:S.cookieDomain,cookieLifetime:r};return S.configs&&S.configs.secureCookie&&"https:"===location.protocol&&(a.secure=!0),S.configs&&S.configs.sameSiteCookie&&"https:"===location.protocol&&(a.sameSite=L.SAME_SITE_VALUES[S.configs.sameSiteCookie.toUpperCase()]||"Lax"),Z.set(e,i,a)},S.removeCookie=function(e){if(S.useLocalStorage)return e===S.sessionCookieName?sessionStorage.removeItem(e):localStorage.removeItem(e);var t={domain:S.cookieDomain};return S.configs&&S.configs.secureCookie&&"https:"===location.protocol&&(t.secure=!0),S.configs&&S.configs.sameSiteCookie&&"https:"===location.protocol&&(t.sameSite=L.SAME_SITE_VALUES[S.configs.sameSiteCookie.toUpperCase()]||"Lax"),Z.remove(e,t)},S.resetState=function(e){e?S._mergeServerState(e):s()},S._isAllowedDone=!1,S._isAllowedFlag=!1,S.isAllowed=function(){return S._isAllowedDone||(S._isAllowedDone=!0,(S.cookieRead(S.cookieName)||S.cookieWrite(S.cookieName,"T",1))&&(S._isAllowedFlag=!0)),"T"===S.cookieRead(S.cookieName)&&S.removeCookie(S.cookieName),S._isAllowedFlag},S.setMarketingCloudVisitorID=function(e){S._setMarketingCloudFields(e)},S._use1stPartyMarketingCloudServer=!1,S.getMarketingCloudVisitorID=function(e,t){S.marketingCloudServer&&S.marketingCloudServer.indexOf(".demdex.net")<0&&(S._use1stPartyMarketingCloudServer=!0);var n=S._getAudienceManagerURLData("_setMarketingCloudFields"),i=n.url;return S._getRemoteField(T,i,e,t,n)};var H=function(e,t){var n={};S.getMarketingCloudVisitorID(function(){t.forEach(function(e){n[e]=S._getField(e,!0)}),-1!==t.indexOf("MCOPTOUT")?S.isOptedOut(function(t){n.MCOPTOUT=t,e(n)},null,!0):e(n)},!0)};S.getVisitorValues=function(e,t){var n={MCMID:{fn:S.getMarketingCloudVisitorID,args:[!0],context:S},MCOPTOUT:{fn:S.isOptedOut,args:[void 0,!0],context:S},MCAID:{fn:S.getAnalyticsVisitorID,args:[!0],context:S},MCAAMLH:{fn:S.getAudienceManagerLocationHint,args:[!0],context:S},MCAAMB:{fn:S.getAudienceManagerBlob,args:[!0],context:S}},i=t&&t.length?U.pluck(n,t):n;t&&-1===t.indexOf("MCAID")?H(e,t):$(i,e)},S._currentCustomerIDs={},S._customerIDsHashChanged=!1,S._newCustomerIDsHash="",S.setCustomerIDs=function(t,n){if(!S.isOptedOut()&&t){if(!U.isObject(t)||U.isObjectEmpty(t))return!1;S._readVisitor();var i,a,o,s;for(i in t)if(j(i)&&(S._currentCustomerIDs.dataSources=S._currentCustomerIDs.dataSources||{},a=t[i],n=a.hasOwnProperty("hashType")?a.hashType:n,a))if("object"===e(a)){var c={};if(a.id){if(n){if(!(s=We(Xe(a.id),n)))return;a.id=s,c.hashType=n}c.id=a.id}void 0!=a.authState&&(c.authState=a.authState),S._currentCustomerIDs.dataSources[i]=c}else if(n){if(!(s=We(Xe(a),n)))return;S._currentCustomerIDs.dataSources[i]={id:s,hashType:n}}else S._currentCustomerIDs.dataSources[i]={id:a};var u=S.getCustomerIDs(!0),l=S._getField("MCCIDH"),d="";l||(l=0);for(o in u){var f=u[o];if(!U.isObjectEmpty(f))for(i in f)j(i)&&(a=f[i],d+=(d?"|":"")+i+"|"+(a.id?a.id:"")+(a.authState?a.authState:""))}S._newCustomerIDsHash=String(S._hash(d)),S._newCustomerIDsHash!==l&&(S._customerIDsHashChanged=!0,S._mapCustomerIDs(r))}},S.syncIdentity=function(t,n){if(!S.isOptedOut()&&t){if(!U.isObject(t)||U.isObjectEmpty(t))return!1;S._readVisitor();var i,a,o,s,c;for(i in t)if(j(i)&&(S._currentCustomerIDs.nameSpaces=S._currentCustomerIDs.nameSpaces||{},a=t[i],n=a.hasOwnProperty("hashType")?a.hashType:n,a&&"object"===e(a))){var u={};if(a.id){if(n){if(!(o=We(Xe(a.id),n)))return;a.id=o,u.hashType=n}u.id=a.id}void 0!=a.authState&&(u.authState=a.authState),a.dataSource&&(S._currentCustomerIDs.dataSources=S._currentCustomerIDs.dataSources||{},s=a.dataSource,S._currentCustomerIDs.dataSources[s]=u),S._currentCustomerIDs.nameSpaces[i]=u}var l=S.getCustomerIDs(!0),d=S._getField("MCCIDH"),f="";d||(d="0");for(c in l){var p=l[c];if(!U.isObjectEmpty(p))for(i in p)j(i)&&(a=p[i],f+=(f?"|":"")+i+"|"+(a.id?a.id:"")+(a.authState?a.authState:""))}S._newCustomerIDsHash=String(S._hash(f)),S._newCustomerIDsHash!==d&&(S._customerIDsHashChanged=!0,S._mapCustomerIDs(r))}},S.getCustomerIDs=function(e){S._readVisitor();var t,n,i={dataSources:{},nameSpaces:{}},r=S._currentCustomerIDs.dataSources;for(t in r)j(t)&&(n=r[t],n.id&&(i.dataSources[t]||(i.dataSources[t]={}),i.dataSources[t].id=n.id,void 0!=n.authState?i.dataSources[t].authState=n.authState:i.dataSources[t].authState=O.AuthState.UNKNOWN,n.hashType&&(i.dataSources[t].hashType=n.hashType)));var a=S._currentCustomerIDs.nameSpaces;for(t in a)j(t)&&(n=a[t],n.id&&(i.nameSpaces[t]||(i.nameSpaces[t]={}),i.nameSpaces[t].id=n.id,void 0!=n.authState?i.nameSpaces[t].authState=n.authState:i.nameSpaces[t].authState=O.AuthState.UNKNOWN,n.hashType&&(i.nameSpaces[t].hashType=n.hashType)));return e?i:i.dataSources},S.setAnalyticsVisitorID=function(e){S._setAnalyticsFields(e)},S.getAnalyticsVisitorID=function(e,t,n){if(!q.isTrackingServerPopulated()&&!n)return S._callCallback(e,[""]),"";var i="";if(n||(i=S.getMarketingCloudVisitorID(function(t){S.getAnalyticsVisitorID(e,!0)})),i||n){var r=n?S.marketingCloudServer:S.trackingServer,a="";S.loadSSL&&(n?S.marketingCloudServerSecure&&(r=S.marketingCloudServerSecure):S.trackingServerSecure&&(r=S.trackingServerSecure));var o={};if(r){var s="http"+(S.loadSSL?"s":"")+"://"+r+"/id",c=S.configs.cookieLifetime,u="d_visid_ver="+S.version+"&mcorgid="+encodeURIComponent(S.marketingCloudOrgID)+(i?"&mid="+encodeURIComponent(i):"")+(c?"&cl="+encodeURIComponent(c):"")+(S.idSyncDisable3rdPartySyncing||S.disableThirdPartyCookies?"&d_coppa=true":""),l=["s_c_il",S._in,"_set"+(n?"MarketingCloud":"Analytics")+"Fields"];a=s+"?"+u+"&callback=s_c_il%5B"+S._in+"%5D._set"+(n?"MarketingCloud":"Analytics")+"Fields",o.corsUrl=s+"?"+u,o.callback=l}return o.url=a,S._getRemoteField(n?T:w,a,e,t,o)}return""},S.getAudienceManagerLocationHint=function(e,t){if(S.getMarketingCloudVisitorID(function(t){S.getAudienceManagerLocationHint(e,!0)})){var n=S._getField(w);if(!n&&q.isTrackingServerPopulated()&&(n=S.getAnalyticsVisitorID(function(t){S.getAudienceManagerLocationHint(e,!0)})),n||!q.isTrackingServerPopulated()){var i=S._getAudienceManagerURLData(),r=i.url;return S._getRemoteField("MCAAMLH",r,e,t,i)}}return""},S.getLocationHint=S.getAudienceManagerLocationHint,S.getAudienceManagerBlob=function(e,t){if(S.getMarketingCloudVisitorID(function(t){S.getAudienceManagerBlob(e,!0)})){var n=S._getField(w);if(!n&&q.isTrackingServerPopulated()&&(n=S.getAnalyticsVisitorID(function(t){S.getAudienceManagerBlob(e,!0)})),n||!q.isTrackingServerPopulated()){var i=S._getAudienceManagerURLData(),r=i.url;return S._customerIDsHashChanged&&S._setFieldExpire(N,-1),S._getRemoteField(N,r,e,t,i)}}return""},S._supplementalDataIDCurrent="",S._supplementalDataIDCurrentConsumed={},S._supplementalDataIDLast="",S._supplementalDataIDLastConsumed={},S.getSupplementalDataID=function(e,t){S._supplementalDataIDCurrent||t||(S._supplementalDataIDCurrent=S._generateID(1));var n=S._supplementalDataIDCurrent;return S._supplementalDataIDLast&&!S._supplementalDataIDLastConsumed[e]?(n=S._supplementalDataIDLast,S._supplementalDataIDLastConsumed[e]=!0):n&&(S._supplementalDataIDCurrentConsumed[e]&&(S._supplementalDataIDLast=S._supplementalDataIDCurrent,S._supplementalDataIDLastConsumed=S._supplementalDataIDCurrentConsumed,S._supplementalDataIDCurrent=n=t?"":S._generateID(1),S._supplementalDataIDCurrentConsumed={}),n&&(S._supplementalDataIDCurrentConsumed[e]=!0)),n};var B=!1;S._liberatedOptOut=null,S.getOptOut=function(e,t){var n=S._getAudienceManagerURLData("_setMarketingCloudFields"),i=n.url;if(d())return S._getRemoteField("MCOPTOUT",i,e,t,n);if(S._registerCallback("liberatedOptOut",e),null!==S._liberatedOptOut)return S._callAllCallbacks("liberatedOptOut",[S._liberatedOptOut]),B=!1,S._liberatedOptOut;if(B)return null;B=!0;var r="liberatedGetOptOut";return n.corsUrl=n.corsUrl.replace(/\.demdex\.net\/id\?/,".demdex.net/optOutStatus?"),n.callback=[r],C[r]=function(e){if(e===Object(e)){var t,n,i=U.parseOptOut(e,t,F);t=i.optOut,n=1e3*i.d_ottl,S._liberatedOptOut=t,setTimeout(function(){S._liberatedOptOut=null},n)}S._callAllCallbacks("liberatedOptOut",[t]),B=!1},V.fireCORS(n),null},S.isOptedOut=function(e,t,n){t||(t=O.OptOut.GLOBAL);var i=S.getOptOut(function(n){var i=n===O.OptOut.GLOBAL||n.indexOf(t)>=0;S._callCallback(e,[i])},n);return i?i===O.OptOut.GLOBAL||i.indexOf(t)>=0:null};var G={subscribed:!1,callbacks:[]};S.onReceiveEcid=function(e){if(d())return S.getMarketingCloudVisitorID(e,!0);G.subscribed=!0,e&&"function"==typeof e&&G.callbacks.push(e)},S._fields=null,S._fieldsExpired=null,S._hash=function(e){var t,n,i=0;if(e)for(t=0;t<e.length;t++)n=e.charCodeAt(t),i=(i<<5)-i+n,i&=i;return i},S._generateID=re,S._generateLocalMID=function(){var e=S._generateID(0);return X.isClientSideMarketingCloudVisitorID=!0,e},S._callbackList=null,S._callCallback=function(e,t){try{"function"==typeof e?e.apply(A,t):e[1].apply(e[0],t)}catch(e){}},S._registerCallback=function(e,t){t&&(null==S._callbackList&&(S._callbackList={}),void 0==S._callbackList[e]&&(S._callbackList[e]=[]),S._callbackList[e].push(t))},S._callAllCallbacks=function(e,t){if(null!=S._callbackList){var n=S._callbackList[e];if(n)for(;n.length>0;)S._callCallback(n.shift(),t)}},S._addQuerystringParam=function(e,t,n,i){var r=encodeURIComponent(t)+"="+encodeURIComponent(n),a=q.parseHash(e),o=q.hashlessUrl(e);if(-1===o.indexOf("?"))return o+"?"+r+a;var s=o.split("?"),c=s[0]+"?",u=s[1];return c+q.addQueryParamAtLocation(u,r,i)+a},S._extractParamFromUri=function(e,t){var n=new RegExp("[\\?&#]"+t+"=([^&#]*)"),i=n.exec(e);if(i&&i.length)return decodeURIComponent(i[1])},S._parseAdobeMcFromUrl=a(oe.ADOBE_MC),S._parseAdobeMcSdidFromUrl=a(oe.ADOBE_MC_SDID),S._attemptToPopulateSdidFromUrl=function(e){var n=S._parseAdobeMcSdidFromUrl(e),i=1e9;n&&n.TS&&(i=q.getTimestampInSeconds()-n.TS),n&&n.SDID&&n.MCORGID===t&&i<S.sdidParamExpiry&&(S._supplementalDataIDCurrent=n.SDID,S._supplementalDataIDCurrentConsumed.SDID_URL_PARAM=!0)},S._attemptToPopulateIdsFromUrl=function(){var e=S._parseAdobeMcFromUrl();if(e&&e.TS){var n=q.getTimestampInSeconds(),i=n-e.TS;if(Math.floor(i/60)>oe.ADOBE_MC_TTL_IN_MIN||e.MCORGID!==t)return;o(e)}},S._mergeServerState=function(e){if(e)try{if(e=function(e){return q.isObject(e)?e:JSON.parse(e)}(e),e[S.marketingCloudOrgID]){var t=e[S.marketingCloudOrgID];!function(e){q.isObject(e)&&S.setCustomerIDs(e)}(t.customerIDs),s(t.sdid)}}catch(e){throw new Error("`serverState` has an invalid format.")}},S._timeout=null,S._loadData=function(e,t,n,i){t=S._addQuerystringParam(t,"d_fieldgroup",e,1),i.url=S._addQuerystringParam(i.url,"d_fieldgroup",e,1),i.corsUrl=S._addQuerystringParam(i.corsUrl,"d_fieldgroup",e,1),X.fieldGroupObj[e]=!0,i===Object(i)&&i.corsUrl&&"XMLHttpRequest"===V.corsMetadata.corsType&&V.fireCORS(i,n,e)},S._clearTimeout=function(e){null!=S._timeout&&S._timeout[e]&&(clearTimeout(S._timeout[e]),S._timeout[e]=0)},S._settingsDigest=0,S._getSettingsDigest=function(){if(!S._settingsDigest){var e=S.version;S.audienceManagerServer&&(e+="|"+S.audienceManagerServer),S.audienceManagerServerSecure&&(e+="|"+S.audienceManagerServerSecure),S._settingsDigest=S._hash(e)}return S._settingsDigest},S._readVisitorDone=!1,S._readVisitor=function(){if(!S._readVisitorDone){S._readVisitorDone=!0;var e,t,n,i,r,a,o=S._getSettingsDigest(),s=!1,c=S.cookieRead(S.cookieName),u=new Date;if(c||b||S.discardTrackingServerECID||(c=S.cookieRead(oe.FIRST_PARTY_SERVER_COOKIE)),null==S._fields&&(S._fields={}),c&&"T"!==c)for(c=c.split("|"),c[0].match(/^[\-0-9]+$/)&&(parseInt(c[0],10)!==o&&(s=!0),c.shift()),c.length%2==1&&c.pop(),e=0;e<c.length;e+=2)t=c[e].split("-"),n=t[0],i=c[e+1],t.length>1?(r=parseInt(t[1],10),a=t[1].indexOf("s")>0):(r=0,a=!1),s&&("MCCIDH"===n&&(i=""),r>0&&(r=u.getTime()/1e3-60)),n&&i&&(S._setField(n,i,1),r>0&&(S._fields["expire"+n]=r+(a?"s":""),(u.getTime()>=1e3*r||a&&!S.cookieRead(S.sessionCookieName))&&(S._fieldsExpired||(S._fieldsExpired={}),S._fieldsExpired[n]=!0)));!S._getField(w)&&q.isTrackingServerPopulated()&&(c=S.cookieRead("s_vi"))&&(c=c.split("|"),c.length>1&&c[0].indexOf("v1")>=0&&(i=c[1],e=i.indexOf("["),e>=0&&(i=i.substring(0,e)),i&&i.match(oe.VALID_VISITOR_ID_REGEX)&&S._setField(w,i)))}},S._appendVersionTo=function(e){var t="vVersion|"+S.version,n=e?S._getCookieVersion(e):null;return n?te.areVersionsDifferent(n,S.version)&&(e=e.replace(oe.VERSION_REGEX,t)):e+=(e?"|":"")+t,e},S._writeVisitor=function(){var e,t,n=S._getSettingsDigest();for(e in S._fields)j(e)&&S._fields[e]&&"expire"!==e.substring(0,6)&&(t=S._fields[e],n+=(n?"|":"")+e+(S._fields["expire"+e]?"-"+S._fields["expire"+e]:"")+"|"+t);n=S._appendVersionTo(n),S.cookieWrite(S.cookieName,n,1)},S._getField=function(e,t){return null==S._fields||!t&&S._fieldsExpired&&S._fieldsExpired[e]?null:S._fields[e]},S._setField=function(e,t,n){null==S._fields&&(S._fields={}),S._fields[e]=t,n||S._writeVisitor()},S._getFieldList=function(e,t){var n=S._getField(e,t);return n?n.split("*"):null},S._setFieldList=function(e,t,n){S._setField(e,t?t.join("*"):"",n)},S._getFieldMap=function(e,t){var n=S._getFieldList(e,t);if(n){var i,r={};for(i=0;i<n.length;i+=2)r[n[i]]=n[i+1];return r}return null},S._setFieldMap=function(e,t,n){var i,r=null;if(t){r=[];for(i in t)j(i)&&(r.push(i),r.push(t[i]))}S._setFieldList(e,r,n)},S._setFieldExpire=function(e,t,n){var i=new Date;i.setTime(i.getTime()+1e3*t),null==S._fields&&(S._fields={}),S._fields["expire"+e]=Math.floor(i.getTime()/1e3)+(n?"s":""),t<0?(S._fieldsExpired||(S._fieldsExpired={}),S._fieldsExpired[e]=!0):S._fieldsExpired&&(S._fieldsExpired[e]=!1),n&&(S.cookieRead(S.sessionCookieName)||S.cookieWrite(S.sessionCookieName,"1"))},S._findVisitorID=function(t){return t&&("object"===e(t)&&(t=t.d_mid?t.d_mid:t.visitorID?t.visitorID:t.id?t.id:t.uuid?t.uuid:""+t),t&&"NOTARGET"===(t=t.toUpperCase())&&(t=F),t&&(t===F||t.match(oe.VALID_VISITOR_ID_REGEX))||(t="")),t},S._setFields=function(t,n){if(S._clearTimeout(t),null!=S._loading&&(S._loading[t]=!1),X.fieldGroupObj[t]&&X.setState(t,!1),t===E){!0!==X.isClientSideMarketingCloudVisitorID&&(X.isClientSideMarketingCloudVisitorID=!1);var i=S._getField(T);if(!i||S.overwriteCrossDomainMCIDAndAID){if(!(i="object"===e(n)&&n.mid?n.mid:S._findVisitorID(n))){if(S._use1stPartyMarketingCloudServer&&!S.tried1stPartyMarketingCloudServer)return S.tried1stPartyMarketingCloudServer=!0,void S.getAnalyticsVisitorID(null,!1,!0);i=S._generateLocalMID()}S._setField(T,i)}i&&i!==F||(i=""),"object"===e(n)&&((n.d_region||n.dcs_region||n.d_blob||n.blob)&&S._setFields(x,n),S._use1stPartyMarketingCloudServer&&n.mid&&S._setFields(R,{id:n.id})),S._callAllCallbacks(T,[i])}if(t===x&&"object"===e(n)){var r=604800;void 0!=n.id_sync_ttl&&n.id_sync_ttl&&(r=parseInt(n.id_sync_ttl,10));var a=W.getRegionAndCheckIfChanged(n,r);S._callAllCallbacks("MCAAMLH",[a]);var o=S._getField(N);(n.d_blob||n.blob)&&(o=n.d_blob,o||(o=n.blob),S._setFieldExpire(N,r),S._setField(N,o)),o||(o=""),S._callAllCallbacks(N,[o]),!n.error_msg&&S._newCustomerIDsHash&&S._setField("MCCIDH",S._newCustomerIDsHash)}if(t===R){var s=S._getField(w);s&&!S.overwriteCrossDomainMCIDAndAID||(s=S._findVisitorID(n),s?s!==F&&S._setFieldExpire(N,-1):s=F,S._setField(w,s)),s&&s!==F||(s=""),S._callAllCallbacks(w,[s])}if(S.idSyncDisableSyncs||S.disableIdSyncs)W.idCallNotProcesssed=!0;else{W.idCallNotProcesssed=!1;var c={};c.ibs=n.ibs,c.subdomain=n.subdomain,W.processIDCallData(c)}if(n===Object(n)){var u,l;d()&&S.isAllowed()&&(u=S._getField("MCOPTOUT"));var f=U.parseOptOut(n,u,F);u=f.optOut,l=f.d_ottl,S._setFieldExpire("MCOPTOUT",l,!0),S._setField("MCOPTOUT",u),S._callAllCallbacks("MCOPTOUT",[u])}},S._loading=null,S._getRemoteField=function(e,t,n,i,r){var a,o="",s=q.isFirstPartyAnalyticsVisitorIDCall(e),c={MCAAMLH:!0,MCAAMB:!0};if(d()&&S.isAllowed()){S._readVisitor(),o=S._getField(e,!0===c[e]);if(function(){return(!o||S._fieldsExpired&&S._fieldsExpired[e])&&(!S.disableThirdPartyCalls||s)}()){if(e===T||"MCOPTOUT"===e?a=E:"MCAAMLH"===e||e===N?a=x:e===w&&(a=R),a)return!t||null!=S._loading&&S._loading[a]||(null==S._loading&&(S._loading={}),S._loading[a]=!0,a===x&&(D=0),S._loadData(a,t,function(t){if(!S._getField(e)){t&&X.setState(a,!0);var n="";e===T?n=S._generateLocalMID():a===x&&(n={error_msg:"timeout"}),S._setFields(a,n)}},r)),S._registerCallback(e,n),o||(t||S._setFields(a,{id:F}),"")}else o||(e===T?(S._registerCallback(e,n),o=S._generateLocalMID(),S.setMarketingCloudVisitorID(o)):e===w?(S._registerCallback(e,n),o="",S.setAnalyticsVisitorID(o)):(o="",i=!0))}return e!==T&&e!==w||o!==F||(o="",i=!0),n&&i&&S._callCallback(n,[o]),e===T&&G.subscribed&&(G.callbacks&&G.callbacks.length&&G.callbacks.forEach(function(e){S._callCallback(e,[o])}),G.subscribed=!1,G.callbacks.length=0),o},S._setMarketingCloudFields=function(e){S._readVisitor(),S._setFields(E,e)},S._mapCustomerIDs=function(e){S.getAudienceManagerBlob(e,!0)},S._setAnalyticsFields=function(e){S._readVisitor(),S._setFields(R,e)},S._setAudienceManagerFields=function(e){S._readVisitor(),S._setFields(x,e)},S._getAudienceManagerURLData=function(e){var t=S.audienceManagerServer,n="",i=S._getField(T),r=S._getField(N,!0),a=S._getField(w),o=a&&a!==F?"&d_cid_ic=AVID%01"+encodeURIComponent(a):"";if(S.loadSSL&&S.audienceManagerServerSecure&&(t=S.audienceManagerServerSecure),t){var s,c,u,l=S.getCustomerIDs(!0);if(l)for(c in l){var d=l[c];if(!U.isObjectEmpty(d)){var f="nameSpaces"===c?"&d_cid_ns=":"&d_cid_ic=";for(s in d)j(s)&&(u=d[s],o+=f+encodeURIComponent(s)+"%01"+encodeURIComponent(u.id?u.id:"")+(u.authState?"%01"+u.authState:""))}}e||(e="_setAudienceManagerFields");var p="http"+(S.loadSSL?"s":"")+"://"+t+"/id",g="d_visid_ver="+S.version+(v&&-1!==p.indexOf("demdex.net")?"&gdpr=1&gdpr_consent="+v:"")+(D&&-1!==p.indexOf("demdex.net")?"&d_cf="+D:"")+"&d_rtbd=json&d_ver=2"+(!i&&S._use1stPartyMarketingCloudServer?"&d_verify=1":"")+"&d_orgid="+encodeURIComponent(S.marketingCloudOrgID)+"&d_nsid="+(S.idSyncContainerID||0)+(i?"&d_mid="+encodeURIComponent(i):"")+(S.idSyncDisable3rdPartySyncing||S.disableThirdPartyCookies?"&d_coppa=true":"")+(!0===k?"&d_coop_safe=1":!1===k?"&d_coop_unsafe=1":"")+(r?"&d_blob="+encodeURIComponent(r):"")+o,m=["s_c_il",S._in,e];return n=p+"?"+g+"&d_cb=s_c_il%5B"+S._in+"%5D."+e,{url:n,corsUrl:p+"?"+g,callback:m}}return{url:n}},S.appendVisitorIDsTo=function(e){try{var t=[[T,S._getField(T)],[w,S._getField(w)],["MCORGID",S.marketingCloudOrgID]];return S._addQuerystringParam(e,oe.ADOBE_MC,c(t))}catch(t){return e}},S.appendSupplementalDataIDTo=function(e,t){if(!(t=t||S.getSupplementalDataID(q.generateRandomString(),!0)))return e;try{var n=c([["SDID",t],["MCORGID",S.marketingCloudOrgID]]);return S._addQuerystringParam(e,oe.ADOBE_MC_SDID,n)}catch(t){return e}};var q={parseHash:function(e){var t=e.indexOf("#");return t>0?e.substr(t):""},hashlessUrl:function(e){var t=e.indexOf("#");return t>0?e.substr(0,t):e},addQueryParamAtLocation:function(e,t,n){var i=e.split("&");return n=null!=n?n:i.length,i.splice(n,0,t),i.join("&")},isFirstPartyAnalyticsVisitorIDCall:function(e,t,n){if(e!==w)return!1;var i;return t||(t=S.trackingServer),n||(n=S.trackingServerSecure),!("string"!=typeof(i=S.loadSSL?n:t)||!i.length)&&(i.indexOf("2o7.net")<0&&i.indexOf("omtrdc.net")<0)},isObject:function(e){return Boolean(e&&e===Object(e))},removeCookie:function(e){Z.remove(e,{domain:S.cookieDomain})},isTrackingServerPopulated:function(){return!!S.trackingServer||!!S.trackingServerSecure},getTimestampInSeconds:function(){return Math.round((new Date).getTime()/1e3)},parsePipeDelimetedKeyValues:function(e){return e.split("|").reduce(function(e,t){var n=t.split("=");return e[n[0]]=decodeURIComponent(n[1]),e},{})},generateRandomString:function(e){e=e||5;for(var t="",n="abcdefghijklmnopqrstuvwxyz0123456789";e--;)t+=n[Math.floor(Math.random()*n.length)];return t},normalizeBoolean:function(e){return"true"===e||"false"!==e&&e},parseBoolean:function(e){return"true"===e||"false"!==e&&null},replaceMethodsWithFunction:function(e,t){for(var n in e)e.hasOwnProperty(n)&&"function"==typeof e[n]&&(e[n]=t);return e}};S._helpers=q;var W=se(S,O);S._destinationPublishing=W,S.timeoutMetricsLog=[];var X={isClientSideMarketingCloudVisitorID:null,MCIDCallTimedOut:null,AnalyticsIDCallTimedOut:null,AAMIDCallTimedOut:null,fieldGroupObj:{},setState:function(e,t){switch(e){case E:!1===t?!0!==this.MCIDCallTimedOut&&(this.MCIDCallTimedOut=!1):this.MCIDCallTimedOut=t;break;case R:!1===t?!0!==this.AnalyticsIDCallTimedOut&&(this.AnalyticsIDCallTimedOut=!1):this.AnalyticsIDCallTimedOut=t;break;case x:!1===t?!0!==this.AAMIDCallTimedOut&&(this.AAMIDCallTimedOut=!1):this.AAMIDCallTimedOut=t}}};S.isClientSideMarketingCloudVisitorID=function(){return X.isClientSideMarketingCloudVisitorID},S.MCIDCallTimedOut=function(){return X.MCIDCallTimedOut},S.AnalyticsIDCallTimedOut=function(){return X.AnalyticsIDCallTimedOut},S.AAMIDCallTimedOut=function(){return X.AAMIDCallTimedOut},S.idSyncGetOnPageSyncInfo=function(){return S._readVisitor(),S._getField("MCSYNCSOP")},S.idSyncByURL=function(e){if(!S.isOptedOut()){var t=u(e||{});if(t.error)return t.error;var n,i,r=e.url,a=encodeURIComponent,o=W;return r=r.replace(/^https:/,"").replace(/^http:/,""),n=U.encodeAndBuildRequest(["",e.dpid,e.dpuuid||""],","),i=["ibs",a(e.dpid),"img",a(r),t.ttl,"",n],o.addMessage(i.join("|")),o.requestToProcess(),"Successfully queued"}},S.idSyncByDataSource=function(e){if(!S.isOptedOut())return e===Object(e)&&"string"==typeof e.dpuuid&&e.dpuuid.length?(e.url="//dpm.demdex.net/ibs:dpid="+e.dpid+"&dpuuid="+e.dpuuid,S.idSyncByURL(e)):"Error: config or config.dpuuid is empty"},Ye(S,W),S._getCookieVersion=function(e){e=e||S.cookieRead(S.cookieName);var t=oe.VERSION_REGEX.exec(e);return t&&t.length>1?t[1]:null},S._resetAmcvCookie=function(e){var t=S._getCookieVersion();t&&!te.isLessThan(t,e)||S.removeCookie(S.cookieName)},S.setAsCoopSafe=function(){k=!0},S.setAsCoopUnsafe=function(){k=!1},function(){if(S.configs=Object.create(null),q.isObject(n))for(var e in n)j(e)&&(S[e]=n[e],S.configs[e]=n[e])}(),f();var K;S.init=function(){l()&&(I.optIn.fetchPermissions(h,!0),!I.optIn.isApproved(I.optIn.Categories.ECID))||K||(K=!0,function(){if(q.isObject(n)){S.idSyncContainerID=S.idSyncContainerID||0,k="boolean"==typeof S.isCoopSafe?S.isCoopSafe:q.parseBoolean(S.isCoopSafe),S.resetBeforeVersion&&S._resetAmcvCookie(S.resetBeforeVersion),S._attemptToPopulateIdsFromUrl(),S._attemptToPopulateSdidFromUrl(),S._readVisitor();var e=S._getField(P),t=Math.ceil((new Date).getTime()/oe.MILLIS_PER_DAY);S.idSyncDisableSyncs||S.disableIdSyncs||!W.canMakeSyncIDCall(e,t)||(S._setFieldExpire(N,-1),S._setField(P,t)),S.getMarketingCloudVisitorID(),S.getAudienceManagerLocationHint(),S.getAudienceManagerBlob(),S._mergeServerState(S.serverState)}else S._attemptToPopulateIdsFromUrl(),S._attemptToPopulateSdidFromUrl()}(),function(){if(!S.idSyncDisableSyncs&&!S.disableIdSyncs){W.checkDPIframeSrc();var e=function(){var e=W;e.readyToAttachIframe()&&e.attachIframe()};A.addEventListener("load",function(){O.windowLoaded=!0,e()});try{ie.receiveMessage(function(e){W.receiveMessage(e.data)},W.iframeHost)}catch(e){}}}(),function(){S.whitelistIframeDomains&&oe.POST_MESSAGE_ENABLED&&(S.whitelistIframeDomains=S.whitelistIframeDomains instanceof Array?S.whitelistIframeDomains:[S.whitelistIframeDomains],S.whitelistIframeDomains.forEach(function(e){var n=new Y(t,e),i=Q(S,n);ie.receiveMessage(i,e)}))}())}};Je.config=ue,C.Visitor=Je;var ze=Je,Qe=function(e){if(U.isObject(e))return Object.keys(e).filter(function(t){return""!==e[t]&&ue.getConfigs()[t]}).reduce(function(t,n){var i=ue.normalizeConfig(n,e[n]),r=U.normalizeBoolean(i);return t[n]=r,t},Object.create(null))},$e=Ge.OptIn,Ze=Ge.IabPlugin;return ze.getInstance=function(e,t){if(!e)throw new Error("Visitor requires Adobe Marketing Cloud Org ID.");e.indexOf("@")<0&&(e+="@AdobeOrg");var n=function(){var t=C.s_c_il;if(t)for(var n=0;n<t.length;n++){var i=t[n];if(i&&"Visitor"===i._c&&i.marketingCloudOrgID===e)return i}}();if(n)return n;var i=Qe(t)||{};!function(e){C.adobe.optIn=C.adobe.optIn||function(){var t=U.pluck(e,["doesOptInApply","previousPermissions","preOptInApprovals","isOptInStorageEnabled","optInStorageExpiry","isIabContext","sameSiteCookie","secureCookie"]),n=e.optInCookieDomain||e.cookieDomain;n=n||ee(),n=n===window.location.hostname?"":n,t.optInCookieDomain=n;var i=new $e(t,{cookies:Z});if(t.isIabContext&&t.doesOptInApply){var r=new Ze;i.registerPlugin(r)}return i}()}(i||{});var r=e,a=r.split("").reverse().join(""),o=new ze(e,null,a);i.cookieDomain&&(o.cookieDomain=i.cookieDomain),i.sameSiteCookie&&i.secureCookie&&(o.configs={sameSiteCookie:i.sameSiteCookie,secureCookie:i.secureCookie}),function(){
                  C.s_c_il.splice(--C.s_c_in,1)}();var s=U.getIeVersion();if("number"==typeof s&&s<10)return o._helpers.replaceMethodsWithFunction(o,function(){});var c=function(){try{return C.self!==C.parent}catch(e){return!0}}()&&(!function(e){return e.cookieWrite("TEST_AMCV_COOKIE","T",1),"T"===e.cookieRead("TEST_AMCV_COOKIE")&&(e.removeCookie("TEST_AMCV_COOKIE"),!0)}(o)||U.isFirefox()&&!i.whitelistParentDomain)&&C.parent?new W(e,i,o,C.parent):new ze(e,i,a);return o=null,c.init(),c},function(){function e(){ze.windowLoaded=!0}C.addEventListener?C.addEventListener("load",e):C.attachEvent&&C.attachEvent("onload",e),ze.codeLoadEnd=(new Date).getTime()}(),ze}();

                return Visitor;
              }();

            }

          },
          "adobe-mcid/src/view/utils/timeUnits.js": {
            "script": function(module, exports, require, turbine) {
              /*************************************************************************
               * ADOBE CONFIDENTIAL
               * ___________________
               *
               *  Copyright 2018 Adobe Systems Incorporated
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

              var timeUnits = {
                Hours: 3600,
                Days: 24 * 3600,
                Weeks: 7 * 24 * 3600,
                Months: 30 * 24 * 3600,
                Years: 365 * 24 * 3600
              };

              module.exports = timeUnits;

            }

          }
        }
      },
      "common-analytics-plugins": {
        "displayName": "Common Analytics Plugins",
        "hostedLibFilesBaseUrl": "https://assets.adobedtm.com/extensions/EP88bc9a95368c457498f7139d263446ba/",
        "settings": {
          "ns": {
            "id": "ns",
            "obj": "window",
            "desc": "The Numbers Suite is a series of plugins that allow for...<ol><li>zeroPad - a number of zeroes to the beginning of a number</li><li>randomNumber - generate a random number with a specific number of digits</li><li>twoDecimals - round a number to the closest hundreth (for currency)</li></ol><p>This plugin suite is depricated.</p>",
            "name": "Numbers Suite",
            "display": true,
            "doclink": "//docs.adobe.com/content/help/en/analytics/implementation/vars/plugins/numberssuite.html",
            "version": "1.0",
            "depricated": true
          },
          "pt": {
            "id": "pt",
            "obj": "tracker",
            "desc": "Executes a function on a list of Adobe Analytics variables. For example, the following function will run the clearVars function three times, once using eVar1 as the argument, once using eVar4 as the argument, and once using eVar29 as the argument. The end result clear out the values of eVar1, eVar4 & eVar29. s.pt('eVar1,eVar4,eVar29', ',', 'clearVars');",
            "name": "pt",
            "display": true,
            "doclink": "//docs.adobe.com/content/help/en/analytics/implementation/vars/plugins/pt-plugin.html",
            "version": "3.0",
            "depricated": false
          },
          "apl": {
            "id": "apl",
            "obj": "tracker",
            "desc": "Add new values to list-delimited variables (e.g. events, linkTrackVars, listVars, etc.). This plugin requires \"inList\" to be initialized as well.",
            "name": "Append To List",
            "display": true,
            "version": "4.0",
            "depricated": false
          },
          "rfl": {
            "id": "rfl",
            "obj": "tracker",
            "desc": "Remove values from list-delimited variables (e.g. s.events, s.linkTrackVars, listVars, etc.).",
            "name": "Remove From List",
            "display": true,
            "doclink": "//docs.adobe.com/content/help/en/analytics/implementation/vars/plugins/removefromlist.html",
            "version": "2.1",
            "depricated": false
          },
          "p_fo": {
            "id": "fpo",
            "obj": "tracker",
            "desc": "Checks for the existence of a specific JavaScript object. If the object doesn't exist, the plugin creates the object and returns the value of true. This would be the first and only time the plugin would create this object on the current page (hence the name, pageFirstOnly). If the JavaScript object already exists on the page, the function will return the value of false.",
            "name": "First Page Only",
            "display": true,
            "doclink": "//docs.adobe.com/content/help/en/analytics/implementation/vars/plugins/p-fo.html",
            "version": "3.0",
            "depricated": false
          },
          "inList": {
            "id": "il",
            "obj": "tracker",
            "desc": "Check whether a value already exists within either a delimited list of values or a JavaScript array object.",
            "name": "In List",
            "display": true,
            "version": "3.0",
            "depricated": false
          },
          "zeroPad": {
            "display": false,
            "version": "1.0",
            "depricated": true
          },
          "cleanStr": {
            "id": "cs",
            "obj": "window",
            "desc": "Remove unnecessary characters from a string (or string variable), including HTML tag characters, Extra whitespaces (including double spaces), Left/right single quotes (â€˜â€™) (replaced with straight single quotes), Tabs, Newlines/Carriage Returns. ",
            "name": "Clean String",
            "display": true,
            "version": "2.0",
            "depricated": false
          },
          "formatTime": {
            "id": "ft",
            "obj": "tracker",
            "desc": "Take a specified number of seconds and present them in a bucketed format, rounded to a benchmark value that you specify. The \"inList\" plugin is required by this plugin. This plugin requires \"inList\" to be initialized as well.",
            "name": "Format Time",
            "display": true,
            "version": "2.0",
            "depricated": false
          },
          "getValOnce": {
            "id": "gvo",
            "obj": "tracker",
            "desc": "Prevents a variable from being set equal to the same value on consecutive calls.",
            "name": "Value Once",
            "display": true,
            "version": "3.0",
            "depricated": false
          },
          "manageVars": {
            "id": "mv",
            "obj": "tracker",
            "desc": "Manipulate the values of multiple Adobe Analytics variables at one time; this version includes specific functionality to lowercase or remove unnecessary characters from multiple variable values at the same time.",
            "name": "Manage Variables",
            "display": true,
            "version": "3.0",
            "depricated": false
          },
          "getPageName": {
            "id": "gpn",
            "obj": "window",
            "desc": "Creates a value that can be inserted into the Adobe Analytics pageName variable and that is an easy-to-read, \"friendly\"-formatted version of the current URL.",
            "name": "Page Name",
            "display": true,
            "version": "4.2",
            "depricated": false,
            "dataElement": true
          },
          "getVisitNum": {
            "id": "gvn",
            "obj": "tracker",
            "desc": "Visit number for all visitors that come to the site within a specific time period (e.g. \"x\" number of days).",
            "name": "Visit Number",
            "display": true,
            "version": "4.2",
            "depricated": false,
            "dataElement": true
          },
          "twoDecimals": {
            "display": false,
            "version": "1.0",
            "depricated": true
          },
          "getNewRepeat": {
            "id": "gnr",
            "obj": "tracker",
            "desc": "Determines whether a visitor to the site is a new visitor or a repeat visitor within the number of days that is specified in the plugin call.",
            "name": "New Repeat",
            "display": true,
            "version": "3.0",
            "depricated": false,
            "dataElement": true
          },
          "randomNumber": {
            "display": false,
            "version": "1.0",
            "depricated": true
          },
          "getQueryParam": {
            "id": "gqp",
            "obj": "tracker",
            "desc": "Case-insensitively extract the value of any query string parameter contained in a URL. This plugin requires \"pt\" to be initialized as well.",
            "name": "Query Parameter",
            "display": true,
            "version": "4.0.1",
            "depricated": false
          },
          "lowerCaseVars": {
            "display": false,
            "version": "1.0",
            "depricated": false
          },
          "addProductEvar": {
            "id": "apv",
            "obj": "tracker",
            "desc": "Easily add an Adobe Analytics merchandising eVar that uses product syntax to the products variable (s.products) without worrying whether the already-existing contents of the variable will be changed/moved/deleted.",
            "name": "Add Product eVar",
            "display": true,
            "version": "2.0",
            "depricated": false
          },
          "getTimeParting": {
            "id": "gtp",
            "obj": "window",
            "desc": "Capture the details of the time when any measurable activity takes place on its site.",
            "name": "Time Parting",
            "display": true,
            "version": "6.3",
            "depricated": false,
            "dataElement": true
          },
          "addProductEvent": {
            "id": "ape",
            "obj": "tracker",
            "desc": "Easily add an Adobe Analytics custom numeric event or custom currency event to the products variable (s.products) without worrying whether the already-existing contents of the variable will be changed/moved/deleted.",
            "name": "Add Product Event",
            "display": true,
            "version": "2.0",
            "depricated": false
          },
          "endOfDatePeriod": {
            "id": "eodp",
            "display": false,
            "version": "1.2",
            "depricated": false
          },
          "getPageLoadTime": {
            "id": "gplt",
            "obj": "tracker",
            "desc": "Uses the JavaScript performance object to allow you to measure the amount of time a page takes to load completely. This plugin requires \"p_fo\" to be initialized as well.",
            "name": "Page Load Time",
            "display": true,
            "version": "2.0",
            "depricated": false
          },
          "handlePPVevents": {
            "display": false,
            "version": "4.0",
            "depricated": false
          },
          "getPreviousValue": {
            "id": "gpv",
            "obj": "tracker",
            "desc": "Set an Analytics variable equal to the value of a variable that was set on a previous page or contained in a previous image request. This plugin requires \"p_fo\" to be initialized as well.",
            "name": "Previous Value",
            "display": true,
            "version": "3.0",
            "depricated": false
          },
          "getVisitDuration": {
            "id": "gvd",
            "obj": "tracker",
            "desc": "Amount of time (in minutes) that the visitor has been on the site up to that point.",
            "name": "Visit Duration",
            "display": true,
            "version": "2.1",
            "depricated": false,
            "dataElement": true
          },
          "performanceCheck": {
            "display": false,
            "version": "1.0",
            "depricated": false
          },
          "getGeoCoordinates": {
            "id": "ggc",
            "obj": "tracker",
            "desc": "Returns the geographic location (latitude and longitude) of the visitors device.",
            "name": "Geographic Coordinates",
            "display": true,
            "version": "2.0",
            "depricated": false,
            "dataElement": true
          },
          "getTimeToComplete": {
            "id": "gttc",
            "obj": "tracker",
            "desc": "Time a user takes to complete a process on a site. The \"clock\" begins when the \"start\" action is called and ends when the \"stop\" action is called. This plugin requires \"pt\" to be initialized as well.",
            "name": "Time To Complete",
            "display": true,
            "version": "4.0",
            "depricated": false
          },
          "getAndPersistValue": {
            "id": "gapv",
            "obj": "tracker",
            "desc": "Stores a value in a cookie that can be retrieved later during a visit.",
            "name": "Persist Value",
            "display": true,
            "version": "3.0",
            "depricated": false
          },
          "getResponsiveLayout": {
            "id": "grl",
            "obj": "window",
            "desc": "Which version of your responsive design-based website a visitor is currently looking at.",
            "name": "Responsive Layout",
            "display": true,
            "version": "1.1",
            "depricated": false,
            "dataElement": true
          },
          "getPercentPageViewed": {
            "id": "gppv",
            "obj": "tracker",
            "desc": "Measures a visitor's scroll activity to see how much of the page they viewed before moving to another page.",
            "name": "Percent Page Viewed",
            "display": true,
            "version": "5.0",
            "depricated": false
          },
          "getTimeBetweenEvents": {
            "id": "gtbe",
            "obj": "tracker",
            "desc": "Amount of time between two different Adobe Analytics events (custom or otherwise). This plugin requires \"inList\" to be initialized as well.",
            "name": "Time Between Events",
            "display": true,
            "version": "3.0",
            "depricated": false
          },
          "performanceWriteFull": {
            "display": false,
            "version": "1.0",
            "depricated": false
          },
          "performanceWritePart": {
            "display": false,
            "version": "1.0",
            "depricated": false
          },
          "getDaysSinceLastVisit": {
            "id": "gdslv",
            "obj": "tracker",
            "desc": "Returns the number of days since the visitor's last (most recent) visit. This plugin is deprecated. Adobe recommends using the getTimeSinceLastVisit plugin instead.",
            "name": "Days Since Last Visit",
            "display": true,
            "doclink": "//docs.adobe.com/content/help/en/analytics/implementation/vars/plugins/gettimesincelastvisit.html",
            "version": "3.0",
            "depricated": true
          },
          "getTimeSinceLastVisit": {
            "id": "gtslv",
            "obj": "tracker",
            "desc": "Returns the time since the visitor's last (most recent) visit.",
            "name": "Time Since Last Visit",
            "display": true,
            "version": "2.0",
            "depricated": false
          }
        },
        "modules": {
          "common-analytics-plugins/src/lib/actions/initialize.js": {
            "name": "initialize",
            "displayName": "Initialize",
            "script": function(module, exports, require, turbine) {
              'use strict';

              var initMany = require('./common').initMany;

              module.exports = function( settings ) {
                var si = settings, parray = [];

                //turbine.logger.error( JSON.stringify( si, null, '\t' ) );

                // plugins referenced by other plugins
                si.il   = si.il   || si.ft   || si.apl  || si.gtbe || si.gttc? true: false;
                si.pt   = si.pt   || si.gqp  || si.mv?                         true: false;
                si.ft   = si.ft   || si.gtbe || si.gttc?                       true: false;
                si.p_fo = si.p_fo || si.fpo  || si.gplt || si.gppv?            true: false;
                si.apl  = si.apl  || si.ape?                                   true: false;

                if( si.ns ) {
                  parray.push( { pname: 'zeroPad',               obj: 'window' }    );
                  parray.push( { pname: 'randomNumber',          obj: 'window' }    );
                  parray.push( { pname: 'twoDecimals',           obj: 'window' }    )
                }
                if( si.ggc ) {
                  parray.push( { pname: 'getGeoCoordinates',     obj: 'window'    } );
                  parray.push( { pname: 'getGeoCoordinates',     obj: 'analytics' } );
                }
                if( si.gnr ) {
                  parray.push( { pname: 'getNewRepeat',          obj: 'window'    } );
                  parray.push( { pname: 'getNewRepeat',          obj: 'analytics' } );
                }
                if( si.gpn )   parray.push( { pname: 'getPageName',           obj: 'window' }    );
                if( si.gnr )   parray.push( { pname: 'getTimeParting',        obj: 'window' }    );
                if( si.grl )   parray.push( { pname: 'getResponsiveLayout',   obj: 'window' }    );

                if( si.il )    parray.push( { pname: 'inList',                obj: 'analytics' } );
                if( si.ft )    parray.push( { pname: 'formatTime',            obj: 'analytics' } );
                if( si.pt )    parray.push( { pname: 'pt',                    obj: 'analytics' } );
                if( si.p_fo )  parray.push( { pname: 'p_fo',                  obj: 'analytics' } );
                if( si.apv )   parray.push( { pname: 'addProductEvar',        obj: 'analytics' } );
                if( si.ape )   parray.push( { pname: 'addProductEvent',       obj: 'analytics' } );
                if( si.apl )   parray.push( { pname: 'apl',                   obj: 'analytics' } );
                if( si.rfl )   parray.push( { pname: 'rfl',                   obj: 'analytics' } );
                if( si.gvo )   parray.push( { pname: 'getValOnce',            obj: 'analytics' } );
                if( si.gpv )   parray.push( { pname: 'getPreviousValue',      obj: 'analytics' } );
                if( si.gapv )  parray.push( { pname: 'getAndPersistValue',    obj: 'analytics' } );
                if( si.gtslv ) parray.push( { pname: 'getTimeSinceLastVisit', obj: 'analytics' } );
                if( si.gdslv ) parray.push( { pname: 'getDaysSinceLastVisit', obj: 'analytics' } );
                if( si.gqp )   parray.push( { pname: 'getQueryParam',         obj: 'analytics' } );
                if( si.gtbe )  parray.push( { pname: 'getTimeBetweenEvents',  obj: 'analytics' } );
                if( si.gtp )   parray.push( { pname: 'getTimeParting',        obj: 'window'    } );
                if( si.gttc )  parray.push( { pname: 'getTimeToComplete',     obj: 'analytics' } );
                if( si.gvd ) {
                  parray.push( { pname: 'getVisitDuration',      obj: 'window'    } );
                  parray.push( { pname: 'getVisitDuration',      obj: 'analytics' } );
                }
                if( si.gvn ) {
                  parray.push( { pname: 'getVisitNum',           obj: 'analytics' } );
                  parray.push( { pname: 'getVisitNum',           obj: 'window'    } );
                  parray.push( { pname: 'endOfDatePeriod',       obj: 'window'    } );
                }
                if( si.gplt ) {
                  parray.push( { pname: 'getPageLoadTime',       obj: 'analytics' } );
                  parray.push( { pname: 'performanceWriteFull',  obj: 'analytics' } );
                  parray.push( { pname: 'performanceWritePart',  obj: 'analytics' } );
                  parray.push( { pname: 'performanceCheck',      obj: 'analytics' } );
                }
                if( si.mv ) {
                  parray.push( { pname: 'manageVars',            obj: 'analytics' } );
                  parray.push( { pname: 'lowerCaseVars',         obj: 'analytics' } );
                }
                if( si.cs ) {
                  parray.push( { pname: 'cleanStr',              obj: 'analytics' } );
                  parray.push( { pname: 'cleanStr',              obj: 'window'    } )
                }
                if( si.gppv ) {
                  parray.push( { pname: 'getPercentPageViewed',  obj: 'analytics' } );
                  parray.push( { pname: 'handlePPVevents',       obj: 'analytics' } )
                }

                //turbine.logger.error (parray);

                initMany( parray );
              };
            }

          },
          "common-analytics-plugins/src/lib/main-module.js": {
            "script": function(module, exports, require, turbine) {
              'use strict';

// Write an error to the console if AA isn't in the Web Property
              if( turbine.getSharedModule('adobe-analytics', 'get-tracker') ) {} else { turbine.logger.error( 'The "Adobe Analytics" extension must be installed in the Launch web property (' + _satellite.property.name + ') in order to use the "Common Analytics Plugins" extension' ) }

              var augmentTracker = turbine.getSharedModule('adobe-analytics', 'augment-tracker');

// All Data Elements in this extension write the plugin name and version to the window.aaPlugins object.
// The following code moves the contents of window.aaPlugins to the AA s.contextData object so plugin
// versions are contained within all AA web beacons.
              augmentTracker(function(tracker) {
                if( typeof tracker.contextData === 'object' && typeof window.aaPlugins === 'object' ) {
                  for( var pf in window.aaPlugins ) {
                    tracker.contextData[pf] = window.aaPlugins[pf]
                  }
                }
              });
            }

          },
          "common-analytics-plugins/src/lib/actions/common.js": {
            "script": function(module, exports, require, turbine) {
// common.js for all Actions
              'use strict';

              var getObj = function( obj, tr ) { return obj==='analytics' || typeof obj === 'undefined'? tr: (obj==='window'? window: null ) },
                err = function( m ) { turbine.logger.error( 'common.js: ' + m ) },
                initAndSetVersion = function( pn, obj, tr ) {
                  obj[pn] = require('../plugins/allPlugins')[pn];
                  var cd = tr.contextData || {}, n,
                    pl = getVersionFromPlugin( pn, obj );
                  if( pl.version === 'n/a' ) pl = getVersionFromConfig( pn );
                  cd[ pn ] = pl.version
                },
                getVersionFromPlugin = function( pn, obj ) {  // get the plugin version from the plugin itself
                  var pl, v = { plugin: pn, version: 'n/a' };
                  try { pl = obj[pn]('-v') } catch(e) { pl = {} }
                  try { if( typeof pl.plugin !== 'string' || pl.plugin.length<1 ) pl = v } catch(e) { pl = v }
                  return pl
                },
                getVersionFromConfig = function( pn ) { // get the plugin version from the extension Configuration.html file
                  var ex = turbine.getExtensionSettings(), pl = { plugin: pn, version: 'n/a' }
                  try { pl.version = ex[pn].version } catch(e) { pl.version = 'n/a' }
                  return pl
                }

// this function is called by all the individual "initializeXYZ" actions
              module.exports.init = function( pluginName, obj ) {
                var augmentTracker = turbine.getSharedModule('adobe-analytics', 'augment-tracker'), ver, cd;
                augmentTracker(function(tracker) {
                  if( tracker ) {
                    obj = getObj( obj, tracker );
                    if( pluginName && obj ) initAndSetVersion( pluginName, obj, tracker );
                  }
                })
              }

// this function is called by the one "initialize action"
              module.exports.initMany = function(a) {
                var augmentTracker = turbine.getSharedModule('adobe-analytics', 'augment-tracker'), ver, cd, obj;
                augmentTracker(function(tracker) {
                  if( tracker ) {
                    for( var i=0; i<a.length; i++ ) {
                      obj = getObj( a[i].obj, tracker )
                      if( a[i].pname && obj ) initAndSetVersion( a[i].pname, obj, tracker );
                    }
                  }
                })
              }
            }

          },
          "common-analytics-plugins/src/lib/plugins/allPlugins.js": {
            "script": function(module, exports, require, turbine) {
              module.exports.addProductEvar = require('./addProductEvar').addProductEvar;
              module.exports.addProductEvent = require('./addProductEvent').addProductEvent;
              module.exports.apl = require('./apl').apl;
              module.exports.cleanStr = require('./cleanStr').cleanStr;
              module.exports.endOfDatePeriod = require('./endOfDatePeriod').endOfDatePeriod;
              module.exports.formatTime = require('./formatTime').formatTime;
              module.exports.getAndPersistValue = require('./getAndPersistValue').getAndPersistValue;
              module.exports.getDaysSinceLastVisit = require('./getDaysSinceLastVisit').getDaysSinceLastVisit;
              module.exports.getGeoCoordinates = require('./getGeoCoordinates').getGeoCoordinates;
              module.exports.getNewRepeat = require('./getNewRepeat').getNewRepeat;
              module.exports.getPageLoadTime = require('./getPageLoadTime').getPageLoadTime;
              module.exports.getPageName = require('./getPageName').getPageName;
              module.exports.getPreviousValue = require('./getPreviousValue').getPreviousValue;
              module.exports.getQueryParam = require('./getQueryParam').getQueryParam;
              module.exports.getResponsiveLayout = require('./getResponsiveLayout').getResponsiveLayout;
              module.exports.getTimeBetweenEvents = require('./getTimeBetweenEvents').getTimeBetweenEvents;
              module.exports.getTimeParting = require('./getTimeParting').getTimeParting;
              module.exports.getTimeSinceLastVisit = require('./getTimeSinceLastVisit').getTimeSinceLastVisit;
              module.exports.getTimeToComplete = require('./getTimeToComplete').getTimeToComplete;
              module.exports.getValOnce = require('./getValOnce').getValOnce;
              module.exports.getVisitDuration = require('./getVisitDuration').getVisitDuration;
              module.exports.getVisitNum = require('./getVisitNum').getVisitNum;
              module.exports.inList = require('./inList').inList;
              module.exports.lowerCaseVars = require('./lowerCaseVars').lowerCaseVars;
              module.exports.manageVars = require('./manageVars').manageVars;
              module.exports.p_fo = require('./p_fo').p_fo;
              module.exports.performanceCheck = require('./performanceCheck').performanceCheck;
              module.exports.performanceWriteFull = require('./performanceWriteFull').performanceWriteFull;
              module.exports.performanceWritePart = require('./performanceWritePart').performanceWritePart;
              module.exports.handlePPVevents = require('./handlePPVevents').handlePPVevents;
              module.exports.getPercentPageViewed = require('./getPercentPageViewed').getPercentPageViewed;
              module.exports.pt = require('./pt').pt;
              module.exports.rfl = require('./rfl').rfl;
              module.exports.twoDecimals = require('./twoDecimals').twoDecimals;
              module.exports.zeroPad = require('./zeroPad').zeroPad;
              module.exports.randomNumber = require('./randomNumber').randomNumber;
            }

          },
          "common-analytics-plugins/src/lib/plugins/addProductEvar.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: addProductEvar v2.0 */
              function addProductEvar(en,ev,ap){var e=en,f=ev,d=ap;if("-v"===e)return{plugin:"addProductEvar",version:"2.0"};a:{if("undefined"!==typeof window.s_c_il){var b=0;for(var c;b<window.s_c_il.length;b++)if(c=window.s_c_il[b],c._c&&"s_c"===c._c){b=c;break a}}b=void 0}if("undefined"!==typeof b&&(b.contextData.addProductEvar="2.0","string"===typeof e&&"string"===typeof f&&""!==f))if(d=d||!1,b.products){c=b.products.split(",");var g=c.length;d=d?0:g-1;for(var a;d<g;d++)a=c[d].split(";"),a[5]&&-1<a[5].toLowerCase().indexOf("evar")?a[5]=a[5]+"|"+e+"="+f:a[5]?a[5]=e+"="+f:a[5]||(a[4]||(a[4]=""),a[3]||(a[3]=""),a[2]||(a[2]=""),a[1]||(a[1]=""),a[5]=e+"="+f),c[d]=a.join(";");b.products=c.join(",")}else b.products=";;;;;"+e+"="+f};

              module.exports.addProductEvar = addProductEvar;
            }

          },
          "common-analytics-plugins/src/lib/plugins/addProductEvent.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: addProductEvent v2.0 */
              function addProductEvent(en,ev,ap){var f=en,g=ev,c=ap;if("-v"===f)return{plugin:"addProductEvent",version:"2.0"};var d=function(){if("undefined"!==typeof window.s_c_il)for(var b=0,e;b<window.s_c_il.length;b++)if(e=window.s_c_il[b],e._c&&"s_c"===e._c)return e}();if("undefined"!==typeof d&&(d.contextData.addProductEvent="2.0",window.apl=window.apl||function(b,e,c,d,f){function g(b,d,c,e){if("string"!==typeof d)return!1;if("string"===typeof b)b=b.split(c||",");else if("object"!==typeof b)return!1;c=0;for(a=b.length;c<a;c++)if(1==e&&d===b[c]||d.toLowerCase()===b[c].toLowerCase())return!0;return!1}if(!b||"string"===typeof b){if("string"!==typeof e||""===e)return b;c=c||",";d=d||c;1==d&&(d=c,f||(f=1));2==d&&1!=f&&(d=c);e=e.split(",");k=e.length;for(var h=0;h<k;h++)g(b,e[h],c,f)||(b=b?b+d+e[h]:e[h])}return b},"string"===typeof f))if(g=isNaN(g)?"1":String(g),c=c||!1,d.events=window.apl(d.events,f),d.products){var l=d.products.split(","),m=l.length;c=c?0:m-1;for(var b;c<m;c++)b=l[c].split(";"),b[4]&&-1<b[4].indexOf("event")?b[4]=b[4]+"|"+f+"="+g:b[5]?b[4]=f+"="+g:b[4]||(b[3]||(b[3]=""),b[2]||(b[2]=""),b[1]||(b[1]=""),b[4]=f+"="+g),l[c]=b.join(";");d.products=l.join(",")}else d.products=";;;;"+f+"="+g};

              module.exports.addProductEvent = addProductEvent;
            }

          },
          "common-analytics-plugins/src/lib/plugins/apl.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: apl (appendToList) v4.0 */
              function apl(lv,va,d1,d2,cc){var b=lv,d=va,e=d1,c=d2,g=cc;if("-v"===b)return{plugin:"apl",version:"4.0"};var h=function(){if("undefined"!==typeof window.s_c_il)for(var k=0,b;k<window.s_c_il.length;k++)if(b=window.s_c_il[k],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof h&&(h.contextData.apl="4.0");window.inList=window.inList||function(b,d,c,e){if("string"!==typeof d)return!1;if("string"===typeof b)b=b.split(c||",");else if("object"!==typeof b)return!1;c=0;for(a=b.length;c<a;c++)if(1==e&&d===b[c]||d.toLowerCase()===b[c].toLowerCase())return!0;return!1};if(!b||"string"===typeof b){if("string"!==typeof d||""===d)return b;e=e||",";c=c||e;1==c&&(c=e,g||(g=1));2==c&&1!=g&&(c=e);d=d.split(",");h=d.length;for(var f=0;f<h;f++)window.inList(b,d[f],e,g)||(b=b?b+c+d[f]:d[f])}return b};

              module.exports.apl = apl;
            }

          },
          "common-analytics-plugins/src/lib/plugins/cleanStr.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: cleanStr v2.0 (No Prerequisites Required) */
              function cleanStr(str){var a=str;if("-v"===a)return{plugin:"cleanStr",version:"2.0"};a:{if("undefined"!==typeof window.s_c_il){var b=0;for(var c;b<window.s_c_il.length;b++)if(c=window.s_c_il[b],c._c&&"s_c"===c._c){b=c;break a}}b=void 0}"undefined"!==typeof b&&(b.contextData.cleanStr="2.0");if("string"===typeof a){a=a.replace(/<\/?[^>]+(>|$)/g,"");a=a.trim();a=a.replace(/[\u2018\u2019\u201A]/g,"'");a=a.replace(/\t+/g,"");for(a=a.replace(/[\n\r]/g," ");-1<a.indexOf("  ");)a=a.replace(/\s\s/g," ");return a}return""}

              module.exports.cleanStr = cleanStr;
            }

          },
          "common-analytics-plugins/src/lib/plugins/endOfDatePeriod.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: endOfDatePeriod v1.2 (No Prerequisites Needed) */
              function endOfDatePeriod(dp){var c=dp;if("-v"===c)return{plugin:"endOfDatePeriod",version:"1.2"};var a=function(){if("undefined"!==typeof window.s_c_il)for(var a=0,b;a<window.s_c_il.length;a++)if(b=window.s_c_il[a],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof a&&(a.contextData.endOfDatePeriod="1.2");a=new Date;var d=isNaN(c)?0:Math.floor(c),e=function(a,b){return(new Date(b?b:1970,a?a:1,0)).getDate()};a.setHours(23);a.setMinutes(59);a.setSeconds(59);"w"===c&&(d=6-a.getDay());"m"===c&&(d=e(a.getMonth()+1,a.getFullYear())-a.getDate());a.setDate(a.getDate()+d);"y"===c&&(a.setMonth(11),a.setDate(31));return a};

              module.exports.endOfDatePeriod = endOfDatePeriod;
            }

          },
          "common-analytics-plugins/src/lib/plugins/formatTime.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: formatTime v2.0 */
              function formatTime(ns,tf,bml){var f=ns,d=tf,e=bml;function h(b,d,c,e){if("string"!==typeof d)return!1;if("string"===typeof b)b=b.split(c||",");else if("object"!==typeof b)return!1;c=0;for(a=b.length;c<a;c++)if(1==e&&d===b[c]||d.toLowerCase()===b[c].toLowerCase())return!0;return!1}if(arguments&&"-v"===arguments[0])return{plugin:"formatTime",version:"2.0"};var b=function(){if("undefined"!==typeof window.s_c_il)for(var b=0,c;b<window.s_c_il.length;b++)if(c=window.s_c_il[b],c._c&&"s_c"===c._c)return c}();"undefined"!==typeof b&&(b.contextData.formatTime="2.0");if(!("undefined"===typeof f||isNaN(f)||0>Number(f))){b="";if("string"===typeof d&&"d"===d||("string"!==typeof d||!h("h,m,s",d))&&86400<=f){var c=86400;var g="days";b=isNaN(e)?1:c/(e*c)}else"string"===typeof d&&"h"===d||("string"!==typeof d||!h("m,s",d))&&3600<=f?(c=3600,g="hours",b=isNaN(e)?4:c/(e*c)):"string"===typeof d&&"m"===d||("string"!==typeof d||!h("s",d))&&60<=f?(c=60,g="minutes",b=isNaN(e)?2:c/(e*c)):(c=1,g="seconds",b=isNaN(e)?.2:c/e);b=Math.round(f*b/c)/b+" "+g;0===b.indexOf("1 ")&&(b=b.substring(0,b.length-1));return b}};

              module.exports.formatTime = formatTime;
            }

          },
          "common-analytics-plugins/src/lib/plugins/getAndPersistValue.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getAndPersistValue v3.0.1 (Requires AppMeasurement) */
              function getAndPersistValue(vtp,cn,ex){var d=vtp,k=cn,l=ex;if("undefined"!==typeof d&&"-v"===d)return{plugin:"getAndPersistValue",version:"3.0.1"};var a=function(){if("undefined"!==typeof window.s_c_il)for(var c=0,b;c<window.s_c_il.length;c++)if(b=window.s_c_il[c],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof a&&(a.contextData.getAndPersistValue="3.0.1");window.cookieWrite=window.cookieWrite||function(c,b,f){if("string"===typeof c){var h=window.location.hostname,a=window.location.hostname.split(".").length-1;if(h&&!/^[0-9.]+$/.test(h)){a=2<a?a:2;var e=h.lastIndexOf(".");if(0<=e){for(;0<=e&&1<a;)e=h.lastIndexOf(".",e-1),a--;e=0<e?h.substring(e):h}}g=e;b="undefined"!==typeof b?""+b:"";if(f||""===b)if(""===b&&(f=-60),"number"===typeof f){var d=new Date;d.setTime(d.getTime()+6E4*f)}else d=f;return c&&(document.cookie=encodeURIComponent(c)+"="+encodeURIComponent(b)+"; secure; path=/;"+(f?" expires="+d.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof cookieRead)?cookieRead(c)===b:!1}};window.cookieRead=window.cookieRead||function(c){if("string"===typeof c)c=encodeURIComponent(c);else return"";var b=" "+document.cookie,a=b.indexOf(" "+c+"="),d=0>a?a:b.indexOf(";",a);return(c=0>a?"":decodeURIComponent(b.substring(a+2+c.length,0>d?b.length:d)))?c:""};a=new Date;k=k?k:"s_gapv";(l=l?l:0)?a.setTime(a.getTime()+864E5*l):a.setTime(a.getTime()+18E5);"undefined"!==typeof d&&d||(d=cookieRead(k));cookieWrite(k,d,a);return d};

              module.exports.getAndPersistValue = getAndPersistValue;

            }

          },
          "common-analytics-plugins/src/lib/plugins/getDaysSinceLastVisit.js": {
            "script": function(module, exports, require, turbine) {
//v3.0 Deprecated
              function getDaysSinceLastVisit(){var a=new Date,b=a.getTime(),c=this.c_r("s_dslv");a.setTime(b+94608E6);this.c_w("s_dslv",b,a);if(c){a=b-c;if(18E5<a){if(31536E6<a)return"More than a year";if(2592E6<a)return"More than 30 days";if(a<2592E6+1&&6048E5<a)return"More than 7 days";if(a<6048E5+1&&864E5<a)return"Less than 7 days";if(a<864E5+1)return"Less than 1 day"}return""}return"New Visitor"}

              module.exports.getDaysSinceLastVisit = getDaysSinceLastVisit;
            }

          },
          "common-analytics-plugins/src/lib/plugins/getGeoCoordinates.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getGeoCoordinates v2.0.1  */
              function getGeoCoordinates(){if(arguments&&"-v"===arguments[0])return{plugin:"getGeoCoordinates",version:"2.0.1"};var b=function(){if("undefined"!==typeof window.s_c_il)for(var a=0,c;a<window.s_c_il.length;a++)if(c=window.s_c_il[a],c._c&&"s_c"===c._c)return c}();"undefined"!==typeof b&&(b.contextData.getGeoCoordinates="2.0.1");window.cookieWrite=window.cookieWrite||function(a,c,f){if("string"===typeof a){var h=window.location.hostname,b=window.location.hostname.split(".").length-1;if(h&&!/^[0-9.]+$/.test(h)){b=2<b?b:2;var e=h.lastIndexOf(".");if(0<=e){for(;0<=e&&1<b;)e=h.lastIndexOf(".",e-1),b--;e=0<e?h.substring(e):h}}g=e;c="undefined"!==typeof c?""+c:"";if(f||""===c)if(""===c&&(f=-60),"number"===typeof f){var d=new Date;d.setTime(d.getTime()+6E4*f)}else d=f;return a&&(document.cookie=encodeURIComponent(a)+"="+encodeURIComponent(c)+"; secure; path=/;"+(f?" expires="+d.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof cookieRead)?cookieRead(a)===c:!1}};window.cookieRead=window.cookieRead||function(a){if("string"===typeof a)a=encodeURIComponent(a);else return"";var c=" "+document.cookie,b=c.indexOf(" "+a+"="),d=0>b?b:c.indexOf(";",b);return(a=0>b?"":decodeURIComponent(c.substring(b+2+a.length,0>d?c.length:d)))?a:""};var d="";b=cookieRead("s_ggc").split("|");var k={timeout:5E3,maximumAge:0},l=function(a){a=a.coords;cookieWrite("s_ggc",parseFloat(a.latitude.toFixed(4))+"|"+parseFloat(a.longitude.toFixed(4)),30);d="latitude="+parseFloat(a.latitude.toFixed(4))+" | longitude="+parseFloat(a.longitude.toFixed(4))},m=function(a){d="error retrieving geo coordinates"};1<b.length&&(d="latitude="+b[0]+" | longitude="+b[1]);navigator.geolocation&&navigator.geolocation.getCurrentPosition(l,m,k);""===d&&(d="geo coordinates not available");return d};

              module.exports.getGeoCoordinates = getGeoCoordinates;

            }

          },
          "common-analytics-plugins/src/lib/plugins/getNewRepeat.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getNewRepeat v3.0.1 (Requires AppMeasurement) */
              function getNewRepeat(d){var a=d;if("-v"===a)return{plugin:"getNewRepeat",version:"3.0.1"};var d=function(){if("undefined"!==typeof window.s_c_il)for(var c=0,b;c<window.s_c_il.length;c++)if(b=window.s_c_il[c],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof d&&(d.contextData.getNewRepeat="3.0.1");window.cookieWrite=window.cookieWrite||function(c,b,f){if("string"===typeof c){var h=window.location.hostname,a=window.location.hostname.split(".").length-1;if(h&&!/^[0-9.]+$/.test(h)){a=2<a?a:2;var e=h.lastIndexOf(".");if(0<=e){for(;0<=e&&1<a;)e=h.lastIndexOf(".",e-1),a--;e=0<e?h.substring(e):h}}g=e;b="undefined"!==typeof b?""+b:"";if(f||""===b)if(""===b&&(f=-60),"number"===typeof f){var d=new Date;d.setTime(d.getTime()+6E4*f)}else d=f;return c&&(document.cookie=encodeURIComponent(c)+"="+encodeURIComponent(b)+"; secure; path=/;"+(f?" expires="+d.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof cookieRead)?cookieRead(c)===b:!1}};window.cookieRead=window.cookieRead||function(c){if("string"===typeof c)c=encodeURIComponent(c);else return"";var b=" "+document.cookie,a=b.indexOf(" "+c+"="),d=0>a?a:b.indexOf(";",a);return(c=0>a?"":decodeURIComponent(b.substring(a+2+c.length,0>d?b.length:d)))?c:""};a=a?a:30;d="s_nr"+a;var k=new Date,m=cookieRead(d),n=m.split("-"),l=k.getTime();k.setTime(l+864E5*a);if(""===m||18E5>l-n[0]&&"New"===n[1])return cookieWrite(d,l+"-New",k),"New";cookieWrite(d,l+"-Repeat",k);return"Repeat"};

              module.exports.getNewRepeat = getNewRepeat;

            }

          },
          "common-analytics-plugins/src/lib/plugins/getPageLoadTime.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getPageLoadTime v2.0.2 */

              function getPageLoadTime(){function l(){var a=performance.timing;if(0<a.loadEventEnd&&(clearInterval(window.pi),""===window.cookieRead("s_plt"))){var b=window,d=b.cookieWrite;var c=a.loadEventEnd;var f=a.navigationStart;c=0<=c&&0<=f?6E4>c-f&&0<=c-f?parseFloat((c-f)/1E3).toFixed(2):60:void 0;d.call(b,"s_plt",c);window.cookieWrite("s_pltp",window.pageName)}window.ptc=a.loadEventEnd}if(arguments&&"-v"===arguments[0])return{plugin:"getPageLoadTime",version:"2.0.2"};var e=function(){if("undefined"!==typeof window.s_c_il)for(var a=0,b;a<window.s_c_il.length;a++)if(b=window.s_c_il[a],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof e&&(e.contextData.getPageLoadTime="2.0.2");window.pageName="undefined"!==typeof e&&e.pageName||"";window.cookieWrite=window.cookieWrite||function(a,b,d){if("string"===typeof a){var c=window.location.hostname,f=window.location.hostname.split(".").length-1;if(c&&!/^[0-9.]+$/.test(c)){f=2<f?f:2;var h=c.lastIndexOf(".");if(0<=h){for(;0<=h&&1<f;)h=c.lastIndexOf(".",h-1),f--;h=0<h?c.substring(h):c}}g=h;b="undefined"!==typeof b?""+b:"";if(d||""===b)if(""===b&&(d=-60),"number"===typeof d){var k=new Date;k.setTime(k.getTime()+6E4*d)}else k=d;return a&&(document.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+"; secure; path=/;"+(d?" expires="+k.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof cookieRead)?cookieRead(a)===b:!1}};window.cookieRead=window.cookieRead||function(a){if("string"===typeof a)a=encodeURIComponent(a);else return"";var b=" "+document.cookie,d=b.indexOf(" "+a+"="),c=0>d?d:b.indexOf(";",d);return(a=0>d?"":decodeURIComponent(b.substring(d+2+a.length,0>c?b.length:c)))?a:""};window.p_fo=window.p_fo||function(a){window.__fo||(window.__fo={});if(window.__fo[a])return!1;window.__fo[a]={};return!0};"undefined"!==typeof performance&&p_fo("performance")&&((e=performance,e.clearResourceTimings(),""!==window.cookieRead("s_plt")&&(0<e.timing.loadEventEnd&&clearInterval(window.pi),this._pltLoadTime=window.cookieRead("s_plt"),this._pltPreviousPage=window.cookieRead("s_pltp"),window.cookieWrite("s_plt",""),window.cookieWrite("s_pltp","")),0===e.timing.loadEventEnd)?window.pi=setInterval(function(){l()},250):0<e.timing.loadEventEnd&&(window.ptc?window.ptc===e.timing.loadEventEnd&&1===e.getEntries().length&&(window.pwp=setInterval(function(){var a=performance;0<a.getEntries().length&&(window.ppfe===a.getEntries().length?clearInterval(window.pwp):window.ppfe=a.getEntries().length);""===window.cookieRead("s_plt")&&(window.cookieWrite("s_plt",((a.getEntries()[a.getEntries().length-1].responseEnd-a.getEntries()[0].startTime)/1E3).toFixed(2)),window.cookieWrite("s_pltp",window.pageName))},500)):l()))};

              module.exports.getPageLoadTime = getPageLoadTime;

            }

          },
          "common-analytics-plugins/src/lib/plugins/getPageName.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getPageName v4.2 */
              var getPageName=function(si,qv,hv,de){var a=si,b=qv,f=hv,e=de;if("-v"===a)return{plugin:"getPageName",version:"4.2"};a:{if("undefined"!==typeof window.s_c_il){var d=0;for(var g;d<window.s_c_il.length;d++)if(g=window.s_c_il[d],g._c&&"s_c"===g._c){d=g;break a}}d=void 0}"undefined"!==typeof d&&(d.contextData.getPageName="4.2");var c=location.hostname,h=location.pathname.substring(1).split("/"),l=h.length,k=location.search.substring(1).split("&"),m=k.length;d=location.hash.substring(1).split("&");g=d.length;e=e?e:"|";a=a?a:c;b=b?b:"";f=f?f:"";if(1===l&&""===h[0])a=a+e+"home";else for(c=0;c<l;c++)a=a+e+decodeURIComponent(h[c]);if(b&&(1!==m||""!==k[0]))for(h=b.split(","),l=h.length,c=0;c<l;c++)for(b=0;b<m;b++)if(h[c]===k[b].split("=")[0]){a=a+e+decodeURIComponent(k[b]);break}if(f&&(1!==g||""!==d[0]))for(f=f.split(","),k=f.length,c=0;c<k;c++)for(b=0;b<g;b++)if(f[c]===d[b].split("=")[0]){a=a+e+decodeURIComponent(d[b]);break}return a.substring(a.length-e.length)===e?a.substring(0,a.length-e.length):a};

              module.exports.getPageName = getPageName;
            }

          },
          "common-analytics-plugins/src/lib/plugins/getPreviousValue.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getPreviousValue v3.0.1 */
              function getPreviousValue(v,c){var k=v,d=c;if("-v"===k)return{plugin:"getPreviousValue",version:"3.0.1"};var a=function(){if("undefined"!==typeof window.s_c_il)for(var c=0,b;c<window.s_c_il.length;c++)if(b=window.s_c_il[c],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof a&&(a.contextData.getPreviousValue="3.0.1");window.cookieWrite=window.cookieWrite||function(c,b,f){if("string"===typeof c){var h=window.location.hostname,a=window.location.hostname.split(".").length-1;if(h&&!/^[0-9.]+$/.test(h)){a=2<a?a:2;var e=h.lastIndexOf(".");if(0<=e){for(;0<=e&&1<a;)e=h.lastIndexOf(".",e-1),a--;e=0<e?h.substring(e):h}}g=e;b="undefined"!==typeof b?""+b:"";if(f||""===b)if(""===b&&(f=-60),"number"===typeof f){var d=new Date;d.setTime(d.getTime()+6E4*f)}else d=f;return c&&(document.cookie=encodeURIComponent(c)+"="+encodeURIComponent(b)+"; secure; path=/;"+(f?" expires="+d.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof cookieRead)?cookieRead(c)===b:!1}};window.cookieRead=window.cookieRead||function(c){if("string"===typeof c)c=encodeURIComponent(c);else return"";var b=" "+document.cookie,a=b.indexOf(" "+c+"="),d=0>a?a:b.indexOf(";",a);return(c=0>a?"":decodeURIComponent(b.substring(a+2+c.length,0>d?b.length:d)))?c:""};var l;d=d||"s_gpv";a=new Date;a.setTime(a.getTime()+18E5);window.cookieRead(d)&&(l=window.cookieRead(d));k?window.cookieWrite(d,k,a):window.cookieWrite(d,l,a);return l};

              module.exports.getPreviousValue = getPreviousValue;

            }

          },
          "common-analytics-plugins/src/lib/plugins/getQueryParam.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getQueryParam v4.0.1 (Requires AppMeasurement and pt plugin) */
              function getQueryParam(a,d,f){function n(g,c){c=c.split("?").join("&");c=c.split("#").join("&");var e=c.indexOf("&");if(g&&(-1<e||c.indexOf("=")>e)){e=c.substring(e+1);e=e.split("&");for(var h=0,p=e.length;h<p;h++){var l=e[h].split("="),q=l[1];if(l[0].toLowerCase()===g.toLowerCase())return decodeURIComponent(q||!0)}}return""}if("-v"===a)return{plugin:"getQueryParam",version:"4.0.1"};var b=function(){if("undefined"!==typeof window.s_c_il)for(var g=0,c;g<window.s_c_il.length;g++)if(c=window.s_c_il[g],c._c&&"s_c"===c._c)return c}();"undefined"!==typeof b&&(b.contextData.getQueryParam="4.0");if(a){d=d||"";f=(f||"undefined"!==typeof b&&b.pageURL||location.href)+"";(4<d.length||-1<d.indexOf("="))&&f&&4>f.length&&(b=d,d=f,f=b);b="";for(var m=a.split(","),r=m.length,k=0;k<r;k++)a=n(m[k],f),"string"===typeof a?(a=-1<a.indexOf("#")?a.substring(0,a.indexOf("#")):a,b+=b?d+a:a):b=""===b?a:b+(d+a);return b}};

              module.exports.getQueryParam = getQueryParam;
            }

          },
          "common-analytics-plugins/src/lib/plugins/getResponsiveLayout.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getResponsiveLayout v1.1 (Requires AppMeasurement) */
              var getResponsiveLayout=function(ppw,plw,tw){var c=ppw,b=plw,e=tw;if("-v"===c)return{plugin:"getResponsiveLayout",version:"1.1"};a:{if("undefined"!==typeof window.s_c_il){var a=0;for(var d;a<window.s_c_il.length;a++)if(d=window.s_c_il[a],d._c&&"s_c"===d._c){a=d;break a}}a=void 0}"undefined"!==typeof a&&(a.contextData.getResponsiveLayout="1.1");if(!(isNaN(c)||isNaN(b)||isNaN(e)||b<c||e<b))return a=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,(c<b&&a<=b?a<=c?"phone portrait layout":"phone landscape layout":a<=b?"phone layout":a<=e?"tablet layout":"desktop layout")+":"+a+"x"+(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight)};

              module.exports.getResponsiveLayout = getResponsiveLayout;
            }

          },
          "common-analytics-plugins/src/lib/plugins/getTimeBetweenEvents.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getTimeBetweenEvents v3.0.1 (AppMeasurement highly recommended) */
              function getTimeBetweenEvents(ste,rt,stp,res,cn,etd,fmt,bml,rte){var v=ste,B=rt,x=stp,C=res,k=cn,m=etd,E=fmt,F=bml,p=rte;if("-v"===v)return{plugin:"getTimeBetweenEvents",version:"3.0.1"};var q=function(){if("undefined"!==typeof window.s_c_il)for(var c=0,b;c<window.s_c_il.length;c++)if(b=window.s_c_il[c],b._c&&"s_c"===b._c)return b}();if("undefined"!==typeof q&&(q.contextData.getTimeBetweenEvents="3.0.1",window.cookieWrite=window.cookieWrite||function(c,b,d){if("string"===typeof c){var n=window.location.hostname,f=window.location.hostname.split(".").length-1;if(n&&!/^[0-9.]+$/.test(n)){f=2<f?f:2;var l=n.lastIndexOf(".");if(0<=l){for(;0<=l&&1<f;)l=n.lastIndexOf(".",l-1),f--;l=0<l?n.substring(l):n}}g=l;b="undefined"!==typeof b?""+b:"";if(d||""===b)if(""===b&&(d=-60),"number"===typeof d){var e=new Date;e.setTime(e.getTime()+6E4*d)}else e=d;return c&&(document.cookie=encodeURIComponent(c)+"="+encodeURIComponent(b)+"; secure; path=/;"+(d?" expires="+e.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof window.cookieRead)?window.cookieRead(c)===b:!1}},window.cookieRead=window.cookieRead||function(c){if("string"===typeof c)c=encodeURIComponent(c);else return"";var b=" "+document.cookie,d=b.indexOf(" "+c+"="),e=0>d?d:b.indexOf(";",d);return(c=0>d?"":decodeURIComponent(b.substring(d+2+c.length,0>e?b.length:e)))?c:""},window.formatTime=window.formatTime||function(c,b,d){function e(b,d,c,e){if("string"!==typeof d)return!1;if("string"===typeof b)b=b.split(c||",");else if("object"!==typeof b)return!1;c=0;for(a=b.length;c<a;c++)if(1==e&&d===b[c]||d.toLowerCase()===b[c].toLowerCase())return!0;return!1}if(!("undefined"===typeof c||isNaN(c)||0>Number(c))){var f="";"string"===typeof b&&"d"===b||("string"!==typeof b||!e("h,m,s",b))&&86400<=c?(b=86400,f="days",d=isNaN(d)?1:b/(d*b)):"string"===typeof b&&"h"===b||("string"!==typeof b||!e("m,s",b))&&3600<=c?(b=3600,f="hours",d=isNaN(d)?4:b/(d*b)):"string"===typeof b&&"m"===b||("string"!==typeof b||!e("s",b))&&60<=c?(b=60,f="minutes",d=isNaN(d)?2:b/(d*b)):(b=1,f="seconds",d=isNaN(d)?.2:b/d);f=Math.round(c*d/b)/d+" "+f;0===f.indexOf("1 ")&&(f=f.substring(0,f.length-1));return f}},window.inList=window.inList||function(c,b,d,e){if("string"!==typeof b)return!1;if("string"===typeof c)c=c.split(d||",");else if("object"!==typeof c)return!1;d=0;for(a=c.length;d<a;d++)if(1==e&&b===c[d]||b.toLowerCase()===c[d].toLowerCase())return!0;return!1},"string"===typeof v&&"undefined"!==typeof B&&"string"===typeof x&&"undefined"!==typeof C)){k=k?k:"s_tbe";m=isNaN(m)?1:Number(m);var r=!1,t=!1,y=v.split(","),z=x.split(",");p=p?p.split(","):[];for(var u=window.cookieRead(k),w,D=new Date,A=D.getTime(),h=new Date,e=0;e<p.length;++e)if(window.inList(q.events,p[e])){h.setDate(h.getDate()-1);window.cookieWrite(k,"",h);return}h.setTime(h.getTime()+864E5*m);for(e=0;e<y.length&&!r&&(r=window.inList(q.events,y[e]),!0!==r);++e);for(e=0;e<z.length&&!t&&(t=window.inList(q.events,z[e]),!0!==t);++e);1===y.length&&1===z.length&&v===x&&r&&t?(u&&(w=(A-u)/1E3),window.cookieWrite(k,A,m?h:0)):(!r||1!=B&&u||window.cookieWrite(k,A,m?h:0),t&&u&&(w=(D.getTime()-u)/1E3,!0===C&&(h.setDate(h.getDate()-1),window.cookieWrite(k,"",h))));return w?window.formatTime(w,E,F):""}};

              module.exports.getTimeBetweenEvents = getTimeBetweenEvents;

            }

          },
          "common-analytics-plugins/src/lib/plugins/getTimeParting.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getTimeParting v6.3 (No Prerequisites Needed) */
              function getTimeParting(t){var c=t;if("-v"===t)return{plugin:"getTimeParting",version:"6.3"};a:{if("undefined"!==typeof window.s_c_il){var a=0;for(var b;a<window.s_c_il.length;a++)if(b=window.s_c_il[a],b._c&&"s_c"===b._c){a=b;break a}}a=void 0}"undefined"!==typeof a&&(a.contextData.getTimeParting="6.3");c=document.documentMode?void 0:c||"Etc/GMT";a=(new Date).toLocaleDateString("en-US",{timeZone:c,minute:"numeric",hour:"numeric",weekday:"long",day:"numeric",year:"numeric",month:"long"});a=/([a-zA-Z]+).*?([a-zA-Z]+).*?([0-9]+).*?([0-9]+)(.*?)([0-9])(.*)/.exec(a);return"year="+a[4]+" | month="+a[2]+" | date="+a[3]+" | day="+a[1]+" | time="+(a[6]+a[7])};

              module.exports.getTimeParting = getTimeParting;
            }

          },
          "common-analytics-plugins/src/lib/plugins/getTimeSinceLastVisit.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getTimeSinceLastVisit v2.0.1 */
              function getTimeSinceLastVisit(){if(arguments&&"-v"===arguments[0])return{plugin:"getTimeSinceLastVisit",version:"2.0.1"};var h=function(){if("undefined"!==typeof window.s_c_il)for(var c=0,b;c<window.s_c_il.length;c++)if(b=window.s_c_il[c],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof h&&(h.contextData.getTimeSinceLastVisit="2.0.1");window.formatTime=window.formatTime||function(c,b,d){function f(b,d,c,e){if("string"!==typeof d)return!1;if("string"===typeof b)b=b.split(c||",");else if("object"!==typeof b)return!1;c=0;for(a=b.length;c<a;c++)if(1==e&&d===b[c]||d.toLowerCase()===b[c].toLowerCase())return!0;return!1}if(!("undefined"===typeof c||isNaN(c)||0>Number(c))){var e="";"string"===typeof b&&"d"===b||("string"!==typeof b||!f("h,m,s",b))&&86400<=c?(b=86400,e="days",d=isNaN(d)?1:b/(d*b)):"string"===typeof b&&"h"===b||("string"!==typeof b||!f("m,s",b))&&3600<=c?(b=3600,e="hours",d=isNaN(d)?4:b/(d*b)):"string"===typeof b&&"m"===b||("string"!==typeof b||!f("s",b))&&60<=c?(b=60,e="minutes",d=isNaN(d)?2:b/(d*b)):(b=1,e="seconds",d=isNaN(d)?.2:b/d);e=Math.round(c*d/b)/d+" "+e;0===e.indexOf("1 ")&&(e=e.substring(0,e.length-1));return e}};window.cookieWrite=window.cookieWrite||function(c,b,d){if("string"===typeof c){var f=window.location.hostname,e=window.location.hostname.split(".").length-1;if(f&&!/^[0-9.]+$/.test(f)){e=2<e?e:2;var k=f.lastIndexOf(".");if(0<=k){for(;0<=k&&1<e;)k=f.lastIndexOf(".",k-1),e--;k=0<k?f.substring(k):f}}g=k;b="undefined"!==typeof b?""+b:"";if(d||""===b)if(""===b&&(d=-60),"number"===typeof d){var h=new Date;h.setTime(h.getTime()+6E4*d)}else h=d;return c&&(document.cookie=encodeURIComponent(c)+"="+encodeURIComponent(b)+"; secure; path=/;"+(d?" expires="+h.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof cookieRead)?cookieRead(c)===b:!1}};window.cookieRead=window.cookieRead||function(c){if("string"===typeof c)c=encodeURIComponent(c);else return"";var b=" "+document.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);return(c=0>d?"":decodeURIComponent(b.substring(d+2+c.length,0>f?b.length:f)))?c:""};h=new Date;var m=h.getTime(),n=cookieRead("s_tslv")||0,l=Math.round((m-n)/1E3);h.setTime(m+63072E6);cookieWrite("s_tslv",m,h);return n?1800<l||cookieRead("s_inv")?(cookieRead("s_inv")&&(l=cookieRead("s_inv")),cookieWrite("s_inv",l,30),"0"!==l?formatTime(l):"New Visitor"):"":(cookieWrite("s_inv","0",30),"New Visitor")};

              module.exports.getTimeSinceLastVisit = getTimeSinceLastVisit;

            }

          },
          "common-analytics-plugins/src/lib/plugins/getTimeToComplete.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getTimeToComplete v4.0.1 */
              function getTimeToComplete(sos,cn,exp,tp){var f=sos,m=cn,l=exp,e=tp;if("-v"===f)return{plugin:"getTimeToComplete",version:"4.0.1"};var k=function(){if("undefined"!==typeof window.s_c_il)for(var c=0,b;c<window.s_c_il.length;c++)if(b=window.s_c_il[c],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof k&&(k.contextData.getTimeToComplete="4.0.1");window.formatTime=window.formatTime||function(c,b,d){function e(b,d,c,e){if("string"!==typeof d)return!1;if("string"===typeof b)b=b.split(c||",");else if("object"!==typeof b)return!1;c=0;for(a=b.length;c<a;c++)if(1==e&&d===b[c]||d.toLowerCase()===b[c].toLowerCase())return!0;return!1}if(!("undefined"===typeof c||isNaN(c)||0>Number(c))){var h="";"string"===typeof b&&"d"===b||("string"!==typeof b||!e("h,m,s",b))&&86400<=c?(b=86400,h="days",d=isNaN(d)?1:b/(d*b)):"string"===typeof b&&"h"===b||("string"!==typeof b||!e("m,s",b))&&3600<=c?(b=3600,h="hours",d=isNaN(d)?4:b/(d*b)):"string"===typeof b&&"m"===b||("string"!==typeof b||!e("s",b))&&60<=c?(b=60,h="minutes",d=isNaN(d)?2:b/(d*b)):(b=1,h="seconds",d=isNaN(d)?.2:b/d);h=Math.round(c*d/b)/d+" "+h;0===h.indexOf("1 ")&&(h=h.substring(0,h.length-1));return h}};window.cookieWrite=window.cookieWrite||function(c,b,d){if("string"===typeof c){var e=window.location.hostname,h=window.location.hostname.split(".").length-1;if(e&&!/^[0-9.]+$/.test(e)){h=2<h?h:2;var f=e.lastIndexOf(".");if(0<=f){for(;0<=f&&1<h;)f=e.lastIndexOf(".",f-1),h--;f=0<f?e.substring(f):e}}g=f;b="undefined"!==typeof b?""+b:"";if(d||""===b)if(""===b&&(d=-60),"number"===typeof d){var k=new Date;k.setTime(k.getTime()+6E4*d)}else k=d;return c&&(document.cookie=encodeURIComponent(c)+"="+encodeURIComponent(b)+"; secure; path=/;"+(d?" expires="+k.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof cookieRead)?cookieRead(c)===b:!1}};window.cookieRead=window.cookieRead||function(c){if("string"===typeof c)c=encodeURIComponent(c);else return"";var b=" "+document.cookie,d=b.indexOf(" "+c+"="),e=0>d?d:b.indexOf(";",d);return(c=0>d?"":decodeURIComponent(b.substring(d+2+c.length,0>e?b.length:e)))?c:""};f=f?f.toLowerCase():"start";if("stop"===f||"start"===f){m=m?m:"s_gttc";e?e="d"===e?864E5:"h"===e?36E5:"s"===e?1E3:6E4:(l=30,e=6E4);l=isNaN(l)?30:l;l*=e;k=cookieRead(m);e=new Date;if("stop"===f&&k)return l=Math.round((e.getTime()-k)/1E3),cookieWrite(m,"",0),formatTime(l);"start"!==f||k?k&&Number(k)<e.getTime()+18E5&&cookieWrite(m,k,30):(f=String(e.getTime()),e.setTime(e.getTime()+l),cookieWrite(m,f,e))}};

              module.exports.getTimeToComplete = getTimeToComplete;

            }

          },
          "common-analytics-plugins/src/lib/plugins/getValOnce.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getValOnce v3.0.1 (Requires AppMeasurement) */
              function getValOnce(vtc,cn,et,ep){var e=vtc,k=cn,l=et,m=ep;if(arguments&&"-v"===arguments[0])return{plugin:"getValOnce",version:"3.0.1"};var c=function(){if("undefined"!==typeof window.s_c_il)for(var b=0,a;b<window.s_c_il.length;b++)if(a=window.s_c_il[b],a._c&&"s_c"===a._c)return a}();"undefined"!==typeof c&&(c.contextData.getValOnce="3.0.1");window.cookieWrite=window.cookieWrite||function(b,a,d){if("string"===typeof b){var h=window.location.hostname,c=window.location.hostname.split(".").length-1;if(h&&!/^[0-9.]+$/.test(h)){c=2<c?
                c:2;var f=h.lastIndexOf(".");if(0<=f){for(;0<=f&&1<c;)f=h.lastIndexOf(".",f-1),c--;f=0<f?h.substring(f):h}}g=f;a="undefined"!==typeof a?""+a:"";if(d||""===a)if(""===a&&(d=-60),"number"===typeof d){var e=new Date;e.setTime(e.getTime()+6E4*d)}else e=d;return b&&(document.cookie=encodeURIComponent(b)+"="+encodeURIComponent(a)+"; secure; path=/;"+(d?" expires="+e.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof cookieRead)?cookieRead(b)===a:!1}};window.cookieRead=window.cookieRead||function(b){if("string"===
                typeof b)b=encodeURIComponent(b);else return"";var a=" "+document.cookie,d=a.indexOf(" "+b+"="),c=0>d?d:a.indexOf(";",d);return(b=0>d?"":decodeURIComponent(a.substring(d+2+b.length,0>c?a.length:c)))?b:""};return e&&(k=k||"s_gvo",l=l||0,m="m"===m?6E4:864E5,e!==this.c_r(k))?(c=new Date,c.setTime(c.getTime()+l*m),cookieWrite(k,e,0===l?0:m),e):""};

              module.exports.getValOnce = getValOnce;

            }

          },
          "common-analytics-plugins/src/lib/plugins/getVisitDuration.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getVisitDuration v2.1.1 */
              function getVisitDuration(){if(arguments&&"-v"===arguments[0])return{plugin:"getVisitDuration",version:"2.1.1"};var d=function(){if("undefined"!==typeof window.s_c_il)for(var c=0,b;c<window.s_c_il.length;c++)if(b=window.s_c_il[c],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof d&&(d.contextData.getVisitDuration="2.1.1");window.cookieWrite=window.cookieWrite||function(c,b,f){if("string"===typeof c){var h=window.location.hostname,a=window.location.hostname.split(".").length-1;if(h&&!/^[0-9.]+$/.test(h)){a=2<a?a:2;var e=h.lastIndexOf(".");if(0<=e){for(;0<=e&&1<a;)e=h.lastIndexOf(".",e-1),a--;e=0<e?h.substring(e):h}}g=e;b="undefined"!==typeof b?""+b:"";if(f||""===b)if(""===b&&(f=-60),"number"===typeof f){var d=new Date;d.setTime(d.getTime()+6E4*f)}else d=f;return c&&(document.cookie=encodeURIComponent(c)+"="+encodeURIComponent(b)+"; secure; path=/;"+(f?" expires="+d.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof cookieRead)?cookieRead(c)===b:!1}};window.cookieRead=window.cookieRead||function(c){if("string"===typeof c)c=encodeURIComponent(c);else return"";var b=" "+document.cookie,a=b.indexOf(" "+c+"="),d=0>a?a:b.indexOf(";",a);return(c=0>a?"":decodeURIComponent(b.substring(a+2+c.length,0>d?b.length:d)))?c:""};d=(new Date).getTime();var k=cookieRead("s_dur"),a=0;if(isNaN(k)||18E5<d-k)k=d;a=d-k;cookieWrite("s_dur",k+"",30);if(0===a)return"first hit of visit";a=Math.floor(a/6E4);return 0===a?"less than a minute":1===a?"1 minute":a+" minutes"};

              module.exports.getVisitDuration = getVisitDuration;

            }

          },
          "common-analytics-plugins/src/lib/plugins/getVisitNum.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getVisitNum v4.2.1 */
              function getVisitNum(rp,erp){var a=rp,l=erp;function m(c){return isNaN(c)?!1:(parseFloat(c)|0)===parseFloat(c)}function n(c){var b=new Date,e=isNaN(c)?0:Math.floor(c);b.setHours(23);b.setMinutes(59);b.setSeconds(59);"w"===c&&(e=6-b.getDay());if("m"===c){e=b.getMonth()+1;var a=b.getFullYear();e=(new Date(a?a:1970,e?e:1,0)).getDate()-b.getDate()}b.setDate(b.getDate()+e);"y"===c&&(b.setMonth(11),b.setDate(31));return b}if("-v"===a)return{plugin:"getVisitNum",version:"4.2.1"};var f=function(){if("undefined"!==typeof window.s_c_il)for(var c=0,b;c<window.s_c_il.length;c++)if(b=window.s_c_il[c],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof f&&(f.contextData.getVisitNum="4.2.1");window.cookieWrite=window.cookieWrite||function(c,b,e){if("string"===typeof c){var a=window.location.hostname,d=window.location.hostname.split(".").length-1;if(a&&!/^[0-9.]+$/.test(a)){d=2<d?d:2;var h=a.lastIndexOf(".");if(0<=h){for(;0<=h&&1<d;)h=a.lastIndexOf(".",h-1),d--;h=0<h?a.substring(h):a}}g=h;b="undefined"!==typeof b?""+b:"";if(e||""===b)if(""===b&&(e=-60),"number"===typeof e){var f=new Date;f.setTime(f.getTime()+6E4*e)}else f=e;return c&&(document.cookie=encodeURIComponent(c)+"="+encodeURIComponent(b)+"; secure; path=/;"+(e?" expires="+f.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof window.cookieRead)?window.cookieRead(c)===b:!1}};window.cookieRead=window.cookieRead||function(c){if("string"===typeof c)c=encodeURIComponent(c);else return"";var b=" "+document.cookie,a=b.indexOf(" "+c+"="),d=0>a?a:b.indexOf(";",a);return(c=0>a?"":decodeURIComponent(b.substring(a+2+c.length,0>d?b.length:d)))?c:""};a=a?a:365;l="undefined"!==typeof l?!!l:m(a)?!0:!1;var p=(new Date).getTime();f=n(a);if(window.cookieRead("s_vnc"+a))var d=window.cookieRead("s_vnc"+a).split("&vn="),k=d[1];if(window.cookieRead("s_ivc"))return k?(window.cookieWrite("s_ivc",!0,30),k):"unknown visit number";if("undefined"!==typeof k)return k++,d=l&&m(a)?p+864E5*a:d[0],f.setTime(d),window.cookieWrite("s_vnc"+a,d+"&vn="+k,f),window.cookieWrite("s_ivc",!0,30),k;d=m(a)?p+864E5*a:n(a).getTime();window.cookieWrite("s_vnc"+a,d+"&vn=1",f);window.cookieWrite("s_ivc",!0,30);return"1"};

              module.exports.getVisitNum = getVisitNum;

            }

          },
          "common-analytics-plugins/src/lib/plugins/inList.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: inList v3.0 */
              function inList(lv,vtc,d,cc){var b=lv,e=vtc,c=d,f=cc;if("-v"===b)return{plugin:"inList",version:"3.0"};a:{if("undefined"!==typeof window.s_c_il){var a=0;for(var d;a<window.s_c_il.length;a++)if(d=window.s_c_il[a],d._c&&"s_c"===d._c){a=d;break a}}a=void 0}"undefined"!==typeof a&&(a.contextData.inList="3.0");if("string"!==typeof e)return!1;if("string"===typeof b)b=b.split(c||",");else if("object"!==typeof b)return!1;c=0;for(a=b.length;c<a;c++)if(1==f&&e===b[c]||e.toLowerCase()===b[c].toLowerCase())return!0;return!1};

              module.exports.inList = inList;
            }

          },
          "common-analytics-plugins/src/lib/plugins/lowerCaseVars.js": {
            "script": function(module, exports, require, turbine) {
              function lowerCaseVars(v){var s=this;s[v]&&("events"!==v&&-1===v.indexOf("contextData")?(s[v]=s[v].toString(),0!== s[v].indexOf("D=")&&(s[v]=s[v].toLowerCase())):-1<v.indexOf("contextData")&&(v=v.substring(v.indexOf(".")+1),s.contextData[v]&& (s.contextData[v]=s.contextData[v].toString().toLowerCase())))}

              module.exports.lowerCaseVars = lowerCaseVars;
            }

          },
          "common-analytics-plugins/src/lib/plugins/manageVars.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: manageVars v3.0 (Requires AppMeasurement) */
              function manageVars(cb,l,il){var g=cb,c=l,d=il;if("-v"===g)return{plugin:"manageVars",version:"3.0"};var f=function(){if("undefined"!==typeof window.s_c_il)for(var a=0,b;a<window.s_c_il.length;a++)if(b=window.s_c_il[a],b._c&&"s_c"===b._c)return b}();if("undefined"!==typeof f){f.contextData.manageVars="3.0";f.blankVars=function(a){this[a]&&(0>a.indexOf("contextData")?this[a]="":(a=a.substring(a.indexOf(".")+1),this.contextData[a]&&(this.contextData[a]="")))};f.lowerCaseVars=function(a){this[a]&&("events"!==a&&-1===a.indexOf("contextData")?(this[a]=this[a].toString(),0!==this[a].indexOf("D=")&&(this[a]=this[a].toLowerCase())):-1<a.indexOf("contextData")&&(a=a.substring(a.indexOf(".")+1),this.contextData[a]&&(this.contextData[a]=this.contextData[a].toString().toLowerCase())))};f.cleanStr=function(a){function b(a){if("string"===typeof a){for(a=a.replace(/<\/?[^>]+(>|$)/g,"").trim().replace(/[\u2018\u2019\u201A]/g,"'").replace(/\t+/g,"").replace(/[\n\r]/g," ");-1<a.indexOf("  ");)a=a.replace(/\s\s/g," ");return a}return""}this[a]&&"function"===typeof b&&(0>a.indexOf("contextData")?this[a]=b(this[a]):(a=a.substring(a.indexOf(".")+1),this.contextData[a]&&(this.contextData[a]=b(this.contextData[a].toString()))))};f.pt=function(a,b,c,d){if(a&&this[c]){a=a.split(b||",");b=a.length;for(var e,f=0;f<b;f++)if(e=this[c](a[f],d))return e}};if(!f[g])return!1;c=c||"";d=d||!0;var b,e="pageName,purchaseID,channel,server,pageType,campaign,state,zip,events,products,transactionID";for(b=1;76>b;b++)e+=",prop"+b;for(b=1;251>b;b++)e+=",eVar"+b;for(b=1;6>b;b++)e+=",hier"+b;for(b=1;4>b;b++)e+=",list"+b;for(b in f.contextData)e+=",contextData."+b;if(c){if(1==d)e=c.replace("['",".").replace("']","");else if(0==d){c=c.split(",");d=e.split(",");e="";for(x in c)for(y in-1<c[x].indexOf("contextData")&&(c[x]="contextData."+c[x].split("'")[1]),d)c[x]===d[y]&&(d[y]="");for(y in d)e+=d[y]?","+d[y]:""}f.pt(e,",",g,0);return!0}return""===c&&d?(f.pt(e,",",g,0),!0):!1}};

              module.exports.manageVars = manageVars;
            }

          },
          "common-analytics-plugins/src/lib/plugins/p_fo.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: p_fo (pageFirstOnly) v3.0 (Requires AppMeasurement) */
              function p_fo(c){if("-v"===c)return{plugin:"p_fo",version:"3.0"};a:{if("undefined"!==typeof window.s_c_il){var a=0;for(var b;a<window.s_c_il.length;a++)if(b=window.s_c_il[a],b._c&&"s_c"===b._c){a=b;break a}}a=void 0}"undefined"!==typeof a&&(a.contextData.p_fo="3.0");window.__fo||(window.__fo={});if(window.__fo[c])return!1;window.__fo[c]={};return!0};

              module.exports.p_fo = p_fo
            }

          },
          "common-analytics-plugins/src/lib/plugins/performanceCheck.js": {
            "script": function(module, exports, require, turbine) {
              function performanceCheck(a,b){if(0<=a&&0<=b)return 6E4>a-b&&0<=a-b?parseFloat((a-b)/1E3).toFixed(2):60}

              module.exports.performanceCheck = performanceCheck;
            }

          },
          "common-analytics-plugins/src/lib/plugins/performanceWriteFull.js": {
            "script": function(module, exports, require, turbine) {
              function performanceWriteFull(){var s=this,a=performance.timing;0<a.loadEventEnd&&(clearInterval(s.pi),""===s.c_r("s_plt")&& (s.c_w("s_plt",s.performanceCheck(a.loadEventEnd,a.navigationStart)),s.c_w("s_pltp",s.pageName)));s.ptc=a.loadEventEnd}

              module.exports.performanceWriteFull = performanceWriteFull;
            }

          },
          "common-analytics-plugins/src/lib/plugins/performanceWritePart.js": {
            "script": function(module, exports, require, turbine) {
              function performanceWritePart(){var s=this,a=performance;0<a.getEntries().length&&(s.ppfe===a.getEntries().length? clearInterval(s.pwp):s.ppfe=a.getEntries().length);""===s.c_r("s_plt")&&(s.c_w("s_plt",((a.getEntries()[a.getEntries().length-1].responseEnd-a.getEntries()[0].startTime)/1E3).toFixed(2)),s.c_w("s_pltp",s.pageName))}

              module.exports.performanceWritePart = performanceWritePart;
            }

          },
          "common-analytics-plugins/src/lib/plugins/handlePPVevents.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: handlePPVevents helper function (for getPercentPageViewed v4.0 Plugin) */
              function handlePPVevents(){if("undefined"!==typeof s_c_il){for(var c=0,g=s_c_il.length;c<g;c++)if(s_c_il[c]&&(s_c_il[c].getPercentPageViewed||s_c_il[c].getPreviousPageActivity)){var s=s_c_il[c];break}if(s&&s.ppvID){var f=Math.max(Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),Math.max(document.body.clientHeight,document.documentElement.clientHeight)),h=window.innerHeight||document.documentElement.clientHeight||
                document.body.clientHeight;c=(window.pageYOffset||window.document.documentElement.scrollTop||window.document.body.scrollTop)+h;g=Math.min(Math.round(c/f*100),100);var k=Math.floor(c/h);h=Math.floor(f/h);var d="";if(!s.c_r("s_tp")||s.unescape(s.c_r("s_ppv").split(",")[0])!==s.ppvID||s.p_fo(s.ppvID)||1==s.ppvChange&&s.c_r("s_tp")&&f!=s.c_r("s_tp")){(s.unescape(s.c_r("s_ppv").split(",")[0])!==s.ppvID||s.p_fo(s.ppvID+"1"))&&s.c_w("s_ips",c);if(s.c_r("s_tp")&&s.unescape(s.c_r("s_ppv").split(",")[0])===
                s.ppvID){s.c_r("s_tp");d=s.c_r("s_ppv");var e=-1<d.indexOf(",")?d.split(","):[];d=e[0]?e[0]:"";e=e[3]?e[3]:"";var l=s.c_r("s_ips");d=d+","+Math.round(e/f*100)+","+Math.round(l/f*100)+","+e+","+k}s.c_w("s_tp",f)}else d=s.c_r("s_ppv");var b=d&&-1<d.indexOf(",")?d.split(",",6):[];f=0<b.length?b[0]:escape(s.ppvID);e=1<b.length?parseInt(b[1]):g;l=2<b.length?parseInt(b[2]):g;var m=3<b.length?parseInt(b[3]):c,n=4<b.length?parseInt(b[4]):k;b=5<b.length?parseInt(b[5]):h;0<g&&(d=f+","+(g>e?g:e)+","+l+","+(c>
              m?c:m)+","+(k>n?k:n)+","+(h>b?h:b));s.c_w("s_ppv",d)}}}

              module.exports.handlePPVevents = handlePPVevents;
            }

          },
          "common-analytics-plugins/src/lib/plugins/getPercentPageViewed.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: getPercentPageViewed v5.0.2 w/handlePPVevents helper function (Requires AppMeasurement and the p_fo plugin) */
              function getPercentPageViewed(pid,ch){var n=pid,r=ch;function p(){if(window.ppvID){var a=Math.max(Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),Math.max(document.body.clientHeight,document.documentElement.clientHeight)),b=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,d=(window.pageYOffset||window.document.documentElement.scrollTop||window.document.body.scrollTop)+b,f=Math.min(Math.round(d/a*100),100),l=Math.floor(d/b);b=Math.floor(a/b);var c="";if(!window.cookieRead("s_tp")||decodeURIComponent(window.cookieRead("s_ppv").split(",")[0])!==window.ppvID||window.p_fo(window.ppvID)||1==window.ppvChange&&window.cookieRead("s_tp")&&a!=window.cookieRead("s_tp")){(decodeURIComponent(window.cookieRead("s_ppv").split(",")[0])!==window.ppvID||window.p_fo(window.ppvID+"1"))&&window.cookieWrite("s_ips",d);if(window.cookieRead("s_tp")&&decodeURIComponent(window.cookieRead("s_ppv").split(",")[0])===window.ppvID){window.cookieRead("s_tp");c=window.cookieRead("s_ppv");var h=-1<c.indexOf(",")?c.split(","):[];c=h[0]?h[0]:"";h=h[3]?h[3]:"";var q=window.cookieRead("s_ips");c=c+","+Math.round(h/a*100)+","+Math.round(q/a*100)+","+h+","+l}window.cookieWrite("s_tp",a)}else c=window.cookieRead("s_ppv");var k=c&&-1<c.indexOf(",")?c.split(",",6):[];a=0<k.length?k[0]:encodeURIComponent(window.ppvID);h=1<k.length?parseInt(k[1]):f;q=2<k.length?parseInt(k[2]):f;var t=3<k.length?parseInt(k[3]):d,u=4<k.length?parseInt(k[4]):l;k=5<k.length?parseInt(k[5]):b;0<f&&(c=a+","+(f>h?f:h)+","+q+","+(d>t?d:t)+","+(l>u?l:u)+","+(b>k?b:k));window.cookieWrite("s_ppv",c)}}if("-v"===n)return{plugin:"getPercentPageViewed",version:"5.0.2"};var m=function(){if("undefined"!==typeof window.s_c_il)for(var a=0,b;a<window.s_c_il.length;a++)if(b=window.s_c_il[a],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof m&&(m.contextData.getPercentPageViewed="5.0.2");window.pageName="undefined"!==typeof m&&m.pageName||"";window.cookieWrite=window.cookieWrite||function(a,b,d){if("string"===typeof a){var f=window.location.hostname,l=window.location.hostname.split(".").length-1;if(f&&!/^[0-9.]+$/.test(f)){l=2<l?l:2;var c=f.lastIndexOf(".");if(0<=c){for(;0<=c&&1<l;)c=f.lastIndexOf(".",c-1),l--;c=0<c?f.substring(c):f}}g=c;b="undefined"!==typeof b?""+b:"";if(d||""===b)if(""===b&&(d=-60),"number"===typeof d){var h=new Date;h.setTime(h.getTime()+6E4*d)}else h=d;return a&&(document.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+"; secure; path=/;"+(d?" expires="+h.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof window.cookieRead)?window.cookieRead(a)===b:!1}};window.cookieRead=window.cookieRead||function(a){if("string"===typeof a)a=encodeURIComponent(a);else return"";var b=" "+document.cookie,d=b.indexOf(" "+a+"="),f=0>d?d:b.indexOf(";",d);return(a=0>d?"":decodeURIComponent(b.substring(d+2+a.length,0>f?b.length:f)))?a:""};window.p_fo=window.p_fo||function(a){window.__fo||(window.__fo={});if(window.__fo[a])return!1;window.__fo[a]={};return!0};var e=window.cookieRead("s_ppv");e=-1<e.indexOf(",")?e.split(","):[];n=n?n:window.pageName?window.pageName:document.location.href;e[0]=decodeURIComponent(e[0]);window.ppvChange="undefined"===typeof r||1==r?!0:!1;"undefined"!==typeof m&&m.linkType&&"o"===m.linkType||(window.ppvID&&window.ppvID===n||(window.ppvID=n,window.cookieWrite("s_ppv",""),p()),window.p_fo("s_gppvLoad")&&window.addEventListener&&(window.addEventListener("load",p,!1),window.addEventListener("click",p,!1),window.addEventListener("scroll",p,!1)),this._ppvPreviousPage=e[0]?e[0]:"",this._ppvHighestPercentViewed=e[1]?e[1]:"",this._ppvInitialPercentViewed=e[2]?e[2]:"",this._ppvHighestPixelsSeen=e[3]?e[3]:"",this._ppvFoldsSeen=e[4]?e[4]:"",this._ppvFoldsAvailable=e[5]?e[5]:"")};

              module.exports.getPercentPageViewed = getPercentPageViewed;

            }

          },
          "common-analytics-plugins/src/lib/plugins/pt.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: pt v3.0 (Requires AppMeasurement) */
              function pt(l,de,cf,fa){var b=l,d=de,f=cf,g=fa;if("-v"===b)return{plugin:"pt",version:"3.0"};a:{if("undefined"!==typeof window.s_c_il){var a=0;for(var c;a<window.s_c_il.length;a++)if(c=window.s_c_il[a],c._c&&"s_c"===c._c){a=c;break a}}a=void 0}if("undefined"!==typeof a&&(a.contextData.pt="3.0",b&&a[f])){b=b.split(d||",");d=b.length;for(var e=0;e<d;e++)if(c=a[f](b[e],g))return c}};

              module.exports.pt = pt;
            }

          },
          "common-analytics-plugins/src/lib/plugins/rfl.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: rfl (removeFromList) v2.1  */
              function rfl(lv,vr,d1,d2,df){var b=lv,f=vr,e=d1,h=d2,g=df;if("-v"===b)return{plugin:"rfl",version:"2.1"};a:{if("undefined"!==typeof window.s_c_il){var c=0;for(var a;c<window.s_c_il.length;c++)if(a=window.s_c_il[c],a._c&&"s_c"===a._c){c=a;break a}}c=void 0}"undefined"!==typeof c&&(c.contextData.rfl="2.1");if(!b||!f)return"";c=[];a="";e=e||",";h=h||e;g=g||!1;b=b.split(e);e=b.length;for(var d=0;d<e;d++)-1<b[d].indexOf(":")&&(a=b[d].split(":"),a[1]=a[0]+":"+a[1],b[d]=a[0]),-1<b[d].indexOf("=")&&(a=b[d].split("="),a[1]=a[0]+"="+a[1],b[d]=a[0]),b[d]!==f&&a?c.push(a[1]):b[d]!==f?c.push(b[d]):b[d]===f&&g&&(a?c.push(a[1]):c.push(b[d]),g=!1),a="";return c.join(h)};

              module.exports.rfl = rfl;
            }

          },
          "common-analytics-plugins/src/lib/plugins/twoDecimals.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: twoDecimals v1.0 */
              function twoDecimals(v){return"undefined"===typeof v||void 0===v||isNaN(v)?0:Number(Number(v).toFixed(2))};

              module.exports.twoDecimals = twoDecimals;
            }

          },
          "common-analytics-plugins/src/lib/plugins/zeroPad.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: zeroPad v1.0 (No Prerequisites) */
              function zeroPad(num,nod){num=parseInt(num);nod=parseInt(nod);if(isNaN(num)||isNaN(nod))return"";var c=nod-num.toString().length+1;return Array(+(0<c&&c)).join("0")+num};

              module.exports.zeroPad = zeroPad;
            }

          },
          "common-analytics-plugins/src/lib/plugins/randomNumber.js": {
            "script": function(module, exports, require, turbine) {
              /* Adobe Consulting Plugin: randomNumber v2.0 (zeroPad optional)*/
              function randomNumber(nod){nod="number"===typeof nod?17>Math.abs(nod)?Math.round(Math.abs(nod)):17:10;for(var a="1",c=0;c<nod;c++)a+="0";a=Number(a);a=Math.floor(Math.random().toFixed(nod)*a)+"";a.length!==nod&&"undefined"!==typeof zeroPad&&(a=zeroPad(a,nod));return a};

              module.exports.randomNumber = randomNumber;
            }

          }
        }
      },
      "core": {
        "displayName": "Core",
        "hostedLibFilesBaseUrl": "https://assets.adobedtm.com/extensions/EPd22815afd48447aa955be6a3a012e3b5/",
        "modules": {
          "core/src/lib/dataElements/customCode.js": {
            "name": "custom-code",
            "displayName": "Custom Code",
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              /**
               * The custom data element.
               * @param {Object} settings The data element settings object.
               * @param {string} settings.source The function that should be called which will return a value.
               * @param {string} event The event (if any) that triggered the evaluation of the data element.
               * @returns {string}
               */
              module.exports = function (settings, event) {
                return settings.source(event);
              };

            }

          },
          "core/src/lib/dataElements/javascriptVariable.js": {
            "name": "javascript-variable",
            "displayName": "JavaScript Variable",
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';
              var getObjectProperty = require('../helpers/getObjectProperty.js');

              /**
               * The variable data element.
               * @param {Object} settings The data element settings object.
               * @param {string} settings.path The global path to the variable holding the data element value.
               * @returns {string}
               */
              module.exports = function (settings) {
                return getObjectProperty(window, settings.path);
              };

            }

          },
          "core/src/lib/dataElements/pageInfo.js": {
            "name": "page-info",
            "displayName": "Page Info",
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              var document = require('@adobe/reactor-document');

              /**
               * The page info data element.
               * @param {Object} settings The data element settings object.
               * @param {string} settings.attribute The attribute that should be returned.
               * @returns {string}
               */
              module.exports = function (settings) {
                switch (settings.attribute) {
                  case 'url':
                    return document.location.href;
                  case 'hostname':
                    return document.location.hostname;
                  case 'pathname':
                    return document.location.pathname;
                  case 'protocol':
                    return document.location.protocol;
                  case 'referrer':
                    return document.referrer;
                  case 'title':
                    return document.title;
                }
              };

            }

          },
          "core/src/lib/dataElements/runtimeEnvironment.js": {
            "name": "runtime-environment",
            "displayName": "Runtime Environment",
            "script": function(module, exports, require, turbine) {
              /*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

              'use strict';

              /**
               * The launch environment data element.
               * @param {Object} settings The data element settings object.
               * @param {string} settings.attribute The attribute that should be returned.
               * @returns {string}
               */

              var window = require('@adobe/reactor-window');

              module.exports = function (settings, event) {
                switch (settings.attribute) {
                  case 'buildDate':
                    return turbine.buildInfo.buildDate;
                  case 'environmentStage':
                    return window._satellite.environment.stage;
                  case 'propertyName':
                    return window._satellite.property.name;
                  case 'propertyId':
                    return window._satellite.property.id;
                  case 'ruleName':
                    return event.$rule.name;
                  case 'ruleId':
                    return event.$rule.id;
                  case 'eventType':
                    return event.$type;
                  case 'eventDetail':
                    return event.detail;
                  case 'DCRIdentifier':
                    return event.identifier;
                }
              };

            }

          },
          "core/src/lib/dataElements/visitorBehavior.js": {
            "name": "visitor-behavior",
            "displayName": "Visitor Behavior",
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';
              var visitorTracking = require('../helpers/visitorTracking');

              /**
               * The page info data element.
               * @param {Object} settings The data element settings object.
               * @param {string} settings.attribute The attribute that should be returned.
               * @returns {string}
               */
              module.exports = function (settings) {
                switch (settings.attribute) {
                  case 'landingPage':
                    return visitorTracking.getLandingPage();
                  case 'trafficSource':
                    return visitorTracking.getTrafficSource();
                  case 'minutesOnSite':
                    return visitorTracking.getMinutesOnSite();
                  case 'sessionCount':
                    return visitorTracking.getSessionCount();
                  case 'sessionPageViewCount':
                    return visitorTracking.getSessionPageViewCount();
                  case 'lifetimePageViewCount':
                    return visitorTracking.getLifetimePageViewCount();
                  case 'isNewVisitor':
                    return visitorTracking.getIsNewVisitor();
                }
              };

            }

          },
          "core/src/lib/events/click.js": {
            "name": "click",
            "displayName": "Click",
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              var window = require('@adobe/reactor-window');
              var bubbly = require('./helpers/createBubbly')();
              var WeakMap = require('./helpers/weakMap');
              var evaluatedEvents = new WeakMap();
              var MIDDLE_MOUSE_BUTTON = 2;
              var castToNumberIfString =
                require('../helpers/stringAndNumberUtils').castToNumberIfString;

              /**
               * Determines whether an element is a link that would navigate the user's current window to a
               * different URL.
               * @param {MouseEvent} e
               * @returns {boolean}
               */
              var getDelayableLink = function (e) {
                // user is modifying click with the keyboard, don't delay the navigation
                if (e.ctrlKey || e.metaKey || e.button === MIDDLE_MOUSE_BUTTON) {
                  return undefined;
                }

                var node = e.target;
                while (node) {
                  var tagName = node.tagName;

                  if (tagName && tagName.toLowerCase() === 'a') {
                    var href = node.getAttribute('href');
                    var target = node.getAttribute('target');

                    if (
                      href &&
                      (!target ||
                        target === '_self' ||
                        (target === '_top' && window.top === window) ||
                        target === window.name)
                    ) {
                      return node;
                    } else {
                      // Found hyperlink conditions in which we don't want to delay navigation
                      return undefined;
                    }
                  }

                  node = node.parentNode;
                }
              };

              document.addEventListener('click', bubbly.evaluateEvent, true);

              /**
               * The click event. This event occurs when a user has clicked an element.
               * @param {Object} settings - The event settings object.
               * @param {string} [settings.elementSelector] - The CSS selector the element must match in order for
               * the rule to fire.
               * @param {Object[]} settings.elementProperties - Property values the element must have in order
               * for the rule to fire.
               * @param {string} settings.elementProperties[].name - The property name.
               * @param {string} settings.elementProperties[].value - The property value.
               * @param {number|string} [settings.anchorDelay] - When present and a link is clicked, actual
               * navigation will be postponed for a period of time equal with its value. This is typically used to
               * allow time for scripts within the rule to execute, beacons to be sent to servers, etc.
               * @param {boolean} settings.elementProperties[].valueIsRegex=false - Whether <code>value</code>
               * on the object instance is intended to be a regular expression.
               * @param {boolean} settings.bubbleFireIfParent=true - Whether the rule should fire if
               * the event originated from a descendant element.
               * @param {boolean} settings.bubbleFireIfChildFired=true - Whether the rule should fire
               * if the same event has already triggered a rule targeting a descendant element.
               * @param {boolean} settings.bubbleStop=false - Whether the event should not trigger
               * rules on ancestor elements.
               * @param {function} trigger - The trigger callback.
               */
              module.exports = function (settings, trigger) {
                bubbly.addListener(settings, function (syntheticEvent) {
                  var nativeEvent = syntheticEvent.nativeEvent;

                  // AppMeasurement captures the click events, and tries to detect if the element clicked is an A
                  // tag that contains an exit link. When that happens, it stops the initial event, sends a
                  // beacon, clones the initial event and fires it again.
                  // Reactor detects the click events first, because its listeners are set on the capture phase.
                  // We need to ignore the cloned event, otherwise the same rule will fire twice. AppMeasurement
                  // sets `s_fe` attribute on the cloned event, and that is the flag we'll use to ignore these
                  // fake events.
                  // https://git.corp.adobe.com/analytics-platform/appmeasurement/blob/master/bin/js/src/AppMeasurement.js#L3196
                  if (nativeEvent.s_fe) {
                    return;
                  }

                  var anchorDelay = castToNumberIfString(settings.anchorDelay);
                  if (anchorDelay) {
                    if (!evaluatedEvents.has(nativeEvent)) {
                      var delayableLink = getDelayableLink(nativeEvent);
                      if (delayableLink) {
                        nativeEvent.preventDefault();
                        setTimeout(function () {
                          window.location = delayableLink.href;
                        }, anchorDelay);
                      }
                      evaluatedEvents.set(nativeEvent, true);
                    }
                  }

                  trigger(syntheticEvent);
                });
              };

              /**
               * @private
               * Clears all listeners. This should only be used in tests.
               */
              module.exports.__reset = bubbly.__reset;

            }

          },
          "core/src/lib/conditions/valueComparison.js": {
            "name": "value-comparison",
            "displayName": "Value Comparison",
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * (c) 2018 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              /*eslint eqeqeq:0*/
              'use strict';

              var isString = require('../helpers/stringAndNumberUtils').isString;
              var isNumber = require('../helpers/stringAndNumberUtils').isNumber;
              var castToStringIfNumber =
                require('../helpers/stringAndNumberUtils').castToStringIfNumber;
              var castToNumberIfString =
                require('../helpers/stringAndNumberUtils').castToNumberIfString;

              var updateCase = function (operand, caseInsensitive) {
                return caseInsensitive && isString(operand) ? operand.toLowerCase() : operand;
              };

              var guardStringCompare = function (compare) {
                return function (leftOperand, rightOperand, caseInsensitive) {
                  leftOperand = castToStringIfNumber(leftOperand);
                  rightOperand = castToStringIfNumber(rightOperand);

                  return (
                    isString(leftOperand) &&
                    isString(rightOperand) &&
                    compare(leftOperand, rightOperand, caseInsensitive)
                  );
                };
              };

              var guardNumberCompare = function (compare) {
                return function (leftOperand, rightOperand) {
                  leftOperand = castToNumberIfString(leftOperand);
                  rightOperand = castToNumberIfString(rightOperand);

                  return (
                    isNumber(leftOperand) &&
                    isNumber(rightOperand) &&
                    compare(leftOperand, rightOperand)
                  );
                };
              };

              var guardCaseSensitivity = function (compare) {
                return function (leftOperand, rightOperand, caseInsensitive) {
                  return compare(
                    updateCase(leftOperand, caseInsensitive),
                    updateCase(rightOperand, caseInsensitive)
                  );
                };
              };

              var conditions = {
                equals: guardCaseSensitivity(function (leftOperand, rightOperand) {
                  return leftOperand == rightOperand;
                }),
                doesNotEqual: function () {
                  return !conditions.equals.apply(null, arguments);
                },
                contains: guardStringCompare(
                  guardCaseSensitivity(function (leftOperand, rightOperand) {
                    return leftOperand.indexOf(rightOperand) !== -1;
                  })
                ),
                doesNotContain: function () {
                  return !conditions.contains.apply(null, arguments);
                },
                startsWith: guardStringCompare(
                  guardCaseSensitivity(function (leftOperand, rightOperand) {
                    return leftOperand.indexOf(rightOperand) === 0;
                  })
                ),
                doesNotStartWith: function () {
                  return !conditions.startsWith.apply(null, arguments);
                },
                endsWith: guardStringCompare(
                  guardCaseSensitivity(function (leftOperand, rightOperand) {
                    return (
                      leftOperand.substring(
                        leftOperand.length - rightOperand.length,
                        leftOperand.length
                      ) === rightOperand
                    );
                  })
                ),
                doesNotEndWith: function () {
                  return !conditions.endsWith.apply(null, arguments);
                },
                matchesRegex: guardStringCompare(function (
                  leftOperand,
                  rightOperand,
                  caseInsensitive
                ) {
                  // Doing something like new RegExp(/ab+c/, 'i') throws an error in some browsers (e.g., IE11),
                  // so we don't want to instantiate the regex until we know we're working with a string.
                  return new RegExp(rightOperand, caseInsensitive ? 'i' : '').test(
                    leftOperand
                  );
                }),
                doesNotMatchRegex: function () {
                  return !conditions.matchesRegex.apply(null, arguments);
                },
                lessThan: guardNumberCompare(function (leftOperand, rightOperand) {
                  return leftOperand < rightOperand;
                }),
                lessThanOrEqual: guardNumberCompare(function (leftOperand, rightOperand) {
                  return leftOperand <= rightOperand;
                }),
                greaterThan: guardNumberCompare(function (leftOperand, rightOperand) {
                  return leftOperand > rightOperand;
                }),
                greaterThanOrEqual: guardNumberCompare(function (leftOperand, rightOperand) {
                  return leftOperand >= rightOperand;
                }),
                isTrue: function (leftOperand) {
                  return leftOperand === true;
                },
                isTruthy: function (leftOperand) {
                  return Boolean(leftOperand);
                },
                isFalse: function (leftOperand) {
                  return leftOperand === false;
                },
                isFalsy: function (leftOperand) {
                  return !leftOperand;
                }
              };

              module.exports = function (settings) {
                return conditions[settings.comparison.operator](
                  settings.leftOperand,
                  settings.rightOperand,
                  Boolean(settings.comparison.caseInsensitive)
                );
              };

            }

          },
          "core/src/lib/events/dataElementChange.js": {
            "name": "data-element-change",
            "displayName": "Data Element Change",
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              var POLL_INTERVAL = 1000;

              var triggersByName = {};
              var cachedStringifiedValueByName = {};

              setInterval(function () {
                Object.keys(triggersByName).forEach(function (name) {
                  var stringifiedValue = JSON.stringify(turbine.getDataElementValue(name));

                  if (stringifiedValue !== cachedStringifiedValueByName[name]) {
                    var syntheticEvent = {
                      dataElementName: name
                    };

                    triggersByName[name].forEach(function (trigger) {
                      trigger(syntheticEvent);
                    });

                    cachedStringifiedValueByName[name] = stringifiedValue;
                  }
                });
              }, POLL_INTERVAL);

              /**
               * Data element change event. This event occurs whenever the given data element's value has changed.
               * @param {Object} settings The event settings object.
               * @param {string} settings.name The name of the data element.
               * @param {ruleTrigger} trigger The trigger callback.
               */
              module.exports = function (settings, trigger) {
                var name = settings.name;
                var triggers = triggersByName[name];

                if (!triggers) {
                  triggers = triggersByName[name] = [];
                  cachedStringifiedValueByName[name] = JSON.stringify(
                    turbine.getDataElementValue(name)
                  );
                }

                triggers.push(trigger);
              };

            }

          },
          "core/src/lib/actions/customCode.js": {
            "name": "custom-code",
            "displayName": "Custom Code",
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              var document = require('@adobe/reactor-document');
              var Promise = require('@adobe/reactor-promise');
              var decorateCode = require('./helpers/decorateCode');
              var loadCodeSequentially = require('./helpers/loadCodeSequentially');
              var postscribe = require('../../../node_modules/postscribe/dist/postscribe');
              var unescapeHTMLEntities = require('./helpers/unescapeHtmlCode');
              var getTurbineScript = require('../helpers/findPageScript').getTurbine;

              var cspNonce;

              var postscribeWrite = (function () {
                var write = function (source) {
                  postscribe(document.body, source, {
                    beforeWriteToken: function (token) {
                      var tagName = token.tagName && token.tagName.toLowerCase();

                      if (cspNonce && tagName === 'script') {
                        token.attrs.nonce = cspNonce;
                      }

                      // There is an issue in Postscribe where script and style attributes
                      // are not unescaped. That causes problems when loading scripts from external
                      // sources. See https://jira.corp.adobe.com/browse/DTM-15058.
                      if (tagName === 'script' || tagName === 'style') {
                        Object.keys(token.attrs || {}).forEach(function (key) {
                          token.attrs[key] = unescapeHTMLEntities(token.attrs[key]);
                        });

                        if (token.src) {
                          token.src = unescapeHTMLEntities(token.src);
                        }
                      }

                      return token;
                    },
                    error: function (error) {
                      turbine.logger.error(error.msg);
                    }
                  });
                };

                var queue = [];

                // If the Launch library is loaded asynchronously, it may finish loading before document.body
                // is available. This means the custom code action may be running before document.body is
                // available, in which case can't write the custom code to document.body. We could, in this
                // case, write it to document.head since it will for sure be available, but the user's custom
                // code may have something like an img tag for sending a beacon (this use case was seen in DTM).
                // Adding display elements like an img tag to document.head is against HTML spec, though it
                // does seem like an image request is still made. We opted instead to ensure we comply with
                // HTML spec and wait until we see that document.body is available before writing.
                var flushQueue = function () {
                  if (document.body) {
                    while (queue.length) {
                      write(queue.shift());
                    }
                  } else {
                    // 20 is an arbitrarily small amount of time but not too aggressive.
                    setTimeout(flushQueue, 20);
                  }
                };

                return function (source) {
                  queue.push(source);
                  flushQueue();
                };
              })();

              var libraryWasLoadedAsynchronously = (function () {
                // document.currentScript is not supported by IE
                if (document.currentScript) {
                  return document.currentScript.async;
                } else {
                  var script = getTurbineScript();
                  if (script) {
                    return script.async;
                  }
                  // We couldn't find the Launch script, so we'll assume it was loaded asynchronously. This
                  // is the safer assumption.
                  return true;
                }
              })();

              /**
               * The custom code action. This loads and executes custom JavaScript or HTML provided by the user.
               * @param {Object} settings Action settings.
               * @params {boolean} settings.isExternal When true, <code>settings.source</code> contains the
               * code itself. When false, <code>settings.source</code> contains a relative path to the file
               * containing the user's code.
               * @param {string} settings.source If <code>settings.external</code> is <code>false</code>,
               * this will be the user's code. Otherwise, it will be a relative path to the file containing
               * the user's code.
               * @param {string} settings.language The language of the user's code. Must be either javascript or
               * html.
               * @param {Object} event The underlying event object that triggered the rule.
               * @param {Object} event.element The element that the rule was targeting.
               * @param {Object} event.target The element on which the event occurred.
               * <code>javascript</code> or <code>html</code>.
               */
              module.exports = function (settings, event) {
                // ensure the nonce is up-to-date when the function is used
                cspNonce = turbine.getExtensionSettings().cspNonce;

                var decoratedResult;

                var action = {
                  settings: settings,
                  event: event
                };

                var source = action.settings.source;
                if (!source) {
                  return;
                }

                if (action.settings.isExternal) {
                  return loadCodeSequentially(source).then(function (source) {
                    if (source) {
                      decoratedResult = decorateCode(action, source);
                      postscribeWrite(decoratedResult.code);
                      return decoratedResult.promise;
                    }

                    return Promise.resolve();
                  });
                } else {
                  decoratedResult = decorateCode(action, source);

                  // This area has been modified several times, so here are some helpful details:
                  // 1. Custom code will be included into the main launch library if it's for a rule that uses the
                  //    Library Loaded or Page Bottom event. isExternal will be false. However, keep in mind that
                  //    the same rule may have other events that are not Library Loaded or Page Bottom. This means
                  //    we could see isExternal = false on the action when the event that fired the rule is
                  //    a click, for example.
                  // 2. When users load a library synchronously which has a rule using the Library Loaded
                  //    or Page Bottom event with a Custom Code action, they expect the custom code to be written
                  //    to the document in a blocking fashion (prevent the parser from continuing until their
                  //    custom code is executed). In other words, they expect document.write to be used. When
                  //    the library is loaded asynchronously, they do not have this expectation. However, note
                  //    that if the Library Loaded event is used and the website does not call
                  //    _satellite.pageBottom(), page bottom rules will be run when the DOMContentLoaded event
                  //    is fired (at which point we can't use document.write or it will wipe out website content).
                  // 3. Calls to document.write will be ignored by the browser if the Launch library is loaded
                  //    asynchronously, even if the calls are made before DOMContentLoaded.
                  // 4. There's a bug in IE 10 where readyState is sometimes set to "interactive" too
                  //    early (before DOMContentLoaded has fired). https://bugs.jquery.com/ticket/12282
                  //    This may cause Postscribe to be used sometimes when document.write() could have been
                  //    used instead, but we have concluded that IE 10 usage is low enough and the risk small
                  //    enough that this behavior is tolerable.
                  if (!libraryWasLoadedAsynchronously && document.readyState === 'loading') {
                    // Document object in XML files is different from the ones in HTML files. Documents served
                    // with the `application/xhtml+xml` MIME type don't have the `document.write` method.
                    // More info:
                    // https://www.w3.org/MarkUp/2004/xhtml-faq#docwrite
                    // https://developer.mozilla.org/en-US/docs/Archive/Web/Writing_JavaScript_for_HTML
                    // Also, when rule component sequencing is enabled, there is an issue in Edge Legacy
                    // where the whole page gets erased: https://jira.corp.adobe.com/browse/DTM-13527.
                    // We decided to not use document.write at all when rule component sequencing is enabled.
                    if (
                      document.write &&
                      turbine.propertySettings.ruleComponentSequencingEnabled === false
                    ) {
                      document.write(decoratedResult.code);
                    } else {
                      postscribeWrite(decoratedResult.code);
                    }
                  } else {
                    postscribeWrite(decoratedResult.code);
                  }

                  return decoratedResult.promise;
                }
              };

            }

          },
          "core/src/lib/events/libraryLoaded.js": {
            "name": "library-loaded",
            "displayName": "Library Loaded (Page Top)",
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              var pageLifecycleEvents = require('./helpers/pageLifecycleEvents');

              /**
               * Library loaded event. This event occurs as soon as the runtime library is loaded.
               * @param {Object} settings The event settings object.
               * @param {ruleTrigger} trigger The trigger callback.
               */
              module.exports = function (settings, trigger) {
                pageLifecycleEvents.registerLibraryLoadedTrigger(trigger);
              };

            }

          },
          "core/src/lib/conditions/customCode.js": {
            "name": "custom-code",
            "displayName": "Custom Code",
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              /**
               * Custom code condition. This executes condition code provided by the user.
               * @param {Object} settings Condition settings.
               * @param {Function} settings.source The custom script function.
               * @param {Object} event The underlying event object that triggered the rule.
               * @param {Object} event.element The element that the rule was targeting.
               * @param {Object} event.target The element on which the event occurred.
               * @returns {boolean}
               */
              module.exports = function (settings, event) {
                // `this` and `target` are provided separately from event for backward-compatibility.
                return settings.source.call(event.element, event, event.target);
              };

            }

          },
          "core/src/lib/helpers/getObjectProperty.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              /**
               * Returns the deep property value of an object.
               * @param obj The object where the property will be searched.
               * @param property The property name to be returned. It can contain dots. (eg. prop.subprop1)
               * @returns {*}
               */
              module.exports = function (obj, property) {
                var propertyChain = property.split('.');
                var currentValue = obj;

                for (var i = 0, len = propertyChain.length; i < len; i++) {
                  if (currentValue == null) {
                    return undefined;
                  }

                  currentValue = currentValue[propertyChain[i]];
                }

                return currentValue;
              };

            }

          },
          "core/src/lib/helpers/visitorTracking.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              var cookie = require('@adobe/reactor-cookie');
              var document = require('@adobe/reactor-document');
              var window = require('@adobe/reactor-window');
              var getNamespacedStorage = require('./getNamespacedStorage');

              var COOKIE_PREFIX = '_sdsat_';
              var STORAGE_NAMESPACE = 'visitorTracking';
              var MIGRATED_KEY = 'cookiesMigrated';

              var visitorTrackingLocalStorage = getNamespacedStorage(
                'localStorage',
                STORAGE_NAMESPACE
              );
              var visitorTrackingSessionStorage = getNamespacedStorage(
                'sessionStorage',
                STORAGE_NAMESPACE
              );

// returns whether this is a new visitor session
              var trackLandingPageAndTime = function () {
                var existingLandingPage =
                  visitorTrackingSessionStorage.getItem('landingPage');

                if (!existingLandingPage) {
                  visitorTrackingSessionStorage.setItem('landingPage', window.location.href);
                  visitorTrackingSessionStorage.setItem('landingTime', new Date().getTime());
                }

                return !existingLandingPage;
              };

              var getLandingPage = function () {
                return visitorTrackingSessionStorage.getItem('landingPage');
              };

              var getLandingTime = function () {
                return Number(visitorTrackingSessionStorage.getItem('landingTime'));
              };

              var getSessionCount = function () {
                return Number(visitorTrackingLocalStorage.getItem('sessionCount'));
              };

              var getLifetimePageViewCount = function () {
                return Number(visitorTrackingLocalStorage.getItem('pagesViewed'));
              };

              var getMinutesOnSite = function () {
                var now = new Date().getTime();
                return Math.floor((now - getLandingTime()) / 1000 / 60);
              };

              var getTrafficSource = function () {
                return visitorTrackingSessionStorage.getItem('trafficSource');
              };

              var getSessionPageViewCount = function () {
                return Number(visitorTrackingSessionStorage.getItem('pagesViewed'));
              };

              var getIsNewVisitor = function () {
                return getSessionCount() === 1;
              };

              var trackSessionCount = function (newSession) {
                if (newSession) {
                  visitorTrackingLocalStorage.setItem('sessionCount', getSessionCount() + 1);
                }
              };

              var trackSessionPageViewCount = function () {
                visitorTrackingSessionStorage.setItem(
                  'pagesViewed',
                  getSessionPageViewCount() + 1
                );
              };

              var trackLifetimePageViewCount = function () {
                visitorTrackingLocalStorage.setItem(
                  'pagesViewed',
                  getLifetimePageViewCount() + 1
                );
              };

              var trackTrafficSource = function () {
                if (!visitorTrackingSessionStorage.getItem('trafficSource')) {
                  visitorTrackingSessionStorage.setItem('trafficSource', document.referrer);
                }
              };

// Remove when migration period has ended. We intentionally leave cookies as they are so that if
// DTM is running on the same domain it can still use the persisted values. Our migration strategy
// is essentially copying data from cookies and then diverging the storage mechanism between
// DTM and Launch (DTM uses cookies and Launch uses session and local storage).
              var migrateCookieData = function () {
                if (!visitorTrackingLocalStorage.getItem(MIGRATED_KEY)) {
                  // We intentionally do not migrate session-based data since it would only affect a user that
                  // came from a page running DTM to a page running Launch and only the first visit.
                  var sessionCount = cookie.get(COOKIE_PREFIX + 'session_count');

                  if (sessionCount) {
                    visitorTrackingLocalStorage.setItem('sessionCount', sessionCount);
                  }

                  var lifetimePagesViewed = cookie.get(COOKIE_PREFIX + 'lt_pages_viewed');

                  if (lifetimePagesViewed) {
                    visitorTrackingLocalStorage.setItem('pagesViewed', lifetimePagesViewed);
                  }

                  visitorTrackingLocalStorage.setItem(MIGRATED_KEY, true);
                }
              };

              var trackVisitor = function () {
                var newSession = trackLandingPageAndTime();
                trackSessionCount(newSession);
                trackLifetimePageViewCount();
                trackSessionPageViewCount();
                trackTrafficSource();
              };

              migrateCookieData();
              trackVisitor();

              module.exports = {
                getLandingPage: getLandingPage,
                getLandingTime: getLandingTime,
                getMinutesOnSite: getMinutesOnSite,
                getSessionCount: getSessionCount,
                getLifetimePageViewCount: getLifetimePageViewCount,
                getSessionPageViewCount: getSessionPageViewCount,
                getTrafficSource: getTrafficSource,
                getIsNewVisitor: getIsNewVisitor
              };

            }

          },
          "core/src/lib/helpers/getNamespacedStorage.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/
              'use strict';

              var window = require('@adobe/reactor-window');
              var BASE_NAMESPACE = 'com.adobe.reactor.core';

              module.exports = function (storageType, additionalNamespace) {
                var namespace = BASE_NAMESPACE + '.' + additionalNamespace;

                // When storage is disabled on Safari, the mere act of referencing window.localStorage
                // or window.sessionStorage throws an error. For this reason, we wrap in a try-catch.
                return {
                  /**
                   * Reads a value from storage.
                   * @param {string} name The name of the item to be read.
                   * @returns {string}
                   */
                  getItem: function (name) {
                    try {
                      return window[storageType].getItem(namespace + '.' + name);
                    } catch (e) {
                      return null;
                    }
                  },
                  /**
                   * Saves a value to storage.
                   * @param {string} name The name of the item to be saved.
                   * @param {string} value The value of the item to be saved.
                   * @returns {boolean} Whether the item was successfully saved to storage.
                   */
                  setItem: function (name, value) {
                    try {
                      window[storageType].setItem(namespace + '.' + name, value);
                      return true;
                    } catch (e) {
                      return false;
                    }
                  }
                };
              };

            }

          },
          "core/src/lib/events/helpers/createBubbly.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              var WeakMap = require('./weakMap');
              var matchesProperties = require('./matchesProperties');
              var matchesSelector = require('./matchesSelector');

// Note to developers of other extensions:
// This module largely exists to support advanced bubbling options
// that were carried over to Launch from DTM. It is highly unlikely
// that you need to support these options in your own extension.
// As such, please only copy this code if you know why you're doing so
// and feel you have a justifiable reason.

              /**
               * Handles logic related to bubbling options provided for many event types.
               */
              module.exports = function () {
                var listeners = [];

                // It's important that a new weak map is created for each instance of bubbly in order to store
                // whether this particular bubbly instance has processed the event. More than one instance of
                // bubbly may process an event. No instance of bubbly should process an event more than once.
                var processedEvents = new WeakMap();

                var bubbly = {
                  /**
                   * Register a config object that should be evaluated for an event to determine if a rule
                   * should be executed. If it should be executed, the callback function will be called.
                   * @param {Object} settings The event config object.
                   * @param {string} [settings.elementSelector] The CSS selector the element must match in order
                   * for the rule to fire.
                   * @param {Object[]} [settings.elementProperties] Property values the element must have in order
                   * for the rule to fire.
                   * @param {string} settings.elementProperties[].name The property name.
                   * @param {string} settings.elementProperties[].value The property value.
                   * @param {number} [settings.anchorDelay] - When present and a link is clicked, actual
                   * navigation will be postponed for a period of time equal with its value. This is typically
                   * used to allow time for scripts within the rule to execute, beacons to be sent to
                   * servers, etc.
                   * @param {boolean} [settings.elementProperties[].valueIsRegex=false] Whether <code>value</code>
                   * on the object instance is intended to be a regular expression.
                   * @param {boolean} [settings.bubbleFireIfParent=true] Whether the rule should fire if the
                   * event originated from a descendant element.
                   * @param {boolean} [settings.bubbleFireIfChildFired=true] Whether the rule should fire if the
                   * same event has already triggered a rule targeting a descendant element.
                   * @param {boolean} [settings.bubbleStop=false] Whether the event should not trigger rules on
                   * ancestor elements.
                   * @param {Function} callback The function to be called when a matching event is seen. If the
                   * callback does not end up triggering a rule, the callback should explicitly return false.
                   */
                  addListener: function (settings, callback) {
                    listeners.push({
                      settings: settings,
                      callback: callback
                    });
                  },
                  /**
                   * Evaluate an event to determine if any rule targeting elements in the event target's DOM
                   * hierarchy should be executed. Note that event.type is not inspected. This assumes that
                   * all registered listeners care about this particular event type.
                   * @param {Event} event The event that has occurred.
                   * @param {HTMLElement} event.target The HTML element where the event originated.
                   * @param {boolean} [eventIsSynthetic] Whether the event passed in is synthetic (instead of
                   * native).
                   */
                  evaluateEvent: function (event, eventIsSynthetic) {
                    if (!listeners.length) {
                      return;
                    }

                    // When an event is handled it is evaluated a single time but checks out which rules are
                    // targeting elements starting at the target node and looking all the way up the element
                    // hierarchy. This should only happen once regardless of how many listeners exist for the
                    // event.
                    if (processedEvents.has(event)) {
                      return;
                    }

                    var node = event.target;
                    var childHasTriggeredRule = false;

                    // Loop through from the event target up through the hierarchy evaluating each node
                    // to see if it matches any rules.
                    while (node) {
                      var preventEvaluationOnAncestors = false;

                      var nodeTriggeredRule = false;

                      // Just because this could be processed a lot, we'll use a for loop instead of forEach.
                      for (var i = 0; i < listeners.length; i++) {
                        var listener = listeners[i];
                        var elementSelector = listener.settings.elementSelector;
                        var elementProperties = listener.settings.elementProperties;

                        // bubbleFireIfChildFired should be considered true by default
                        if (
                          listener.settings.bubbleFireIfChildFired === false &&
                          childHasTriggeredRule
                        ) {
                          continue;
                        }

                        // bubbleFireIfParent should be considered true by default
                        if (
                          node !== event.target &&
                          listener.settings.bubbleFireIfParent === false
                        ) {
                          continue;
                        }

                        // If the user didn't specify elementSelector or elementProperties then they want the
                        // rule to run whenever the event occurs on any element. They don't intend for the
                        // rule to run for every node in the element hierarchy though.
                        if (
                          node !== event.target &&
                          !elementSelector &&
                          (!elementProperties || !Object.keys(elementProperties).length)
                        ) {
                          continue;
                        }

                        if (elementSelector && !matchesSelector(node, elementSelector)) {
                          continue;
                        }

                        if (
                          elementProperties &&
                          !matchesProperties(node, elementProperties)
                        ) {
                          continue;
                        }

                        var syntheticEventForCallback = {};

                        // We'll attach relevant data depending on whether the passed in event is synthetic
                        // or native.
                        if (eventIsSynthetic) {
                          Object.keys(event).forEach(function (key) {
                            syntheticEventForCallback[key] = event[key];
                          });
                        } else {
                          syntheticEventForCallback.nativeEvent = event;
                        }

                        syntheticEventForCallback.element = node;
                        syntheticEventForCallback.target = event.target;

                        var callbackResponse = listener.callback(syntheticEventForCallback);

                        // The callback should return false if it didn't end up triggering a rule.
                        var ruleTriggered = callbackResponse !== false;

                        if (ruleTriggered) {
                          nodeTriggeredRule = true;

                          if (listener.settings.bubbleStop) {
                            preventEvaluationOnAncestors = true;
                          }
                        }
                      }

                      if (preventEvaluationOnAncestors) {
                        break;
                      }

                      if (nodeTriggeredRule) {
                        childHasTriggeredRule = true;
                      }

                      node = node.parentNode;
                    }

                    processedEvents.set(event, true);
                  }
                };

                /**
                 * @private
                 * Clears all listeners. This should only be used in tests.
                 */
                bubbly.__reset = function () {
                  listeners = [];
                };

                return bubbly;
              };

            }

          },
          "core/src/lib/events/helpers/weakMap.js": {
            "script": function(module, exports, require, turbine) {
              /**
               * @license
               * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
               * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
               * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
               * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
               * Code distributed by Google as part of the polymer project is also
               * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
               */
// This is copied from
// https://github.com/webcomponents/webcomponentsjs/blob/7dc6731eb9c9f9c3fea4419c50c6ee3ca0367544/src/WeakMap/WeakMap.js
// because there's not an npm package that makes it easy to import only WeakMap. We've also
// modified it slightly so that it doesn't ever set window.WeakMap.

              'use strict';

              var window = require('@adobe/reactor-window');
              var WeakMap = window.WeakMap;

              if (typeof WeakMap === 'undefined') {
                var defineProperty = Object.defineProperty;
                var counter = Date.now() % 1e9;

                WeakMap = function () {
                  this.name = '__st' + ((Math.random() * 1e9) >>> 0) + (counter++ + '__');
                };

                WeakMap.prototype = {
                  set: function (key, value) {
                    var entry = key[this.name];
                    if (entry && entry[0] === key) entry[1] = value;
                    else
                      defineProperty(key, this.name, { value: [key, value], writable: true });
                    return this;
                  },
                  get: function (key) {
                    var entry;
                    return (entry = key[this.name]) && entry[0] === key
                      ? entry[1]
                      : undefined;
                  },
                  delete: function (key) {
                    var entry = key[this.name];
                    if (!entry || entry[0] !== key) return false;
                    entry[0] = entry[1] = undefined;
                    return true;
                  },
                  has: function (key) {
                    var entry = key[this.name];
                    if (!entry) return false;
                    return entry[0] === key;
                  }
                };
              }

              module.exports = WeakMap;

            }

          },
          "core/src/lib/helpers/stringAndNumberUtils.js": {
            "script": function(module, exports, require, turbine) {
              'use strict';

              var isNumber = function (value) {
                return typeof value === 'number' && isFinite(value); // isFinite weeds out NaNs.
              };

              var isString = function (value) {
                return typeof value === 'string' || value instanceof String;
              };

              var castToStringIfNumber = function (value) {
                return isNumber(value) ? String(value) : value;
              };

              var castToNumberIfString = function (value) {
                return isString(value) ? Number(value) : value;
              };

              module.exports = {
                isNumber: isNumber,
                isString: isString,
                castToStringIfNumber: castToStringIfNumber,
                castToNumberIfString: castToNumberIfString
              };

            }

          },
          "core/src/lib/events/helpers/matchesProperties.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              var textMatch = require('./../../helpers/textMatch');

              var getElementProperty = function (element, property) {
                if (property === '@text' || property === 'innerText') {
                  return element.textContent || element.innerText;
                } else if (property in element) {
                  return element[property];
                } else if (element.getAttribute) {
                  return element.getAttribute(property);
                }
              };

              /**
               * Determines whether an element's properties and their values match a set of properties and values.
               * If the element doesn't have the property, the element's attribute with the same name will be
               * evaluated if it exists.
               * @param {HTMLElement} element The element to match against.
               * @param {Object[]} properties The criteria of properties to match again.
               * @param {string} properties.name The property name.
               * @param {string} properties.value The property value.
               * @param {boolean} [properties.valueIsRegex=false] Whether <code>value</code> on the
               * object instance is intended to be a regular expression.
               * @returns {boolean} Whether the element matches the criteria.
               */
              module.exports = function (element, properties) {
                if (properties) {
                  return properties.every(function (property) {
                    var actualValue = getElementProperty(element, property.name);
                    var criterionValue = property.valueIsRegex
                      ? new RegExp(property.value, 'i')
                      : property.value;
                    return textMatch(actualValue, criterionValue);
                  });
                }
                return true;
              };

            }

          },
          "core/src/lib/events/helpers/matchesSelector.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              /**
               * Returns whether an element matches a selector.
               * @param {HTMLElement} element The HTML element being tested.
               * @param {string} selector The CSS selector.
               * @returns {boolean}
               */
              module.exports = function (element, selector) {
                var matches = element.matches || element.msMatchesSelector;

                if (matches) {
                  try {
                    return matches.call(element, selector);
                  } catch (error) {
                    turbine.logger.warn(
                      'Matching element failed. ' + selector + ' is not a valid selector.'
                    );
                    return false;
                  }
                }

                return false;
              };

            }

          },
          "core/src/lib/helpers/textMatch.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              /**
               * Performs a string match based on another string or a regex.
               * @param {string} str The string to be evaluate.
               * @param {string|RegExp} pattern The pattern to match against.
               * @returns {boolean} Whether the string matches the pattern.
               */
              module.exports = function (str, pattern) {
                if (pattern == null) {
                  throw new Error('Illegal Argument: Pattern is not present');
                }
                if (str == null) {
                  return false;
                }
                if (typeof pattern === 'string') {
                  return str === pattern;
                } else if (pattern instanceof RegExp) {
                  return pattern.test(str);
                } else {
                  return false;
                }
              };

            }

          },
          "core/src/lib/actions/helpers/decorateCode.js": {
            "script": function(module, exports, require, turbine) {
              /*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

              'use strict';

              var decorateGlobalJavaScriptCode = require('./decorators/decorateGlobalJavaScriptCode');
              var decorateNonGlobalJavaScriptCode = require('./decorators/decorateNonGlobalJavaScriptCode');
              var decorateHtmlCode = require('./decorators/decorateHtmlCode');

              var decorators = {
                javascript: function (action, source) {
                  return action.settings.global
                    ? decorateGlobalJavaScriptCode(action, source)
                    : decorateNonGlobalJavaScriptCode(action, source);
                },
                html: decorateHtmlCode
              };

              module.exports = function (action, source) {
                return decorators[action.settings.language](action, source);
              };

            }

          },
          "core/src/lib/actions/helpers/loadCodeSequentially.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              var Promise = require('@adobe/reactor-promise');
              var getSourceByUrl = require('./getSourceByUrl');

              var previousExecuteCodePromise = Promise.resolve();

              module.exports = function (sourceUrl) {
                var sequentiallyLoadCodePromise = new Promise(function (resolve) {
                  var loadCodePromise = getSourceByUrl(sourceUrl);

                  Promise.all([loadCodePromise, previousExecuteCodePromise]).then(function (
                    values
                  ) {
                    var source = values[0];
                    resolve(source);
                  });
                });

                previousExecuteCodePromise = sequentiallyLoadCodePromise;
                return sequentiallyLoadCodePromise;
              };

            }

          },
          "core/node_modules/postscribe/dist/postscribe.js": {
            "script": function(module, exports, require, turbine) {
              /**
               * @file postscribe
               * @description Asynchronously write javascript, even with document.write.
               * @version v2.0.8
               * @see {@link https://krux.github.io/postscribe}
               * @license MIT
               * @author Derek Brans
               * @copyright 2016 Krux Digital, Inc
               */
              (function webpackUniversalModuleDefinition(root, factory) {
                if(typeof exports === 'object' && typeof module === 'object')
                  module.exports = factory();
                else if(typeof define === 'function' && define.amd)
                  define([], factory);
                else if(typeof exports === 'object')
                  exports["postscribe"] = factory();
                else
                  root["postscribe"] = factory();
              })(this, function() {
                return /******/ (function(modules) { // webpackBootstrap
                  /******/ 	// The module cache
                  /******/ 	var installedModules = {};
                  /******/
                  /******/ 	// The require function
                  /******/ 	function __webpack_require__(moduleId) {
                    /******/
                    /******/ 		// Check if module is in cache
                    /******/ 		if(installedModules[moduleId])
                      /******/ 			return installedModules[moduleId].exports;
                    /******/
                    /******/ 		// Create a new module (and put it into the cache)
                    /******/ 		var module = installedModules[moduleId] = {
                      /******/ 			exports: {},
                      /******/ 			id: moduleId,
                      /******/ 			loaded: false
                      /******/ 		};
                    /******/
                    /******/ 		// Execute the module function
                    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                    /******/
                    /******/ 		// Flag the module as loaded
                    /******/ 		module.loaded = true;
                    /******/
                    /******/ 		// Return the exports of the module
                    /******/ 		return module.exports;
                    /******/ 	}
                  /******/
                  /******/
                  /******/ 	// expose the modules object (__webpack_modules__)
                  /******/ 	__webpack_require__.m = modules;
                  /******/
                  /******/ 	// expose the module cache
                  /******/ 	__webpack_require__.c = installedModules;
                  /******/
                  /******/ 	// __webpack_public_path__
                  /******/ 	__webpack_require__.p = "";
                  /******/
                  /******/ 	// Load entry module and return exports
                  /******/ 	return __webpack_require__(0);
                  /******/ })
                  /************************************************************************/
                  /******/ ([
                    /* 0 */
                    /***/ function(module, exports, __webpack_require__) {

                      'use strict';

                      var _postscribe = __webpack_require__(1);

                      var _postscribe2 = _interopRequireDefault(_postscribe);

                      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                      module.exports = _postscribe2['default'];

                      /***/ },
                    /* 1 */
                    /***/ function(module, exports, __webpack_require__) {

                      'use strict';

                      exports.__esModule = true;

                      var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

                      exports['default'] = postscribe;

                      var _writeStream = __webpack_require__(2);

                      var _writeStream2 = _interopRequireDefault(_writeStream);

                      var _utils = __webpack_require__(4);

                      var utils = _interopRequireWildcard(_utils);

                      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

                      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                      /**
                       * A function that intentionally does nothing.
                       */
                      function doNothing() {}

                      /**
                       * Available options and defaults.
                       *
                       * @type {Object}
                       */
                      var OPTIONS = {
                        /**
                         * Called when an async script has loaded.
                         */
                        afterAsync: doNothing,

                        /**
                         * Called immediately before removing from the write queue.
                         */
                        afterDequeue: doNothing,

                        /**
                         * Called sync after a stream's first thread release.
                         */
                        afterStreamStart: doNothing,

                        /**
                         * Called after writing buffered document.write calls.
                         */
                        afterWrite: doNothing,

                        /**
                         * Allows disabling the autoFix feature of prescribe
                         */
                        autoFix: true,

                        /**
                         * Called immediately before adding to the write queue.
                         */
                        beforeEnqueue: doNothing,

                        /**
                         * Called before writing a token.
                         *
                         * @param {Object} tok The token
                         */
                        beforeWriteToken: function beforeWriteToken(tok) {
                          return tok;
                        },

                        /**
                         * Called before writing buffered document.write calls.
                         *
                         * @param {String} str The string
                         */
                        beforeWrite: function beforeWrite(str) {
                          return str;
                        },

                        /**
                         * Called when evaluation is finished.
                         */
                        done: doNothing,

                        /**
                         * Called when a write results in an error.
                         *
                         * @param {Error} e The error
                         */
                        error: function error(e) {
                          throw new Error(e.msg);
                        },


                        /**
                         * Whether to let scripts w/ async attribute set fall out of the queue.
                         */
                        releaseAsync: false
                      };

                      var nextId = 0;
                      var queue = [];
                      var active = null;

                      function nextStream() {
                        var args = queue.shift();
                        if (args) {
                          var options = utils.last(args);

                          options.afterDequeue();
                          args.stream = runStream.apply(undefined, args);
                          options.afterStreamStart();
                        }
                      }

                      function runStream(el, html, options) {
                        active = new _writeStream2['default'](el, options);

                        // Identify this stream.
                        active.id = nextId++;
                        active.name = options.name || active.id;
                        postscribe.streams[active.name] = active;

                        // Override document.write.
                        var doc = el.ownerDocument;

                        var stash = {
                          close: doc.close,
                          open: doc.open,
                          write: doc.write,
                          writeln: doc.writeln
                        };

                        function _write(str) {
                          str = options.beforeWrite(str);
                          active.write(str);
                          options.afterWrite(str);
                        }

                        _extends(doc, {
                          close: doNothing,
                          open: doNothing,
                          write: function write() {
                            for (var _len = arguments.length, str = Array(_len), _key = 0; _key < _len; _key++) {
                              str[_key] = arguments[_key];
                            }

                            return _write(str.join(''));
                          },
                          writeln: function writeln() {
                            for (var _len2 = arguments.length, str = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                              str[_key2] = arguments[_key2];
                            }

                            return _write(str.join('') + '\n');
                          }
                        });

                        // Override window.onerror
                        var oldOnError = active.win.onerror || doNothing;

                        // This works together with the try/catch around WriteStream::insertScript
                        // In modern browsers, exceptions in tag scripts go directly to top level
                        active.win.onerror = function (msg, url, line) {
                          options.error({ msg: msg + ' - ' + url + ': ' + line });
                          oldOnError.apply(active.win, [msg, url, line]);
                        };

                        // Write to the stream
                        active.write(html, function () {
                          // restore document.write
                          _extends(doc, stash);

                          // restore window.onerror
                          active.win.onerror = oldOnError;

                          options.done();
                          active = null;
                          nextStream();
                        });

                        return active;
                      }

                      function postscribe(el, html, options) {
                        if (utils.isFunction(options)) {
                          options = { done: options };
                        } else if (options === 'clear') {
                          queue = [];
                          active = null;
                          nextId = 0;
                          return;
                        }

                        options = utils.defaults(options, OPTIONS);

                        // id selector
                        if (/^#/.test(el)) {
                          el = window.document.getElementById(el.substr(1));
                        } else {
                          el = el.jquery ? el[0] : el;
                        }

                        var args = [el, html, options];

                        el.postscribe = {
                          cancel: function cancel() {
                            if (args.stream) {
                              args.stream.abort();
                            } else {
                              args[1] = doNothing;
                            }
                          }
                        };

                        options.beforeEnqueue(args);
                        queue.push(args);

                        if (!active) {
                          nextStream();
                        }

                        return el.postscribe;
                      }

                      _extends(postscribe, {
                        // Streams by name.
                        streams: {},
                        // Queue of streams.
                        queue: queue,
                        // Expose internal classes.
                        WriteStream: _writeStream2['default']
                      });

                      /***/ },
                    /* 2 */
                    /***/ function(module, exports, __webpack_require__) {

                      'use strict';

                      exports.__esModule = true;

                      var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

                      var _prescribe = __webpack_require__(3);

                      var _prescribe2 = _interopRequireDefault(_prescribe);

                      var _utils = __webpack_require__(4);

                      var utils = _interopRequireWildcard(_utils);

                      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

                      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                      function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

                      /**
                       * Turn on to debug how each chunk affected the DOM.
                       * @type {boolean}
                       */
                      var DEBUG_CHUNK = false;

                      /**
                       * Prefix for data attributes on DOM elements.
                       * @type {string}
                       */
                      var BASEATTR = 'data-ps-';

                      /**
                       * ID for the style proxy
                       * @type {string}
                       */
                      var PROXY_STYLE = 'ps-style';

                      /**
                       * ID for the script proxy
                       * @type {string}
                       */
                      var PROXY_SCRIPT = 'ps-script';

                      /**
                       * Get data attributes
                       *
                       * @param {Object} el The DOM element.
                       * @param {String} name The attribute name.
                       * @returns {String}
                       */
                      function getData(el, name) {
                        var attr = BASEATTR + name;

                        var val = el.getAttribute(attr);

                        // IE 8 returns a number if it's a number
                        return !utils.existy(val) ? val : String(val);
                      }

                      /**
                       * Set data attributes
                       *
                       * @param {Object} el The DOM element.
                       * @param {String} name The attribute name.
                       * @param {null|*} value The attribute value.
                       */
                      function setData(el, name) {
                        var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

                        var attr = BASEATTR + name;

                        if (utils.existy(value) && value !== '') {
                          el.setAttribute(attr, value);
                        } else {
                          el.removeAttribute(attr);
                        }
                      }

                      /**
                       * Stream static html to an element, where "static html" denotes "html
                       * without scripts".
                       *
                       * This class maintains a *history of writes devoid of any attributes* or
                       * "proxy history".
                       *
                       * Injecting the proxy history into a temporary div has no side-effects,
                       * other than to create proxy elements for previously written elements.
                       *
                       * Given the `staticHtml` of a new write, a `tempDiv`'s innerHTML is set to
                       * `proxy_history + staticHtml`.
                       * The *structure* of `tempDiv`'s contents, (i.e., the placement of new nodes
                       * beside or inside of proxy elements), reflects the DOM structure that would
                       * have resulted if all writes had been squashed into a single write.
                       *
                       * For each descendent `node` of `tempDiv` whose parentNode is a *proxy*,
                       * `node` is appended to the corresponding *real* element within the DOM.
                       *
                       * Proxy elements are mapped to *actual* elements in the DOM by injecting a
                       * `data-id` attribute into each start tag in `staticHtml`.
                       *
                       */

                      var WriteStream = function () {
                        /**
                         * Constructor.
                         *
                         * @param {Object} root The root element
                         * @param {?Object} options The options
                         */
                        function WriteStream(root) {
                          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                          _classCallCheck(this, WriteStream);

                          this.root = root;
                          this.options = options;
                          this.doc = root.ownerDocument;
                          this.win = this.doc.defaultView || this.doc.parentWindow;
                          this.parser = new _prescribe2['default']('', { autoFix: options.autoFix });

                          // Actual elements by id.
                          this.actuals = [root];

                          // Embodies the "structure" of what's been written so far,
                          // devoid of attributes.
                          this.proxyHistory = '';

                          // Create a proxy of the root element.
                          this.proxyRoot = this.doc.createElement(root.nodeName);

                          this.scriptStack = [];
                          this.writeQueue = [];

                          setData(this.proxyRoot, 'proxyof', 0);
                        }

                        /**
                         * Writes the given strings.
                         *
                         * @param {...String} str The strings to write
                         */


                        WriteStream.prototype.write = function write() {
                          var _writeQueue;

                          (_writeQueue = this.writeQueue).push.apply(_writeQueue, arguments);

                          // Process writes
                          // When new script gets pushed or pending this will stop
                          // because new writeQueue gets pushed
                          while (!this.deferredRemote && this.writeQueue.length) {
                            var arg = this.writeQueue.shift();

                            if (utils.isFunction(arg)) {
                              this._callFunction(arg);
                            } else {
                              this._writeImpl(arg);
                            }
                          }
                        };

                        /**
                         * Calls the given function.
                         *
                         * @param {Function} fn The function to call
                         * @private
                         */


                        WriteStream.prototype._callFunction = function _callFunction(fn) {
                          var tok = { type: 'function', value: fn.name || fn.toString() };
                          this._onScriptStart(tok);
                          fn.call(this.win, this.doc);
                          this._onScriptDone(tok);
                        };

                        /**
                         * The write implementation
                         *
                         * @param {String} html The HTML to write.
                         * @private
                         */


                        WriteStream.prototype._writeImpl = function _writeImpl(html) {
                          this.parser.append(html);

                          var tok = void 0;
                          var script = void 0;
                          var style = void 0;
                          var tokens = [];

                          // stop if we see a script token
                          while ((tok = this.parser.readToken()) && !(script = utils.isScript(tok)) && !(style = utils.isStyle(tok))) {
                            tok = this.options.beforeWriteToken(tok);

                            if (tok) {
                              tokens.push(tok);
                            }
                          }

                          if (tokens.length > 0) {
                            this._writeStaticTokens(tokens);
                          }

                          if (script) {
                            this._handleScriptToken(tok);
                          }

                          if (style) {
                            this._handleStyleToken(tok);
                          }
                        };

                        /**
                         * Write contiguous non-script tokens (a chunk)
                         *
                         * @param {Array<Object>} tokens The tokens
                         * @returns {{tokens, raw, actual, proxy}|null}
                         * @private
                         */


                        WriteStream.prototype._writeStaticTokens = function _writeStaticTokens(tokens) {
                          var chunk = this._buildChunk(tokens);

                          if (!chunk.actual) {
                            // e.g., no tokens, or a noscript that got ignored
                            return null;
                          }

                          chunk.html = this.proxyHistory + chunk.actual;
                          this.proxyHistory += chunk.proxy;
                          this.proxyRoot.innerHTML = chunk.html;

                          if (DEBUG_CHUNK) {
                            chunk.proxyInnerHTML = this.proxyRoot.innerHTML;
                          }

                          this._walkChunk();

                          if (DEBUG_CHUNK) {
                            chunk.actualInnerHTML = this.root.innerHTML;
                          }

                          return chunk;
                        };

                        /**
                         * Build a chunk.
                         *
                         * @param {Array<Object>} tokens The tokens to use.
                         * @returns {{tokens: *, raw: string, actual: string, proxy: string}}
                         * @private
                         */


                        WriteStream.prototype._buildChunk = function _buildChunk(tokens) {
                          var nextId = this.actuals.length;

                          // The raw html of this chunk.
                          var raw = [];

                          // The html to create the nodes in the tokens (with id's injected).
                          var actual = [];

                          // Html that can later be used to proxy the nodes in the tokens.
                          var proxy = [];

                          var len = tokens.length;
                          for (var i = 0; i < len; i++) {
                            var tok = tokens[i];
                            var tokenRaw = tok.toString();

                            raw.push(tokenRaw);

                            if (tok.attrs) {
                              // tok.attrs <==> startTag or atomicTag or cursor
                              // Ignore noscript tags. They are atomic, so we don't have to worry about children.
                              if (!/^noscript$/i.test(tok.tagName)) {
                                var id = nextId++;

                                // Actual: inject id attribute: replace '>' at end of start tag with id attribute + '>'
                                actual.push(tokenRaw.replace(/(\/?>)/, ' ' + BASEATTR + 'id=' + id + ' $1'));

                                // Don't proxy scripts: they have no bearing on DOM structure.
                                if (tok.attrs.id !== PROXY_SCRIPT && tok.attrs.id !== PROXY_STYLE) {
                                  // Proxy: strip all attributes and inject proxyof attribute
                                  proxy.push(
                                    // ignore atomic tags (e.g., style): they have no "structural" effect
                                    tok.type === 'atomicTag' ? '' : '<' + tok.tagName + ' ' + BASEATTR + 'proxyof=' + id + (tok.unary ? ' />' : '>'));
                                }
                              }
                            } else {
                              // Visit any other type of token
                              // Actual: append.
                              actual.push(tokenRaw);

                              // Proxy: append endTags. Ignore everything else.
                              proxy.push(tok.type === 'endTag' ? tokenRaw : '');
                            }
                          }

                          return {
                            tokens: tokens,
                            raw: raw.join(''),
                            actual: actual.join(''),
                            proxy: proxy.join('')
                          };
                        };

                        /**
                         * Walk the chunks.
                         *
                         * @private
                         */


                        WriteStream.prototype._walkChunk = function _walkChunk() {
                          var node = void 0;
                          var stack = [this.proxyRoot];

                          // use shift/unshift so that children are walked in document order
                          while (utils.existy(node = stack.shift())) {
                            var isElement = node.nodeType === 1;
                            var isProxy = isElement && getData(node, 'proxyof');

                            // Ignore proxies
                            if (!isProxy) {
                              if (isElement) {
                                // New actual element: register it and remove the the id attr.
                                this.actuals[getData(node, 'id')] = node;
                                setData(node, 'id');
                              }

                              // Is node's parent a proxy?
                              var parentIsProxyOf = node.parentNode && getData(node.parentNode, 'proxyof');
                              if (parentIsProxyOf) {
                                // Move node under actual parent.
                                this.actuals[parentIsProxyOf].appendChild(node);
                              }
                            }

                            // prepend childNodes to stack
                            stack.unshift.apply(stack, utils.toArray(node.childNodes));
                          }
                        };

                        /**
                         * Handles Script tokens
                         *
                         * @param {Object} tok The token
                         */


                        WriteStream.prototype._handleScriptToken = function _handleScriptToken(tok) {
                          var _this = this;

                          var remainder = this.parser.clear();

                          if (remainder) {
                            // Write remainder immediately behind this script.
                            this.writeQueue.unshift(remainder);
                          }

                          tok.src = tok.attrs.src || tok.attrs.SRC;

                          tok = this.options.beforeWriteToken(tok);
                          if (!tok) {
                            // User has removed this token
                            return;
                          }

                          if (tok.src && this.scriptStack.length) {
                            // Defer this script until scriptStack is empty.
                            // Assumption 1: This script will not start executing until
                            // scriptStack is empty.
                            this.deferredRemote = tok;
                          } else {
                            this._onScriptStart(tok);
                          }

                          // Put the script node in the DOM.
                          this._writeScriptToken(tok, function () {
                            _this._onScriptDone(tok);
                          });
                        };

                        /**
                         * Handles style tokens
                         *
                         * @param {Object} tok The token
                         */


                        WriteStream.prototype._handleStyleToken = function _handleStyleToken(tok) {
                          var remainder = this.parser.clear();

                          if (remainder) {
                            // Write remainder immediately behind this style.
                            this.writeQueue.unshift(remainder);
                          }

                          tok.type = tok.attrs.type || tok.attrs.TYPE || 'text/css';

                          tok = this.options.beforeWriteToken(tok);

                          if (tok) {
                            // Put the style node in the DOM.
                            this._writeStyleToken(tok);
                          }

                          if (remainder) {
                            this.write();
                          }
                        };

                        /**
                         * Build a style and insert it into the DOM.
                         *
                         * @param {Object} tok The token
                         */


                        WriteStream.prototype._writeStyleToken = function _writeStyleToken(tok) {
                          var el = this._buildStyle(tok);

                          this._insertCursor(el, PROXY_STYLE);

                          // Set content
                          if (tok.content) {
                            if (el.styleSheet && !el.sheet) {
                              el.styleSheet.cssText = tok.content;
                            } else {
                              el.appendChild(this.doc.createTextNode(tok.content));
                            }
                          }
                        };

                        /**
                         * Build a style element from an atomic style token.
                         *
                         * @param {Object} tok The token
                         * @returns {Element}
                         */


                        WriteStream.prototype._buildStyle = function _buildStyle(tok) {
                          var el = this.doc.createElement(tok.tagName);

                          el.setAttribute('type', tok.type);

                          // Set attributes
                          utils.eachKey(tok.attrs, function (name, value) {
                            el.setAttribute(name, value);
                          });

                          return el;
                        };

                        /**
                         * Append a span to the stream. That span will act as a cursor
                         * (i.e. insertion point) for the element.
                         *
                         * @param {Object} el The element
                         * @param {string} which The type of proxy element
                         */


                        WriteStream.prototype._insertCursor = function _insertCursor(el, which) {
                          this._writeImpl('<span id="' + which + '"/>');

                          var cursor = this.doc.getElementById(which);

                          if (cursor) {
                            cursor.parentNode.replaceChild(el, cursor);
                          }
                        };

                        /**
                         * Called when a script is started.
                         *
                         * @param {Object} tok The token
                         * @private
                         */


                        WriteStream.prototype._onScriptStart = function _onScriptStart(tok) {
                          tok.outerWrites = this.writeQueue;
                          this.writeQueue = [];
                          this.scriptStack.unshift(tok);
                        };

                        /**
                         * Called when a script is done.
                         *
                         * @param {Object} tok The token
                         * @private
                         */


                        WriteStream.prototype._onScriptDone = function _onScriptDone(tok) {
                          // Pop script and check nesting.
                          if (tok !== this.scriptStack[0]) {
                            this.options.error({ msg: 'Bad script nesting or script finished twice' });
                            return;
                          }

                          this.scriptStack.shift();

                          // Append outer writes to queue and process them.
                          this.write.apply(this, tok.outerWrites);

                          // Check for pending remote

                          // Assumption 2: if remote_script1 writes remote_script2 then
                          // the we notice remote_script1 finishes before remote_script2 starts.
                          // I think this is equivalent to assumption 1
                          if (!this.scriptStack.length && this.deferredRemote) {
                            this._onScriptStart(this.deferredRemote);
                            this.deferredRemote = null;
                          }
                        };

                        /**
                         * Build a script and insert it into the DOM.
                         * Done is called once script has executed.
                         *
                         * @param {Object} tok The token
                         * @param {Function} done The callback when complete
                         */


                        WriteStream.prototype._writeScriptToken = function _writeScriptToken(tok, done) {
                          var el = this._buildScript(tok);
                          var asyncRelease = this._shouldRelease(el);
                          var afterAsync = this.options.afterAsync;

                          if (tok.src) {
                            // Fix for attribute "SRC" (capitalized). IE does not recognize it.
                            el.src = tok.src;
                            this._scriptLoadHandler(el, !asyncRelease ? function () {
                              done();
                              afterAsync();
                            } : afterAsync);
                          }

                          try {
                            this._insertCursor(el, PROXY_SCRIPT);
                            if (!el.src || asyncRelease) {
                              done();
                            }
                          } catch (e) {
                            this.options.error(e);
                            done();
                          }
                        };

                        /**
                         * Build a script element from an atomic script token.
                         *
                         * @param {Object} tok The token
                         * @returns {Element}
                         */


                        WriteStream.prototype._buildScript = function _buildScript(tok) {
                          var el = this.doc.createElement(tok.tagName);

                          // Set attributes
                          utils.eachKey(tok.attrs, function (name, value) {
                            el.setAttribute(name, value);
                          });

                          // Set content
                          if (tok.content) {
                            el.text = tok.content;
                          }

                          return el;
                        };

                        /**
                         * Setup the script load handler on an element.
                         *
                         * @param {Object} el The element
                         * @param {Function} done The callback
                         * @private
                         */


                        WriteStream.prototype._scriptLoadHandler = function _scriptLoadHandler(el, done) {
                          function cleanup() {
                            el = el.onload = el.onreadystatechange = el.onerror = null;
                          }

                          var error = this.options.error;

                          function success() {
                            cleanup();
                            if (done != null) {
                              done();
                            }
                            done = null;
                          }

                          function failure(err) {
                            cleanup();
                            error(err);
                            if (done != null) {
                              done();
                            }
                            done = null;
                          }

                          function reattachEventListener(el, evt) {
                            var handler = el['on' + evt];
                            if (handler != null) {
                              el['_on' + evt] = handler;
                            }
                          }

                          reattachEventListener(el, 'load');
                          reattachEventListener(el, 'error');

                          _extends(el, {
                            onload: function onload() {
                              if (el._onload) {
                                try {
                                  el._onload.apply(this, Array.prototype.slice.call(arguments, 0));
                                } catch (err) {
                                  failure({ msg: 'onload handler failed ' + err + ' @ ' + el.src });
                                }
                              }
                              success();
                            },
                            onerror: function onerror() {
                              if (el._onerror) {
                                try {
                                  el._onerror.apply(this, Array.prototype.slice.call(arguments, 0));
                                } catch (err) {
                                  failure({ msg: 'onerror handler failed ' + err + ' @ ' + el.src });
                                  return;
                                }
                              }
                              failure({ msg: 'remote script failed ' + el.src });
                            },
                            onreadystatechange: function onreadystatechange() {
                              if (/^(loaded|complete)$/.test(el.readyState)) {
                                success();
                              }
                            }
                          });
                        };

                        /**
                         * Determines whether to release.
                         *
                         * @param {Object} el The element
                         * @returns {boolean}
                         * @private
                         */


                        WriteStream.prototype._shouldRelease = function _shouldRelease(el) {
                          var isScript = /^script$/i.test(el.nodeName);
                          return !isScript || !!(this.options.releaseAsync && el.src && el.hasAttribute('async'));
                        };

                        return WriteStream;
                      }();

                      exports['default'] = WriteStream;

                      /***/ },
                    /* 3 */
                    /***/ function(module, exports, __webpack_require__) {

                      /**
                       * @file prescribe
                       * @description Tiny, forgiving HTML parser
                       * @version vundefined
                       * @see {@link https://github.com/krux/prescribe/}
                       * @license MIT
                       * @author Derek Brans
                       * @copyright 2016 Krux Digital, Inc
                       */
                      (function webpackUniversalModuleDefinition(root, factory) {
                        if(true)
                          module.exports = factory();
                        else if(typeof define === 'function' && define.amd)
                          define([], factory);
                        else if(typeof exports === 'object')
                          exports["Prescribe"] = factory();
                        else
                          root["Prescribe"] = factory();
                      })(this, function() {
                        return /******/ (function(modules) { // webpackBootstrap
                          /******/ 	// The module cache
                          /******/ 	var installedModules = {};

                          /******/ 	// The require function
                          /******/ 	function __webpack_require__(moduleId) {

                            /******/ 		// Check if module is in cache
                            /******/ 		if(installedModules[moduleId])
                              /******/ 			return installedModules[moduleId].exports;

                            /******/ 		// Create a new module (and put it into the cache)
                            /******/ 		var module = installedModules[moduleId] = {
                              /******/ 			exports: {},
                              /******/ 			id: moduleId,
                              /******/ 			loaded: false
                              /******/ 		};

                            /******/ 		// Execute the module function
                            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

                            /******/ 		// Flag the module as loaded
                            /******/ 		module.loaded = true;

                            /******/ 		// Return the exports of the module
                            /******/ 		return module.exports;
                            /******/ 	}


                          /******/ 	// expose the modules object (__webpack_modules__)
                          /******/ 	__webpack_require__.m = modules;

                          /******/ 	// expose the module cache
                          /******/ 	__webpack_require__.c = installedModules;

                          /******/ 	// __webpack_public_path__
                          /******/ 	__webpack_require__.p = "";

                          /******/ 	// Load entry module and return exports
                          /******/ 	return __webpack_require__(0);
                          /******/ })
                          /************************************************************************/
                          /******/ ([
                            /* 0 */
                            /***/ function(module, exports, __webpack_require__) {

                              'use strict';

                              var _HtmlParser = __webpack_require__(1);

                              var _HtmlParser2 = _interopRequireDefault(_HtmlParser);

                              function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                              module.exports = _HtmlParser2['default'];

                              /***/ },
                            /* 1 */
                            /***/ function(module, exports, __webpack_require__) {

                              'use strict';

                              exports.__esModule = true;

                              var _supports = __webpack_require__(2);

                              var supports = _interopRequireWildcard(_supports);

                              var _streamReaders = __webpack_require__(3);

                              var streamReaders = _interopRequireWildcard(_streamReaders);

                              var _fixedReadTokenFactory = __webpack_require__(6);

                              var _fixedReadTokenFactory2 = _interopRequireDefault(_fixedReadTokenFactory);

                              var _utils = __webpack_require__(5);

                              function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                              function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

                              function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

                              /**
                               * Detection regular expressions.
                               *
                               * Order of detection matters: detection of one can only
                               * succeed if detection of previous didn't

                               * @type {Object}
                               */
                              var detect = {
                                comment: /^<!--/,
                                endTag: /^<\//,
                                atomicTag: /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
                                startTag: /^</,
                                chars: /^[^<]/
                              };

                              /**
                               * HtmlParser provides the capability to parse HTML and return tokens
                               * representing the tags and content.
                               */

                              var HtmlParser = function () {
                                /**
                                 * Constructor.
                                 *
                                 * @param {string} stream The initial parse stream contents.
                                 * @param {Object} options The options
                                 * @param {boolean} options.autoFix Set to true to automatically fix errors
                                 */
                                function HtmlParser() {
                                  var _this = this;

                                  var stream = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                                  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                                  _classCallCheck(this, HtmlParser);

                                  this.stream = stream;

                                  var fix = false;
                                  var fixedTokenOptions = {};

                                  for (var key in supports) {
                                    if (supports.hasOwnProperty(key)) {
                                      if (options.autoFix) {
                                        fixedTokenOptions[key + 'Fix'] = true; // !supports[key];
                                      }
                                      fix = fix || fixedTokenOptions[key + 'Fix'];
                                    }
                                  }

                                  if (fix) {
                                    this._readToken = (0, _fixedReadTokenFactory2['default'])(this, fixedTokenOptions, function () {
                                      return _this._readTokenImpl();
                                    });
                                    this._peekToken = (0, _fixedReadTokenFactory2['default'])(this, fixedTokenOptions, function () {
                                      return _this._peekTokenImpl();
                                    });
                                  } else {
                                    this._readToken = this._readTokenImpl;
                                    this._peekToken = this._peekTokenImpl;
                                  }
                                }

                                /**
                                 * Appends the given string to the parse stream.
                                 *
                                 * @param {string} str The string to append
                                 */


                                HtmlParser.prototype.append = function append(str) {
                                  this.stream += str;
                                };

                                /**
                                 * Prepends the given string to the parse stream.
                                 *
                                 * @param {string} str The string to prepend
                                 */


                                HtmlParser.prototype.prepend = function prepend(str) {
                                  this.stream = str + this.stream;
                                };

                                /**
                                 * The implementation of the token reading.
                                 *
                                 * @private
                                 * @returns {?Token}
                                 */


                                HtmlParser.prototype._readTokenImpl = function _readTokenImpl() {
                                  var token = this._peekTokenImpl();
                                  if (token) {
                                    this.stream = this.stream.slice(token.length);
                                    return token;
                                  }
                                };

                                /**
                                 * The implementation of token peeking.
                                 *
                                 * @returns {?Token}
                                 */


                                HtmlParser.prototype._peekTokenImpl = function _peekTokenImpl() {
                                  for (var type in detect) {
                                    if (detect.hasOwnProperty(type)) {
                                      if (detect[type].test(this.stream)) {
                                        var token = streamReaders[type](this.stream);

                                        if (token) {
                                          if (token.type === 'startTag' && /script|style/i.test(token.tagName)) {
                                            return null;
                                          } else {
                                            token.text = this.stream.substr(0, token.length);
                                            return token;
                                          }
                                        }
                                      }
                                    }
                                  }
                                };

                                /**
                                 * The public token peeking interface.  Delegates to the basic token peeking
                                 * or a version that performs fixups depending on the `autoFix` setting in
                                 * options.
                                 *
                                 * @returns {object}
                                 */


                                HtmlParser.prototype.peekToken = function peekToken() {
                                  return this._peekToken();
                                };

                                /**
                                 * The public token reading interface.  Delegates to the basic token reading
                                 * or a version that performs fixups depending on the `autoFix` setting in
                                 * options.
                                 *
                                 * @returns {object}
                                 */


                                HtmlParser.prototype.readToken = function readToken() {
                                  return this._readToken();
                                };

                                /**
                                 * Read tokens and hand to the given handlers.
                                 *
                                 * @param {Object} handlers The handlers to use for the different tokens.
                                 */


                                HtmlParser.prototype.readTokens = function readTokens(handlers) {
                                  var tok = void 0;
                                  while (tok = this.readToken()) {
                                    // continue until we get an explicit "false" return
                                    if (handlers[tok.type] && handlers[tok.type](tok) === false) {
                                      return;
                                    }
                                  }
                                };

                                /**
                                 * Clears the parse stream.
                                 *
                                 * @returns {string} The contents of the parse stream before clearing.
                                 */


                                HtmlParser.prototype.clear = function clear() {
                                  var rest = this.stream;
                                  this.stream = '';
                                  return rest;
                                };

                                /**
                                 * Returns the rest of the parse stream.
                                 *
                                 * @returns {string} The contents of the parse stream.
                                 */


                                HtmlParser.prototype.rest = function rest() {
                                  return this.stream;
                                };

                                return HtmlParser;
                              }();

                              exports['default'] = HtmlParser;


                              HtmlParser.tokenToString = function (tok) {
                                return tok.toString();
                              };

                              HtmlParser.escapeAttributes = function (attrs) {
                                var escapedAttrs = {};

                                for (var name in attrs) {
                                  if (attrs.hasOwnProperty(name)) {
                                    escapedAttrs[name] = (0, _utils.escapeQuotes)(attrs[name], null);
                                  }
                                }

                                return escapedAttrs;
                              };

                              HtmlParser.supports = supports;

                              for (var key in supports) {
                                if (supports.hasOwnProperty(key)) {
                                  HtmlParser.browserHasFlaw = HtmlParser.browserHasFlaw || !supports[key] && key;
                                }
                              }

                              /***/ },
                            /* 2 */
                            /***/ function(module, exports) {

                              'use strict';

                              exports.__esModule = true;
                              var tagSoup = false;
                              var selfClose = false;

                              var work = window.document.createElement('div');

                              try {
                                var html = '<P><I></P></I>';
                                work.innerHTML = html;
                                exports.tagSoup = tagSoup = work.innerHTML !== html;
                              } catch (e) {
                                exports.tagSoup = tagSoup = false;
                              }

                              try {
                                work.innerHTML = '<P><i><P></P></i></P>';
                                exports.selfClose = selfClose = work.childNodes.length === 2;
                              } catch (e) {
                                exports.selfClose = selfClose = false;
                              }

                              work = null;

                              exports.tagSoup = tagSoup;
                              exports.selfClose = selfClose;

                              /***/ },
                            /* 3 */
                            /***/ function(module, exports, __webpack_require__) {

                              'use strict';

                              exports.__esModule = true;

                              var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

                              exports.comment = comment;
                              exports.chars = chars;
                              exports.startTag = startTag;
                              exports.atomicTag = atomicTag;
                              exports.endTag = endTag;

                              var _tokens = __webpack_require__(4);

                              /**
                               * Regular Expressions for parsing tags and attributes
                               *
                               * @type {Object}
                               */
                              var REGEXES = {
                                startTag: /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
                                endTag: /^<\/([\-A-Za-z0-9_]+)[^>]*>/,
                                attr: /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,
                                fillAttr: /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i
                              };

                              /**
                               * Reads a comment token
                               *
                               * @param {string} stream The input stream
                               * @returns {CommentToken}
                               */
                              function comment(stream) {
                                var index = stream.indexOf('-->');
                                if (index >= 0) {
                                  return new _tokens.CommentToken(stream.substr(4, index - 1), index + 3);
                                }
                              }

                              /**
                               * Reads non-tag characters.
                               *
                               * @param {string} stream The input stream
                               * @returns {CharsToken}
                               */
                              function chars(stream) {
                                var index = stream.indexOf('<');
                                return new _tokens.CharsToken(index >= 0 ? index : stream.length);
                              }

                              /**
                               * Reads start tag token.
                               *
                               * @param {string} stream The input stream
                               * @returns {StartTagToken}
                               */
                              function startTag(stream) {
                                var endTagIndex = stream.indexOf('>');
                                if (endTagIndex !== -1) {
                                  var match = stream.match(REGEXES.startTag);
                                  if (match) {
                                    var _ret = function () {
                                      var attrs = {};
                                      var booleanAttrs = {};
                                      var rest = match[2];

                                      match[2].replace(REGEXES.attr, function (match, name) {
                                        if (!(arguments[2] || arguments[3] || arguments[4] || arguments[5])) {
                                          attrs[name] = '';
                                        } else if (arguments[5]) {
                                          attrs[arguments[5]] = '';
                                          booleanAttrs[arguments[5]] = true;
                                        } else {
                                          attrs[name] = arguments[2] || arguments[3] || arguments[4] || REGEXES.fillAttr.test(name) && name || '';
                                        }

                                        rest = rest.replace(match, '');
                                      });

                                      return {
                                        v: new _tokens.StartTagToken(match[1], match[0].length, attrs, booleanAttrs, !!match[3], rest.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''))
                                      };
                                    }();

                                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                                  }
                                }
                              }

                              /**
                               * Reads atomic tag token.
                               *
                               * @param {string} stream The input stream
                               * @returns {AtomicTagToken}
                               */
                              function atomicTag(stream) {
                                var start = startTag(stream);
                                if (start) {
                                  var rest = stream.slice(start.length);
                                  // for optimization, we check first just for the end tag
                                  if (rest.match(new RegExp('<\/\\s*' + start.tagName + '\\s*>', 'i'))) {
                                    // capturing the content is inefficient, so we do it inside the if
                                    var match = rest.match(new RegExp('([\\s\\S]*?)<\/\\s*' + start.tagName + '\\s*>', 'i'));
                                    if (match) {
                                      return new _tokens.AtomicTagToken(start.tagName, match[0].length + start.length, start.attrs, start.booleanAttrs, match[1]);
                                    }
                                  }
                                }
                              }

                              /**
                               * Reads an end tag token.
                               *
                               * @param {string} stream The input stream
                               * @returns {EndTagToken}
                               */
                              function endTag(stream) {
                                var match = stream.match(REGEXES.endTag);
                                if (match) {
                                  return new _tokens.EndTagToken(match[1], match[0].length);
                                }
                              }

                              /***/ },
                            /* 4 */
                            /***/ function(module, exports, __webpack_require__) {

                              'use strict';

                              exports.__esModule = true;
                              exports.EndTagToken = exports.AtomicTagToken = exports.StartTagToken = exports.TagToken = exports.CharsToken = exports.CommentToken = exports.Token = undefined;

                              var _utils = __webpack_require__(5);

                              function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

                              /**
                               * Token is a base class for all token types parsed.  Note we don't actually
                               * use intheritance due to IE8's non-existent ES5 support.
                               */
                              var Token =
                                /**
                                 * Constructor.
                                 *
                                 * @param {string} type The type of the Token.
                                 * @param {Number} length The length of the Token text.
                                 */
                                exports.Token = function Token(type, length) {
                                  _classCallCheck(this, Token);

                                  this.type = type;
                                  this.length = length;
                                  this.text = '';
                                };

                              /**
                               * CommentToken represents comment tags.
                               */


                              var CommentToken = exports.CommentToken = function () {
                                /**
                                 * Constructor.
                                 *
                                 * @param {string} content The content of the comment
                                 * @param {Number} length The length of the Token text.
                                 */
                                function CommentToken(content, length) {
                                  _classCallCheck(this, CommentToken);

                                  this.type = 'comment';
                                  this.length = length || (content ? content.length : 0);
                                  this.text = '';
                                  this.content = content;
                                }

                                CommentToken.prototype.toString = function toString() {
                                  return '<!--' + this.content;
                                };

                                return CommentToken;
                              }();

                              /**
                               * CharsToken represents non-tag characters.
                               */


                              var CharsToken = exports.CharsToken = function () {
                                /**
                                 * Constructor.
                                 *
                                 * @param {Number} length The length of the Token text.
                                 */
                                function CharsToken(length) {
                                  _classCallCheck(this, CharsToken);

                                  this.type = 'chars';
                                  this.length = length;
                                  this.text = '';
                                }

                                CharsToken.prototype.toString = function toString() {
                                  return this.text;
                                };

                                return CharsToken;
                              }();

                              /**
                               * TagToken is a base class for all tag-based Tokens.
                               */


                              var TagToken = exports.TagToken = function () {
                                /**
                                 * Constructor.
                                 *
                                 * @param {string} type The type of the token.
                                 * @param {string} tagName The tag name.
                                 * @param {Number} length The length of the Token text.
                                 * @param {Object} attrs The dictionary of attributes and values
                                 * @param {Object} booleanAttrs If an entry has 'true' then the attribute
                                 *                              is a boolean attribute
                                 */
                                function TagToken(type, tagName, length, attrs, booleanAttrs) {
                                  _classCallCheck(this, TagToken);

                                  this.type = type;
                                  this.length = length;
                                  this.text = '';
                                  this.tagName = tagName;
                                  this.attrs = attrs;
                                  this.booleanAttrs = booleanAttrs;
                                  this.unary = false;
                                  this.html5Unary = false;
                                }

                                /**
                                 * Formats the given token tag.
                                 *
                                 * @param {TagToken} tok The TagToken to format.
                                 * @param {?string} [content=null] The content of the token.
                                 * @returns {string} The formatted tag.
                                 */


                                TagToken.formatTag = function formatTag(tok) {
                                  var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                                  var str = '<' + tok.tagName;
                                  for (var key in tok.attrs) {
                                    if (tok.attrs.hasOwnProperty(key)) {
                                      str += ' ' + key;

                                      var val = tok.attrs[key];
                                      if (typeof tok.booleanAttrs === 'undefined' || typeof tok.booleanAttrs[key] === 'undefined') {
                                        str += '="' + (0, _utils.escapeQuotes)(val) + '"';
                                      }
                                    }
                                  }

                                  if (tok.rest) {
                                    str += ' ' + tok.rest;
                                  }

                                  if (tok.unary && !tok.html5Unary) {
                                    str += '/>';
                                  } else {
                                    str += '>';
                                  }

                                  if (content !== undefined && content !== null) {
                                    str += content + '</' + tok.tagName + '>';
                                  }

                                  return str;
                                };

                                return TagToken;
                              }();

                              /**
                               * StartTagToken represents a start token.
                               */


                              var StartTagToken = exports.StartTagToken = function () {
                                /**
                                 * Constructor.
                                 *
                                 * @param {string} tagName The tag name.
                                 * @param {Number} length The length of the Token text
                                 * @param {Object} attrs The dictionary of attributes and values
                                 * @param {Object} booleanAttrs If an entry has 'true' then the attribute
                                 *                              is a boolean attribute
                                 * @param {boolean} unary True if the tag is a unary tag
                                 * @param {string} rest The rest of the content.
                                 */
                                function StartTagToken(tagName, length, attrs, booleanAttrs, unary, rest) {
                                  _classCallCheck(this, StartTagToken);

                                  this.type = 'startTag';
                                  this.length = length;
                                  this.text = '';
                                  this.tagName = tagName;
                                  this.attrs = attrs;
                                  this.booleanAttrs = booleanAttrs;
                                  this.html5Unary = false;
                                  this.unary = unary;
                                  this.rest = rest;
                                }

                                StartTagToken.prototype.toString = function toString() {
                                  return TagToken.formatTag(this);
                                };

                                return StartTagToken;
                              }();

                              /**
                               * AtomicTagToken represents an atomic tag.
                               */


                              var AtomicTagToken = exports.AtomicTagToken = function () {
                                /**
                                 * Constructor.
                                 *
                                 * @param {string} tagName The name of the tag.
                                 * @param {Number} length The length of the tag text.
                                 * @param {Object} attrs The attributes.
                                 * @param {Object} booleanAttrs If an entry has 'true' then the attribute
                                 *                              is a boolean attribute
                                 * @param {string} content The content of the tag.
                                 */
                                function AtomicTagToken(tagName, length, attrs, booleanAttrs, content) {
                                  _classCallCheck(this, AtomicTagToken);

                                  this.type = 'atomicTag';
                                  this.length = length;
                                  this.text = '';
                                  this.tagName = tagName;
                                  this.attrs = attrs;
                                  this.booleanAttrs = booleanAttrs;
                                  this.unary = false;
                                  this.html5Unary = false;
                                  this.content = content;
                                }

                                AtomicTagToken.prototype.toString = function toString() {
                                  return TagToken.formatTag(this, this.content);
                                };

                                return AtomicTagToken;
                              }();

                              /**
                               * EndTagToken represents an end tag.
                               */


                              var EndTagToken = exports.EndTagToken = function () {
                                /**
                                 * Constructor.
                                 *
                                 * @param {string} tagName The name of the tag.
                                 * @param {Number} length The length of the tag text.
                                 */
                                function EndTagToken(tagName, length) {
                                  _classCallCheck(this, EndTagToken);

                                  this.type = 'endTag';
                                  this.length = length;
                                  this.text = '';
                                  this.tagName = tagName;
                                }

                                EndTagToken.prototype.toString = function toString() {
                                  return '</' + this.tagName + '>';
                                };

                                return EndTagToken;
                              }();

                              /***/ },
                            /* 5 */
                            /***/ function(module, exports) {

                              'use strict';

                              exports.__esModule = true;
                              exports.escapeQuotes = escapeQuotes;

                              /**
                               * Escape quotes in the given value.
                               *
                               * @param {string} value The value to escape.
                               * @param {string} [defaultValue=''] The default value to return if value is falsy.
                               * @returns {string}
                               */
                              function escapeQuotes(value) {
                                var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

                                // There's no lookback in JS, so /(^|[^\\])"/ only matches the first of two `"`s.
                                // Instead, just match anything before a double-quote and escape if it's not already escaped.
                                return !value ? defaultValue : value.replace(/([^"]*)"/g, function (_, prefix) {
                                  return (/\\/.test(prefix) ? prefix + '"' : prefix + '\\"'
                                  );
                                });
                              }

                              /***/ },
                            /* 6 */
                            /***/ function(module, exports) {

                              'use strict';

                              exports.__esModule = true;
                              exports['default'] = fixedReadTokenFactory;
                              /**
                               * Empty Elements - HTML 4.01
                               *
                               * @type {RegExp}
                               */
                              var EMPTY = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i;

                              /**
                               * Elements that you can intentionally leave open (and which close themselves)
                               *
                               * @type {RegExp}
                               */
                              var CLOSESELF = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i;

                              /**
                               * Corrects a token.
                               *
                               * @param {Token} tok The token to correct
                               * @returns {Token} The corrected token
                               */
                              function correct(tok) {
                                if (tok && tok.type === 'startTag') {
                                  tok.unary = EMPTY.test(tok.tagName) || tok.unary;
                                  tok.html5Unary = !/\/>$/.test(tok.text);
                                }
                                return tok;
                              }

                              /**
                               * Peeks at the next token in the parser.
                               *
                               * @param {HtmlParser} parser The parser
                               * @param {Function} readTokenImpl The underlying readToken implementation
                               * @returns {Token} The next token
                               */
                              function peekToken(parser, readTokenImpl) {
                                var tmp = parser.stream;
                                var tok = correct(readTokenImpl());
                                parser.stream = tmp;
                                return tok;
                              }

                              /**
                               * Closes the last token.
                               *
                               * @param {HtmlParser} parser The parser
                               * @param {Array<Token>} stack The stack
                               */
                              function closeLast(parser, stack) {
                                var tok = stack.pop();

                                // prepend close tag to stream.
                                parser.prepend('</' + tok.tagName + '>');
                              }

                              /**
                               * Create a new token stack.
                               *
                               * @returns {Array<Token>}
                               */
                              function newStack() {
                                var stack = [];

                                stack.last = function () {
                                  return this[this.length - 1];
                                };

                                stack.lastTagNameEq = function (tagName) {
                                  var last = this.last();
                                  return last && last.tagName && last.tagName.toUpperCase() === tagName.toUpperCase();
                                };

                                stack.containsTagName = function (tagName) {
                                  for (var i = 0, tok; tok = this[i]; i++) {
                                    if (tok.tagName === tagName) {
                                      return true;
                                    }
                                  }
                                  return false;
                                };

                                return stack;
                              }

                              /**
                               * Return a readToken implementation that fixes input.
                               *
                               * @param {HtmlParser} parser The parser
                               * @param {Object} options Options for fixing
                               * @param {boolean} options.tagSoupFix True to fix tag soup scenarios
                               * @param {boolean} options.selfCloseFix True to fix self-closing tags
                               * @param {Function} readTokenImpl The underlying readToken implementation
                               * @returns {Function}
                               */
                              function fixedReadTokenFactory(parser, options, readTokenImpl) {
                                var stack = newStack();

                                var handlers = {
                                  startTag: function startTag(tok) {
                                    var tagName = tok.tagName;

                                    if (tagName.toUpperCase() === 'TR' && stack.lastTagNameEq('TABLE')) {
                                      parser.prepend('<TBODY>');
                                      prepareNextToken();
                                    } else if (options.selfCloseFix && CLOSESELF.test(tagName) && stack.containsTagName(tagName)) {
                                      if (stack.lastTagNameEq(tagName)) {
                                        closeLast(parser, stack);
                                      } else {
                                        parser.prepend('</' + tok.tagName + '>');
                                        prepareNextToken();
                                      }
                                    } else if (!tok.unary) {
                                      stack.push(tok);
                                    }
                                  },
                                  endTag: function endTag(tok) {
                                    var last = stack.last();
                                    if (last) {
                                      if (options.tagSoupFix && !stack.lastTagNameEq(tok.tagName)) {
                                        // cleanup tag soup
                                        closeLast(parser, stack);
                                      } else {
                                        stack.pop();
                                      }
                                    } else if (options.tagSoupFix) {
                                      // cleanup tag soup part 2: skip this token
                                      readTokenImpl();
                                      prepareNextToken();
                                    }
                                  }
                                };

                                function prepareNextToken() {
                                  var tok = peekToken(parser, readTokenImpl);
                                  if (tok && handlers[tok.type]) {
                                    handlers[tok.type](tok);
                                  }
                                }

                                return function fixedReadToken() {
                                  prepareNextToken();
                                  return correct(readTokenImpl());
                                };
                              }

                              /***/ }
                            /******/ ])
                      });
                      ;

                      /***/ },
                    /* 4 */
                    /***/ function(module, exports) {

                      'use strict';

                      exports.__esModule = true;

                      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

                      exports.existy = existy;
                      exports.isFunction = isFunction;
                      exports.each = each;
                      exports.eachKey = eachKey;
                      exports.defaults = defaults;
                      exports.toArray = toArray;
                      exports.last = last;
                      exports.isTag = isTag;
                      exports.isScript = isScript;
                      exports.isStyle = isStyle;
                      /**
                       * Determine if the thing is not undefined and not null.
                       *
                       * @param {*} thing The thing to test
                       * @returns {boolean} True if the thing is not undefined and not null.
                       */
                      function existy(thing) {
                        return thing !== void 0 && thing !== null;
                      }

                      /**
                       * Is this a function?
                       *
                       * @param {*} x The variable to test
                       * @returns {boolean} True if the variable is a function
                       */
                      function isFunction(x) {
                        return 'function' === typeof x;
                      }

                      /**
                       * Loop over each item in an array-like value.
                       *
                       * @param {Array<*>} arr The array to loop over
                       * @param {Function} fn The function to call
                       * @param {?Object} target The object to bind to the function
                       */
                      function each(arr, fn, target) {
                        var i = void 0;
                        var len = arr && arr.length || 0;
                        for (i = 0; i < len; i++) {
                          fn.call(target, arr[i], i);
                        }
                      }

                      /**
                       * Loop over each key/value pair in a hash.
                       *
                       * @param {Object} obj The object
                       * @param {Function} fn The function to call
                       * @param {?Object} target The object to bind to the function
                       */
                      function eachKey(obj, fn, target) {
                        for (var key in obj) {
                          if (obj.hasOwnProperty(key)) {
                            fn.call(target, key, obj[key]);
                          }
                        }
                      }

                      /**
                       * Set default options where some option was not specified.
                       *
                       * @param {Object} options The destination
                       * @param {Object} _defaults The defaults
                       * @returns {Object}
                       */
                      function defaults(options, _defaults) {
                        options = options || {};
                        eachKey(_defaults, function (key, val) {
                          if (!existy(options[key])) {
                            options[key] = val;
                          }
                        });
                        return options;
                      }

                      /**
                       * Convert value (e.g., a NodeList) to an array.
                       *
                       * @param {*} obj The object
                       * @returns {Array<*>}
                       */
                      function toArray(obj) {
                        try {
                          return Array.prototype.slice.call(obj);
                        } catch (e) {
                          var _ret = function () {
                            var ret = [];
                            each(obj, function (val) {
                              ret.push(val);
                            });
                            return {
                              v: ret
                            };
                          }();

                          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                        }
                      }

                      /**
                       * Get the last item in an array
                       *
                       * @param {Array<*>} array The array
                       * @returns {*} The last item in the array
                       */
                      function last(array) {
                        return array[array.length - 1];
                      }

                      /**
                       * Test if token is a script tag.
                       *
                       * @param {Object} tok The token
                       * @param {String} tag The tag name
                       * @returns {boolean} True if the token is a script tag
                       */
                      function isTag(tok, tag) {
                        return !tok || !(tok.type === 'startTag' || tok.type === 'atomicTag') || !('tagName' in tok) ? !1 : !!~tok.tagName.toLowerCase().indexOf(tag);
                      }

                      /**
                       * Test if token is a script tag.
                       *
                       * @param {Object} tok The token
                       * @returns {boolean} True if the token is a script tag
                       */
                      function isScript(tok) {
                        return isTag(tok, 'script');
                      }

                      /**
                       * Test if token is a style tag.
                       *
                       * @param {Object} tok The token
                       * @returns {boolean} True if the token is a style tag
                       */
                      function isStyle(tok) {
                        return isTag(tok, 'style');
                      }

                      /***/ }
                    /******/ ])
              });
              ;
//# sourceMappingURL=postscribe.js.map
            }

          },
          "core/src/lib/actions/helpers/unescapeHtmlCode.js": {
            "script": function(module, exports, require, turbine) {
              /*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

              'use strict';

              var document = require('@adobe/reactor-document');
              var el = document.createElement('div');

              module.exports = function (html) {
                el.innerHTML = html;

                // IE and Firefox differ.
                return el.textContent || el.innerText || html;
              };

            }

          },
          "core/src/lib/helpers/findPageScript.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2021 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              var document = require('@adobe/reactor-document');

              var byRegexPattern = function (regexScriptSrcPattern) {
                var scripts = document.querySelectorAll('script');

                for (var i = 0; i < scripts.length; i++) {
                  var script = scripts[i];
                  // Find the script that loaded our library. Take into account embed scripts migrated
                  // from DTM. We'll also consider that they may have added a querystring for cache-busting
                  // or whatever.
                  if (regexScriptSrcPattern.test(script.src)) {
                    return script;
                  }
                }
              };

              var getTurbine = function () {
                return byRegexPattern(new RegExp(/(launch|satelliteLib)-[^\/]+.js(\?.*)?$/));
              };

              module.exports = {
                getTurbine: getTurbine,
                byRegexPattern: byRegexPattern
              };

            }

          },
          "core/src/lib/actions/helpers/decorators/decorateGlobalJavaScriptCode.js": {
            "script": function(module, exports, require, turbine) {
              /*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
              'use strict';

              var Promise = require('@adobe/reactor-promise');

              module.exports = function (_, source) {
                // The line break after the source is important in case their last line of code is a comment.
                return {
                  code: '<scr' + 'ipt>\n' + source + '\n</scr' + 'ipt>',
                  promise: Promise.resolve()
                };
              };

            }

          },
          "core/src/lib/actions/helpers/decorators/decorateNonGlobalJavaScriptCode.js": {
            "script": function(module, exports, require, turbine) {
              /*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
              'use strict';

              var Promise = require('@adobe/reactor-promise');
              var id = 0;

              module.exports = function (action, source) {
                var runScriptFnName = '_runScript' + ++id;

                var promise = new Promise(function (resolve, reject) {
                  _satellite[runScriptFnName] = function (fn) {
                    delete _satellite[runScriptFnName];

                    // Use Promise constructor instead of Promise.resolve() so we can
                    // catch errors from custom code.
                    new Promise(function (_resolve) {
                      _resolve(
                        fn.call(
                          action.event.element,
                          action.event,
                          action.event.target,
                          Promise
                        )
                      );
                    }).then(resolve, reject);
                  };
                });

                // The line break after the source is important in case their last line of code is a comment.
                var code =
                  '<scr' +
                  'ipt>_satellite["' +
                  runScriptFnName +
                  '"](function(event, target, Promise) {\n' +
                  source +
                  '\n});</scr' +
                  'ipt>';

                return {
                  code: code,
                  promise: promise
                };
              };

            }

          },
          "core/src/lib/actions/helpers/decorators/decorateHtmlCode.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

              var Promise = require('@adobe/reactor-promise');

              var callbackId = 0;
              var htmlCodePromises = {};

              window._satellite = window._satellite || {};

              /**
               * Public function intended to be called by the user.
               * @param {number} callbackId The identifier passed to _satellite._onCustomCodeSuccess().
               */
              window._satellite._onCustomCodeSuccess = function (callbackId) {
                var promiseHandlers = htmlCodePromises[callbackId];
                if (!promiseHandlers) {
                  return;
                }

                delete htmlCodePromises[callbackId];
                promiseHandlers.resolve();
              };

              /**
               * Public function intended to be called by the user.
               * @param {number} callbackId The identifier passed to _satellite._onCustomCodeSuccess().
               */
              window._satellite._onCustomCodeFailure = function (callbackId) {
                var promiseHandlers = htmlCodePromises[callbackId];
                if (!promiseHandlers) {
                  return;
                }

                delete htmlCodePromises[callbackId];
                promiseHandlers.reject();
              };

              var reactorCallbackIdShouldBeReplaced = function (source) {
                return source.indexOf('${reactorCallbackId}') !== -1;
              };

              var replaceCallbacksIds = function (source, callbackId) {
                return source.replace(/\${reactorCallbackId}/g, callbackId);
              };

              var isSourceLoadedFromFile = function (action) {
                return action.settings.isExternal;
              };

              module.exports = function (action, source) {
                // We need to replace tokens only for sources loaded from external files. The sources from
                // inside the container are automatically taken care by Turbine.
                if (isSourceLoadedFromFile(action)) {
                  source = turbine.replaceTokens(source, action.event);
                }

                var promise;

                if (reactorCallbackIdShouldBeReplaced(source)) {
                  promise = new Promise(function (resolve, reject) {
                    htmlCodePromises[String(callbackId)] = {
                      resolve: resolve,
                      reject: reject
                    };
                  });

                  source = replaceCallbacksIds(source, callbackId);
                  callbackId += 1;
                } else {
                  promise = Promise.resolve();
                }

                return {
                  code: source,
                  promise: promise
                };
              };

            }

          },
          "core/src/lib/actions/helpers/getSourceByUrl.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * Copyright 2019 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';
              var loadScript = require('@adobe/reactor-load-script');
              var Promise = require('@adobe/reactor-promise');
              var findScriptByRegexPattern =
                require('../../helpers/findPageScript').byRegexPattern;

              var codeBySourceUrl = {};
              var scriptStore = {};

              var loadScriptOnlyOnce = function (url) {
                if (!scriptStore[url]) {
                  scriptStore[url] = loadScript(url);
                }

                return scriptStore[url];
              };

              _satellite.__registerScript = function (scriptGuid, code) {
                var scriptUrl;
                if (document.currentScript) {
                  // use getAttribute in case it's a relative url
                  scriptUrl = document.currentScript.getAttribute('src');
                } else {
                  var pattern = new RegExp('.*' + scriptGuid + '.*');
                  // use getAttribute in case it's a relative url
                  scriptUrl = findScriptByRegexPattern(pattern).getAttribute('src');
                }
                codeBySourceUrl[scriptUrl] = code;
              };

              module.exports = function (sourceUrl) {
                if (codeBySourceUrl[sourceUrl]) {
                  return Promise.resolve(codeBySourceUrl[sourceUrl]);
                } else {
                  return new Promise(function (resolve) {
                    loadScriptOnlyOnce(sourceUrl).then(
                      function () {
                        resolve(codeBySourceUrl[sourceUrl]);
                      },
                      function () {
                        resolve();
                      }
                    );
                  });
                }
              };

            }

          },
          "core/src/lib/events/helpers/pageLifecycleEvents.js": {
            "script": function(module, exports, require, turbine) {
              /***************************************************************************************
               * (c) 2018 Adobe. All rights reserved.
               * This file is licensed to you under the Apache License, Version 2.0 (the "License");
               * you may not use this file except in compliance with the License. You may obtain a copy
               * of the License at http://www.apache.org/licenses/LICENSE-2.0
               *
               * Unless required by applicable law or agreed to in writing, software distributed under
               * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
               * OF ANY KIND, either express or implied. See the License for the specific language
               * governing permissions and limitations under the License.
               ****************************************************************************************/

              'use strict';

// We need to be able to fire the rules in a specific order, no matter if the library is loaded
// sync or async. The rules are fired in the following order:
// Library loaded rules -> Page bottom rules -> Dom Ready rules -> Window load rules.

              var window = require('@adobe/reactor-window');
              var document = require('@adobe/reactor-document');

              var isIE10 = window.navigator.appVersion.indexOf('MSIE 10') !== -1;
              var WINDOW_LOADED = 'WINDOW_LOADED';
              var DOM_READY = 'DOM_READY';
              var PAGE_BOTTOM = 'PAGE_BOTTOM';

              var lifecycleEventsOrder = [PAGE_BOTTOM, DOM_READY, WINDOW_LOADED];

              var createSyntheticEvent = function (element, nativeEvent) {
                return {
                  element: element,
                  target: element,
                  nativeEvent: nativeEvent
                };
              };

              var registry = {};
              lifecycleEventsOrder.forEach(function (event) {
                registry[event] = [];
              });

              var processRegistry = function (lifecycleEvent, nativeEvent) {
                lifecycleEventsOrder
                  .slice(0, getLifecycleEventIndex(lifecycleEvent) + 1)
                  .forEach(function (lifecycleEvent) {
                    processTriggers(nativeEvent, lifecycleEvent);
                  });
              };

              var detectLifecycleEvent = function () {
                if (document.readyState === 'complete') {
                  return WINDOW_LOADED;
                } else if (document.readyState === 'interactive') {
                  return !isIE10 ? DOM_READY : null;
                }
              };

              var getLifecycleEventIndex = function (event) {
                return lifecycleEventsOrder.indexOf(event);
              };

              var processTriggers = function (nativeEvent, lifecycleEvent) {
                registry[lifecycleEvent].forEach(function (triggerData) {
                  processTrigger(nativeEvent, triggerData);
                });
                registry[lifecycleEvent] = [];
              };

              var processTrigger = function (nativeEvent, triggerData) {
                var trigger = triggerData.trigger;
                var syntheticEventFn = triggerData.syntheticEventFn;

                trigger(syntheticEventFn ? syntheticEventFn(nativeEvent) : null);
              };

              window._satellite = window._satellite || {};
              window._satellite.pageBottom = processRegistry.bind(null, PAGE_BOTTOM);

              document.addEventListener(
                'DOMContentLoaded',
                processRegistry.bind(null, DOM_READY),
                true
              );
              window.addEventListener(
                'load',
                processRegistry.bind(null, WINDOW_LOADED),
                true
              );

// Depending on the way the Launch library was loaded, none of the registered listeners that
// execute `processRegistry` may fire . We need to execute the `processRegistry` method at
// least once. If this timeout fires before any of the registered listeners, we auto-detect the
// current lifecycle event and fire all the registered triggers in order. We don't care if the
// `processRegistry` is called multiple times for the same lifecycle event. We fire the registered
// triggers for a lifecycle event only once. We used a `setTimeout` here to make sure all the rules
// using Library Loaded are registered and executed synchronously and before rules using any of the
// other lifecycle event types.
              window.setTimeout(function () {
                var lifecycleEvent = detectLifecycleEvent();
                if (lifecycleEvent) {
                  processRegistry(lifecycleEvent);
                }
              }, 0);

              module.exports = {
                registerLibraryLoadedTrigger: function (trigger) {
                  trigger();
                },
                registerPageBottomTrigger: function (trigger) {
                  registry[PAGE_BOTTOM].push({
                    trigger: trigger
                  });
                },
                registerDomReadyTrigger: function (trigger) {
                  registry[DOM_READY].push({
                    trigger: trigger,
                    syntheticEventFn: createSyntheticEvent.bind(null, document)
                  });
                },
                registerWindowLoadedTrigger: function (trigger) {
                  registry[WINDOW_LOADED].push({
                    trigger: trigger,
                    syntheticEventFn: createSyntheticEvent.bind(null, window)
                  });
                }
              };

            }

          }
        }
      },
      "activity-map-customizer": {
        "displayName": "Activity Map Customizer",
        "hostedLibFilesBaseUrl": "https://assets.adobedtm.com/extensions/EPfd661e49f48a42f18b6e5e93a993b11e/",
        "modules": {
          "activity-map-customizer/src/lib/dataElements/linkClickRegionPath.js": {
            "name": "link-click-region-path",
            "displayName": "Contextual DOM Attribute(s)",
            "script": function(module, exports, require, turbine) {
              'use strict';

              /**
               * https://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
               * Get all of an element's parent elements up the DOM tree
               * @param  {Node}   elem     The element
               * @param  {String} selector Selector to match against [optional]
               * @return {Array}           The parent elements
               */
              var getParents = function (elem, selector,traverseBottomToTop) {

                // Element.matches() polyfill
                if (!Element.prototype.matches) {
                  Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.oMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function (s) {
                      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                      while (--i >= 0 && matches.item(i) !== this) { }
                      return i > -1;
                    };
                }

                // Setup parents array
                var parents = [];

                // Get matching parent elements
                for (; elem && elem !== document; elem = elem.parentNode) {

                  // Add matching parents to array
                  if (selector) {
                    if (elem.matches(selector)) {
                      parents.push(elem);
                    }
                  } else {
                    parents.push(elem);
                  }
                }
                if (!traverseBottomToTop){
                  parents=parents.reverse();
                }
                console.log(parents);
                return parents;
              };

              /**
               * https://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
               * Get the closest matching element up the DOM tree.
               * @private
               * @param  {Element} elem     Starting element
               * @param  {String}  selector Selector to match against
               * @return {Boolean|Element}  Returns null if not match found
               */
              var getClosest = function (elem, selector) {

                // Element.matches() polyfill
                if (!Element.prototype.matches) {
                  Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.oMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function (s) {
                      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                      while (--i >= 0 && matches.item(i) !== this) { }
                      return i > -1;
                    };
                }

                // Get closest match
                for (; elem && elem !== document; elem = elem.parentNode) {
                  if (elem.matches(selector)) return elem;
                }

                return null;

              };

              function evaluateAndGrabValues(el, captureParam) {
                var elemPaths = [];
                var allMatchingElements = [];

                if (captureParam.matchCriteria === 'self') {
                  var closestMatch = getClosest(el, captureParam.matchCSSSelector);
                  if (closestMatch == el) {
                    allMatchingElements.push(closestMatch);
                  }
                } else if (captureParam.matchCriteria === 'ancestors') {
                  allMatchingElements = getParents(el.parentNode, captureParam.matchCSSSelector,captureParam.traverseBottomToTop);
                } else if (captureParam.matchCriteria === 'self-ancestors') {
                  allMatchingElements = getParents(el, captureParam.matchCSSSelector,captureParam.traverseBottomToTop);
                }
                for (var i = 0; i < allMatchingElements.length; i++) {
                  if (allMatchingElements[i].getAttribute(captureParam.grabAttr)) {
                    elemPaths.push(allMatchingElements[i].getAttribute(captureParam.grabAttr));
                  }
                }
                return elemPaths;
              }

// inputParam: {
//     'matchCriteria': matchCriteria,
//     'grabCriteria': grabCriteria,
//     'matchCSSSelector': matchCSSSelector,
//     'grabAttr': grabAttr,
//     'delim': delim
// }
              module.exports = function (settings, event) {
                var dataElemValue = undefined;
                var inputParam = settings.inputParam;

                if (event && event.nativeEvent && (event.nativeEvent.target.nodeName != "" && event.nativeEvent.target.nodeName != "HTML" && event.nativeEvent.target.nodeName != "#document")) {
                  var constructedValue = evaluateAndGrabValues(event.nativeEvent.target, inputParam);
                  if (inputParam.grabCriteria === 'closest') {
                    dataElemValue = constructedValue[0];
                  } else if (inputParam.grabCriteria === 'furthest') {
                    dataElemValue = constructedValue[constructedValue.length - 1];
                  } else if (inputParam.grabCriteria === 'all') {
                    dataElemValue = constructedValue.join(inputParam.delim)
                  }
                }
                else {
                  dataElemValue = _satellite.getVar("linkFinalPath");
                }
                return dataElemValue;
              }
            }

          },
          "activity-map-customizer/src/lib/actions/setvariables.js": {
            "name": "setvariables",
            "displayName": "Set Configuration",
            "script": function(module, exports, require, turbine) {
              'use strict';

              function computePriorityLinkValue(confSetting) {
                var finalValue = "";
                //get the first non-null values

                var validPriorityItemsList = confSetting.priorityItems.map(function (p) {
                  //p.deName="closest_data-location";
                  p.keyValue = getDEValue(p.deName, event);
                  return p;
                });

                var validPriorityItems = validPriorityItemsList.filter(function (p) {
                  return p.keyValue != "" && p.keyValue != null && p.keyValue != undefined && p.keyValue != '';
                });

                if (validPriorityItems.length > 0) {
                  finalValue = validPriorityItems[0].keyValue;
                }

                return finalValue;
              }

              function getDEValue(deName, event) {
                return _satellite.getVar(deName, { nativeEvent: event });
              }

              function computeFallbackValue(clickedElement, confSetting) {
                var fallbackVal = "";
                var elemNames = confSetting.fallbackElements.split(',');
                var regionId, className;
                while (clickedElement && (clickedElement = clickedElement.parentNode)) {
                  regionId = clickedElement.tagName;
                  if (regionId) regionId = regionId.toLowerCase();
                  if (regionId && elemNames.indexOf(regionId) > -1) {
                    fallbackVal = regionId;
                    break;
                  }
                }
                return fallbackVal;
              }

              function computePriorityRegionValue(clickedElement, confSetting) {

                var finalValue = "";

                var validPriorityItemsList = confSetting.priorityItems.map(function (p) {
                  //p.deName="closest_data-location";
                  p.keyValue = getDEValue(p.deName, event);
                  return p;
                });

                //get the first non-null values
                var validPriorityItems = validPriorityItemsList.filter(function (p) {
                  return p.keyValue != "" && p.keyValue != null && p.keyValue != undefined && p.keyValue != '';
                });

                var fbValue = computeFallbackValue(clickedElement, confSetting);
                if (validPriorityItems.length > 0) {
                  finalValue = validPriorityItems[0].keyValue;
                  if (confSetting.includeFallback && fbValue) {
                    finalValue = fbValue + confSetting.delimiter + finalValue;
                  }
                } else {
                  finalValue = fbValue;
                }
                return finalValue;
              }

              function replaceText(inputText, searchMask, replaceMask) {
                if (!inputText) return "";
                var regEx = new RegExp(searchMask, "ig");
                var result = inputText.replace(regEx, replaceMask);
                return result;
              }

              function replaceActivityValueText(section, sectionValue, fieldValues) {
                var finalText = sectionValue;
                fieldValues.forEach(function (fieldItem) {
                  finalText = replaceText(finalText, fieldItem.keyName, fieldItem.keyValue);
                });
                return finalText;
              };

              function applyACMValues(acmSetting, event, sObject) {

                //back up default behaviours
                var _adobeLinkFunc = sObject.ActivityMap.link;
                var _adobeRegionFunc = sObject.ActivityMap.region;

                //link
                if (acmSetting.linkConfig &&
                  ((acmSetting.linkConfig.priorityItems && acmSetting.linkConfig.priorityItems.length > 0) ||
                    (acmSetting.linkConfig.replaceItems && acmSetting.linkConfig.replaceItems.length > 0))
                ) {
                  sObject.ActivityMap.link = function (ele, i) {
                    var linkValue = computePriorityLinkValue(acmSetting.linkConfig);
                    if (!linkValue || linkValue === null || linkValue === "") linkValue = _adobeLinkFunc(ele, i);
                    return replaceActivityValueText("link", linkValue, acmSetting.linkConfig.replaceItems);
                  }
                }
                if (acmSetting.linkConfig.exclude &&
                  acmSetting.linkConfig.exclude.trim().length > 0 ) {
                  sObject.ActivityMap.linkExclusions = acmSetting.linkConfig.exclude;
                }

                //region
                if (acmSetting.regionConfig &&
                  (acmSetting.regionConfig.exclude ||
                    acmSetting.regionConfig.fallbackElements ||
                    (acmSetting.regionConfig.priorityItems && acmSetting.regionConfig.priorityItems.length > 0) ||
                    (acmSetting.regionConfig.replaceItems && acmSetting.regionConfig.replaceItems.length > 0))
                ) {
                  sObject.ActivityMap.region = function (ele) {
                    var regionValue = computePriorityRegionValue(ele, acmSetting.regionConfig);
                    if (!regionValue || regionValue === null || regionValue === "") regionValue = _adobeRegionFunc(ele, sObject.ActivityMap);
                    regionValue = replaceActivityValueText("region", regionValue, acmSetting.regionConfig.replaceItems);
                    var shouldExclude = false;
                    if (acmSetting.regionConfig.exclude &&
                      acmSetting.regionConfig.exclude.trim().length > 0 ) {
                      var excludeArr = acmSetting.regionConfig.exclude.split(',');
                      for (var i = 0; i < excludeArr.length; i++) {
                        if (regionValue.indexOf(excludeArr[i]) > -1) {
                          shouldExclude = true;
                          break;
                        }
                      }
                    }
                    return (shouldExclude === true ? null : regionValue);
                  }
                }
              }

              module.exports = function (settings, event) {
                var acmSetting = settings;//turbine.getExtensionSettings();
                var getTracker = turbine.getSharedModule('adobe-analytics', 'get-tracker');

                getTracker().then(
                  function (tracker) {
                    applyACMValues(acmSetting, event, tracker);
                  }
                );
              };



            }

          }
        }
      }
    },
    "company": {
      "orgId": "63C70EF1613FCF530A495EE2@AdobeOrg",
      "dynamicCdnEnabled": false
    },
    "property": {
      "name": "BambooHR",
      "settings": {
        "domains": [
          "bamboohr.com"
        ],
        "undefinedVarsReturnEmpty": false,
        "ruleComponentSequencingEnabled": true
      },
      "id": "PR7f245910d37a458fa16924aecf282f95"
    },
    "rules": [
      {
        "id": "RLcee063e9a92c435ab59fdb60d39321e8",
        "name": "Click | Advertising Cookies | Log In / Partner Login Buttons | All Pages",
        "events": [
          {
            "modulePath": "core/src/lib/events/click.js",
            "settings": {
              "elementSelector": "a",
              "elementProperties": [
                {
                  "name": "href",
                  "value": "https://app.bamboohr.com/login/"
                }
              ],
              "bubbleFireIfParent": true,
              "bubbleFireIfChildFired": true
            },
            "ruleOrder": 50.0
          },
          {
            "modulePath": "core/src/lib/events/click.js",
            "settings": {
              "elementSelector": "a",
              "elementProperties": [
                {
                  "name": "href",
                  "value": "https://partners.bamboohr.com/login/"
                }
              ],
              "bubbleFireIfParent": true,
              "bubbleFireIfChildFired": true
            },
            "ruleOrder": 50.0
          }
        ],
        "conditions": [
          {
            "modulePath": "core/src/lib/conditions/valueComparison.js",
            "settings": {
              "comparison": {
                "operator": "isTrue"
              },
              "leftOperand": "%is TrustArc Advertising Cookie Allowed%"
            },
            "timeout": 2000
          }
        ],
        "actions": [
          {
            "modulePath": "adobe-analytics/src/lib/actions/setVariables.js",
            "settings": {
              "customSetup": {
                "source": function(event, s) {
                  var varsObject = {
                    event1 : [ /app\.bamboohr\.com\/login\//i, undefined, false ],
                    event2 : [ /partners\.bamboohr\.com\/login\//i, undefined, false ]
                  };

                  bhr.analytics.setAdobeAnalyticsVars(varsObject, undefined, this.href, true);
                }
              },
              "trackerProperties": {
              }
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "adobe-analytics/src/lib/actions/sendBeacon.js",
            "settings": {
              "type": "link",
              "linkName": "Log In button (BambooHR)",
              "linkType": "o"
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "adobe-analytics/src/lib/actions/clearVariables.js",
            "settings": {
            },
            "timeout": 2000,
            "delayNext": true
          }
        ]
      },
      {
        "id": "RL309ab629665c4f10af5cbdcc2d7ef667",
        "name": "Data Element Change (is TrustArc Advertising Cookie Allowed) #1 | Advertising Cookies | All Pages",
        "events": [
          {
            "modulePath": "core/src/lib/events/dataElementChange.js",
            "settings": {
              "name": "is TrustArc Advertising Cookie Allowed"
            },
            "ruleOrder": 1.0
          }
        ],
        "conditions": [

        ],
        "actions": [
          {
            "modulePath": "core/src/lib/actions/customCode.js",
            "settings": {
              "source": 'https://assets.adobedtm.com/ae3ff78e29a2/7f43f668d8a7/0b4982562083/RC61bc16f387104ce9818c85b27a877725-source.js',
              "language": "javascript",
              "isExternal": true
            },
            "timeout": 2000,
            "delayNext": true
          }
        ]
      },
      {
        "id": "RL9cf39c1e23424432a9ece6430864c9ce",
        "name": "Click | Advertising Cookies | Phone Number Dialed | All Pages",
        "events": [
          {
            "modulePath": "core/src/lib/events/click.js",
            "settings": {
              "elementSelector": "a",
              "elementProperties": [
                {
                  "name": "href",
                  "value": "^tel:.+$",
                  "valueIsRegex": true
                }
              ],
              "bubbleFireIfParent": true,
              "bubbleFireIfChildFired": true
            },
            "ruleOrder": 50.0
          }
        ],
        "conditions": [
          {
            "modulePath": "core/src/lib/conditions/valueComparison.js",
            "settings": {
              "comparison": {
                "operator": "isTrue"
              },
              "leftOperand": "%is TrustArc Advertising Cookie Allowed%"
            },
            "timeout": 2000
          }
        ],
        "actions": [
          {
            "modulePath": "adobe-analytics/src/lib/actions/setVariables.js",
            "settings": {
              "trackerProperties": {
                "eVars": [
                  {
                    "name": "eVar13",
                    "type": "value",
                    "value": "%this.innerHTML%"
                  }
                ],
                "events": [
                  {
                    "name": "event5"
                  }
                ]
              }
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "adobe-analytics/src/lib/actions/sendBeacon.js",
            "settings": {
              "type": "link",
              "linkName": "Phone Number Dialed",
              "linkType": "o"
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "adobe-analytics/src/lib/actions/clearVariables.js",
            "settings": {
            },
            "timeout": 2000,
            "delayNext": true
          }
        ]
      },
      {
        "id": "RL35a7c9722f334f3bb0ae23bc93a165e4",
        "name": "Library Loaded (Page Top) #1 | All pages",
        "events": [
          {
            "modulePath": "core/src/lib/events/libraryLoaded.js",
            "settings": {
            },
            "ruleOrder": 1.0
          }
        ],
        "conditions": [

        ],
        "actions": [
          {
            "modulePath": "common-analytics-plugins/src/lib/actions/initialize.js",
            "settings": {
              "cs": false,
              "ft": false,
              "il": true,
              "mv": false,
              "ns": false,
              "pt": false,
              "ape": false,
              "apl": true,
              "apv": false,
              "fpo": false,
              "ggc": false,
              "gnr": false,
              "gpn": false,
              "gpv": false,
              "gqp": false,
              "grl": false,
              "gtp": true,
              "gvd": false,
              "gvn": false,
              "gvo": false,
              "rfl": false,
              "gapv": false,
              "gplt": true,
              "gppv": true,
              "gtbe": false,
              "gttc": false,
              "gdslv": false,
              "gtslv": false
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "core/src/lib/actions/customCode.js",
            "settings": {
              "source": "if (_satellite.getVar(\"Adobe Tags Environment Stage\") != \"production\") {\n  _satellite.cookie.set(\"notice_gdpr_prefs\", \"0|1|2:\", { expires: 730 });\n  _satellite.cookie.set(\"notice_behavior\", \"implied|na\", { expires: 730 });\n}",
              "language": "javascript"
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "core/src/lib/actions/customCode.js",
            "settings": {
              "source": "window.bhr = {\n  analytics : {\n    allVarsObject : {},\n    /**\n     * bhr.analytics.setAdobeAnalyticsVar(varsObject, defaultVarsFunction, testURL, useBeacon)\n     *\n     * Usage:\n     * \n     *  bhr.analytics.setAdobeAnalyticsVars({\n     *      eVar123 : [ /RegEx1-to-match/i, \"value\", false ],\n     *      event123 : [ /RegEx2-to-match/i, undefined, false ]\n     *    }, \n     *    function () { return bhr.analytics.setAdobeAnalyticsDefaultVideoVars(wistiaItem); },\n     *    document.URL,\n     *    false);\n     *\n     * varsObject: object containing key(s) in format eVar(1-250), prop(1-75), or event(1-1000) and value(s) as an array in the format [ RegEx to match on, Value to set (value or undefined), Continue to next eVar (boolean) ]\n     * defaultVarsFunction: a function to set default variables (function or undefined)\n     * testURL: a URL to test the RegEx from the varsObject on\n     * useBeacon: set s.useBeacon = true (boolean)\n     */\n    setAdobeAnalyticsVars : function (varsObject, defaultVarsFunction, testURL, useBeacon) {\n      var allVarsObject = bhr.analytics.allVarsObject = {};\n      \n      s.abort = true;\n      \n      Object.assign(allVarsObject, (typeof defaultVarsFunction === \"function\" ? defaultVarsFunction() : allVarsObject), varsObject);\n      \n      Object.keys(allVarsObject).some(function(element, index, array) {\n        var allVarsObject = bhr.analytics.allVarsObject;\n        var varType;\n        \n        if (/^eVar([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|250)/.test(element))\n          varType = \"eVar\";\n        else if (/^prop([1-9]|[1-6][0-9]|7[0-5])/.test(element))\n          varType = \"prop\";\n        else if (/^event([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|1000)/.test(element))\n          varType = \"event\";\n        else {\n          _satellite.logger.error(\"Invalid element, \" + element + \", passed in allVarsObject in brh.analytics.setAdobeAnalyticsVars\");\n          return false;\n        }\n        \n        if (allVarsObject[element][0].test(testURL)) {\n          if (/^(eVar|prop)$/.test(varType)) {\n            s[element] = allVarsObject[element][1];\n            s.linkTrackVars = s.apl(s.linkTrackVars, element);\n          }\n          else {\n            var value = allVarsObject[element][1];\n            \n            s.events = element + (value ? \"=\" + value : \"\");\n            \n            if (allVarsObject[element][2] == false)\n              s.linkTrackEvents = s.apl(s.linkTrackEvents, element);\n            else\n              s.linkTrackEvents = element;\n          }\n          \n          if (useBeacon == true)\n            s.useBeacon = true;\n          \n          s.abort = false;\n          \n          if (allVarsObject[element][2] == false)\n            return true;\n        }\n      });\n    },\n    /**\n     * setAdobeAnalyticsDefaultWistiaVars(wistiaElement)\n     *\n     * Usage: bhr.analytics.setAdobeAnalyticsDefaultWistiaVars(wistiaItem)\n     *\n     * wistiaItem: object containing the Wistia item\n     */\n    setAdobeAnalyticsDefaultWistiaVars : function (wistiaItem) {\n      return {\n        eVar14 : [ /^((?!podcast).)*$/i, wistiaItem.name(), true ],\n        eVar15 : [ /^((?!podcast).)*$/i, wistiaItem.hashedId(), true ],\n        eVar22 : [ /podcast/i, wistiaItem.name(), true ],\n        eVar23 : [ /podcast/i, wistiaItem.hashedId(), true ]\n      };\n    }\n  }\n}",
              "language": "javascript"
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "core/src/lib/actions/customCode.js",
            "settings": {
              "source": "window._wq = window._wq || [];\n_wq.push({ id: \"_all\", onReady: function(wistiaItem) {\n  wistiaItem.bind(\"play\", function() {\n    if (_satellite.getVar(\"is TrustArc Advertising Cookie Allowed\")) {\n      var varsObject = {\n        event6 : [ /^((?!podcast).)*$/i, undefined, false ],\n        event12 : [ /podcast/i, undefined, false ]\n      };\n      var defaultVarsFunction = function () { return bhr.analytics.setAdobeAnalyticsDefaultWistiaVars(wistiaItem); };\n      \n      bhr.analytics.setAdobeAnalyticsVars(varsObject, defaultVarsFunction, document.URL, false);\n      s.tl(true, \"o\", (/podcast/i.test(document.URL) ? \"Podcast\" : \"Video\") + \" Played\");\n    }\n  });\n  \n  wistiaItem.bind('percentwatchedchanged', function (percent, lastPercent) {\n    if (_satellite.getVar(\"is TrustArc Advertising Cookie Allowed\")) {\n      var varsObject;\n      var defaultVarsFunction = function () { return bhr.analytics.setAdobeAnalyticsDefaultWistiaVars(wistiaItem); };\n      \n      if (percent >= .25 && lastPercent < .25) {\n        varsObject = {\n          event7 : [ /^((?!podcast).)*$/i, undefined, false ],\n          event13 : [ /podcast/i, undefined, false ]\n        };\n        \n        bhr.analytics.setAdobeAnalyticsVars(varsObject, defaultVarsFunction, document.URL, false);\n        s.tl(true, \"o\", (/podcast/i.test(document.URL) ? \"Podcast\" : \"Video\") + \" Viewed 25%\");\n      }\n      else if (percent >= .50 && lastPercent < .50) {\n        varsObject = {\n          event8 : [ /^((?!podcast).)*$/i, undefined, false ],\n          event14 : [ /podcast/i, undefined, false ]\n        };\n        \n        bhr.analytics.setAdobeAnalyticsVars(varsObject, defaultVarsFunction, document.URL, false);\n        s.tl(true, \"o\", (/podcast/i.test(document.URL) ? \"Podcast\" : \"Video\") + \" Viewed 50%\");\n      }\n      else if (percent >= .75 && lastPercent < .75) {\n        varsObject = {\n          event9 : [ /^((?!podcast).)*$/i, undefined, false ],\n          event15 : [ /podcast/i, undefined, false ]\n        };\n        \n        bhr.analytics.setAdobeAnalyticsVars(varsObject, defaultVarsFunction, document.URL, false);\n        s.tl(true, \"o\", (/podcast/i.test(document.URL) ? \"Podcast\" : \"Video\") + \" Viewed 75%\");\n      }\n      else if (percent >= .90 && lastPercent < .90) {\n        varsObject = {\n          event10 : [ /^((?!podcast).)*$/i, undefined, false ],\n          event16 : [ /podcast/i, undefined, false ]\n        };\n        \n        bhr.analytics.setAdobeAnalyticsVars(varsObject, defaultVarsFunction, document.URL, false);\n        s.tl(true, \"o\", (/podcast/i.test(document.URL) ? \"Podcast\" : \"Video\") + \" Viewed 90%\");\n      }\n      else if (percent >= 1 && lastPercent < 1) {\n        varsObject = {\n          event11 : [ /^((?!podcast).)*$/i, undefined, false ],\n          event17 : [ /podcast/i, undefined, false ]\n        };\n        \n        bhr.analytics.setAdobeAnalyticsVars(varsObject, defaultVarsFunction, document.URL, false);\n        s.tl(true, \"o\", (/podcast/i.test(document.URL) ? \"Podcast\" : \"Video\") + \" Viewed 100% (Completed)\");\n      }\n    }\n  });\n}});",
              "language": "javascript"
            },
            "timeout": 2000,
            "delayNext": true
          }
        ]
      },
      {
        "id": "RLa7d9a76481dc48fe9f1927700717949d",
        "name": "Data Element Change (Event = Page View) | Advertising Cookies | All Pages",
        "events": [
          {
            "modulePath": "core/src/lib/events/dataElementChange.js",
            "settings": {
              "name": "Event"
            },
            "ruleOrder": 50.0
          }
        ],
        "conditions": [
          {
            "modulePath": "core/src/lib/conditions/valueComparison.js",
            "settings": {
              "comparison": {
                "operator": "equals"
              },
              "leftOperand": "%Event%",
              "rightOperand": "Page View"
            },
            "timeout": 2000
          },
          {
            "modulePath": "core/src/lib/conditions/valueComparison.js",
            "settings": {
              "comparison": {
                "operator": "isTrue"
              },
              "leftOperand": "%is TrustArc Advertising Cookie Allowed%"
            },
            "timeout": 2000
          },
          {
            "modulePath": "core/src/lib/conditions/customCode.js",
            "settings": {
              "source": function(event, target) {
                if (_satellite.getVar("has Page View Event Run"))
                  return true;
                else
                  return false;
              }
            },
            "negate": true,
            "timeout": 2000
          }
        ],
        "actions": [
          {
            "modulePath": "core/src/lib/actions/customCode.js",
            "settings": {
              "source": 'https://assets.adobedtm.com/ae3ff78e29a2/7f43f668d8a7/0b4982562083/RC652f84c9869d407b870ce57f4c357016-source.js',
              "language": "javascript",
              "isExternal": true
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "adobe-analytics/src/lib/actions/setVariables.js",
            "settings": {
              "trackerProperties": {
                "eVars": [
                  {
                    "name": "eVar16",
                    "type": "value",
                    "value": "%Blog Post Title%"
                  },
                  {
                    "name": "eVar17",
                    "type": "value",
                    "value": "%Blog Post Author%"
                  },
                  {
                    "name": "eVar18",
                    "type": "value",
                    "value": "%Blog Post Category%"
                  },
                  {
                    "name": "eVar19",
                    "type": "value",
                    "value": "%Blog Post Publication Date%"
                  },
                  {
                    "name": "eVar20",
                    "type": "value",
                    "value": "%Blog Post Updated Date%"
                  },
                  {
                    "name": "eVar21",
                    "type": "value",
                    "value": "%Blog Post Read Time%"
                  },
                  {
                    "name": "eVar200",
                    "type": "value",
                    "value": "%Adobe Tags Debug Info%"
                  }
                ]
              }
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "adobe-analytics/src/lib/actions/sendBeacon.js",
            "settings": {
              "type": "page"
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "activity-map-customizer/src/lib/actions/setvariables.js",
            "settings": {
              "linkConfig": {
                "exclude": "",
                "replaceItems": [

                ],
                "priorityItems": [

                ]
              },
              "regionConfig": {
                "exclude": "",
                "delimiter": " > ",
                "replaceItems": [
                  {
                    "deName": "^header",
                    "keyName": "^header",
                    "keyValue": "Header"
                  },
                  {
                    "deName": "^main",
                    "keyName": "^main",
                    "keyValue": "Body"
                  },
                  {
                    "deName": "^footer",
                    "keyName": "^footer",
                    "keyValue": "Footer"
                  }
                ],
                "priorityItems": [
                  {
                    "deName": "Activity Map Customizer Contextual DOM Attribute",
                    "keyName": "%Activity Map Customizer Contextual DOM Attribute%",
                    "keyValue": "%Activity Map Customizer Contextual DOM Attribute%"
                  }
                ],
                "includeFallback": true,
                "fallbackElements": "header,main,footer"
              }
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "adobe-analytics/src/lib/actions/clearVariables.js",
            "settings": {
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "core/src/lib/actions/customCode.js",
            "settings": {
              "source": 'https://assets.adobedtm.com/ae3ff78e29a2/7f43f668d8a7/0b4982562083/RCc0d2688dd4d1428a85418a68d8f59ac1-source.js',
              "language": "javascript",
              "isExternal": true
            },
            "timeout": 2000,
            "delayNext": true
          }
        ]
      },
      {
        "id": "RL58fc18798c304135bbc3547803f61769",
        "name": "Click | Advertising Cookies | Mobile App Store Buttons | All Pages",
        "events": [
          {
            "modulePath": "core/src/lib/events/click.js",
            "settings": {
              "elementSelector": "a",
              "elementProperties": [
                {
                  "name": "href",
                  "value": "https://apps.apple.com/us/app/bamboohr/id587244049"
                }
              ],
              "bubbleFireIfParent": true,
              "bubbleFireIfChildFired": true
            },
            "ruleOrder": 50.0
          },
          {
            "modulePath": "core/src/lib/events/click.js",
            "settings": {
              "elementSelector": "a",
              "elementProperties": [
                {
                  "name": "href",
                  "value": "https://play.google.com/store/apps/details?id=com.mokinetworks.bamboohr"
                }
              ],
              "bubbleFireIfParent": true,
              "bubbleFireIfChildFired": true
            },
            "ruleOrder": 50.0
          }
        ],
        "conditions": [
          {
            "modulePath": "core/src/lib/conditions/valueComparison.js",
            "settings": {
              "comparison": {
                "operator": "isTrue"
              },
              "leftOperand": "%is TrustArc Advertising Cookie Allowed%"
            },
            "timeout": 2000
          }
        ],
        "actions": [
          {
            "modulePath": "adobe-analytics/src/lib/actions/setVariables.js",
            "settings": {
              "customSetup": {
                "source": function(event, s) {
                  var varsObject = {
                    event27 : [ /apps\.apple\.com\/us\/app\/bamboohr\/id587244049/i, undefined, false ],
                    event28 : [ /play\.google\.com\/store\/apps\/details\?id=com\.mokinetworks\.bamboohr/i, undefined, false ]
                  };

                  bhr.analytics.setAdobeAnalyticsVars(varsObject, undefined, this.href, true);
                }
              },
              "trackerProperties": {
              }
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "adobe-analytics/src/lib/actions/sendBeacon.js",
            "settings": {
              "type": "link",
              "linkName": "Mobile App Clicks",
              "linkType": "e"
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "adobe-analytics/src/lib/actions/clearVariables.js",
            "settings": {
            },
            "timeout": 2000,
            "delayNext": true
          }
        ]
      },
      {
        "id": "RL6b78fb7491774f3fb8cc114b212113d1",
        "name": "Click | Advertising Cookies | Social Media Buttons | All Pages",
        "events": [
          {
            "modulePath": "core/src/lib/events/click.js",
            "settings": {
              "elementSelector": "main div.article-header-share a",
              "bubbleFireIfParent": true,
              "bubbleFireIfChildFired": true
            },
            "ruleOrder": 50.0
          },
          {
            "modulePath": "core/src/lib/events/click.js",
            "settings": {
              "elementSelector": "footer div.social a",
              "bubbleFireIfParent": true,
              "bubbleFireIfChildFired": true
            },
            "ruleOrder": 50.0
          }
        ],
        "conditions": [
          {
            "modulePath": "core/src/lib/conditions/valueComparison.js",
            "settings": {
              "comparison": {
                "operator": "isTrue"
              },
              "leftOperand": "%is TrustArc Advertising Cookie Allowed%"
            },
            "timeout": 2000
          }
        ],
        "actions": [
          {
            "modulePath": "adobe-analytics/src/lib/actions/setVariables.js",
            "settings": {
              "customSetup": {
                "source": function(event, s) {
                  var varsObject = {
                    event18 : [ /facebook\.com/i, undefined, false ],
                    event19 : [ /twitter\.com/i, undefined, false ],
                    event20 : [ /instagram\.com/i, undefined, false ],
                    event21 : [ /linkedin\.com/i, undefined, false ],
                    event22 : [ /youtube\.com/i, undefined, false ],
                    event23 : [ /mailto:/i, undefined, false ]
                  };

                  bhr.analytics.setAdobeAnalyticsVars(varsObject, undefined, this.href, true);
                }
              },
              "trackerProperties": {
              }
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "adobe-analytics/src/lib/actions/sendBeacon.js",
            "settings": {
              "type": "link",
              "linkName": "Social Media Buttons",
              "linkType": "e"
            },
            "timeout": 2000,
            "delayNext": true
          },
          {
            "modulePath": "adobe-analytics/src/lib/actions/clearVariables.js",
            "settings": {
            },
            "timeout": 2000,
            "delayNext": true
          }
        ]
      }
    ]
  }
})();

var _satellite = (function () {
  'use strict';

  if (!window.atob) { console.warn('Adobe Launch is unsupported in IE 9 and below.'); return; }

  var reactorDocument = document;

  /*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }

    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }

      // Detect buggy property enumeration order in older V8 versions.

      // https://bugs.chromium.org/p/v8/issues/detail?id=4118
      var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
      test1[5] = 'de';
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });
      if (order2.join('') !== '0123456789') {
        return false;
      }

      // https://bugs.chromium.org/p/v8/issues/detail?id=3056
      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join('') !==
        'abcdefghijklmnopqrst') {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);

      for (var key in from) {
        if (hasOwnProperty$1.call(from, key)) {
          to[key] = from[key];
        }
      }

      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }

    return to;
  };

  var reactorObjectAssign = objectAssign;

  var reactorWindow = window;

  /***************************************************************************************
   * (c) 2021 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  var createDynamicHostResolver = function (
    turbineEmbedCode,
    dynamicCdnEnabled,
    cdnAllowList,
    debugController
  ) {
    // A missing list means that we are not trying to dynamic replace (archives,
    // sftp, no premium CDN option enabled on the company).
    // even an empty list is flagging to us that we're trying to enforce dynamic
    var isDynamicEnforced = Boolean(
      dynamicCdnEnabled && Array.isArray(cdnAllowList)
    );
    var shouldAugment = Boolean(isDynamicEnforced && turbineEmbedCode);

    // using document.createElement('a') because IE10/11 doesn't support new URL()
    var turbineUrl = document.createElement('a');
    if (isDynamicEnforced) {
      var throwUnavailableEmbedCode = function () {
        var missingEmbedCodeError = new Error(
          'Unable to find the Library Embed Code for Dynamic Host Resolution.'
        );
        missingEmbedCodeError.code = 'dynamic_host_resolver_constructor_error';
        throw missingEmbedCodeError;
      };
      if (turbineEmbedCode) {
        if (!/^((https?:)?\/\/).+/.test(turbineEmbedCode)) {
          throwUnavailableEmbedCode();
        }
        if (/^\/\/.+/.test(turbineEmbedCode)) {
          // for IE 10, you must throw on the protocol
          turbineUrl.href = reactorWindow.location.protocol + turbineEmbedCode;
        } else {
          turbineUrl.href = turbineEmbedCode;
        }
      }

      // check URL construction
      if (!turbineUrl.hostname) {
        throwUnavailableEmbedCode();
      }
      // is this within the allowed list of hosts?
      if (cdnAllowList.indexOf(turbineUrl.hostname) === -1) {
        var dynamicDeniedError = new Error(
          'This library is not authorized for this domain. ' +
          'Please contact your CSM for more information.'
        );
        dynamicDeniedError.code = 'dynamic_host_not_allowed';
        throw dynamicDeniedError;
      }
    }

    /**
     * Returns the host of the Turbine embed code, or an empty string if Dynamic Host
     * is not enabled.
     * @returns {string}
     */
    var memoizedHostResult;
    var getTurbineHost = function () {
      if (memoizedHostResult != null) {
        return memoizedHostResult;
      }

      if (shouldAugment) {
        // be sure we always force https to Adobe managed domains.
        // IE 10/11 returns the :443 protocol when modern browsers don't, so this replacement
        // is bringing every browser in line with the same return value
        var sanitizedHost = turbineUrl.host;
        if (/:80$/.test(sanitizedHost)) {
          sanitizedHost = sanitizedHost.replace(':80', '');
        } else if (/:80\/$/.test(sanitizedHost)) {
          sanitizedHost = sanitizedHost.replace(':80/', '');
        } else if (/:443$/.test(sanitizedHost)) {
          sanitizedHost = sanitizedHost.replace(':443', '');
        } else if (/:443\/$/.test(sanitizedHost)) {
          sanitizedHost = sanitizedHost.replace(':443/', '');
        }

        memoizedHostResult = turbineUrl.protocol + '//' + sanitizedHost;
      } else {
        memoizedHostResult = '';
      }

      return memoizedHostResult;
    };

    /**
     * Returns a url decorated with the host of the Turbine embed code. If Dynamic host
     * is disabled, the original sourceUrl is returned unmodified.
     * @param sourceUrl
     * @returns {string|*}
     */
    var decorateWithDynamicHost = function (sourceUrl) {
      if (shouldAugment && typeof sourceUrl === 'string') {
        var urlParts = [
          getTurbineHost(),
          sourceUrl.charAt(0) === '/' ? sourceUrl.slice(1) : sourceUrl
        ];

        return urlParts.join('/');
      }

      return sourceUrl;
    };

    var dynamicHostResolver = {
      getTurbineHost: getTurbineHost,
      decorateWithDynamicHost: decorateWithDynamicHost,
      get isDynamicEnforced() {
        return isDynamicEnforced;
      }
    };

    if (reactorWindow) {
      debugController.onDebugChanged(function (isEnabled) {
        if (isEnabled) {
          reactorWindow.dynamicHostResolver = dynamicHostResolver;
        } else {
          delete reactorWindow.dynamicHostResolver;
        }
      });
    }

    return dynamicHostResolver;
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/
  /**
   * Rules can be ordered by users at the event type level. For example, assume both Rule A and Rule B
   * use the Library Loaded and Window Loaded event types. Rule A can be ordered to come before Rule B
   * on Library Loaded but after Rule B on Window Loaded.
   *
   * Order values are integers and act more as a priority. In other words, multiple rules can have the
   * same order value. If they have the same order value, their order of execution should be
   * considered nondetermistic.
   *
   * @param {Array} rules
   * @returns {Array} An ordered array of rule-event pair objects.
   */
  var buildRuleExecutionOrder = function (rules) {
    var ruleEventPairs = [];

    rules.forEach(function (rule) {
      if (rule.events) {
        rule.events.forEach(function (event) {
          ruleEventPairs.push({
            rule: rule,
            event: event
          });
        });
      }
    });

    return ruleEventPairs.sort(function (ruleEventPairA, ruleEventPairB) {
      return ruleEventPairA.event.ruleOrder - ruleEventPairB.event.ruleOrder;
    });
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var DEBUG_LOCAL_STORAGE_NAME = 'debug';

  var createDebugController = function (localStorage, logger) {
    var getPersistedDebugEnabled = function () {
      return localStorage.getItem(DEBUG_LOCAL_STORAGE_NAME) === 'true';
    };

    var setPersistedDebugEnabled = function (enabled) {
      localStorage.setItem(DEBUG_LOCAL_STORAGE_NAME, enabled);
    };

    var debugChangedCallbacks = [];
    var onDebugChanged = function (callback) {
      debugChangedCallbacks.push(callback);
    };

    logger.outputEnabled = getPersistedDebugEnabled();

    return {
      onDebugChanged: onDebugChanged,
      getDebugEnabled: getPersistedDebugEnabled,
      setDebugEnabled: function (enabled) {
        if (getPersistedDebugEnabled() !== enabled) {
          setPersistedDebugEnabled(enabled);
          logger.outputEnabled = enabled;
          debugChangedCallbacks.forEach(function (callback) {
            callback(enabled);
          });
        }
      }
    };
  };

  /***************************************************************************************
   * (c) 2018 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/
  var MODULE_NOT_FUNCTION_ERROR = 'Module did not export a function.';

  var createExecuteDelegateModule = function (
    moduleProvider,
    replaceTokens,
    settingsFileTransformer
  ) {
    return function (moduleDescriptor, syntheticEvent, moduleCallParameters) {
      moduleCallParameters = moduleCallParameters || [];
      var moduleExports = moduleProvider.getModuleExports(
        moduleDescriptor.modulePath
      );

      if (typeof moduleExports !== 'function') {
        throw new Error(MODULE_NOT_FUNCTION_ERROR);
      }

      // dynamically replace the host on the module settings
      var moduleDefinition = moduleProvider.getModuleDefinition(
        moduleDescriptor.modulePath
      );

      // We're transforming URLs in-place to ensure that the developer's settings object reference
      // is the same object reference as moduleDescriptor.settings. Therefore, we must only transform
      // the settings one time and save a reference saying that we've done that. We're saving this in
      // the module descriptor of each event, condition, and action so that we aren't modifying the
      // settings object.
      var moduleSettings = moduleDescriptor.settings || {};
      if (
        !moduleDescriptor.hasTransformedFilePaths &&
        moduleDefinition.filePaths
      ) {
        settingsFileTransformer(
          moduleSettings,
          moduleDefinition.filePaths,
          moduleDescriptor.modulePath
        );
        moduleDescriptor.hasTransformedFilePaths = true;
      }

      // replace tokens
      var moduleDescriptorSettings = replaceTokens(
        moduleSettings,
        syntheticEvent
      );
      return moduleExports
        .bind(null, moduleDescriptorSettings)
        .apply(null, moduleCallParameters);
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/
  /**
   * "Cleans" text by trimming the string and removing spaces and newlines.
   * @param {string} str The string to clean.
   * @returns {string}
   */
  var cleanText = function (str) {
    return typeof str === 'string' ? str.replace(/\s+/g, ' ').trim() : str;
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/
  /**
   * Log levels.
   * @readonly
   * @enum {string}
   * @private
   */
  var levels = {
    LOG: 'log',
    INFO: 'info',
    DEBUG: 'debug',
    WARN: 'warn',
    ERROR: 'error'
  };

  /**
   * Rocket unicode surrogate pair.
   * @type {string}
   */
  var ROCKET = '\uD83D\uDE80';

  /**
   * The user's internet explorer version. If they're not running internet explorer, then it should
   * be NaN.
   * @type {Number}
   */
  var ieVersion = parseInt(
    (/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]
  );

  /**
   * Prefix to use on all messages. The rocket unicode doesn't work on IE 10.
   * @type {string}
   */
  var launchPrefix = ieVersion === 10 ? '[Launch]' : ROCKET;

  /**
   * Whether logged messages should be output to the console.
   * @type {boolean}
   */
  var outputEnabled = false;

  /**
   * Processes a log message.
   * @param {string} level The level of message to log.
   * @param {...*} arg Any argument to be logged.
   * @private
   */
  var process = function (level) {
    if (outputEnabled && window.console) {
      var logArguments = Array.prototype.slice.call(arguments, 1);
      logArguments.unshift(launchPrefix);
      // window.debug is unsupported in IE 10
      if (level === levels.DEBUG && !window.console[level]) {
        level = levels.INFO;
      }
      window.console[level].apply(window.console, logArguments);
    }
  };

  /**
   * Outputs a message to the web console.
   * @param {...*} arg Any argument to be logged.
   */
  var log = process.bind(null, levels.LOG);

  /**
   * Outputs informational message to the web console. In some browsers a small "i" icon is
   * displayed next to these items in the web console's log.
   * @param {...*} arg Any argument to be logged.
   */
  var info = process.bind(null, levels.INFO);

  /**
   * Outputs debug message to the web console. In browsers that do not support
   * console.debug, console.info is used instead.
   * @param {...*} arg Any argument to be logged.
   */
  var debug = process.bind(null, levels.DEBUG);

  /**
   * Outputs a warning message to the web console.
   * @param {...*} arg Any argument to be logged.
   */
  var warn = process.bind(null, levels.WARN);

  /**
   * Outputs an error message to the web console.
   * @param {...*} arg Any argument to be logged.
   */
  var error = process.bind(null, levels.ERROR);

  /**
   * Outputs a warning message to the web console.
   * @param {...*} arg Any argument to be logged.
   */
  var logDeprecation = function () {
    var wasEnabled = outputEnabled;
    outputEnabled = true;

    process.apply(
      null,
      Array.prototype.concat(levels.WARN, Array.prototype.slice.call(arguments))
    );

    if (!wasEnabled) {
      outputEnabled = false;
    }
  };

  var logger = {
    log: log,
    info: info,
    debug: debug,
    warn: warn,
    error: error,
    deprecation: logDeprecation,
    /**
     * Whether logged messages should be output to the console.
     * @type {boolean}
     */
    get outputEnabled() {
      return outputEnabled;
    },
    set outputEnabled(value) {
      outputEnabled = value;
    },
    /**
     * Creates a logging utility that only exposes logging functionality and prefixes all messages
     * with an identifier.
     */
    createPrefixedLogger: function (identifier) {
      var loggerSpecificPrefix = '[' + identifier + ']';

      return {
        log: log.bind(null, loggerSpecificPrefix),
        info: info.bind(null, loggerSpecificPrefix),
        debug: debug.bind(null, loggerSpecificPrefix),
        warn: warn.bind(null, loggerSpecificPrefix),
        error: error.bind(null, loggerSpecificPrefix)
      };
    }
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  var NAMESPACE = 'com.adobe.reactor.';

  var getNamespacedStorage = function (storageType, additionalNamespace) {
    var finalNamespace = NAMESPACE + (additionalNamespace || '');

    // When storage is disabled on Safari, the mere act of referencing window.localStorage
    // or window.sessionStorage throws an error. For this reason, we wrap in a try-catch.
    return {
      /**
       * Reads a value from storage.
       * @param {string} name The name of the item to be read.
       * @returns {string}
       */
      getItem: function (name) {
        try {
          return reactorWindow[storageType].getItem(finalNamespace + name);
        } catch (e) {
          return null;
        }
      },
      /**
       * Saves a value to storage.
       * @param {string} name The name of the item to be saved.
       * @param {string} value The value of the item to be saved.
       * @returns {boolean} Whether the item was successfully saved to storage.
       */
      setItem: function (name, value) {
        try {
          reactorWindow[storageType].setItem(finalNamespace + name, value);
          return true;
        } catch (e) {
          return false;
        }
      }
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  var DATA_ELEMENTS_NAMESPACE = 'dataElements.';

  var dataElementSessionStorage = getNamespacedStorage(
    'sessionStorage',
    DATA_ELEMENTS_NAMESPACE
  );
  var dataElementLocalStorage = getNamespacedStorage(
    'localStorage',
    DATA_ELEMENTS_NAMESPACE
  );

  var storageDurations = {
    PAGEVIEW: 'pageview',
    SESSION: 'session',
    VISITOR: 'visitor'
  };

  var pageviewCache = {};

  var serialize = function (value) {
    var serialized;

    try {
      // On some browsers, with some objects, errors will be thrown during serialization. For example,
      // in Chrome with the window object, it will throw "TypeError: Converting circular structure
      // to JSON"
      serialized = JSON.stringify(value);
      // eslint-disable-next-line no-empty
    } catch (e) {}

    return serialized;
  };

  var setValue = function (key, storageDuration, value) {
    var serializedValue;

    switch (storageDuration) {
      case storageDurations.PAGEVIEW:
        pageviewCache[key] = value;
        return;
      case storageDurations.SESSION:
        serializedValue = serialize(value);
        if (serializedValue) {
          dataElementSessionStorage.setItem(key, serializedValue);
        }
        return;
      case storageDurations.VISITOR:
        serializedValue = serialize(value);
        if (serializedValue) {
          dataElementLocalStorage.setItem(key, serializedValue);
        }
        return;
    }
  };

  var getValue = function (key, storageDuration) {
    var value;

    // It should consistently return the same value if no stored item was found. We chose null,
    // though undefined could be a reasonable value as well.
    switch (storageDuration) {
      case storageDurations.PAGEVIEW:
        return pageviewCache.hasOwnProperty(key) ? pageviewCache[key] : null;
      case storageDurations.SESSION:
        value = dataElementSessionStorage.getItem(key);
        return value === null ? value : JSON.parse(value);
      case storageDurations.VISITOR:
        value = dataElementLocalStorage.getItem(key);
        return value === null ? value : JSON.parse(value);
    }
  };

  var dataElementSafe = {
    setValue: setValue,
    getValue: getValue
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  var getErrorMessage = function (
    dataDef,
    dataElementName,
    errorMessage,
    errorStack
  ) {
    return (
      'Failed to execute data element module ' +
      dataDef.modulePath +
      ' for data element ' +
      dataElementName +
      '. ' +
      errorMessage +
      (errorStack ? '\n' + errorStack : '')
    );
  };

  var createGetDataElementValue = function (
    moduleProvider,
    getDataElementDefinition,
    replaceTokens,
    undefinedVarsReturnEmpty,
    settingsFileTransformer
  ) {
    return function (name, syntheticEvent) {
      var dataDef = getDataElementDefinition(name);

      if (!dataDef) {
        return undefinedVarsReturnEmpty ? '' : undefined;
      }

      var storageDuration = dataDef.storageDuration;
      var moduleExports;
      var moduleDefinition;

      try {
        moduleExports = moduleProvider.getModuleExports(dataDef.modulePath);
        moduleDefinition = moduleProvider.getModuleDefinition(dataDef.modulePath);
      } catch (e) {
        logger.error(getErrorMessage(dataDef, name, e.message, e.stack));
        return;
      }

      if (typeof moduleExports !== 'function') {
        logger.error(
          getErrorMessage(dataDef, name, 'Module did not export a function.')
        );
        return;
      }

      var value;

      var dataElementSettings = dataDef.settings || {};
      if (!dataDef.hasTransformedFilePaths && moduleDefinition.filePaths) {
        settingsFileTransformer(
          dataElementSettings,
          moduleDefinition.filePaths,
          dataDef.modulePath
        );
        dataDef.hasTransformedFilePaths = true;
      }

      try {
        value = moduleExports(
          replaceTokens(dataElementSettings, syntheticEvent),
          syntheticEvent
        );
      } catch (e) {
        logger.error(getErrorMessage(dataDef, name, e.message, e.stack));
        return;
      }

      if (storageDuration) {
        if (value != null) {
          dataElementSafe.setValue(name, storageDuration, value);
        } else {
          value = dataElementSafe.getValue(name, storageDuration);
        }
      }

      if (value == null && dataDef.defaultValue != null) {
        value = dataDef.defaultValue;
      }

      if (typeof value === 'string') {
        if (dataDef.cleanText) {
          value = cleanText(value);
        }

        if (dataDef.forceLowerCase) {
          value = value.toLowerCase();
        }
      }

      return value;
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  var specialPropertyAccessors = {
    text: function (obj) {
      return obj.textContent;
    },
    cleanText: function (obj) {
      return cleanText(obj.textContent);
    }
  };

  /**
   * This returns the value of a property at a given path. For example, a <code>path<code> of
   * <code>foo.bar</code> will return the value of <code>obj.foo.bar</code>.
   *
   * In addition, if <code>path</code> is <code>foo.bar.getAttribute(unicorn)</code> and
   * <code>obj.foo.bar</code> has a method named <code>getAttribute</code>, the method will be
   * called with a value of <code>"unicorn"</code> and the value will be returned.
   *
   * Also, if <code>path</code> is <code>foo.bar.@text</code> or other supported properties
   * beginning with <code>@</code>, a special accessor will be used.
   *
   * @param host
   * @param path
   * @param supportSpecial
   * @returns {*}
   */
  var getObjectProperty = function (host, propChain, supportSpecial) {
    var value = host;
    var attrMatch;
    for (var i = 0, len = propChain.length; i < len; i++) {
      if (value == null) {
        return undefined;
      }
      var prop = propChain[i];
      if (supportSpecial && prop.charAt(0) === '@') {
        var specialProp = prop.slice(1);
        value = specialPropertyAccessors[specialProp](value);
        continue;
      }
      if (
        value.getAttribute &&
        (attrMatch = prop.match(/^getAttribute\((.+)\)$/))
      ) {
        var attr = attrMatch[1];
        value = value.getAttribute(attr);
        continue;
      }
      value = value[prop];
    }
    return value;
  };

  /**
   * Returns the value of a variable.
   * @param {string} variable
   * @param {Object} [syntheticEvent] A synthetic event. Only required when using %event... %this...
   * or %target...
   * @returns {*}
   */
  var createGetVar = function (
    customVars,
    getDataElementDefinition,
    getDataElementValue
  ) {
    return function (variable, syntheticEvent) {
      var value;

      if (getDataElementDefinition(variable)) {
        // Accessing nested properties of a data element using dot-notation is unsupported because
        // users can currently create data elements with periods in the name.
        value = getDataElementValue(variable, syntheticEvent);
      } else {
        var propChain = variable.split('.');
        var variableHostName = propChain.shift();

        if (variableHostName === 'this') {
          if (syntheticEvent) {
            // I don't know why this is the only one that supports special properties, but that's the
            // way it was in Satellite.
            value = getObjectProperty(syntheticEvent.element, propChain, true);
          }
        } else if (variableHostName === 'event') {
          if (syntheticEvent) {
            value = getObjectProperty(syntheticEvent, propChain);
          }
        } else if (variableHostName === 'target') {
          if (syntheticEvent) {
            value = getObjectProperty(syntheticEvent.target, propChain);
          }
        } else {
          value = getObjectProperty(customVars[variableHostName], propChain);
        }
      }

      return value;
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/
  /**
   * Determines if the provided name is a valid variable, where the variable
   * can be a data element, element, event, target, or custom var.
   * @param variableName
   * @returns {boolean}
   */
  var createIsVar = function (customVars, getDataElementDefinition) {
    return function (variableName) {
      var nameBeforeDot = variableName.split('.')[0];

      return Boolean(
        getDataElementDefinition(variableName) ||
        nameBeforeDot === 'this' ||
        nameBeforeDot === 'event' ||
        nameBeforeDot === 'target' ||
        customVars.hasOwnProperty(nameBeforeDot)
      );
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/
  var extractModuleExports = function (script, require, turbine) {
    var module = {
      exports: {}
    };

    script.call(module.exports, module, module.exports, require, turbine);

    return module.exports;
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  var createModuleProvider = function () {
    var moduleByReferencePath = {};

    var getModule = function (referencePath) {
      var module = moduleByReferencePath[referencePath];

      if (!module) {
        throw new Error('Module ' + referencePath + ' not found.');
      }

      return module;
    };

    var registerModule = function (
      referencePath,
      moduleDefinition,
      extensionName,
      require,
      turbine
    ) {
      var module = {
        definition: moduleDefinition,
        extensionName: extensionName,
        require: require,
        turbine: turbine
      };
      module.require = require;
      moduleByReferencePath[referencePath] = module;
    };

    var hydrateCache = function () {
      Object.keys(moduleByReferencePath).forEach(function (referencePath) {
        try {
          getModuleExports(referencePath);
        } catch (e) {
          var errorMessage =
            'Error initializing module ' +
            referencePath +
            '. ' +
            e.message +
            (e.stack ? '\n' + e.stack : '');
          logger.error(errorMessage);
        }
      });
    };

    var getModuleExports = function (referencePath) {
      var module = getModule(referencePath);

      // Using hasOwnProperty instead of a falsey check because the module could export undefined
      // in which case we don't want to execute the module each time the exports is requested.
      if (!module.hasOwnProperty('exports')) {
        module.exports = extractModuleExports(
          module.definition.script,
          module.require,
          module.turbine
        );
      }

      return module.exports;
    };

    var getModuleDefinition = function (referencePath) {
      return getModule(referencePath).definition;
    };

    var getModuleExtensionName = function (referencePath) {
      return getModule(referencePath).extensionName;
    };

    return {
      registerModule: registerModule,
      hydrateCache: hydrateCache,
      getModuleExports: getModuleExports,
      getModuleDefinition: getModuleDefinition,
      getModuleExtensionName: getModuleExtensionName
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  var warningLogged = false;

  var createNotifyMonitors = function (_satellite) {
    return function (type, event) {
      var monitors = _satellite._monitors;

      if (monitors) {
        if (!warningLogged) {
          logger.warn(
            'The _satellite._monitors API may change at any time and should only ' +
            'be used for debugging.'
          );
          warningLogged = true;
        }

        monitors.forEach(function (monitor) {
          if (monitor[type]) {
            monitor[type](event);
          }
        });
      }
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  /**
   * Replacing any variable tokens (%myDataElement%, %this.foo%, etc.) with their associated values.
   * A new string, object, or array will be created; the thing being processed will never be
   * modified.
   * @param {*} thing Thing potentially containing variable tokens. Objects and arrays will be
   * deeply processed.
   * @param {HTMLElement} [element] Associated HTML element. Used for special tokens
   * (%this.something%).
   * @param {Object} [event] Associated event. Used for special tokens (%event.something%,
   * %target.something%)
   * @returns {*} A processed value.
   */
  var createReplaceTokens = function (isVar, getVar, undefinedVarsReturnEmpty) {
    var replaceTokensInString;
    var replaceTokensInObject;
    var replaceTokensInArray;
    var replaceTokens;
    var variablesBeingRetrieved = [];

    var getVarValue = function (token, variableName, syntheticEvent) {
      if (!isVar(variableName)) {
        return token;
      }

      variablesBeingRetrieved.push(variableName);
      var val = getVar(variableName, syntheticEvent);
      variablesBeingRetrieved.pop();
      return val == null && undefinedVarsReturnEmpty ? '' : val;
    };

    /**
     * Perform variable substitutions to a string where tokens are specified in the form %foo%.
     * If the only content of the string is a single data element token, then the raw data element
     * value will be returned instead.
     *
     * @param str {string} The string potentially containing data element tokens.
     * @param element {HTMLElement} The element to use for tokens in the form of %this.property%.
     * @param event {Object} The event object to use for tokens in the form of %target.property%.
     * @returns {*}
     */
    replaceTokensInString = function (str, syntheticEvent) {
      // Is the string a single data element token and nothing else?
      var result = /^%([^%]+)%$/.exec(str);

      if (result) {
        return getVarValue(str, result[1], syntheticEvent);
      } else {
        return str.replace(/%(.+?)%/g, function (token, variableName) {
          return getVarValue(token, variableName, syntheticEvent);
        });
      }
    };

    replaceTokensInObject = function (obj, syntheticEvent) {
      var ret = {};
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = obj[key];
        ret[key] = replaceTokens(value, syntheticEvent);
      }
      return ret;
    };

    replaceTokensInArray = function (arr, syntheticEvent) {
      var ret = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        ret.push(replaceTokens(arr[i], syntheticEvent));
      }
      return ret;
    };

    replaceTokens = function (thing, syntheticEvent) {
      if (typeof thing === 'string') {
        return replaceTokensInString(thing, syntheticEvent);
      } else if (Array.isArray(thing)) {
        return replaceTokensInArray(thing, syntheticEvent);
      } else if (typeof thing === 'object' && thing !== null) {
        return replaceTokensInObject(thing, syntheticEvent);
      }

      return thing;
    };

    return function (thing, syntheticEvent) {
      // It's possible for a data element to reference another data element. Because of this,
      // we need to prevent circular dependencies from causing an infinite loop.
      if (variablesBeingRetrieved.length > 10) {
        logger.error(
          'Data element circular reference detected: ' +
          variablesBeingRetrieved.join(' -> ')
        );
        return thing;
      }

      return replaceTokens(thing, syntheticEvent);
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/
  var createSetCustomVar = function (customVars) {
    return function () {
      if (typeof arguments[0] === 'string') {
        customVars[arguments[0]] = arguments[1];
      } else if (arguments[0]) {
        // assume an object literal
        var mapping = arguments[0];
        for (var key in mapping) {
          customVars[key] = mapping[key];
        }
      }
    };
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getAugmentedNamespace(n) {
    if (n.__esModule) return n;
    var a = Object.defineProperty({}, '__esModule', {value: true});
    Object.keys(n).forEach(function (k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return n[k];
        }
      });
    });
    return a;
  }

  function createCommonjsModule(fn) {
    var module = { exports: {} };
    return fn(module, module.exports), module.exports;
  }

  /**
   * @this {Promise}
   */
  function finallyConstructor(callback) {
    var constructor = this.constructor;
    return this.then(
      function(value) {
        // @ts-ignore
        return constructor.resolve(callback()).then(function() {
          return value;
        });
      },
      function(reason) {
        // @ts-ignore
        return constructor.resolve(callback()).then(function() {
          // @ts-ignore
          return constructor.reject(reason);
        });
      }
    );
  }

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function isArray(x) {
    return Boolean(x && typeof x.length !== 'undefined');
  }

  function noop() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function() {
      fn.apply(thisArg, arguments);
    };
  }

  /**
   * @constructor
   * @param {Function} fn
   */
  function Promise$1(fn) {
    if (!(this instanceof Promise$1))
      throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    /** @type {!number} */
    this._state = 0;
    /** @type {!boolean} */
    this._handled = false;
    /** @type {Promise|undefined} */
    this._value = undefined;
    /** @type {!Array<!Function>} */
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise$1._immediateFn(function() {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self)
        throw new TypeError('A promise cannot be resolved with itself.');
      if (
        newValue &&
        (typeof newValue === 'object' || typeof newValue === 'function')
      ) {
        var then = newValue.then;
        if (newValue instanceof Promise$1) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise$1._immediateFn(function() {
        if (!self._handled) {
          Promise$1._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  /**
   * @constructor
   */
  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(
        function(value) {
          if (done) return;
          done = true;
          resolve(self, value);
        },
        function(reason) {
          if (done) return;
          done = true;
          reject(self, reason);
        }
      );
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise$1.prototype['catch'] = function(onRejected) {
    return this.then(null, onRejected);
  };

  Promise$1.prototype.then = function(onFulfilled, onRejected) {
    // @ts-ignore
    var prom = new this.constructor(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise$1.prototype['finally'] = finallyConstructor;

  Promise$1.all = function(arr) {
    return new Promise$1(function(resolve, reject) {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.all accepts an array'));
      }

      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(
                val,
                function(val) {
                  res(i, val);
                },
                reject
              );
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise$1.resolve = function(value) {
    if (value && typeof value === 'object' && value.constructor === Promise$1) {
      return value;
    }

    return new Promise$1(function(resolve) {
      resolve(value);
    });
  };

  Promise$1.reject = function(value) {
    return new Promise$1(function(resolve, reject) {
      reject(value);
    });
  };

  Promise$1.race = function(arr) {
    return new Promise$1(function(resolve, reject) {
      if (!isArray(arr)) {
        return reject(new TypeError('Promise.race accepts an array'));
      }

      for (var i = 0, len = arr.length; i < len; i++) {
        Promise$1.resolve(arr[i]).then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise$1._immediateFn =
    // @ts-ignore
    (typeof setImmediate === 'function' &&
      function(fn) {
        // @ts-ignore
        setImmediate(fn);
      }) ||
    function(fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise$1._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  var src$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Promise$1
  });

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(src$1);

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

    // For building Turbine we are using Rollup. For running the turbine tests we are using
    // Karma + Webpack. You need to specify the default import when using promise-polyfill`
    // with Webpack 2+. We need `require('promise-polyfill').default` for running the tests
    // and `require('promise-polyfill')` for building Turbine.
  var reactorPromise =
    (typeof window !== 'undefined' && window.Promise) ||
    (typeof commonjsGlobal !== 'undefined' && commonjsGlobal.Promise) ||
    require$$0.default ||
    require$$0;

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/

  var createAddActionToQueue = function (
    executeDelegateModule,
    normalizeRuleComponentError,
    logActionError
  ) {
    return function (action, rule, syntheticEvent, lastPromiseInQueue) {
      return lastPromiseInQueue.then(function () {
        // This module is used when ruleComponentSequencing is enabled.
        // action.timeout is always supplied to this module as >= 0 when delayNext is true.

        var delayNextAction = action.delayNext;
        var actionTimeoutId;

        return new reactorPromise(function (resolve, reject) {
          var moduleResult = executeDelegateModule(action, syntheticEvent, [
            syntheticEvent
          ]);

          if (!delayNextAction) {
            return resolve();
          }

          var promiseTimeoutMs = action.timeout;
          var timeoutPromise = new reactorPromise(function (resolve, reject) {
            actionTimeoutId = setTimeout(function () {
              reject(
                new Error(
                  'A timeout occurred because the action took longer than ' +
                  promiseTimeoutMs / 1000 +
                  ' seconds to complete. '
                )
              );
            }, promiseTimeoutMs);
          });

          reactorPromise.race([moduleResult, timeoutPromise]).then(resolve, reject);
        })
          .catch(function (e) {
            clearTimeout(actionTimeoutId);
            e = normalizeRuleComponentError(e);
            logActionError(action, rule, e);
            return reactorPromise.reject(e);
          })
          .then(function () {
            clearTimeout(actionTimeoutId);
          });
      });
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/

  var createAddConditionToQueue = function (
    executeDelegateModule,
    normalizeRuleComponentError,
    isConditionMet,
    logConditionError,
    logConditionNotMet
  ) {
    return function (condition, rule, syntheticEvent, lastPromiseInQueue) {
      return lastPromiseInQueue.then(function () {
        // This module is used when ruleComponentSequencing is enabled.
        // condition.timeout is always supplied to this module as >= 0.
        // Conditions always assume delayNext = true because we have to know the
        // condition result before moving on.
        var conditionTimeoutId;

        return new reactorPromise(function (resolve, reject) {
          var moduleResult = executeDelegateModule(condition, syntheticEvent, [
            syntheticEvent
          ]);

          var promiseTimeoutMs = condition.timeout;
          var timeoutPromise = new reactorPromise(function (resolve, reject) {
            conditionTimeoutId = setTimeout(function () {
              reject(
                new Error(
                  'A timeout occurred because the condition took longer than ' +
                  promiseTimeoutMs / 1000 +
                  ' seconds to complete. '
                )
              );
            }, promiseTimeoutMs);
          });

          reactorPromise.race([moduleResult, timeoutPromise]).then(resolve, reject);
        })
          .catch(function (e) {
            clearTimeout(conditionTimeoutId);
            e = normalizeRuleComponentError(e);
            logConditionError(condition, rule, e);
            return reactorPromise.reject(e);
          })
          .then(function (result) {
            clearTimeout(conditionTimeoutId);
            if (!isConditionMet(condition, result)) {
              logConditionNotMet(condition, rule);
              return reactorPromise.reject();
            }
          });
      });
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/

  var lastPromiseInQueue = reactorPromise.resolve();

  var createAddRuleToQueue = function (
    addConditionToQueue,
    addActionToQueue,
    logRuleCompleted
  ) {
    return function (rule, syntheticEvent) {
      if (rule.conditions) {
        rule.conditions.forEach(function (condition) {
          lastPromiseInQueue = addConditionToQueue(
            condition,
            rule,
            syntheticEvent,
            lastPromiseInQueue
          );
        });
      }

      if (rule.actions) {
        rule.actions.forEach(function (action) {
          lastPromiseInQueue = addActionToQueue(
            action,
            rule,
            syntheticEvent,
            lastPromiseInQueue
          );
        });
      }

      lastPromiseInQueue = lastPromiseInQueue.then(function () {
        logRuleCompleted(rule);
      });

      // Allows later rules to keep running when an error occurs within this rule.
      lastPromiseInQueue = lastPromiseInQueue.catch(function () {});

      return lastPromiseInQueue;
    };
  };

  var isPromiseLike = function (value) {
    return Boolean(
      value && typeof value === 'object' && typeof value.then === 'function'
    );
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/

  var createEvaluateConditions = function (
    executeDelegateModule,
    isConditionMet,
    logConditionNotMet,
    logConditionError
  ) {
    return function (rule, syntheticEvent) {
      var condition;

      if (rule.conditions) {
        for (var i = 0; i < rule.conditions.length; i++) {
          condition = rule.conditions[i];

          try {
            var result = executeDelegateModule(condition, syntheticEvent, [
              syntheticEvent
            ]);

            // If the result is promise-like, the extension needs to do something asynchronously,
            // but the customer does not have rule component sequencing enabled on the property.
            // If we didn't do this, the condition would always pass because the promise is
            // considered "truthy".
            if (isPromiseLike(result)) {
              throw new Error(
                'Rule component sequencing must be enabled on the property ' +
                'for this condition to function properly.'
              );
            }

            if (!isConditionMet(condition, result)) {
              logConditionNotMet(condition, rule);
              return false;
            }
          } catch (e) {
            logConditionError(condition, rule, e);
            return false;
          }
        }
      }

      return true;
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var createExecuteRule = function (evaluateConditions, runActions) {
    return function (rule, normalizedSyntheticEvent) {
      if (evaluateConditions(rule, normalizedSyntheticEvent)) {
        runActions(rule, normalizedSyntheticEvent);
      }
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var createGetModuleDisplayNameByRuleComponent = function (moduleProvider) {
    return function (ruleComponent) {
      var moduleDefinition = moduleProvider.getModuleDefinition(
        ruleComponent.modulePath
      );
      return (
        (moduleDefinition && moduleDefinition.displayName) ||
        ruleComponent.modulePath
      );
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var createGetSyntheticEventMeta = function (moduleProvider) {
    return function (ruleEventPair) {
      var rule = ruleEventPair.rule;
      var event = ruleEventPair.event;

      var moduleName = moduleProvider.getModuleDefinition(event.modulePath).name;
      var extensionName = moduleProvider.getModuleExtensionName(event.modulePath);

      return {
        $type: extensionName + '.' + moduleName,
        $rule: {
          id: rule.id,
          name: rule.name
        }
      };
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var createInitEventModule = function (
    triggerRule,
    executeDelegateModule,
    normalizeSyntheticEvent,
    getErrorMessage,
    getSyntheticEventMeta,
    logger
  ) {
    return function (guardUntilAllInitialized, ruleEventPair) {
      var rule = ruleEventPair.rule;
      var event = ruleEventPair.event;
      event.settings = event.settings || {};

      try {
        var syntheticEventMeta = getSyntheticEventMeta(ruleEventPair);

        executeDelegateModule(event, null, [
          /**
           * This is the callback that executes a particular rule when an event has occurred.
           * @param {Object} [syntheticEvent] An object that contains detail regarding the event
           * that occurred.
           */
          function trigger(syntheticEvent) {
            // DTM-11871
            // If we're still in the process of initializing event modules,
            // we need to queue up any calls to trigger, otherwise if the triggered
            // rule does something that triggers a different rule whose event module
            // has not been initialized, that secondary rule will never get executed.
            // This can be removed if we decide to always use the rule queue, since
            // conditions and actions will be processed asynchronously, which
            // would give time for all event modules to be initialized.

            var normalizedSyntheticEvent = normalizeSyntheticEvent(
              syntheticEventMeta,
              syntheticEvent
            );

            guardUntilAllInitialized(function () {
              triggerRule(normalizedSyntheticEvent, rule);
            });
          }
        ]);
      } catch (e) {
        logger.error(getErrorMessage(event, rule, e));
      }
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var createLogActionError = function (
    getRuleComponentErrorMessage,
    getModuleDisplayNameByRuleComponent,
    logger,
    notifyMonitors
  ) {
    return function (action, rule, e) {
      var actionDisplayName = getModuleDisplayNameByRuleComponent(action);

      logger.error(getRuleComponentErrorMessage(actionDisplayName, rule.name, e));

      notifyMonitors('ruleActionFailed', {
        rule: rule,
        action: action
      });
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var createLogConditionError = function (
    getRuleComponentErrorMessage,
    getModuleDisplayNameByRuleComponent,
    logger,
    notifyMonitors
  ) {
    return function (condition, rule, e) {
      var conditionDisplayName = getModuleDisplayNameByRuleComponent(condition);

      logger.error(
        getRuleComponentErrorMessage(conditionDisplayName, rule.name, e)
      );

      notifyMonitors('ruleConditionFailed', {
        rule: rule,
        condition: condition
      });
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var createLogConditionNotMet = function (
    getModuleDisplayNameByRuleComponent,
    logger,
    notifyMonitors
  ) {
    return function (condition, rule) {
      var conditionDisplayName = getModuleDisplayNameByRuleComponent(condition);

      logger.log(
        'Condition "' +
        conditionDisplayName +
        '" for rule "' +
        rule.name +
        '" was not met.'
      );

      notifyMonitors('ruleConditionFailed', {
        rule: rule,
        condition: condition
      });
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var createLogRuleCompleted = function (logger, notifyMonitors) {
    return function (rule) {
      logger.log('Rule "' + rule.name + '" fired.');
      notifyMonitors('ruleCompleted', {
        rule: rule
      });
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var createRunActions = function (
    executeDelegateModule,
    logActionError,
    logRuleCompleted
  ) {
    return function (rule, syntheticEvent) {
      var action;

      if (rule.actions) {
        for (var i = 0; i < rule.actions.length; i++) {
          action = rule.actions[i];
          try {
            executeDelegateModule(action, syntheticEvent, [syntheticEvent]);
          } catch (e) {
            logActionError(action, rule, e);
            return;
          }
        }
      }

      logRuleCompleted(rule);
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var createTriggerRule = function (
    ruleComponentSequencingEnabled,
    executeRule,
    addRuleToQueue,
    notifyMonitors
  ) {
    return function (normalizedSyntheticEvent, rule) {
      notifyMonitors('ruleTriggered', {
        rule: rule
      });

      if (ruleComponentSequencingEnabled) {
        addRuleToQueue(rule, normalizedSyntheticEvent);
      } else {
        executeRule(rule, normalizedSyntheticEvent);
      }
    };
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var getRuleComponentErrorMessage = function (ruleComponentName, ruleName, error) {
    return (
      'Failed to execute "' +
      ruleComponentName +
      '" for "' +
      ruleName +
      '" rule. ' +
      error.message +
      (error.stack ? '\n' + error.stack : '')
    );
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var isConditionMet = function (condition, result) {
    return (result && !condition.negate) || (!result && condition.negate);
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var triggerCallQueue = [];
  var eventModulesInitialized = false;

  var guardUntilAllInitialized = function (callback) {
    if (!eventModulesInitialized) {
      triggerCallQueue.push(callback);
    } else {
      callback();
    }
  };

  var initRules = function (buildRuleExecutionOrder, rules, initEventModule) {
    buildRuleExecutionOrder(rules).forEach(function (ruleEventPair) {
      initEventModule(guardUntilAllInitialized, ruleEventPair);
    });

    eventModulesInitialized = true;
    triggerCallQueue.forEach(function (triggerCall) {
      triggerCall();
    });

    triggerCallQueue = [];
  };

  /*
	Copyright 2020 Adobe. All rights reserved.
	This file is licensed to you under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License. You may obtain a copy
	of the License at http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software distributed under
	the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
	OF ANY KIND, either express or implied. See the License for the specific language
	governing permissions and limitations under the License.
	*/
  var normalizeRuleComponentError = function (e) {
    if (!e) {
      e = new Error(
        'The extension triggered an error, but no error information was provided.'
      );
    }

    if (!(e instanceof Error)) {
      var stringifiedError =
        typeof e === 'object' ? JSON.stringify(e) : String(e);
      e = new Error(stringifiedError);
    }

    return e;
  };

  /*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2017, Jon Schlinkert.
	 * Released under the MIT License.
	 */

  var isobject = function isObject(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
  };

  /*!
	 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
	 *
	 * Copyright (c) 2014-2017, Jon Schlinkert.
	 * Released under the MIT License.
	 */



  function isObjectObject(o) {
    return isobject(o) === true
      && Object.prototype.toString.call(o) === '[object Object]';
  }

  var isPlainObject = function isPlainObject(o) {
    var ctor,prot;

    if (isObjectObject(o) === false) return false;

    // If has modified constructor
    ctor = o.constructor;
    if (typeof ctor !== 'function') return false;

    // If has modified prototype
    prot = ctor.prototype;
    if (isObjectObject(prot) === false) return false;

    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
      return false;
    }

    // Most likely a plain Object
    return true;
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  /**
   * Normalizes a synthetic event so that it exists and has at least meta.
   * @param {Object} syntheticEventMeta
   * @param {Object} [syntheticEvent]
   * @returns {Object}
   */
  var normalizeSyntheticEvent = function (syntheticEventMeta, syntheticEvent) {
    syntheticEvent = syntheticEvent || {};

    // This ensures that as the user hands us a synthetic event for multiple rules,
    // we aren't overwriting a new meta into the same object reference.
    if (isPlainObject(syntheticEvent)) {
      syntheticEvent = reactorObjectAssign({}, syntheticEvent, syntheticEventMeta);
    } else {
      // When syntheticEvent is not an object, there's nothing we can guarantee
      // about the ability to "copy". Leave it alone.
      reactorObjectAssign(syntheticEvent, syntheticEventMeta);
    }

    // Remove after some arbitrary time period when we think users have had sufficient chance
    // to move away from event.type
    if (!syntheticEvent.hasOwnProperty('type')) {
      Object.defineProperty(syntheticEvent, 'type', {
        get: function () {
          logger.deprecation(
            'Accessing event.type in Adobe Launch has been deprecated and will be ' +
            'removed soon. Please use event.$type instead.'
          );
          return syntheticEvent.$type;
        }
      });
    }

    return syntheticEvent;
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/
  /**
   * Creates a function that, when called with an extension name and module name, will return the
   * exports of the respective shared module.
   *
   * @param {Object} extensions
   * @param {Object} moduleProvider
   * @returns {Function}
   */
  var createGetSharedModuleExports = function (extensions, moduleProvider) {
    return function (extensionName, moduleName) {
      var extension = extensions[extensionName];

      if (extension) {
        var modules = extension.modules;
        if (modules) {
          var referencePaths = Object.keys(modules);
          for (var i = 0; i < referencePaths.length; i++) {
            var referencePath = referencePaths[i];
            var module = modules[referencePath];
            if (module.shared && module.name === moduleName) {
              return moduleProvider.getModuleExports(referencePath);
            }
          }
        }
      }
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/
  /**
   * Creates a function that, when called, will return a configuration object with data element
   * tokens replaced.
   *
   * @param {Object} settings
   * @returns {Function}
   */
  var createGetExtensionSettings = function (replaceTokens, settings) {
    return function () {
      return settings ? replaceTokens(settings) : {};
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/
  /**
   * Creates a function that, when called, will return the full hosted lib file URL.
   *
   * @param {string} hostedLibFilesBaseUrl
   * @returns {Function}
   */

  var createGetHostedLibFileUrl = function (
    decorateWithDynamicHost,
    hostedLibFilesBaseUrl,
    minified
  ) {
    return function (file) {
      if (minified) {
        var fileParts = file.split('.');
        fileParts.splice(fileParts.length - 1 || 1, 0, 'min');
        file = fileParts.join('.');
      }

      return decorateWithDynamicHost(hostedLibFilesBaseUrl) + file;
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/
  var JS_EXTENSION = '.js';

  /**
   * @private
   * Returns the directory of a path. A limited version of path.dirname in nodejs.
   *
   * To keep it simple, it makes the following assumptions:
   * path has a least one slash
   * path does not end with a slash
   * path does not have empty segments (e.g., /src/lib//foo.bar)
   *
   * @param {string} path
   * @returns {string}
   */
  var dirname = function (path) {
    return path.substr(0, path.lastIndexOf('/'));
  };

  /**
   * Determines if a string ends with a certain string.
   * @param {string} str The string to test.
   * @param {string} suffix The suffix to look for at the end of str.
   * @returns {boolean} Whether str ends in suffix.
   */
  var endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  /**
   * Given a starting path and a path relative to the starting path, returns the final path. A
   * limited version of path.resolve in nodejs.
   *
   * To keep it simple, it makes the following assumptions:
   * fromPath has at least one slash
   * fromPath does not end with a slash.
   * fromPath does not have empty segments (e.g., /src/lib//foo.bar)
   * relativePath starts with ./ or ../
   *
   * @param {string} fromPath
   * @param {string} relativePath
   * @returns {string}
   */
  var resolveRelativePath = function (fromPath, relativePath) {
    // Handle the case where the relative path does not end in the .js extension. We auto-append it.
    if (!endsWith(relativePath, JS_EXTENSION)) {
      relativePath = relativePath + JS_EXTENSION;
    }

    var relativePathSegments = relativePath.split('/');
    var resolvedPathSegments = dirname(fromPath).split('/');

    relativePathSegments.forEach(function (relativePathSegment) {
      if (!relativePathSegment || relativePathSegment === '.') {
        return;
      } else if (relativePathSegment === '..') {
        if (resolvedPathSegments.length) {
          resolvedPathSegments.pop();
        }
      } else {
        resolvedPathSegments.push(relativePathSegment);
      }
    });

    return resolvedPathSegments.join('/');
  };

  /*!
	 * JavaScript Cookie v2.2.1
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */

  var js_cookie = createCommonjsModule(function (module, exports) {
    (function (factory) {
      var registeredInModuleLoader;
      {
        module.exports = factory();
        registeredInModuleLoader = true;
      }
      if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
          window.Cookies = OldCookies;
          return api;
        };
      }
    }(function () {
      function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
          var attributes = arguments[ i ];
          for (var key in attributes) {
            result[key] = attributes[key];
          }
        }
        return result;
      }

      function decode (s) {
        return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
      }

      function init (converter) {
        function api() {}

        function set (key, value, attributes) {
          if (typeof document === 'undefined') {
            return;
          }

          attributes = extend({
            path: '/'
          }, api.defaults, attributes);

          if (typeof attributes.expires === 'number') {
            attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
          }

          // We're using "expires" because "max-age" is not supported by IE
          attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

          try {
            var result = JSON.stringify(value);
            if (/^[\{\[]/.test(result)) {
              value = result;
            }
          } catch (e) {}

          value = converter.write ?
            converter.write(value, key) :
            encodeURIComponent(String(value))
              .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

          key = encodeURIComponent(String(key))
            .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
            .replace(/[\(\)]/g, escape);

          var stringifiedAttributes = '';
          for (var attributeName in attributes) {
            if (!attributes[attributeName]) {
              continue;
            }
            stringifiedAttributes += '; ' + attributeName;
            if (attributes[attributeName] === true) {
              continue;
            }

            // Considers RFC 6265 section 5.2:
            // ...
            // 3.  If the remaining unparsed-attributes contains a %x3B (";")
            //     character:
            // Consume the characters of the unparsed-attributes up to,
            // not including, the first %x3B (";") character.
            // ...
            stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
          }

          return (document.cookie = key + '=' + value + stringifiedAttributes);
        }

        function get (key, json) {
          if (typeof document === 'undefined') {
            return;
          }

          var jar = {};
          // To prevent the for loop in the first place assign an empty array
          // in case there are no cookies at all.
          var cookies = document.cookie ? document.cookie.split('; ') : [];
          var i = 0;

          for (; i < cookies.length; i++) {
            var parts = cookies[i].split('=');
            var cookie = parts.slice(1).join('=');

            if (!json && cookie.charAt(0) === '"') {
              cookie = cookie.slice(1, -1);
            }

            try {
              var name = decode(parts[0]);
              cookie = (converter.read || converter)(cookie, name) ||
                decode(cookie);

              if (json) {
                try {
                  cookie = JSON.parse(cookie);
                } catch (e) {}
              }

              jar[name] = cookie;

              if (key === name) {
                break;
              }
            } catch (e) {}
          }

          return key ? jar[key] : jar;
        }

        api.set = set;
        api.get = function (key) {
          return get(key, false /* read as raw */);
        };
        api.getJSON = function (key) {
          return get(key, true /* read as json */);
        };
        api.remove = function (key, attributes) {
          set(key, '', extend(attributes, {
            expires: -1
          }));
        };

        api.defaults = {};

        api.withConverter = init;

        return api;
      }

      return init(function () {});
    }));
  });

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/



    // js-cookie has other methods that we haven't exposed here. By limiting the exposed API,
    // we have a little more flexibility to change the underlying implementation later. If clear
    // use cases come up for needing the other methods js-cookie exposes, we can re-evaluate whether
    // we want to expose them here.
  var reactorCookie = {
      get: js_cookie.get,
      set: js_cookie.set,
      remove: js_cookie.remove
    };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/



  var getPromise = function(url, script) {
    return new reactorPromise(function(resolve, reject) {
      script.onload = function() {
        resolve(script);
      };

      script.onerror = function() {
        reject(new Error('Failed to load script ' + url));
      };
    });
  };

  var reactorLoadScript = function(url) {
    var script = document.createElement('script');
    script.src = url;
    script.async = true;

    var promise = getPromise(url, script);

    document.getElementsByTagName('head')[0].appendChild(script);
    return promise;
  };

  // Copyright Joyent, Inc. and other Node contributors.

  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var decode = function(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);

    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (Array.isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  };

  // Copyright Joyent, Inc. and other Node contributors.

  var stringifyPrimitive = function(v) {
    switch (typeof v) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  };

  var encode = function(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === 'object') {
      return Object.keys(obj).map(function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k].map(function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);

    }

    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
      encodeURIComponent(stringifyPrimitive(obj));
  };

  var querystring = createCommonjsModule(function (module, exports) {

    exports.decode = exports.parse = decode;
    exports.encode = exports.stringify = encode;
  });

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/



    // We proxy the underlying querystring module so we can limit the API we expose.
    // This allows us to more easily make changes to the underlying implementation later without
    // having to worry about breaking extensions. If extensions demand additional functionality, we
    // can make adjustments as needed.
  var reactorQueryString = {
      parse: function(string) {
        //
        if (typeof string === 'string') {
          // Remove leading ?, #, & for some leniency so you can pass in location.search or
          // location.hash directly.
          string = string.trim().replace(/^[?#&]/, '');
        }
        return querystring.parse(string);
      },
      stringify: function(object) {
        return querystring.stringify(object);
      }
    };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  var CORE_MODULE_PREFIX = '@adobe/reactor-';

  var modules = {
    cookie: reactorCookie,
    document: reactorDocument,
    'load-script': reactorLoadScript,
    'object-assign': reactorObjectAssign,
    promise: reactorPromise,
    'query-string': reactorQueryString,
    window: reactorWindow
  };

  /**
   * Creates a function which can be passed as a "require" function to extension modules.
   *
   * @param {Function} getModuleExportsByRelativePath
   * @returns {Function}
   */
  var createPublicRequire = function (getModuleExportsByRelativePath) {
    return function (key) {
      if (key.indexOf(CORE_MODULE_PREFIX) === 0) {
        var keyWithoutScope = key.substr(CORE_MODULE_PREFIX.length);
        var module = modules[keyWithoutScope];

        if (module) {
          return module;
        }
      }

      if (key.indexOf('./') === 0 || key.indexOf('../') === 0) {
        return getModuleExportsByRelativePath(key);
      }

      throw new Error('Cannot resolve module "' + key + '".');
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  var hydrateModuleProvider = function (
    container,
    moduleProvider,
    debugController,
    replaceTokens,
    getDataElementValue,
    settingsFileTransformer,
    decorateWithDynamicHost
  ) {
    var extensions = container.extensions;
    var buildInfo = container.buildInfo;
    var environment = container.environment;
    var propertySettings = container.property.settings;

    if (extensions) {
      var getSharedModuleExports = createGetSharedModuleExports(
        extensions,
        moduleProvider
      );

      Object.keys(extensions).forEach(function (extensionName) {
        var extension = extensions[extensionName];
        var extensionSettings = extension.settings;
        if (Array.isArray(extension.filePaths)) {
          extensionSettings = settingsFileTransformer(
            extensionSettings,
            extension.filePaths
          );
        }
        var getExtensionSettings = createGetExtensionSettings(
          replaceTokens,
          extensionSettings
        );

        if (extension.modules) {
          var prefixedLogger = logger.createPrefixedLogger(extension.displayName);
          var getHostedLibFileUrl = createGetHostedLibFileUrl(
            decorateWithDynamicHost,
            extension.hostedLibFilesBaseUrl,
            buildInfo.minified
          );
          var turbine = {
            buildInfo: buildInfo,
            environment: environment,
            property: {
              name: container.property.name,
              id: container.property.id
            },
            getDataElementValue: getDataElementValue,
            getExtensionSettings: getExtensionSettings,
            getHostedLibFileUrl: getHostedLibFileUrl,
            getSharedModule: getSharedModuleExports,
            logger: prefixedLogger,
            propertySettings: propertySettings,
            replaceTokens: replaceTokens,
            onDebugChanged: debugController.onDebugChanged,
            get debugEnabled() {
              return debugController.getDebugEnabled();
            }
          };

          Object.keys(extension.modules).forEach(function (referencePath) {
            var module = extension.modules[referencePath];
            var getModuleExportsByRelativePath = function (relativePath) {
              var resolvedReferencePath = resolveRelativePath(
                referencePath,
                relativePath
              );
              return moduleProvider.getModuleExports(resolvedReferencePath);
            };
            var publicRequire = createPublicRequire(
              getModuleExportsByRelativePath
            );

            moduleProvider.registerModule(
              referencePath,
              module,
              extensionName,
              publicRequire,
              turbine
            );
          });
        }
      });

      // We want to extract the module exports immediately to allow the modules
      // to run some logic immediately.
      // We need to do the extraction here in order for the moduleProvider to
      // have all the modules previously registered. (eg. when moduleA needs moduleB, both modules
      // must exist inside moduleProvider).
      moduleProvider.hydrateCache();
    }
    return moduleProvider;
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  var hydrateSatelliteObject = function (
    _satellite,
    container,
    setDebugEnabled,
    getVar,
    setCustomVar
  ) {
    var customScriptPrefixedLogger = logger.createPrefixedLogger('Custom Script');

    // Will get replaced by the directCall event delegate from the Core extension. Exists here in
    // case there are no direct call rules (and therefore the directCall event delegate won't get
    // included) and our customers are still calling the method. In this case, we don't want an error
    // to be thrown. This method existed before Reactor.
    _satellite.track = function (identifier) {
      logger.log(
        '"' + identifier + '" does not match any direct call identifiers.'
      );
    };

    // Will get replaced by the Marketing Cloud ID extension if installed. Exists here in case
    // the extension is not installed and our customers are still calling the method. In this case,
    // we don't want an error to be thrown. This method existed before Reactor.
    _satellite.getVisitorId = function () {
      return null;
    };

    // container.property also has property settings, but it shouldn't concern the user.
    // By limiting our API exposure to necessities, we provide more flexibility in the future.
    _satellite.property = {
      name: container.property.name,
      id: container.property.id
    };

    _satellite.company = container.company;

    _satellite.buildInfo = container.buildInfo;

    _satellite.environment = container.environment;

    _satellite.logger = customScriptPrefixedLogger;

    /**
     * Log a message. We keep this due to legacy baggage.
     * @param {string} message The message to log.
     * @param {number} [level] A number that represents the level of logging.
     * 3=info, 4=warn, 5=error, anything else=log
     */
    _satellite.notify = function (message, level) {
      logger.deprecation(
        '_satellite.notify is deprecated. Please use the `_satellite.logger` API.'
      );

      switch (level) {
        case 3:
          customScriptPrefixedLogger.info(message);
          break;
        case 4:
          customScriptPrefixedLogger.warn(message);
          break;
        case 5:
          customScriptPrefixedLogger.error(message);
          break;
        default:
          customScriptPrefixedLogger.log(message);
      }
    };

    _satellite.getVar = getVar;
    _satellite.setVar = setCustomVar;

    /**
     * Writes a cookie.
     * @param {string} name The name of the cookie to save.
     * @param {string} value The value of the cookie to save.
     * @param {number} [days] The number of days to store the cookie. If not specified, the cookie
     * will be stored for the session only.
     */
    _satellite.setCookie = function (name, value, days) {
      var optionsStr = '';
      var options = {};

      if (days) {
        optionsStr = ', { expires: ' + days + ' }';
        options.expires = days;
      }

      var msg =
        '_satellite.setCookie is deprecated. Please use ' +
        '_satellite.cookie.set("' +
        name +
        '", "' +
        value +
        '"' +
        optionsStr +
        ').';

      logger.deprecation(msg);
      reactorCookie.set(name, value, options);
    };

    /**
     * Reads a cookie value.
     * @param {string} name The name of the cookie to read.
     * @returns {string}
     */
    _satellite.readCookie = function (name) {
      logger.deprecation(
        '_satellite.readCookie is deprecated. ' +
        'Please use _satellite.cookie.get("' +
        name +
        '").'
      );
      return reactorCookie.get(name);
    };

    /**
     * Removes a cookie value.
     * @param name
     */
    _satellite.removeCookie = function (name) {
      logger.deprecation(
        '_satellite.removeCookie is deprecated. ' +
        'Please use _satellite.cookie.remove("' +
        name +
        '").'
      );
      reactorCookie.remove(name);
    };

    _satellite.cookie = reactorCookie;

    // Will get replaced by the pageBottom event delegate from the Core extension. Exists here in
    // case the customers are not using core (and therefore the pageBottom event delegate won't get
    // included) and they are still calling the method. In this case, we don't want an error
    // to be thrown. This method existed before Reactor.
    _satellite.pageBottom = function () {};

    _satellite.setDebug = setDebugEnabled;

    var warningLogged = false;

    Object.defineProperty(_satellite, '_container', {
      get: function () {
        if (!warningLogged) {
          logger.warn(
            '_satellite._container may change at any time and should only ' +
            'be used for debugging.'
          );
          warningLogged = true;
        }

        return container;
      }
    });
  };

  /***************************************************************************************
   * Copyright 2021 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/



  var byRegexPattern = function (regexScriptSrcPattern) {
    var scripts = reactorDocument.querySelectorAll('script');

    for (var i = 0; i < scripts.length; i++) {
      var script = scripts[i];
      // Find the script that loaded our library. Take into account embed scripts migrated
      // from DTM. We'll also consider that they may have added a querystring for cache-busting
      // or whatever.
      if (regexScriptSrcPattern.test(script.src)) {
        return script;
      }
    }
  };

  var getTurbine = function () {
    return byRegexPattern(new RegExp(/(launch|satelliteLib)-[^\/]+.js(\?.*)?$/));
  };

  // NOTE: this entire module can be dropped when IE 10/11 support is dropped.
  var findPageScript = {
    getTurbine: getTurbine,
    byRegexPattern: byRegexPattern
  };

  /***************************************************************************************
   * (c) 2021 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

  function isArrayReference(str) {
    return (
      typeof str === 'string' &&
      str.indexOf('[') !== -1 &&
      str.indexOf(']') !== -1
    );
  }
  function sanitizeArrayKey(pathStrSegment) {
    return pathStrSegment.substr(
      0,
      // the name goes up to the start of the array bracket: 'someArrayName[]'
      pathStrSegment.indexOf('[')
    );
  }

  /**
   * Recursive function to loop through settings and look for the setting to transform,
   * which is the final entry within the pathSegments array. Alters settings in-place.
   * @param {Array} pathSegments
   * @param {Object} settings
   * @param {Function} decorateWithDynamicHost
   */
  function traverseIntoSettings(pathSegments, settings, decorateWithDynamicHost) {
    // nothing to do
    if (!pathSegments.length || !isPlainObject(settings)) {
      return;
    }

    var currentKey = pathSegments[0];

    // base case
    if (pathSegments.length === 1) {
      if (
        settings.hasOwnProperty(currentKey) &&
        typeof settings[currentKey] === 'string'
      ) {
        settings[currentKey] = decorateWithDynamicHost(settings[currentKey]);
      }
      return;
    }

    // still more work to do
    var remainingPathSegments = pathSegments.slice(1);
    if (isArrayReference(currentKey)) {
      // 'someArrayReference[]' --> 'someArrayReference'
      currentKey = sanitizeArrayKey(currentKey);
      var settingsValue = settings[currentKey];
      if (Array.isArray(settingsValue)) {
        settingsValue.forEach(function (arrayEntryObject) {
          return traverseIntoSettings(
            remainingPathSegments,
            arrayEntryObject,
            decorateWithDynamicHost
          );
        });
      }
    } else {
      // object case
      return traverseIntoSettings(
        remainingPathSegments,
        settings[currentKey],
        decorateWithDynamicHost
      );
    }
  }

  /**
   * Returns a function that when called will attempt to traverse the passed in
   * settings object to each file path and transform a relative URL to an absolute
   * URL.
   *
   * @param isDynamicEnforced
   * @param decorateWithDynamicHost
   * @returns {(function(*=, *=, *=): (*))|*}
   */
  var createSettingsFileTransformer = function (isDynamicEnforced, decorateWithDynamicHost) {
    return function (settings, filePaths, moduleReferencePath) {
      if (
        !isDynamicEnforced ||
        !isPlainObject(settings) ||
        !Object.keys(settings).length ||
        !Array.isArray(filePaths) ||
        !filePaths.length
      ) {
        return settings;
      }

      // pull out the file paths by the module's reference path and loop over each urlPath
      filePaths.forEach(function (filePathString) {
        // The custom code action provides the ability to have the source code in the 'source'
        // variable or to have an external file. Therefore, this module has 2 behaviors.
        // It also does not provide a value of false for isExternal just as all other extensions
        // that use fileTransform do not provide an isExternal variable check. Therefore, we need
        // to treat Adobe's custom code action special, and don't augment the 'source' variable
        // if isExternal is not also present.
        var isAdobeCustomCodeAction = Boolean(
          moduleReferencePath != null &&
          /^core\/.*actions.*\/customCode\.js$/.test(moduleReferencePath)
        );
        if (
          isAdobeCustomCodeAction &&
          filePathString === 'source' &&
          !settings.isExternal
        ) {
          return;
        }

        // modify the object in place
        traverseIntoSettings(
          filePathString.split('.'),
          settings,
          decorateWithDynamicHost
        );
      });

      return settings;
    };
  };

  /***************************************************************************************
   * (c) 2017 Adobe. All rights reserved.
   * This file is licensed to you under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License. You may obtain a copy
   * of the License at http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under
   * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
   * OF ANY KIND, either express or implied. See the License for the specific language
   * governing permissions and limitations under the License.
   ****************************************************************************************/

    // DYNAMIC URL








































  var IEGetTurbineScript =
      findPageScript.getTurbine;





  var _satellite = window._satellite;

  if (_satellite && !window.__satelliteLoaded) {
    // If a consumer loads the library multiple times, make sure only the first time is effective.
    window.__satelliteLoaded = true;

    var container = _satellite.container;

    // Remove container in public scope ASAP so it can't be manipulated by extension or user code.
    delete _satellite.container;

    /*
	    get rid of container.buildInfo decoration once deprecation is finished of
	    buildInfo.environment string
	   */
    var buildInfo = reactorObjectAssign({}, container.buildInfo);
    Object.defineProperty(buildInfo, 'environment', {
      get: function () {
        logger.deprecation(
          'container.buildInfo.environment is deprecated.' +
          'Please use `container.environment.stage` instead'
        );
        return container.environment.stage;
      }
    });
    container.buildInfo = buildInfo;

    var localStorage = getNamespacedStorage('localStorage');
    var debugController = createDebugController(localStorage, logger);

    var currentScriptSource = '';
    if (reactorDocument.currentScript && reactorDocument.currentScript.getAttribute('src')) {
      currentScriptSource = reactorDocument.currentScript.getAttribute('src');
    } else if (IEGetTurbineScript()) {
      currentScriptSource = IEGetTurbineScript().getAttribute('src');
    }
    var dynamicHostResolver;
    try {
      dynamicHostResolver = createDynamicHostResolver(
        currentScriptSource,
        Boolean(container.company.dynamicCdnEnabled),
        container.company.cdnAllowList,
        debugController
      );
    } catch (e) {
      logger.warn('Please review the following error:');
      throw e; // We don't want to continue allowing Turbine to start up if we detect an error in here
    }

    var settingsFileTransformer = createSettingsFileTransformer(
      dynamicHostResolver.isDynamicEnforced,
      dynamicHostResolver.decorateWithDynamicHost
    );

    var moduleProvider = createModuleProvider();

    var replaceTokens;

    var undefinedVarsReturnEmpty =
      container.property.settings.undefinedVarsReturnEmpty;
    var ruleComponentSequencingEnabled =
      container.property.settings.ruleComponentSequencingEnabled;

    var dataElements = container.dataElements || {};

    var getDataElementDefinition = function (name) {
      return dataElements[name];
    };

    // We support data elements referencing other data elements. In order to be able to retrieve a
    // data element value, we need to be able to replace data element tokens inside its settings
    // object (which is what replaceTokens is for). In order to be able to replace data element
    // tokens inside a settings object, we need to be able to retrieve data element
    // values (which is what getDataElementValue is for). This proxy replaceTokens function solves the
    // chicken-or-the-egg problem by allowing us to provide a replaceTokens function to
    // getDataElementValue that will stand in place of the real replaceTokens function until it
    // can be created. This also means that createDataElementValue should not call the proxy
    // replaceTokens function until after the real replaceTokens has been created.
    var proxyReplaceTokens = function () {
      return replaceTokens.apply(null, arguments);
    };

    var getDataElementValue = createGetDataElementValue(
      moduleProvider,
      getDataElementDefinition,
      proxyReplaceTokens,
      undefinedVarsReturnEmpty,
      settingsFileTransformer
    );

    var customVars = {};
    var setCustomVar = createSetCustomVar(customVars);

    var isVar = createIsVar(customVars, getDataElementDefinition);

    var getVar = createGetVar(
      customVars,
      getDataElementDefinition,
      getDataElementValue
    );

    replaceTokens = createReplaceTokens(isVar, getVar, undefinedVarsReturnEmpty);

    // Important to hydrate satellite object before we hydrate the module provider or init rules.
    // When we hydrate module provider, we also execute extension code which may be
    // accessing _satellite.
    hydrateSatelliteObject(
      _satellite,
      container,
      debugController.setDebugEnabled,
      getVar,
      setCustomVar
    );

    hydrateModuleProvider(
      container,
      moduleProvider,
      debugController,
      replaceTokens,
      getDataElementValue,
      settingsFileTransformer,
      dynamicHostResolver.decorateWithDynamicHost
    );

    var notifyMonitors = createNotifyMonitors(_satellite);
    var executeDelegateModule = createExecuteDelegateModule(
      moduleProvider,
      replaceTokens,
      settingsFileTransformer
    );

    var getModuleDisplayNameByRuleComponent =
      createGetModuleDisplayNameByRuleComponent(moduleProvider);
    var logConditionNotMet = createLogConditionNotMet(
      getModuleDisplayNameByRuleComponent,
      logger,
      notifyMonitors
    );
    var logConditionError = createLogConditionError(
      getRuleComponentErrorMessage,
      getModuleDisplayNameByRuleComponent,
      logger,
      notifyMonitors
    );
    var logActionError = createLogActionError(
      getRuleComponentErrorMessage,
      getModuleDisplayNameByRuleComponent,
      logger,
      notifyMonitors
    );
    var logRuleCompleted = createLogRuleCompleted(logger, notifyMonitors);

    var evaluateConditions = createEvaluateConditions(
      executeDelegateModule,
      isConditionMet,
      logConditionNotMet,
      logConditionError
    );
    var runActions = createRunActions(
      executeDelegateModule,
      logActionError,
      logRuleCompleted
    );
    var executeRule = createExecuteRule(evaluateConditions, runActions);

    var addConditionToQueue = createAddConditionToQueue(
      executeDelegateModule,
      normalizeRuleComponentError,
      isConditionMet,
      logConditionError,
      logConditionNotMet
    );
    var addActionToQueue = createAddActionToQueue(
      executeDelegateModule,
      normalizeRuleComponentError,
      logActionError
    );
    var addRuleToQueue = createAddRuleToQueue(
      addConditionToQueue,
      addActionToQueue,
      logRuleCompleted
    );

    var triggerRule = createTriggerRule(
      ruleComponentSequencingEnabled,
      executeRule,
      addRuleToQueue,
      notifyMonitors
    );

    var getSyntheticEventMeta = createGetSyntheticEventMeta(moduleProvider);

    var initEventModule = createInitEventModule(
      triggerRule,
      executeDelegateModule,
      normalizeSyntheticEvent,
      getRuleComponentErrorMessage,
      getSyntheticEventMeta,
      logger
    );

    initRules(buildRuleExecutionOrder, container.rules || [], initEventModule);
  }

  // Rollup's iife option always sets a global with whatever is exported, so we'll set the
  // _satellite global with the same object it already is (we've only modified it).
  var src = _satellite;

  return src;

})();

