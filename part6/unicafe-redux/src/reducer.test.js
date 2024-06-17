import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const okAction = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, okAction)
    expect(newState).toEqual({
        good: 0,
        ok: 1,
        bad: 0
    })
  })

  test('bad is incremented', () => {
    const badAction = {
        type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, badAction)
    expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 1
    })
  })

  test('reset works properly', () => {
    const resetAction = {
        type: 'ZERO'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, resetAction)
    expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 0
    })
  })
})