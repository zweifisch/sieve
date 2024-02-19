
interface Node<T, U> {
  key: U
  value: T
  freq: number
  prev?: Node<T, U>
  next?: Node<T, U>
}

export class LFUCache<T, U = string> {

  capacity: number
  freqUpperBund: number
  cache: Map<U, Node<T, U>> = new Map()
  head?: Node<T, U>
  tail?: Node<T, U>

  constructor(capacity: number, freqUpperBund = 1024) {
    this.capacity = capacity
    this.freqUpperBund = freqUpperBund
  }

  get(key: U) {
    const node = this.cache.get(key)
    if (node) {
      node.freq += 1
      this.moveForward(node)
      return node.value
    }
  }

  set(key: U, value: T) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!
      node.value = value
      node.freq += 1
      this.moveForward(node)
      return
    }

    if (this.cache.size >= this.capacity) {
      this.cache.delete(this.tail!.key)
      if (this.tail!.prev) {
        this.tail!.prev.next = undefined
      }
      this.tail = this.tail!.prev
    }

    const node: Node<T, U> = { key, value, freq: 0 }
    this.cache.set(key, node)

    if (!this.tail) {
      this.head = this.tail = node
      return
    }

    this.tail.next = node
    node.prev = this.tail
    this.tail = node
  }

  private moveForward(node: Node<T, U>) {
    if (this.head === node) {
      if (node.freq > this.freqUpperBund) {
        node.freq = node.freq >> 1
        while(node.next) {
          node = node.next
          node.freq = node.freq >> 1
        }
      }
      return
    }

    let target = node
    while(target.prev && target.prev.freq < target.freq) {
      target = target.prev
    }

    if (target !== node) {
      if (this.tail === node) {
        this.tail = node.prev
      }
      if (target === this.head) {
        this.head = node
      }

      node.prev!.next = node.next
      if (node.next) {
        node.next.prev = node.prev
      }

      node.prev = target.prev
      node.next = target

      if (target.prev) {
        target.prev.next = node
      }
      target.prev = node
    }
  }

  toString() {
    let ret = []
    let node = this.head
    while (node) {
      ret.push(`${node.freq} ${node.key}`)
      node = node.next
    }
    return ret.join('\n')
  }
}
