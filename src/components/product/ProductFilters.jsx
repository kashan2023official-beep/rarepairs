import { useSearchParams } from 'react-router-dom';

const SIZES = ['6', '7', '8', '9', '9.5', '10', '11', '12'];
const CONDITIONS = ['All', 'New', 'Like New', 'Good', 'Fair'];
const SORTS = ['Newest', 'Price: Low to High', 'Price: High to Low'];

export default function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSizes = searchParams.getAll('size');
  const activeCondition = searchParams.get('condition') || 'All';
  const activeStatus = searchParams.get('status') || 'Available';
  const activeSort = searchParams.get('sort') || 'Newest';

  const toggleSize = (size) => {
    const params = new URLSearchParams(searchParams);
    const sizes = params.getAll('size');
    if (sizes.includes(size)) {
      params.delete('size');
      sizes.filter(s => s !== size).forEach(s => params.append('size', s));
    } else {
      params.append('size', size);
    }
    setSearchParams(params);
  };

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'All' || (value === 'Available' && key === 'status') || (value === 'Newest' && key === 'sort')) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  return (
    <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between sticky top-16 z-30 bg-cream/95 dark:bg-navy/95 backdrop-blur-sm py-4 border-b border-navy/5 dark:border-cream/5 -mx-4 px-4 sm:mx-0 sm:px-0">
      
      {/* Sizes (Horizontal Scroll on Mobile) */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x w-full md:w-auto">
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.delete('size');
            setSearchParams(params);
          }}
          className={`flex-shrink-0 snap-start px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            activeSizes.length === 0 
              ? 'bg-navy text-cream border-navy dark:bg-cream dark:text-navy dark:border-cream' 
              : 'border-navy/10 text-navy/70 hover:border-navy/30 dark:border-cream/10 dark:text-cream/70 dark:hover:border-cream/30'
          }`}
        >
          All Sizes
        </button>
        {SIZES.map(s => (
          <button
            key={s}
            onClick={() => toggleSize(s)}
            className={`flex-shrink-0 snap-start px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              activeSizes.includes(s)
                ? 'bg-navy text-cream border-navy dark:bg-cream dark:text-navy dark:border-cream'
                : 'border-navy/10 text-navy/70 hover:border-navy/30 dark:border-cream/10 dark:text-cream/70 dark:hover:border-cream/30'
            }`}
          >
            UK {s}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        {/* Condition Dropdown */}
        <select 
          value={activeCondition} 
          onChange={(e) => updateParam('condition', e.target.value)}
          className="bg-transparent text-sm text-navy dark:text-cream border border-navy/10 dark:border-cream/10 rounded-md py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none cursor-pointer"
        >
          {CONDITIONS.map(c => (
            <option key={c} value={c} className="bg-cream dark:bg-navy-card">{c}</option>
          ))}
        </select>

        {/* Status Toggle */}
        <div className="flex rounded-md border border-navy/10 dark:border-cream/10 p-0.5">
          {['Available', 'Sold'].map(status => (
            <button
              key={status}
              onClick={() => updateParam('status', status)}
              className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                (activeStatus === status || (activeStatus === 'Available' && !searchParams.has('status') && status === 'Available'))
                  ? 'bg-navy/5 dark:bg-cream/5 text-navy dark:text-cream' 
                  : 'text-navy/50 dark:text-cream/50 hover:text-navy dark:hover:text-cream'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <select 
          value={activeSort} 
          onChange={(e) => updateParam('sort', e.target.value)}
          className="bg-transparent text-sm text-navy dark:text-cream border border-navy/10 dark:border-cream/10 rounded-md py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none cursor-pointer"
        >
          {SORTS.map(s => (
            <option key={s} value={s} className="bg-cream dark:bg-navy-card">{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
