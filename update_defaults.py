import sys

# 1. Update popup.html
with open('chrome-extension/popup.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('id="flip-bot-sequence" value="30, 100, 300"', 'id="flip-bot-sequence" value="50, 100, 300"')
html = html.replace('id="flip-bot-initial-balance" value="500"', 'id="flip-bot-initial-balance" value="3000"')
html = html.replace('<option value="martingale" selected>Martingale (Increase on Loss)</option>', '<option value="martingale">Martingale (Increase on Loss)</option>')
html = html.replace('<option value="paroli">Paroli (Increase on Win)</option>', '<option value="paroli" selected>Paroli (Increase on Win)</option>')
html = html.replace('<option value="sliding" selected>Sliding Window (3 Losses in last 6 bets)</option>', '<option value="sliding">Sliding Window (3 Losses in last 6 bets)</option>')
html = html.replace('<option value="patient">Patient Mode (Wait for 3 Sequence Failures)</option>', '<option value="patient" selected>Patient Mode (Wait for 3 Sequence Failures)</option>')
html = html.replace('id="flip-profit-target" value="50"', 'id="flip-profit-target" value="100"')
html = html.replace('id="flip-loss-pause-target" value="100"', 'id="flip-loss-pause-target" value="0"')
html = html.replace('id="flip-loss-pause-mins" value="5"', 'id="flip-loss-pause-mins" value="0"')

with open('chrome-extension/popup.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update content.js
with open('chrome-extension/content.js', 'r', encoding='utf-8') as f:
    cjs = f.read()

cjs = cjs.replace("flipBotSequence: '30, 100, 300'", "flipBotSequence: '50, 100, 300'")
cjs = cjs.replace("flipBotInitialBalance: 500", "flipBotInitialBalance: 3000")
cjs = cjs.replace("flipBotSystem: 'martingale'", "flipBotSystem: 'paroli'")
cjs = cjs.replace("flipBotRule: 'sliding'", "flipBotRule: 'patient'")
cjs = cjs.replace("flipProfitTarget: 50", "flipProfitTarget: 100")
cjs = cjs.replace("flipLossPauseTarget: 100", "flipLossPauseTarget: 0")
cjs = cjs.replace("flipLossPauseMins: 5", "flipLossPauseMins: 0")
cjs = cjs.replace("const fInitBal = settings.flipBotInitialBalance || 500;", "const fInitBal = settings.flipBotInitialBalance || 3000;")

with open('chrome-extension/content.js', 'w', encoding='utf-8') as f:
    f.write(cjs)

print("Defaults updated successfully!")
