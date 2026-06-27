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
    }
  }

  // --- Meta-Bot Manager Tracking & Auto-Switching ---
  if (settings.metaBotEnabled) {
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
      if (settings.enableSound) playSound('safety_stop'); // Plays sound because it was active until now
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
}

// Evaluate strategy specific configurations (Synchronous)
function evaluateStrategy(strategy, settings, parsedRows, count, targetType, latestDraw, betsToTrigger, updatedHistory) {
  const isShadow = settings.metaBotEnabled && !strategy.enabled;
  if (!strategy.enabled && !isShadow) return;
  
  strategy.isShadow = isShadow;
  const isDemo = settings.betMode === 'demo';

  // Check if currently waiting for streak to break (triggered when streak reaches 5+)
  if (strategy.waitStreakBreak) {
    if (!strategy.waitStreakType && count >= 5) {
      strategy.waitStreakType = targetType;
      strategy.activeBet = null;
      logToStrategySync(strategy, `[WAIT STREAK BREAK] Streak of ${count}x ${targetType} reached. Pausing bot and waiting for streak to break.`);
    }

    if (strategy.waitStreakType) {
      if (latestDraw.result !== strategy.waitStreakType) {
        logToStrategySync(strategy, `[WAIT STREAK BREAK] Streak of ${strategy.waitStreakType} broke with ${latestDraw.result}. Resuming normal operations.`);
        strategy.waitStreakType = null;
        // Keep waitStreakBreak = true so the 5+ safety guard remains active
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
  if (!strategy.activeBet && count >= strategy.streakLimit && latestDraw.period !== strategy.lastTriggeredPeriod) {
    
    // Pattern Momentum Filter (Virtual Paper Trading)
    if (strategy.patternFilterEnabled && updatedHistory && updatedHistory.length > 0) {
      const windowMins = strategy.isInReentryMode ? (strategy.patternReentryMins || 10) : (strategy.patternEntryMins || 5);
      const lookbackDraws = windowMins * 2;
      const scanLimit = Math.min(updatedHistory.length, lookbackDraws);
      const scanData = updatedHistory.slice(0, scanLimit);
      const reversedScan = [...scanData].reverse();
      
      let virtualSequenceWins = 0;
      let simStreak = 0;
      let simLastType = null;
      let simActiveBet = null;
      let simCurrentStep = 0;
      
      const customSequence = parseCustomSequence(strategy.customSequence);
      const maxSteps = customSequence.length > 0 ? customSequence.length : strategy.maxSteps;

      for (let i = 0; i < reversedScan.length; i++) {
        const row = reversedScan[i];
        
        if (simActiveBet) {
          const isWin = (row.result === simActiveBet.target);
          if (isWin) {
            if (strategy.stakingSystem === 'martingale') {
              virtualSequenceWins++;
              simActiveBet = null;
            } else {
              simCurrentStep++;
              if (simCurrentStep > maxSteps) {
                virtualSequenceWins++;
                simActiveBet = null;
              }
            }
          } else {
            if (strategy.stakingSystem === 'martingale') {
              simCurrentStep++;
              if (simCurrentStep > maxSteps) {
                simActiveBet = null;
              }
            } else {
              simActiveBet = null;
            }
          }
        }

        if (row.result === simLastType) {
          simStreak++;
        } else {
          simLastType = row.result;
          simStreak = 1;
        }

        if (!simActiveBet && simStreak >= strategy.streakLimit) {
          const betTarget = strategy.betDirection === 'same' ? row.result : (row.result === 'Big' ? 'Small' : 'Big');
          simActiveBet = { target: betTarget };
          simCurrentStep = 1;
        }
      }

      if (virtualSequenceWins < 2) {
        const logPrefix2 = strategy.isShadow ? '[SHADOW] ' : (isDemo ? '[SIMULATOR] ' : '');
        logToStrategySync(strategy, `${logPrefix2}[FILTER] Simulated strategy won ${virtualSequenceWins} times in last ${windowMins} mins (Requires 2). Bet blocked.`);
        strategy.lastTriggeredPeriod = latestDraw.period;
        return; 
      } else {
        if (strategy.isInReentryMode) {
          logToStrategySync(strategy, `[FILTER] Re-entry momentum confirmed! Strategy simulated ${virtualSequenceWins} wins in last ${windowMins} mins. Exiting safe mode.`);
        }
        strategy.isInReentryMode = false;
      }
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
    const isPausedGlobally = settings.globalCooldownUntil && now < settings.globalCooldownUntil;
    const betsToTrigger = [];

    // Process all strategies in parallel
    if (!isPausedGlobally) {
      for (const strategy of strategies) {
        evaluateStrategy(strategy, settings, parsedRows, count, targetType, latestDraw, betsToTrigger, updatedHistory);
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

    // Write updated strategies to storage EXACTLY ONCE
    chrome.storage.local.set({ strategies, manualPlayState: mState, fullHistory: updatedHistory }, () => {
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
