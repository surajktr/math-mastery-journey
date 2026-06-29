import sys

with open('chrome-extension/content.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

flip_bot_logic = '''
// =====================================================================
// FLIP BOT MASTER LOGIC
// =====================================================================
function evaluateFlipBotMaster(state, settings, latestDraw, betsToTrigger, updatedHistory) {
  if (state.globalPause > 0) return;
  if (state.pauseRemaining > 0) {
    state.pauseRemaining--;
    logEvent(`[Flip Bot] Paused. Remaining draws: ${state.pauseRemaining}`);
    return;
  }

  const seq = parseCustomSequence(settings.flipBotSequence);
  if (!seq || seq.length === 0) return;

  const sv = latestDraw.streakValue;
  if (latestDraw.streakLength < 1) return;

  const targetDir = state.direction || settings.flipBotDirection || 'opposite';
  const betOn = targetDir === 'opposite' ? (sv === 'Big' ? 'Small' : 'Big') : sv;

  const step = state.step || 0;
  if (step >= seq.length) return; // Should not happen

  const actual = latestDraw.result;
  const won = (actual === state.lastBetPlaced);
  
  if (state.lastBetPlaced) {
    const stake = seq[step];
    const pnl = won ? stake : -stake;
    state.balance += pnl;
    
    // Add to window
    if (!state.window) state.window = [];
    state.window.push({ won, stake });

    if (won) {
      logEvent(`[Flip Bot] Won ₹${stake}. Balance: ₹${state.balance}`);
      
      if (settings.flipBotSystem === 'paroli') {
        state.step++;
        if (state.step >= seq.length) {
            state.step = 0; // Sequence win
            state.consecSeqLosses = 0;
        }
      } else {
        state.step = 0; // Martingale win
        state.consecSeqLosses = 0;
      }
    } else {
      logEvent(`[Flip Bot] Lost ₹${stake}. Balance: ₹${state.balance}`);
      
      // Loss pause check
      if (settings.flipLossPauseTarget > 0 && stake >= settings.flipLossPauseTarget) {
          logEvent(`[Flip Bot] Loss ₹${stake} >= ₹${settings.flipLossPauseTarget}. Triggering Loss Pause.`);
          state.pauseRemaining = (settings.flipLossPauseMins || 5) * 1;
      }

      if (settings.flipBotSystem === 'paroli') {
        state.step = 0;
        state.consecSeqLosses = (state.consecSeqLosses || 0) + 1;
      } else {
        state.step++;
        if (state.step >= seq.length) {
            state.step = 0;
            state.consecSeqLosses = (state.consecSeqLosses || 0) + 1;
        }
      }
    }

    // Flip Logic Check
    let shouldFlip = false;
    if (settings.flipBotRule === 'sliding') {
        const recent = state.window.slice(-6);
        const losses = recent.filter(r => !r.won).length;
        if (losses >= 3) {
            shouldFlip = true;
            state.window = []; // Reset window on flip
        }
    } else if (settings.flipBotRule === 'patient') {
        if (state.consecSeqLosses >= 3) {
            shouldFlip = true;
            state.consecSeqLosses = 0;
        }
    }

    if (shouldFlip) {
        state.direction = (state.direction === 'opposite') ? 'same' : 'opposite';
        state.flips = (state.flips || 0) + 1;
        state.step = 0;
        state.checkpoint = state.balance;
        logEvent(`[Flip Bot] FLIP TRIGGERED! New Direction: ${state.direction.toUpperCase()}`);
    } else if (settings.flipProfitTarget > 0 && (state.balance - state.checkpoint >= settings.flipProfitTarget)) {
        logEvent(`[Flip Bot] Take Profit Hit! (+₹${state.balance - state.checkpoint}). Pausing for ${settings.flipProfitPause} mins.`);
        state.pauseRemaining = (settings.flipProfitPause || 0) * 1;
        state.checkpoint = state.balance;
    }
  }

  // Determine next bet
  if (state.pauseRemaining > 0) {
      state.lastBetPlaced = null;
      return;
  }

  const nextDir = state.direction || settings.flipBotDirection || 'opposite';
  const nextBetOn = nextDir === 'opposite' ? (sv === 'Big' ? 'Small' : 'Big') : sv;
  const nextStake = seq[state.step || 0];

  betsToTrigger.push({ type: nextBetOn, amount: nextStake, label: 'Flip Bot' });
  state.lastBetPlaced = nextBetOn;
}

'''

new_lines = []
for line in lines:
    new_lines.append(line)
    if "function evaluateDualBotMaster(" in line:
        new_lines.insert(-1, flip_bot_logic)
        
    if "dualBotEnabled: false," in line:
        new_lines.append("    flipBotEnabled: false,\n")
        new_lines.append("    flipBotSequence: '30, 100, 300',\n")
        new_lines.append("    flipBotInitialBalance: 500,\n")
        new_lines.append("    flipBotSystem: 'martingale',\n")
        new_lines.append("    flipBotDirection: 'opposite',\n")
        new_lines.append("    flipBotRule: 'sliding',\n")
        new_lines.append("    flipProfitTarget: 50,\n")
        new_lines.append("    flipProfitPause: 4,\n")
        new_lines.append("    flipLossPauseTarget: 100,\n")
        new_lines.append("    flipLossPauseMins: 5,\n")
        new_lines.append("    flipBotState: null,\n")
        new_lines.append("    flipBotResetRequested: false,\n")
        
    if "const dState = settings.dualBotState ||" in line:
        new_lines.append("    const fInitBal = settings.flipBotInitialBalance || 500;\n")
        new_lines.append("    const fState = settings.flipBotState || { balance: fInitBal, checkpoint: fInitBal, direction: settings.flipBotDirection || 'opposite', step: 0, flips: 0, pauseRemaining: 0, window: [], consecSeqLosses: 0, lastBetPlaced: null };\n")
        
    if "if (settings.dualBotResetRequested) {" in line:
        new_lines.append('''
    if (settings.flipBotResetRequested) {
      fState.balance = fInitBal;
      fState.checkpoint = fInitBal;
      fState.direction = settings.flipBotDirection || 'opposite';
      fState.step = 0;
      fState.flips = 0;
      fState.pauseRemaining = 0;
      fState.window = [];
      fState.consecSeqLosses = 0;
      fState.lastBetPlaced = null;
      chrome.storage.local.set({ flipBotResetRequested: false });
      logEvent("[Flip Bot] Reset requested and processed.");
    }
''')

    if "if (settings.dualBotEnabled && !isPausedGlobally) {" in line:
        new_lines.append('''
    if (settings.flipBotEnabled && !isPausedGlobally) {
      evaluateFlipBotMaster(fState, settings, latestDraw, betsToTrigger, updatedHistory);
    }
''')

    if "dualBotState: dState," in line:
        new_lines.append("      flipBotState: fState,\n")

with open('chrome-extension/content.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print('content.js updated successfully!')
