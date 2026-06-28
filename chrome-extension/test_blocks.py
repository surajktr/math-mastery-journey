import json
import os

def load_data(filepath, limit=300):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            text = f.read().strip()
            if not text.startswith('['): text = '[' + text
            if not text.endswith(']'): text = text + ']'
            data = json.loads(text)
    except Exception as e:
        print("Error loading:", e)
        return []
    subset = data[:limit]
    subset.reverse()
    
    parsed = []
    for row in subset:
        if 'result' in row:
            parsed.append({'result': row['result']})
        else:
            try:
                num = int(row['resultNumber'])
                result_type = "Small" if num <= 4 else "Big"
                parsed.append({'result': result_type})
            except:
                pass
            
    return parsed

def simulate_strategy(data, direction, shield_limit, tp, tp_pause, sl, sl_pause, run_mins, pause_mins, seq=[10, 20, 40], initial_balance=100):
    balance = initial_balance
    checkpoint = initial_balance
    active_bet = None
    
    pause_until = 0
    run_start = 0
    is_running = True
    
    current_time = 0
    time_per_draw = 60 * 1000  # 1 min per draw
    
    max_steps = len(seq)
    
    for draw in data:
        current_time += time_per_draw
        result = draw['result']
        
        if current_time < pause_until:
            continue
            
        if run_mins > 0:
            if is_running and (current_time - run_start) >= (run_mins * 60 * 1000):
                is_running = False
                pause_until = current_time + (pause_mins * 60 * 1000)
                continue
            elif not is_running:
                is_running = True
                run_start = current_time
        
        if active_bet:
            win = (result == active_bet['target'])
            
            # Paroli logic
            if win:
                balance += active_bet['amount'] * 2
                if active_bet['step'] < max_steps:
                    nxt = seq[active_bet['step']]
                    if balance >= nxt:
                        balance -= nxt
                        active_bet = {
                            'target': active_bet['target'],
                            'amount': nxt,
                            'step': active_bet['step'] + 1
                        }
                    else:
                        active_bet = None
                else:
                    active_bet = None
            else:
                active_bet = None
                
            # If no active bet, we either finished a Paroli cycle or lost.
            if not active_bet:
                profit = balance - checkpoint
                loss = checkpoint - balance
                
                if balance <= 0:
                    return balance - initial_balance
                
                if tp > 0 and profit >= tp:
                    checkpoint = balance
                    pause_until = current_time + (tp_pause * 60 * 1000)
                elif sl > 0 and loss >= sl:
                    checkpoint = balance
                    pause_until = current_time + (sl_pause * 60 * 1000)
        else:
            streak = 1
            idx = data.index(draw)
            for j in range(idx-1, -1, -1):
                if data[j]['result'] == result:
                    streak += 1
                else:
                    break
                    
            if shield_limit > 0 and streak >= shield_limit:
                continue
                
            if shield_limit == 0 or streak < shield_limit:
                target = None
                if direction == 'same' and streak >= 1:
                    target = result
                if direction == 'opposite':
                    target = "Small" if result == "Big" else "Big"
                
                if balance >= seq[0]:
                    balance -= seq[0]
                    active_bet = {
                        'target': target,
                        'amount': seq[0],
                        'step': 1
                    }
                    
    return balance - initial_balance

def run_blocks(filepath):
    data = load_data(filepath, limit=300)
    print(f"Loaded {len(data)} draws from {filepath}")
    if len(data) < 50:
        print("Not enough data to run even 1 block.")
        return
        
    directions = ['same', 'opposite']
    sequences = [
        [10, 20, 40],
        [20, 40, 80],
        [30, 60, 120]
    ]
    shield_limits = [0, 3, 4, 5, 6]
    tps = [20, 50, 100]
    tp_pauses = [0, 2, 5]
    sls = [0, 30, 50]
    sl_pauses = [0, 2, 5]
    runs = [0, 15]
    pauses = [0, 5]
    
    blocks = [
        (0, 50),
        (50, 100),
        (100, 150),
        (150, 200),
        (200, 250),
        (250, 300)
    ]
    
    for i, (start, end) in enumerate(blocks):
        block_data = data[start:end]
        print(f"\n--- BLOCK {i+1}: Draws {start} to {end} ---")
        
        best_profit = -999999
        best_config = None
        
        for direction in directions:
            for seq in sequences:
                for shield in shield_limits:
                    for tp in tps:
                        for tpp in tp_pauses:
                            for sl in sls:
                                for slp in sl_pauses:
                                    for run in runs:
                                        for pause in pauses:
                                            if tp == 0 and tpp > 0: continue
                                            if sl == 0 and slp > 0: continue
                                            if run == 0 and pause > 0: continue
                                            if run > 0 and pause == 0: continue
                                            
                                            prof = simulate_strategy(block_data, direction, shield, tp, tpp, sl, slp, run, pause, seq=seq)
                                            if prof > best_profit:
                                                best_profit = prof
                                                best_config = {
                                                    'direction': direction,
                                                    'seq': seq,
                                                    'shield': shield,
                                                    'tp': tp,
                                                    'tp_pause': tpp,
                                                    'sl': sl,
                                                    'sl_pause': slp,
                                                    'run': run,
                                                    'pause': pause
                                                }
                                                
        print(f"Profit: +₹{best_profit:.2f}")
        print(f"Direction: {best_config['direction'].capitalize()}")
        print(f"Sequence: {best_config['seq']}")
        print(f"Shield: {best_config['shield']}")
        print(f"TP: {best_config['tp']} (Pause {best_config['tp_pause']}m), SL: {best_config['sl']} (Pause {best_config['sl_pause']}m)")

if __name__ == '__main__':
    run_blocks(r'C:\Users\Suraj\Downloads\wingo_300_history (20).json')
