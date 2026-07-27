with open("src/app/app.html", "r") as f:
    lines = f.readlines()

start_idx = 2580 - 1
div_count = 0
end_idx = -1

for i in range(start_idx, len(lines)):
    line = lines[i]
    div_count += line.count("<div")
    div_count -= line.count("</div")
    if div_count == 0:
        end_idx = i
        break

print(f"End index: {end_idx + 1}")
