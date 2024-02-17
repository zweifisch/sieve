import {
  assertEquals,
} from "https://deno.land/std@0.216.0/testing/asserts.ts"
import { SieveCache } from "./mod.ts"


Deno.test("should evict", async (t) => {

  const cache = new SieveCache<string>(3)
  cache.set('A', 'a')
  cache.set('B', 'b')
  cache.set('C', 'c')

  await assertEquals(cache.toString(), `\
[ ] C
[ ] B
[ ] A`)

  cache.set('D', 'd')
  await assertEquals(cache.toString(), `\
[ ] D
[ ] C
[ ] B`)

  cache.get('B')
  await assertEquals(cache.toString(), `\
[ ] D
[ ] C
[X] B`)

  cache.set('E', 'e')
  await assertEquals(cache.toString(), `\
[ ] E
[ ] D
[ ] B`)

})
