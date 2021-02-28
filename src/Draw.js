export function draw(n, range, bonus=0){
    let mainNums = [...Array(n)].map(() => Math.ceil(Math.random()*range));
    let bonusNum = Math.ceil(Math.random()*bonus);
    return {mainNums, bonusNum}
}