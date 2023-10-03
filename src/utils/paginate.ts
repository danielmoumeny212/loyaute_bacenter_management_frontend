import _ from "lodash";

export function paginate(
  items: Array<any>,
  pageNumber: number,
  pageSize: number
) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

export function paginateByItem<T>(
  items: T[],
  pageNumber: number,
  pageSize: number
): T | undefined {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  if (startIndex < endIndex && startIndex < items.length) {
    const currentItem = items[(startIndex + pageSize) -1];
    return currentItem;
  }
  return undefined;
}


