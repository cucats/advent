import math

names="""
Bell
Nova
Stormbreaker
Aspen
Mistletoe
Shadowtail
Starry
Holly
Sparkle
Flurry
Snowflake
Glee
Northwind
Chime
Icicle
Frosttail
Sprinkles
Glacier
Starlash
Frosty
Twinkle
Glacierstride
Arctic
Jingle
Frostfire
Cupid
Winter
Willow
Nebula
Glitter
Comet
Ironhoof
Stardancer
Starbright
Rudolf
Sugarplum
Donner
Frosthorn
Crystal
Arcticbreeze
Tinsel
Pine
Glowmane
Velvet
Celestia
Sunny
Jolly
Shimmer
Cometlight
Cheer
Joy
Moonshadow
Peppermint
Braveheart
Windwhisper
Bliss
Meadow
Merry
Fireswift
Icefang
Eclipse
Icestorm
Buttons
Nightshade
Silverhoof
Dreamwhisper
Thunderhoof
Marshmallow
Cocoa
Dancer
Andromeda
Bubbly
Luna
Vixen
Prancer
Snowmane
River
Solstice
Moonbeam
Aurora
Blizzard
Snowshadow
Harmony
Hope
Chillmane
Dasher
Cookie
Birch
Blitzen
Snickers
Glowhoof
Evergreen
Wintermist
Polaris
Gleamhorn
Snowdrift
Forest
Dazzlehoof
Emberdash
Frostglide
""".split()

R, C = map(int, input().split())
times = []
for i in range(C):
    reindeer, speed, turbo, duration, cooldown = map(int, input().split())
    a_t = duration + cooldown
    a_d = turbo * duration + speed * cooldown
    time = a_t * (R // a_d)
    remaining = R % a_d
    t_t = math.ceil(remaining / turbo)
    if t_t > duration:
        time += duration
        remaining -= duration * turbo
        time += math.ceil(remaining / speed)
    else:
        time += t_t
    times.append((time, reindeer))
print(f"{sorted(times)}")