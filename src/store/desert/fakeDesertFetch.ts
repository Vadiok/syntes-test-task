import { PaginatedList } from '@/entities/PaginatedList';
import { Food } from '@/entities/Food';
import { titles } from '@/store/desert/desert-titles';
import { getSortValueForNumberOrString } from '@/helpers/sort';
import { getArrayWithOffset } from '@/helpers/array';

const getRandomIntInclusive = (min: number, max: number) => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

const deserts: Food[] = [...titles].map((title) => new Food(
  title,
  getRandomIntInclusive(100, 800),
  getRandomIntInclusive(0, 500) / 10,
  getRandomIntInclusive(50, 99),
  getRandomIntInclusive(0, 99) / 10,
  getRandomIntInclusive(0, 70),
));

const listTotal = deserts.length;

let timeoutID: number|null = null;

export const fakeDesertFetch = (
  page = 1,
  perPage = 10,
  orderField: keyof Food = 'title',
  orderByDesc = false,
) => (
  new Promise<PaginatedList<Food>>((resolve) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(
      () => {
        const listSorted = [...deserts]
          .sort((a, b) => getSortValueForNumberOrString(a[orderField], b[orderField], orderByDesc));
        resolve({
          items: getArrayWithOffset(listSorted, perPage * (page - 1), perPage),
          page,
          perPage,
          total: listTotal,
        });
      },
      getRandomIntInclusive(100, 500),
    );
  })
);
