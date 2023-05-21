# Linked list

## Definition

In computer science, a linked list is a linear collection of data elements, in which linear order is not given by their
physical placement in memory. Instead, each element points to the next. It is a data structure consisting of a
collection of nodes which together represent a sequence. In its most basic form, each node contains: data, and a
reference (in other words, a link) to the next node in the sequence. This structure allows for efficient insertion or
removal of elements from any position in the sequence during iteration. More complex variants add additional links,
allowing more efficient insertion or removal of nodes at arbitrary positions. A drawback of linked lists is that access
time is linear (and difficult to pipeline). Faster access, such as random access, is not feasible. Arrays have better
cache locality compared to linked lists.

![img.png](img.png)

#### pseudocode for basic operations

```pseudocode
add(value)
    Pre: value is the value to add to the list
    Post: value has been placed at the tail of the list
    n ← node(value)
    if head = ø
        head ← n
        tail ← n
    else
        tail.next ← n
        tail ← n
    end if
end add
```

```pseudocode
prepend(value)
    Pre: value is the value to add to the list
    Post: value has been placed at the head of the list
    n ← node(value)
    n.next ← head
    head ← n
    if tail = ø
        tail ← n
    end if
end prepend
```

#### Search
```pseudocode
contains(head, value)
    Pre: head is the head node in the list
         value is the value to search for
    Post: the item is either in the linked list, true; otherwise false
    n ← head
    while n != ø and n.value != value
        n ← n.next
    end while
    if n = ø
        return false
    end if
    return true
end contains
```

#### Delete

```pseudocode
delete(head, value)
    Pre: head is the head node in the list
         value is the value to delete from the list
    Post: value is deleted from the list, true, otherwise false
    if head = ø
        return false
    end if
    n ← head
    if n.value = value
        if head = tail
            head ← ø
            tail ← ø
        else
            head ← head.next
        end if
        return true
    end if
    while n.next != ø and n.next.value != value
        n ← n.next
    end while
    if n.next != ø
        if n.next = tail
            tail ← n
        end if
        n.next ← n.next.next
        return true
    end if
    return false
end delete
```

#### traverse

```pseudocode
traverse(head)
    Pre: head is the head node in the list
    Post: the items in the list have been traversed
    n ← head
    while n != ø
        yield n.value
        n ← n.next
    end while
end traverse
```


#### traverse in reverse

```pseudocode
traverseReverse(head, tail)
    Pre: head and tail belong to the same list
    Post: the items in the list have been traversed in reverse order
    if tail != ø
        curr ← tail
        while curr != head
            prev ← head
            while prev.next != curr
                prev ← prev.next
            end while
            yield curr.value
            curr ← prev
        end while
        yield curr.value
    end if
end traverseReverse
```

