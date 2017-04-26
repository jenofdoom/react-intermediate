import React from 'react';
import { Hole } from 'components/hole/hole';
import { shallow } from 'enzyme';

describe('initial render of Hole', () => {
  let hole = null;

  beforeEach(() => {
    const dispatchMock = jest.fn();
    const props = {
      dispatch: dispatchMock,
      active: false,
      id: 1
    };

    hole = shallow(
      <Hole {...props} />
    );
  })

  test('Frog is hidden if Hole is not active', () => {
    expect(hole.find('.frog').hasClass('up')).toBeFalsy();
  });
});
