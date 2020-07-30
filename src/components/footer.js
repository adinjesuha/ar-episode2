import React from 'react'
// Styles
import { Container, Flex } from '../styles/gobalStyles'
import { FooterNav, FooterContent, FooterSocial } from '../styles/footerStyles'
// Icons
import { Facebook, Vimeo, Instagram } from '../assets/svg/social-icons'

const Footer = ({ onCursor }) => {
  return (
    <FooterNav>
      <Container>
        <Flex spaceBetween>
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
              onMouseEnter={() => {onCursor('hovered')}}
              onMouseLeave={onCursor}
            >
              <Instagram />
            </a>
            <a 
              href="#"
              onMouseEnter={() => {onCursor('hovered')}}
              onMouseLeave={onCursor}
            >
              <Facebook />
            </a>
            <a 
              href="#"
              onMouseEnter={() => {onCursor('hovered')}}
              onMouseLeave={onCursor}
            >
              <Vimeo />
            </a>
          </FooterSocial>
        </Flex>
      </Container>
    </FooterNav>
  )
}

export default Footer
