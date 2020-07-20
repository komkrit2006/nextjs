import COMPILE_TRANSLATE from '../../types';
import translator from '../../../contexts/locale';

export default (state = translator('en'), action) => {
  switch (action.type) {
    case COMPILE_TRANSLATE:
      return translator(action.languageCode);
    default:
      return state;
  }
};
