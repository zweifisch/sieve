
interface Node<T, U> {
  key: U
  value: T
  prev?: Node<T, U>
  next?: Node<T, U>
}

export class LRUCache<T, U = string> {

  capacity: number
  cache: Map<U, Node<T, U>> = new Map()
  head?: Node<T, U>
  tail?: Node<T, U>

  constructor(capacity: number) {
    this.capacity = capacity
  }

  get(key: U) {
    const node = this.cache.get(key)
    if (node) {
      this.moveToHead(node)
      return node.value
    }
  }

  set(key: U, value: T) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!
      node.value = value
      this.moveToHead(node)
      return
    }

    if (this.cache.size >= this.capacity) {
      this.cache.delete(this.tail!.key)
      if (this.tail!.prev) {
        this.tail!.prev.next = undefined
      }
      this.tail = this.tail!.prev
    }

    const node: Node<T, U> = { key, value }
    this.cache.set(key, node)

    if (!this.head) {
      this.head = this.tail = node
      return
    }

    this.head.prev = node
    node.next = this.head
    this.head = node
  }

  moveToHead(node: Node<T, U>) {
    if (this.head === node) {
      return
    }

    if (this.tail === node) {
      this.tail = node.prev
    }

    node.prev!.next = node.next
    if (node.next) {
      node.next.prev = node.prev
    }

    node.prev = undefined
    node.next = this.head
    this.head!.prev = node
    this.head = node
  }

  toString() {
    let ret = []
    let current = this.head
    while (current) {
      ret.push(current.key)
      current = current.next
    }
    return ret.join('\n')
  }
}
