import json, itertools

file_path = r"C:\Users\Suraj\Downloads\wingo_300_history (9).json"
with open(file_path, "r", encoding="utf-8") as f:
    text = f.read().strip()
    data = json.loads(text if text.startswith("[") else f"[{text}]")
data.sort(key=lambda x: int(x["period"]))

def simulate(limit, tp, tp_pause, sl, sl_pause, run_mins, pause_mins, balance=300):
    initial_balance, streak_count, last_result = balance, 0, None
    active_bet, cooldown_until, wait_streak_type = None, 0, None
    
    cycle_ms = (run_mins + pause_mins) * 60000 if (run_mins > 0 and pause_mins > 0) else 0
    run_ms, checkpoint, current_time = run_mins * 60000, balance, 1700000000000 
    
    for row in data:
        current_time += 60000 
        result = "Small" if "small" in row["result"].lower() else "Big"
        
        if result == last_result: streak_count += 1
        else: streak_count, last_result = 1, result
            
        if active_bet:
            if result == active_bet["target"]:
                balance += active_bet["quantity"] * 0.96 
                active_bet = None if active_bet["step"] == 3 else {"target": active_bet["target"], "quantity": active_bet["quantity"] * 2, "step": active_bet["step"] + 1}
            else:
                balance -= active_bet["quantity"]
                active_bet = None
                
            if tp > 0 and (balance - checkpoint) >= tp:
                cooldown_until, checkpoint, active_bet = current_time + (tp_pause * 60000), balance, None
            elif sl > 0 and (checkpoint - balance) >= sl:
                cooldown_until, checkpoint, active_bet = current_time + (sl_pause * 60000), balance, None
                
            if balance <= 0: return balance - initial_balance

        if not active_bet:
            in_cycle_pause = cycle_ms > 0 and (current_time % cycle_ms) >= run_ms
            if current_time < cooldown_until: continue
                
            if limit > 0:
                if not wait_streak_type and streak_count >= limit: wait_streak_type = result
                if wait_streak_type:
                    if result == wait_streak_type: continue
                    wait_streak_type = None
            
            if in_cycle_pause: continue

            if streak_count >= 1:
                active_bet = {"target": "Small" if result == "Big" else "Big", "quantity": 10, "step": 1}
                
    return balance - initial_balance

prof_screenshot = simulate(5, 100, 1, 20, 1, 0, 0)

params = [(l, tp, tpp, sl, slp, r, p) for l, tp, tpp, sl, slp, r in itertools.product(
    [0, 3, 4, 5, 6], [20, 50, 100, 150], [1, 2, 3], [20, 30, 40], [1, 3, 5], [0, 15, 30]
) for p in ([0, 1, 2] if r > 0 else [0])]

results = [(simulate(*p), p) for p in params]
prof_5, p5 = max(r for r in results if r[1][0] == 5)
prof_all, pall = max(results)

print(f"--- YOUR EXACT SCREENSHOT SETTINGS ---\nProfit: {prof_screenshot}")
print(f"\n--- BEST PROFIT WITH LIMIT 5 ---\nProfit: {prof_5}\nTP: {p5[1]}, TP Pause: {p5[2]}\nSL: {p5[3]}, SL Pause: {p5[4]}\nRun: {p5[5]}, Pause: {p5[6]}")
print(f"\n--- ABSOLUTE BEST PROFIT (ALL LIMITS) ---\nProfit: {prof_all}\nLimit: {pall[0]}\nTP: {pall[1]}, TP Pause: {pall[2]}\nSL: {pall[3]}, SL Pause: {pall[4]}\nRun: {pall[5]}, Pause: {pall[6]}")
