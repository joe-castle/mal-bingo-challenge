import React, { useState } from 'react'
import classNames from 'classnames'
import FuzzySearch from 'fuzzy-search'
import { useDispatch, useSelector } from 'react-redux'
import { updateCards } from './app/cardsSlice'

function createElipsis(text, len) {
  return `${text.slice(0, len)}${text.length > len ? '...' : ''}`
}

export default function Nav({ bbCode, setBbCode }) {
  const [dropdown, setDropdown] = useState(false)
  const [search, setSearch] = useState()
  const sortedAndFilteredCards = useSelector(({ cards }) => [...cards].sort((a, b) => a.position - b.position))

  const dispatch = useDispatch()

  const searcher = new FuzzySearch(sortedAndFilteredCards, ['challenge'])

  return <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">MAL Bingo Challenge</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a target="_blank" className="nav-link active" aria-current="page" href="https://myanimelist.net/forum/?topicid=1885985&show=1650#msg62215630">Entry Page</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#" onClick={(e) => {
              e.preventDefault()
              setBbCode(!bbCode)
            }}>{bbCode ? 'Bingo Card' : 'Full BBCode'}</a>
          </li>
        </ul>
      </div>
      <div className="btn-group">
        <input className="form-control" 
          type="search" 
          placeholder="Search" 
          aria-label="Search"
          onFocus={() => setDropdown(true)}
          onBlur={() => setTimeout(() => setDropdown(false), 100)}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <ul className={classNames("dropdown-menu", { show: dropdown })}>
          {searcher.search(search).map(card => <li 
            onClick={() => dispatch(updateCards({ position: card.position, highlight: true }))}
            className={classNames("dropdown-item", { disabled: card.title })}>{createElipsis(`(${card.position}) ${card.challenge}`, 100)}</li>
          )}
        </ul>
      </div>
    </div>
  </nav>
}