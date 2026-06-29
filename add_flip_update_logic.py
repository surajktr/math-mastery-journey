import sys

with open('chrome-extension/popup.js', 'r', encoding='utf-8') as f:
    js = f.read()

flip_sync_logic = '''
    // Sync Flip Bot Status
    const fInitBal = parseFloat(flipBotInitialBalanceInput.value) || 3000;
    const fbState = data.flipBotState || { balance: fInitBal, checkpoint: fInitBal, direction: flipBotDirectionSelect.value || 'opposite', step: 0, flips: 0, pauseRemaining: 0, permanentlyStopped: false };
    
    if (flipBalanceVal) flipBalanceVal.textContent = `₹${Number(fbState.balance).toFixed(2)}`;
    if (flipCheckpointVal) flipCheckpointVal.textContent = `₹${Number(fbState.checkpoint).toFixed(2)}`;
    if (flipActiveDirVal) flipActiveDirVal.textContent = (fbState.direction || 'opposite').charAt(0).toUpperCase() + (fbState.direction || 'opposite').slice(1);
    if (flipActiveStepVal) flipActiveStepVal.textContent = `Step ${fbState.step + 1}`;
    if (flipCountVal) {
      flipCountVal.textContent = fbState.flips || 0;
      
      // Calculate Net Profit
      const fbp = fbState.balance - fInitBal;
      if (flipNetProfitVal) {
        flipNetProfitVal.textContent = (fbp >= 0 ? '+' : '') + '₹' + Math.floor(fbp);
        flipNetProfitVal.style.color = fbp >= 0 ? '#34d399' : '#ef4444';
      }
      
      // Render Active Bet State
      if (flipActiveBetVal) {
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
      }
    }
'''

js = js.replace("    // Update Combined Bot Balance", flip_sync_logic + "\n    // Update Combined Bot Balance")

with open('chrome-extension/popup.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("popup.js flip sync logic added!")
