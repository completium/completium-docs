---
id: doc2
title: FA 1.2 Formal specification
---

import Separator from '@site/src/components/Separator';

## Contract invariant

No token is minted: the total number of tokens is equal to the initial totalsupply number of tokens.

```archetype {0}
ledger.sum(tokens) = totalsupply
```

## `transfer` postconditions

### Effect on `ledger`

<Separator />

When the `%to` address is different from the `%from` address, the number of tokens `%to` possesses is decread by value.

```archetype {1,5}
%from <> %to ->
let some before_ledger_from = before.ledger[%from] in
let some after_ledger_from  = ledger[%from] in
after_ledger_from = { before_ledger_from with
  tokens = abs(before_ledger_from.tokens - value)
}
otherwise false otherwise false
```

<Separator />

When the `%to` address is different from the `%from` address, the number of tokens `%to` possesses is increased by value when `%to` is already registered in the ledger, and set to value otherwise. Anyway, `%to` is registered in ledger.

```archetype {1,5,8}
%from <> %to ->
let some after_ledger_to = ledger[%to] in
let some before_ledger_to = before.ledger[%to] in
  after_ledger_to = { before_ledger_to with
    tokens = (before_ledger_to.tokens + value)
  }
otherwise
  after_ledger_to = { holder = %to; tokens = value }
otherwise false
```

<Separator />

No effect on `ledger` when `%from` is equal to `%to`.

```archetype {1}
%from = %to ->
ledger = before.ledger
```

<Separator />

Tokenholders other than `%from` and `%to`, are not modified nor added to `ledger`.

```archetype {4}
forall tokenholder in ledger,
  tokenholder.holder <> %from ->
  tokenholder.holder <> %to ->
  before.ledger[tokenholder.holder] = some(tokenholder)
```

<Separator />

The added record in `ledger`, if any, is the `%to` record.

```archetype {2,4}
let some before_to = before.ledger[%to] in
  added.ledger.isempty()
otherwise
  added.ledger = [ { holder = %to; tokens = value } ]
```

### Effect on `allowance`

<Separator />

When caller is different from `%from`, the amount caller is authorised to spend on the behalf of `%from` is decreased by value if value is striclty greated than the authorized amount.

```archetype
caller <> %from ->
let some before_from_caller = before.allowance[(%from,caller)] in
let some after_from_caller = allowance[(%from,caller)] in
  before_from_caller.amount > value ->
  after_from_caller = { before_from_caller with
    amount = abs (before_from_caller.amount - value)
  }
otherwise false
otherwise true
```

