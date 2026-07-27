with open('src/app/app.html', 'r') as f:
    lines = f.readlines()

blocks = []
for i, line in enumerate(lines):
    line = line.strip()
    
    if "@if" in line or "@for" in line or "@defer" in line:
        blocks.append(("@block", i+1))
    elif "} @else {" in line or "} @else if" in line or "} @empty {" in line:
        if blocks and blocks[-1][0] == "@block":
            blocks.pop()
        blocks.append(("@block", i+1))
    else:
        # Check for standalone }
        import re
        cleanLine = re.sub(r'{{.*?}}', '', line)
        cleanLine = re.sub(r'\{[^\}]*\}', lambda m: m.group(0) if '@' in m.group(0) else '', cleanLine)
        
        # very simple heuristic for finding just a closing bracket
        if cleanLine == '}' or cleanLine.startswith('}'):
             if blocks:
                 blocks.pop()
             else:
                 print(f"Error: unmatched }} at line {i+1}")

print("Remaining open blocks:")
for b, l in blocks:
    print(f"Line {l}: {b}")
