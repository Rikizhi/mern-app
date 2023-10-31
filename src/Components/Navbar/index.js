import React from 'react'
import * as FaIcons from "react-icons/fa";

const MyNavbar = () => {
  return (
    <div className='navbar'>
      <link to="#" className='menu-bars'>
        <FaIcons.FaBars />
      </link>
    </div>
  )
}

export default MyNavbar





// import React, { useState } from 'react';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom'; 
// import 'bootstrap/dist/css/bootstrap.min.css';

// function MyNavbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     // Lakukan autentikasi dengan API atau backend di sini
//     // Jika berhasil, atur isLoggedIn menjadi true
//     setIsLoggedIn(true);
//   }

//   const handleLogout = () => {
//     // Lakukan tindakan logout di sini, seperti membersihkan token atau data sesi
//     // Setelah logout, atur isLoggedIn menjadi false
//     setIsLoggedIn(false);
//   }

//   return (
//     <Navbar bg="light" expand="lg">
//       <Navbar.Brand as={Link} to="/">
//         <img
//           src="../assets/images/Logo SMKIP.png"
//           width="30"
//           height="30"
//           className="d-inline-block align-top"
//           alt="Logo"
//         />
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//           <Nav.Link as={Link} to="/">Beranda</Nav.Link>
//           <Nav.Link as={Link} to="/our-services">Fasilitas</Nav.Link>
//           <Nav.Link as={Link} to="/events">Kegiatan</Nav.Link>
//           <NavDropdown title="Sekolah" id="basic-nav-dropdown">
//             <NavDropdown.Item as={Link} to="/news">Berita</NavDropdown.Item>
//             <NavDropdown.Item as={Link} to="/about-us">Tentang Kami</NavDropdown.Item>
//           </NavDropdown>
//         </Nav>
//         <Nav>
//           <NavDropdown title={isLoggedIn ? 'Nama Akun' : 'Login'} id="basic-nav-dropdown">
//             {isLoggedIn ? (
//               <>
//                 <NavDropdown.Item as={Link} to="/my-account">My Account</NavDropdown.Item>
//                 <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//               </>
//             ) : (
//               <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
//             )}
//           </NavDropdown>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }

// export default MyNavbar;
