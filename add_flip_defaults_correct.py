import sys

with open('chrome-extension/popup.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add to defaultSettings
defaults_to_add = '''
  flipBotEnabled: false,
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
  flipHardStopTarget: 0,
'''
if "flipBotEnabled: false," not in js:
    js = js.replace("  dualBotTargetBalance: 0,", "  dualBotTargetBalance: 0,\n" + defaults_to_add)

# Add to initializeSettings
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
if "// Flip Bot Settings Load" not in js:
    js = js.replace("  dualTargetBalanceInput.value = settings.dualBotTargetBalance !== undefined ? settings.dualBotTargetBalance : 0;", "  dualTargetBalanceInput.value = settings.dualBotTargetBalance !== undefined ? settings.dualBotTargetBalance : 0;\n" + init_logic)

with open('chrome-extension/popup.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("popup.js Flip Bot defaults added correctly!")
