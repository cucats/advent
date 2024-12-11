n = int(input())
points = []
for i in range(n):
    x, y = map(int, input().split())
    points.append((x, y))
points = [(x - points[-1][0], y - points[-1][1]) for x, y in points]
ans = max(points, key=lambda p: p[0] * p[0] + p[1] * p[1])
print(ans)
