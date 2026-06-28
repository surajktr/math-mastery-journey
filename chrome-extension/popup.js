// ponytail: lazy and efficient state sync between storage, popup UI, and content script.

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

const defaultSettings = {
  clickDelay: 1000,
  betMode: 'demo',
  bigBtnSelector: '.Betting__C-foot-b',
  smallBtnSelector: '.Betting__C-foot-s',
  popInputSelector: '.lottery-container input[type="number"]',
  popBetSelector: '.lottery-container button.bet-amount',
  enableSound: true,
  activeStrategyId: 'strat-1',
  globalCooldownUntil: 0,
  metaBotEnabled: false,
  metaBotLossLimit: 2,
  metaBotWinLimit: 2,
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
      metaSequenceLosses: 0,
      metaSequenceWins: 0,
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
      metaSequenceLosses: 0,
      metaSequenceWins: 0,
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
  ]
};

// UI Elements (Configurations)
const metaBotTabBtn = document.getElementById('meta-bot-tab');
const metaBotPanel = document.getElementById('meta-bot-panel');
const activeStrategyPanel = document.getElementById('active-strategy-panel');
const metaBotToggle = document.getElementById('meta-bot-toggle');
const metaLossLimitInput = document.getElementById('meta-loss-limit');
const metaWinLimitInput = document.getElementById('meta-win-limit');

const enabledToggle = document.getElementById('enabled-toggle');
const waitStreakToggle = document.getElementById('wait-streak-toggle');
const streakLimitInput = document.getElementById('streak-limit');
const betDirectionSelect = document.getElementById('bet-direction');
const stakingSystemSelect = document.getElementById('staking-system');
const baseQuantityInput = document.getElementById('base-quantity');
const maxStepsInput = document.getElementById('max-steps');
const cooldownTimeInput = document.getElementById('cooldown-time');
const lossCooldownLimitInput = document.getElementById('loss-cooldown-limit');
const lossCooldownTimeInput = document.getElementById('loss-cooldown-time');
const stakingMultiplierInput = document.getElementById('staking-multiplier');
const customSequenceInput = document.getElementById('custom-sequence');
const limitLabel = document.getElementById('limit-label');
const autoSwitchToggle = document.getElementById('auto-switch-toggle');
const autoSwitchSettings = document.getElementById('auto-switch-settings');
const autoSwitchTargetSelect = document.getElementById('auto-switch-target');

// UI Elements (Status)
const demoBalanceRow = document.getElementById('demo-balance-row');
const demoBalanceInput = document.getElementById('demo-balance');
const activeBetVal = document.getElementById('active-bet');
const cancelBetBtn = document.getElementById('cancel-bet-btn');
const winStreakVal = document.getElementById('win-streak');
const logsBox = document.getElementById('logs-box');

// Shared / Global UI Elements
const clickDelayInput = document.getElementById('click-delay');
const betModeSelect = document.getElementById('bet-mode');
const resetDemoBtn = document.getElementById('reset-demo-btn');
const demoResetCol = document.getElementById('demo-reset-col');

const bigBtnSelectorInput = document.getElementById('big-btn-selector');
const smallBtnSelectorInput = document.getElementById('small-btn-selector');
const popInputSelectorInput = document.getElementById('pop-input-selector');
const popBetSelectorInput = document.getElementById('pop-bet-selector');
const selectorPanel = document.getElementById('selector-settings-panel');

const soundCheckbox = document.getElementById('sound-checkbox');
const saveBtn = document.getElementById('save-btn');
const clearLogsBtn = document.getElementById('clear-logs-btn');

const streakBadge = document.getElementById('streak-badge');
const latestPeriodVal = document.getElementById('latest-period');
const recentDrawsVal = document.getElementById('recent-draws');
const combinedBalanceVal = document.getElementById('combined-balance');
const combinedInitialBalanceVal = document.getElementById('combined-initial-balance');
const combinedPnLVal = document.getElementById('combined-pnl');
const globalPauseTimeInput = document.getElementById('global-pause-time');
const triggerGlobalPauseBtn = document.getElementById('trigger-global-pause-btn');
const globalPauseRow = document.getElementById('global-pause-row');
const globalPauseBadge = document.getElementById('global-pause-badge');


