import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { Tag } from '../src';

describe('<Tag />', () => {
  describe('onClick()', () => {
    let onClickWrapper;
    let onClickHandleRemove;

    beforeEach(() => {
      onClickHandleRemove = sinon.stub();
      onClickWrapper = shallow(
        <Tag
          value={'one'}
          handleRemove={onClickHandleRemove}
        />
      );

      onClickWrapper.find('button').simulate('click');
    });

    it('should remove the tag', () => {
      expect(onClickHandleRemove).to.have.been.called();
    });
  });
});