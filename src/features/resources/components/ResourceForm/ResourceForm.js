import './ResourceForm.css';

import React, { useState } from 'react';
import { toPairs, castArray } from 'lodash';

import { useStoredResource } from '../../hooks';
import { defaultFormDescriptions } from '../../utils/form';

const ResourceForm = ({
  type,
  id,
  descriptions = defaultFormDescriptions,
  onSubmit = () => {}
}) => {
  const [formState, setFormState] = useState({})
  const resource = useStoredResource(type, id);

  return (
    <form className="resourceForm" onSubmit={e => {
      onSubmit(e);
      e.preventDefault();
    }}>
      {toPairs(descriptions[type]).map(([name, desc]) => {
        const fieldId = `${type}-${name}`;
        const fieldLabel = <label htmlFor={fieldId}>{name}</label>;
        const fieldValue = formState[name] ?? resource?.data?.[name];

        let fieldElement;
        if (desc.type === 'select') {
          fieldElement = (
            <select
              id={fieldId}
              name={name}
              required={desc.required}
              value={fieldValue}
              onChange={e => {
                const currentOptions = desc.toOptions?.(fieldValue) ?? castArray(fieldValue);
                const optionIndex = currentOptions.findIndex(option => option === e.target.value);
                const newOptions = optionIndex > -1 ?
                  [...currentOptions.slice(0, optionIndex), ...currentOptions.slice(optionIndex + 1)] :
                  [...currentOptions, e.target.value];

                setFormState({...formState, [name]: desc.fromOptions?.(newOptions) ?? newOptions});
              }}>
              <option className="dummyOption" value={fieldValue}>--- {fieldValue || 'Choose option/options'} ---</option>
              {(desc.options || []).map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          );
        } else {
          fieldElement = (
            <input required={desc.required} name={name} id={fieldId} type={desc.type} value={fieldValue} onChange={e => setFormState({...formState, [name]: e.target.value})}/>
          )
        }

        return (
          <div key={fieldId} className="field">
            {fieldLabel}
            {fieldElement}
          </div>
        );
      })}
      <input className="submit" type="submit" value="Submit"/>
    </form>
  );
};

export default ResourceForm;
