const vars = [
	"const",
	"let",
	"var"
]

module.exports = {
  plugins: [
		"graphql"
	],
  extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended"
	],
  settings: {
    react: {
      version: "detect"
		}
	},
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
	},
  rules: {
		"import/newline-after-import": "error",
		"import/order": [
			"error",
			{
				"newlines-between": "never"
			}
		],
		"@typescript-eslint/camelcase": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-non-null-asserted-optional-chain": "off",
		"padding-line-between-statements": [
			"error",
			{
        blankLine: "always",
        prev: vars,
        next: "*"
			},
			{
        blankLine: "any",
        prev: vars,
        next: vars
			},
			{
        blankLine: "always",
        prev: "*",
        next: "return"
			},
			{
        blankLine: "always",
        prev: "*",
        next: "block-like"
			},
			{
        blankLine: "always",
        prev: "block-like",
        next: "*"
			}
		],
		"react/prop-types": "off",
		"no-irregular-whitespace": "off"
	},
  overrides: [
		{
      files: [
				"*.js",
				"*.ts",
				"*.tsx"
			],
      rules: {
				"@typescript-eslint/explicit-function-return-type": "off",
				"@typescript-eslint/no-var-requires": "off",
				"@typescript-eslint/explicit-module-boundary-types": "off"
			}
		}
	]
}