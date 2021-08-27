import React from 'react';
import styled from 'styled-components';

import LOGO_IMG from '../../assets/images/footer-logo.png';

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 250px;

  padding-top: 50px;
  padding-bottom: 40px;

  background-color: ${(props) => props.theme.color.grey1};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 1200px;
  height: 100%;
  margin: auto;
`;

const LogoWrapper = styled.div`
  padding-bottom: 20px;
`;

const LogoImg = styled.img`
  width: 100px;
`;

const ContentWrapper = styled.div`
  margin-left: 30px;
`;

const LegalList = styled.ul`
  display: flex;
  margin-bottom: 25px;
  min-width: 620px;
`;

const Legal = styled.li`
  padding: 0 20px;
  cursor: pointer;
  font-weight: 600;
`;

const InfoList = styled.p`
  color: ${(props) => props.theme.color.grey4};
  font-size: ${(props) => props.theme.fontSize.tiny};
  padding-bottom: 10px;
  padding-left: 20px;
`;

const LinkAnotherSite = styled.a`
  border-bottom: 1px solid ${(props) => props.theme.color.grey4};

  :hover {
    border: none;
  }
`;

const Footer = (): JSX.Element => {
  return (
    <Container>
      <Wrapper>
        <LogoWrapper>
          <LogoImg src={LOGO_IMG}></LogoImg>
        </LogoWrapper>
        <ContentWrapper>
          <LegalList>
            <Legal>공지사항</Legal>
            <Legal>1:1문의</Legal>
            <Legal>이용약관</Legal>
            <Legal>개인정보처리방침</Legal>
            <Legal>판매처 안내</Legal>
          </LegalList>
          <InfoList>
            상호 : (주)차카니 문방구 &nbsp;|&nbsp; 대표 : 최진우 &nbsp;|&nbsp; 사업자등록번호 :
            120-87-65763 &nbsp;|&nbsp; 통신판매업신고번호 : 2012-서울송파-0515
          </InfoList>
          <InfoList>
            팩스번호 : 050-605-0041 &nbsp;|&nbsp; 메일 : baemin_store@woowahan.com &nbsp;|&nbsp;
            배민문방구 인스타그램 :&nbsp;
            {
              <LinkAnotherSite href="https://www.instagram.com/baemin_store/">
                @baemin_store
              </LinkAnotherSite>
            }
          </InfoList>
          <InfoList>주소 : 서울특별시 송파구 위례성대로 2 장은빌딩</InfoList>
          <InfoList>© Woowa Brothers Corp. All right Reserved</InfoList>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

export default Footer;
