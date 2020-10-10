(function (Prism) {

	Prism.languages.archetype = {
		'comment': /\(\*[\s\S]*?\*\)/,
		'string': [
			{
				pattern: /"(?:\\.|[^\\\r\n"])*"/,
				greedy: true
			},
			{
				pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
				greedy: true
			}
		],
		'number': /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
		'directive': {
			pattern: /entry\s+\w+/,
			alias: 'important'
		},
		'label': {
			pattern: /\B~\w+/,
			alias: 'function'
		},
		'type_variable': {
			pattern: /\w+\s+:\s+\w+/,
			alias: 'function'
		},
		'variable': {
			pattern: /var \w+/,
			alias: 'variable'
		},
		'module': {
			pattern: /entry\s+\w+/,
			alias: 'variable'
		},
		// For the list of keywords and operators,
		// see: http://caml.inria.fr/pub/docs/manual-ocaml/lex.html#sec84
		'keyword': /\b(?:as|asset|require|effect|identified by|initialized by|entry|assert|begin|end|do|done|else|exception|external|for|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|virtual|when|where|while|with)\b/,
		'boolean': /\b(?:false|true)\b/,
		// Custom operators are allowed
		'operator': /:=|\+=|\-=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or|update|addupdate)\b/,
		'punctuation': /[(){}\[\]|.,:;]|\b_\b/
	};
}(Prism));
