import {Link} from 'react-router-dom'

const Navigation = () => {
    return (                
        <header className='fluid header_font '>
          <nav className='navbar navbar-expand navbar-dark bg-dark mb-5'>
          <Link className='navbar-brand text-danger px-3' to="/"><img className="navbar-image" src='/src/images/f1.png'/></Link>
          <div className='navbar-collapse collapse d-flex justify-content-end px-3'>
            <ul className='navbar-nav'>
              <li className='nav-item'><Link className='nav-link' to="/">Home</Link></li>
              <li className='nav-item'><Link className='nav-link' to="drivers">Drivers</Link></li>
              <li className='nav-item'><Link className='nav-link' to="teams">Teams</Link></li>
              <li className='nav-item'><Link className='nav-link' to="races">Races</Link></li>
            </ul>
            </div>
          </nav>
        </header>
    )
}

export default Navigation;