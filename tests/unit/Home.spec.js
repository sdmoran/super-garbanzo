// // This file is for testing the Home view.
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Home from '../../src/views/Home'

// Works, ish. Redo this with mocking.

describe('Home.vue', () => {
    it('Sends name to server when submit button clicked', done => {
        const wrapper = shallowMount(Home)
        wrapper.find('input')
        .setValue("Yeeto");
        wrapper.find('.submit').trigger('click')
        Home.methods.sendPlayer().then(() => {
            expect(wrapper.find('p').text()).to.include('Successfully added player!')
            done();
        })
    })
})