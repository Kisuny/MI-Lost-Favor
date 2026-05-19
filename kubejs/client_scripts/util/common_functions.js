function lerp(previous, current){
    return previous + (current - previous) * Client.getTimer().getGameTimeDeltaPartialTick(false)
}