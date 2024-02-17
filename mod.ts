export { LRUCache } from './lru.ts'

interface Node<T, U> {
  key: U
  value: T
  visited: boolean
  prev?: Node<T, U>
  next?: Node<T, U>
}

export class SieveCache<T, U = string> {

  capacity: number
  cache: Map<U, Node<T, U>> = new Map()
  head?: Node<T, U>
  tail?: Node<T, U>
  hand?: Node<T, U>
  size = 0

  constructor(capacity: number) {
    this.capacity = capacity
  }

  private addToHead(node: Node<T, U>) {
    if (this.head) {
      node.next = this.head
      this.head.prev = node
    }
    this.head = node
    if (this.tail === undefined) {
      this.tail = node
    }
  }

  private removeNode(node: Node<T, U>) {
    if (node.prev) {
      node.prev.next = node.next
    } else {
      this.head = node.next
    }
    if (node.next) {
      node.next.prev = node.prev
    } else {
      this.tail = node.prev
    }
  }

  private evict() {
    let node = this.hand || this.tail
    while (node && node.visited) {
      node.visited = false
      node = node.prev || this.tail
    }
    if (node) {
      this.hand = node.prev
      this.cache.delete(node.key)
      this.removeNode(node)
      this.size -= 1
    }
  }

  set(key: U, value: T) {
    if (this.cache.has(key)) {
      this.removeNode(this.cache.get(key)!)
      this.size -= 1
    }
    if (this.size === this.capacity) {
      this.evict()
    }
    const newNode = {
      key,
      value,
      visited: false
    }
    this.addToHead(newNode)
    this.cache.set(key, newNode)
    this.size += 1
  }

  get(key: U) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!
      node.visited = true
      return node.value
    }
  }

  toString() {
    let ret = []
    let current = this.head
    while (current) {
      ret.push(`[${current.visited ? 'X' : ' '}] ${current.key}`)
      current = current.next
    }
    return ret.join('\n')
  }
}
