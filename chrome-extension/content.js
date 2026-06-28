// ponytail: minimal, robust, dual-mode (real/simulated) betting engine with Martingale and Paroli systems.

let observedElement = null;
let observer = null;
let evalTimer = null; // ponytail: debounce guard for MutationObserver

// Safe BigInt period incrementer
function incrementPeriod(periodStr) {
  try {
    const val = BigInt(periodStr);
    return (val + 1n).toString();
  } catch (e) {
    return periodStr.replace(/\d+$/, match => {
      const len = match.length;
      const incremented = (BigInt(match) + 1n).toString();
      return incremented.padStart(len, '0');
    });
  }
}

// Parse custom staking sequence string
function parseCustomSequence(str) {
  if (!str) return [];
  return str.split(',')
    .map(x => parseFloat(x.trim()))
    .filter(x => !isNaN(x) && x > 0);
}

// Custom Web Audio synthesizer chime alerts
function playSound(type) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const playTone = (freq, duration, start, waveType = 'sine') => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = waveType;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
      osc.start(start);
      osc.stop(start + duration);
    };

    const now = audioCtx.currentTime;
    if (type === 'win') {
      playTone(523.25, 0.1, now); // C5
      playTone(659.25, 0.1, now + 0.1); // E5
      playTone(783.99, 0.1, now + 0.2); // G5
      playTone(1046.50, 0.25, now + 0.3); // C6
    } else if (type === 'loss') {
      playTone(220.00, 0.15, now); // A3
      playTone(196.00, 0.25, now + 0.15); // G3
    } else if (type === 'success') {
      playTone(523.25, 0.15, now); // C5
      playTone(659.25, 0.2, now + 0.15); // E5
    } else if (type === 'error' || type === 'safety_stop') {
      playTone(150.00, 0.4, now, 'triangle');
    }
  } catch (e) {
    console.error('Audio error:', e);
  }
}

// ponytail: old async addLog removed — it raced with the synchronous engine
// and overwrote strategies with stale data. All logging now uses logToStrategySync.

// Global click queue to prevent collisions in Real Mode
let realBetQueue = [];
let processingQueue = false;

function processRealBetQueue() {
  if (processingQueue || realBetQueue.length === 0) return;
  processingQueue = true;
  const nextBet = realBetQueue.shift();
  
  const { target, quantity, settings, strategyId } = nextBet;
  const btnSelector = target === 'Big' ? settings.bigBtnSelector : settings.smallBtnSelector;
  const btn = document.querySelector(btnSelector);

  if (!btn) {
    addLog(`Error: Target button "${btnSelector}" not found.`, strategyId);
    if (settings.enableSound) playSound('error');
    processingQueue = false;
    processRealBetQueue();
    return;
  }

  addLog(`[REAL MODE] Clicking "${target}" button...`, strategyId);
  btn.click();

  setTimeout(() => {
    const input = document.querySelector(settings.popInputSelector);
    if (!input) {
      addLog(`Error: Popup input "${settings.popInputSelector}" not found.`, strategyId);
      if (settings.enableSound) playSound('error');
      processingQueue = false;
      processRealBetQueue();
      return;
    }

    addLog(`[REAL MODE] Setting Quantity to ${quantity}...`, strategyId);
    input.value = quantity;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));

    setTimeout(() => {
      const submitBtn = document.querySelector(settings.popBetSelector);
      if (!submitBtn) {
        addLog(`Error: Popup submit button "${settings.popBetSelector}" not found.`, strategyId);
        if (settings.enableSound) playSound('error');
        processingQueue = false;
        processRealBetQueue();
        return;
      }

      addLog(`[REAL MODE] Confirming bet...`, strategyId);
      submitBtn.click();
      if (settings.enableSound) playSound('success');
      
      // Let dialog close and state stabilize before next bet
      setTimeout(() => {
        processingQueue = false;
        processRealBetQueue();
      }, 1000);
    }, 200);
  }, 400);
}

function queueRealBet(target, quantity, settings, strategyId) {
  realBetQueue.push({ target, quantity, settings, strategyId });
  processRealBetQueue();
}

// Executes Simulated bet (Demo Mode)
function executeDemoBet(target, quantity, settings, strategyId) {
  if (settings.enableSound) playSound('success');
}

// Processes the bet trigger action
function triggerNewBet(target, quantity, settings, period, strategyId) {
  if (settings.betMode === 'demo') {
    executeDemoBet(target, quantity, settings, strategyId);
  } else {
    queueRealBet(target, quantity, settings, strategyId);
  }
}

// Synchronous strategy-specific logging helper
function logToStrategySync(strategy, message) {
  if (!strategy.logs) strategy.logs = [];
  const time = new Date().toLocaleTimeString();
  strategy.logs.unshift(`[${time}] ${message}`);
  if (strategy.logs.length > 25) strategy.logs.pop();
}

