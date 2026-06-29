import sys

with open('chrome-extension/popup.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Add flipBotEnabled to defaultSettings keys
js = js.replace("'flipBotState']", "'flipBotState', 'flipBotEnabled']")

# 2. Add flipBotToggle.checked to initializeSettings
init = '''
  if (flipBotToggle) flipBotToggle.checked = settings.flipBotEnabled || false;
  if (flipBotSequence) flipBotSequence.value = settings.flipBotSequence || '50, 100, 300';
'''
js = js.replace("  if (flipBotSequence) flipBotSequence.value = settings.flipBotSequence || '50, 100, 300';", init)

# 3. Add event listener for toggle
listeners = '''
  if (flipBotToggle) flipBotToggle.addEventListener('change', (e) => chrome.storage.local.set({ flipBotEnabled: e.target.checked }));
  if (flipBotSequence) flipBotSequence.addEventListener('change', (e) => chrome.storage.local.set({ flipBotSequence: e.target.value.trim() }));
'''
js = js.replace("  if (flipBotSequence) flipBotSequence.addEventListener('change', (e) => chrome.storage.local.set({ flipBotSequence: e.target.value.trim() }));", listeners)

with open('chrome-extension/popup.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("popup.js flip toggle linked!")
