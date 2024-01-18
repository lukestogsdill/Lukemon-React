import React, { useState } from 'react';

const FilterBox = ({ options , onSelect, label}) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleSelect = (option) => {
    setSelectedOption(option)
    onSelect(option)
  }
  return (
    <div>
      {label && <label>{label}</label>}
      <select value={selectedOption} defaultValue='' onChange={(e) => handleSelect(e.target.value)}>
        <option value="" disabled>Select Filter</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export { FilterBox }