function evaluateDualBotMaster(state, settings, latestDraw, betsToTrigger, updatedHistory) {
  const now = Date.now();
  if (state.pauseUntil > now) return;

  const time = new Date().toLocaleTimeString();
  const seq = parseCustomSequence(settings.dualBotSequence);
  const sequence = seq.length > 0 ? seq : [10, 40, 160];
  const maxSteps = sequence.length;

  if (state.activeBet) {
    if (BigInt(latestDraw.period) >= BigInt(state.activeBet.period)) {
      const win = latestDraw.result === state.activeBet.target;
      const amount = state.activeBet.quantity;
      let seqWon = false, seqLost = false;

      if (win) {
        state.balance = Number((state.balance + (amount * 2)).toFixed(2));
        seqWon = true;
      } else {
        if (state.activeBet.step >= maxSteps) {
          seqLost = true;
        }
      }

      state.logs.unshift(`[${time}] [Bot ${state.activeBot}] Bet ₹${amount} on ${state.activeBet.target} -> ${win ? 'WIN' : 'LOSS'}`);
      if (state.logs.length > 30) state.logs.pop();

      if (seqWon) {
        state.activeBet = null;
        state.consecutiveLosses = 0;
      } else if (seqLost) {
        state.activeBet = null;
        state.consecutiveLosses += 1;
        if (state.consecutiveLosses >= 2) {
          state.activeBot = state.activeBot === 'A' ? 'B' : 'A';
          state.consecutiveLosses = 0;
          state.logs.unshift(`[${time}] 2 sequence losses. Swapping to Bot ${state.activeBot}.`);
        }
      } else {
        // Next step in Martingale
        const nextAmount = sequence[state.activeBet.step];
        state.activeBet.step += 1;
        state.activeBet.quantity = nextAmount;
        state.activeBet.period = incrementPeriod(latestDraw.period);
        state.balance = Number((state.balance - nextAmount).toFixed(2));
        betsToTrigger.push({ target: state.activeBet.target, quantity: nextAmount, period: state.activeBet.period, strategyId: 'dual-bot' });
        return; // Wait for next draw
      }

      // Check Target Balance FIRST (Highest Priority)
      const targetBal = parseFloat(settings.dualTargetBalance) || 0;
      if (targetBal > 0 && state.balance >= targetBal) {
        state.logs.unshift(`[${time}] [TARGET REACHED] Hard Target Balance of ₹${targetBal} reached! Dual Bot disabled.`);
        settings.dualBotEnabled = false;
        state.activeBet = null;
        chrome.storage.local.set({ dualBotEnabled: false });
        if (settings.enableSound) playSound('win');
        return; // STOP completely
      }

      // Check Stoppers AFTER sequence ends
      const profit = state.balance - state.checkpoint;
      const loss = state.checkpoint - state.balance;
      
      if (profit >= settings.dualProfitTarget) {
        state.stats.profitHits++;
        state.pauseUntil = now + (settings.dualProfitPause * 60000);
        state.checkpoint = state.balance;
        state.activeBot = 'A';
        state.consecutiveLosses = 0;
        state.logs.unshift(`[${time}] [PROFIT STOP] Hit +₹${profit.toFixed(2)}. Pausing ${settings.dualProfitPause}m.`);
      } else if (loss >= settings.dualLossLimit) {
        state.stats.lossHits++;
        state.pauseUntil = now + (settings.dualLossPause * 60000);
        state.checkpoint = state.balance;
        state.activeBot = 'A';
        state.consecutiveLosses = 0;
        state.logs.unshift(`[${time}] [LOSS STOP] Hit -₹${loss.toFixed(2)}. Pausing ${settings.dualLossPause}m.`);
      }
    } else {
      return; // Waiting for active bet outcome
    }
  }

  // Determine if we should trigger a new bet
  if (!state.activeBet && state.pauseUntil <= now) {
    let streakCount = 0;
    for (const draw of updatedHistory) {
      if (draw.result === latestDraw.result) streakCount++;
      else break;
    }

    let betTarget = null;
    if (state.activeBot === 'A' && streakCount >= 1) {
      betTarget = latestDraw.result === 'Big' ? 'Small' : 'Big';
    } else if (state.activeBot === 'B' && streakCount >= 2) {
      betTarget = latestDraw.result;
    }

    if (betTarget) {
      const amount = sequence[0];
      if (state.balance >= amount) {
        state.balance = Number((state.balance - amount).toFixed(2));
        state.activeBet = { target: betTarget, quantity: amount, period: incrementPeriod(latestDraw.period), step: 1 };
        betsToTrigger.push({ target: betTarget, quantity: amount, period: state.activeBet.period, strategyId: 'dual-bot' });
      }
    }
  }
}

