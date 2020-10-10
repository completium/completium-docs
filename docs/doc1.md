---
id: doc1
title: FA 1.2
sidebar_label: FA 1.2 implementation
slug: /
---

FA 1.2 is the fungible token specification for Tezos :



## Totalsupply

```archetype
constant totalsupply : nat = 10_000_000
```

## Ledger

```archetype {1}
asset ledger identified by holder to big_map {
  holder     : address;
  tokens     : nat = 0;
} initialized by {
  { holder = caller; tokens = totalsupply }
}
```

## Allowance

```archetype {1}
asset allowance identified by addr_owner addr_spender to big_map {
  addr_owner       : address;
  addr_spender     : address;
  amount           : nat;
}
```

## Transfer

```archetype {1}
entry %transfer (%from : address, %to : address, value : nat) {
  require {
    r1 otherwise "NotEnoughBalance" : ledger[%from].tokens >= value;
  }
  effect {
    if caller <> %from then begin
      var current = allowance[(%from, caller)].amount;
      dofailif(current < value, ("NotEnoughAllowance", ((value, current))));
      allowance.update((%from, caller), { amount -=  value });
    end;
    ledger.update(%from, { tokens -= value });
    ledger.addupdate(%to, { tokens += value });
  }
}
```

## Approve

```archetype {1}
entry approve(spender : address, value : nat) {
  var k = (caller, spender);
  if allowance.contains(k) then begin
    var previous = allowance[k].amount;
    dofailif(previous > 0 and value > 0, (("UnsafeAllowanceChange", previous)));
  end;
  allowance.addupdate( k, { amount = value });
}
```

## getAllowance

```archetype {1}
getter getAllowance (owner : address, spender : address) : nat {
  return (allowance[(owner, spender)].amount)
}
````

## getBalance

```archetype {1}
getter getBalance (owner : address) : nat {
  return (ledger[owner].tokens)
}
```

## getTotalSupply

```archetype {1}
getter getTotalSupply () : nat {
  return totalsupply
}
```


