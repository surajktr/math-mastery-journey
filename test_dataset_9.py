import json
import os

file_path = r"C:\Users\Suraj\Downloads\wingo_300_history (9).json"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read().strip()
    if not text.startswith("["): text = "[" + text
    if not text.endswith("]"): text = text + "]"
    data = json.loads(text)

data.sort(key=lambda x: int(x["period"]))

def simulate(limit, tp, tp_pause, sl, sl_pause, run_mins, pause_mins, balance=300):
    initial_balance = balance
    streak_count = 0
    last_result = None
    
    active_bet = None
    cooldown_until = 0
    wait_streak_type = None
    
    cycle_ms = (run_mins + pause_mins) * 60 * 1000 if (run_mins > 0 and pause_mins > 0) else 0
    run_ms = run_mins * 60 * 1000
    
    checkpoint = balance
    current_time = 1700000000000 
    
    for row in data:
        current_time += 60000 
        result = "Small" if "small" in row["result"].lower() or row["result"] == "Small" else "Big"
        
        if result == last_result:
            streak_count += 1
        else:
            streak_count = 1
            last_result = result
            
        if active_bet:
            win = (result == active_bet["target"])
            
            if win:
                balance += active_bet["quantity"] * 0.96 
                
                if active_bet["step"] < 3:
                    active_bet = {
                        "target": active_bet["target"], 
                        "quantity": active_bet["quantity"] * 2,
                        "step": active_bet["step"] + 1
                    }
                else:
                    active_bet = None
            else:
                balance -= active_bet["quantity"]
                active_bet = None
                
            profit = balance - checkpoint
            loss = checkpoint - balance
            
            if tp > 0 and profit >= tp:
                cooldown_until = current_time + (tp_pause * 60000)
                checkpoint = balance
                active_bet = None
            elif sl > 0 and loss >= sl:
                cooldown_until = current_time + (sl_pause * 60000)
                checkpoint = balance
                active_bet = None
                
            if balance <= 0:
                return balance - initial_balance

        if not active_bet:
            in_cycle_pause = False
            if cycle_ms > 0:
                cycle_pos = current_time % cycle_ms
                if cycle_pos >= run_ms:
                    in_cycle_pause = True
            
            if current_time < cooldown_until:
                continue
                
            if limit > 0:
                if not wait_streak_type and streak_count >= limit:
                    wait_streak_type = result
                
                if wait_streak_type:
                    if result != wait_streak_type:
                        wait_streak_type = None
                    else:
                        continue 
            
            if in_cycle_pause:
                continue

            if streak_count >= 1:
                target = "Small" if result == "Big" else "Big"
                active_bet = {
                    "target": target,
                    "quantity": 10,
                    "step": 1
                }
                
    return balance - initial_balance

# Run Screenshot Settings
prof_screenshot = simulate(limit=5, tp=100, tp_pause=1, sl=20, sl_pause=1, run_mins=0, pause_mins=0)

# 1. Test exactly with limit 5
best_profit_5 = -9999
best_params_5 = None

tps = [20, 50, 100, 150]
tpps = [1, 2, 3]
sls = [20, 30, 40]
slps = [1, 3, 5]
runs = [0, 15, 30]
pauses = [0, 1, 2]

for tp in tps:
    for tp_p in tpps:
        for sl in sls:
            for sl_p in slps:
                for r in runs:
                    p_list = pauses if r > 0 else [0]
                    for p in p_list:
                        prof = simulate(5, tp, tp_p, sl, sl_p, r, p)
                        if prof > best_profit_5:
                            best_profit_5 = prof
                            best_params_5 = (5, tp, tp_p, sl, sl_p, r, p)

# 2. Test overall best limit
best_profit_all = -9999
best_params_all = None
limits = [0, 3, 4, 5, 6]
for limit in limits:
    for tp in tps:
        for tp_p in tpps:
            for sl in sls:
                for sl_p in slps:
                    for r in runs:
                        p_list = pauses if r > 0 else [0]
                        for p in p_list:
                            prof = simulate(limit, tp, tp_p, sl, sl_p, r, p)
                            if prof > best_profit_all:
                                best_profit_all = prof
                                best_params_all = (limit, tp, tp_p, sl, sl_p, r, p)

print(f"--- YOUR EXACT SCREENSHOT SETTINGS ---")
print(f"Profit: {prof_screenshot}")

print(f"\n--- BEST PROFIT WITH LIMIT 5 ---")
print(f"Profit: {best_profit_5}")
if best_params_5:
    print(f"TP: {best_params_5[1]}, TP Pause: {best_params_5[2]}")
    print(f"SL: {best_params_5[3]}, SL Pause: {best_params_5[4]}")
    print(f"Run: {best_params_5[5]}, Pause: {best_params_5[6]}")

print(f"\n--- ABSOLUTE BEST PROFIT (ALL LIMITS) ---")
print(f"Profit: {best_profit_all}")
if best_params_all:
    print(f"Limit: {best_params_all[0]}")
    print(f"TP: {best_params_all[1]}, TP Pause: {best_params_all[2]}")
    print(f"SL: {best_params_all[3]}, SL Pause: {best_params_all[4]}")
    print(f"Run: {best_params_all[5]}, Pause: {best_params_all[6]}")
