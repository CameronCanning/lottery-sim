export function draw(n, range, bonus=0){
    const draws = new Set();
    while (draws.size < n){
        draws.add(Math.ceil(Math.random()*range));
    }
    let bonusNum = Math.ceil(Math.random()*bonus);
    return [draws, bonusNum]
}

export function calcMatches(setA, setB){
    let intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            intersection.add(elem)
        }
    }
    return intersection
}

