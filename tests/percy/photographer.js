/**
 * @typedef {import('./pagenavigator.js')} PageNavigator
 * @typedef {import('./Camera.js')} Camera
 */

/**
 * Responsible for determining which snapshots to take
 */
class Photographer {
  /**
   * @param {PageNavigator} pageNavigator
   * @param {Camera} camera
   */
  constructor(pageNavigator, camera) {
    this._pageNavigator = pageNavigator;
    this._camera = camera;
  }

  async captureSnapshots() {
    await this._captureUniversalSearch();
    await this._captureVerticalSearch();
    await this._captureVerticalGridSearch();
    await this._captureVerticalMapSearch();
    await this._captureVerticalFullPageMapSearch();
    await this._captureDirectAnswers();
  }
  
  async _captureUniversalSearch () {
    await this._pageNavigator.gotoUniversalPage();
    await this._camera.snapshot('universal-search');

    await this._pageNavigator.gotoUniversalPage({ query: 'a' });
    await this._camera.snapshot('universal-search--no-results');

    await this._pageNavigator.gotoUniversalPage({ query: 'office sparce'});
    await this._camera.snapshot('universal-search--spellcheck');
  }
  
  async _captureVerticalSearch () {
    await this._pageNavigator.gotoVerticalPage('events');
    await this._camera.snapshot('vertical-search');

    await this._pageNavigator.gotoVerticalPage('events', { query: 'a' });
    await this._camera.snapshot('vertical-search--no-results');

    await this._pageNavigator.gotoVerticalPage('events',{ query: 'vrginia' });
    await this._camera.snapshot('vertical-search--spellcheck');
  }
  
  async _captureVerticalGridSearch () {
    await this._pageNavigator.gotoVerticalPage('people', { query: 'a' });
    await this._camera.snapshot('vertical-grid-search');

    await this._pageNavigator.gotoVerticalPage('people', { query: 'vrginia' });
    await this._camera.snapshot('vertical-grid-search--spellcheck');
  }
  
  async _captureVerticalMapSearch () {
    await this._pageNavigator.gotoVerticalPage('locations', { query: 'a' });
    await this._camera.snapshot('vertical-map-search');

    await this._pageNavigator.gotoVerticalPage('locations_google', { query: 'virginia' });
    await this._camera.snapshot('vertical-map-search--google');
  }

  async _captureVerticalFullPageMapSearch () {
    await this._pageNavigator
      .gotoVerticalPage('locations_full_page_map', { query: '' });
    await this._camera.snapshotDesktopOnly('vertical-full-page-map__desktop-view');
    await this._camera.snapshotMobileOnly('vertical-full-page-map__mobile-list-view');
  
    await this._pageNavigator.click('.Answers-mobileToggle');
    await this._camera.snapshotMobileOnly('vertical-full-page-map__mobile-map-view');
  
    const mapboxPinSelector = '.js-answersMap button';
    await this._pageNavigator.click(mapboxPinSelector);
    await this._camera.snapshotMobileOnly('vertical-full-page-map__mobile-detail-view');

    await this._pageNavigator
      .gotoVerticalPage('locations_full_page_map', { query: 'office sparce'});
    await this._camera.snapshotDesktopOnly('vertical-full-page-map--spellcheck__desktop-view');
    await this._camera.snapshotMobileOnly('vertical-full-page-map--spellcheck__mobile-list-view');

    await this._pageNavigator
      .gotoVerticalPage('locations_full_page_map', { query: 'virginia' });
    await this._camera.snapshotDesktopOnly('vertical-full-page-map--nlp-filters__desktop-view');

    await this._pageNavigator
      .gotoVerticalPage('locations_full_page_map_with_filters', { query: 'virginia' });
    await this._camera.snapshotDesktopOnly('vertical-full-page-map-with-filters--nlp-filters__desktop-view');
  }

  async _captureDirectAnswers () {
    await this._pageNavigator.gotoUniversalPage({ query: 'bryan reed phone number' });
    await this._camera.snapshot('field-direct-answer');

    await this._pageNavigator.gotoUniversalPage({ query: 'where was joe exotic born?' });
    await this._camera.snapshot('documentsearch-direct-answer')
  }
}

module.exports = Photographer;