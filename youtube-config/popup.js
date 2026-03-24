const homeCheckBox = document.getElementById("homeShortsCheckBox");
const watchShortsCheckBox = document.getElementById("watchShortsCheckBox");
const watchDescriptionCheckBox = document.getElementById("watchDescriptionCheckBox");

// Load saved state
browser.storage.local.get(SETTINGS_IDS).then((result) => {
    homeCheckBox.checked = result.homeShortsCheckBox ?? true;
    watchShortsCheckBox.checked = result.watchShortsCheckBox ?? true;
    watchDescriptionCheckBox.checked = result.watchDescriptionCheckBox ?? true;
});

// Save on change
homeCheckBox.addEventListener("change", () => {
    browser.storage.local.set({ homeShortsCheckBox: homeCheckBox.checked });
});

watchShortsCheckBox.addEventListener("change", () => {
    browser.storage.local.set({ watchShortsCheckBox: watchShortsCheckBox.checked });
});

watchDescriptionCheckBox.addEventListener("change", () => { 
    browser.storage.local.set({ watchDescriptionCheckBox: watchDescriptionCheckBox.checked })
})