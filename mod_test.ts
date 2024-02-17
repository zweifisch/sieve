import {
  assertEquals,
} from "https://deno.land/std@0.216.0/testing/asserts.ts"
import { SieveCache } from "./mod.ts"


Deno.test("should evict", (t) => {

  const cache = new SieveCache<string>(3)
  cache.set('A', 'a')
  cache.set('B', 'b')
  cache.set('C', 'c')

  assertEquals(cache.toString(), `\
  [ ] C
  [ ] B
  [ ] A`)

  cache.set('D', 'd')
  assertEquals(cache.toString(), `\
  [ ] D
  [ ] C
> [ ] B`)

  cache.get('B')
  assertEquals(cache.toString(), `\
  [ ] D
  [ ] C
> [X] B`)

  cache.set('E', 'e')
  assertEquals(cache.toString(), `\
  [ ] E
> [ ] D
  [ ] B`)

  cache.set('D', 'd2')
  assertEquals(cache.toString(), `\
  [ ] E
> [X] D
  [ ] B`)

  assertEquals(cache.get('D'), 'd2')

  assertEquals(cache.get('B'), 'b')

  assertEquals(cache.toString(), `\
  [ ] E
> [X] D
  [X] B`)

  cache.set('F', 'f')
  assertEquals(cache.toString(), `\
  [ ] F
  [ ] D
  [X] B`)

  cache.set('G', 'g')
  assertEquals(cache.toString(), `\
  [ ] G
> [ ] F
  [ ] B`)

})
