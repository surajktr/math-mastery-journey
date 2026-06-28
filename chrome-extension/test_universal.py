import json
import glob
import os

def load_data(filepath, limit=300):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except:
        return []
    subset = data[:limit]
    subset.reverse()
    
    parsed = []
    for item in subset:
        result = item.get('result')
        if not result:
            bigSmallText = item.get('bigSmall', '').lower()
            numText = str(item.get('number', ''))
            if 'small' in bigSmallText:
                result = 'Small'
            elif 'big' in bigSmallText:
                result = 'Big'
            else:
                try:
                    num = int(numText)
                    result = 'Small' if num <= 4 else 'Big'
                except:
                    pass
                    
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
    
    for draw in data:
        current_time += time_per_draw
        result = draw['result']
        
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
                if direction == 'opposite':
                    target = "Small" if result == "Big" else "Big"
                
                if balance >= base_qty:
                    balance -= base_qty
                    active_bet = {
                        'target': target,
                        'quantity': base_qty,
                        'step': 1
                    }
                    
    return balance - initial_balance

def run_universal_search():
    files = glob.glob(r'C:\Users\Suraj\Downloads\wingo_300_history*.json')
    datasets = []
    total_draws = 0
    for f in files:
        data = load_data(f, limit=300)
        if len(data) > 0:
            datasets.append(data)
            total_draws += len(data)
            
    print(f"Loaded {len(datasets)} datasets with a total of {total_draws} draws.")
    
    directions = ['opposite', 'same']
    shield_limits = [3, 4, 5, 6]  # Avoid 0 for universal safety
    tps = [20, 50, 100]
    tp_pauses = [2, 5]
    sls = [20, 30, 40]
    sl_pauses = [1, 2, 3]
    runs = [0, 15, 30]
    pauses = [0, 2, 5]
    
    best_profit = -999999
    best_config = None
    
    for direction in directions:
        for shield in shield_limits:
            for tp in tps:
                for tpp in tp_pauses:
                    for sl in sls:
                        for slp in sl_pauses:
                            for run in runs:
                                for pause in pauses:
                                    
                                    if run == 0 and pause > 0: continue
                                    if run > 0 and pause == 0: continue
                                    
                                    total_profit = 0
                                    survived = 0
                                    for data in datasets:
                                        profit = simulate(data, direction, shield, tp, tpp, sl, slp, run, pause, initial_balance=100)
                                        total_profit += profit
                                        if profit > -90:  # Didn't get completely wiped out
                                            survived += 1
                                            
                                    # Find absolute max total profit across all data
                                    if total_profit > best_profit:
                                        best_profit = total_profit
                                        best_config = {
                                            'direction': direction,
                                            'shield': shield,
                                            'tp': tp,
                                            'tp_pause': tpp,
                                            'sl': sl,
                                            'sl_pause': slp,
                                            'run': run,
                                            'pause': pause,
                                            'survived': survived
                                        }

    if best_config:
        print("\n🏆 Universal Best Configuration (Across All Files)")
        print(f"Total Cumulative Profit: +₹{best_profit:.2f}")
        print(f"Survival Rate: {best_config['survived']}/{len(datasets)} files")
        print(f"Bet Direction: {best_config['direction'].capitalize()}")
        print(f"Wait for Streak Shield: {best_config['shield']}")
        print(f"Take Profit: {best_config['tp']} (Pause {best_config['tp_pause']}m)")
        print(f"Stop Loss: {best_config['sl']} (Pause {best_config['sl_pause']}m)")
        print(f"Run Duration: {best_config['run']}m")
        print(f"Pause Duration: {best_config['pause']}m")
    else:
        print("No safe configuration found that survives across multiple datasets.")

if __name__ == '__main__':
    run_universal_search()
