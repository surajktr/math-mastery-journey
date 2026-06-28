import json

def load_data(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            text = f.read().strip()
            if not text.startswith('['): text = '[' + text
            if not text.endswith(']'): text = text + ']'
            data = json.loads(text)
    except Exception as e:
        print("Error loading:", e)
        return []
    
    data = data[:300]
    data.reverse()
    
    parsed = []
    for row in data:
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

def simulate_strategy(data, direction, shield_limit, tp, tp_pause, sl, sl_pause, seq, initial_balance):
    balance = initial_balance
    checkpoint = initial_balance
    active_bet = None
    
    pause_until = 0
    current_time = 0
    time_per_draw = 60 * 1000
    
    max_steps = len(seq)
    
    for draw in data:
        current_time += time_per_draw
        result = draw['result']
        
        if current_time < pause_until:
            continue
            
        if active_bet:
            win = (result == active_bet['target'])
            
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
                
            if not active_bet:
                profit = balance - checkpoint
                loss = checkpoint - balance
                
                if balance <= 0:
                    return 0 # Bankrupt
                
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
                if direction == 'same':
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
                    
    return balance

def run_compounding():
    data = load_data(r'C:\Users\Suraj\Downloads\wingo_300_history (20).json')
    
    # These are the absolute best settings discovered from test_blocks.py
    # We will scale the base bet to be roughly 30% of the starting balance of that block.
    # We also scale TP and SL proportionally.
    
    blocks = [
        # (direction, base_seq_used_in_test, shield, tp, tpp, sl, slp)
        ('same', 30, 0, 20, 5, 50, 5),      # Block 1
        ('opposite', 20, 0, 50, 5, 0, 0),   # Block 2
        ('opposite', 20, 0, 20, 5, 30, 2),  # Block 3
        ('opposite', 10, 0, 20, 2, 30, 5),  # Block 4
        ('opposite', 20, 0, 20, 5, 30, 5),  # Block 5
        ('same', 20, 0, 20, 0, 50, 5)       # Block 6
    ]
    
    balance = 100
    print("--- COMPOUNDING SIMULATION START ---")
    print(f"Starting Balance: ₹{balance}\n")
    
    for i, config in enumerate(blocks):
        direction, base_test, shield, tp_test, tpp, sl_test, slp = config
        
        # Safe scaling logic: max base of 30
        if balance < 200:
            scaled_base = 10
        elif balance < 500:
            scaled_base = 20
        else:
            scaled_base = 30
            
        scaling_factor = scaled_base / base_test
        
        scaled_seq = [int(scaled_base), int(scaled_base*2), int(scaled_base*4)]
        scaled_tp = int(tp_test * scaling_factor)
        scaled_sl = int(sl_test * scaling_factor)
        
        print(f"Block {i+1} (Draws {i*50} to {(i+1)*50})")
        print(f"Starting Balance: ₹{balance:.2f}")
        print(f"Applying Setting: {direction.upper()}, Seq: {scaled_seq}, TP: {scaled_tp}, SL: {scaled_sl}")
        
        block_data = data[i*50 : (i+1)*50]
        
        new_balance = simulate_strategy(
            block_data, direction, shield, 
            scaled_tp, tpp, scaled_sl, slp, 
            scaled_seq, balance
        )
        
        profit = new_balance - balance
        print(f"Block Profit: +₹{profit:.2f}\n")
        
        balance = new_balance
        if balance <= 0:
            print("BANKRUPT!")
            break
            
    print(f"FINAL BALANCE: ₹{balance:,.2f}")

if __name__ == '__main__':
    run_compounding()
