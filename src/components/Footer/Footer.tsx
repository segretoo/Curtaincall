import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'; // next/image import
import { FooterContainer, FooterLinksContainer, FooterLink, SocialMedia } from './Footer.styled';

const Footer: React.FC = () => {
    const router = useRouter();

    // 현재 페이지가 '/musicals/[id]'인지 확인
    const isDetailPage = router.pathname.includes('/musicals/[id]');

    return (
        <FooterContainer>
            <FooterLinksContainer>
                <FooterLink href="#">PRIVACY POLICY</FooterLink>
                <FooterLink href="#">TERMS AND CONDITIONS</FooterLink>
                <FooterLink href="#">CONTACT</FooterLink>
                <FooterLink href="#">FAQS</FooterLink>
            </FooterLinksContainer>
            <SocialMedia>
                <a href="#">
                    <Image
                        src={isDetailPage ? '/images/facebook.png' : '/images/facebook.png'}
                        alt="Facebook"
                        width={24} // 원하는 이미지 너비
                        height={24} // 원하는 이미지 높이
                    />
                </a>
                <a href="#">
                    <Image
                        src={isDetailPage ? '/images/instagram.png' : '/images/instagram.png'}
                        alt="Instagram"
                        width={24} // 원하는 이미지 너비
                        height={24} // 원하는 이미지 높이
                    />
                </a>
            </SocialMedia>
        </FooterContainer>
    );
};

export default Footer;
