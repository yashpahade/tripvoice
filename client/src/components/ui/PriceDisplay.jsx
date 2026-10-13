import React from 'react';

const PriceDisplay = ({
  amount,
  originalAmount,
  currency = 'INR',
  perUnit,
  discount,
  size = 'md',
  showTaxes = false,
  taxAmount,
  className = ''
}) => {
  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(val);
  };

  const sizes = {
    sm: {
      price: 'text-lg',
      original: 'text-xs',
      discount: 'text-[10px] px-1 py-0.5',
      unit: 'text-xs',
      taxes: 'text-[10px]'
    },
    md: {
      price: 'text-2xl',
      original: 'text-sm',
      discount: 'text-xs px-1.5 py-0.5',
      unit: 'text-sm',
      taxes: 'text-xs'
    },
    lg: {
      price: 'text-3xl',
      original: 'text-base',
      discount: 'text-sm px-2 py-1',
      unit: 'text-base',
      taxes: 'text-sm'
    }
  };

  const s = sizes[size] || sizes.md;
  const hasDiscount = originalAmount && originalAmount > amount;
  const discountPercent = discount || (hasDiscount ? Math.round(((originalAmount - amount) / originalAmount) * 100) : 0);

  return (
    <div className={`flex flex-col ${className}`}>
      {hasDiscount && (
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-gray-500 line-through ${s.original}`}>
            {formatPrice(originalAmount)}
          </span>
          {discountPercent > 0 && (
            <span className={`bg-[#1A7971]/10 text-[#1A7971] font-bold rounded ${s.discount}`}>
              {discountPercent}% OFF
            </span>
          )}
        </div>
      )}
      
      <div className="flex items-baseline gap-1">
        <span className={`font-black text-[#031021] ${s.price}`}>
          {formatPrice(amount)}
        </span>
        {perUnit && (
          <span className={`text-gray-500 ${s.unit}`}>
            {perUnit}
          </span>
        )}
      </div>

      {showTaxes && (
        <div className={`text-gray-500 mt-0.5 ${s.taxes}`}>
          {taxAmount ? `+ ${formatPrice(taxAmount)} taxes & fees` : '+ taxes & fees'}
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;
