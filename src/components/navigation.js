import React, { useState } from 'react'
import { Link } from 'gatsby'
import { motion, AnimatePresence } from 'framer-motion'
// Styles
import { Container, Flex  } from '../styles/gobalStyles'
import { Nav, NavHeader,NavFooter, CloseNav, NavList, NavVideos } from '../styles/navigationStyles'
import { FooterContent, FooterSocial } from '../styles/footerStyles'
// Icons
import { Facebook, Vimeo, Instagram } from '../assets/svg/social-icons'

const navRouter = [
  {id: 0, title: 'not humble', path: 'not-humble', video: 'featured-video.mp4'},
  {id: 1, title: 'bleeping easy', path: 'bleeping-easy', video: 'easy.mp4'},
  {id: 2, title: 'make it zero', path: 'make-it-zero', video: 'make-it-zero.mp4'},
  {id: 3, title: 'it takes an island', path: 'it-takes-an-island', video: 'it-takes-an-island.mp4'},
  {id: 4, title: '50 beaches', path: '50-beaches', video: '50-beaches.mp4'},
]

const Navigation = ({ toggleMenu, setToggleMenu, onCursor }) => {
  const [ revealVideo, setRevealVideo ] = useState({
    show: false,
    video: 'featured-video.mp4',
    key: '0',
  })
  return (
    <AnimatePresence>
    {toggleMenu && (
      <Nav
        initial={{x: '-100%'}}
        exit={{x: '-100%'}}
        animate={{x: toggleMenu ? 0 : '-100%'}}
        transition={{duration: .8, ease: [.6, .05, -.01, 0.9]}}
      >
        <Container>
          <NavHeader>
            <Flex spaceBetween noHeight>
              <h2>Projects</h2>
              <CloseNav
                onClick={() => setToggleMenu(!toggleMenu)}
                onMouseEnter={() => onCursor('pointer')}
                onMouseLeave={onCursor}
              >
                <button>
                  <span></span>
                  <span></span>
                </button>
              </CloseNav>
            </Flex>
          </NavHeader>
          <NavList>
            <ul>
            {navRouter.map(({id, title, path, video}) => (
              <motion.li 
                key={id}
                onHoverStart={() => setRevealVideo({
                  show: true,
                  video: video,
                  key: id
                })}
                onHoverEnd={() => setRevealVideo({
                  show: false,
                  video: video,
                  key: id
                })}
                onMouseEnter={() => onCursor('pointer')}
                onMouseLeave={onCursor}
              >
                <Link to={`/projects/${path}`}>
                  <motion.div 
                    initial={{ x: -108 }} 
                    whileHover={{
                      x: -40,
                      transition: [.6, .05, -.01, 0.9]
                    }} 
                    className="link"
                  >
                    <span className="arrow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 101 57"
                      >
                        <path
                          d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                          fill="#FFF"
                          fillRule="evenodd"
                        >
                        </path>
                      </svg>
                    </span>
                    {title}
                  </motion.div>
                </Link>
              </motion.li>
            ))}
            </ul>
          </NavList>
          <NavFooter>
            <Flex>
              <FooterContent>
                <p>902.315.1234</p>
                <p>info@furrow.studio</p>
              </FooterContent>
              <FooterContent wider>
                <p>15 Cam at Unit B</p>
                <p>University, PE C32 0E2</p>
              </FooterContent>
              <FooterSocial>
                <a 
                  href="#"
                  onMouseEnter={() => {onCursor('pointer')}}
                  onMouseLeave={onCursor}
                >
                  <Instagram />
                </a>
                <a 
                  href="#"
                  onMouseEnter={() => {onCursor('pointer')}}
                  onMouseLeave={onCursor}
                >
                  <Facebook />
                </a>
                <a 
                  href="#"
                  onMouseEnter={() => {onCursor('pointer')}}
                  onMouseLeave={onCursor}
                >
                  <Vimeo />
                </a>
              </FooterSocial>
            </Flex>
          </NavFooter>
          <NavVideos>
            <motion.div 
              animate={{width: revealVideo.show ? 0 : '100%'}} 
              className="reveal"
            ></motion.div>
            <div className="video">
              <AnimatePresence initial={false} exitBeforeEnter>
                <motion.video
                  key={revealVideo.key}
                  src={require(`../assets/video/${revealVideo.video}`)}
                  initial={{opacity: 0}}
                  exit={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{
                    duration: .2,
                    ease: "easeInOut"
                  }}
                  loop
                  autoPlay
                ></motion.video>
              </AnimatePresence>
            </div>
          </NavVideos>
        </Container>
      </Nav>
    )}
    </AnimatePresence>
  )
}

export default Navigation
