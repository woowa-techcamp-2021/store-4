import React, { MouseEventHandler } from 'react';

type Props = {
  onCancelButtonClick: MouseEventHandler;
};
const ReviewPostForm = (props: Props): JSX.Element => {
  const { onCancelButtonClick } = props;
  return (
    <form>
      <h1>글쓰기</h1>
      <input type="text" />
      <input type="file" />
      <button onClick={onCancelButtonClick}>닫기</button>
    </form>
  );
};

export default ReviewPostForm;
