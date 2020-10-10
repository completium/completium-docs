(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{87:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"metadata",(function(){return p})),n.d(t,"rightToc",(function(){return m})),n.d(t,"default",(function(){return u}));var o=n(2),r=n(6),a=n(0),d=n.n(a),i=n(91),l=n(82),c=n.n(l);var s=function(e){return e.children,d.a.createElement("div",{className:c.a.separator},d.a.createElement("div",{className:c.a.top_separator}),d.a.createElement("div",{className:c.a.bottom_separator}))},b={id:"doc2",title:"FA 1.2 Formal specification"},p={unversionedId:"doc2",id:"doc2",isDocsHomePage:!1,title:"FA 1.2 Formal specification",description:"Contract invariant",source:"@site/docs/doc2.md",slug:"/doc2",permalink:"/completium/docs/doc2",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/doc2.md",version:"current",sidebar:"someSidebar",previous:{title:"FA 1.2",permalink:"/completium/docs/"},next:{title:"This is Document Number 3",permalink:"/completium/docs/doc3"}},m=[{value:"Contract invariant",id:"contract-invariant",children:[]},{value:"Transfer postconditions",id:"transfer-postconditions",children:[{value:"Effect on <code>ledger</code>",id:"effect-on-ledger",children:[]}]}],f={rightToc:m};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(o.a)({},f,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"contract-invariant"},"Contract invariant"),Object(i.b)("p",null,"No token is minted: the total number of tokens is equal to the initial totalsupply number of tokens."),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-archetype",metastring:"{0}","{0}":!0}),"specification {\n  s1: ledger.sum(tokens) = totalsupply;\n}\n")),Object(i.b)("h2",{id:"transfer-postconditions"},"Transfer postconditions"),Object(i.b)("h3",{id:"effect-on-ledger"},"Effect on ",Object(i.b)("inlineCode",{parentName:"h3"},"ledger")),Object(i.b)(s,{mdxType:"Separator"}),Object(i.b)("p",null,"When the ",Object(i.b)("inlineCode",{parentName:"p"},"%to")," address is different from the ",Object(i.b)("inlineCode",{parentName:"p"},"%from")," address, the number of tokens ",Object(i.b)("inlineCode",{parentName:"p"},"%to")," possesses is decread by value."),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-archetype",metastring:"{2,6}","{2,6}":!0}),"postcondition transfer_p1 {\n  %from <> %to ->\n  let some before_ledger_from = before.ledger[%from] in\n  let some after_ledger_from  = ledger[%from] in\n  after_ledger_from = { before_ledger_from with\n    tokens = abs(before_ledger_from.tokens - value)\n  }\n  otherwise false otherwise false\n}\n")),Object(i.b)(s,{mdxType:"Separator"}),Object(i.b)("p",null,"When the ",Object(i.b)("inlineCode",{parentName:"p"},"%to")," address is different from the ",Object(i.b)("inlineCode",{parentName:"p"},"%from")," address, the number of tokens ",Object(i.b)("inlineCode",{parentName:"p"},"%to")," possesses is increased by value when ",Object(i.b)("inlineCode",{parentName:"p"},"%to")," is already registered in the ledger, and set to value otherwise. Anyway, ",Object(i.b)("inlineCode",{parentName:"p"},"%to")," is registered in ledger."),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-archetype",metastring:"{2,6,9}","{2,6,9}":!0}),"postcondition transfer_p2 {\n  %from <> %to ->\n  let some after_ledger_to = ledger[%to] in\n  let some before_ledger_to = before.ledger[%to] in\n    after_ledger_to = { before_ledger_to with\n      tokens = (before_ledger_to.tokens + value)\n    }\n  otherwise\n    after_ledger_to = { holder = %to; tokens = value }\n  otherwise false\n}\n")),Object(i.b)(s,{mdxType:"Separator"}),Object(i.b)("p",null,"No effect on ledger when ",Object(i.b)("inlineCode",{parentName:"p"},"%from")," is equal to ",Object(i.b)("inlineCode",{parentName:"p"},"%to"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-archetype",metastring:"{2}","{2}":!0}),"postcondition transfer_p3 {\n  %from = %to ->\n  ledger = before.ledger\n}\n")),Object(i.b)(s,{mdxType:"Separator"}),Object(i.b)("p",null,"Tokenholders other than %from and %to, are not modified nor added to ledger."),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-archetype",metastring:"{5}","{5}":!0}),"postcondition transfer_p4 {\n  forall tokenholder in ledger,\n  tokenholder.holder <> %from ->\n  tokenholder.holder <> %to ->\n  before.ledger[tokenholder.holder] = some(tokenholder)\n}\n")),Object(i.b)(s,{mdxType:"Separator"}),Object(i.b)("p",null,"Tokenholders other than ",Object(i.b)("inlineCode",{parentName:"p"},"%from")," and ",Object(i.b)("inlineCode",{parentName:"p"},"%to"),", are not modified nor added to ",Object(i.b)("inlineCode",{parentName:"p"},"ledger"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{className:"language-archetype",metastring:"{2,5}","{2,5}":!0}),"postcondition transfer_p5 {\n  forall tokenholder in ledger,\n  tokenholder.holder <> %from ->\n  tokenholder.holder <> %to ->\n  before.ledger[tokenholder.holder] = some(tokenholder)\n}\n")))}u.isMDXComponent=!0}}]);