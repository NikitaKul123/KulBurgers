import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import {
  FaInstagram,
  FaVk
} from 'react-icons/fa';
import {
  FooterContainer,
  FooterWrap,
  SocialMedia,
  SocialMediaWrap,
  SocialIcons,
  SocialIconLink
} from './FooterElements';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <SocialMedia>
          <SocialMediaWrap>
          <a className='SocialLogo' href="#begin">KulBurgers</a>
            <SocialIcons>
              <SocialIconLink href='https://vk.com/n1kkul' target='_blank' aria-label='VKontakte'>
                <FaVk />
              </SocialIconLink>
              <SocialIconLink href='https://www.instagram.com/' target='_blank' aria-label='Instagram'>
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink href='https://e.mail.ru/inbox/?back=1' target='_blank' aria-label='Mail'>
                <AiOutlineMail />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
