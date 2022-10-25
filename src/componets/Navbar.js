import {Link}  from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar"> 
<div className="container">
<nav className='navbar__nav'>
    <h3 className='nav__brand'>
<Link to="/">
<i className='fa-light fa-tv'> {/* icon */}

</i> 7DAYS TV
</Link>
    </h3>
    <ul className='nav__link'>
        <li className='links__link'>
            <link to="/">HOME</link>
            </li>
            <li className='links__link'>
            <link to="/about">
               ABOUT
            </link>
        </li>
    </ul>
</nav>
</div>
    </div>
  )
}

export default Navbar
