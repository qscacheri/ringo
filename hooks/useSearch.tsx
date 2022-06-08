import { useMemo } from 'react';

export const useSearch = (search: string, options: string[]) => {
  const results = useMemo(() => {
    return options.filter((option) =>
      option.match(new RegExp(`^${search}`, 'i'))
    );
  }, [search, options]);
  return results;
};
