# Sieve

a simple yet efficient cache, [original introduction](https://cachemon.github.io/SIEVE-website/blog/2023/12/17/sieve-is-simpler-than-lru/)

![algo animation](https://cachemon.github.io/SIEVE-website/blog/assets/sieve/sieve_diagram_animation.gif)

## Usage

for Node.js install via npm: `npm install @zf/sieve`

```typescript
import { SieveCache } from '@zf/sieve'

const cache = new SieveCache<string>(3 /* capacity */)
cache.set('key', 'value')
cache.get('key')
```

for Deno

```typescript
import { SieveCache} from "https://deno.land/x/sieve/mod.ts"
```

## Benchmark

[benchmark](/benchmark.ts) reading 1 million normally distributed items through a cache with a capacity of 100 compared with LRU,
it is more performant:

![chart](/chart.png)

## Dev

```sh
deno test
```

```sh
deno run --allow-all build_npm.ts 1.0.0
```
