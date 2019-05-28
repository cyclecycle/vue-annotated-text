// Return true if in range, otherwise false
inRange = (x, min, max) => {
    return ((x - min) * (x - max) <= 0)
}

export { inRange }