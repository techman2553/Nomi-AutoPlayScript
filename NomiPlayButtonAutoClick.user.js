// ==UserScript==
// @name         Auto-Click Nomi Play Button for Latest Message
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Automatically clicks the play button for the latest Nomi AI response without clicking thumbs up or thumbs down buttons using aria-label for robustness
// @author       Your Name
// @match        *://*.nomi.ai/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to click the play button for the latest message
    function clickLatestPlayButton() {
        console.log("Checking for play buttons...");
        const messageElements = document.querySelectorAll('.css-fda5tg.epqbeww4');

        if (messageElements.length > 0) {
            const latestMessage = messageElements[messageElements.length - 1];
            // Use aria-label to find the play button
            const playButton = latestMessage.querySelector('button[aria-label="Speak message"]');

            if (playButton && !playButton.classList.contains('clicked')) {
                playButton.click();
                playButton.classList.add('clicked');
                console.log("Clicked the latest play button:", playButton);
            } else {
                console.log("No play button found or already clicked.");
            }
        } else {
            console.log("No message elements found.");
        }
    }

    // MutationObserver callback function to monitor new elements
    function observeNewElements(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Only element nodes
                        console.log('New element added:', node);
                        clickLatestPlayButton(); // Attempt to click the play button on new elements
                    }
                });
            }
        }
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(observeNewElements);

    // Start observing the document for changes in the subtree
    observer.observe(document.body, { childList: true, subtree: true });

    console.log('MutationObserver started.');

    // Initial click for the latest play button if there are existing messages
    clickLatestPlayButton();
})();
