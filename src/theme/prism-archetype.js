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
		'label': {
			pattern: /\B~\w+/,
			alias: 'function'
		},
		'type_variable': {
			pattern: /\w+\s+:\s+\w+/,
			alias: 'function'
		},
		// For the list of keywords and operators,
		// see: http://caml.inria.fr/pub/docs/manual-ocaml/lex.html#sec84
		'declaration': /\b(?:constant|variable|asset|entry|function|getter|var|let some|specification|postcondition|record)\b/,
		'keyword': /\b(?:as|require|effect|identified by|initialized by|assert|begin|end|do|done|else|otherwise|return|before|for|if|in|match|in|forall|exists|struct|then|to|while|with)\b/,
		'boolean': /\b(?:false|true)\b/,
		// Custom operators are allowed
		'operator': /:=|\+=|\-=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or|update|addupdate|dofailif|dorequire|sum|fail|some)\b/,
		'punctuation': /[(){}\[\]|.,:;]|\b_\b/
	};
}(Prism));
