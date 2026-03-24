const homeCheckbox = document.getElementById("homeShorts");
const watchShortsCheckbox = document.getElementById("watchShorts");
const watchDescriptionCheckBox = document.getElementById("watchDescription");

// Load saved state
browser.storage.local.get(SETTINGS_IDS).then((result) => {
    homeCheckbox.checked = result.homeShorts ?? true;
    watchShortsCheckbox.checked = result.watchShorts ?? true;
    watchDescriptionCheckBox.checked = result.watchDescription ?? true;
});

// Save on change
homeCheckbox.addEventListener("change", () => {
    browser.storage.local.set({ homeShorts: homeCheckbox.checked });
});

watchShortsCheckbox.addEventListener("change", () => {
    browser.storage.local.set({ watchShorts: watchShortsCheckbox.checked });
});

watchDescriptionCheckBox.addEventListener("change", () => { 
    browser.storage.local.set({ watchDescription: watchDescriptionCheckBox.checked })
})