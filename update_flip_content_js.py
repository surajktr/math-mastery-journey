import sys

with open('chrome-extension/content.js', 'r', encoding='utf-8') as f:
    cjs = f.read()

# 1. Add Hard Stop defaults
defaults = '''
    flipProfitPause: 4,
    flipLossPauseTarget: 0,
    flipLossPauseMins: 0,
    flipHardStopLoss: 0,
    flipHardStopTarget: 0,
'''
cjs = cjs.replace("    flipLossPauseTarget: 0,\n    flipLossPauseMins: 0,\n", defaults)

# 2. Add permanently stopped to state initializer
init = "const fState = settings.flipBotState || { balance: fInitBal, checkpoint: fInitBal, direction: settings.flipBotDirection || 'opposite', step: 0, flips: 0, pauseRemaining: 0, window: [], consecSeqLosses: 0, lastBetPlaced: null, lastBetAmount: 0, permanentlyStopped: false };"
cjs = cjs.replace("const fState = settings.flipBotState || { balance: fInitBal, checkpoint: fInitBal, direction: settings.flipBotDirection || 'opposite', step: 0, flips: 0, pauseRemaining: 0, window: [], consecSeqLosses: 0, lastBetPlaced: null };", init)

reset_logic = '''
      fState.lastBetPlaced = null;
      fState.lastBetAmount = 0;
      fState.permanentlyStopped = false;
'''
cjs = cjs.replace("      fState.lastBetPlaced = null;", reset_logic)

# 3. Add evaluateFlipBotMaster logic updates
# Replace:
#   if (state.globalPause > 0) return;
#   if (state.pauseRemaining > 0) { ... }
logic_start = '''
function evaluateFlipBotMaster(state, settings, latestDraw, betsToTrigger, updatedHistory) {
  if (state.permanentlyStopped) return;
  if (state.globalPause > 0) return;
  
  // Check Hard Stops BEFORE doing anything
  if (settings.flipHardStopLoss > 0 && state.balance <= settings.flipHardStopLoss) {
      logEvent(`[Flip Bot] STOPPED: Balance ₹${state.balance} hit Hard Stop Loss (≤ ₹${settings.flipHardStopLoss})!`);
      state.permanentlyStopped = true;
      state.lastBetPlaced = null;
      return;
  }
  if (settings.flipHardStopTarget > 0 && state.balance >= settings.flipHardStopTarget) {
      logEvent(`[Flip Bot] STOPPED: Balance ₹${state.balance} hit Hard Target (≥ ₹${settings.flipHardStopTarget})!`);
      state.permanentlyStopped = true;
      state.lastBetPlaced = null;
      return;
  }

  if (state.pauseRemaining > 0) {
'''
cjs = cjs.replace("function evaluateFlipBotMaster(state, settings, latestDraw, betsToTrigger, updatedHistory) {\n  if (state.globalPause > 0) return;\n  if (state.pauseRemaining > 0) {", logic_start)

# Add saving the amount to the state when placing next bet
end_logic = '''
  const nextStake = seq[state.step || 0];

  betsToTrigger.push({ type: nextBetOn, amount: nextStake, label: 'Flip Bot' });
  state.lastBetPlaced = nextBetOn;
  state.lastBetAmount = nextStake;
}
'''
cjs = cjs.replace("  const nextStake = seq[state.step || 0];\n\n  betsToTrigger.push({ type: nextBetOn, amount: nextStake, label: 'Flip Bot' });\n  state.lastBetPlaced = nextBetOn;\n}", end_logic)

with open('chrome-extension/content.js', 'w', encoding='utf-8') as f:
    f.write(cjs)
print("content.js updated!")
