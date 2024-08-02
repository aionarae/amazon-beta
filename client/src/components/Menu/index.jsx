export default function Menu() {
  return (
    <div className='menu-conatiner'>
      <h2>Menu</h2>
      <ul className='menu-items'>
        {!isLoggedIN ? (
          <>
            <li><a href="/login"></a></li>
          </>
          ) : (
            <>
            {/* the home link is not yet functional I am unsure how to connect it to the app */}
              <li><a href="/home">Home</a></li>
              <li><a href="/account">Account</a></li>
              <li><a href="/orders">Orders</a></li>
              <li><a href="/logout">Logout</a></li>
            </>
          )}
      </ul>
    </div>
  )
}