// Evaluates the result and updates the state machine (Synchronous)
function handleBetOutcome(win, settings, latestDraw, strategy, betsToTrigger) {
  const isDemo = settings.betMode === 'demo';
  const isShadow = strategy.isShadow || false;
  const logPrefix = isShadow ? '[SHADOW] ' : (isDemo ? '[SIMULATOR] ' : '');

  const currentBet = strategy.activeBet;
  const stakingSystem = strategy.stakingSystem;
  const cooldownTime = strategy.cooldownTime;

  const customSequence = parseCustomSequence(strategy.customSequence);
  const stakingMultiplier = parseFloat(strategy.stakingMultiplier) || 2;
  const maxSteps = customSequence.length > 0 ? customSequence.length : strategy.maxSteps;

  const nextStep = currentBet.step + 1;
  const nextQuantity = customSequence.length > 0 ? customSequence[nextStep - 1] : currentBet.quantity * stakingMultiplier;

  // 1. Calculate and update Demo Balance on win
  if (!isShadow && isDemo && win) {
    strategy.demoBalance = Number((strategy.demoBalance + (currentBet.quantity * 2)).toFixed(2));
  }

  // Update Win Streak
  if (!strategy.winStreak) strategy.winStreak = { current: 0, max: 0 };
  if (win) {
    strategy.winStreak.current += 1;
    if (strategy.winStreak.current > strategy.winStreak.max) {
      strategy.winStreak.max = strategy.winStreak.current;
    }
  } else {
    strategy.winStreak.current = 0;
  }

  // Update consecutive losses (step losses)
  if (!strategy.consecutiveLosses) strategy.consecutiveLosses = 0;
  if (win) {
    strategy.consecutiveLosses = 0;
  } else {
    strategy.consecutiveLosses += 1;
  }
  // Compute sequence outcome for Auto-Switch / Meta-Bot tracking
  // Must happen BEFORE loss cooldown return, otherwise auto-switch never fires
  let seqWon = false;
  let seqLost = false;
  
  if (stakingSystem === 'martingale') {
    if (win) seqWon = true;
    else if (nextStep > maxSteps) seqLost = true;
  } else {
    // Paroli
    if (win && nextStep > maxSteps) seqWon = true;
    else if (!win) seqLost = true;
  }

  // Auto-Switch Strategy Tracker (moved to Profit/Loss Stoppers section based on cumulative loss)

  // --- Strategy-Specific Profit/Loss Stoppers ---
  if (!isShadow && isDemo && (seqWon || seqLost)) {
    const takeProfitTarget = parseFloat(strategy.takeProfitTarget) || 0;
    const takeProfitPause = parseFloat(strategy.takeProfitPause) || 0;
    const stopLossLimit = parseFloat(strategy.stopLossLimit) || 0;
    const stopLossPause = parseFloat(strategy.stopLossPause) || 0;
    
    const profit = strategy.demoBalance - strategy.checkpoint;
    const loss = strategy.checkpoint - strategy.demoBalance;
    
    // 0. Auto-Switch (Loss Threshold)
    if (strategy.autoSwitchEnabled && strategy.autoSwitchTargetId) {
      const autoSwitchLossAmt = parseFloat(strategy.autoSwitchLossAmount) || 0;
      if (autoSwitchLossAmt > 0 && loss >= autoSwitchLossAmt) {
        strategy.autoSwitchJustActivated = true;
        // Don't return here so it can process below or just let the main loop handle the swap
      }
    }
    
    // 1. HARD TARGET BALANCE STOP (Highest Priority)
    const targetBal = parseFloat(strategy.targetBalance) || 0;
    if (targetBal > 0 && strategy.demoBalance >= targetBal) {
      logToStrategySync(strategy, `[TARGET REACHED] Hard Target Balance of ₹${targetBal} reached! Strategy permanently disabled.`);
      strategy.enabled = false;
      strategy.activeBet = null;
      if (settings.enableSound) playSound('win');
      
      // Force sync immediately so UI catches the toggle off
      chrome.storage.local.set({ strategies: settings.strategies });
      return;
    }

    // 2. Local Profit / Loss Stoppers
    if (takeProfitTarget > 0 && profit >= takeProfitTarget) {
      logToStrategySync(strategy, `[PROFIT STOP] Hit +₹${profit.toFixed(2)}. Pausing ${takeProfitPause} mins.`);
      strategy.cooldownUntil = Date.now() + takeProfitPause * 60000;
      strategy.checkpoint = strategy.demoBalance;
      strategy.activeBet = null;
      if (settings.enableSound) playSound('win');
      return;
    } else if (stopLossLimit > 0 && loss >= stopLossLimit) {
      logToStrategySync(strategy, `[LOSS STOP] Hit -₹${loss.toFixed(2)}. Pausing ${stopLossPause} mins.`);
      strategy.cooldownUntil = Date.now() + stopLossPause * 60000;
      strategy.checkpoint = strategy.demoBalance;
      strategy.activeBet = null;
      if (settings.enableSound) playSound('safety_stop');
      return;
    }
  }

  // --- Meta-Bot Manager Tracking & Auto-Switching ---
  if (settings.metaBotEnabled) {
    if (seqWon) {
      strategy.metaSequenceWins = (strategy.metaSequenceWins || 0) + 1;
      strategy.metaSequenceLosses = 0;
    } else if (seqLost) {
      strategy.metaSequenceLosses = (strategy.metaSequenceLosses || 0) + 1;
      strategy.metaSequenceWins = 0;
    }

    const metaLossLimit = settings.metaBotLossLimit || 2;
    const metaWinLimit = settings.metaBotWinLimit || 2;

    if (!isShadow && seqLost && strategy.metaSequenceLosses >= metaLossLimit) {
      strategy.enabled = false;
      logToStrategySync(strategy, `[META-BOT] Disconnect limit reached (${strategy.metaSequenceLosses} sequence losses). Strategy disabled & entering Shadow Mode.`);
      if (settings.enableSound) playSound('safety_stop');
    } 
    else if (isShadow && seqWon && strategy.metaSequenceWins >= metaWinLimit) {
      strategy.enabled = true;
      strategy.metaSequenceLosses = 0;
      strategy.metaSequenceWins = 0;
      strategy.activeBet = null;
      logToStrategySync(strategy, `[META-BOT] Win target reached (${strategy.metaSequenceWins} sequence wins). Activating strategy!`);
      if (settings.enableSound) playSound('win');
      
      // Tell evaluateDrawHistory loop to disable all other strategies
      strategy.metaBotJustActivated = true;
    }
  }

  // Check Loss Cooldown Trigger BEFORE continuing staking logic
  const lossCooldownLimit = parseInt(strategy.lossCooldownLimit, 10) || 0;
  const lossCooldownTime = parseInt(strategy.lossCooldownTime, 10) || 0;

  if (!win && lossCooldownLimit > 0 && strategy.consecutiveLosses >= lossCooldownLimit) {
    logToStrategySync(strategy, `[LOSS COOLDOWN] Lost ${strategy.consecutiveLosses} times consecutively. Cooldown activated for ${lossCooldownTime} mins.`);
    if (lossCooldownTime > 0) {
      strategy.cooldownUntil = Date.now() + lossCooldownTime * 60 * 1000;
    }
    strategy.activeBet = null;
    strategy.consecutiveLosses = 0;
    if (settings.enableSound && !isShadow) playSound('safety_stop');
    return;
  }

  // Start Cooldown
  const startCooldownLocal = () => {
    if (cooldownTime > 0) {
      strategy.cooldownUntil = Date.now() + cooldownTime * 60 * 1000;
      logToStrategySync(strategy, `[COOLDOWN] Waiting ${cooldownTime} minutes before checking new streaks. Resumes at ${new Date(strategy.cooldownUntil).toLocaleTimeString()}.`);
    }
  };

  // 2. Evaluate next step based on Staking System (Martingale or Paroli)
  if (stakingSystem === 'martingale') {
    if (win) {
      logToStrategySync(strategy, `${logPrefix}WIN! Period ${currentBet.period} resulted in ${latestDraw.result}. Martingale reset to idle.`);
      if (settings.enableSound && !isShadow) playSound('win');
      startCooldownLocal();
      strategy.activeBet = null;
    } else {
      if (!isShadow && isDemo && strategy.demoBalance < nextQuantity) {
        const baseQty = customSequence.length > 0 ? customSequence[0] : strategy.baseQuantity;
        if (strategy.demoBalance >= baseQty) {
          const nextPeriod = incrementPeriod(latestDraw.period);
          const restartBet = { period: nextPeriod, target: currentBet.target, quantity: baseQty, step: 1 };
          strategy.demoBalance = Number((strategy.demoBalance - baseQty).toFixed(2));
          logToStrategySync(strategy, `${logPrefix}LOSS! Period ${currentBet.period} was ${latestDraw.result}. Insufficient balance for next step (₹${nextQuantity}). Restarting sequence from Step 1 with ₹${baseQty} on ${currentBet.target} for Period ${nextPeriod}.`);
          if (settings.enableSound && !isShadow) playSound('loss');
          strategy.activeBet = restartBet;
          if (!isShadow) {
            betsToTrigger.push({ strategyId: strategy.id, target: currentBet.target, quantity: baseQty, period: nextPeriod });
          }
        } else {
          logToStrategySync(strategy, `${logPrefix}LOSS! Period ${currentBet.period} was ${latestDraw.result}. Insufficient balance (₹${strategy.demoBalance}) to place restart bet of ₹${baseQty}. Strategy disabled.`);
          if (settings.enableSound && !isShadow) playSound('safety_stop');
          strategy.enabled = false;
          strategy.activeBet = null;
        }
      }
      else if (nextStep <= maxSteps) {
        const nextPeriod = incrementPeriod(latestDraw.period);
        const nextBet = { period: nextPeriod, target: currentBet.target, quantity: nextQuantity, step: nextStep };
        if (!isShadow && isDemo) {
          strategy.demoBalance = Number((strategy.demoBalance - nextQuantity).toFixed(2));
        }
        logToStrategySync(strategy, `${logPrefix}LOSS! Period ${currentBet.period} was ${latestDraw.result}. Step ${nextStep}: Setting bet to ₹${nextQuantity} on ${currentBet.target} for Period ${nextPeriod}.`);
        if (settings.enableSound && !isShadow) playSound('loss');
        strategy.activeBet = nextBet;
        if (!isShadow) {
          betsToTrigger.push({ strategyId: strategy.id, target: currentBet.target, quantity: nextQuantity, period: nextPeriod });
        }
      } else {
        logToStrategySync(strategy, `${logPrefix}LOSS! Max Steps (${maxSteps}) reached. Safety stop activated.`);
        if (settings.enableSound && !isShadow) playSound('safety_stop');
        strategy.activeBet = null;
        strategy.isInReentryMode = true;
        strategy.safeModeStartPeriod = latestDraw.period;
      }
    }
  } else {
    // Paroli System
    if (win) {
      if (!isShadow && isDemo && strategy.demoBalance < nextQuantity) {
        const baseQty = customSequence.length > 0 ? customSequence[0] : strategy.baseQuantity;
        if (strategy.demoBalance >= baseQty) {
          const nextPeriod = incrementPeriod(latestDraw.period);
          const restartBet = { period: nextPeriod, target: currentBet.target, quantity: baseQty, step: 1 };
          strategy.demoBalance = Number((strategy.demoBalance - baseQty).toFixed(2));
          logToStrategySync(strategy, `${logPrefix}WIN! Period ${currentBet.period} was ${latestDraw.result}. Insufficient balance for next step (₹${nextQuantity}). Restarting Paroli sequence from Step 1 with ₹${baseQty} on ${currentBet.target} for Period ${nextPeriod}.`);
          if (settings.enableSound && !isShadow) playSound('win');
          strategy.activeBet = restartBet;
          if (!isShadow) {
            betsToTrigger.push({ strategyId: strategy.id, target: currentBet.target, quantity: baseQty, period: nextPeriod });
          }
        } else {
          logToStrategySync(strategy, `${logPrefix}WIN! Period ${currentBet.period} was ${latestDraw.result}. Insufficient balance (₹${strategy.demoBalance}) to place restart bet of ₹${baseQty}. Strategy disabled.`);
          if (settings.enableSound && !isShadow) playSound('safety_stop');
          strategy.enabled = false;
          strategy.activeBet = null;
        }
      }
      else if (nextStep <= maxSteps) {
        const nextPeriod = incrementPeriod(latestDraw.period);
        const nextBet = { period: nextPeriod, target: currentBet.target, quantity: nextQuantity, step: nextStep };
        if (!isShadow && isDemo) {
          strategy.demoBalance = Number((strategy.demoBalance - nextQuantity).toFixed(2));
        }
        logToStrategySync(strategy, `${logPrefix}WIN! Period ${currentBet.period} was ${latestDraw.result}. Paroli Step ${nextStep}: Re-investing ₹${nextQuantity} on ${currentBet.target} for Period ${nextPeriod}.`);
        if (settings.enableSound && !isShadow) playSound('win');
        strategy.activeBet = nextBet;
        if (!isShadow) {
          betsToTrigger.push({ strategyId: strategy.id, target: currentBet.target, quantity: nextQuantity, period: nextPeriod });
        }
      } else {
        logToStrategySync(strategy, `${logPrefix}WIN TARGET HIT! Completed Paroli ${maxSteps}-step sequence successfully. Resetting back to idle.`);
        if (settings.enableSound && !isShadow) playSound('win');
        startCooldownLocal();
        strategy.activeBet = null;
      }
    } else {
      logToStrategySync(strategy, `${logPrefix}LOSS! Period ${currentBet.period} was ${latestDraw.result}. Paroli sequence broken. Resetting back to idle.`);
      if (settings.enableSound && !isShadow) playSound('loss');
      strategy.activeBet = null;
      strategy.isInReentryMode = true;
      strategy.safeModeStartPeriod = latestDraw.period;
    }
  }
}

