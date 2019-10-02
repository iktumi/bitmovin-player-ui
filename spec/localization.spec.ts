// allow customer to pass localization Config.
// support static text
// support dynamic texts 'some value {value}'
// add support for forced language selection on specific components. (example: Audio.off should always be in english)
// replace all existing texts
// support addition of fallback languages.
// expose addLanguage and setLanguage methods via UIManager to the customer.
// set language to default language of user if exists
// provide a vocabulary template for the customer to edit.
import i18n from '../src/ts/localization/i18n';


const fallbackTest = 'fallback test';
const successEn = 'success';
const successDe = 'erfolg';
const successIt = 'successo';

const defaultConfig = {
  language: 'en',
  translations: {
    'it': {
      'test': successIt,
      [fallbackTest]: successIt,
    },
    'en': {
      'test': successEn,
      [fallbackTest]: successEn,
    },
    'de': {
        'test': successDe,
    },
  },
};

describe('Localization', () => {
  beforeEach(() => {
    i18n.setConfig(defaultConfig);
  });

  describe('Locale initialiization', () => {
    it('should use vocabulary \'en\'', () => {
      expect(i18n.t('test')).toEqual(successEn);
    });

    it('should use vocabulary \'de\'', () => {
      i18n.setConfig({...defaultConfig, language: 'de'});
      expect(i18n.t('test')).toEqual(successDe);
    });

    it('should use vocabulary \'it\'', () => {
      i18n.setConfig({...defaultConfig, language: 'it'});
      expect(i18n.t('test')).toEqual(successIt);
    });
  });


  describe('Fallback\'s', () => {

    it('should fall back to `key` if it is not in vocabulary', () => {
      expect(i18n.t('some word')).toEqual('some word');
    });

    it('should fall back to english unless defined otherwise', () => {
      i18n.setConfig({...defaultConfig, language: 'de'});
      expect(i18n.t(fallbackTest)).toEqual(successEn);
    });

    it('should fall back to italian since we prioritize `it` fallback over `en`', () => {
      i18n.setConfig({...defaultConfig, language: 'de', fallbackLanguages: ['it', 'en']});
      expect(i18n.t(fallbackTest)).toEqual(successIt);
    });

  })

  
});