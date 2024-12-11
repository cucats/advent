import sys

HEX_DIGITS = "0123456789ABCDEF"

if len(sys.argv) < 2:
    print("Usage: python jollyscript.py <prog> [--trace]")
    exit(1)

with open(sys.argv[1]) as f:
    prog = f.read().splitlines()

ret_x = 0
ret_y = 0
stack = list[int]()
printing_mode = False
trace = list[str]()
x0 = prog[0].index("*")
call_stack = [(x0, 0, -1)]

while call_stack:
    x, y, d = call_stack.pop()
    try:
        c = prog[y][x]
    except:
        c = " "
    trace.append(c)
    match c:
        case "~":
            pass
        case '"':
            printing_mode = not printing_mode
            call_stack.append((x + d, y + 1, d))
        case _ if printing_mode:
            print(c, end="")
            call_stack.append((x + d, y + 1, d))
        case "{":
            ret_x = x
            ret_y = y
            call_stack.append((x + d, y + 1, d))
        case "}": call_stack.append((ret_x, ret_y, d))
        case "/": call_stack.append((x - 1, y + 1, -1))
        case "\\": call_stack.append((x + 1, y + 1, 1))
        case "^":
            call_stack.append((x + 1, y + 1, 1))
            call_stack.append((x - 1, y + 1, -1))
        case ":":
            v = stack.pop()
            stack.append(v)
            stack.append(v)
            call_stack.append((x + d, y + 1, d))
        case "%":
            v1 = stack.pop()
            v2 = stack.pop()
            stack.append(v1)
            stack.append(v2)
            call_stack.append((x + d, y + 1, d))
        case "+":
            stack.append((stack.pop() + stack.pop()) % 16)
            call_stack.append((x + d, y + 1, d))
        case "-":
            stack.append((-stack.pop() + stack.pop()) % 16)
            call_stack.append((x + d, y + 1, d))
        case "$":
            stack.pop()
            call_stack.append((x + d, y + 1, d))
        case "?":
            if stack[-1]:
                stack[-1] -= 1
                call_stack.append((x + 1, y + 1, 1))
            else:
                call_stack.append((x - 1, y + 1, -1))
        case "n":
            print()
            call_stack.append((x + d, y + 1, d))
        case _ if c in HEX_DIGITS:
            stack.append(int(c, 16))
            call_stack.append((x + d, y + 1, d))
        case ".":
            print(HEX_DIGITS[stack[-1] % 16], end="")
            call_stack.append((x + d, y + 1, d))
        case _:
            call_stack.append((x + d, y + 1, d))

if len(sys.argv) >= 3 and sys.argv[2] == "--trace":
    print(f"\n\nTrace:\n{"".join(trace)}")
    print(stack)
