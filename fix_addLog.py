import sys

with open('chrome-extension/content.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace("addLog(`Error: Target button", "console.log(`Error: Target button")
js = js.replace("addLog(`[REAL MODE] Clicking", "console.log(`[REAL MODE] Clicking")
js = js.replace("addLog(`Error: Popup input", "console.log(`Error: Popup input")
js = js.replace("addLog(`[REAL MODE] Setting Quantity", "console.log(`[REAL MODE] Setting Quantity")
js = js.replace("addLog(`Error: Popup submit button", "console.log(`Error: Popup submit button")
js = js.replace("addLog(`[REAL MODE] Confirming", "console.log(`[REAL MODE] Confirming")

with open('chrome-extension/content.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Replaced addLog with console.log in content.js!")
