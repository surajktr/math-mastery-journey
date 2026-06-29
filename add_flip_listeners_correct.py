import sys

with open('chrome-extension/popup.js', 'r', encoding='utf-8') as f:
    js = f.read()

listeners = '''

// --- Flip Bot Event Listeners ---
if (flipBotToggle) flipBotToggle.addEventListener('change', (e) => chrome.storage.local.set({ flipBotEnabled: e.target.checked }));
if (flipBotSequence) flipBotSequence.addEventListener('change', (e) => chrome.storage.local.set({ flipBotSequence: e.target.value.trim() }));
if (flipBotInitialBalance) flipBotInitialBalance.addEventListener('change', (e) => chrome.storage.local.set({ flipBotInitialBalance: Number(e.target.value) }));
if (flipBotSaveBalanceBtn) {
  flipBotSaveBalanceBtn.addEventListener('click', () => {
    chrome.storage.local.set({ flipBotInitialBalance: Number(flipBotInitialBalance.value) }, () => {
      chrome.storage.local.set({ flipBotResetRequested: true });
    });
  });
}
if (flipBotSystem) flipBotSystem.addEventListener('change', (e) => chrome.storage.local.set({ flipBotSystem: e.target.value }));
if (flipBotDirection) flipBotDirection.addEventListener('change', (e) => chrome.storage.local.set({ flipBotDirection: e.target.value }));
if (flipBotRule) flipBotRule.addEventListener('change', (e) => chrome.storage.local.set({ flipBotRule: e.target.value }));
if (flipProfitTarget) flipProfitTarget.addEventListener('change', (e) => chrome.storage.local.set({ flipProfitTarget: Number(e.target.value) }));
if (flipProfitPause) flipProfitPause.addEventListener('change', (e) => chrome.storage.local.set({ flipProfitPause: Number(e.target.value) }));
if (flipLossPauseTarget) flipLossPauseTarget.addEventListener('change', (e) => chrome.storage.local.set({ flipLossPauseTarget: Number(e.target.value) }));
if (flipLossPauseMins) flipLossPauseMins.addEventListener('change', (e) => chrome.storage.local.set({ flipLossPauseMins: Number(e.target.value) }));
if (flipHardStopLoss) flipHardStopLoss.addEventListener('change', (e) => chrome.storage.local.set({ flipHardStopLoss: Number(e.target.value) }));
if (flipHardStopTarget) flipHardStopTarget.addEventListener('change', (e) => chrome.storage.local.set({ flipHardStopTarget: Number(e.target.value) }));
if (flipBotResetBtn) flipBotResetBtn.addEventListener('click', () => chrome.storage.local.set({ flipBotResetRequested: true }));

'''
js = js.replace("// Boot", listeners + "\n// Boot")

with open('chrome-extension/popup.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("popup.js Flip Bot Event Listeners added correctly!")
