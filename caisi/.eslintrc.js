module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    plugins: [
        "vue"
    ],
    env: {
        es6: true,
        browser: true,
        node: true,
        jquery: true,
        mocha: true
    },
    extends: ['standard', 'plugin:vue/essential', 'plugin:vue/recommended', 'eslint:recommended'],
    rules: {
        "import/extensions": ['error', 'always', {
            js: 'never',
            vue: 'never'
        }],
        "vue/no-parsing-error": [1, { 'x-invalid-end-tag': false }],
        "vue/html-indent": [2, 4],
        "vue/max-attributes-per-line": 0,
        "vue/no-use-v-if-with-v-for": 0,
        "vue/html-self-closing": 0,
        "vue/require-atomic-updates": 0,
        "vue/singleline-html-element-content-newline": 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "no-restricted-syntax": 0, //
        "guard-for-in": 0, //
        "prefer-const": 0, //
        "no-else-return": 0, //
        "no-plusplus": 0, // 不允许使用++符号
        "object-shorthand": ["error", "always", { "avoidQuotes": false }], // 去除禁止'videoData.isPause'(newValue) 的命名
        "no-lonely-if": 0, // 不允许给函数参数重新赋值
        "no-param-reassign": 0, // 不允许给函数参数重新赋值
        "no-mixed-operators": 0, // 不允许混合使用运算符
        "no-underscore-dangle": 0, // 不允许下划线作为变量名之一
        "no-under": 0, // 不允许混合使用运算符
        'generator-star-spacing': 'off',
        'no-console': 1, // 禁用no-console规则
        'semi': ['off', 'never'], // 行尾不使用分号
        'comma-dangle': ['error'],
        'eqeqeq': 1, // 不需要强制使用全等
        'max-len': 0,
        'radix': 0,// parseInt不需要传第二个参数
        'linebreak-style': 0, // 强制执行一致的换行样式，windows和mac不一样
        'consistent-return': 0, // 箭头函数最后不需要最后强制return值
        'no-unused-expressions': ["error", { "allowShortCircuit": true, "allowTernary": true }], // 允许您在表达式中使用三元运算符
        'no-multi-spaces': ['error', { "ignoreEOLComments": true }],
        'indent': [2, 4], // 强制使用一致的缩进
        "quotes": [2, "double"], // 字符串使用双引号
        "eslint-disable-next-line": 0,
        "import/extensions": 0,
        "import/no-duplicates": 0,
        "space-before-function-paren": 0,
        "no-undef": 0,
        "eol-last": 0,
        "camelcase": 0,
        "no-new": 0,
        "require-atomic-updates": 0
    }
};
