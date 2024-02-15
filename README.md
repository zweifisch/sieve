# Sieve

a simple yet efficient cache, [original introduction](https://cachemon.github.io/SIEVE-website/blog/2023/12/17/sieve-is-simpler-than-lru/)

![algo animation](https://cachemon.github.io/SIEVE-website/blog/assets/sieve/sieve_diagram_animation.gif)

## Usage

for Node.js install via npm: `npm install @zf/sieve`

```typescript
import { SieveCache } from '@zf/sieve'

const cache = new SieveCache<string>(3 /* capacity */)
cache.setItem('key', 'value')
cache.getItem('key')
```

## Dev

```sh
deno test --allow-all -- --update
```

```sh
deno run --allow-all build_npm.ts 1.0.0
```
