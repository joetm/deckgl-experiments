import React from 'react';
import { render } from 'react-dom';

// Needed for onTouchTap
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

import DeckGL from 'deck.gl/react';
import {ArcLayer} from 'deck.gl';


const flights = new ArcLayer({
  id: 'flights',
  data: [] // Some flight points
});


render(
  <DeckGL width={1920} height={1080} layers={[flights]} />,
  document.getElementById('app')
);

