
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Search() {
  return (
    <>
      <div> 
        <input type="text" placeholder="Search for a product" />
        {/* displays a search button with a magnifying glass */}
        <button><FontAwesomeIcon icon={faSearch} /></button>
      </div>
    </>
  )
}