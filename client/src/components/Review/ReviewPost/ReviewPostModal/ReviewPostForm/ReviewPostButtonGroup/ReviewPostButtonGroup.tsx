import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

const CancelButton = styled.button`
  border: 1px solid ${(props) => props.theme.color.grey4};
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.white1};
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.color.grey4};
  padding: 12px 16px;
  font-weight: 500;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.color.white1};
  margin-left: 20px;
  padding: 12px 16px;
  font-weight: 500;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }

  :disabled {
    background-color: ${(props) => props.theme.color.grey3};
  }
`;

type Props = {
  cancelButtonText: string;
  submitButtonText: string;
  isSubmitDisabled: boolean;
  onCancelButtonClick: MouseEventHandler;
};

const ReviewPostButtonGroup = (props: Props): JSX.Element => {
  const { cancelButtonText, submitButtonText, isSubmitDisabled, onCancelButtonClick } = props;
  return (
    <Container>
      <CancelButton onClick={onCancelButtonClick}>{cancelButtonText}</CancelButton>
      <SubmitButton type="submit" disabled={isSubmitDisabled}>
        {submitButtonText}
      </SubmitButton>
    </Container>
  );
};

export default ReviewPostButtonGroup;
