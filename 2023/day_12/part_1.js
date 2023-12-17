function count(cfg, nums) {
    if (cfg == "") {
        return nums.length == 0 ? 1 : 0;
    }

    if (nums.length == 0) {
        return cfg.includes("#") ? 0 : 1;
    }

    let result = 0;

    if (cfg[0] == "." || cfg[0] == "?") {
        result += count(cfg.slice(1), nums);
    }

    if (cfg[0] == "#" || cfg[0] == "?") {
        if (nums[0] <= cfg.length && !cfg.slice(0, nums[0]).includes(".") && (nums[0] == cfg.length || cfg[nums[0]] != "#")) {
            result += count(cfg.slice(nums[0] + 1), nums.slice(1));
        }
    }

    return result;
}

let total = 0;

for (let line of require("fs").readFileSync('./day_12/input.txt', "utf8").split("\n")) {
    let [cfg, nums] = line.split(" ");
    nums = nums.split(",").map(Number);
    total += count(cfg, nums);
}

console.log(total);
