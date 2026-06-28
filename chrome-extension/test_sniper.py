import json

def load_data(filepath, limit=50):
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
    
    # Get last 50 draws (250 to 300)
    subset = data[250:300]
    
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

def simulate_sniper(draws):
    balance = 100
    checkpoint = 100
    active_bet = None
    
    # Sniper settings
    direction = 'opposite'
    shield_limit = 4
    seq = [10, 20, 40]
    tp = 20
    tp_pause_mins = 5
    sl = 30
    sl_pause_mins = 5
    
    pause_until = 0
    current_time = 0
    time_per_draw = 60 * 1000
    
    max_steps = 3
    
    print("--- Simulation Start ---")
    print(f"Starting Balance: ₹{balance}\n")
    
    for i in range(len(draws)):
        current_time += time_per_draw
        result = draws[i]['result']
        
        if current_time < pause_until:
            continue
            
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
                
            if not active_bet:
                profit = balance - checkpoint
                loss = checkpoint - balance
                
                if balance <= 0:
                    print(f"[{i}m] BANKRUPT!")
                    return balance - 100
                
                if profit >= tp:
                    print(f"[{i}m] HIT TAKE PROFIT! +₹{profit} (Balance: ₹{balance}) -> Pausing 5m")
                    checkpoint = balance
                    pause_until = current_time + (tp_pause_mins * 60 * 1000)
                elif loss >= sl:
                    print(f"[{i}m] HIT STOP LOSS! -₹{loss} (Balance: ₹{balance}) -> Pausing 5m")
                    checkpoint = balance
                    pause_until = current_time + (sl_pause_mins * 60 * 1000)
        else:
            streak = 1
            for j in range(i-1, -1, -1):
                if draws[j]['result'] == result:
                    streak += 1
                else:
                    break
                    
            if shield_limit > 0 and streak >= shield_limit:
                continue
                
            if shield_limit == 0 or streak < shield_limit:
                target = "Small" if result == "Big" else "Big"
                
                if balance >= seq[0]:
                    balance -= seq[0]
                    active_bet = {
                        'target': target,
                        'amount': seq[0],
                        'step': 1
                    }
                    
    print("\n--- Simulation End ---")
    print(f"Final Balance: ₹{balance}")
    print(f"Net Profit: ₹{balance - 100}")
    return balance - 100

if __name__ == '__main__':
    draws = load_data(r'C:\Users\Suraj\Downloads\wingo_300_history (20).json')
    simulate_sniper(draws)
