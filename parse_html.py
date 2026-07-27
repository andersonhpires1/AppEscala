from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.line_stack = []

    def handle_starttag(self, tag, attrs):
        if tag in ['img', 'br', 'hr', 'input']:
            return
        self.stack.append(tag)
        self.line_stack.append(self.getpos()[0])

    def handle_endtag(self, tag):
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()
            self.line_stack.pop()
        else:
            print(f"Error at line {self.getpos()[0]}: trying to close {tag}, but top of stack is {self.stack[-1] if self.stack else None}")

parser = MyHTMLParser()
with open('src/app/app.html', 'r') as f:
    # We must remove Angular control flow blocks to parse it as plain HTML
    html = f.read()
    
    # Strip all @ blocks
    import re
    # Just replace @if { ... } with empty? No, we can just mask them.
    # Actually, a simpler way is just to strip the @... completely so HTMLParser doesn't trip on it.
    
    # But wait, we don't need to strip @if, HTMLParser just ignores text!
    # Let's just run it!
    parser.feed(html)

print("Remaining open tags:")
for t, l in zip(parser.stack, parser.line_stack):
    print(f"Line {l}: <{t}>")
