import React from 'react';

export function SectionHeader({ title, subtitle }) {
  return (
    <div className="w-full">
      <div className="bg-blue-900 text-white rounded-lg px-6 py-5 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{title}</h1>
          {subtitle && <p className="text-blue-100 mt-1 text-sm">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

export default SectionHeader;
