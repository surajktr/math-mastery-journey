import sys

with open('chrome-extension/popup.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add Hard Stop Balance Inputs
hard_stops_html = '''
      <div class="row-grid" style="margin-top: 15px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label for="flip-hard-stop-loss" style="color: #ef4444;">Hard Stop Loss (Balance ≤)</label>
          <input type="number" id="flip-hard-stop-loss" placeholder="e.g. 500">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label for="flip-hard-stop-target" style="color: #10b981;">Hard Target (Balance ≥)</label>
          <input type="number" id="flip-hard-stop-target" placeholder="e.g. 1500">
        </div>
      </div>
'''

html = html.replace('</div>\n\n    <!-- Flip Bot Live Status -->', hard_stops_html + '\n    </div>\n\n    <!-- Flip Bot Live Status -->')

# 2. Add Net Profit and Active Bet UI rows to Live Status Card
status_ui_html = '''
      <div class="status-row">
        <span class="label">Net Profit</span>
        <span class="value" id="flip-net-profit" style="color: #34d399; font-weight: bold;">+₹0</span>
      </div>
      <div class="status-row">
        <span class="label">Active Bet State</span>
        <span class="value" id="flip-active-bet" style="color: #fbbf24; font-weight: bold;">None</span>
      </div>
'''
html = html.replace('<div class="status-row">\n        <span class="label">Active Direction</span>', status_ui_html + '      <div class="status-row">\n        <span class="label">Active Direction</span>')

with open('chrome-extension/popup.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("popup.html updated!")