// Evaluate strategy specific configurations (Synchronous)
function evaluateStrategy(strategy, settings, parsedRows, count, targetType, latestDraw, betsToTrigger, updatedHistory) {
  const isShadow = settings.metaBotEnabled && !strategy.enabled;
  if (!strategy.enabled && !isShadow) return;
  
  strategy.isShadow = isShadow;
  const isDemo = settings.betMode === 'demo';

  // Check if currently waiting for streak to break (triggered when streak reaches threshold)
  if (strategy.waitStreakBreak) {
    const shieldLen = strategy.waitStreakLength || 5;
    if (!strategy.waitStreakType && count >= shieldLen) {
      strategy.waitStreakType = targetType;
      strategy.activeBet = null;
      logToStrategySync(strategy, `[WAIT STREAK SHIELD] Streak of ${count}x ${targetType} met. Pausing until streak breaks.`);
    }

    if (strategy.waitStreakType) {
      if (latestDraw.result !== strategy.waitStreakType) {
        logToStrategySync(strategy, `[WAIT STREAK BREAK] Streak of ${strategy.waitStreakType} broke with ${latestDraw.result}. Resuming normal operations.`);
        strategy.waitStreakType = null;
        // Keep waitStreakBreak = true so the shield remains active for future streaks
      } else {
        return; // Still in wait state, block betting
      }
    }
  } else {
    // Safety cleanup: if user turns off toggle, reset waitStreakType
    strategy.waitStreakType = null;
  }

  // Check if currently in a cooldown period
  if (strategy.cooldownUntil && Date.now() < strategy.cooldownUntil) {
    return;
  }

  // 1. Process active bet outcome if draw completed
  if (strategy.activeBet) {
    const outcome = parsedRows.find(r => r.period === strategy.activeBet.period);
    if (outcome) {
      const win = outcome.result === strategy.activeBet.target;
      handleBetOutcome(win, settings, outcome, strategy, betsToTrigger);
      return;
    }

    // ponytail: auto-cancel stale bets whose period has already passed
    // without this, a page refresh leaves the strategy permanently frozen
    try {
      if (BigInt(strategy.activeBet.period) <= BigInt(latestDraw.period)) {
        logToStrategySync(strategy, `[AUTO] Stale bet for period ${strategy.activeBet.period} auto-cancelled (result no longer in visible history).`);
        strategy.activeBet = null;
        // fall through to idle trigger check below
      }
    } catch (e) { /* period format not comparable */ }

    if (strategy.activeBet) return; // still pending for a future period
  }

  // 2. Idle State: Evaluate new triggers
  const now = Date.now();
  const runMins = parseFloat(strategy.runTime) || 0;
  const pauseMins = parseFloat(strategy.pauseTime) || 0;
  let inStratCyclePause = false;
  if (runMins > 0 && pauseMins > 0) {
    const runMs = runMins * 60 * 1000;
    const pauseMs = pauseMins * 60 * 1000;
    const cycleMs = runMs + pauseMs;
    const cyclePos = now % cycleMs;
    if (cyclePos >= runMs) {
      inStratCyclePause = true;
    }
  }

  if (!strategy.activeBet && count >= strategy.streakLimit && latestDraw.period !== strategy.lastTriggeredPeriod) {
    
    if (inStratCyclePause) {
       // Silently block new bets if in cycle pause.
       return;
    }
    const customSequence = parseCustomSequence(strategy.customSequence);
    const quantity = customSequence.length > 0 ? customSequence[0] : strategy.baseQuantity;

    // Balance guard check for initial bet:
    if (!strategy.isShadow && isDemo && strategy.demoBalance < quantity) {
      logToStrategySync(strategy, `[SIMULATOR] Streak of ${count}x ${targetType} met. Insufficient balance (₹${strategy.demoBalance}) to place initial bet of ₹${quantity}. Strategy disabled.`);
      if (settings.enableSound) playSound('safety_stop');
      strategy.enabled = false;
      return;
    }

    if (!strategy.isShadow && isDemo && strategy.checkpoint === undefined) {
      strategy.checkpoint = strategy.demoBalance;
    }

    // Determine bet direction (Same = follow streak trend; Opposite = bet against trend)
    const betTarget = strategy.betDirection === 'same' ? targetType : (targetType === 'Big' ? 'Small' : 'Big');
    const nextPeriod = incrementPeriod(latestDraw.period);

    const newBet = {
      period: nextPeriod,
      target: betTarget,
      quantity: quantity,
      step: 1
    };

    if (!strategy.isShadow && isDemo) {
      strategy.demoBalance = Number((strategy.demoBalance - quantity).toFixed(2));
    }

    const logPrefix = strategy.isShadow ? '[SHADOW] ' : (isDemo ? '[SIMULATOR] ' : '');
    logToStrategySync(strategy, `${logPrefix}Streak of ${count}x ${targetType} met. Starting ${strategy.stakingSystem.toUpperCase()} (${strategy.betDirection}) sequence on ${betTarget} for Period ${nextPeriod}.`);
    
    strategy.lastTriggeredPeriod = latestDraw.period;
    strategy.activeBet = newBet;

    if (!strategy.isShadow) {
      betsToTrigger.push({
        strategyId: strategy.id,
        target: betTarget,
        quantity: quantity,
        period: nextPeriod
      });
    }
  }
}

