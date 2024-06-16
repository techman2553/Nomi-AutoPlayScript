// ==UserScript==
// @name         Auto-Click Nomi Play Button for Latest Message
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Automatically clicks the "Speak message" button for the latest Nomi AI response and marks it by changing the margin-left property
// @author       Your Name
// @match        *://*.nomi.ai/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to click the play button for the latest message
    function clickLatestPlayButton() {
        // Select all buttons that could potentially be "Speak message" buttons
        const playButtons = document.querySelectorAll('button[aria-label="Speak message"]');

        // Check the last button and click it if its margin-left is 0px
        if (playButtons.length > 0) {
            const latestPlayButton = playButtons[playButtons.length - 1];
            if (window.getComputedStyle(latestPlayButton).marginLeft === "0px") {
                latestPlayButton.click(); // Click the button
                latestPlayButton.style.marginLeft = "1px"; // Change margin to mark as clicked
            }
        }
    }

    // MutationObserver to monitor the addition of new messages
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.querySelector('button[aria-label="Speak message"]')) {
                        clickLatestPlayButton(); // Click the play button only if the added node contains one
                    }
                });
            }
        });
    });

    // Start observing the document for changes in the subtree
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial execution to handle any existing messages on page load
    clickLatestPlayButton();
})();
