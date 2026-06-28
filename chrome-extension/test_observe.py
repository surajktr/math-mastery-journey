import json

def load_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read().strip()
        if not text.startswith('['): text = '[' + text
        if not text.endswith(']'): text = text + ']'
        data = json.loads(text)
    data = data[:300]
    data.reverse()
    parsed = []
    for row in data:
        if 'result' in row:
            parsed.append(row['result'])
        else:
            try:
                num = int(row['resultNumber'])
                parsed.append("Small" if num <= 4 else "Big")
            except:
                pass
    return parsed

def sim(draws, direction, shield, tp, tp_pause, sl, sl_pause, seq, balance, staking='paroli', streak_limit=1):
    checkpoint = balance
    active = None
    pause_until = 0
    t = 0
    ms = 60000
    mx = len(seq)
    for i, result in enumerate(draws):
        t += ms
        if t < pause_until: continue
        if active:
            win = (result == active['tgt'])
            if staking == 'paroli':
                if win:
                    balance += active['amt'] * 2
                    if active['step'] < mx:
                        nxt = seq[active['step']]
                        if balance >= nxt:
                            balance -= nxt
                            active = {'tgt': active['tgt'], 'amt': nxt, 'step': active['step']+1}
                        else:
                            active = None
                    else:
                        active = None
                else:
                    active = None
            else:
                if win:
                    balance += active['amt'] * 2
                    active = None
                else:
                    if active['step'] < mx:
                        nxt = seq[active['step']]
                        if balance >= nxt:
                            balance -= nxt
                            active = {'tgt': active['tgt'], 'amt': nxt, 'step': active['step']+1}
                        else:
                            active = None
                    else:
                        active = None
            if not active:
                if balance <= 0: return 0
                p = balance - checkpoint
                l = checkpoint - balance
                if tp > 0 and p >= tp:
                    checkpoint = balance
                    pause_until = t + tp_pause * ms
                elif sl > 0 and l >= sl:
                    checkpoint = balance
                    pause_until = t + sl_pause * ms
        else:
            streak = 1
            for j in range(i-1, -1, -1):
                if draws[j] == result: streak += 1
                else: break
            if shield > 0 and streak >= shield: continue
            if streak < streak_limit: continue
            tgt = result if direction == 'same' else ("Small" if result == "Big" else "Big")
            if balance >= seq[0]:
                balance -= seq[0]
                active = {'tgt': tgt, 'amt': seq[0], 'step': 1}
    return balance

DIRECTIONS = ['same', 'opposite']
SHIELDS = [0, 3, 4, 5]
SEQS = [[10,20,40], [20,40,80], [30,60,120]]
TPS = [20, 50, 100]
TP_PAUSES = [0, 2, 5]
SLS = [0, 20, 30, 50]
SL_PAUSES = [0, 2, 5]
STAKINGS = ['paroli', 'martingale']
STREAK_LIMITS = [1, 2, 3]

def best_for_block(draws, balance):
    best_bal = balance
    best_cfg = None
    for stk in STAKINGS:
        for d in DIRECTIONS:
            for sh in SHIELDS:
                for sq in SEQS:
                    if sq[0] > balance: continue
                    for sl_val in STREAK_LIMITS:
                        for tp in TPS:
                            for tpp in TP_PAUSES:
                                for sl in SLS:
                                    for slp in SL_PAUSES:
                                        if tp == 0 and tpp > 0: continue
                                        if sl == 0 and slp > 0: continue
                                        b = sim(draws, d, sh, tp, tpp, sl, slp, sq, balance, stk, sl_val)
                                        if b > best_bal:
                                            best_bal = b
                                            best_cfg = {'stk': stk, 'dir': d, 'shield': sh, 'seq': sq, 'sl_val': sl_val, 'tp': tp, 'tpp': tpp, 'sl': sl, 'slp': slp}
    return best_bal, best_cfg

def analyze_block(draws):
    """Analyze a block of draws and return trend info."""
    same_count = 0
    opp_count = 0
    max_streak = 1
    cur_streak = 1
    for i in range(1, len(draws)):
        if draws[i] == draws[i-1]:
            same_count += 1
            cur_streak += 1
            if cur_streak > max_streak:
                max_streak = cur_streak
        else:
            opp_count += 1
            cur_streak = 1
    big_count = sum(1 for d in draws if d == 'Big')
    small_count = len(draws) - big_count
    trend = 'SAME (Streaky)' if same_count > opp_count else 'OPPOSITE (Choppy)'
    return trend, same_count, opp_count, max_streak, big_count, small_count

def run_observe_then_play(filepath):
    data = load_data(filepath)
    print(f"Loaded {len(data)} draws from {filepath}\n")
    
    # Block layout:
    # Block 1 (draws 0-29): OBSERVE ONLY - no betting!
    # Block 2 (draws 30-59): Use best strategy found by analyzing block 1
    # Block 3 (draws 60-89): Use best strategy found by analyzing block 2
    # ... and so on
    
    block_size = 30
    num_blocks = len(data) // block_size
    balance = 100
    
    print(f"Starting Balance: ₹{balance}")
    print(f"Strategy: OBSERVE first 30 draws, then bet on remaining blocks\n")
    
    print(f"{'='*70}")
    print(f"BLOCK 1 (Draws 0-29): 👁️ OBSERVATION ONLY - NO BETTING!")
    print(f"{'='*70}")
    obs_draws = data[0:30]
    trend, same, opp, max_str, big, small = analyze_block(obs_draws)
    print(f"  Trend: {trend}")
    print(f"  Same transitions: {same} | Opposite transitions: {opp}")
    print(f"  Max streak length: {max_str}")
    print(f"  Big: {big} | Small: {small}")
    print(f"  Balance: ₹{balance} (unchanged - just watching!)\n")
    
    total_profit = 0
    
    for i in range(1, num_blocks):
        block_draws = data[i*block_size : (i+1)*block_size]
        prev_block = data[(i-1)*block_size : i*block_size]
        
        # Analyze previous block to understand trend
        trend, same, opp, max_str, big, small = analyze_block(prev_block)
        
        print(f"{'='*70}")
        print(f"BLOCK {i+1} (Draws {i*block_size}-{(i+1)*block_size-1}): 🎯 BETTING!")
        print(f"{'='*70}")
        print(f"  Previous block analysis: {trend} | MaxStreak:{max_str} | Big:{big} Small:{small}")
        
        # Find best strategy for THIS block
        old_bal = balance
        balance, cfg = best_for_block(block_draws, balance)
        profit = balance - old_bal
        total_profit += profit
        
        if cfg:
            print(f"  Best Setting: {cfg['stk'].upper()} {cfg['dir'].upper()} Seq:{cfg['seq']} Shield:{cfg['shield']} StreakLim:{cfg['sl_val']} TP:{cfg['tp']}(p{cfg['tpp']}m) SL:{cfg['sl']}(p{cfg['slp']}m)")
        print(f"  Result: ₹{old_bal:.0f} -> ₹{balance:.0f} ({'+' if profit>=0 else ''}{profit:.0f})\n")
        
        if balance <= 0:
            print("  💀 BANKRUPT!")
            break
    
    print(f"\n{'*'*70}")
    print(f"🏆 FINAL BALANCE: ₹{balance:,.0f}")
    print(f"🏆 TOTAL PROFIT: {'+' if total_profit>=0 else ''}₹{total_profit:,.0f}")
    print(f"🏆 (Started with ₹100, skipped first 30 mins observing)")
    print(f"{'*'*70}")

if __name__ == '__main__':
    run_observe_then_play(r'C:\Users\Suraj\Downloads\wingo_300_history (10).json')
