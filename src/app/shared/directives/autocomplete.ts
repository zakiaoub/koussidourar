export function filterItems(query: string, items: any[], key: string): any[] {
  return items.filter(item => item[key].toLowerCase().startsWith(query.toLowerCase()));
}