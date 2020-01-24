import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

const FjSelectWrapper = styled.div`
	display: flex;
  align-items: stretch;
  flex-direction: column;

  .select {
    margin-bottom: ${rem(8)};
    display: flex;
    flex-direction: column;
  
    &__label {
      font-size: ${rem(12)};
      color: #686868;
    }

    &__input {
      margin-top: ${rem(4)};
      border: ${rem(1)} solid #D9D9D9;
      border-radius: ${rem(4)};
      height: ${rem(40)};
      font-size: ${rem(15)};
      box-sizing: border-box;
      padding: ${rem(8)} ${rem(12)};
      transition: all 0.2s linear;
      outline: none;
      background: #fff;

      &:focus {
        border-color: #0573db;
      }
    }

    &__spacer {
      min-height: ${rem(16)};
      display: flex;
    }

    &__error {
      color: #DD0000;
      line-height: ${rem(12)};
      font-size: ${rem(10)};
      padding: ${rem(2)} 0;
    }
  }
`;


function FjSelect({ id, label, required, value, error, options = [], placeholder="", onSelect, onChange }) {
	const renderOptions = options.map((option, index) => <option key={`fj-option-${index}`} value={option.value}>{option.label}</option>);

	return (
		<FjSelectWrapper>
			<div className="select">
				<label
					className="select__label"
					htmlFor={id}>
					{label}{required && '*'}
				</label>
				<select
					className="select__input"
					name={id}
					value={value}
					onSelect={onSelect}
					onChange={onChange}
				>
					{ placeholder ? <option value="">{placeholder}</option> : null }
					{renderOptions}
				</select>
				<div className="select__spacer">
					<small className="select__error">{error}</small>
				</div>
			</div>
		</FjSelectWrapper>
	)
}

export default FjSelect;
