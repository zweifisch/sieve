import {
  assertEquals,
} from "https://deno.land/std@0.216.0/testing/asserts.ts"
import { SieveCache } from "./mod.ts"


Deno.test("should evict", async (t) => {

  const cache = new SieveCache<string>(3)
  cache.setItem('A', 'a')
  cache.setItem('B', 'b')
  cache.setItem('C', 'c')

  await assertEquals(cache.toString(), `\
[ ] C
[ ] B
[ ] A`)

  cache.setItem('D', 'd')
  await assertEquals(cache.toString(), `\
[ ] D
[ ] C
[ ] B`)

  cache.getItem('B')
  await assertEquals(cache.toString(), `\
[ ] D
[ ] C
[X] B`)

  cache.setItem('E', 'e')
  await assertEquals(cache.toString(), `\
[ ] E
[ ] D
[ ] B`)

})
