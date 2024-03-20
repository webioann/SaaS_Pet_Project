import React from 'react'
import './auth-footer.scss'

const AuthPageFooter = () => {
    return (
        <footer className='auth-footer'>
            <div className="auth-footer-content">
                <p className="footer-top">
                    Questions? 
                    <span className='g-link'>Call 0800-509-417</span>
                </p>
                <ul className="footer-links">
                    <li className='g-link'>FAQ</li>
                    <li className='g-link'>Help Center</li>
                    <li className='g-link'>Terms of Use</li>
                    <li className='g-link'>Privacy</li>
                    <li className='g-link'>Cookie Preferences</li>
                    <li className='g-link'>Corporate Information</li>
                </ul>
                <div className="lang-switcher-row">
                    <span className='lang-switcher'>ENG</span>
                </div>
            </div>
        </footer>
    )
}

export default AuthPageFooter;