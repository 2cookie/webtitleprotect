// ==UserScript==
// @name         Title protect
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Prevent sites from leaking information by setting thier title to its domain name.
// @author       2cookie
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const domain = window.location.hostname;

    const setTitleToDomain = () => {
        if (document.title !== domain) {
            document.title = domain;
        }
    };

    setTitleToDomain();

    const observer = new MutationObserver(() => {
        setTitleToDomain();
    });

    observer.observe(document.querySelector('title'), { childList: true });

    // Failover
    setInterval(setTitleToDomain, 1000);
})();