// Dynamic Tabs Elements
const tabsList = document.getElementById('tabs-list');
const addStratBtn = document.getElementById('add-strat-btn');
const deleteStratBtn = document.getElementById('delete-strat-btn');

// Manual Play Elements
const manualPlayPanel = document.getElementById('manual-play-panel');
const manualBalanceInput = document.getElementById('manual-balance');
const manualActiveBetVal = document.getElementById('manual-active-bet');
const manualCancelBetBtn = document.getElementById('manual-cancel-bet-btn');
const manualAccuracyVal = document.getElementById('manual-accuracy');
const manualBetAmountInput = document.getElementById('manual-bet-amount');
const manualBidBigBtn = document.getElementById('manual-bid-big-btn');
const manualBidSmallBtn = document.getElementById('manual-bid-small-btn');
const manualResetStatsBtn = document.getElementById('manual-reset-stats-btn');
const manualLogsBox = document.getElementById('manual-logs-box');

// Tab Click Listeners for static tabs
metaBotTabBtn.addEventListener('click', () => {
  saveCurrentStrategyToMemory();
  currentActiveId = 'meta-bot';
  chrome.storage.local.set({ activeStrategyId: currentActiveId }, () => {
    loadSettings();
  });
});

let currentActiveId = 'strat-1';
let currentStrategies = [];

// Initialize UI settings
function initializeSettings(settings) {
  currentActiveId = settings.activeStrategyId;
  currentStrategies = settings.strategies || [];

  // Renumber strategies sequentially to match their positions
  let hasRenamed = false;
  currentStrategies.forEach((strat, index) => {
    const expectedName = `Strategy ${index + 1}`;
    if (strat.name !== expectedName) {
      strat.name = expectedName;
      hasRenamed = true;
    }
  });

  if (hasRenamed) {
    chrome.storage.local.set({ strategies: currentStrategies });
  }

  // Toggle active panels depending on selection
  if (currentActiveId === 'manual-play') {
    activeStrategyPanel.style.display = 'none';
    manualPlayPanel.style.display = 'block';
    metaBotPanel.style.display = 'none';
  } else if (currentActiveId === 'meta-bot') {
    activeStrategyPanel.style.display = 'none';
    manualPlayPanel.style.display = 'none';
    metaBotPanel.style.display = 'block';
  } else {
    activeStrategyPanel.style.display = 'block';
    manualPlayPanel.style.display = 'none';
    metaBotPanel.style.display = 'none';
  }

  // Global settings loading
  clickDelayInput.value = settings.clickDelay;
  betModeSelect.value = settings.betMode;
  bigBtnSelectorInput.value = settings.bigBtnSelector;
  smallBtnSelectorInput.value = settings.smallBtnSelector;
  popInputSelectorInput.value = settings.popInputSelector;
  popBetSelectorInput.value = settings.popBetSelector;
  soundCheckbox.checked = settings.enableSound;
  
  metaBotToggle.checked = settings.metaBotEnabled || false;
  metaLossLimitInput.value = settings.metaBotLossLimit || 2;
  metaWinLimitInput.value = settings.metaBotWinLimit || 2;

  // Load active strategy settings into the UI
  if (currentActiveId !== 'manual-play') {
    const activeStrat = currentStrategies.find(s => s.id === currentActiveId) || currentStrategies[0];
    if (activeStrat) {
      currentActiveId = activeStrat.id;
      enabledToggle.checked = activeStrat.enabled;
      streakLimitInput.value = activeStrat.streakLimit;
      betDirectionSelect.value = activeStrat.betDirection;
      stakingSystemSelect.value = activeStrat.stakingSystem;
      baseQuantityInput.value = activeStrat.baseQuantity;
      maxStepsInput.value = activeStrat.maxSteps;
      cooldownTimeInput.value = activeStrat.cooldownTime;
      lossCooldownLimitInput.value = activeStrat.lossCooldownLimit !== undefined ? activeStrat.lossCooldownLimit : 0;
      lossCooldownTimeInput.value = activeStrat.lossCooldownTime !== undefined ? activeStrat.lossCooldownTime : 5;
      stakingMultiplierInput.value = activeStrat.stakingMultiplier !== undefined ? activeStrat.stakingMultiplier : 2;
      customSequenceInput.value = activeStrat.customSequence !== undefined ? activeStrat.customSequence : '';
      waitStreakToggle.checked = activeStrat.waitStreakBreak || false;
      autoSwitchToggle.checked = activeStrat.autoSwitchEnabled || false;
      autoSwitchTargetSelect.innerHTML = '<option value="" disabled selected>Select Strategy to swap to...</option>';
      currentStrategies.forEach(s => {
        if (s.id !== currentActiveId) {
          const opt = document.createElement('option');
          opt.value = s.id;
          opt.textContent = s.name;
          autoSwitchTargetSelect.appendChild(opt);
        }
      });
      autoSwitchTargetSelect.value = activeStrat.autoSwitchTargetId || '';
      autoSwitchSettings.style.display = autoSwitchToggle.checked ? 'flex' : 'none';
    }
  }

  renderTabs();
  adjustUIForModes();
  updateLiveStatus();
}

