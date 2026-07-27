import re

lines = open("src/app/app.html").readlines()

stack = []
for i, line in enumerate(lines):
    line = line.strip()
    
    # Simple heuristic to find @if and @for
    if "@if" in line or "@for" in line or "@defer" in line:
        stack.append(("@block", i+1))
    elif "<div" in line:
        for _ in range(line.count("<div")):
            stack.append(("div", i+1))
    
    if "</div" in line:
        for _ in range(line.count("</div")):
            if stack and stack[-1][0] == "div":
                stack.pop()
            else:
                top = stack[-1] if stack else None
                print(f"Error at line {i+1}: expected {top} to close, but found </div")
                # break
                if stack and stack[-1][0] == "@block":
                    stack.pop() # just to continue
                    if stack and stack[-1][0] == "div":
                        stack.pop()
                    
    # Rough check for block close
    if line.startswith("}") or line.endswith("}"):
        # Ignore string interpolations
        if "{{" not in line and "isLightTheme()" not in line and "}}" not in line:
            if stack and stack[-1][0] == "@block":
                stack.pop()
            else:
                top = stack[-1] if stack else None
                print(f"Error at line {i+1}: expected {top} to close, but found }}")
                # break
                if stack and stack[-1][0] == "div":
                    stack.pop() # just to continue
                    if stack and stack[-1][0] == "@block":
                        stack.pop()
