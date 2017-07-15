/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import NoteFilter from './NoteFilter'
import style from './NoteFilter.css'

describe('NoteFilter', () => {

  test('renders correctly', () => {
    expect(renderer.create(
      <NoteFilter value='test'
        onChange={() => {}}
        onReset={() => {}} />
    )).toMatchSnapshot()

    expect(renderer.create(
      <NoteFilter value=''
        onChange={() => {}}
        onReset={() => {}} />
    )).toMatchSnapshot()
  })

  test('reset button interaction', () => {
    const onResetMock = jest.fn()

    const wrapper = shallow(
      <NoteFilter value='test'
        onChange={() => {}}
        onReset={onResetMock} />
    )

    wrapper.find('button').first().simulate('click')
    expect(onResetMock).toHaveBeenCalled()
  })

  test('input field interaction', () => {
    const onChangeMock = jest.fn()

    const wrapper = shallow(
      <NoteFilter value='test'
        onChange={onChangeMock}
        onReset={() => {}} />
    )

    wrapper.find(`input.${style.input}`).simulate('change', {
      target: {
        value: 'foo'
      }
    })
    expect(onChangeMock).toHaveBeenCalledWith('foo')
  })

})
