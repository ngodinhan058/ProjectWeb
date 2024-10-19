import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BrandFilter = ({ isLoading, selectedBrands, onSelectBrands }) => {
  const brands = [
    { id: 'brand-1', name: 'Adidas', count: 578 },
    { id: 'brand-2', name: 'Coros', count: 125 },
    { id: 'brand-3', name: 'Black Diamon', count: 755 },
    { id: 'brand-4', name: 'KOO', count: 578 },
  ];

  const handleCheckboxChange = (id) => {
    onSelectBrands((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="aside">
      <h3 className="aside-title">Brand</h3>
      <div
        className="checkbox-filter"
        style={{ maxHeight: 140, overflowY: 'scroll' }}
      >
        {brands.map((brand) =>
          isLoading ? (
            // Add key to Skeleton component
            <Skeleton key={brand.id} height={20} />
          ) : (
            // Add key to parent div of each brand item
            <div className="input-checkbox" key={brand.id}>
              <input
                type="checkbox"
                id={brand.id}
                checked={selectedBrands.includes(brand.id)}
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


export default BrandFilter;
