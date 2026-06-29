import sys

with open('chrome-extension/popup.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

flip_vars_html = '''
const flipBotTabBtn = document.getElementById('flip-bot-tab');
const flipBotPanel = document.getElementById('flip-bot-panel');
const flipBotToggle = document.getElementById('flip-bot-toggle');
const flipBotSequence = document.getElementById('flip-bot-sequence');
const flipBotInitialBalance = document.getElementById('flip-bot-initial-balance');
const flipBotSaveBalanceBtn = document.getElementById('flip-bot-save-balance');
const flipBotSystem = document.getElementById('flip-bot-system');
const flipBotDirection = document.getElementById('flip-bot-direction');
const flipBotRule = document.getElementById('flip-bot-rule');
const flipProfitTarget = document.getElementById('flip-profit-target');
const flipProfitPause = document.getElementById('flip-profit-pause');
const flipLossPauseTarget = document.getElementById('flip-loss-pause-target');
const flipLossPauseMins = document.getElementById('flip-loss-pause-mins');
const flipBotResetBtn = document.getElementById('flip-bot-reset-btn');

const flipBalanceVal = document.getElementById('flip-balance');
const flipCheckpointVal = document.getElementById('flip-checkpoint');
const flipActiveDirectionVal = document.getElementById('flip-active-direction');
const flipActiveStepVal = document.getElementById('flip-active-step');
const flipCountVal = document.getElementById('flip-count');
'''

new_lines = []
for line in lines:
    new_lines.append(line)
    if "const dualLogsBox = document.getElementById('dual-logs-box');" in line:
        new_lines.append(flip_vars_html)
        
    if "currentActiveId = 'dual-bot';" in line:
        new_lines.append("  } else if (tabId === 'flip-bot') {\n")
        new_lines.append("    currentActiveId = 'flip-bot';\n")

    if "} else if (currentActiveId === 'dual-bot') {" in line:
        new_lines.append("  } else if (currentActiveId === 'flip-bot') {\n")
        new_lines.append("    flipBotPanel.style.display = 'block';\n")
        
    if "if (currentActiveId !== 'manual-play' && currentActiveId !== 'meta-bot' && currentActiveId !== 'dual-bot') {" in line:
        new_lines.pop()
        new_lines.append("  if (currentActiveId !== 'manual-play' && currentActiveId !== 'meta-bot' && currentActiveId !== 'dual-bot' && currentActiveId !== 'flip-bot') {\n")
        
    if "dualBotTabBtn.classList.toggle('active', currentActiveId === 'dual-bot');" in line:
        new_lines.append("  if(flipBotTabBtn) flipBotTabBtn.classList.toggle('active', currentActiveId === 'flip-bot');\n")
        
    if "if (currentActiveId === 'manual-play' || currentActiveId === 'meta-bot' || currentActiveId === 'dual-bot') return;" in line:
        new_lines.pop()
        new_lines.append("  if (currentActiveId === 'manual-play' || currentActiveId === 'meta-bot' || currentActiveId === 'dual-bot' || currentActiveId === 'flip-bot') return;\n")

    if "dualBotTabBtn.addEventListener('click', () => switchTab('dual-bot'));" in line:
        new_lines.append("  if(flipBotTabBtn) flipBotTabBtn.addEventListener('click', () => switchTab('flip-bot'));\n")

    if "chrome.storage.local.get(['globalSettings'" in line:
        new_lines.pop()
        new_lines.append("  chrome.storage.local.get(['globalSettings', 'dualBotEnabled', 'dualBotSequence', 'dualBotInitialBalance', 'dualBotState', 'dualProfitTarget', 'dualProfitPause', 'dualLossLimit', 'dualLossPause', 'dualTargetBalance', 'manualPlayBalance', 'manualPlayState', 'flipBotEnabled', 'flipBotSequence', 'flipBotInitialBalance', 'flipBotSystem', 'flipBotDirection', 'flipBotRule', 'flipProfitTarget', 'flipProfitPause', 'flipLossPauseTarget', 'flipLossPauseMins', 'flipBotState'], (result) => {\n")
        
    if "if (result.dualTargetBalance !== undefined) dualTargetBalanceInput.value = result.dualTargetBalance;" in line:
        new_lines.append('''
    if (result.flipBotEnabled !== undefined) flipBotToggle.checked = result.flipBotEnabled;
    if (result.flipBotSequence !== undefined) flipBotSequence.value = result.flipBotSequence;
    if (result.flipBotInitialBalance !== undefined) flipBotInitialBalance.value = result.flipBotInitialBalance;
    if (result.flipBotSystem !== undefined) flipBotSystem.value = result.flipBotSystem;
    if (result.flipBotDirection !== undefined) flipBotDirection.value = result.flipBotDirection;
    if (result.flipBotRule !== undefined) flipBotRule.value = result.flipBotRule;
    if (result.flipProfitTarget !== undefined) flipProfitTarget.value = result.flipProfitTarget;
    if (result.flipProfitPause !== undefined) flipProfitPause.value = result.flipProfitPause;
    if (result.flipLossPauseTarget !== undefined) flipLossPauseTarget.value = result.flipLossPauseTarget;
    if (result.flipLossPauseMins !== undefined) flipLossPauseMins.value = result.flipLossPauseMins;

    const fbState = result.flipBotState || { balance: Number(flipBotInitialBalance.value), checkpoint: Number(flipBotInitialBalance.value), direction: flipBotDirection.value, step: 0, flips: 0 };
    flipBalanceVal.textContent = '₹' + Math.floor(fbState.balance);
    flipCheckpointVal.textContent = '₹' + Math.floor(fbState.checkpoint);
    flipActiveDirectionVal.textContent = (fbState.direction || 'Opposite').charAt(0).toUpperCase() + (fbState.direction || 'Opposite').slice(1);
    flipActiveStepVal.textContent = 'Step ' + ((fbState.step || 0) + 1);
    flipCountVal.textContent = fbState.flips || 0;
''')

    if "function setupEventListeners() {" in line:
        new_lines.append('''
  flipBotToggle.addEventListener('change', (e) => chrome.storage.local.set({ flipBotEnabled: e.target.checked }));
  flipBotSequence.addEventListener('change', (e) => chrome.storage.local.set({ flipBotSequence: e.target.value }));
  flipBotSystem.addEventListener('change', (e) => chrome.storage.local.set({ flipBotSystem: e.target.value }));
  flipBotDirection.addEventListener('change', (e) => chrome.storage.local.set({ flipBotDirection: e.target.value }));
  flipBotRule.addEventListener('change', (e) => chrome.storage.local.set({ flipBotRule: e.target.value }));
  flipProfitTarget.addEventListener('change', (e) => chrome.storage.local.set({ flipProfitTarget: Number(e.target.value) }));
  flipProfitPause.addEventListener('change', (e) => chrome.storage.local.set({ flipProfitPause: Number(e.target.value) }));
  flipLossPauseTarget.addEventListener('change', (e) => chrome.storage.local.set({ flipLossPauseTarget: Number(e.target.value) }));
  flipLossPauseMins.addEventListener('change', (e) => chrome.storage.local.set({ flipLossPauseMins: Number(e.target.value) }));

  flipBotSaveBalanceBtn.addEventListener('click', () => {
    const v = Number(flipBotInitialBalance.value);
    chrome.storage.local.set({ flipBotInitialBalance: v, flipBotState: null, flipBotResetRequested: true }, () => loadSettings());
  });
  flipBotResetBtn.addEventListener('click', () => {
    chrome.storage.local.set({ flipBotState: null, flipBotResetRequested: true }, () => loadSettings());
  });
''')

with open('chrome-extension/popup.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print('popup.js updated successfully!')