// Scrapes draw history and triggers state transitions
function evaluateDrawHistory(recordBody) {
  const rows = recordBody.querySelectorAll('.van-row');
  if (!rows || rows.length === 0) return;

  const parsedRows = [];
  rows.forEach(row => {
    const cols = row.querySelectorAll('.van-col');
    if (cols.length >= 3) {
      const period = cols[0].textContent.trim();
      const numText = cols[1].textContent.trim();
      const bigSmallText = cols[2].textContent.trim();

      if (!period) return;

      let result = null;
      if (bigSmallText.toLowerCase().includes('small')) {
        result = 'Small';
      } else if (bigSmallText.toLowerCase().includes('big')) {
        result = 'Big';
      } else {
        const num = parseInt(numText, 10);
        if (!isNaN(num)) {
          result = num <= 4 ? 'Small' : 'Big';
        }
      }

      if (result) {
        parsedRows.push({ period, result });
      }
    }
  });

  if (parsedRows.length === 0) return;

  // Latest completed draw
  const latestDraw = parsedRows[0];
  const targetType = latestDraw.result;

  // Streak counter (top-down)
  let count = 0;
  for (const row of parsedRows) {
    if (row.result === targetType) {
      count++;
    } else {
      break;
    }
  }

  // Update popup dashboard elements
  chrome.storage.local.set({
    currentStreak: { type: targetType, count: count },
    latestPeriod: latestDraw.period,
    recentDraws: parsedRows.slice(0, 10)
  });

  // Pull settings from storage
  chrome.storage.local.get({
    // Shared
    clickDelay: 1000,
    betMode: 'demo',
    bigBtnSelector: '.Betting__C-foot-b',
    smallBtnSelector: '.Betting__C-foot-s',
    popInputSelector: '.lottery-container input[type="number"]',
    popBetSelector: '.lottery-container button.bet-amount',
    enableSound: true,
    globalCooldownUntil: 0,
    dualBotEnabled: false,
    dualBotSequence: '10, 40, 160',
    dualBotInitialBalance: 100,
    dualProfitTarget: 50,
    dualProfitPause: 3,
    dualLossLimit: 40,
    dualLossPause: 2,
    dualTargetBalance: 0,
    dualBotState: null, // Fetched explicitly below or defaulted
    dualBotResetRequested: false,
    manualPlayState: null,
    aiOptimizerEnabled: false,
    aiInitialBalance: 100,
    aiBlockSize: 30,

    // Strategies list with default bootstraps
    strategies: [
      {
        id: 'strat-1',
        name: 'Strategy 1',
        enabled: false,
        streakLimit: 2,
        betDirection: 'opposite',
        stakingSystem: 'martingale',
        baseQuantity: 10,
        maxSteps: 5,
        cooldownTime: 3,
        lossCooldownLimit: 0,
        lossCooldownTime: 5,
        consecutiveLosses: 0,
        stakingMultiplier: 2,
        customSequence: '',
        waitStreakBreak: false,
        waitStreakType: null,
        demoBalance: 100,
        initialBalance: 100,
        activeBet: null,
        cooldownUntil: 0,
        lastTriggeredPeriod: '',
        winStreak: { current: 0, max: 0 },
        logs: []
      },
      {
        id: 'strat-2',
        name: 'Strategy 2',
        enabled: false,
        streakLimit: 3,
        betDirection: 'same',
        stakingSystem: 'martingale',
        baseQuantity: 10,
        maxSteps: 2,
        cooldownTime: 3,
        lossCooldownLimit: 0,
        lossCooldownTime: 5,
        consecutiveLosses: 0,
        stakingMultiplier: 2,
        customSequence: '',
        waitStreakBreak: false,
        waitStreakType: null,
        demoBalance: 300,
        initialBalance: 300,
        activeBet: null,
        cooldownUntil: 0,
        lastTriggeredPeriod: '',
        winStreak: { current: 0, max: 0 },
        logs: []
      }
    ],
    manualPlayState: { balance: 1000, activeBet: null, stats: { wins: 0, losses: 0 }, logs: [] },
    fullHistory: []
  }, (settings) => {
    const strategies = settings.strategies;
    
    // Maintain a 300-result rolling history
    const historyMap = new Map();
    if (settings.fullHistory) {
      for (const item of settings.fullHistory) {
        historyMap.set(item.period, item);
      }
    }
    for (const item of parsedRows) {
      historyMap.set(item.period, item);
    }
    let updatedHistory = Array.from(historyMap.values());
    updatedHistory.sort((a, b) => {
      try {
        const biA = BigInt(a.period);
        const biB = BigInt(b.period);
        return biB < biA ? -1 : (biB > biA ? 1 : 0);
      } catch(e) {
        return b.period.localeCompare(a.period);
      }
    });
    updatedHistory = updatedHistory.slice(0, 300);

    if (!strategies || strategies.length === 0) return;

    const now = Date.now();
    
    // Global Manual Pause Check
    const isPausedGlobally = settings.globalCooldownUntil && now < settings.globalCooldownUntil;
    
    // UI expects activeGlobalSchedulePauseSecs for legacy badge, keep 0
    chrome.storage.local.set({ activeGlobalSchedulePauseSecs: 0 });
    
    const betsToTrigger = [];

    const initBal = settings.dualBotInitialBalance || 100;
    const dState = settings.dualBotState || { 
      balance: initBal, checkpoint: initBal, activeBot: 'A', 
      consecutiveLosses: 0, pauseUntil: 0, activeBet: null, 
      stats: { profitHits: 0, lossHits: 0, totalProfit: 0 }, logs: [] 
    };

    // Handle reset request from popup (avoids race condition)
    if (settings.dualBotResetRequested) {
      dState.balance = initBal;
      dState.checkpoint = initBal;
      dState.activeBot = 'A';
      dState.consecutiveLosses = 0;
      dState.activeBet = null;
      dState.pauseUntil = 0;
      dState.stats = { profitHits: 0, lossHits: 0, totalProfit: 0 };
      dState.logs.unshift(`[${new Date().toLocaleTimeString()}] Reset to ₹${initBal}`);
      if (dState.logs.length > 30) dState.logs.pop();
      chrome.storage.local.set({ dualBotResetRequested: false });
    }

    if (settings.dualBotEnabled && !isPausedGlobally) {
      evaluateDualBotMaster(dState, settings, latestDraw, betsToTrigger, updatedHistory);
    }

    // Process all strategies in parallel
    if (!isPausedGlobally) {
      for (const strategy of strategies) {
        evaluateStrategy(strategy, settings, parsedRows, count, targetType, latestDraw, betsToTrigger, updatedHistory);
      }
      
      // Auto-Switcher cross-strategy resolution
      const autoSwitchStrat = strategies.find(s => s.autoSwitchJustActivated);
      if (autoSwitchStrat) {
        const targetStrat = strategies.find(s => s.id === autoSwitchStrat.autoSwitchTargetId);
        if (targetStrat) {
          autoSwitchStrat.enabled = false;
          autoSwitchStrat.activeBet = null;
          autoSwitchStrat.checkpoint = autoSwitchStrat.demoBalance;
          
          targetStrat.enabled = true;
          targetStrat.checkpoint = targetStrat.demoBalance; // Ensure clean start for target
          
          logToStrategySync(autoSwitchStrat, `[AUTO-SWITCH] Hit loss threshold. Turning OFF and swapping to "${targetStrat.name}".`);
          logToStrategySync(targetStrat, `[AUTO-SWITCH] Activated by "${autoSwitchStrat.name}". Strategy is now ON.`);
        }
        delete autoSwitchStrat.autoSwitchJustActivated;
      }

      // Meta-Bot cross-strategy auto-switch resolution
      if (settings.metaBotEnabled) {
        const activatedStrat = strategies.find(s => s.metaBotJustActivated);
        if (activatedStrat) {
          for (const strat of strategies) {
            if (strat.id !== activatedStrat.id) {
              if (strat.enabled) {
                strat.enabled = false;
                strat.activeBet = null;
                logToStrategySync(strat, `[META-BOT] Strategy "${activatedStrat.name}" took control. Switching this strategy OFF into Shadow Mode.`);
              }
              strat.metaSequenceLosses = 0;
              strat.metaSequenceWins = 0;
            }
            delete strat.metaBotJustActivated;
          }
        }
      }
    } else {
      console.log(`[GLOBAL COOLDOWN] Automated bot betting is globally paused.`);
    }

    // Process manual play active bet
    const mState = settings.manualPlayState || { balance: 1000, activeBet: null, stats: { wins: 0, losses: 0 }, logs: [] };
    if (mState.activeBet) {
      const outcome = parsedRows.find(r => r.period === mState.activeBet.period);
      if (outcome) {
        const win = outcome.result === mState.activeBet.target;
        const betAmount = mState.activeBet.quantity;
        const time = new Date().toLocaleTimeString();

        if (win) {
          mState.balance = Number((mState.balance + (betAmount * 2)).toFixed(2));
          if (!mState.stats) mState.stats = { wins: 0, losses: 0 };
          mState.stats.wins = (mState.stats.wins || 0) + 1;
          
          if (!mState.logs) mState.logs = [];
          mState.logs.unshift(`[${time}] [WIN] Period ${mState.activeBet.period} was ${outcome.result}. Bet of ₹${betAmount} on ${mState.activeBet.target} won! Received ₹${(betAmount * 2).toFixed(2)}.`);
          if (mState.logs.length > 25) mState.logs.pop();

          if (settings.enableSound) playSound('win');
        } else {
          if (!mState.stats) mState.stats = { wins: 0, losses: 0 };
          mState.stats.losses = (mState.stats.losses || 0) + 1;

          if (!mState.logs) mState.logs = [];
          mState.logs.unshift(`[${time}] [LOSS] Period ${mState.activeBet.period} was ${outcome.result}. Bet of ₹${betAmount} on ${mState.activeBet.target} lost.`);
          if (mState.logs.length > 25) mState.logs.pop();

          if (settings.enableSound) playSound('loss');
        }
        mState.activeBet = null;
      } else {
        // Stale manual bet check
        try {
          if (BigInt(mState.activeBet.period) <= BigInt(latestDraw.period)) {
            const time = new Date().toLocaleTimeString();
            if (!mState.logs) mState.logs = [];
            mState.logs.unshift(`[${time}] Bet for period ${mState.activeBet.period} was cancelled automatically.`);
            mState.activeBet = null;
          }
        } catch (e) {}
      }
    }

    // ─── AI Optimizer Integration ───
    if (settings.aiOptimizerEnabled && !isPausedGlobally) {
      const blockSize = settings.aiBlockSize || 30;
      if (!window._aiOptimizerState) {
        window._aiOptimizerState = { drawsSinceLastSend: 0, blockNumber: 0, lastPeriod: null };
      }
      const aiState = window._aiOptimizerState;
      
      // Only count if this is a new draw
      if (aiState.lastPeriod !== latestDraw.period) {
        aiState.lastPeriod = latestDraw.period;
        aiState.drawsSinceLastSend++;
        
        if (aiState.drawsSinceLastSend >= blockSize) {
          aiState.blockNumber++;
          aiState.drawsSinceLastSend = 0;
          
          // Collect last N draws as Big/Small
          const recentDraws = updatedHistory.slice(0, blockSize).map(d => d.result).reverse();
          
          // Get current balance from first strategy
          const currentBalance = strategies[0] ? strategies[0].demoBalance : 100;
          
          const payload = {
            draws: recentDraws,
            balance: currentBalance,
            initialBalance: settings.aiInitialBalance || 100,
            blockNumber: aiState.blockNumber
          };
          
          // Send to Python server
          fetch('http://localhost:8787/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).then(r => r.json()).then(resp => {
            console.log('[AI Optimizer] Response:', resp);
            
            if (resp.action === 'apply' && resp.strategy && strategies[0]) {
              const s = resp.strategy;
              const strat = strategies[0];
              
              // Auto-apply the best strategy to Strategy 1
              strat.stakingSystem = s.stakingSystem;
              strat.direction = s.direction;
              strat.shieldLimit = s.shieldLimit;
              strat.streakLimit = s.streakLimit || 1;
              strat.baseQuantity = s.baseQuantity;
              strat.maxSteps = s.maxSteps;
              strat.profitTarget = s.takeProfit;
              strat.profitPause = s.takeProfitPause;
              strat.lossLimit = s.stopLoss;
              strat.lossPause = s.stopLossPause;
              strat.customSequence = s.sequence ? s.sequence.join(',') : '';
              strat.checkpoint = strat.demoBalance;
              strat.enabled = true;
              
              chrome.storage.local.set({ strategies, aiOptimizerLog: `[Block ${aiState.blockNumber}] Applied: ${s.stakingSystem.toUpperCase()} ${s.direction.toUpperCase()} Seq:${s.sequence} TP:${s.takeProfit} SL:${s.stopLoss}` });
              console.log(`[AI Optimizer] Block ${aiState.blockNumber}: Applied ${s.stakingSystem} ${s.direction}`);
            } else if (resp.action === 'observe') {
              // First block: disable betting, just observe
              if (strategies[0]) {
                strategies[0].enabled = false;
              }
              chrome.storage.local.set({ strategies, aiOptimizerLog: `[Block ${aiState.blockNumber}] Observing market... Recommended: ${resp.recommendedStrategy ? resp.recommendedStrategy.stakingSystem.toUpperCase() + ' ' + resp.recommendedStrategy.direction.toUpperCase() : 'N/A'}` });
              console.log(`[AI Optimizer] Block ${aiState.blockNumber}: Observing...`);
            }
          }).catch(err => {
            console.log('[AI Optimizer] Server not reachable:', err.message);
          });
        }
      }
    }

    // Prepare AI Progress info
    let aiProgress = null;
    if (settings.aiOptimizerEnabled && window._aiOptimizerState) {
      aiProgress = { 
        current: window._aiOptimizerState.drawsSinceLastSend, 
        total: settings.aiBlockSize || 30 
      };
    }

    // Write updated strategies to storage EXACTLY ONCE
    chrome.storage.local.set({ 
      strategies, 
      manualPlayState: mState, 
      dualBotState: dState, 
      fullHistory: updatedHistory,
      aiProgress: aiProgress
    }, () => {
      // After save finishes, execute queued bet triggers
      betsToTrigger.forEach(bet => {
        setTimeout(() => {
          triggerNewBet(bet.target, bet.quantity, settings, bet.period, bet.strategyId);
        }, settings.clickDelay);
      });
    });
  });
}

