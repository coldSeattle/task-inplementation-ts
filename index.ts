/* 
  В качестве оригинала даётся объект, представляющий собой дерево заранее неизвестной глубины
  Листья дерева ― строки с {placeholder}'ами

  Результатом должен быть объект такой же формы, как и оригинал
  Листья дерева ― format-функции, заменяющие плейсхолдеры значениями из аргумента-объекта
  Сигнатура format-функции:
    (vars?: { [key: string]: string | number }) => string

  NOTE: можно использовать готовую реализацию format-функции
 */

export type SourceAdminType = {
  label: () => string;
  hint: (vars?: { [key: string]: string | number }) => string;
};

export type SourceType = {
  hello: (vars?: { [key: string]: string | number }) => string;
  admin: {
    objectForm: SourceAdminType;
  };
};

const sourceStrings: SourceType = {
  hello: (vars?: { username: string | number }) =>
    `Добрый вечор, ${vars.username}!`,
  admin: {
    objectForm: {
      label: () => 'Пароль администратора',
      hint: (vars?: { minLength: string | number; length: string | number }) =>
        `Не менее ${vars.minLength} символов. Сейчас ― ${vars.length}`,
    },
  },
};

const t = i18n(sourceStrings);

console.log('🚀 Starting tests...');

const testFormat = 'Добрый вечор, me!' === t.hello({ username: 'me' });
console.assert(testFormat, '  ❌ First level failed!');

const testDepth = 'Пароль администратора' === t.admin.objectForm.label();
console.assert(testDepth, '  ❌ Generic depth failed!');

const testDepthFmt =
  'Не менее 8 символов. Сейчас ― 6' ===
  t.admin.objectForm.hint({ minLength: 8, length: 6 });
console.assert(testDepthFmt, '  ❌ Variables failed');

if (testDepth && testDepthFmt && testFormat)
  console.log('🎉 Good! All tests passed.');

// === implementation ===

type Input = {
  hello: (vars?: { [key: string]: string | number }) => string;
  admin: {
    objectForm: SourceAdminType;
  };
};

type Result<T> = {
  hello: (vars?: { [key: string]: string | number }) => string;
  admin: {
    objectForm: SourceAdminType;
  };
};

function i18n<T extends Input>(strings: T): Result<T> {
  let templatedStrings = strings;
  // TODO implementation
  return templatedStrings;
}
