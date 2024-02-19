import {
  assertEquals,
} from "https://deno.land/std@0.216.0/testing/asserts.ts"
import { LFUCache } from "./lfu.ts"


Deno.test("should evict", (t) => {

  const cache = new LFUCache<string>(3)
  cache.set('A', 'a')
  cache.set('B', 'b')
  cache.set('C', 'c')

  assertEquals(cache.toString(), `\
0 A
0 B
0 C`)

  cache.set('D', 'd')
  assertEquals(cache.toString(), `\
0 A
0 B
0 D`)

  cache.get('B')
  assertEquals(cache.toString(), `\
1 B
0 A
0 D`)

  cache.set('E', 'e')
  assertEquals(cache.toString(), `\
1 B
0 A
0 E`)

  cache.set('D', 'd2')
  assertEquals(cache.toString(), `\
1 B
0 A
0 D`)

  assertEquals(cache.get('D'), 'd2')

  assertEquals(cache.get('B'), 'b')

  assertEquals(cache.toString(), `\
2 B
1 D
0 A`)

  cache.set('F', 'f')
  assertEquals(cache.toString(), `\
2 B
1 D
0 F`)

})
