import json

def load_data(filepath, limit=300):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    subset = data[:limit]
    subset.reverse()
    
    parsed = []
    for item in subset:
        result = item.get('result')
        if result:
            parsed.append({'period': item.get('period'), 'result': result})
            
    return parsed

def simulate(data, direction, shield_limit, tp, tp_pause, sl, sl_pause, run, pause_time, initial_balance=100, base_qty=10):
    balance = initial_balance
    checkpoint = initial_balance
    active_bet = None
    streak_count = 0
    last_result = None
    wait_streak_type = None
    
    run_ms = run * 60 * 1000
    cycle_ms = (run + pause_time) * 60 * 1000
    
    cooldown_until = 0
    current_time = 0
    time_per_draw = 60 * 1000  # 1 min per draw
    
    # Adaptive trend variables
    history_window = []
    current_adaptive_direction = 'opposite'
    
    for draw in data:
        current_time += time_per_draw
        result = draw['result']
        history_window.append(result)
        
        # Every 10 draws, analyze the last 20 to update adaptive trend
        if direction == 'adaptive' and len(history_window) >= 20 and len(history_window) % 10 == 0:
            last_20 = history_window[-20:]
            same_count = 0
            opp_count = 0
            for i in range(1, 20):
                if last_20[i] == last_20[i-1]:
                    same_count += 1
                else:
                    opp_count += 1
            if same_count > opp_count:
                current_adaptive_direction = 'same'
            else:
                current_adaptive_direction = 'opposite'
        
        if result == last_result:
            streak_count += 1
        else:
            streak_count = 1
            last_result = result
            
        if active_bet:
            win = result == active_bet['target']
            
            # Paroli logic
            if win:
                if active_bet['step'] < 3:
                    active_bet = {
                        'target': active_bet['target'],
                        'quantity': active_bet['quantity'] * 2,
                        'step': active_bet['step'] + 1
                    }
                else:
                    balance += active_bet['quantity'] * 2
                    active_bet = None
            else:
                active_bet = None
                
            if not active_bet:
                profit = balance - checkpoint
                loss = checkpoint - balance
                
                if tp > 0 and profit >= tp:
                    cooldown_until = current_time + (tp_pause * 60 * 1000)
                    checkpoint = balance
                elif sl > 0 and loss >= sl:
                    cooldown_until = current_time + (sl_pause * 60 * 1000)
                    checkpoint = balance
                    
        else:
            in_cycle_pause = False
            if cycle_ms > 0:
                cycle_pos = current_time % cycle_ms
                if cycle_pos >= run_ms:
                    in_cycle_pause = True
                    
            if current_time < cooldown_until:
                continue
                
            if shield_limit > 0:
                if not wait_streak_type and streak_count >= shield_limit:
                    wait_streak_type = result
                if wait_streak_type:
                    if result != wait_streak_type:
                        wait_streak_type = None
                    else:
                        continue
                        
            if in_cycle_pause:
                continue
                
            if streak_count >= 1:
                target = result
                active_dir = current_adaptive_direction if direction == 'adaptive' else direction
                
                if active_dir == 'opposite':
                    target = "Small" if result == "Big" else "Big"
                
                if balance >= base_qty:
                    balance -= base_qty
                    active_bet = {
                        'target': target,
                        'quantity': base_qty,
                        'step': 1
                    }
                    
    return balance - initial_balance

def run_grid_search(filepath):
    try:
        data = load_data(filepath, limit=300)
    except FileNotFoundError:
        print(f"File not found: {filepath}")
        return
        
    print(f"Loaded {len(data)} draws.")
    
    directions = ['opposite', 'same', 'adaptive']
    shield_limits = [0, 3, 4, 5, 6]
    tps = [0, 20, 50, 100]
    tp_pauses = [0, 2, 5]
    sls = [0, 20, 40, 80]
    sl_pauses = [0, 1, 3]
    runs = [0, 15, 30]
    pauses = [0, 2, 5]
    
    best_profit = -999999
    best_config = None
    
    count = 0
    for direction in directions:
        for shield in shield_limits:
            for tp in tps:
                for tpp in tp_pauses:
                    for sl in sls:
                        for slp in sl_pauses:
                            for run in runs:
                                for pause in pauses:
                                    count += 1
                                    
                                    if tp == 0 and tpp > 0: continue
                                    if sl == 0 and slp > 0: continue
                                    if run == 0 and pause > 0: continue
                                    if run > 0 and pause == 0: continue
                                    
                                    profit = simulate(data, direction, shield, tp, tpp, sl, slp, run, pause, initial_balance=100)
                                    if profit > best_profit:
                                        best_profit = profit
                                        best_config = {
                                            'direction': direction,
                                            'shield': shield,
                                            'tp': tp,
                                            'tp_pause': tpp,
                                            'sl': sl,
                                            'sl_pause': slp,
                                            'run': run,
                                            'pause': pause
                                        }

    print("\n🎯 Best Configuration Found")
    print(f"Profit: +₹{best_profit:.2f}")
    print(f"Bet Direction: {best_config['direction'].capitalize()}")
    print(f"Wait for Streak Shield: {best_config['shield']}")
    print(f"Take Profit: {best_config['tp']} (Pause {best_config['tp_pause']}m)")
    print(f"Stop Loss: {best_config['sl']} (Pause {best_config['sl_pause']}m)")
    print(f"Run Duration: {best_config['run']}m")
    print(f"Pause Duration: {best_config['pause']}m")

if __name__ == '__main__':
    run_grid_search(r'C:\Users\Suraj\Downloads\wingo_300_history (4).json')
