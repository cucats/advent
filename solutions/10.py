from collections import Counter

class Node:
    def __init__(self):
        self.p = self
        self.size = 1

    def find(self):
        if self.p != self:
            self.p = self.p.find()
        return self.p

    def union(self, other):
        p1 = self.find()
        p2 = other.find()
        if p1 != p2:
            p1.p = p2
            p2.size += p1.size

n, m, k, c = map(int, input().split())
init = [int(x) for x in input().split()]
assert k == len(init)
nodes = [Node() for _ in range(n)]
for i in range(m):
    a, b = map(int, input().split())
    nodes[a].union(nodes[b])
count = Counter(nodes[x].find() for x in init)
for p in count:
    print(sorted([x for x in init if nodes[x].find() == p]), count[p], p.size)

# Take the set of 7, set of 5, and set of 1 (ID 9)
