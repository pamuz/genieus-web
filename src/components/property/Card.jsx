/*
 * The <Card> page component is the component that displays a single flashcard.
 * It manages it's own state to determine which side is currently visible, although
 * it provides the method `flip()` so that parent components may trigger a flip.
 */

import React from 'react';

const PROMPT_SIDE = 'PROMPT_SIDE';
const ANSWER_SIDE = 'ANSWER_SIDE';

export class _Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBeingDisplayed: PROMPT_SIDE
    };
  }

  render() {
    const content = this.getContentForSideBeingDisplayed();

    return (
      <div className="gn-quiz-card">
        { content }
      </div>
    );
  }

  getContentForSideBeingDisplayed() {
    if (this.state.sideBeingDisplayed === PROMPT_SIDE)
      return this.props.flashcardData.attributes.front.text;
    return this.props.flashcardData.attributes.back.text;
  }

  flip() {
    const otherSide = this.state.sideBeingDisplayed === PROMPT_SIDE ? ANSWER_SIDE : PROMPT_SIDE;
    this.setState({
      sideBeingDisplayed: otherSide
    });
  }

}

export default _Card;
