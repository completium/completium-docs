---
id: doc2
title: FA 1.2 Formal specification
---

## Contract invariant

No token is minted: the total number of tokens is equal to the initial totalsupply number of tokens.

```archetype {0}
specification {
  s1: ledger.sum(tokens) = totalsupply;
}
```

## Transfer postconditions

### Effect on `ledger`

* When the `%to` address is different from the `%from` address, the number of tokens `%to` possesses is decread by value.

```archetype {2,6}
postcondition transfer_p1 {
  %from <> %to ->
  let some before_ledger_from = before.ledger[%from] in
  let some after_ledger_from  = ledger[%from] in
  after_ledger_from = { before_ledger_from with
    tokens = abs(before_ledger_from.tokens - value)
  }
  otherwise false otherwise false
}
```

* When the `%to` address is different from the `%from` address, the number of tokens `%to` possesses is increased by value when `%to` is already registered in the ledger, and set to value otherwise. Anyway, `%to` is registered in ledger.

```archetype {2,6,9}
postcondition transfer_p2 {
  %from <> %to ->
  let some after_ledger_to = ledger[%to] in
  let some before_ledger_to = before.ledger[%to] in
    after_ledger_to = { before_ledger_to with
      tokens = (before_ledger_to.tokens + value)
    }
  otherwise
    after_ledger_to = { holder = %to; tokens = value }
  otherwise false
}
```

* No effect on ledger when `%from` is equal to `%to`.

```archetype {2}
postcondition transfer_p3 {
  %from = %to ->
  ledger = before.ledger
}
```

* Tokenholders other than %from and %to, are not modified nor added to ledger.

```archetype {5}
postcondition transfer_p4 {
  forall tokenholder in ledger,
  tokenholder.holder <> %from ->
  tokenholder.holder <> %to ->
  before.ledger[tokenholder.holder] = some(tokenholder)
}
```

* Tokenholders other than `%from` and `%to`, are not modified nor added to `ledger`.

```archetype {2,5}
postcondition transfer_p5 {
  forall tokenholder in ledger,
  tokenholder.holder <> %from ->
  tokenholder.holder <> %to ->
  before.ledger[tokenholder.holder] = some(tokenholder)
}
```

