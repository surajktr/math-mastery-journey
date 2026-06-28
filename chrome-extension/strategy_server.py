"""
Strategy Optimizer Server
Run this: python strategy_server.py
It will start on http://localhost:8787
The Chrome extension sends draw data here every 30 draws.
First 30 draws = observe only, then it returns the best strategy.
"""

import json
import time
from http.server import HTTPServer, BaseHTTPRequestHandler

# â”€â”€â”€ Simulation Engine (same logic as test_ultimate.py) â”€â”€â”€

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

def find_best_strategy(draws, balance):
    """Brute-force the best strategy for given draws and balance."""
    directions = ['same', 'opposite']
    shields = [0, 3, 4, 5]
    streak_limits = [1, 2, 3]
    stakings = ['paroli', 'martingale']
    tps = [20, 50, 100]
    tp_pauses = [0, 2, 5]
    sls = [0, 20, 30, 50]
    sl_pauses = [0, 2, 5]
    
    # Pick sequences based on balance
    if balance < 200:
        seqs = [[10,20,40], [20,40,80]]
    elif balance < 500:
        seqs = [[10,20,40], [20,40,80], [30,60,120]]
    else:
        seqs = [[20,40,80], [30,60,120]]
    
    best_bal = balance
    best_cfg = None
    tested = 0
    
    for stk in stakings:
        for d in directions:
            for sh in shields:
                for sq in seqs:
                    if sq[0] > balance: continue
                    for sl_val in streak_limits:
                        for tp in tps:
                            for tpp in tp_pauses:
                                for sl in sls:
                                    for slp in sl_pauses:
                                        if tp == 0 and tpp > 0: continue
                                        if sl == 0 and slp > 0: continue
                                        tested += 1
                                        b = sim(draws, d, sh, tp, tpp, sl, slp, sq, balance, stk, sl_val)
                                        if b > best_bal:
                                            best_bal = b
                                            best_cfg = {
                                                'stakingSystem': stk,
                                                'direction': d,
                                                'shieldLimit': sh,
                                                'sequence': sq,
                                                'streakLimit': sl_val,
                                                'takeProfit': tp,
                                                'takeProfitPause': tpp,
                                                'stopLoss': sl,
                                                'stopLossPause': slp,
                                                'baseQuantity': sq[0],
                                                'maxSteps': len(sq)
                                            }
    
    return best_bal, best_cfg, tested

def analyze_trend(draws):
    """Quick trend analysis of draws."""
    same = 0
    opp = 0
    max_streak = 1
    cur = 1
    for i in range(1, len(draws)):
        if draws[i] == draws[i-1]:
            same += 1
            cur += 1
            if cur > max_streak: max_streak = cur
        else:
            opp += 1
            cur = 1
    big = sum(1 for d in draws if d == 'Big')
    small = len(draws) - big
    trend = 'SAME' if same > opp else 'OPPOSITE'
    return {
        'trend': trend,
        'sameCount': same,
        'oppositeCount': opp,
        'maxStreak': max_streak,
        'bigCount': big,
        'smallCount': small
    }

# â”€â”€â”€ State â”€â”€â”€
state = {
    'initialBalance': 100,
    'currentBalance': 100,
    'totalProfit': 0,
    'blockNumber': 0,
    'isObserving': True,
    'history': [],
    'currentStrategy': None
}

# â”€â”€â”€ HTTP Server â”€â”€â”€

