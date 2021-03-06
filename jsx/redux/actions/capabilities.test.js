import {capabilitiesLoaded, fetchCapabilities } from './capabilities'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import "isomorphic-fetch"
import {mockLocalStorage} from '../../utils/test_helper'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

window.localStorage = mockLocalStorage()

describe( 'capabilities actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('capabilitiesLoaded', ()=>{
    expect(capabilitiesLoaded({}).type).toEqual('CAPABILITIES_LOADED')
  })

  it('fetchCapabilities', ()=>{
    fetchMock.getOnce('/api/capabilities', {})
    const store = mockStore()
    return store.dispatch(fetchCapabilities({})).then(()=>{
      expect(store.getActions()).toEqual([capabilitiesLoaded({})])
    })
  })
})
