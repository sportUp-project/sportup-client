import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer(props){
    return(
        <footer className='footer'>
            <div className='footer-logo'>
                <h1><span>Sport</span>UP</h1>
            </div>
            
            <h3>Created by:</h3>
            <ul>
                <li><Link to='https://github.com/j-zielinska'>Janna Zielinska </Link></li>
                <li><Link to='https://github.com/veykos'>Pavel Popov</Link></li>
            </ul>                
            
        </footer>
    )
}