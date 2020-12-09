import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { isNil } from 'lodash';

import { isValidResourceType } from '../utils/common'

const ResourceTypeGuard = ({children}) => {
  const {type, sourceType} = useParams();
  const history = useHistory();

  const isValid = isValidResourceType(type) && (isNil(sourceType) || isValidResourceType(sourceType));

  useEffect(() => {
    if (!isValid) {
      history.replace('/');
    }
  }, [isValid, history]);

  return isValid ? React.Children.only(children) : null;
};

export default ResourceTypeGuard;
