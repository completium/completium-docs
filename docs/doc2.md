---
id: doc2
title: Formal specification
---

import Separator from '@site/src/components/Separator';

## Contract invariant

No token is minted: the total number of tokens is equal to the initial totalsupply number of tokens.

```archetype {0}
ledger.sum(tokens) = totalsupply
```

## `transfer` postconditions

```archetype
specification entry %transfer (%from : address, %to : address, value : nat)
```

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

<Separator />

No effect on `allowance` when `caller` is equal to `%from`.

```archetype
caller = %from -> allowance = before.allowance
```

<Separator />

Allowed amounts other than those associated to `%from` and `caller` are identical.

```archetype {2,3}
forall a in allowance,
a.addr_owner <> %from and a.addr_spender <> caller ->
before.allowance[(a.addr_owner,a.addr_spender)] = some(a)
```

<Separator />

No allowance record is added or removed.

```archetype
removed.allowance.isempty() and added.allowance.isempty()
```

### Explicit `fail`

<Separator />

When the entry fails with message `"NotEnoughBalance"`, value is stricly greater than the number of tokens of `%to`. Cannot spend more than you own.

```archetype
fails with (msg : string) :
  let some after_ledger_from = ledger[%from] in
    msg = "NotEnoughBalance" and
    after_ledger_from.tokens < value
  otherwise true
```

<Separator />

When the entry fails with message `"NotEnoughAllowance"`, `caller` is different from %from and value is stricly greater than the allowed amount for `%from` and `caller`. A spender cannot spend more than allowed.

```archetype
fails with (msg : string * (nat * nat)) :
  let some after_allowance_from_caller = allowance[(%from,caller)] in
    msg = ("NotEnoughAllowance", (value, after_allowance_from_caller.amount)) and
    caller <> %from and
    after_allowance_from_caller.amount < value
  otherwise false
```

### Operations

No operation generated.

```archetype
length(operations) = 0
```

## `approve` postconditions

```archetype
specification entry approve(spender : address, value : nat)
```

### Effect on `ledger`

No effect on ledger.

```archetype
ledger = before.ledger
```

### Effect on `allowance`

<Separator />

Allowed amount of tokens spendable by `spender` on the behalf of `caller` is set to `value`.

```archetype {4,8,9,10}
let some after_allowance_caller_spender = allowance[(caller,spender)] in
let some before_allowance_caller_spender = before.allowance[(caller,spender)] in
  after_allowance_caller_spender = { before_allowance_caller_spender with
    amount = value
  }
otherwise
  after_allowance_caller_spender = {
    addr_owner = caller;
    addr_spender = spender;
    amount = value
  }
otherwise false
```

<Separator />

Other allowed amounts than the allowed amount of tokens spendable by `spender` on the behalf of `caller`, are unchanged.

```archetype {3}
forall a in allowance,
  (a.addr_owner, a.addr_spender) <> (caller, spender) ->
  before.allowance[(a.addr_owner, a.addr_spender)] = some(a)
```

<Separator />

The added `allowance` record, if any, is the `caller` and `spender` one.

```archetype {2,4}
let some allowance_caller_spender = before.allowance[(caller, spender)] in
  added.allowance.isempty()
otherwise
  added.allowance = [ { addr_owner = caller; addr_spender = spender; amount = value } ]
```

<Separator />

No record is removed from allowance.

```archetype
removed.allowance.isempty()
```

### Explicit `fail`

When the entry fails with message `"UnsafeAllowanceChange"`, `value` is strictly greater than 0 and the allowed amount of tokens spendable by `spender` on the behalf of `caller` is not equal to zero.

```archetype
fails with (msg : (string * nat)) :
let some allowance_caller_spender = allowance[(caller,spender)] in
  msg = ("UnsafeAllowanceChange", allowance_caller_spender.amount) and
  value > 0 and
  allowance_caller_spender.amount > 0
otherwise false
```

### Operations

No operation generated.

```archetype
length(operations) = 0
```

## `getAllowance` getter

```archetype
specification getter getAllowance (owner : address, spender : address) : nat
```

<Separator />

No effect on `ledger`.

```archetype
ledger = before.ledger
```

<Separator />

No effect on `allowance`.

```archetype
allowance = before.allowance
```

<Separator />

No explicit fail. The entry implicitely fails though if the provided callback is invalid.

<Separator />

Creates one callback operation.

```archetype
length (operations) = 1
```

## `getBalance` getter

```archetype
specification getter getBalance (owner : address) : nat
```

<Separator />

No effect on `ledger`.

```archetype
ledger = before.ledger
```

<Separator />

No effect on `allowance`.

```archetype
allowance = before.allowance
```

<Seperator />

No explicit fail. The entry implicitely fails though if the provided callback is invalid.

<Separator />

Creates one callback operation.

```archetype
length (operations) = 1
```

## `getTotalSupply` getter

```archetype
specification getter getTotalSupply () : nat
```

<Separator />

No effect on `ledger`.

```archetype
ledger = before.ledger
```

<Separator />

No effect on `allowance`.

```archetype
allowance = before.allowance
```

<Separator />

No explicit fail. The entry implicitely fails though if the provided callback is invalid.

<Separator />

Creates one callback operation.

```archetype
length(operations) = 1
```

