import { IParseSelectorFilters } from '../interfaces/IParseSelectorFilters';
import { IProcessRawSelectorFilters } from '../interfaces/IProcessRawSelectorFilters';
import { ISplitSelectorFilter } from '../interfaces/ISplitSelectorFilter';

export function parseSelectorFiltersFactory(
  processRawSelectorFilters: IProcessRawSelectorFilters,
  splitSelectorFilter: ISplitSelectorFilter,
): IParseSelectorFilters {
  return (url: string) => {
    const selectorFiltersMatch = url.match(/{([\s\S]*)}/);

    if (!selectorFiltersMatch) {
      return [];
    }

    const rawSelectorFilters = selectorFiltersMatch[1].split(`,`)
      .map((x) => splitSelectorFilter(x.trim()));

    return processRawSelectorFilters(rawSelectorFilters);
  };
}
