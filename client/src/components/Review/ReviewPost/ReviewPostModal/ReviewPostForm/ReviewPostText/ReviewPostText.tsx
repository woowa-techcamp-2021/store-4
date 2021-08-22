import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';

const ADD_CONTENT_LABEL_TEXT = '이 상품, 어떠셨나요?';

const Container = styled.div`
  margin: 48px 0 16px;
`;

const InputTextareaLabel = styled.label`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.color.grey5};
  font-size: ${(props) => props.theme.fontSize.medium};
`;

const InputTextarea = styled.textarea`
  height: 150px;
  max-height: 150px;
  resize: none;
  margin-top: 16px;
  padding: 16px;
  line-height: 1.6;
  color: ${(props) => props.theme.color.grey5};
  font-size: ${(props) => props.theme.fontSize.normal};
  border: 1px solid ${(props) => props.theme.color.grey3};
  border-radius: 5px;
`;

type Props = {
  value: string;
  onChange: ChangeEventHandler;
};
const ReviewPostText = (props: Props): JSX.Element => {
  const { value, onChange } = props;

  return (
    <Container>
      <InputTextareaLabel>
        {ADD_CONTENT_LABEL_TEXT}
        <InputTextarea name="content" value={value} required={true} onChange={onChange} />
      </InputTextareaLabel>
    </Container>
  );
};

export default ReviewPostText;
