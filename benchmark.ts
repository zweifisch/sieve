import { SieveCache } from './mod.ts'
import { LRUCache } from "./lru.ts"
import { LFUCache } from "./lfu.ts"
// import { LRU as LRUCache } from "https://deno.land/x/lru@1.0.2/mod.ts";

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


interface Cache<T, U> {
  get(key: U): T
  set(key: U, value: T): void
}

function run(cache: Cache<number, number>, numbers: Array<number>) {
  let missed = 0
  for (const num of numbers) {
    if (cache.get(num) === undefined) {
      cache.set(num, num)
      missed += 1
    }
    if (cache.get(num) !== num) {
      throw new Error('cache failed')
    }
  }
  return missed
}

for (let i = 0; i< 2; i ++) {

  const sieveResult = []
  const lruResult = []
  const lfuResult = []

  for (let items = capacity; items <= capacity * 20; items += capacity * 0.1) {
    const numbers = randns.map(x => Math.round(x * items))
    {
      const start = Date.now()
      const cache = new SieveCache(capacity)
      const missed = run(cache, numbers)
      console.log(`SIEVE missed: ${(missed/counts * 100).toFixed(2)}% took: ${Date.now() - start}ms`)
      sieveResult.push({items, missed: missed/counts, took: Date.now() - start})
    }
    {
      const cache = new LRUCache(capacity)
      const start = Date.now()
      const missed = run(cache, numbers)
      console.log(`LRU   missed: ${(missed/counts * 100).toFixed(2)}% took: ${Date.now() - start}ms`)
      lruResult.push({items, missed: missed/counts, took: Date.now() - start})
    }
    {
      const cache = new LFUCache(capacity)
      const start = Date.now()
      const missed = run(cache, numbers)
      console.log(`LFU   missed: ${(missed/counts * 100).toFixed(2)}% took: ${Date.now() - start}ms`)
      lfuResult.push({items, missed: missed/counts, took: Date.now() - start})
    }
  }

  console.log('const sieveResult =', JSON.stringify(sieveResult))
  console.log('const lruResult =', JSON.stringify(lruResult))
  console.log('const lfuResult =', JSON.stringify(lfuResult))
}
