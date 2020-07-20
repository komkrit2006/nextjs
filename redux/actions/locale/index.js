import COMPILE_TRANSLATE from '../../types';

export default (languageCode) => (dispatch) => {
  dispatch({
    type: COMPILE_TRANSLATE,
    languageCode,
  });
};
