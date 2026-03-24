function removeWatchPageShorts() { 
    if (document.getElementById("watch-shorts-style")) return;

    const style = document.createElement("style"); 
    style.id = "watch-shorts-style";
    style.textContent = `
        ytd-reel-shelf-renderer
         {
            display: none !important;
        }`;
    document.head.appendChild(style);
}

function removeWatchPageDescriptionBloat() {
    if (document.getElementById("watch-description-style")) return;

    const style = document.createElement("style");
    style.id = "watch-description-style";
    style.textContent = `
        ytd-watch-metadata { 
            display: none !important; 
        }`;
    
        document.head.appendChild(style);

}

function removeHomePageShorts() { 
    if (document.getElementById("home-shorts-style")) return;

    const style = document.createElement("style"); 
    style.id = "home-shorts-style";
    style.textContent = `
        ytd-rich-section-renderer,
        a[href="/shorts/"],
        a[aria-label="Shorts"] { 
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}




function handleWatchPage(shortsDisabled, descriptionBloatDisabled) {
    const urlPath = window.location.pathname;

    if (urlPath.startsWith("/watch")) {
        shortsDisabled ? removeWatchPageShorts() : document.getElementById("watch-shorts-style")?.remove();
        descriptionBloatDisabled
            ? removeWatchPageDescriptionBloat()
            : document.getElementById("watch-description-style")?.remove();
    }
}

function handleHomePage(enabled) { 
    const urlPath = window.location.pathname;

    if (!enabled) {
        document.getElementById("home-shorts-style")?.remove();
        return;
    }

    if (urlPath === "/") { 
        removeHomePageShorts();
    }
}

function handleAllFeatures(settings) {
    handleWatchPage(settings.watchShorts ?? true, settings.watchDescription ?? true);
    handleHomePage(settings.homeShorts ?? true);
}

// Initial run
browser.storage.local.get(SETTINGS_IDS)
    .then(handleAllFeatures);

// React to toggle changes
browser.storage.onChanged.addListener(() => {
    browser.storage.local.get(SETTINGS_IDS)
        .then(handleAllFeatures);
});

// Handle YouTube SPA navigation
let timeout;

const observer = new MutationObserver(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        browser.storage.local.get(SETTINGS_IDS)
            .then(handleAllFeatures);
    }, 100);
});

observer.observe(document.body, { childList: true, subtree: true });