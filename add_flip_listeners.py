import sys

with open('chrome-extension/popup.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Add Flip Bot variables to defaultSettings keys array in loadSettings
# Find: const defaultSettings = { ... }
# Actually defaultSettings is an object on line 16.
defaults_to_add = '''  flipBotEnabled: false,
  flipBotSequence: '50, 100, 300',
  flipBotInitialBalance: 3000,
  flipBotSystem: 'paroli',
  flipBotDirection: 'opposite',
  flipBotRule: 'patient',
  flipProfitTarget: 100,
  flipProfitPause: 4,
  flipLossPauseTarget: 0,
  flipLossPauseMins: 0,
  flipHardStopLoss: 0,
  flipHardStopTarget: 0,'''
js = js.replace("  dualBotTargetBalance: 0,", "  dualBotTargetBalance: 0,\n" + defaults_to_add)

# 2. Add loading logic in initializeSettings
init_logic = '''
  // Flip Bot Settings Load
  if (flipBotToggle) flipBotToggle.checked = settings.flipBotEnabled || false;
  if (flipBotSequence) flipBotSequence.value = settings.flipBotSequence || '50, 100, 300';
  if (flipBotInitialBalance) flipBotInitialBalance.value = settings.flipBotInitialBalance !== undefined ? settings.flipBotInitialBalance : 3000;
  if (flipBotSystem) flipBotSystem.value = settings.flipBotSystem || 'paroli';
  if (flipBotDirection) flipBotDirection.value = settings.flipBotDirection || 'opposite';
  if (flipBotRule) flipBotRule.value = settings.flipBotRule || 'patient';
  if (flipProfitTarget) flipProfitTarget.value = settings.flipProfitTarget !== undefined ? settings.flipProfitTarget : 100;
  if (flipProfitPause) flipProfitPause.value = settings.flipProfitPause !== undefined ? settings.flipProfitPause : 4;
  if (flipLossPauseTarget) flipLossPauseTarget.value = settings.flipLossPauseTarget !== undefined ? settings.flipLossPauseTarget : 0;
  if (flipLossPauseMins) flipLossPauseMins.value = settings.flipLossPauseMins !== undefined ? settings.flipLossPauseMins : 0;
  if (flipHardStopLoss) flipHardStopLoss.value = settings.flipHardStopLoss !== undefined ? settings.flipHardStopLoss : 0;
  if (flipHardStopTarget) flipHardStopTarget.value = settings.flipHardStopTarget !== undefined ? settings.flipHardStopTarget : 0;
'''
js = js.replace("  dualTargetBalanceInput.value = settings.dualBotTargetBalance !== undefined ? settings.dualBotTargetBalance : 0;", "  dualTargetBalanceInput.value = settings.dualBotTargetBalance !== undefined ? settings.dualBotTargetBalance : 0;\n" + init_logic)

# 3. Add Event Listeners for Flip Bot Inputs
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
js = js.replace("// Start application", listeners + "// Start application")

with open('chrome-extension/popup.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("popup.js Flip Bot Event Listeners and State Sync added!")
