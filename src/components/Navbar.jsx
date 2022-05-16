import React, { useState } from 'react';
import styles from './styles/navstyle.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineMenu, MdOutlineClose, MdShoppingCart } from 'react-icons/md';
import { Button, Link } from '@chakra-ui/react';
import SearchBar from './SearchBar';
import { useGlobalAuthContext } from '../context/AuthContext';
import NameAvatar from './NameAvatar';
import CustomLinks from './CustomLinks';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useGlobalAuthContext();
  const navigate = useNavigate();

  if (!isSearchOpen) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.left_container}>
            <Button
              leftIcon={<MdOutlineMenu />}
              sx={{
                background: '#fff',
                '&:hover': {
                  background: '#fff',
                },
              }}
            >
              MENU
            </Button>
          </div>
          <div className={styles.mid_container}>
            <div className={styles.mid_left_container}>
              <AiOutlineSearch
                size={20}
                sx={{ fontWeight: 'bold' }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              />
            </div>
            <div className={styles.mid_mid_container} onClick={() => navigate('/')}>E-COMMERCE</div>
            <div className={styles.mid_right_container}>
              {user ? (
                // console.log('hello')
                <NameAvatar user={user} />
              ) : (
                <CustomLinks/>
              )}
            </div>
          </div>
          {user ? (
            <div className={styles.right_container} onClick={()=>navigate('/cart')}>
              <span style={{ marginRight: '10px', cursor: 'pointer' }} >CART</span>{' '}
              <MdShoppingCart />
            </div>
          ) : (
            <div className={styles.right_container}></div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.left_container}>
            <Button
              leftIcon={<MdOutlineMenu />}
              sx={{
                background: '#fff',
                '&:hover': {
                  background: '#fff',
                },
              }}
            >
              MENU
            </Button>
          </div>
          <div className={styles.input_container}>
            <input type="text" placeholder="SEARCH" style={{ width: '100%' }} />
          </div>
          <div className={styles.btn_container}>
            <MdOutlineClose
              size={30}
              color="white"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
          </div>
        </div>
      </>
    );
  }
};

export default Navbar;
