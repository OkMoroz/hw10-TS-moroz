// 1. Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.
// 2. Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.
// 3. Вам потрібно сворити тип UpperCaseKeys, який буде приводити всі ключи до верхнього регістру.
// 4. І саме цікаве. Створіть тип ObjectToPropertyDescriptor, який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.

interface IAuthor {
  name: string;
  nationality: string;
}

interface IBook {
  title: string;
  author: IAuthor;
  published: number;
  genre: string;
}

/*1.*/
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] | DeepReadonly<T[K]>;
};

type DeepReadonlyBook = DeepReadonly<IBook>;

const deepReadonlyBook: DeepReadonlyBook = {
  title: "Кобзар",
  author: {
    name: "Тарас Шевченко",
    nationality: "українець",
  },
  published: 1840,
  genre: "Поезія",
};

console.log(deepReadonlyBook);

/*2.*/
type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: T[K] | DeepRequireReadonly<T[K]>;
};

type DeepRequireReadonlyBook = DeepRequireReadonly<IBook>;

const deepRequiredReadonlyBook: DeepRequireReadonlyBook = {
  title: "Кобзар",
  author: {
    name: "Тарас Шевченко",
    nationality: "українець",
  },
  published: 1840,
  genre: "Поезія",
};
console.log(deepRequiredReadonlyBook);

/*3.*/
type UpperCaseKeys<T> = {
  [K in keyof T & string as Capitalize<K>]: T[K];
};

type UpperCaseAuthor = UpperCaseKeys<IAuthor>;

const upperCaseAuthor: UpperCaseAuthor = {
  NAME: "Тарас Шевченко",
  NATIONALITY: "українець",
};

type UpperCaseBook = UpperCaseKeys<IBook>;

const upperCaseBook: UpperCaseBook = {
  TITLE: "Кобзар",
  AUTHOR: {
    NAME: "Тарас Шевченко",
    NATIONALITY: "українець",
  },
  PUBLISHED: 1840,
  GENRE: "Поезія",
};

console.log(upperCaseAuthor);
console.log(upperCaseBook);

/*4.*/
type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: {
    value: T[K];
    writable?: boolean;
    enumerable?: boolean;
    configurable?: boolean;
  };
};

type BookDescriptors = ObjectToPropertyDescriptor<IBook>;

const bookDescriptors: BookDescriptors = {
  title: {
    value: "Кобзар",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  author: {
    value: { name: "Тарас Шевченко", nationality: "українець" },
    writable: true,
    enumerable: true,
    configurable: true,
  },
  published: {
    value: 1840,
    writable: true,
    enumerable: true,
    configurable: true,
  },
  genre: {
    value: "Поезія",
    writable: true,
    enumerable: true,
    configurable: true,
  },
};

console.log(bookDescriptors);
