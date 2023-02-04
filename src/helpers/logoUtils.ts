import { Product } from '../api/products';
import NetflixLogo from '../assets/netflixLogo.svg';
import SpotifyLogo from '../assets/spotifyLogo.svg';
import TapLogo from '../assets/tapLogo.svg';
import AxaLogo from '../assets/axaLogo.svg';
import WortenLogo from '../assets/wortenLogo.svg';
import AllianzLogo from '../assets/allianzLogo.svg';
const logos: Record<Product['id'], string> = {
  netflix: NetflixLogo,
  spotify: SpotifyLogo,
  tap: TapLogo,
  worten: WortenLogo,
  ['health-insurance']: AxaLogo,
  ['equipment-insurance']: AllianzLogo,
};

export const getLogo = (id: Product['id']) => logos[id];
