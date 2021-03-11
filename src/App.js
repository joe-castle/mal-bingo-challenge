import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { createBbCode, replaceUrls } from './util'

import { 
  updateActiveCard, updateDetails, clearActiveCard,
  createActiveCard, updateCardPosition, updateIdAndFetchAnime } 
from './app/activeCardSlice'
import { updateCards, saveCards } from './app/cardsSlice'

import Nav from './Nav'
import Loader from './Loader'

import './App.css'
import FullBBCode from './FullBBCode'
import { resetTitleSearch, throttleAndFetchTitles } from './app/titleSearchSlice'

let modal
let popovers

function App() {
  const [bbCode, setBbCode] = useState(false)

  const { cards, activeCard, titleSearch } = useSelector((state) => state)
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    modal = new window.bootstrap.Modal(document.getElementById('modal'), {})

    return () => {
      modal.dispose()
      modal = null
    }
  }, [])

  useEffect(() => {
    popovers = [...document.querySelectorAll('[data-bs-toggle="popover"]')]
      .reduce((prev, curr) => ({ ...prev, [curr.getAttribute('data-bs-content')]: new window.bootstrap.Popover(curr) }), {})

    return () => {
      Object.keys(popovers).forEach((popover) => popovers[popover].dispose())
      popovers = null
    }
  }, [bbCode])

  return (
    <div className="container">
      <Nav bbCode={bbCode} setBbCode={setBbCode} />
      {bbCode 
      ? <FullBBCode />
      : <div className="bingo-card-container">
        {cards.map(card => <div
          tabIndex="0"
          data-bs-toggle="popover"
          data-bs-content={card.challenge}
          date-bs-trigger="focus"
          data-bs-placement="top"
          role="button"
          title={card.title ? card.title : null}
          className={classNames("bingo-card", { complete: card.title && card.started && card.finished, watching: card.title && card.started && !card.finished, highlight: card.highlight })}
          onMouseEnter={() => popovers[card.challenge].show()}
          onMouseLeave={() => popovers[card.challenge].hide()}
        >
          <div
            className={classNames("bingo-card-foreground")}
            onClick={() => {
              dispatch(updateCards({ position: card.position, highlight: false }))
              dispatch(createActiveCard(card.position))
              dispatch(resetTitleSearch())
              modal.show()
            }}
          />
            {card.imgUrl && <img src={card.imgUrl} />}
            <span className={card.title && 'filled'}>{card.position}</span>
          </div>
        )}
      </div>}
      <div className="card-form modal fade" tabIndex="-1" id="modal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              {activeCard.challengeLinks && <h3 className="modal-title" dangerouslySetInnerHTML={{ __html: replaceUrls(activeCard) }} />}
              {!activeCard.challengeLinks && <h3 className="modal-title" >{activeCard.challenge}</h3>}
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Position</span>
                <select className="form-select" value={activeCard.position} onChange={(e) => dispatch(updateCardPosition(e.target.value))}>
                  {[...cards].sort((a, b) => a.position - b.position).map(card => <option value={card.position} disabled={card.title}>({card.position}) {card.title && `(${card.title})`} {card.challenge}</option>)}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">#</span>
                <input type="text" className={classNames("form-control", { 'is-valid': activeCard.loadingSuccess, 'is-invalid': activeCard.loadingFailed })} placeholder="MAL ID" onChange={(e) => dispatch(updateIdAndFetchAnime(e.target.value))} value={activeCard.id} disabled={activeCard.loading} />
                {activeCard.loading && <Loader />}
                {activeCard.loadingFailed && <div class="invalid-feedback">Anime with ID {activeCard.id} doesn't exist.</div>}
              </div>

              <div className="input-group mb-3">
                <input
                  type="text" 
                  className="form-control" 
                  placeholder="Title" 
                  value={activeCard.title} 
                  disabled={activeCard.loading}
                  onChange={(e) => {
                    dispatch(updateActiveCard({ title: e.target.value }))
                    dispatch(throttleAndFetchTitles(e.target.value))
                  }} 
                />
                {titleSearch.length > 0 && <select disabled={activeCard.loading} className="form-select" defaultValue={-1} onChange={(e) => {
                  const { mal_id: id, title, image_url: imgUrl } = titleSearch[e.target.value]
                  dispatch(updateActiveCard({ id, title, imgUrl }))
                  dispatch(resetTitleSearch())
                }}>
                  <option value={-1} disabled>Select title...</option>
                  {titleSearch.map((query, index) => <option value={index}>{query.title}</option>)}
                </select>}
                {activeCard.id && <a target="_blank" className="input-group-text" href={`https://myanimelist.net/anime/${activeCard.id}`}>MAL Link</a>}
                {activeCard.loading && <Loader />}
              </div>

              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Image Url" id="basic-url" onChange={(e) => dispatch(dispatch(updateActiveCard({ imgUrl: e.target.value })))} value={activeCard.imgUrl} disabled={activeCard.loading}/>
                {activeCard.loading && <Loader />}
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Started</span>
                <input type="date" className="form-control" placeholder="Start Date" onChange={(e) => dispatch(updateActiveCard({ started: e.target.value }))} value={activeCard.started}/>
                <span className="input-group-text">Finished</span>
                <input type="date" className="form-control" placeholder="Finish Date" onChange={(e) => dispatch(updateActiveCard({ finished: e.target.value }))} value={activeCard.finished}/>
              </div>

              {activeCard.details && <div className="input-group mb-3">
                {Object.keys(activeCard.details)
                  .map(detail => <>
                    <span className="input-group-text">{detail}</span>
                    <input type="text" className="form-control" onChange={(e) => dispatch(updateDetails({ key: detail, value: e.target.value }))} value={activeCard.details[detail]} />
                  </>)
                }
              </div>}

              {activeCard.title && <div className="input-group mb-3">
                <span className="input-group-text">BBCode</span>
                <textarea className="form-control" value={createBbCode(activeCard)} />
              </div>}

            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={() => { 
                modal.hide() 
                dispatch(saveCards()) 
              }}>Save</button>
              <button className="btn btn-warning" onClick={() => dispatch(clearActiveCard())}>Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