function findHistoryContainer() {
  // 1. Try direct record-body class
  let el = document.querySelector('.record-body');
  if (el) return el;

  // 2. Try the parent record container
  el = document.querySelector('.record');
  if (el && el.querySelector('.van-row')) return el;

  // 3. Fallback: find any element containing rows with long period numbers (10+ digits)
  const rows = document.querySelectorAll('.van-row');
  for (const row of rows) {
    if (row.textContent.match(/\d{10,}/)) {
      return row.parentElement;
    }
  }
  return null;
}

function checkAndSetup() {
  const recordBody = findHistoryContainer();
  if (recordBody && recordBody !== observedElement) {
    if (observer) {
      observer.disconnect();
    }
    observedElement = recordBody;
    // ponytail: debounce observer — rapid DOM mutations (timers, animations)
    // were causing overlapping async get/set cycles that stomped state
    observer = new MutationObserver(() => {
      clearTimeout(evalTimer);
      evalTimer = setTimeout(() => evaluateDrawHistory(recordBody), 300);
    });
    observer.observe(recordBody, { childList: true, subtree: true });
    evaluateDrawHistory(recordBody);
    console.log('Wingo Strategy Simulator: Observing History Table...');
  }
}

setInterval(checkAndSetup, 2000);
checkAndSetup();
