import sys

with open('chrome-extension/popup.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Add variable declarations
vars_to_add = '''
const flipHardStopLoss = document.getElementById('flip-hard-stop-loss');
const flipHardStopTarget = document.getElementById('flip-hard-stop-target');
const flipNetProfitVal = document.getElementById('flip-net-profit');
const flipActiveBetVal = document.getElementById('flip-active-bet');
'''
js = js.replace("const flipBotResetBtn = document.getElementById('flip-bot-reset-btn');", "const flipBotResetBtn = document.getElementById('flip-bot-reset-btn');\n" + vars_to_add)

# 2. Add chrome.storage.local.get keys
js = js.replace(", 'flipLossPauseTarget', 'flipLossPauseMins', 'flipBotState']", ", 'flipLossPauseTarget', 'flipLossPauseMins', 'flipHardStopLoss', 'flipHardStopTarget', 'flipBotState']")

# 3. Add populate values on load
vals_to_add = '''
    if (result.flipHardStopLoss !== undefined) flipHardStopLoss.value = result.flipHardStopLoss;
    if (result.flipHardStopTarget !== undefined) flipHardStopTarget.value = result.flipHardStopTarget;

    const fbp = fbState.balance - fInitBal;
    flipNetProfitVal.textContent = (fbp >= 0 ? '+' : '') + '₹' + Math.floor(fbp);
    flipNetProfitVal.style.color = fbp >= 0 ? '#34d399' : '#ef4444';
    
    if (fbState.permanentlyStopped) {
      flipActiveBetVal.textContent = "STOPPED (Hard Limit Reached)";
      flipActiveBetVal.style.color = "#ef4444";
    } else if (fbState.pauseRemaining > 0) {
      flipActiveBetVal.textContent = `PAUSED (${fbState.pauseRemaining} draws left)`;
      flipActiveBetVal.style.color = "#f43f5e";
    } else if (fbState.lastBetPlaced && fbState.lastBetAmount) {
      flipActiveBetVal.textContent = `Betting ₹${fbState.lastBetAmount} on ${fbState.lastBetPlaced}`;
      flipActiveBetVal.style.color = "#fbbf24";
    } else {
      flipActiveBetVal.textContent = "None";
      flipActiveBetVal.style.color = "#64748b";
    }
'''
js = js.replace("flipCountVal.textContent = fbState.flips || 0;", "flipCountVal.textContent = fbState.flips || 0;\n" + vals_to_add)

# 4. Add event listeners
listeners = '''
  flipHardStopLoss.addEventListener('change', (e) => chrome.storage.local.set({ flipHardStopLoss: Number(e.target.value) }));
  flipHardStopTarget.addEventListener('change', (e) => chrome.storage.local.set({ flipHardStopTarget: Number(e.target.value) }));
'''
js = js.replace("flipLossPauseMins.addEventListener('change', (e) => chrome.storage.local.set({ flipLossPauseMins: Number(e.target.value) }));", "flipLossPauseMins.addEventListener('change', (e) => chrome.storage.local.set({ flipLossPauseMins: Number(e.target.value) }));\n" + listeners)

with open('chrome-extension/popup.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("popup.js updated!")