// Load configurations
function loadSettings() {
  chrome.storage.local.get(defaultSettings, (settings) => {
    chrome.storage.local.get('strategies', (data) => {
      if (!data.strategies || data.strategies.length === 0) {
        // Save default settings to storage so they exist for first run
        chrome.storage.local.set(defaultSettings, () => {
          initializeSettings(defaultSettings);
        });
      } else {
        initializeSettings(settings);
      }
    });
  });
}

// Adjust UI fields depending on strategy modes
function adjustUIForModes() {
  const isDemo = betModeSelect.value === 'demo';
  const isParoli = stakingSystemSelect.value === 'paroli';

  demoBalanceRow.style.display = isDemo ? 'flex' : 'none';
  demoResetCol.style.display = isDemo ? 'block' : 'none';
  selectorPanel.style.display = isDemo ? 'none' : 'block';

  limitLabel.textContent = isParoli ? 'Max Win Steps (Paroli)' : 'Max Loss Steps (Martingale)';
}

// Render dynamic tabs list
function renderTabs() {
  tabsList.innerHTML = '';
  
  if (currentActiveId === 'meta-bot') {
    metaBotTabBtn.classList.add('active');
  } else {
    metaBotTabBtn.classList.remove('active');
  }

  currentStrategies.forEach(strat => {
    const btn = document.createElement('button');
    btn.className = `tab-btn ${strat.id === currentActiveId ? 'active' : ''}`;
    btn.textContent = strat.name;
    btn.addEventListener('click', () => {
      // First save current inputs of active strategy
      saveCurrentStrategyToMemory();
      
      // Switch active strategy
      currentActiveId = strat.id;
      chrome.storage.local.set({ activeStrategyId: currentActiveId }, () => {
        loadSettings();
      });
    });
    tabsList.appendChild(btn);
  });

  // Append Self Test tab
  const selfTestBtn = document.createElement('button');
  selfTestBtn.className = `tab-btn ${currentActiveId === 'manual-play' ? 'active' : ''}`;
  selfTestBtn.textContent = 'Self Test';
  selfTestBtn.addEventListener('click', () => {
    saveCurrentStrategyToMemory();
    currentActiveId = 'manual-play';
    chrome.storage.local.set({ activeStrategyId: currentActiveId }, () => {
      loadSettings();
    });
  });
  tabsList.appendChild(selfTestBtn);

  // Enable/disable Delete button based on strategies count
  deleteStratBtn.style.display = (currentActiveId !== 'manual-play' && currentStrategies.length > 1) ? 'inline-block' : 'none';
}

