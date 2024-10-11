import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const SizeFilter = ({ isLoading, selectedSizes, onSelectSizes }) => {
  const sizes = [
    { id: 'size-1', name: 'S', count: 578 },
    { id: 'size-2', name: 'M', count: 125 },
    { id: 'size-3', name: 'L', count: 755 },
    { id: 'size-4', name: 'XL', count: 578 },
    { id: 'size-5', name: 'XXL', count: 125 },
    { id: 'size-6', name: 'XXXL', count: 755 },
  ];

  const handleCheckboxChange = (id) => {
    onSelectSizes((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="aside">
      <h3 className="aside-title">Size</h3>
      <div
        className="checkbox-filter"
        style={{ maxHeight: 140, overflowY: 'scroll' }}
      >
        {sizes.map((brand) =>
          isLoading ? (
            <Skeleton height={20} />
          ) : (
            <div className="input-checkbox" key={brand.id}>
              <input
                type="checkbox"
                id={brand.id}
                checked={selectedSizes.includes(brand.id)}
                onChange={() => handleCheckboxChange(brand.id)}
              />
              <label htmlFor={brand.id}>
                <span></span>
                {brand.name}
                <small>({brand.count})</small>
              </label>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SizeFilter;
