// ==UserScript==
// @name         Site Select All
// @namespace    DDI Jon
// @version      1.3
// @description  Select all sites under the locations
// @author       You
// @match        https://client.restaurantpos.spoton.com/b/
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Function to click visible checkboxes
    function clickVisibleCheckboxes() {
        const checkboxes = document.querySelectorAll('div.sc-gEvEer.eHyqEP[data-cy="icon-checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.click();
        });
        console.log(`Clicked ${checkboxes.length} visible checkboxes.`);
    }

    // Function to scroll and click checkboxes
    function scrollAndClickCheckboxes() {
        // Select the scrolling container of the checkboxes
        const scrollContainer = document.querySelector('div[aria-label="grid"][aria-readonly="true"].ReactVirtualized__Grid.ReactVirtualized__List.sc-ibQAlb.dIqCbV');

        if (!scrollContainer) {
            console.error("Scrolling container not found!");
            return;
        }

        let lastScrollTop = scrollContainer.scrollTop;
        const interval = setInterval(() => {
            // Click visible checkboxes before each scroll
            clickVisibleCheckboxes();

            // Scroll down a bit
            scrollContainer.scrollTop += 100;

            // Check if reached the bottom
            if (scrollContainer.scrollTop === lastScrollTop) {
                clearInterval(interval);
                console.log("Reached the end of the list.");
            } else {
                lastScrollTop = scrollContainer.scrollTop;
            }
        }, 250); // Adjust scrolling interval as needed
    }

    // Function to click all checkboxes
    function clickAllCheckboxes() {
        const checkboxes = document.querySelectorAll('div.sc-gEvEer.eHyqEP[data-cy="icon-checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.click();
        });
        console.log(`Clicked ${checkboxes.length} checkboxes.`);
    }

    // Create and style button
    const button = document.createElement("button");
    button.textContent = "Click Checkboxes";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "10000";
    button.style.padding = "10px";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.style.cursor = "pointer";
    button.style.display = "none"; // Initially hide the button
    document.body.appendChild(button);

    // Add event listener to button
      button.addEventListener("click", scrollAndClickCheckboxes);

    // Function to show or hide button based on the presence of the modal
    function toggleButtonVisibility() {
        const modal = document.querySelector('.ReactModal__Content.ReactModal__Content--after-open.sc-fXSgeo.dGOmlZ');
        button.style.display = modal ? "block" : "none";
    }

    // Create a MutationObserver to observe DOM changes
    const observer = new MutationObserver(toggleButtonVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial check
    toggleButtonVisibility();
})();