// Save inputs of currently active strategy into the array in memory
function saveCurrentStrategyToMemory() {
  if (currentActiveId === 'manual-play' || currentActiveId === 'meta-bot') return;
  const strat = currentStrategies.find(s => s.id === currentActiveId);
  if (strat) {
    strat.enabled = enabledToggle.checked;
    const parseNum = (val, def) => { const n = parseInt(val, 10); return isNaN(n) ? def : n; };
    strat.streakLimit = parseNum(streakLimitInput.value, 2);
    strat.betDirection = betDirectionSelect.value;
    strat.stakingSystem = stakingSystemSelect.value;
    strat.baseQuantity = parseNum(baseQuantityInput.value, 10);
    strat.maxSteps = parseNum(maxStepsInput.value, 5);
    strat.cooldownTime = parseNum(cooldownTimeInput.value, 3);
    strat.lossCooldownLimit = parseNum(lossCooldownLimitInput.value, 0);
    strat.lossCooldownTime = parseNum(lossCooldownTimeInput.value, 5);
    strat.stakingMultiplier = parseFloat(stakingMultiplierInput.value) || 2;
    strat.customSequence = customSequenceInput.value.trim();
    strat.waitStreakBreak = waitStreakToggle.checked;
    strat.autoSwitchEnabled = autoSwitchToggle.checked;
    strat.autoSwitchTargetId = autoSwitchTargetSelect.value;
    strat.demoBalance = parseFloat(demoBalanceInput.value) || 0;
  }
}

// Save everything to storage
function saveSettings() {
  saveCurrentStrategyToMemory();

  const settings = {
    clickDelay: parseInt(clickDelayInput.value, 10) || 1000,
    betMode: betModeSelect.value,
    bigBtnSelector: bigBtnSelectorInput.value.trim(),
    smallBtnSelector: smallBtnSelectorInput.value.trim(),
    popInputSelector: popInputSelectorInput.value.trim(),
    popBetSelector: popBetSelectorInput.value.trim(),
    enableSound: soundCheckbox.checked,
    metaBotEnabled: metaBotToggle.checked,
    metaBotLossLimit: parseInt(metaLossLimitInput.value, 10) || 2,
    metaBotWinLimit: parseInt(metaWinLimitInput.value, 10) || 2,
    strategies: currentStrategies,
    activeStrategyId: currentActiveId
  };

  chrome.storage.local.set(settings, () => {
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saved!';
    saveBtn.style.backgroundColor = '#10b981';
    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.style.backgroundColor = '';
    }, 1000);
  });
}

