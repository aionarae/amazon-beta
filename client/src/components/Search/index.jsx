import { faSearch } from 'react-icons/fa'

export default function Search() {
  return (
    <>
      <div> 
        <input type="text" placeholder="Search for a product" />
        {/* displays a search button with a magnifying glass */}
        <button>< faSearch /></button>
      </div>
    </>
  )
}