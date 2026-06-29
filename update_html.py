import sys

with open('chrome-extension/popup.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_tab_html = '      <button id=\"flip-bot-tab\" class=\"tab-btn\" style=\"border: 1px solid rgba(56, 189, 248, 0.5); color: #38bdf8; flex-shrink: 0; padding: 4px 8px; font-size: 11px;\">🔄 Flip Bot</button>\n'

new_panel_html = '''
  <!-- FLIP BOT PANEL -->
  <div id="flip-bot-panel" style="display: none;">
    <div class="switch-container" style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.3); margin-bottom: 12px;">
      <span class="switch-title" style="color: #38bdf8; font-weight: 800;">Enable Advanced Flip Bot</span>
      <label class="switch">
        <input type="checkbox" id="flip-bot-toggle">
        <span class="slider"></span>
      </label>
    </div>
    
    <div class="status-card" style="background: rgba(0,0,0,0.2); border: 1px solid var(--card-border);">
      <div class="row-grid" style="margin-bottom: 10px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label for="flip-bot-sequence" style="color: #a5b4fc;">Staking Sequence:</label>
          <input type="text" id="flip-bot-sequence" value="30, 100, 300">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label for="flip-bot-initial-balance" style="color: #34d399;">Initial Balance (₹):</label>
          <div style="display: flex; gap: 6px;">
            <input type="number" id="flip-bot-initial-balance" value="500" style="flex: 1;">
            <button id="flip-bot-save-balance" class="btn btn-secondary" style="padding: 6px 12px; font-size: 11px; background: #10b981; color: #fff; border: none; white-space: nowrap;">Save</button>
          </div>
        </div>
      </div>

      <div class="row-grid" style="margin-bottom: 10px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label for="flip-bot-system">Staking System</label>
          <select id="flip-bot-system">
            <option value="martingale" selected>Martingale (Increase on Loss)</option>
            <option value="paroli">Paroli (Increase on Win)</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label for="flip-bot-direction">Start Direction</label>
          <select id="flip-bot-direction">
            <option value="opposite" selected>Opposite (Anti-Trend)</option>
            <option value="same">Same (Trend Follow)</option>
          </select>
        </div>
      </div>
      
      <div class="form-group" style="margin-bottom: 10px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px;">
        <label for="flip-bot-rule" style="color: #f472b6;">Flip Rule Selection</label>
        <select id="flip-bot-rule" style="border-color: rgba(244, 114, 182, 0.4);">
          <option value="sliding" selected>Sliding Window (3 Losses in last 6 bets)</option>
          <option value="patient">Patient Mode (Wait for 3 Sequence Failures)</option>
        </select>
      </div>

      <div class="row-grid" style="margin-bottom: 10px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label for="flip-profit-target" style="color: #10b981;">Take Profit (+₹)</label>
          <input type="number" id="flip-profit-target" value="50">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label for="flip-profit-pause" style="color: #34d399;">Pause (Mins)</label>
          <input type="number" id="flip-profit-pause" value="4">
        </div>
      </div>

      <div class="row-grid">
        <div class="form-group" style="margin-bottom: 0;">
          <label for="flip-loss-pause-target" style="color: #f43f5e;">Loss Pause (Loss ≥ ₹)</label>
          <input type="number" id="flip-loss-pause-target" value="100" placeholder="0 = disabled">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label for="flip-loss-pause-mins" style="color: #fb7185;">Pause (Mins)</label>
          <input type="number" id="flip-loss-pause-mins" value="5" placeholder="e.g. 5">
        </div>
      </div>
    </div>

    <!-- Flip Bot Live Status -->
    <div class="status-card" style="background: rgba(56, 189, 248, 0.04); margin-bottom: 10px; margin-top: 10px; border-color: rgba(56, 189, 248, 0.3);">
      <div class="status-row">
        <span class="label" style="font-weight: 700; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
          Balance / Checkpoint
          <button id="flip-bot-reset-btn" class="cancel-btn" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.3); margin-left: 0;">Reset</button>
        </span>
        <span class="value" style="color: #38bdf8;"><span id="flip-balance">₹500</span> / <span id="flip-checkpoint">₹500</span></span>
      </div>
      <div class="status-row">
        <span class="label">Active Direction</span>
        <span class="value" id="flip-active-direction" style="color: #a5b4fc; font-weight: bold;">Opposite</span>
      </div>
      <div class="status-row">
        <span class="label">Sequence Step</span>
        <span class="value" id="flip-active-step" style="color: #fbbf24;">Step 1</span>
      </div>
      <div class="status-row">
        <span class="label">Flips Triggered</span>
        <span class="value" id="flip-count" style="color: #f472b6;">0</span>
      </div>
    </div>
  </div>
'''

new_lines = []
for i, line in enumerate(lines):
    new_lines.append(line)
    if 'id="dual-bot-tab"' in line:
        new_lines.append(new_tab_html)
    if '<!-- ACTIVE STRATEGY TAB CONTENT PANEL -->' in line:
        new_lines.insert(-1, new_panel_html)

with open('chrome-extension/popup.html', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print('popup.html updated successfully!')
