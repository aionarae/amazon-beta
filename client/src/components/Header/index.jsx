import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  return (
    <>
      <img src='/public/assets/logo.png' alt='Amazon Logo' />
      <div>
        {/* toggle menu button */}
        <button><FontAwesomeIcon icon={faCogs} /><FontAwesomeIcon icon={faUser}  /></button>
        {/* toggle cart button */}
        <button><FontAwesomeIcon icon={faShoppingCart}  /></button>
      </div>
    </>
  )
};