// Update status indicators in popup
function updateLiveStatus() {
  chrome.storage.local.get({
    currentStreak: null,
    latestPeriod: '-',
    recentDraws: [],
    strategies: defaultSettings.strategies,
    manualPlayState: { balance: 1000, activeBet: null, stats: { wins: 0, losses: 0 }, logs: [] },
    globalCooldownUntil: 0
  }, (data) => {
    const strategies = data.strategies || [];
    currentStrategies = strategies;
    const activeStrat = strategies.find(s => s.id === currentActiveId);

    // Current streak badge (Shared)
    if (data.currentStreak && data.currentStreak.count > 0) {
      const type = data.currentStreak.type;
      const count = data.currentStreak.count;
      streakBadge.textContent = `${count}x ${type}`;
      streakBadge.className = `badge badge-${type.toLowerCase()}`;
    } else {
      streakBadge.textContent = 'No Data';
      streakBadge.className = 'badge badge-none';
    }

    // Latest draw period
    latestPeriodVal.textContent = data.latestPeriod || '-';

    if (activeStrat) {
      // Sync demoBalance input if user is not currently focusing/editing it
      if (document.activeElement !== demoBalanceInput) {
        demoBalanceInput.value = Number(activeStrat.demoBalance).toFixed(2);
      }

      // Sync toggles dynamically (e.g. if content script disables it)
      enabledToggle.checked = activeStrat.enabled;
      waitStreakToggle.checked = activeStrat.waitStreakBreak || false;

      // Win streak
      const ws = activeStrat.winStreak || { current: 0, max: 0 };
      winStreakVal.textContent = `${ws.current} (Max: ${ws.max})`;

      // Active bet / Cooldown status
      const now = Date.now();
      if (activeStrat.cooldownUntil && now < activeStrat.cooldownUntil) {
        const remainingMs = activeStrat.cooldownUntil - now;
        const remainingSecs = Math.ceil(remainingMs / 1000);
        const mins = Math.floor(remainingSecs / 60);
        const secs = remainingSecs % 60;
        activeBetVal.textContent = `Cooldown (${mins}m ${secs}s)`;
        activeBetVal.style.color = '#94a3b8';
        cancelBetBtn.style.display = 'none';
      } else if (activeStrat.activeBet && activeStrat.activeBet.step > 0) {
        const bet = activeStrat.activeBet;
        activeBetVal.textContent = `Step ${bet.step}: ${bet.target} (₹${bet.quantity})`;
        activeBetVal.style.color = '#fbbf24';
        cancelBetBtn.style.display = 'inline-block';
      } else {
        activeBetVal.textContent = 'None';
        activeBetVal.style.color = '';
        cancelBetBtn.style.display = 'none';
      }

      // Logs
      if (activeStrat.logs && activeStrat.logs.length > 0) {
        logsBox.textContent = activeStrat.logs.join('\n');
      } else {
        logsBox.textContent = 'No events logged yet.';
      }
    }

    // Sync manual play display panel
    const mState = data.manualPlayState || { balance: 1000, activeBet: null, stats: { wins: 0, losses: 0 }, logs: [] };
    if (document.activeElement !== manualBalanceInput) {
      manualBalanceInput.value = Number(mState.balance).toFixed(2);
    }
    const mBet = mState.activeBet;
    if (mBet) {
      manualActiveBetVal.textContent = `₹${mBet.quantity} on ${mBet.target} (Period ${mBet.period})`;
      manualActiveBetVal.style.color = '#fbbf24';
      manualCancelBetBtn.style.display = 'inline-block';
    } else {
      manualActiveBetVal.textContent = 'None';
      manualActiveBetVal.style.color = '';
      manualCancelBetBtn.style.display = 'none';
    }

    const mWins = mState.stats?.wins || 0;
    const mLosses = mState.stats?.losses || 0;
    const mTotal = mWins + mLosses;
    const mAcc = mTotal > 0 ? Math.round((mWins / mTotal) * 100) : 0;
    manualAccuracyVal.textContent = `Wins: ${mWins} | Losses: ${mLosses} (${mAcc}%)`;

    if (mState.logs && mState.logs.length > 0) {
      manualLogsBox.textContent = mState.logs.join('\n');
    } else {
      manualLogsBox.textContent = 'No manual games played yet.';
    }

    // Update Combined Bot Balance
    const totalBotBalance = strategies.reduce((acc, strat) => acc + (parseFloat(strat.demoBalance) || 0), 0);
    if (combinedBalanceVal) {
      combinedBalanceVal.textContent = `₹${totalBotBalance.toFixed(2)}`;
    }

    // Update Combined Initial Balance
    const totalInitialBalance = strategies.reduce((acc, strat) => {
      const init = strat.initialBalance !== undefined ? parseFloat(strat.initialBalance) : (parseFloat(strat.demoBalance) || 100);
      return acc + init;
    }, 0);
    if (combinedInitialBalanceVal) {
      combinedInitialBalanceVal.textContent = `₹${totalInitialBalance.toFixed(2)}`;
    }

    // Update Combined Net Profit
    if (combinedPnLVal) {
      const netProfit = totalBotBalance - totalInitialBalance;
      const formattedProfit = netProfit >= 0 ? `+₹${netProfit.toFixed(2)}` : `-₹${Math.abs(netProfit).toFixed(2)}`;
      combinedPnLVal.textContent = formattedProfit;
      combinedPnLVal.style.color = netProfit >= 0 ? '#34d399' : '#f87171';
    }



    // Render Global Pause Status
    const now = Date.now();
    if (data.globalCooldownUntil && now < data.globalCooldownUntil) {
      if (globalPauseRow) {
        globalPauseRow.style.display = 'flex';
        const remainingMs = data.globalCooldownUntil - now;
        const remainingSecs = Math.ceil(remainingMs / 1000);
        const mins = Math.floor(remainingSecs / 60);
        const secs = remainingSecs % 60;
        if (globalPauseBadge) {
          globalPauseBadge.textContent = `GLOBAL PAUSE ACTIVE: ${mins}m ${secs}s`;
        }
      }
      if (triggerGlobalPauseBtn) {
        triggerGlobalPauseBtn.textContent = 'Cancel Global Pause';
        triggerGlobalPauseBtn.style.color = '#34d399';
        triggerGlobalPauseBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      }
    } else {
      if (globalPauseRow) {
        globalPauseRow.style.display = 'none';
      }
      if (triggerGlobalPauseBtn) {
        triggerGlobalPauseBtn.textContent = 'Pause All Bots';
        triggerGlobalPauseBtn.style.color = '#f87171';
        triggerGlobalPauseBtn.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      }
    }

    // Render recent draws
    if (recentDrawsVal) {
      recentDrawsVal.innerHTML = '';
      if (data.recentDraws && data.recentDraws.length > 0) {
        data.recentDraws.forEach(draw => {
          const dot = document.createElement('div');
          dot.className = `draw-dot draw-dot-${draw.result.toLowerCase()}`;
          dot.textContent = draw.result === 'Big' ? 'B' : 'S';
          dot.title = `Period: ${draw.period}\nResult: ${draw.result}`;
          recentDrawsVal.appendChild(dot);
        });
      } else {
        recentDrawsVal.textContent = 'Waiting for data...';
      }
    }
  });
}

