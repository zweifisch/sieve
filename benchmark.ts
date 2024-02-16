import { SieveCache } from './mod.ts'
import { LRU } from "https://deno.land/x/lru@1.0.2/mod.ts";

function randGaussian() {
  let u = 0
  let v = 0
  while(u === 0) u = Math.random()
  while(v === 0) v = Math.random()
  const num = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * 0.1 + 0.5
  return 0 <= num && num <= 1 ? num : randGaussian()
}

const counts = 1_000_000
const capacity = 100
const randns = Array(counts).fill(0).map(randGaussian)


for (let i = 0; i< 2; i ++) {

  const sieveResult = []
  const lruResult = []

  for (let items = 100; items < 2_000; items += 20) {
    const numbers = randns.map(x => Math.round(x * items))
    {
      const cache = new SieveCache(capacity)
      let missed = 0
      const start = Date.now()
      for (const num of numbers) {
        if (cache.getItem(num) === undefined) {
          cache.setItem(num, num)
          missed += 1
        }
        if (cache.getItem(num) !== num) {
          // throw new Error('cache failed')
        }
      }
      console.log(`SIEVE missed: ${(missed/counts * 100).toFixed(2)}% took: ${Date.now() - start}ms`)
      sieveResult.push({items, missed: missed/counts, took: Date.now() - start})
    }
    {
      const cache = new LRU(capacity)
      let missed = 0
      const start = Date.now()
      for (const num of numbers) {
        if (cache.get(num) === undefined) {
          cache.set(num, num)
          missed += 1
        }
        if (cache.get(num) !== num) {
          // throw new Error('cache failed')
        }
      }
      console.log(`LRU   missed: ${(missed/counts * 100).toFixed(2)}% took: ${Date.now() - start}ms`)
      lruResult.push({items, missed: missed/counts, took: Date.now() - start})
    }
  }

  console.log('const sieveResult =', JSON.stringify(sieveResult))
  console.log('const lruResult =', JSON.stringify(lruResult))

}