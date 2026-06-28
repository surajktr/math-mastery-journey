document.addEventListener('DOMContentLoaded', () => {
  const runBtn = document.getElementById('run-optimizer-btn');
  const statusDiv = document.getElementById('optimizer-status');
  const countSpan = document.getElementById('opt-history-count');
  
  const resultsCard = document.getElementById('optimizer-results-card');
  const outProfit = document.getElementById('opt-best-profit');
  const outShield = document.getElementById('opt-shield');
  const outTp = document.getElementById('opt-tp');
  const outTpPause = document.getElementById('opt-tp-pause');
  const outSl = document.getElementById('opt-sl');
  const outSlPause = document.getElementById('opt-sl-pause');
  const outRun = document.getElementById('opt-run');
  const outPause = document.getElementById('opt-pause');
  const outDirection = document.getElementById('opt-direction');
  const outBalance = document.getElementById('opt-balance');
  const outBase = document.getElementById('opt-base-amount');
  
  const applyBtn = document.getElementById('apply-optimizer-btn');
  let currentBestConfig = null;

  if (runBtn) {
    runBtn.addEventListener('click', runDeepScan);
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', applySettings);
  }

  function runDeepScan() {
    chrome.storage.local.get(['fullHistory'], (data) => {
      const history = data.fullHistory || [];
      if (history.length === 0) {
        alert("No history found! Let the extension run on the Wingo page for a while first to collect data.");
        return;
      }
      
      // Keep only up to last 100 draws for speed and relevance
      const dataToScan = history.slice(0, 100).reverse(); // Reverse so oldest is first
      
      runBtn.disabled = true;
      document.getElementById('optimizer-panel').style.display = 'block';
      statusDiv.style.display = 'block';
      resultsCard.style.display = 'none';
      countSpan.textContent = dataToScan.length;

      // Get initial balance and base amount from current UI
      const startingBalance = parseFloat(document.getElementById('demo-balance').value) || 300;
      const baseQuantity = parseInt(document.getElementById('base-quantity').value) || 10;
      
      outBalance.textContent = startingBalance;
      outBase.textContent = baseQuantity;

      // Small timeout to allow UI to update
      setTimeout(() => {
        const bestConfig = simulateGridSearch(dataToScan, startingBalance, baseQuantity);
        currentBestConfig = bestConfig;
        
        if (bestConfig) {
          outProfit.textContent = (bestConfig.profit >= 0 ? '+₹' : '-₹') + Math.abs(bestConfig.profit).toFixed(2);
          outProfit.style.color = bestConfig.profit >= 0 ? '#34d399' : '#f43f5e';
          
          outDirection.textContent = bestConfig.direction === 'opposite' ? 'Opposite' : 'Same';
          outShield.textContent = bestConfig.limit;
          outTp.textContent = bestConfig.tp;
          outTpPause.textContent = bestConfig.tpPause;
          outSl.textContent = bestConfig.sl;
          outSlPause.textContent = bestConfig.slPause;
          outRun.textContent = bestConfig.run;
          outPause.textContent = bestConfig.pause;
          
          resultsCard.style.display = 'block';
        }
        
        runBtn.disabled = false;
        statusDiv.style.display = 'none';
      }, 100);
    });
  }

  function simulateGridSearch(data, startingBalance, baseQuantity) {
    const directions = ['opposite', 'same'];
    const limits = [0, 3, 4, 5, 6];
    const tps = [20, 50, 100, 150];
    const tpps = [1, 2, 3];
    const sls = [20, 30, 40];
    const slps = [1, 3, 5];
    const runs = [0, 15, 30];
    const pauses = [0, 1, 2];

    let bestProfit = -999999;
    let bestParams = null;

    for (const dir of directions) {
      for (const limit of limits) {
        for (const tp of tps) {
          for (const tp_p of tpps) {
            for (const sl of sls) {
              for (const sl_p of slps) {
                for (const r of runs) {
                  const p_list = r > 0 ? pauses : [0];
                  for (const p of p_list) {
                    const prof = simulate(data, startingBalance, baseQuantity, dir, limit, tp, tp_p, sl, sl_p, r, p);
                    if (prof > bestProfit) {
                      bestProfit = prof;
                      bestParams = { direction: dir, limit, tp, tpPause: tp_p, sl, slPause: sl_p, run: r, pause: p, profit: prof };
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return bestParams;
  }

  function simulate(data, startingBalance, baseQuantity, direction, limit, tp, tp_pause, sl, sl_pause, run_mins, pause_mins) {
    let balance = startingBalance;
    const initial_balance = balance;
    let checkpoint = balance;
    
    let streak_count = 0;
    let last_result = null;
    let active_bet = null;
    let cooldown_until = 0;
    let wait_streak_type = null;
    
    let cycle_ms = (run_mins > 0 && pause_mins > 0) ? (run_mins + pause_mins) * 60000 : 0;
    let run_ms = run_mins * 60000;
    
    let current_time = 1700000000000; 

    for (let i = 0; i < data.length; i++) {
      current_time += 60000;
      const row = data[i];
      const result = (row.result.toLowerCase().includes("small") || row.result === "Small") ? "Small" : "Big";
      
      if (result === last_result) {
        streak_count++;
      } else {
        streak_count = 1;
        last_result = result;
      }
      
      if (active_bet) {
        const win = (result === active_bet.target);
        if (win) {
          balance += active_bet.quantity * 0.96;
          if (active_bet.step < 3) {
            active_bet = {
              target: active_bet.target,
              quantity: active_bet.quantity * 2,
              step: active_bet.step + 1
            };
          } else {
            active_bet = null;
          }
        } else {
          balance -= active_bet.quantity;
          active_bet = null;
        }
        
        const profit = balance - checkpoint;
        const loss = checkpoint - balance;
        
        if (tp > 0 && profit >= tp) {
          cooldown_until = current_time + (tp_pause * 60000);
          checkpoint = balance;
          active_bet = null;
        } else if (sl > 0 && loss >= sl) {
          cooldown_until = current_time + (sl_pause * 60000);
          checkpoint = balance;
          active_bet = null;
        }
        
        if (balance <= 0) {
          return balance - initial_balance;
        }
      }

      if (!active_bet) {
        let in_cycle_pause = false;
        if (cycle_ms > 0) {
          const cycle_pos = current_time % cycle_ms;
          if (cycle_pos >= run_ms) {
            in_cycle_pause = true;
          }
        }

        if (current_time < cooldown_until) continue;
        
        if (limit > 0) {
          if (!wait_streak_type && streak_count >= limit) {
            wait_streak_type = result;
          }
          if (wait_streak_type) {
            if (result !== wait_streak_type) {
              wait_streak_type = null;
            } else {
              continue;
            }
          }
        }
        
        if (in_cycle_pause) continue;
        
        if (streak_count >= 1) {
          let target = result;
          if (direction === 'opposite') {
            target = result === "Big" ? "Small" : "Big";
          }
          active_bet = {
            target: target,
            quantity: baseQuantity,
            step: 1
          };
        }
      }
    }
    return balance - initial_balance;
  }

  function applySettings() {
    if (!currentBestConfig) return;
    
    // Get the inputs from popup.html
    const betDirectionSelect = document.getElementById('bet-direction');
    const waitStreakToggle = document.getElementById('wait-streak-toggle');
    const waitStreakLengthInput = document.getElementById('wait-streak-length');
    const takeProfitTargetInput = document.getElementById('take-profit-target');
    const takeProfitPauseInput = document.getElementById('take-profit-pause');
    const stopLossLimitInput = document.getElementById('stop-loss-limit');
    const stopLossPauseInput = document.getElementById('stop-loss-pause');
    const runTimeInput = document.getElementById('strat-run-time');
    const pauseTimeInput = document.getElementById('strat-pause-time');
    
    // Update their values
    betDirectionSelect.value = currentBestConfig.direction;
    if (currentBestConfig.limit > 0) {
      waitStreakToggle.checked = true;
      waitStreakLengthInput.value = currentBestConfig.limit;
    } else {
      waitStreakToggle.checked = false;
    }
    takeProfitTargetInput.value = currentBestConfig.tp;
    takeProfitPauseInput.value = currentBestConfig.tpPause;
    stopLossLimitInput.value = currentBestConfig.sl;
    stopLossPauseInput.value = currentBestConfig.slPause;
    runTimeInput.value = currentBestConfig.run;
    pauseTimeInput.value = currentBestConfig.pause;
    
    // Dispatch a change event on one of them so popup.js triggers saveSettings()
    takeProfitTargetInput.dispatchEvent(new Event('change'));
    
    // Hide the optimizer panel and give feedback
    document.getElementById('optimizer-panel').style.display = 'none';
    alert("✅ Best settings have been applied to this strategy and saved!");
  }
});
