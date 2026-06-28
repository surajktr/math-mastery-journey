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

def observe_trend(draws):
    same_count = 0
    opposite_count = 0
    for i in range(1, len(draws)):
        if draws[i]['result'] == draws[i-1]['result']:
            same_count += 1
        else:
            opposite_count += 1
    return 'same' if same_count > opposite_count else 'opposite'

def simulate_betting(draws, balance, direction, base_qty):
    active_bet = None
    seq = [base_qty, base_qty*2, base_qty*4]
    max_steps = 3
    checkpoint = balance
    
    for i in range(len(draws)):
        result = draws[i]['result']
        
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
                
            if balance <= 0:
                return balance
                
            if not active_bet:
                profit = balance - checkpoint
                loss = checkpoint - balance
                if profit >= 20 or loss >= 30:
                    checkpoint = balance # Reset checkpoint, keep betting
                    
        else:
            streak = 1
            for j in range(i-1, -1, -1):
                if draws[j]['result'] == result:
                    streak += 1
                else:
                    break
                    
            if streak >= 3:
                continue # Shield is active
                
            target = None
            if direction == 'same':
                target = result
            else:
                target = "Small" if result == "Big" else "Big"
                
            if balance >= seq[0]:
                balance -= seq[0]
                active_bet = {
                    'target': target,
                    'amount': seq[0],
                    'step': 1
                }
                
    return balance

def run_advanced_simulation(filepath):
    data = load_data(filepath)
    if len(data) < 100:
        print("Not enough data.")
        return
        
    balance = 100
    block_size = 45
    num_blocks = len(data) // block_size
    
    print(f"Starting Balance: ₹{balance}")
    print(f"Total Blocks: {num_blocks} (Each block is 20m observe + 25m bet)\n")
    
    for i in range(num_blocks):
        if balance <= 0:
            print("BANKRUPT! Balance reached ₹0.")
            break
            
        start_idx = i * block_size
        observe_draws = data[start_idx : start_idx + 20]
        bet_draws = data[start_idx + 20 : start_idx + 45]
        
        # 1. Observe trend
        direction = observe_trend(observe_draws)
        
        # 2. Determine base bet
        if balance >= 350:
            base_qty = 15
        else:
            base_qty = 10
            
        print(f"--- Block {i+1} ---")
        print(f"Observation Result: Market is trending '{direction.upper()}'")
        print(f"Current Balance: ₹{balance:.2f} -> Setting Base Quantity to ₹{base_qty}")
        
        # 3. Bet for 25 mins
        balance = simulate_betting(bet_draws, balance, direction, base_qty)
        
        print(f"Balance after 25m betting: ₹{balance:.2f}\n")
        
    print("=========================")
    profit = balance - 100
    print(f"Final Balance: ₹{balance:.2f}")
    if profit >= 0:
        print(f"Final Profit: +₹{profit:.2f}")
    else:
        print(f"Final Profit: -₹{abs(profit):.2f}")

if __name__ == '__main__':
    run_advanced_simulation(r'C:\Users\Suraj\Downloads\wingo_300_history (20).json')