// React to changes in local storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    updateLiveStatus();
  }
});

// ADD NEW STRATEGY
addStratBtn.addEventListener('click', () => {
  saveCurrentStrategyToMemory();

  const newId = `strat-${Date.now()}`;
  const newNum = currentStrategies.length + 1;
  const newStrat = {
    id: newId,
    name: `Strategy ${newNum}`,
    enabled: false,
    streakLimit: 2,
    betDirection: 'opposite',
    stakingSystem: 'martingale',
    baseQuantity: 10,
    maxSteps: 3,
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
  };

  currentStrategies.push(newStrat);
  currentActiveId = newId;

  chrome.storage.local.set({
    strategies: currentStrategies,
    activeStrategyId: currentActiveId
  }, () => {
    loadSettings();
  });
});

// DELETE STRATEGY
deleteStratBtn.addEventListener('click', () => {
  if (currentStrategies.length <= 1) return;

  const confirmDelete = confirm(`Are you sure you want to delete the active Strategy?`);
  if (!confirmDelete) return;

  const activeIndex = currentStrategies.findIndex(s => s.id === currentActiveId);
  currentStrategies.splice(activeIndex, 1);

  // Select another active strategy
  currentActiveId = currentStrategies[0].id;

  chrome.storage.local.set({
    strategies: currentStrategies,
    activeStrategyId: currentActiveId
  }, () => {
    loadSettings();
  });
});

// Cancel active bets
cancelBetBtn.addEventListener('click', () => {
  const strat = currentStrategies.find(s => s.id === currentActiveId);
  if (strat) {
    strat.activeBet = null;
    strat.cooldownUntil = 0;
    
    const time = new Date().toLocaleTimeString();
    if (!strat.logs) strat.logs = [];
    strat.logs.unshift(`[${time}] [MANUAL] Active bet/cooldown deleted manually.`);
    
    chrome.storage.local.set({ strategies: currentStrategies });
  }
});

// Edit balance input event (change and input)
function updateBalanceFromUI() {
  const strat = currentStrategies.find(s => s.id === currentActiveId);
  if (strat) {
    const val = parseFloat(demoBalanceInput.value) || 0;
    strat.demoBalance = val;
    strat.initialBalance = val;
    chrome.storage.local.set({ strategies: currentStrategies });
  }
}
demoBalanceInput.addEventListener('change', updateBalanceFromUI);
demoBalanceInput.addEventListener('input', updateBalanceFromUI);

