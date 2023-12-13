def count(cfg):
    if cfg == "":
        return [""]

    return [x + y for x in ("#." if cfg[0] == "?" else cfg[0])for y in count(cfg[1:])]

total = 0

for i, line in enumerate(open("./day_12/input.txt").readlines()):
    print(i)
    cfg, runs = line.split()
    runs = list(map(int, runs.split(",")))

    for cfg in count(cfg):
        if runs == [len(block) for block in cfg.split(".") if block]:
            total += 1

print(total)