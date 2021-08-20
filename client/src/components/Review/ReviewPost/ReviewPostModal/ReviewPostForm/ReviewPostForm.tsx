import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

const FORM_TITLE_TEXT = '상품후기';
const FORM_CANCEL_BUTTON_TEXT = '취소';
const FORM_SUBMIT_BUTTON_TEXT = '리뷰 남기기';

const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSize.medium};
`;

const FormInputFile = styled.input``;

const FormInputTextarea = styled.textarea``;

const FormCancelButton = styled.button``;

const FormSubmitButton = styled.button``;

type Props = {
  onCancelButtonClick: MouseEventHandler;
};
const ReviewPostForm = (props: Props): JSX.Element => {
  const { onCancelButtonClick } = props;
  return (
    <Container>
      <FormTitle>{FORM_TITLE_TEXT}</FormTitle>
      <FormInputFile type="file" multiple={true} />
      <FormInputTextarea />
      <FormCancelButton onClick={onCancelButtonClick}>{FORM_CANCEL_BUTTON_TEXT}</FormCancelButton>
      <FormSubmitButton type="submit">{FORM_SUBMIT_BUTTON_TEXT}</FormSubmitButton>
    </Container>
  );
};

export default ReviewPostForm;