// Clear logs for active strategy only
clearLogsBtn.addEventListener('click', () => {
  const strat = currentStrategies.find(s => s.id === currentActiveId);
  if (strat) {
    strat.logs = [];
    chrome.storage.local.set({ strategies: currentStrategies }, () => {
      logsBox.textContent = 'No events logged yet.';
    });
  }
});

// Reset Demo Balance (Resets only the active strategy's balance)
resetDemoBtn.addEventListener('click', () => {
  const strat = currentStrategies.find(s => s.id === currentActiveId);
  if (strat) {
    let startVal = 100;
    if (strat.id === 'strat-1') startVal = 100;
    else if (strat.id === 'strat-2') startVal = 300;

    strat.demoBalance = startVal;
    strat.initialBalance = startVal;
    strat.activeBet = null;
    strat.cooldownUntil = 0;
    strat.winStreak = { current: 0, max: 0 };
    strat.consecutiveLosses = 0;
    
    const time = new Date().toLocaleTimeString();
    strat.logs = [`[${time}] [SIMULATOR] Simulator reset. Balance at ₹${startVal.toFixed(2)}, win streaks and cooldowns cleared.`];

    chrome.storage.local.set({ strategies: currentStrategies }, () => {
      loadSettings();
    });
  }
});

metaBotTabBtn.addEventListener('click', () => {
  saveCurrentStrategyToMemory();
  currentActiveId = 'meta-bot';
  chrome.storage.local.set({ activeStrategyId: currentActiveId }, () => {
    loadSettings();
  });
});
metaBotToggle.addEventListener('change', saveSettings);
metaLossLimitInput.addEventListener('change', saveSettings);
metaWinLimitInput.addEventListener('change', saveSettings);

