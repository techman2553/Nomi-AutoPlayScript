// ==UserScript==
// @name         Auto-Click Nomi Play Button for Latest Message
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Automatically clicks the play button for the latest Nomi AI response
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
            const playButton = latestMessage.querySelector('button'); // Adjust this selector if necessary

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

// Enhanced error handling
try {
    // Function to click the play button for the latest message
    function clickLatestPlayButton() {
        console.log("Checking for play buttons...");
        const messageElements = document.querySelectorAll('.css-fda5tg.epqbeww4');

        if (messageElements.length > 0) {
            const latestMessage = messageElements[messageElements.length - 1];
            const playButton = latestMessage.querySelector('button'); // Adjust this selector if necessary

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
} catch (error) {
    console.error('An error occurred:', error);
}


// Debounce function to limit the rate of play button clicks
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Updated clickLatestPlayButton with debounce
const debouncedClickLatestPlayButton = debounce(() => {
    console.log("Checking for play buttons...");
    const messageElements = document.querySelectorAll('.css-fda5tg.epqbeww4');

    if (messageElements.length > 0) {
        const latestMessage = messageElements[messageElements.length - 1];
        const playButton = latestMessage.querySelector('button'); // Adjust this selector if necessary

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
}, 300); // Adjust the debounce wait time as needed

// Use debounced function in observer callback
function observeNewElements(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Only element nodes
                    console.log('New element added:', node);
                    debouncedClickLatestPlayButton(); // Attempt to click the play button on new elements
                }
            });
        }
    }
}



