import string

def rot(char, n):
    try:
        i = string.ascii_lowercase.index(char)
        return string.ascii_lowercase[(i + n) % 26]
    except:
        return char

ans = "".join(rot(c, -1 - i % 16) for i, c in enumerate(input()))

print(ans)