const downloadJsonBtn = document.getElementById('download-json-btn');
if (downloadJsonBtn) {
  downloadJsonBtn.addEventListener('click', () => {
    chrome.storage.local.get('fullHistory', (data) => {
      const history = data.fullHistory || [];
      if (history.length === 0) {
        alert("No data stored yet. Wait for a draw.");
        return;
      }
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "wingo_300_history.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  });
}

// Event Bindings for inputs (automatic save on toggling options)
saveBtn.addEventListener('click', saveSettings);
enabledToggle.addEventListener('change', saveSettings);
waitStreakToggle.addEventListener('change', saveSettings);
autoSwitchToggle.addEventListener('change', () => {
  autoSwitchSettings.style.display = autoSwitchToggle.checked ? 'flex' : 'none';
  saveSettings();
});
autoSwitchTargetSelect.addEventListener('change', saveSettings);

streakLimitInput.addEventListener('change', saveSettings);
baseQuantityInput.addEventListener('change', saveSettings);
maxStepsInput.addEventListener('change', saveSettings);

betModeSelect.addEventListener('change', () => {
  adjustUIForModes();
  saveSettings();
});

stakingSystemSelect.addEventListener('change', () => {
  adjustUIForModes();
  saveSettings();
});

betDirectionSelect.addEventListener('change', saveSettings);
cooldownTimeInput.addEventListener('change', saveSettings);
lossCooldownLimitInput.addEventListener('change', saveSettings);
lossCooldownTimeInput.addEventListener('change', saveSettings);
stakingMultiplierInput.addEventListener('change', saveSettings);
customSequenceInput.addEventListener('change', saveSettings);

// Manual Play logic implementation
function updateManualBalanceFromUI() {
  chrome.storage.local.get({ manualPlayState: { balance: 1000, activeBet: null, stats: { wins: 0, losses: 0 }, logs: [] } }, (data) => {
    const mState = data.manualPlayState;
    mState.balance = parseFloat(manualBalanceInput.value) || 0;
    chrome.storage.local.set({ manualPlayState: mState });
  });
}
manualBalanceInput.addEventListener('change', updateManualBalanceFromUI);
manualBalanceInput.addEventListener('input', updateManualBalanceFromUI);

function placeManualBet(target) {
  chrome.storage.local.get({
    latestPeriod: '-',
    manualPlayState: { balance: 1000, activeBet: null, stats: { wins: 0, losses: 0 }, logs: [] }
  }, (data) => {
    const latestPeriod = data.latestPeriod;
    if (latestPeriod === '-') {
      alert("Waiting for game draw data. Please make sure the Wingo page is open.");
      return;
    }

    const mState = data.manualPlayState;
    const nextPeriod = incrementPeriod(latestPeriod);

    if (mState.activeBet && mState.activeBet.period === nextPeriod) {
      alert(`You already placed a bet for the upcoming Period ${nextPeriod}. Please wait for it to complete.`);
      return;
    }

    const amount = parseFloat(manualBetAmountInput.value) || 0;
    if (amount <= 0) {
      alert("Please enter a valid bet amount.");
      return;
    }

    if (mState.balance < amount) {
      alert(`Insufficient balance! Your current manual play balance is ₹${mState.balance.toFixed(2)}.`);
      return;
    }

    // Deduct balance and place bet
    mState.balance = Number((mState.balance - amount).toFixed(2));
    mState.activeBet = {
      period: nextPeriod,
      target: target,
      quantity: amount
    };

    const time = new Date().toLocaleTimeString();
    if (!mState.logs) mState.logs = [];
    mState.logs.unshift(`[${time}] Placed manual bet: ₹${amount} on ${target} for Period ${nextPeriod}.`);
    if (mState.logs.length > 25) mState.logs.pop();

    chrome.storage.local.set({ manualPlayState: mState });
  });
}

manualBidBigBtn.addEventListener('click', () => placeManualBet('Big'));
manualBidSmallBtn.addEventListener('click', () => placeManualBet('Small'));

manualCancelBetBtn.addEventListener('click', () => {
  chrome.storage.local.get({
    manualPlayState: { balance: 1000, activeBet: null, stats: { wins: 0, losses: 0 }, logs: [] }
  }, (data) => {
    const mState = data.manualPlayState;
    if (mState.activeBet) {
      mState.balance = Number((mState.balance + mState.activeBet.quantity).toFixed(2));
      const time = new Date().toLocaleTimeString();
      mState.logs.unshift(`[${time}] Bet cancelled manually. Refunded ₹${mState.activeBet.quantity.toFixed(2)}.`);
      mState.activeBet = null;
      chrome.storage.local.set({ manualPlayState: mState });
    }
  });
});

manualResetStatsBtn.addEventListener('click', () => {
  const confirmReset = confirm("Are you sure you want to reset your manual play balance, stats, and logs?");
  if (!confirmReset) return;

  const mState = {
    balance: 1000,
    activeBet: null,
    stats: { wins: 0, losses: 0 },
    logs: [`[${new Date().toLocaleTimeString()}] Manual play reset. Balance at ₹1000.00.`]
  };
  chrome.storage.local.set({ manualPlayState: mState });
});

// Global Pause Trigger
if (triggerGlobalPauseBtn) {
  triggerGlobalPauseBtn.addEventListener('click', () => {
    chrome.storage.local.get({ globalCooldownUntil: 0 }, (data) => {
      const now = Date.now();
      if (data.globalCooldownUntil && now < data.globalCooldownUntil) {
        // Cancel Global Pause
        chrome.storage.local.set({ globalCooldownUntil: 0 }, () => {
          updateLiveStatus();
        });
      } else {
        // Trigger Global Pause
        const mins = parseFloat(globalPauseTimeInput.value) || 1;
        const until = now + mins * 60 * 1000;
        chrome.storage.local.set({ globalCooldownUntil: until }, () => {
          updateLiveStatus();
        });
      }
    });
  });
}

// Boot
document.addEventListener('DOMContentLoaded', loadSettings);
updateLiveStatus();
setInterval(updateLiveStatus, 1000);