class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()
    
    def do_GET(self):
        if self.path == '/status':
            self.send_response(200)
            self._cors()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            resp = {
                'running': True,
                'blockNumber': state['blockNumber'],
                'isObserving': state['isObserving'],
                'initialBalance': state['initialBalance'],
                'currentBalance': state['currentBalance'],
                'totalProfit': state['totalProfit'],
                'currentStrategy': state['currentStrategy']
            }
            self.wfile.write(json.dumps(resp).encode())
        elif self.path == '/ping':
            self.send_response(200)
            self._cors()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'alive': True}).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        if self.path == '/analyze':
            length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(length))
            
            draws = body.get('draws', [])
            balance = body.get('balance', state['currentBalance'])
            initial = body.get('initialBalance', state['initialBalance'])
            block_num = body.get('blockNumber', state['blockNumber'] + 1)
            
            state['initialBalance'] = initial
            state['currentBalance'] = balance
            state['blockNumber'] = block_num
            
            print(f"\n{'='*60}")
            print(f"ðŸ“¡ Block {block_num} received! ({len(draws)} draws)")
            print(f"   Current Balance: â‚¹{balance:.0f}")
            
            # Analyze trend
            trend = analyze_trend(draws)
            print(f"   Trend: {trend['trend']} (Same:{trend['sameCount']} Opp:{trend['oppositeCount']} MaxStreak:{trend['maxStreak']})")
            
            if block_num == 1:
                print(f"   👁️   OBSERVATION COMPLETE - Switching to Betting Mode!")
            else:
                print(f"   🎯 BETTING BLOCK - Optimizing strategy...")
                state['isObserving'] = False
                start = time.time()
                best_bal, best_cfg, tested = find_best_strategy(draws, balance)
                elapsed = time.time() - start
                
                state['currentStrategy'] = best_cfg
                projected = best_bal - balance
                state['totalProfit'] = balance - state['initialBalance']
                
                print(f"   Tested {tested:,} combinations in {elapsed:.1f}s")
                if best_cfg:
                    print(f"   🎯 APPLYING: {best_cfg['stakingSystem'].upper()} {best_cfg['direction'].upper()} Seq:{best_cfg['sequence']}")
                    print(f"   Shield:{best_cfg['shieldLimit']} StreakLim:{best_cfg['streakLimit']} TP:{best_cfg['takeProfit']}(p{best_cfg['takeProfitPause']}m) SL:{best_cfg['stopLoss']}(p{best_cfg['stopLossPause']}m)")
                    print(f"   Projected profit: +₹{projected:.0f}")
                print(f"   Total Profit so far: ₹{state['totalProfit']:.0f}")
                
                self.send_response(200)
                self._cors()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                resp = {
                    'action': 'apply',
                    'strategy': best_cfg,
                    'trend': trend,
                    'projectedProfit': projected,
                    'totalProfit': state['totalProfit'],
                    'combinationsTested': tested
                }
                self.wfile.write(json.dumps(resp).encode())
        
        elif self.path == '/reset':
            state['initialBalance'] = 100
            state['currentBalance'] = 100
            state['totalProfit'] = 0
            state['blockNumber'] = 0
            state['isObserving'] = True
            state['history'] = []
            state['currentStrategy'] = None
            print("\nðŸ”„ AI Server State Reset!")
            
            self.send_response(200)
            self._cors()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'reset'}).encode())
        
        elif self.path == '/set-balance':
            length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(length))
            state['initialBalance'] = body.get('initialBalance', 100)
            state['currentBalance'] = state['initialBalance']
            state['totalProfit'] = 0
            state['blockNumber'] = 0
            state['isObserving'] = True
            state['currentStrategy'] = None
            
            print(f"\nðŸ’° Initial balance set to â‚¹{state['initialBalance']}")
            print(f"   Ready to receive draws!")
            
            self.send_response(200)
            self._cors()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'ok': True, 'initialBalance': state['initialBalance']}).encode())
        
        elif self.path == '/reset':
            state['initialBalance'] = 100
            state['currentBalance'] = 100
            state['totalProfit'] = 0
            state['blockNumber'] = 0
            state['isObserving'] = True
            state['currentStrategy'] = None
            
            print(f"\nðŸ”„ State reset!")
            
            self.send_response(200)
            self._cors()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'ok': True}).encode())
        
        else:
            self.send_response(404)
            self.end_headers()
    
    def log_message(self, format, *args):
        pass  # Suppress default logging

def main():
    port = 8787
    server = HTTPServer(('localhost', port), Handler)
    print(f"""
â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
â•‘          ðŸ§  STRATEGY OPTIMIZER SERVER                    â•‘
â•‘          Running on http://localhost:{port}               â•‘
â• â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•£
â•‘  The Chrome extension will connect automatically.        â•‘
â•‘  First 30 draws = Observation only (no betting).         â•‘
â•‘  After that, it will auto-apply the best strategy        â•‘
â•‘  every 30 draws.                                         â•‘
â•‘                                                          â•‘
â•‘  Press Ctrl+C to stop the server.                        â•‘
â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
""")
    print("Waiting for Chrome extension to connect...\n")
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n\nServer stopped.")
        server.server_close()

if __name__ == '__main__':
    main()
