import {
  assertSnapshot,
} from "https://deno.land/std@0.216.0/testing/snapshot.ts";
import {
  assertEquals,
} from "https://deno.land/std@0.216.0/testing/asserts.ts"
import { SieveCache } from "./mod.ts"


Deno.test("should evict", async (t) => {

  const cache = new SieveCache<string>(3)
  cache.setItem('A', 'a')
  cache.setItem('B', 'b')
  cache.setItem('C', 'c')

  await assertSnapshot(t, cache.toString())

  cache.setItem('D', 'd')

  await assertSnapshot(t, cache.toString())

  // cache.getItem('B')
  // cache.setItem('E', 'e')


})
