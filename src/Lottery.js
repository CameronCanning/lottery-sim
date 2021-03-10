export function draw(n, range){
    const draws = new Set();
    while (draws.size < n){
        draws.add(Math.ceil(Math.random()*range));
    }
    return draws
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

