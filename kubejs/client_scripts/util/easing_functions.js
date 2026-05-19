function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

function easeInOut(t, power) {
    if (t < 0.5) {
        return Math.pow(2 * t, power) / 2;
    } else {
        return 1 - Math.pow(-2 * t + 2, power) / 2;
    }
}

function easeZeroOneZero(t, power) {
    if (t <= 0.5) {
        return easeInOut(2 * t, power)
    } else {
        return 1 - easeInOut(2 * (t - 0.5), power)
    }
}

function easeOneZeroOne(t, power){
    if (t <= 0.5) {
        return 1 - easeInOut(2 * t, power)
    } else {
        return easeInOut(2 * (t - 0.5), power)
    }
}


