import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import { IMenu } from './../../Interface/menu';
import './menu.scss';

const data: Array<IMenu> = [
  { id: 1, nombre: "Producto", url: '/Producto' },
  { id: 2, nombre: "Proveedor", url: '/Proveedor' },
  { id: 3, nombre: "Categoria Producto", url: '/Categoria-Producto' }
];

const ItemMenu = (item:IMenu) => (
  <a key={item.id} href={item.url}  >
    <span> <AutoAwesomeMosaicIcon /> {item.nombre}</span>
  </a>
)

export default function Menu() {

  return (
    <div className="container__menu"> 
      <div>MiniMarket</div>
      { data.map((item:IMenu) => ItemMenu(item)) }
    </div>
  );
}