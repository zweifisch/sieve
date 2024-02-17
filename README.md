# sieve

a simple yet efficient cache, [original introduction](https://cachemon.github.io/SIEVE-website/blog/2023/12/17/sieve-is-simpler-than-lru/)

![algo animation](https://cachemon.github.io/SIEVE-website/blog/assets/sieve/sieve_diagram_animation.gif)

## Usage

for Node.js, install via npm: `npm install @zf/sieve`

```typescript
import { SieveCache, LRUCache } from '@zf/sieve'

const cache = new SieveCache<string>(3 /* capacity */)
cache.set('key', 'value')
cache.get('key')
```

for Deno

```typescript
import { SieveCache, LRUCache } from "https://deno.land/x/sieve/mod.ts"
```

## Benchmark

[Benchmark](/benchmark.ts) reading 1 million normally distributed items through a cache with a capacity of 100 compared with the [LRU](https://deno.land/x/lru@1.0.2) package 
showing SIEVE is more performant, while the cache hit/miss ratio is about the same:

![chart](/chart.png)

It turned out that the LRU package's implementation is not very efficient, so I wrote my own [LRU](/lru.ts), and it actually better than SIEVE:

![chart](/100.png)

Anyway, the cache hit/miss ratio is of much greater importance, and it is determined by the data distribution.

## Dev

```sh
deno test
```

```sh
deno run --allow-all build_npm.ts 1.0.0
```
