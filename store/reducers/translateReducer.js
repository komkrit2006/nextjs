import COMPILE_TRANSLATE from '../types';
import translator from '../../languages';

export default (state = translator('en'), action) => {
  switch (action.type) {
    case COMPILE_TRANSLATE:
      return translator(action.languageCode);
    default:
      return state;
  }
};
