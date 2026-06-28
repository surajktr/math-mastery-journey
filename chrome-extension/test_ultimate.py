import json
import itertools

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

def sim(draws, direction, shield, tp, tp_pause, sl, sl_pause, seq, balance, staking='paroli', streak_limit=1, win_cool=0, loss_cool=0):
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
                # Double on WIN
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
                    # Win cooldown
                    if not active and win_cool > 0:
                        pause_until = t + win_cool * ms
                else:
                    active = None
                    # Loss cooldown
                    if loss_cool > 0:
                        pause_until = t + loss_cool * ms
            else:
                # Martingale: Double on LOSS
                if win:
                    balance += active['amt'] * 2
                    active = None
                    if win_cool > 0:
                        pause_until = t + win_cool * ms
                else:
                    if active['step'] < mx:
                        nxt = seq[active['step']]
                        if balance >= nxt:
                            balance -= nxt
                            active = {'tgt': active['tgt'], 'amt': nxt, 'step': active['step']+1}
                        else:
                            active = None
                            if loss_cool > 0:
                                pause_until = t + loss_cool * ms
                    else:
                        active = None
                        if loss_cool > 0:
                            pause_until = t + loss_cool * ms
            
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
            if streak < streak_limit: continue  # Wait for streak to build
            tgt = result if direction == 'same' else ("Small" if result == "Big" else "Big")
            if balance >= seq[0]:
                balance -= seq[0]
                active = {'tgt': tgt, 'amt': seq[0], 'step': 1}
    return balance

# All strategy options to test per block
DIRECTIONS = ['same', 'opposite']
SHIELDS = [0, 3, 4, 5]
SEQS = [[10,20,40], [20,40,80], [30,60,120]]
TPS = [20, 50, 100]
TP_PAUSES = [0, 2, 5]
SLS = [0, 20, 30, 50]
SL_PAUSES = [0, 2, 5]
STAKINGS = ['paroli', 'martingale']
STREAK_LIMITS = [1, 2, 3]
WIN_COOLS = [0, 1]
LOSS_COOLS = [0, 1]

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
                                        for wc in WIN_COOLS:
                                            for lc in LOSS_COOLS:
                                                b = sim(draws, d, sh, tp, tpp, sl, slp, sq, balance, stk, sl_val, wc, lc)
                                                if b > best_bal:
                                                    best_bal = b
                                                    best_cfg = {'stk': stk, 'dir': d, 'shield': sh, 'seq': sq, 'sl_val': sl_val, 'tp': tp, 'tpp': tpp, 'sl': sl, 'slp': slp, 'wc': wc, 'lc': lc}
    return best_bal, best_cfg

def run_scenario(data, block_size):
    n = len(data)
    num_blocks = n // block_size
    balance = 100
    results = []
    
    for i in range(num_blocks):
        block = data[i*block_size : (i+1)*block_size]
        old_bal = balance
        balance, cfg = best_for_block(block, balance)
        profit = balance - old_bal
        results.append({
            'block': i+1,
            'start': old_bal,
            'end': balance,
            'profit': profit,
            'cfg': cfg
        })
        if balance <= 0:
            break
    
    return balance, results

def main():
    data = load_data(r'C:\Users\Suraj\Downloads\wingo_300_history (10).json')
    print(f"Loaded {len(data)} draws.\n")
    
    block_sizes = [30, 50, 100]
    
    best_overall = -999
    best_scenario = None
    
    for bs in block_sizes:
        print(f"{'='*60}")
        print(f"SCENARIO: Change strategy every {bs} draws ({bs} minutes)")
        print(f"{'='*60}")
        
        final_bal, results = run_scenario(data, bs)
        profit = final_bal - 100
        
        for r in results:
            c = r['cfg']
            if c:
                print(f"  Block {r['block']}: ₹{r['start']:.0f} -> ₹{r['end']:.0f} ({'+' if r['profit']>=0 else ''}{r['profit']:.0f}) | {c['stk'].upper()} {c['dir'].upper()} Seq:{c['seq']} Shield:{c['shield']} StreakLim:{c['sl_val']} TP:{c['tp']}(p{c['tpp']}m) SL:{c['sl']}(p{c['slp']}m) WinCool:{c['wc']}m LossCool:{c['lc']}m")
            else:
                print(f"  Block {r['block']}: ₹{r['start']:.0f} -> ₹{r['end']:.0f} ({'+' if r['profit']>=0 else ''}{r['profit']:.0f}) | NO CHANGE (stayed flat)")
        
        print(f"\n  FINAL BALANCE: ₹{final_bal:,.0f} | PROFIT: {'+' if profit>=0 else ''}₹{profit:,.0f}\n")
        
        if profit > best_overall:
            best_overall = profit
            best_scenario = {'bs': bs, 'results': results, 'final': final_bal}
    
    print(f"\n{'*'*60}")
    print(f"🏆 WINNER: Change strategy every {best_scenario['bs']} draws!")
    print(f"🏆 MAX PROFIT: +₹{best_overall:,.0f} (₹100 -> ₹{best_scenario['final']:,.0f})")
    print(f"{'*'*60}")

if __name__ == '__main__':
    main()
