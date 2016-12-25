import DeckGL from 'deck.gl/react';
import {ArcLayer} from 'deck.gl';

const flights = new ArcLayer({
  id: 'flights',
  data: [] // Some flight points
});

<DeckGL width={1920} height={1080} layers={[flights]} />