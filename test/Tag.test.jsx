import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import { Tag } from '../src/Tag.jsx';
import { nonEmptyString, emptyString } from './util';
import { DefaultRenderTag } from '../src/default.jsx';

describe('<Tag />', () => {
  let tagWrapper;
  let handleEdit;
  let handleRemove;

  beforeEach(() => {
    handleEdit = sinon.stub();
    handleRemove = sinon.stub();

    tagWrapper = mount(
      <Tag
        value={'one'}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        RenderTag={DefaultRenderTag}
      />
    );
  });

  describe('delete tag', () => {
    context('when delete button is clicked', () => {
      beforeEach(() => {
        tagWrapper.find('button').simulate('click');
      });

      it('should remove the tag', () => {
        expect(handleRemove).to.have.been.called();
      });
    });
  });

  describe('edit tag', () => {
    context('when tag is double clicked', () => {
      beforeEach(() => {
        tagWrapper.simulate('dblclick');
      });

      it('should set isEditing state to true', () => {
        expect(tagWrapper.state().isEditing).to.equal(true);
      });

      it('focus should be set to the tag');

      context('when textarea is changed to non empty string', () => {
        const inputValue = nonEmptyString;

        beforeEach(() => {
          tagWrapper.find('textarea').simulate('change', { target: { value: inputValue } });
        });

        it('should edit the token', () => {
          expect(handleEdit).to.have.been.called();
        });
      });

      context('when textarea is changed to empty string', () => {
        const inputValue = emptyString;

        beforeEach(() => {
          tagWrapper.find('textarea').simulate('change', { target: { value: inputValue } });
        });

        it('should remove the token', () => {
          expect(handleRemove).to.have.been.called();
        });
      });

      context('when focus leaves textarea', () => {
        beforeEach(() => {
          tagWrapper.find('textarea').simulate('blur');
        });

        it('should set isEditing state to false', () => {
          expect(tagWrapper.state().isEditing).to.equal(false);
        });
      });
    });
  });
});
